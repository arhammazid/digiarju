// ===== LOGIN SYSTEM =====
const AUTH_CONFIG = {
    GOOGLE_APPS_SCRIPT_URL: "https://script.google.com/macros/d/AKfycbx7rx1ALuH3h0HxckAORs90U1hOEGpUl8BBsI5vt6vIv0h6l63DVwHVJU2xFy3NFt2u/usercontent", // Ganti dengan URL Google Apps Script yang di-deploy
    SESSION_DURATION: 24 * 60 * 60 * 1000 // 24 jam dalam milliseconds
};

// Cek autentikasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    checkAuthentication();
});

/**
 * Cek status autentikasi user
 */
function checkAuthentication() {
    const token = sessionStorage.getItem('auth_token');
    const expiredTime = sessionStorage.getItem('auth_expired');
    const loginSection = document.getElementById('login-section');
    const appContainer = document.querySelector('.app-container');

    // Return early if elements don't exist
    if (!loginSection || !appContainer) {
        console.warn('Login or app container elements not found');
        return;
    }

    if (token && expiredTime) {
        const now = new Date().getTime();
        if (now < parseInt(expiredTime)) {
            // Token masih valid
            loginSection.style.display = 'none';
            appContainer.style.display = 'flex';
            initializeApp();
            return;
        } else {
            // Token sudah expired
            sessionStorage.clear();
        }
    }

    // Jika tidak ada token atau sudah expired, tampilkan login
    loginSection.style.display = 'flex';
    appContainer.style.display = 'none';
}

/**
 * Handle login form submission
 */
