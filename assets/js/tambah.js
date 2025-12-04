const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSiXz_QISnbz4kN48qlxhAWMvuLzBBmpkDoHgE9PrxLOgUEyalcgD8M24dB0CueENex0lWDUCclJ6aZ/pub?gid=0&single=true&output=csv"; // Ganti dengan URL Sheet Anda

// Cache untuk data guru
let gurDataCache = null;
let sekolahSet = new Set();

// ===== FETCH & PARSE GOOGLE SHEETS DATA =====
async function loadGuruDataFromSheets() {
    try {
        if (gurDataCache) return gurDataCache;
        
        const response = await fetch(GOOGLE_SHEET_CSV_URL);
        if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
        
        const csvText = await response.text();
        const lines = csvText.trim().split('\n');
        
        // Parse CSV
        const data = [];
        const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
        
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',').map(v => v.trim());
            if (values.length < 3) continue; // Skip invalid rows
            
            const row = {};
            headers.forEach((header, idx) => {
                row[header] = values[idx] || '';
            });
            
            data.push(row);
            if (row.sekolah) sekolahSet.add(row.sekolah);
        }
        
        gurDataCache = data;
        return data;
    } catch (error) {
        console.error('Error loading guru data:', error);
        showToast('⚠️ Gagal memuat data dari Google Sheets. Periksa URL Sheet Anda.');
        return [];
    }
}

// ===== POPULATE SEKOLAH DROPDOWN =====
async function populateSekolahDropdown() {
    const selectEl = document.getElementById('login-sekolah');
    const data = await loadGuruDataFromSheets();
    
    if (data.length === 0) {
        selectEl.innerHTML = '<option value="">Gagal memuat data sekolah</option>';
        return;
    }
    
    // Clear dan tambah option
    selectEl.innerHTML = '<option value="">Pilih Sekolah...</option>';
    Array.from(sekolahSet)
        .sort()
        .forEach(sekolah => {
            const option = document.createElement('option');
            option.value = sekolah;
            option.textContent = sekolah;
            selectEl.appendChild(option);
        });
}

// ===== LOGIN VALIDATION =====
async function validateLogin(username, sekolah, password) {
    const data = await loadGuruDataFromSheets();
    
    const guru = data.find(row => 
        row.username?.toLowerCase().trim() === username.toLowerCase().trim() &&
        row.sekolah?.trim() === sekolah &&
        row.password?.trim() === password
    );
    
    if (!guru) {
        return { success: false, message: 'Username, sekolah, atau password salah' };
    }
    
    return { 
        success: true, 
        guru: {
            username: guru.username,
            sekolah: guru.sekolah,
            nama: guru.nama || guru.username,
            nip: guru.nip || '',
            email: guru.email || ''
        }
    };
}

// ===== SESSION MANAGEMENT =====
function saveLoginSession(guru) {
    localStorage.setItem('login_username', guru.username);
    localStorage.setItem('as_nama', guru.nama);
    localStorage.setItem('as_nip', guru.nip);
    localStorage.setItem('as_sekolah', guru.sekolah);
    localStorage.setItem('login_email', guru.email);
    localStorage.setItem('login_timestamp', new Date().toISOString());
}

function loadLoginSession() {
    const username = localStorage.getItem('login_username');
    if (username) {
        return {
            username,
            nama: localStorage.getItem('as_nama'),
            nip: localStorage.getItem('as_nip'),
            sekolah: localStorage.getItem('as_sekolah'),
            email: localStorage.getItem('login_email')
        };
    }
    return null;
}

function clearLoginSession() {
    localStorage.removeItem('login_username');
    localStorage.removeItem('login_email');
    localStorage.removeItem('login_timestamp');
}

// ===== LOGOUT FUNCTION =====
function logoutUser() {
    clearLoginSession();
    document.getElementById('login-page').classList.remove('hidden');
    document.querySelector('.app-container').style.display = 'none';
    document.getElementById('login-form').reset();
    populateSekolahDropdown();
    showToast('✓ Logout berhasil');
}

// ===== AUTO-LOGIN ON PAGE LOAD =====
window.addEventListener('DOMContentLoaded', async function() {
    // Check if user already logged in
    const session = loadLoginSession();
    
    if (session) {
        // Auto-login
        document.getElementById('login-page').classList.add('hidden');
        document.querySelector('.app-container').style.display = 'flex';
        updateUserDisplay(session.nama);
        initializeDashboard();
    } else {
        // Show login page
        document.getElementById('login-page').classList.remove('hidden');
        document.querySelector('.app-container').style.display = 'none';
        await populateSekolahDropdown();
    }
    
    // Setup login form handler
    document.getElementById('login-form').addEventListener('submit', handleLoginSubmit);
});

// ===== LOGIN FORM HANDLER =====
async function handleLoginSubmit(e) {
    e.preventDefault();
    
    const username = document.getElementById('login-username').value.trim();
    const sekolah = document.getElementById('login-sekolah').value;
    const password = document.getElementById('login-password').value;
    const submitBtn = document.getElementById('login-submit-btn');
    
    // Clear previous errors
    document.querySelectorAll('.login-form-group.error').forEach(el => {
        el.classList.remove('error');
    });
    
    // Validate inputs
    let hasError = false;
    
    if (!username) {
        document.getElementById('login-username').parentElement.classList.add('error');
        hasError = true;
    }
    
    if (!sekolah) {
        document.getElementById('login-sekolah').parentElement.classList.add('error');
        hasError = true;
    }
    
    if (!password) {
        document.getElementById('login-password').parentElement.classList.add('error');
        hasError = true;
    }
    
    if (hasError) return;
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.innerHTML = '<span class="login-loading-spinner"></span> Memverifikasi...';
    
    try {
        const result = await validateLogin(username, sekolah, password);
        
        if (result.success) {
            saveLoginSession(result.guru);
            showToast(`✓ Selamat datang, ${result.guru.nama}!`);
            
            // Update user display
            updateUserDisplay(result.guru.nama);
            
            // Hide login, show app
            document.getElementById('login-page').classList.add('hidden');
            document.querySelector('.app-container').style.display = 'flex';
            
            // Reset form
            document.getElementById('login-form').reset();
            
            // Initialize dashboard
            initializeDashboard();
        } else {
            showToast('❌ ' + result.message);
            document.getElementById('login-password').parentElement.classList.add('error');
        }
    } catch (error) {
        console.error('Login error:', error);
        showToast('❌ Terjadi kesalahan saat login');
    } finally {
        submitBtn.classList.remove('loading');
        submitBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Masuk';
    }
}
