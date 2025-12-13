const API_URL = "https://script.google.com/macros/s/AKfycbzbwL2PRrvtWjm2rOzuHly49V9EyJjH6B1F9dmKQkVzIBv5OW5-O2Khvd4S9j3uwBE/exec";

// Fungsi handle login
async function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;
    const loginBtn = document.getElementById('login-btn');
    const errorDiv = document.getElementById('login-error');
    const loadingDiv = document.getElementById('login-loading');
    
    // Validasi
    if (!username || !password) {
        showError("Username dan password harus diisi");
        return;
    }
    
    // Tampilkan loading
    loginBtn.disabled = true;
    errorDiv.style.display = 'none';
    loadingDiv.style.display = 'block';
    
    try {
        // Kirim request ke Google Apps Script
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `method=login&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Simpan data user di localStorage
            localStorage.setItem('digiarju_user', JSON.stringify(result.user));
            localStorage.setItem('digiarju_token', btoa(`${username}:${password}`));
            localStorage.setItem('digiarju_logged_in', 'true');
            
            // Tampilkan toast sukses
            showToast('Login berhasil!', 'success');
            
            // Redirect ke dashboard setelah delay
            setTimeout(() => {
                // Hide login section, show app
                document.getElementById('login-section').style.display = 'none';
                document.querySelector('.app-container').style.display = 'flex';
                
                // Update UI dengan data user
                updateUserUI(result.user);
                
                // Load data dashboard
                loadDashboardData();
            }, 1000);
            
        } else {
            showError(result.message || "Login gagal");
        }
        
    } catch (error) {
        console.error('Login error:', error);
        showError("Koneksi gagal. Periksa internet Anda.");
    } finally {
        // Sembunyikan loading
        loginBtn.disabled = false;
        loadingDiv.style.display = 'none';
    }
}

// Fungsi untuk logout
function handleLogout() {
    // Clear localStorage
    localStorage.removeItem('digiarju_user');
    localStorage.removeItem('digiarju_token');
    localStorage.removeItem('digiarju_logged_in');
    
    // Show login section, hide app
    document.getElementById('login-section').style.display = 'flex';
    document.querySelector('.app-container').style.display = 'none';
    
    // Clear form
    document.getElementById('login-username').value = '';
    document.getElementById('login-password').value = '';
    
    showToast('Anda telah logout', 'info');
}

// Fungsi untuk check session saat load
function checkSession() {
    const isLoggedIn = localStorage.getItem('digiarju_logged_in');
    const userData = localStorage.getItem('digiarju_user');
    
    if (isLoggedIn === 'true' && userData) {
        try {
            const user = JSON.parse(userData);
            
            // Hide login, show app
            document.getElementById('login-section').style.display = 'none';
            document.querySelector('.app-container').style.display = 'flex';
            
            // Update UI
            updateUserUI(user);
            
            // Load dashboard data
            loadDashboardData();
            
        } catch (error) {
            // Jika error parsing, force logout
            handleLogout();
        }
    } else {
        // Show login
        document.getElementById('login-section').style.display = 'flex';
        document.querySelector('.app-container').style.display = 'none';
    }
}

// Fungsi update UI dengan data user
function updateUserUI(user) {
    // Update dashboard
    if (document.getElementById('dash-name')) {
        document.getElementById('dash-name').textContent = user.nama;
    }
    
    if (document.getElementById('user-name-display')) {
        document.getElementById('user-name-display').textContent = user.nama;
    }
    
    if (document.getElementById('user-initial')) {
        document.getElementById('user-initial').textContent = user.nama.charAt(0).toUpperCase();
    }
    
    if (document.getElementById('dash-role')) {
        document.getElementById('dash-role').textContent = user.role === 'admin' ? 'Admin' : 'Guru';
    }
    
    // Update profile form jika ada
    if (document.getElementById('p-nama')) {
        document.getElementById('p-nama').value = user.nama;
    }
}

// Fungsi untuk register user baru (untuk admin)
async function registerUser(username, password, nama, role = 'guru') {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `method=register&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&nama=${encodeURIComponent(nama)}&role=${role}`
        });
        
        return await response.json();
        
    } catch (error) {
        return { success: false, message: "Koneksi gagal" };
    }
}

// Fungsi untuk update profile
async function updateUserProfile(username, field, value) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `method=update_profile&username=${encodeURIComponent(username)}&field=${field}&value=${encodeURIComponent(value)}`
        });
        
        return await response.json();
        
    } catch (error) {
        return { success: false, message: "Koneksi gagal" };
    }
}

// Helper functions
function showError(message) {
    const errorDiv = document.getElementById('login-error');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    toastContainer.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Initialize saat halaman load
document.addEventListener('DOMContentLoaded', function() {
    // Check session
    checkSession();
    
    // Tambahkan logout button jika diperlukan
    // Anda bisa tambahkan di topbar atau menu
});