function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;
    const loginBtn = document.getElementById('login-btn');
    const errorDiv = document.getElementById('login-error');
    const loadingDiv = document.getElementById('login-loading');

    // Reset error
    errorDiv.style.display = 'none';
    errorDiv.innerHTML = '';

    // Validasi input
    if (!username || !password) {
        errorDiv.style.display = 'block';
        errorDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Username dan password harus diisi';
        errorDiv.className = 'login-error error';
        return;
    }

    if (!AUTH_CONFIG.GOOGLE_APPS_SCRIPT_URL) {
        errorDiv.style.display = 'block';
        errorDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Konfigurasi Google Apps Script belum lengkap';
        errorDiv.className = 'login-error error';
        return;
    }

    // Show loading
    loadingDiv.style.display = 'block';
    loginBtn.disabled = true;

    // Gunakan google.script.run untuk Apps Script deployment
    if (typeof google !== 'undefined' && google.script && google.script.run) {
        google.script.run
            .withSuccessHandler(function(data) {
                loadingDiv.style.display = 'none';
                loginBtn.disabled = false;

                if (data.success) {
                    // Login berhasil
                    const token = data.token;
                    const expiredTime = new Date().getTime() + AUTH_CONFIG.SESSION_DURATION;

                    // Simpan ke session storage
                    sessionStorage.setItem('auth_token', token);
                    sessionStorage.setItem('auth_expired', expiredTime);
                    sessionStorage.setItem('user_name', data.user.name);
                    sessionStorage.setItem('user_email', data.user.email);
                    sessionStorage.setItem('user_username', data.user.username);

                    // Reset form
                    document.getElementById('login-form').reset();

                    // Tampilkan success message
                    errorDiv.style.display = 'block';
                    errorDiv.innerHTML = '<i class="fas fa-check-circle"></i> Login berhasil! Mengalihkan...';
                    errorDiv.className = 'login-error success';

                    // Redirect ke main app
                    setTimeout(() => {
                        checkAuthentication();
                    }, 1500);
                } else {
                    // Login gagal
                    errorDiv.style.display = 'block';
                    errorDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> ' + data.message;
                    errorDiv.className = 'login-error error';
                }
            })
            .withFailureHandler(function(error) {
                loadingDiv.style.display = 'none';
                loginBtn.disabled = false;
                
                console.error('Login error:', error);
                errorDiv.style.display = 'block';
                errorDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error: ' + error;
                errorDiv.className = 'login-error error';
            })
            .authenticateUser(username, password);
    } else {
        // Fallback untuk non-Apps Script environment
        console.log('Attempting to fetch from:', AUTH_CONFIG.GOOGLE_APPS_SCRIPT_URL);
        
        fetch(AUTH_CONFIG.GOOGLE_APPS_SCRIPT_URL, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(response => {
            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Login response:', data);
            loadingDiv.style.display = 'none';
            loginBtn.disabled = false;

            if (data.success) {
                const token = data.token;
                const expiredTime = new Date().getTime() + AUTH_CONFIG.SESSION_DURATION;
                sessionStorage.setItem('auth_token', token);
                sessionStorage.setItem('auth_expired', expiredTime);
                sessionStorage.setItem('user_name', data.user.name);
                sessionStorage.setItem('user_email', data.user.email);
                sessionStorage.setItem('user_username', data.user.username);
                document.getElementById('login-form').reset();
                errorDiv.style.display = 'block';
                errorDiv.innerHTML = '<i class="fas fa-check-circle"></i> Login berhasil! Mengalihkan...';
                errorDiv.className = 'login-error success';
                setTimeout(() => { checkAuthentication(); }, 1500);
            } else {
                errorDiv.style.display = 'block';
                errorDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> ' + data.message;
                errorDiv.className = 'login-error error';
            }
        })
        .catch(error => {
            console.error('Login error details:', error);
            loadingDiv.style.display = 'none';
            loginBtn.disabled = false;
            
            let errorMessage = 'Koneksi error: ' + error.message;
            
            if (error.message.includes('Failed to fetch')) {
                errorMessage = `Failed to fetch error. Kemungkinan penyebab:
                <br>1. Google Apps Script belum di-redeploy
                <br>2. URL Google Apps Script salah (check di line 2)
                <br>3. Google Apps Script tidak di-deploy sebagai Web App "Anyone" access
                <br><br>URL saat ini: ${AUTH_CONFIG.GOOGLE_APPS_SCRIPT_URL}`;
            }
            
            errorDiv.style.display = 'block';
            errorDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> ' + errorMessage;
            errorDiv.className = 'login-error error';
            
            // Log untuk debugging
            console.error('Full error:', error);
            console.error('URL being used:', AUTH_CONFIG.GOOGLE_APPS_SCRIPT_URL);
        });
    }
}

/**
 * Logout user
 */
function logout() {
    if (confirm('Apakah Anda yakin ingin logout?')) {
        sessionStorage.clear();
        const loginSection = document.getElementById('login-section');
        const appContainer = document.querySelector('.app-container');
        if (loginSection) loginSection.style.display = 'flex';
        if (appContainer) appContainer.style.display = 'none';
        const form = document.getElementById('login-form');
        if (form) form.reset();
        location.reload();
    }
}

/**
 * Inisialisasi aplikasi setelah login
 */
function initializeApp() {
    const userName = sessionStorage.getItem('user_name');
    const userEmail = sessionStorage.getItem('user_email');

    // Set user info di dashboard
    const dashName = document.getElementById('dash-name');
    const userInitial = document.getElementById('user-initial');
    const userNameDisplay = document.getElementById('user-name-display');

    if (dashName) dashName.textContent = userName || 'Guru';
    if (userInitial) userInitial.textContent = (userName || 'G').charAt(0).toUpperCase();
    if (userNameDisplay) userNameDisplay.textContent = userName || 'Guru';
}

/**
 * Cek session validity setiap 5 menit
 */
setInterval(function() {
    const expiredTime = sessionStorage.getItem('auth_expired');
    if (expiredTime) {
        const now = new Date().getTime();
        if (now > parseInt(expiredTime)) {
            alert('Session Anda telah berakhir. Silakan login kembali.');
            logout();
        }
    }
}, 5 * 60 * 1000); // Check setiap 5 menit
