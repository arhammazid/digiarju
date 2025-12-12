// ===== REGISTRATION SYSTEM =====

/**
 * Switch antara tab login dan register
 */
function switchAuthTab(tab) {
    // Hide semua tab content
    document.getElementById('auth-login-tab').classList.remove('active');
    document.getElementById('auth-register-tab').classList.remove('active');
    
    // Remove active dari semua tab buttons
    document.querySelectorAll('.auth-tab').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    if (tab === 'login') {
        document.getElementById('auth-login-tab').classList.add('active');
        document.querySelector('[data-tab="login"]').classList.add('active');
    } else if (tab === 'register') {
        document.getElementById('auth-register-tab').classList.add('active');
        document.querySelector('[data-tab="register"]').classList.add('active');
    }
}

/**
 * Handle registration form submission
 */
function handleRegister(event) {
    event.preventDefault();

    const username = document.getElementById('register-username').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const unit = document.getElementById('register-unit').value.trim();
    const registerBtn = document.getElementById('register-btn');
    const errorDiv = document.getElementById('register-error');
    const successDiv = document.getElementById('register-success');
    const loadingDiv = document.getElementById('register-loading');

    // Reset messages
    errorDiv.style.display = 'none';
    successDiv.style.display = 'none';
    errorDiv.innerHTML = '';

    // Validasi input
    if (!username || !email || !unit) {
        errorDiv.style.display = 'block';
        errorDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Semua field harus diisi';
        errorDiv.className = 'login-error error';
        return;
    }

    if (username.length < 3) {
        errorDiv.style.display = 'block';
        errorDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Username minimal 3 karakter';
        errorDiv.className = 'login-error error';
        return;
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorDiv.style.display = 'block';
        errorDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Format email tidak valid';
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
    registerBtn.disabled = true;

    // Siapkan timestamp
    const timestamp = new Date().toLocaleString('id-ID');

    // Kirim ke Google Apps Script
    fetch(AUTH_CONFIG.GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            action: 'register',
            username: username,
            email: email,
            unit: unit,
            timestamp: timestamp
        })
    })
    .then(response => response.json())
    .then(data => {
        loadingDiv.style.display = 'none';
        registerBtn.disabled = false;

        if (data.success) {
            // Registration berhasil
            successDiv.style.display = 'block';
            successDiv.innerHTML = '<i class="fas fa-check-circle"></i> ' + data.message;
            successDiv.className = 'login-error success';

            // Reset form setelah 2 detik
            setTimeout(() => {
                document.getElementById('register-form').reset();
                successDiv.style.display = 'none';
                // Switch kembali ke login tab
                switchAuthTab('login');
            }, 2000);
        } else {
            // Registration gagal
            errorDiv.style.display = 'block';
            errorDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> ' + data.message;
            errorDiv.className = 'login-error error';
        }
    })
    .catch(error => {
        loadingDiv.style.display = 'none';
        registerBtn.disabled = false;
        
        console.error('Registration error:', error);
        errorDiv.style.display = 'block';
        errorDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Koneksi error: ' + error.message;
        errorDiv.className = 'login-error error';
    });
}

/**
 * Initialize authentication page
 */
function initAuthPage() {
    // Setup tab switching
    const authTabs = document.querySelectorAll('.auth-tab');
    authTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            switchAuthTab(this.dataset.tab);
        });
    });
}

// Initialize saat page load
document.addEventListener('DOMContentLoaded', function() {
    initAuthPage();
}, { once: true });
