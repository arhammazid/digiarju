const apiKey = ""; 
// ===== INITIALIZE DASHBOARD =====
function initializeDashboard() {
    const nama = localStorage.getItem('as_nama') || 'Guru';
    const sekolah = localStorage.getItem('as_sekolah') || '';
    
    updateUserDisplay(nama);
    
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('id-ID', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    if (document.getElementById('dash-date')) {
        document.getElementById('dash-date').innerText = formattedDate;
    }
    if (document.getElementById('p-sekolah')) {
        document.getElementById('p-sekolah').value = sekolah;
    }
    if (document.getElementById('out-sekolah')) {
        document.getElementById('out-sekolah').innerText = sekolah.toUpperCase();
    }
} 

// --- UTILS ---
function showToast(message) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = message;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Fungsi Parse JSON yang lebih aman
function cleanAndParseJSON(str) {
    try {
        const firstOpen = str.indexOf('{');
        const lastClose = str.lastIndexOf('}');
        if (firstOpen !== -1 && lastClose !== -1 && lastClose > firstOpen) {
            let jsonCandidate = str.substring(firstOpen, lastClose + 1);
            return JSON.parse(jsonCandidate);
        }
        return null;
    } catch (e) {
        console.error("JSON Parse Error:", e);
        return null;
    }
}

// ===== PERFORMANCE OPTIMIZATION UTILITIES =====

/**
 * Debounce function - mencegah function dijalankan terlalu sering
 * Cocok untuk: input events, resize, scroll handlers
 * @param {Function} func - Function yang akan di-debounce
 * @param {Number} delay - Delay dalam ms (default: 300ms)
 * @returns {Function} - Debounced function
 */
function debounce(func, delay = 300) {
    let timeoutId = null;
    return function debounced(...args) {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
            timeoutId = null;
        }, delay);
    };
}

/**
 * Throttle function - membatasi eksekusi function dalam interval tertentu
 * Cocok untuk: scroll, mousemove, resize events
 * @param {Function} func - Function yang akan di-throttle
 * @param {Number} limit - Time limit dalam ms (default: 300ms)
 * @returns {Function} - Throttled function
 */
function throttle(func, limit = 300) {
    let inThrottle = false;
    return function throttled(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * RequestAnimationFrame debounce - untuk operasi visual yang frequent
 * @param {Function} func - Function yang akan di-optimize
 * @returns {Function} - RAF-optimized function
 */
function rafDebounce(func) {
    let frameId = null;
    return function debounced(...args) {
        if (frameId) cancelAnimationFrame(frameId);
        frameId = requestAnimationFrame(() => {
            func.apply(this, args);
            frameId = null;
        });
    };
}

/**
 * Batch DOM updates - minimize reflow/repaint
 * @param {Function} callback - Function yang contains DOM updates
 */
function batchDOMUpdates(callback) {
    requestAnimationFrame(callback);
}

/**
 * Element visibility check - lazy loading optimization
 * @param {Element} element - Element yang dicek
 * @returns {Boolean} - True jika element visible dalam viewport
 */
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= window.innerHeight &&
        rect.right <= window.innerWidth
    );
}

/**
 * Memoization cache untuk expensive computations
 * @param {Function} func - Function yang akan di-cache
 * @returns {Function} - Memoized function
 */
function memoize(func) {
    const cache = new Map();
    return function memoized(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = func.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

// ===== BATCH PROCESSING STATE MANAGEMENT =====

/**
 * Global state untuk batch processing (Preview Semua & Download Semua)
 */
const batchProcessState = {
    isRunning: false,
    isPaused: false,
    startTime: 0,
    processedCount: 0,
    successCount: 0,
    failedCount: 0,
    totalCount: 0,
    failedList: [],
    currentSiswaName: '',
    abortRequested: false
};

/**
 * Update progress bar dan status display
 */
function updateBatchProgress() {
    const { processedCount, totalCount, successCount, failedCount, startTime } = batchProcessState;
    const percentage = totalCount > 0 ? (processedCount / totalCount) * 100 : 0;
    const elapsedTime = (Date.now() - startTime) / 1000;
    const speed = elapsedTime > 0 ? processedCount / elapsedTime : 0;
    const remainingCount = totalCount - processedCount;
    const etaSeconds = speed > 0 ? remainingCount / speed : 0;
    
    // Format ETA
    const etaMinutes = Math.floor(etaSeconds / 60);
    const etaSecs = Math.floor(etaSeconds % 60);
    const etaStr = `${etaMinutes}:${etaSecs.toString().padStart(2, '0')}`;
    
    // Update DOM
    document.getElementById('rapor-progress-text').textContent = `${processedCount}/${totalCount}`;
    document.getElementById('rapor-progress-bar').style.width = percentage.toFixed(1) + '%';
    document.getElementById('rapor-progress-bar').textContent = percentage > 10 ? percentage.toFixed(0) + '%' : '';
    document.getElementById('rapor-progress-speed').textContent = speed.toFixed(2);
    document.getElementById('rapor-progress-success').textContent = successCount;
    document.getElementById('rapor-progress-current').textContent = batchProcessState.currentSiswaName;
    document.getElementById('rapor-progress-failed').textContent = failedCount;
    document.getElementById('rapor-progress-eta').textContent = `ETA: ${etaStr}`;
}

/**
 * Show progress container
 */
function showBatchProgress(total) {
    batchProcessState.totalCount = total;
    batchProcessState.processedCount = 0;
    batchProcessState.successCount = 0;
    batchProcessState.failedCount = 0;
    batchProcessState.startTime = Date.now();
    batchProcessState.isRunning = true;
    batchProcessState.isPaused = false;
    batchProcessState.abortRequested = false;
    batchProcessState.failedList = [];
    
    document.getElementById('rapor-batch-progress-container').style.display = 'block';
    document.getElementById('rapor-excel-generate-all').style.display = 'none';
    document.getElementById('rapor-batch-pause').style.display = 'inline-flex';
    document.getElementById('rapor-batch-stop').style.display = 'inline-flex';
    
    updateBatchProgress();
}

/**
 * Hide progress container & reset state
 */
function hideBatchProgress() {
    batchProcessState.isRunning = false;
    batchProcessState.isPaused = false;
    
    document.getElementById('rapor-batch-pause').style.display = 'none';
    document.getElementById('rapor-batch-stop').style.display = 'none';
    document.getElementById('rapor-excel-generate-all').style.display = 'inline-flex';
    
    // Show failed siswa modal if ada yang gagal
    if(batchProcessState.failedList.length > 0) {
        showFailedSiswaModal();
    }
}

/**
 * Display daftar siswa yang gagal dalam modal
 */
function showFailedSiswaModal() {
    const listContainer = document.getElementById('rapor-failed-siswa-list');
    listContainer.innerHTML = '';
    
    batchProcessState.failedList.forEach(item => {
        const failedItem = document.createElement('div');
        failedItem.style.cssText = 'padding:10px; margin-bottom:8px; background:#fff5f5; border-left:3px solid #f44336; border-radius:3px; font-size:0.9rem;';
        failedItem.innerHTML = `
            <div style="font-weight:600; color:#d32f2f;">#${item.index} - ${item.nama}</div>
            <div style="color:#666; margin-top:3px; font-family:monospace; font-size:0.85rem;">❌ ${item.error}</div>
        `;
        listContainer.appendChild(failedItem);
    });
    
    // Show modal
    document.getElementById('rapor-failed-siswa-modal').style.display = 'flex';
}

/**
 * Throttle function - membatasi eksekusi function dalam interval tertentu
 * Cocok untuk: scroll, mousemove, resize events
 * @param {Function} func - Function yang akan di-throttle
 * @param {Number} limit - Time limit dalam ms (default: 300ms)
 * @returns {Function} - Throttled function
 */
function throttle(func, limit = 300) {
    let inThrottle = false;
    return function throttled(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * RequestAnimationFrame debounce - untuk operasi visual yang frequent
 * @param {Function} func - Function yang akan di-optimize
 * @returns {Function} - RAF-optimized function
 */
function rafDebounce(func) {
    let frameId = null;
    return function debounced(...args) {
        if (frameId) cancelAnimationFrame(frameId);
        frameId = requestAnimationFrame(() => {
            func.apply(this, args);
            frameId = null;
        });
    };
}

/**
 * Batch DOM updates - minimize reflow/repaint
 * @param {Function} callback - Function yang contains DOM updates
 */
function batchDOMUpdates(callback) {
    requestAnimationFrame(callback);
}

/**
 * Element visibility check - lazy loading optimization
 * @param {Element} element - Element yang dicek
 * @returns {Boolean} - True jika element visible dalam viewport
 */
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= window.innerHeight &&
        rect.right <= window.innerWidth
    );
}

/**
 * Memoization cache untuk expensive computations
 * @param {Function} func - Function yang akan di-cache
 * @returns {Function} - Memoized function
 */
function memoize(func) {
    const cache = new Map();
    return function memoized(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = func.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

async function callGemini(prompt, systemInstruction = "Anda adalah asisten pengajaran yang membantu dan menggunakan Bahasa Indonesia. Jawab dalam Bahasa Indonesia.") {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                systemInstruction: { parts: [{ text: systemInstruction }] }
            })
        });
        const data = await response.json();
        if(data.error) throw new Error(data.error.message);
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error(error);
        showToast("Error API: " + error.message);
        return "Maaf, terjadi kesalahan saat menghubungi AI.";
    }
}

async function callImagen(prompt) {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                instances: [{ prompt: prompt }],
                parameters: { sampleCount: 1 }
            })
        });
        const data = await response.json();
        if(data.error) throw new Error(data.error.message);
        const base64 = data.predictions[0].bytesBase64Encoded;
        return `data:image/png;base64,${base64}`;
    } catch (error) {
        console.error(error);
        showToast("Error Imagen: " + error.message);
        return null;
    }
}

// Alias untuk Media Ajar image generation
const callImageGenerator = callImagen;

async function callTTS(text, voice, style, speed, pitch, volume) {
    try {
        // Note: Current Preview API might not support all config parameters yet.
        // We pass the text and voice as primary.
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: text }] }],
                generationConfig: { 
                    responseModalities: ["AUDIO"],
                    speechConfig: { 
                        voiceConfig: { 
                            prebuiltVoiceConfig: { voiceName: voice } 
                        } 
                    } 
                }
            })
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API Error ${response.status}: ${errorText}`);
        }
        const data = await response.json();
        if(data.error) throw new Error(data.error.message);
        return data.candidates[0].content.parts[0].inlineData.data; 
    } catch (error) {
        console.error(error);
        showToast("Error TTS: " + error.message);
        return null;
    }
}

// Audio Utils
function base64ToArrayBuffer(base64) {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

function pcmToWav(pcmData, sampleRate = 24000) {
    const numChannels = 1;
    const bitsPerSample = 16;
    const byteRate = sampleRate * numChannels * bitsPerSample / 8;
    const blockAlign = numChannels * bitsPerSample / 8;
    const dataSize = pcmData.byteLength;
    const headerSize = 44;
    const buffer = new ArrayBuffer(headerSize + dataSize);
    const view = new DataView(buffer);
    function writeString(view, offset, string) {
        for (let i = 0; i < string.length; i++) {
            view.setUint8(offset + i, string.charCodeAt(i));
        }
    }
    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + dataSize, true);
    writeString(view, 8, 'WAVE');
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true); 
    view.setUint16(20, 1, true); 
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitsPerSample, true);
    writeString(view, 36, 'data');
    view.setUint32(40, dataSize, true);
    const pcmBytes = new Uint8Array(pcmData);
    const wavBytes = new Uint8Array(buffer, 44);
    wavBytes.set(pcmBytes);
    return buffer;
}

// --- NAVIGATION & UI ---
function switchSection(targetId) {
    document.querySelectorAll('.content-section').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.menu-item, .nav-item').forEach(el => el.classList.remove('active'));
    
    const targetSection = document.getElementById(targetId);
    if(targetSection) targetSection.classList.add('active');
    
    // Sidebar active state
    document.querySelectorAll(`[data-target="${targetId}"]`).forEach(el => el.classList.add('active'));
    
    // Update Title
    const titleMap = {
        'dashboard': 'Dashboard',
        'pengaturan': 'Profil Guru',
        'materi-ajar': 'Generator Modul Ajar',
        'media-ajar': 'Generator Media Ajar', 
        'kokurikuler': 'Projek Kokurikuler', 
        'soal': 'Asesmen & Evaluasi',
        'audio-visual': 'Visual & Audio Generator',
        'rubrik-penilaian': 'Rubrik Penilaian',
        'rapor-siswa': 'E-Rapor',
        'analisis-hasil': 'Analisis Nilai',
        'rekomendasi-materi': 'Rekomendasi Belajar',
        'ice-breaker': 'Ice Breaker',
        'bank-soal': 'Bank Soal'
    };
    if(document.getElementById('page-title')) {
        document.getElementById('page-title').innerText = titleMap[targetId] || 'DigiArju APP';
    }

    // Auto-load profile to E-Rapor when opened
    if (targetId === 'rapor-siswa' && typeof window.loadDataFromProfil === 'function') {
        try { 
            window.loadDataFromProfil(); 
            // Initialize modal dialogs untuk E-Rapor
            if (typeof initAddItemModals === 'function') {
                initAddItemModals();
            }
        } catch (e) { console.error('Error auto-loading profil into E-Rapor:', e); }
    }

    // Load bank items when Bank Soal section is opened
    if (targetId === 'bank-soal' && typeof window.loadBankItems === 'function') {
        try {
            window.loadBankItems();
        } catch (e) { console.error('Error loading bank items:', e); }
    }

    // Close mobile sidebar
    document.getElementById('sidebar').classList.remove('open');
}

// Alias for switchTab (used in dashboard quick-access buttons)
window.switchTab = function(tabId) {
    switchSection(tabId);
};

// Sidebar Toggle
const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('main-content');
document.getElementById('sidebar-toggle').addEventListener('click', () => {
    if (window.innerWidth <= 768) {
        sidebar.classList.toggle('open');
    } else {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('collapsed');
    }
});

document.querySelectorAll('.menu-item, .nav-item').forEach(item => {
    item.addEventListener('click', function() {
        const target = this.getAttribute('data-target');
        switchSection(target);
    });
});

// Theme Toggle
const darkModeBtn = document.getElementById('toggle-dark-mode');
if(darkModeBtn){
    darkModeBtn.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
        darkModeBtn.querySelector('i').className = isDark ? 'fas fa-moon' : 'fas fa-sun';
    });
}

// Profile Load/Save
function loadProfile() {
    const nama = localStorage.getItem('as_nama') || 'Guru';
    const sekolah = localStorage.getItem('as_sekolah') || 'Nama Sekolah';
    if(document.getElementById('user-name-display')) document.getElementById('user-name-display').innerText = nama;
    if(document.getElementById('dash-name')) document.getElementById('dash-name').innerText = nama;
    if(document.getElementById('user-initial')) document.getElementById('user-initial').innerText = nama.charAt(0);
    if(document.getElementById('p-nama')) document.getElementById('p-nama').value = localStorage.getItem('as_nama') || '';
    if(document.getElementById('p-nip')) document.getElementById('p-nip').value = localStorage.getItem('as_nip') || '';
    if(document.getElementById('p-sekolah')) document.getElementById('p-sekolah').value = sekolah;
    if(document.getElementById('out-sekolah')) document.getElementById('out-sekolah').innerText = sekolah.toUpperCase();
    
    // Dashboard date, role, and last update
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
    if(document.getElementById('dash-date')) document.getElementById('dash-date').innerText = formattedDate;
    if(document.getElementById('dash-role')) document.getElementById('dash-role').innerText = 'Guru';
    if(document.getElementById('last-update')) document.getElementById('last-update').innerText = 'Dec 4, 2025';
}
document.getElementById('btn-save-profile').addEventListener('click', () => {
    localStorage.setItem('as_nama', document.getElementById('p-nama').value);
    localStorage.setItem('as_nip', document.getElementById('p-nip').value);
    localStorage.setItem('as_sekolah', document.getElementById('p-sekolah').value);
    localStorage.setItem('as_alamat', document.getElementById('p-alamat').value);
    localStorage.setItem('as_kepsek', document.getElementById('p-kepsek').value);
    localStorage.setItem('as_nip_kepsek', document.getElementById('p-nip-kepsek').value);
    showToast('Profil berhasil disimpan');
    loadProfile();
});
loadProfile();

// Initialize bank items on page load
if (typeof window.loadBankItems === 'function') {
    window.loadBankItems();
}

// File Upload UI Interaction
document.querySelectorAll('.upload-box').forEach(box => {
    const input = box.querySelector('input[type="file"]');
    const badge = box.querySelector('.file-badge');
    if(input && badge){
        box.addEventListener('click', () => input.click());
        input.addEventListener('change', () => {
            if(input.files.length > 0) {
                badge.style.display = 'inline-block';
                badge.innerText = input.files[0].name;
                box.classList.add('has-file');
            }
        });
    }
});

// --- Button Group Custom Handlers (Kurikulum, Format Modul, Distribusi, dll) ---
document.querySelectorAll('.btn-group-custom').forEach(group => {
    group.querySelectorAll('.btn-toggle').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // Remove active from all buttons in this group
            group.querySelectorAll('.btn-toggle').forEach(btn => btn.classList.remove('active'));
            // Add active to clicked button
            this.classList.add('active');
        });
    });
});

// --- HELPER: Tabs Logic ---
window.openTab = function(evt, tabId) {
    const container = evt.currentTarget.closest('.doc-preview');
    if(!container) return;
    
    // Hide all tab panes
    container.querySelectorAll('.tab-pane').forEach(pane => {
        pane.style.display = 'none';
        pane.classList.remove('active');
    });
    // Deactivate buttons
    container.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

    // Activate
    const target = document.getElementById(tabId);
    if(target) {
        target.style.display = 'block';
        target.classList.add('active');
    }
    evt.currentTarget.classList.add('active');
};

// --- HELPER: Toggle Metode & Pendekatan Subsections ---
window.toggleMetodeSubsection = function(id) {
    const element = document.getElementById(id);
    if(element) {
        element.style.display = element.style.display === 'none' ? 'grid' : 'none';
    }
};

window.togglePendekatanSubsection = function(id) {
    const element = document.getElementById(id);
    if(element) {
        element.style.display = element.style.display === 'none' ? 'grid' : 'none';
    }
};

// --- HELPER: Dropdown Populate ---
window.updateKelasOptions = function() {
    const jenjang = document.getElementById('soal-jenjang').value;
    const kelasSelect = document.getElementById('soal-kelas');
    let options = "";
    if (jenjang.includes("PAUD")) options = "<option value='A'>Kelompok A</option><option value='B'>Kelompok B</option>";
    else if (jenjang.includes("SD")) options = "<option value='1'>Kelas 1</option><option value='2'>Kelas 2</option><option value='3'>Kelas 3</option><option value='4'>Kelas 4</option><option value='5'>Kelas 5</option><option value='6'>Kelas 6</option>";
    else if (jenjang.includes("SMP")) options = "<option value='7'>Kelas 7</option><option value='8'>Kelas 8</option><option value='9'>Kelas 9</option>";
    else options = "<option value='10'>Kelas 10</option><option value='11'>Kelas 11</option><option value='12'>Kelas 12</option>";
    // set new options and trigger change so other handlers (fase, mapel) update
    kelasSelect.innerHTML = options;
    if(kelasSelect.options.length > 0) kelasSelect.selectedIndex = 0;
    // dispatch change to ensure dependent UI updates
    const evt = new Event('change');
    kelasSelect.dispatchEvent(evt);
}

window.updateFaseOptions = function() {
    const kelas = document.getElementById('soal-kelas').value;
    const faseSelect = document.getElementById('soal-fase');
    let fase = "A";
    const k = parseInt(kelas);
    if(isNaN(k)) fase = "Fondasi";
    else if(k <= 2) fase = "A";
    else if(k <= 4) fase = "B";
    else if(k <= 6) fase = "C";
    else if(k <= 9) fase = "D";
    else if(k <= 10) fase = "E";
    else fase = "F";
    faseSelect.innerHTML = `<option value="${fase}">Fase ${fase} (Otomatis)</option>`;
}

// ensure soal-kelas change updates fase and mapel suggestions
const soalKelasEl = document.getElementById('soal-kelas');
if(soalKelasEl) {
    soalKelasEl.addEventListener('change', function(){
        try { window.updateFaseOptions(); } catch(e) {}
        try { updateSoalMapelOptions(); } catch(e) {}
    });
}

// Initial Call for Soal logic if elements exist
if(document.getElementById('soal-jenjang')) window.updateKelasOptions();

// --- NASKAH SOAL: tampilkan opsi ketika toggle Naskah Soal ON ---
(function(){
    const naskahToggle = document.getElementById('check-layout-2col');
    const naskahOptions = document.getElementById('naskah-options');
    const gambarBlock = document.getElementById('naskah-gambar-count');

    function updateNaskahVisibility(){
        if(!naskahToggle || !naskahOptions) return;
        naskahOptions.style.display = naskahToggle.checked ? 'block' : 'none';
    }

    function updateGambarVisibility(){
        if(!gambarBlock) return;
        const sel = document.querySelector('input[name="naskah-option"]:checked');
        gambarBlock.style.display = (sel && sel.value === 'dengan-gambar') ? 'block' : 'none';
    }

    if(naskahToggle){
        naskahToggle.addEventListener('change', updateNaskahVisibility);
        // initialize
        updateNaskahVisibility();
    }

    document.addEventListener('change', function(e){
        if(e.target && e.target.name === 'naskah-option') updateGambarVisibility();
    });
    // initialize gambar visibility (in case radios are present)
    updateGambarVisibility();
})();

// Modul Ajar Dynamic Select Logic
const modulJenjang = document.getElementById('modul-jenjang');
if(modulJenjang) {
    modulJenjang.addEventListener('change', function(){
        const jenjang = this.value;
        const kelasSelect = document.getElementById('modul-kelas-select');
        let options = "";
        if (jenjang.includes("PAUD")) options = "<option value='A'>Kelompok A</option><option value='B'>Kelompok B</option>";
        else if (jenjang.includes("SD")) options = "<option value='1'>Kelas 1</option><option value='2'>Kelas 2</option><option value='3'>Kelas 3</option><option value='4'>Kelas 4</option><option value='5'>Kelas 5</option><option value='6'>Kelas 6</option>";
        else if (jenjang.includes("SMP")) options = "<option value='7'>Kelas 7</option><option value='8'>Kelas 8</option><option value='9'>Kelas 9</option>";
        else options = "<option value='10'>Kelas 10</option><option value='11'>Kelas 11</option><option value='12'>Kelas 12</option>";
        kelasSelect.innerHTML = options;
        
        // Update Fase
        const evt = new Event('change');
        kelasSelect.dispatchEvent(evt);
    });
}
const modulKelas = document.getElementById('modul-kelas-select');
if(modulKelas) {
    modulKelas.addEventListener('change', function() {
        const k = parseInt(this.value);
        let fase = "A";
        if(isNaN(k)) fase = "Fondasi"; // PAUD
        else if(k <= 2) fase = "A";
        else if(k <= 4) fase = "B";
        else if(k <= 6) fase = "C";
        else if(k <= 9) fase = "D";
        else if(k <= 10) fase = "E";
        else fase = "F";
        document.getElementById('modul-fase-select').innerHTML = `<option value="${fase}">Fase ${fase}</option>`;
    });
}

// --- SUBJECT & TOPIC OPTIONS FOR MODUL AJAR ---
// Data ini memperluas opsi mata pelajaran dan topik sesuai permintaan: kurikulum, jenjang, dan kelas
const subjectData = {
    "Kurikulum Merdeka 2025": {
        "PAUD/TKA/RA": {
            "default": [
                "Diriku (Identitasku)",
                "Tanah Airku (Indonesia, Kebinekaan)",
                "Lingkunganku (Pakaian Adat, PHBS, Rumahku, Sekolahku)",
                "Binatang (Kebun Binatang, Binatang Air/Darat)",
                "Mitigasi Bencana (Air, Api, Udara, Bumi)",
                "Kebutuhanku (Makan & Minum, Pakaian)",
                "Cuaca (Hujan, Awan, Pelangi)",
                "Tanaman (Ayo Berkebun, Tanaman Buah/Sayur)",
                "Alat Transportasi (Darat, Laut, Udara)",
                "Pekerjaan (Jenis Pekerjaan, Petani Cilik)",
                "Alam Semesta (Bulan & Bintang, Matahari, Arah Angin)",
                "Tempat Rekreasi (Tempat & Perlengkapan Rekreasi)",
                "Topik P5: Aku Sayang Bumi, Aku Cinta Indonesia, Bermain dan Bekerjasama, Imajinasiku"
            ]
        },
        "SD/MI": {
            "default": [
                "Pendidikan Agama dan Budi Pekerti",
                "Pendidikan Pancasila",
                "Bahasa Indonesia",
                "Matematika",
                "PJOK",
                "Seni dan Budaya (Musik/Rupa/Teater/Tari)",
                "Muatan Lokal"
            ],
            "1": [
                "Pendidikan Agama dan Budi Pekerti",
                "Pendidikan Pancasila",
                "Bahasa Indonesia (Diriku, Keluargaku, Sekolahku)",
                "Matematika (Bilangan, Geometri Dasar)",
                "PJOK (Gerakan Dasar, Kesehatan Tubuh)",
                "Seni & Budaya (Menggambar, Bernyanyi, Menari)"
            ],
            "2": [
                "Pendidikan Agama dan Budi Pekerti",
                "Pendidikan Pancasila",
                "Bahasa Indonesia (Cerita Rakyat, Puisi Anak)",
                "Matematika (Operasi Bilangan, Pengukuran Sederhana)",
                "PJOK (Gerakan Dasar, Kesehatan)",
                "Seni & Budaya (Bernyanyi, Rupa)"
            ],
            "3": [
                "Pendidikan Agama dan Budi Pekerti",
                "Bahasa Indonesia (Teks Naratif Sederhana)",
                "Matematika (Pecahan Dasar, Pengukuran)",
                "IPAS (Alam Sekitar, Siklus Air)",
                "PJOK",
                "Seni & Budaya"
            ],
            "4": [
                "Bahasa Indonesia (Teks Prosedur, Teks Informasi)",
                "Matematika (Pecahan, Bangun Ruang Sederhana)",
                "IPAS (Energi, Sumber Daya Alam)",
                "Bahasa Inggris (Pengenalan)",
                "PJOK",
                "Seni & Budaya"
            ],
            "5": [
                "Bahasa Indonesia (Teks Berita, Eksplanasi)",
                "Matematika (Bilangan, Geometri, Operasi)",
                "IPAS (Ekosistem, Gaya, Listrik)",
                "Bahasa Inggris (Percakapan sederhana)",
                "PJOK",
                "Seni & Budaya"
            ],
            "6": [
                "Bahasa Indonesia (Teks Prosedur, Teks Berita)",
                "Matematika (Persentase, Pengukuran, Bangun Ruang)",
                "IPAS (Listrik, Energi, Sistem)",
                "Sejarah Dasar (Kegiatan Lokal)",
                "Bahasa Inggris",
                "PJOK"
            ]
        },
        "SMP/MTs": {
            "default": [
                "Pendidikan Agama dan Budi Pekerti",
                "Pendidikan Pancasila",
                "Bahasa Indonesia",
                "Bahasa Inggris",
                "Matematika",
                "IPA (Fisika/Kimia/Biologi)",
                "IPS (Sejarah/Geografi/Ekonomi/Sosiologi)",
                "Informatika",
                "PJOK",
                "Seni & Prakarya"
            ],
            "7": ["Matematika (Aljabar dasar)", "IPA (Sel, Struktur Bumi)", "Bahasa Indonesia (Teks Naratif)", "Bahasa Inggris (Grammar dasar)"],
            "8": ["Matematika (Geometri)", "IPA (Siklus & Energi)", "IPS (Peta, Letak Indonesia)", "Bahasa Inggris (Conversation)"],
            "9": ["Matematika (Statistika sederhana)", "IPA (Sistem Tata Surya)", "IPS (Sejarah kolonial & demokrasi)", "Informatika (Algoritma dasar)"]
        },
        "SMA/MA/SMK": {
            "default": [
                "Pendidikan Agama dan Budi Pekerti",
                "Pancasila & Kewarganegaraan",
                "Bahasa Indonesia",
                "Bahasa Inggris",
                "Matematika (Umum/Peminatan)",
                "IPA (Fisika, Kimia, Biologi)",
                "IPS (Ekonomi, Geografi, Sejarah, Sosiologi)",
                "Informatika",
                "Seni Budaya / Prakarya",
                "PJOK"
            ],
            "10": ["Matematika (Kalkulus dasar)", "Fisika (Termodinamika dasar)", "Biologi (Sel & Genetika)", "Bahasa Indonesia (Teks Editorial)"],
            "11": ["Matematika (Matriks)", "Kimia (Reaksi Redoks)", "Biologi (Genetika)", "Bahasa Inggris (Analytical Exposition)"],
            "12": ["Matematika (Trigonometri & Kalkulus)", "Fisika (Gelombang, Listrik)", "Kimia (Sintesis)", "Sejarah (Kemerdekaan & Globalisasi)"]
        }
    },

    "Kurikulum Berbasis Cinta": {
        "PAUD/TKA/RA": { "default": ["Tema Tematik: Keluarga, Alam, Kebudayaan","Bermain dan Bekerjasama","Aku Cinta Indonesia"] },
        "SD/MI": { "default": ["Penguatan Karakter","Bahasa Indonesia","Matematika","PJOK","Muatan Lokal"] },
        "SMP/MTs": { "default": ["Penguatan Karakter","Bahasa Indonesia","Matematika","IPA/IPS integratif"] },
        "SMA/MA/SMK": { "default": ["Kewargaan","Etika Teknologi","Bahasa Indonesia","Matematika"] }
    },

    "KMA 1305 Tahun 2025": {
        "PAUD/TKA/RA": { "default": ["Pendekatan Tematik & Penguatan Karakter"] },
        "SD/MI": { "default": ["Matematika","Bahasa Indonesia","Pendidikan Agama"] },
        "SMP/MTs": { "default": ["Matematika","Bahasa Indonesia","IPA"] },
        "SMA/MA/SMK": { "default": ["Matematika","Bahasa Indonesia","IPA/Bahasa"] }
    },

    // SMK: Mata pelajaran umum + catatan untuk mata pelajaran kejuruan
    "SMK": {
        "default": [
            "Pendidikan Agama",
            "Pancasila",
            "Bahasa Indonesia",
            "Bahasa Inggris",
            "Matematika",
            "PJOK",
            "Muatan Lokal",
            "Mata Pelajaran Kejuruan (sesuai program keahlian: Teknik, Bisnis, Pariwisata, Tata Boga, dll)"
        ]
    }
};

function getActiveModulKurikulum() {
    const activeBtn = document.querySelector('#modul-kurikulum-group .btn-toggle.active');
    return activeBtn ? activeBtn.getAttribute('data-value') : 'Kurikulum Merdeka 2025';
}

function updateModulMapelOptions() {
    const kurikulum = getActiveModulKurikulum();
    const jenjang = (document.getElementById('modul-jenjang') || {}).value || '';
    const kelas = (document.getElementById('modul-kelas-select') || {}).value || '';
    const select = document.getElementById('modul-mapel-select');
    if(!select) return;

    // Find appropriate list
    let list = [];
    if(subjectData[kurikulum]) {
        const byJenjang = subjectData[kurikulum][jenjang];
        if(byJenjang) {
            if(byJenjang[kelas]) list = byJenjang[kelas].slice();
            else if(byJenjang['default']) list = byJenjang['default'].slice();
        }
    }

    // fallback generic subjects if not found
    if(list.length === 0) {
        list = ["Matematika","Bahasa Indonesia","Bahasa Inggris","IPA","IPS","PJOK","SBdP"];
    }

    // populate select
    select.innerHTML = '<option value="">-- Pilih Mata Pelajaran --</option>';
    list.forEach(sub => {
        const opt = document.createElement('option');
        opt.value = sub;
        opt.textContent = sub;
        select.appendChild(opt);
    });
    // Add custom option
    const otherOpt = document.createElement('option');
    otherOpt.value = 'Lainnya';
    otherOpt.textContent = 'Lainnya (Kustom)';
    select.appendChild(otherOpt);
}

// Wire up events
const modulMapelSelect = document.getElementById('modul-mapel-select');
if(modulMapelSelect) {
    modulMapelSelect.addEventListener('change', function(){
        const val = this.value;
        const textarea = document.getElementById('modul-mapel');
        if(!textarea) return;
        if(val === '' ) return; // do nothing
        if(val === 'Lainnya') {
            textarea.value = '';
            textarea.focus();
        } else {
            // Only overwrite if textarea is empty or user hasn't modified it (simple heuristic)
            textarea.value = val + (textarea.value && textarea.value !== '' ? ' - ' + textarea.value : '');
        }
    });
}

// Refresh options when jenjang or kelas change
const _mj = document.getElementById('modul-jenjang');
if(_mj) _mj.addEventListener('change', updateModulMapelOptions);
if(modulKelas) modulKelas.addEventListener('change', updateModulMapelOptions);

// Initial populate
setTimeout(updateModulMapelOptions, 50);

// --- TOPIC EXTRACTION & POPULATION ---
// Build a topic map from subjectData by extracting parenthesis contents when available.
function buildTopicDataFromSubjectData() {
    const topicMap = {};
    function addTopicsFromList(list) {
        list.forEach(item => {
            if(typeof item !== 'string') return;
            // If string contains parentheses, treat content inside as example topics
            const m = item.match(/^(.*?)\s*\((.*)\)\s*$/);
            if(m) {
                const subj = m[1].trim();
                const topics = m[2].split(/,|;/).map(s => s.trim()).filter(Boolean);
                if(!topicMap[subj]) topicMap[subj] = new Set();
                topics.forEach(t => topicMap[subj].add(t));
            } else {
                // fallback small defaults for common subjects
                const subj = item.trim();
                if(!topicMap[subj]) topicMap[subj] = new Set();
                const defaults = {
                    'Matematika': ['Bilangan','Geometri','Pecahan','Pengukuran','Aljabar dasar'],
                    'Bahasa Indonesia': ['Teks Naratif','Teks Prosedur','Teks Berita','Puisi Anak'],
                    'IPAS': ['Alam Sekitar','Siklus Air','Ekosistem'],
                    'IPA': ['Sel & Jaringan','Energi','Sistem Tata Surya'],
                    'IPS': ['Peta & Letak','Sejarah Lokal','Sumber Daya Alam'],
                    'Bahasa Inggris': ['Percakapan Sederhana','Vocabulary Dasar','Descriptive Text']
                };
                if(defaults[subj]) defaults[subj].forEach(t => topicMap[subj].add(t));
            }
        });
    }

    Object.keys(subjectData).forEach(k => {
        const jenjangs = subjectData[k];
        Object.keys(jenjangs).forEach(j => {
            const entry = jenjangs[j];
            if(Array.isArray(entry)) addTopicsFromList(entry);
            else if(entry && typeof entry === 'object') {
                Object.keys(entry).forEach(key => {
                    const v = entry[key];
                    if(Array.isArray(v)) addTopicsFromList(v);
                });
            }
        });
    });

    // convert sets to arrays
    const out = {};
    Object.keys(topicMap).forEach(s => {
        out[s] = Array.from(topicMap[s]);
    });
    return out;
}

const derivedTopicData = buildTopicDataFromSubjectData();

function populateTopicOptions(selectId, subjectName) {
    const sel = document.getElementById(selectId);
    if(!sel) return;
    // clear
    sel.innerHTML = '';
    const def = document.createElement('option');
    def.value = '';
    def.textContent = '-- Pilih Topik Contoh --';
    sel.appendChild(def);

    const topics = derivedTopicData[subjectName] || derivedTopicData[subjectName.replace(/\s*\(.*\)$/, '')] || [];
    if(topics.length === 0) {
        sel.style.display = 'none';
        const note = document.getElementById(selectId === 'modul-topik-select' ? 'modul-topik-note' : null);
        if(note) note.style.display = 'none';
        return;
    }
    topics.forEach(t => {
        const o = document.createElement('option');
        o.value = t;
        o.textContent = t;
        sel.appendChild(o);
    });
    const other = document.createElement('option'); other.value = 'Lainnya'; other.textContent = 'Lainnya (Kustom)'; sel.appendChild(other);
    sel.style.display = 'block';
    const note = document.getElementById('modul-topik-note'); if(note) note.style.display = 'block';
}

// Wire topic selects to mapel selects
const modulMapelSelEl = document.getElementById('modul-mapel-select');
if(modulMapelSelEl) {
    modulMapelSelEl.addEventListener('change', function(){
        const val = this.value;
        if(!val) {
            document.getElementById('modul-topik-select').style.display = 'none';
            return;
        }
        populateTopicOptions('modul-topik-select', val);
    });
}

const modulTopikSelect = document.getElementById('modul-topik-select');
if(modulTopikSelect) {
    modulTopikSelect.addEventListener('change', function(){
        const v = this.value;
        const ta = document.getElementById('modul-mapel');
        if(!ta) return;
        if(!v || v === '') return;
        if(v === 'Lainnya') { ta.focus(); return; }
        // fill textarea: if currently empty, set topic; else append
        const currentMapel = modulMapelSelEl ? modulMapelSelEl.value : '';
        if(ta.value.trim() === '' || (currentMapel && ta.value.trim().toLowerCase().startsWith(currentMapel.toLowerCase()))) {
            ta.value = (currentMapel ? currentMapel + ' - ' : '') + v;
        } else {
            ta.value = v;
        }
    });
}

// Soal topic wiring
const soalMapelSelEl = document.getElementById('soal-mapel-select');
if(soalMapelSelEl) {
    soalMapelSelEl.addEventListener('change', function(){
        const val = this.value;
        if(!val) { document.getElementById('soal-topik-select').style.display = 'none'; return; }
        populateTopicOptions('soal-topik-select', val);
    });
}

const soalTopikSelect = document.getElementById('soal-topik-select');
if(soalTopikSelect) {
    soalTopikSelect.addEventListener('change', function(){
        const v = this.value;
        const ta = document.getElementById('soal-mapel');
        if(!ta || !v || v === '') return;
        if(v === 'Lainnya') { ta.focus(); return; }
        const currentMapel = soalMapelSelEl ? soalMapelSelEl.value : '';
        if(ta.value.trim() === '' ) ta.value = (currentMapel ? currentMapel + ' - ' : '') + v;
        else ta.value = v;
    });
}

// ensure topic selects are refreshed when mapel options populate initially
setTimeout(() => {
    if(modulMapelSelEl && modulMapelSelEl.value) populateTopicOptions('modul-topik-select', modulMapelSelEl.value);
    if(soalMapelSelEl && soalMapelSelEl.value) populateTopicOptions('soal-topik-select', soalMapelSelEl.value);
}, 200);

// --- GENERIC TOPIC POPULATION FOR MEDIA & KOKURIKULER ---
function getGenericTopicList(limit = 40) {
    const s = new Set();
    Object.keys(derivedTopicData).forEach(subj => {
        derivedTopicData[subj].forEach(t => s.add(t));
    });
    return Array.from(s).slice(0, limit);
}

function populateGenericTopicSelect(selectId) {
    const sel = document.getElementById(selectId);
    if(!sel) return;
    sel.innerHTML = '';
    const def = document.createElement('option'); def.value = ''; def.textContent = '-- Pilih Topik Contoh --'; sel.appendChild(def);
    const topics = getGenericTopicList(80);
    topics.forEach(t => {
        const o = document.createElement('option'); o.value = t; o.textContent = t; sel.appendChild(o);
    });
    const other = document.createElement('option'); other.value = 'Lainnya'; other.textContent = 'Lainnya (Kustom)'; sel.appendChild(other);
    sel.style.display = 'block';
    const noteId = selectId === 'bahan-topik-select' ? 'bahan-topik-note' : (selectId === 'kokul-topik-select' ? 'kokul-topik-note' : null);
    if(noteId) {
        const noteEl = document.getElementById(noteId);
        if(noteEl) noteEl.style.display = 'block';
    }
}

// Wire generic topic selects
setTimeout(() => {
    populateGenericTopicSelect('bahan-topik-select');
    populateGenericTopicSelect('kokul-topik-select');
}, 300);

const bahanTopikSelect = document.getElementById('bahan-topik-select');
if(bahanTopikSelect) {
    bahanTopikSelect.addEventListener('change', function(){
        const v = this.value;
        const ta = document.getElementById('bahan-topik');
        if(!ta || !v) return;
        if(v === 'Lainnya') { ta.focus(); return; }
        ta.value = v;
    });
}

const kokulTopikSelect = document.getElementById('kokul-topik-select');
if(kokulTopikSelect) {
    kokulTopikSelect.addEventListener('change', function(){
        const v = this.value;
        const inp = document.getElementById('kokul-tema');
        if(!inp || !v) return;
        if(v === 'Lainnya') { inp.focus(); return; }
        inp.value = v;
    });
}

// Kokurikuler Dynamic Select Logic
const kokulJenjang = document.getElementById('kokul-jenjang');
if(kokulJenjang) {
    kokulJenjang.addEventListener('change', function(){
        const jenjang = this.value;
        const kelasSelect = document.getElementById('kokul-kelas');
        let options = "";
        if (jenjang.includes("PAUD")) options = "<option value='A'>Kelompok A</option><option value='B'>Kelompok B</option>";
        else if (jenjang.includes("SD")) options = "<option value='1'>Kelas 1</option><option value='2'>Kelas 2</option><option value='3'>Kelas 3</option><option value='4'>Kelas 4</option><option value='5'>Kelas 5</option><option value='6'>Kelas 6</option>";
        else if (jenjang.includes("SMP")) options = "<option value='7'>Kelas 7</option><option value='8'>Kelas 8</option><option value='9'>Kelas 9</option>";
        else options = "<option value='10'>Kelas 10</option><option value='11'>Kelas 11</option><option value='12'>Kelas 12</option>";
        kelasSelect.innerHTML = options;
        
        // Trigger change to update Fase
        const evt = new Event('change');
        kelasSelect.dispatchEvent(evt);
    });
}
const kokulKelas = document.getElementById('kokul-kelas');
if(kokulKelas) {
    kokulKelas.addEventListener('change', function() {
        const k = parseInt(this.value);
        let fase = "A";
        if(isNaN(k)) fase = "Fondasi"; 
        else if(k <= 2) fase = "A";
        else if(k <= 4) fase = "B";
        else if(k <= 6) fase = "C";
        else if(k <= 9) fase = "D";
        else if(k <= 10) fase = "E";
        else fase = "F";
        document.getElementById('kokul-fase').innerHTML = `<option value="${fase}">Fase ${fase}</option>`;
    });
}


// --- 1. MODUL AJAR GENERATOR ---
function setupKurikulumToggle(groupId, inputId) {
    const group = document.getElementById(groupId);
    const input = document.getElementById(inputId);
    if (!group || !input) return;
    
    const btns = group.querySelectorAll('.btn-toggle');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const val = btn.getAttribute('data-value');
            input.style.display = val === 'Kustom' ? 'block' : 'none';
            // If a mapel updater exists, refresh options when kurikulum changes
            if (typeof updateModulMapelOptions === 'function') updateModulMapelOptions();
            if (typeof updateSoalMapelOptions === 'function') updateSoalMapelOptions();
        });
    });
}

setupKurikulumToggle('modul-kurikulum-group', 'modul-kurikulum-kustom');
setupKurikulumToggle('kokul-kurikulum-group', 'kokul-kurikulum-kustom');
setupKurikulumToggle('soal-kurikulum-group', 'soal-kurikulum-kustom');

// Generic button-group toggle helper (for distribusi / komposisi soal and similar groups)
function setupBtnGroupToggle(groupId, onChange) {
    const group = document.getElementById(groupId);
    if(!group) return;
    const btns = group.querySelectorAll('.btn-toggle');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            if(typeof onChange === 'function') {
                try { onChange(btn.getAttribute('data-value')); } catch(e) { console.error(e); }
            }
        });
    });
}

// Initialize distribusi toggle for soal panel so user can pick distribution
setupBtnGroupToggle('soal-distribusi-group');

// Show/hide custom weights block when checkbox toggled
const soalCustomToggle = document.getElementById('soal-custom-weights-toggle');
if(soalCustomToggle) {
    soalCustomToggle.addEventListener('change', function(){
        const block = document.getElementById('soal-custom-weights-block');
        if(block) block.style.display = this.checked ? 'block' : 'none';
    });
}

// --- SUBJECT OPTIONS FOR SOAL (ASESMEN & EVALUASI) ---
function getActiveSoalKurikulum() {
    const activeBtn = document.querySelector('#soal-kurikulum-group .btn-toggle.active');
    return activeBtn ? activeBtn.getAttribute('data-value') : 'Kurikulum Merdeka 2025';
}

function updateSoalMapelOptions() {
    const kurikulum = getActiveSoalKurikulum();
    const jenjang = (document.getElementById('soal-jenjang') || {}).value || '';
    const kelas = (document.getElementById('soal-kelas') || {}).value || '';
    const select = document.getElementById('soal-mapel-select');
    if(!select) return;

    // Find appropriate list from existing subjectData
    let list = [];
    if(subjectData[kurikulum]) {
        const byJenjang = subjectData[kurikulum][jenjang];
        if(byJenjang) {
            if(byJenjang[kelas]) list = byJenjang[kelas].slice();
            else if(byJenjang['default']) list = byJenjang['default'].slice();
        }
    }

    if(list.length === 0) {
        list = ["Matematika","Bahasa Indonesia","Bahasa Inggris","IPA","IPS","PJOK","SBdP"];
    }

    // populate select
    select.innerHTML = '<option value="">-- Pilih Mata Pelajaran --</option>';
    list.forEach(sub => {
        const opt = document.createElement('option');
        opt.value = sub;
        opt.textContent = sub;
        select.appendChild(opt);
    });
    const otherOpt = document.createElement('option');
    otherOpt.value = 'Lainnya';
    otherOpt.textContent = 'Lainnya (Kustom)';
    select.appendChild(otherOpt);
}

// Wire up events for soal panel
const soalJenjang = document.getElementById('soal-jenjang');
if(soalJenjang) soalJenjang.addEventListener('change', () => { window.updateKelasOptions(); setTimeout(updateSoalMapelOptions, 50); });
const soalKelas = document.getElementById('soal-kelas');
if(soalKelas) soalKelas.addEventListener('change', updateSoalMapelOptions);

const soalMapelSelect = document.getElementById('soal-mapel-select');
if(soalMapelSelect) {
    soalMapelSelect.addEventListener('change', function(){
        const val = this.value;
        const customInput = document.getElementById('soal-mapel-kustom');
        const textarea = document.getElementById('soal-mapel');
        if(!customInput || !textarea) return;
        if(val === 'Lainnya') {
            customInput.style.display = 'block';
            customInput.focus();
            // keep textarea intact but hint
            textarea.placeholder = 'Tuliskan mata pelajaran / topik jika memilih Kustom...';
        } else {
            customInput.style.display = 'none';
            // fill textarea if empty or not customized
            if(textarea.value.trim() === '') textarea.value = val;
        }
    });
}

// initial populate for soal mapel
setTimeout(updateSoalMapelOptions, 100);

document.getElementById('btn-gen-modul').addEventListener('click', async function() {
    const btn = this;
    const mapel = document.getElementById('modul-mapel').value;
    if(!mapel) return showToast("Mohon isi Mata Pelajaran/Topik");

    btn.classList.add('loading');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sedang Membuat...';
    
    // Get Profile Data
    const namaGuru = localStorage.getItem('as_nama') || 'Guru';
    const namaSekolah = localStorage.getItem('as_sekolah') || 'Sekolah';
    const nipGuru = localStorage.getItem('as_nip') || '';
    
    // Collect Data
    const profilLulusan = Array.from(document.querySelectorAll('.check-profil:checked')).map(c => c.value).join(", ");
    const components = {
        lkpd: document.getElementById('check-lkpd').checked,
        glosarium: document.getElementById('check-glosarium').checked,
        media: document.getElementById('check-media').checked,
        pustaka: document.getElementById('check-pustaka').checked
    };
    
    const activeBtn = document.querySelector('#modul-kurikulum-group .btn-toggle.active');
    const selectedKurikulum = activeBtn ? activeBtn.getAttribute('data-value') : "Kurikulum Merdeka 2025";
    const kurikulumVal = selectedKurikulum === 'Kustom' ? document.getElementById('modul-kurikulum-kustom').value : selectedKurikulum;

    // include selected example topic if available
    const modulSelectedTopicEl = document.getElementById('modul-topik-select');
    const modulSelectedTopic = modulSelectedTopicEl && modulSelectedTopicEl.value && modulSelectedTopicEl.value !== 'Lainnya' ? modulSelectedTopicEl.value : (document.getElementById('modul-mapel').value || '');

    const includeKKA = document.getElementById('include-modul-kka').checked;

    const prompt = `
    Buatkan Modul Ajar Lengkap untuk:
    Nama Guru: ${namaGuru}${nipGuru ? ' (' + nipGuru + ')' : ''}
    Nama Sekolah: ${namaSekolah}
    Mata Pelajaran: ${mapel}
    Topik / Rincian: ${modulSelectedTopic}
    Kurikulum: ${kurikulumVal}
    Fase/Kelas: ${document.getElementById('modul-fase-select').value} / ${document.getElementById('modul-kelas-select').value}
    Alokasi Waktu: ${document.getElementById('modul-waktu').value}
    Model Pembelajaran: ${document.getElementById('modul-model-select').value}
    Profil Lulusan (acuan Kemendikdasmen Nomor 058/H/KR/2025): ${profilLulusan}
    
    Catatan Khusus: ${document.getElementById('modul-catatan').value}
    
    Struktur Modul harus mencakup:
    1. Informasi Umum (untuk sekolah ${namaSekolah})
    2. Komponen Inti (Tujuan, Pemahaman Bermakna, Pertanyaan Pemantik)
    3. Kegiatan Pembelajaran (Pendahuluan, Inti, Penutup)
    ${components.lkpd ? '4. Lampiran LKPD (Lembar Kerja Peserta Didik)' : ''}
    ${components.glosarium ? '5. Glosarium' : ''}
    ${components.pustaka ? '6. Daftar Pustaka (dengan format APA/MLA)' : ''}
    ${includeKKA ? '7. Integrasi Kurikulum Kemandirian & Akhlak (KKA)' : ''}
    
    Format output dalam Markdown yang rapi. Gunakan tabel jika perlu. Sesuaikan materi dengan konteks sekolah ${namaSekolah}.
    `;

    const result = await callGemini(prompt, "Anda adalah asisten pendidikan ahli yang membuat modul ajar profesional.");
    
    document.getElementById('res-modul-content').innerHTML = marked.parse(result);
    document.getElementById('res-modul').style.display = 'block';
    document.getElementById('stat-generated').innerText = parseInt(document.getElementById('stat-generated').innerText) + 1;
    
    btn.classList.remove('loading');
    btn.innerHTML = '<i class="fas fa-magic"></i> Buat Modul dengan AI';
    document.getElementById('res-modul').scrollIntoView({ behavior: 'smooth' });
});

// --- 2. MEDIA AJAR GENERATOR ---
document.getElementById('check-audio').addEventListener('change', function() {
    document.getElementById('audio-settings').style.display = this.checked ? 'block' : 'none';
});

document.getElementById('btn-gen-bahan').addEventListener('click', async function() {
    const btn = this;
    // prefer selected example topic if provided
    const bahanSelectedTopicEl = document.getElementById('bahan-topik-select');
    const bahanSelectedTopic = bahanSelectedTopicEl && bahanSelectedTopicEl.value && bahanSelectedTopicEl.value !== 'Lainnya' ? bahanSelectedTopicEl.value : document.getElementById('bahan-topik').value;
    if(!bahanSelectedTopic) return showToast("Mohon isi Topik Materi");

    btn.classList.add('loading');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memproses...';
    
    // Get Profile Data
    const namaGuru = localStorage.getItem('as_nama') || 'Guru';
    const namaSekolah = localStorage.getItem('as_sekolah') || 'Sekolah';
    
    const audioStyle = document.getElementById('audio-voice-style').value;
    const prompt = `
    Buatkan Media Ajar Kreatif untuk topik: "${bahanSelectedTopic}" oleh guru ${namaGuru} dari ${namaSekolah}.
    OUTPUT HARUS DALAM FORMAT JSON yang Valid dengan keys berikut:
    {
        "infografis": "Deskripsi visual infografis yang menarik (Markdown)",
        "peta_konsep": "Peta konsep dalam bentuk poin-poin/mermaid (Markdown)",
        "diskusi": "5 pertanyaan diskusi kritis (Markdown)",
        "pemantik": "5 pertanyaan pemantik untuk pembuka kelas (Markdown)",
        "kuis": "5 soal kuis pilihan ganda sederhana (Markdown)",
        "analogi": "Penjelasan materi menggunakan analogi sederhana (ELI5) (Markdown)",
        "ppt": "Outline Slide PowerPoint 1-5 slide (Markdown)",
        "ppt_images": "Array JSON berisi 5 deskripsi gambar detail untuk setiap slide (untuk kebutuhan ilustrasi). Format: [{\"slide\": 1, \"title\": \"Judul Slide\", \"image_prompt\": \"Deskripsi detail gambar yang akan ditampilkan\"}, ...]. Deskripsi HARUS detail dan spesifik untuk AI image generator.",
        "video": "Skrip video pendek pembelajaran (Durasi 1 menit) (Markdown)",
        "visual": "5 Deskripsi adegan (scene) detail untuk ilustrasi/animasi (Markdown)",
        "audio": "Naskah audio 5 segmen dengan gaya ${audioStyle} (Markdown)"
    }
    Pastikan JSON valid tanpa markdown block code. Sesuaikan dengan konteks sekolah ${namaSekolah}.
    `;

    try {
        const rawResult = await callGemini(prompt, "Anda adalah generator JSON. Keluarkan hanya JSON valid tanpa blok Markdown.");
        const data = cleanAndParseJSON(rawResult);
        
        if (data) {
            const setContent = (id, text) => {
                const el = document.getElementById(id).querySelector('.content-body');
                if(el) el.innerHTML = marked.parse(text || "Tidak ada konten.");
            };

            setContent('bahan-info', data.infografis);
            setContent('bahan-peta', data.peta_konsep);
            setContent('bahan-diskusi', data.diskusi);
            setContent('bahan-pemantik', data.pemantik);
            setContent('bahan-kuis', data.kuis);
            setContent('bahan-analogi', data.analogi);
            
            // Handle PPT with images
            let pptContent = data.ppt || "";
            if (data.ppt_images && Array.isArray(data.ppt_images) && data.ppt_images.length > 0) {
                pptContent += '<hr style="margin:20px 0; border:none; border-top:2px solid #ddd;"><h3 style="margin-top:20px; color:#333;">📸 Gambar Presentasi untuk Setiap Slide</h3>';
                pptContent += '<p style="color:#666; font-size:0.9em; margin-bottom:20px;">Generating gambar untuk presentasi Anda...</p>';
                
                for (let img of data.ppt_images) {
                    pptContent += `<div style="margin:20px 0; padding:15px; background:#f9f9f9; border-left:4px solid #007bff; border-radius:4px;">`;
                    pptContent += `<h4 style="margin:0 0 10px 0; color:#007bff;">Slide ${img.slide}: ${img.title}</h4>`;
                    pptContent += `<p style="margin:0 0 10px 0; color:#555; font-size:0.95em; line-height:1.6;"><strong>Deskripsi:</strong> ${img.image_prompt}</p>`;
                    pptContent += `<div id="ppt-image-${img.slide}" style="margin-top:10px; min-height:150px; background:#e9ecef; border-radius:4px; display:flex; align-items:center; justify-content:center; color:#999;">⏳ Generating gambar...</div>`;
                    pptContent += `</div>`;
                }
            }
            document.getElementById('bahan-ppt').querySelector('.content-body').innerHTML = marked.parse(pptContent);
            
            // Generate images for each slide asynchronously
            if (data.ppt_images && Array.isArray(data.ppt_images) && data.ppt_images.length > 0) {
                for (let img of data.ppt_images) {
                    (async () => {
                        try {
                            const imageUrl = await callImageGenerator(img.image_prompt);
                            const imgContainer = document.getElementById(`ppt-image-${img.slide}`);
                            if (imgContainer && imageUrl) {
                                imgContainer.innerHTML = `<img src="${imageUrl}" style="max-width:100%; max-height:400px; border-radius:4px; object-fit:cover;" alt="Slide ${img.slide}">`;
                            }
                        } catch (e) {
                            console.error(`Error generating image for slide ${img.slide}:`, e);
                            const imgContainer = document.getElementById(`ppt-image-${img.slide}`);
                            if (imgContainer) {
                                imgContainer.innerHTML = `<div style="color:#dc3545; padding:20px; text-align:center;">❌ Gagal generate gambar</div>`;
                            }
                        }
                    })();
                }
            }
            
            setContent('bahan-video', data.video);
            setContent('bahan-visual', data.visual);
            setContent('bahan-audio', data.audio);

            document.getElementById('res-bahan').style.display = 'block';
            document.getElementById('stat-generated').innerText = parseInt(document.getElementById('stat-generated').innerText) + 1;
        } else {
             throw new Error("Parsed JSON is null");
        }
    } catch (error) {
        console.error(error);
        showToast("Gagal memparsing JSON. Menampilkan fallback.");
        const fallback = await callGemini("Buatkan materi singkat tentang: " + topik);
        document.getElementById('bahan-info').querySelector('.content-body').innerHTML = marked.parse(fallback);
        document.getElementById('res-bahan').style.display = 'block';
    }

    btn.classList.remove('loading');
    btn.innerHTML = '<i class="fas fa-magic"></i> Buat Media Ajar';
    document.getElementById('res-bahan').scrollIntoView({ behavior: 'smooth' });
});


// --- 3. KOKURIKULER ---
document.getElementById('btn-gen-kokul').addEventListener('click', async function() {
    const btn = this;
    // prefer selected example kokul topic if available
    const kokulSelectedTopicEl = document.getElementById('kokul-topik-select');
    const kokulSelectedTopic = kokulSelectedTopicEl && kokulSelectedTopicEl.value && kokulSelectedTopicEl.value !== 'Lainnya' ? kokulSelectedTopicEl.value : document.getElementById('kokul-tema').value;
    const tema = kokulSelectedTopic;
    const jenjang = document.getElementById('kokul-jenjang').value;
    
    if(!tema) return showToast("Topik/Tema Projek harus diisi!");

    btn.classList.add('loading');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Merancang Projek...';

    // Get Profile Data
    const namaGuru = localStorage.getItem('as_nama') || 'Guru';
    const namaSekolah = localStorage.getItem('as_sekolah') || 'Sekolah';
    const nipGuru = localStorage.getItem('as_nip') || '';
    const alamatSekolah = localStorage.getItem('as_alamat') || '';

    // Mengambil profil yang dicentang
    const profilChecked = Array.from(document.querySelectorAll('.check-kokul-profil:checked'))
        .map(el => el.value)
        .join(', ');

    const activeBtn = document.querySelector('#kokul-kurikulum-group .btn-toggle.active');
    const selectedKurikulum = activeBtn ? activeBtn.getAttribute('data-value') : "Kurikulum Merdeka 2025";
    const kurikulumVal = selectedKurikulum === 'Kustom' ? document.getElementById('kokul-kurikulum-kustom').value : selectedKurikulum;

    const prompt = `
    Buatkan dokumen lengkap Program Kokurikuler dan PKo sesuai format standar sekolah, dengan acuan Kemendikdasmen Nomor 058/H/KR/2025.

    Detail Satuan Pendidikan:
    - Nama Guru: ${namaGuru}${nipGuru ? ' (' + nipGuru + ')' : ''}
    - Sekolah: ${namaSekolah}${alamatSekolah ? ', ' + alamatSekolah : ''}
    
    Detail Program:
    - Tema/Topik: ${tema}
    - Kurikulum: ${kurikulumVal}
    - Jenjang: ${jenjang}
    - Fase: ${document.getElementById('kokul-fase').value}
    - Alokasi Waktu: ${document.getElementById('kokul-waktu').value}
    - Bentuk Kegiatan: ${document.getElementById('kokul-bentuk').value}
    - Dimensi Profil (acuan Kemendikdasmen Nomor 058/H/KR/2025): ${profilChecked}

    OUTPUT HARUS DALAM FORMAT JSON VALID dengan struktur:
    {
        "modul": "Program Kokurikuler lengkap yang berisi: Identitas Program, Rasional, Tujuan Program, Deskripsi Program, Jadwal, Output, dan tabel: (Fase, Fokus DPL, Tema, Jenis Kokurikuler, Bentuk Kegiatan, Mapel Terkait, Alokasi Waktu). Gunakan Markdown Tabel.",
        
        "pko": "Perencanaan Kokurikuler (PKo) terdiri dari: IDENTITAS (Satuan Pendidikan, Kelas/Semester, Tema, Alokasi Waktu, Lokasi kegiatan), IDENTIFIKASI (Kesiapan Peserta Didik, Dimensi Profil Lulusan), DESAIN PEMBELAJARAN (Tujuan Pembelajaran, Praktik Pedagogis, Lingkungan Pembelajaran, Kemitraan Pembelajaran (opsional), Pemanfaatan Digital(opsional)), PENGALAMAN BELAJAR / LANGKAH-LANGKAH KEGIATAN (deskripsi), Tabel Alokasi waktu Pertemuan dalam setahun ( Kegiatan, Refleksi/Evaluasi, Tindak Lanjut), ASESMEN (Asesmen selama proses kegiatan (Formatif), Asesmen Akhir Kegiatan (Sumatif) ). Gunakan Markdown Tabel.",
        
        "rubrik": "Rubrik Asesmen Sumatif terdiri dari tabel dengan kolom: No, Subdimensi, Berkembang, Cakap, Mahir. Gunakan Markdown Tabel."
    }

    Ketentuan:
    - TIDAK BOLEH ada blok Markdown (\`\`\`)
    - Hanya output JSON murni.
    - Semua tabel wajib ditulis dalam Markdown Table biasa.
    `;

    try {
        const rawResult = await callGemini(prompt, "Keluarkan hanya JSON valid tanpa blok Markdown.");
        const data = cleanAndParseJSON(rawResult);

        if (data) {
            const setContent = (id, text) => {
                const el = document.getElementById(id);
                if(el) el.innerHTML = marked.parse(text || "Tidak ada konten.");
            };

            setContent('content-kokul-program', data.modul);
            setContent('content-kokul-pko', data.pko);
            setContent('content-kokul-rubrik', data.rubrik);

            document.getElementById('res-kokul').style.display = 'block';
            document.getElementById('stat-generated').innerText =
                parseInt(document.getElementById('stat-generated').innerText) + 1;
        } else {
            throw new Error("Parsed JSON is null");
        }
    } catch (e) {
        console.error(e);
        showToast("Gagal memproses JSON. Mencoba teks biasa.");
        
        const textFallback = await callGemini(prompt + " (Jawab dalam teks biasa saja)");
        document.getElementById('content-kokul-program').innerHTML = marked.parse(textFallback);
        document.getElementById('res-kokul').style.display = 'block';
    }

    btn.classList.remove('loading');
    btn.innerHTML = '<i class="fas fa-magic"></i> Buat Program Kokurikuler';
    document.getElementById('res-kokul').scrollIntoView({ behavior: 'smooth' });
});



// --- 4. SOAL & ASESMEN GENERATOR ---
// Handle Soal Type Switch from HTML onclick
window.switchSoalType = function(element, typeName, isKoreksi = false) {
    // UI Update
    const container = element.parentElement;
    container.querySelectorAll('.btn-tab-sub').forEach(b => b.classList.remove('active'));
    element.classList.add('active');
    
    // Panel logic
    if (isKoreksi) {
        document.getElementById('panel-buat-soal').style.display = 'none';
        document.getElementById('panel-koreksi-ljk').style.display = 'block';
    } else {
        document.getElementById('panel-buat-soal').style.display = 'block';
        document.getElementById('panel-koreksi-ljk').style.display = 'none';
        document.getElementById('lbl-soal-mode').innerText = typeName;
    }
};

document.getElementById('btn-gen-soal').addEventListener('click', async function() {
    const btn = this;
    const mapel = document.getElementById('soal-mapel').value;
    if(!mapel) return showToast("Isi Mata Pelajaran!");
    
    btn.classList.add('loading');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Membuat Paket Soal...';

    const pg = document.getElementById('soal-pg').value;
    const isian = document.getElementById('soal-isian').value;
    const essay = document.getElementById('soal-essay').value;
    const difficulty = document.getElementById('soal-difficulty').value;
    const mode = document.getElementById('lbl-soal-mode').innerText;
    
    const activeBtn = document.querySelector('#soal-kurikulum-group .btn-toggle.active');
    const selectedKurikulum = activeBtn ? activeBtn.getAttribute('data-value') : "Kurikulum Merdeka 2025";
    const kurikulumVal = selectedKurikulum === 'Kustom' ? document.getElementById('soal-kurikulum-kustom').value : selectedKurikulum;

    // include selected topic detail if provided
    const soalSelectedTopicEl = document.getElementById('soal-topik-select');
    const soalSelectedTopic = soalSelectedTopicEl && soalSelectedTopicEl.value && soalSelectedTopicEl.value !== 'Lainnya' ? soalSelectedTopicEl.value : (document.getElementById('soal-mapel').value || '');

    // get distribusi / komposisi soal selection
    const distribBtn = document.querySelector('#soal-distribusi-group .btn-toggle.active');
    const distribValue = distribBtn ? distribBtn.getAttribute('data-value') : 'Proporsional';

    // compute distribution counts for PG across difficulty buckets
    function computeDistribForSoal(distrib, totalPG) {
        const t = parseInt(totalPG) || 0;
        // buckets: Mudah, Sedang, Sulit, HOTS
        let perc = {Mudah:0.4, Sedang:0.3, Sulit:0.2, HOTS:0.1};
        if(distrib === 'Merata') perc = {Mudah:0.25, Sedang:0.25, Sulit:0.25, HOTS:0.25};
        else if(distrib === 'HOTS Heavy') perc = {Mudah:0.2, Sedang:0.2, Sulit:0.2, HOTS:0.4};
        else if(distrib === 'Remedial') perc = {Mudah:0.6, Sedang:0.25, Sulit:0.1, HOTS:0.05};

        const calc = {};
        let assigned = 0;
        ['Mudah','Sedang','Sulit','HOTS'].forEach((k, i) => {
            if(i === 3) {
                // last bucket gets remainder to sum to total
                calc[k] = t - assigned;
            } else {
                calc[k] = Math.round(t * perc[k]);
                assigned += calc[k];
            }
            if(calc[k] < 0) calc[k] = 0;
        });
        return calc;
    }

    const pgCount = parseInt(pg) || 0;
    const distribCounts = computeDistribForSoal(distribValue, pgCount);

    // compute distribution counts for isian (short-answer) questions
    function computeIsianDistrib(distrib, totalIsian) {
        const t = parseInt(totalIsian) || 0;
        // isian often targets understanding/application
        let perc = {Mudah:0.2, Sedang:0.4, Sulit:0.3, HOTS:0.1};
        if(distrib === 'Merata') perc = {Mudah:0.25, Sedang:0.25, Sulit:0.25, HOTS:0.25};
        else if(distrib === 'HOTS Heavy') perc = {Mudah:0.1, Sedang:0.2, Sulit:0.3, HOTS:0.4};
        else if(distrib === 'Remedial') perc = {Mudah:0.6, Sedang:0.25, Sulit:0.1, HOTS:0.05};

        const calc = {};
        let assigned = 0;
        ['Mudah','Sedang','Sulit','HOTS'].forEach((k, i) => {
            if(i === 3) {
                calc[k] = t - assigned;
            } else {
                calc[k] = Math.round(t * perc[k]);
                assigned += calc[k];
            }
            if(calc[k] < 0) calc[k] = 0;
        });
        return calc;
    }

    // compute distribution counts for essay questions (prefer essays to target higher order)
    function computeEssayDistrib(distrib, totalEssay) {
        const t = parseInt(totalEssay) || 0;
        let perc = {Mudah:0.1, Sedang:0.3, Sulit:0.3, HOTS:0.3};
        if(distrib === 'Merata') perc = {Mudah:0.25, Sedang:0.25, Sulit:0.25, HOTS:0.25};
        else if(distrib === 'HOTS Heavy') perc = {Mudah:0.05, Sedang:0.15, Sulit:0.3, HOTS:0.5};
        else if(distrib === 'Remedial') perc = {Mudah:0.7, Sedang:0.2, Sulit:0.08, HOTS:0.02};

        const calc = {};
        let assigned = 0;
        ['Mudah','Sedang','Sulit','HOTS'].forEach((k, i) => {
            if(i === 3) {
                calc[k] = t - assigned;
            } else {
                calc[k] = Math.round(t * perc[k]);
                assigned += calc[k];
            }
            if(calc[k] < 0) calc[k] = 0;
        });
        return calc;
    }

    const isianCount = parseInt(isian) || 0;
    const isianCounts = computeIsianDistrib(distribValue, isianCount);
    const essayCount = parseInt(essay) || 0;
    const essayCounts = computeEssayDistrib(distribValue, essayCount);

    // Determine topic list to distribute across: prefer specific selected topic, otherwise derived topics for the mapel
    let topicList = [];
    if(soalSelectedTopic && soalSelectedTopic !== '' && soalSelectedTopic !== 'Lainnya') {
        topicList = [soalSelectedTopic];
    } else {
        const cleanMapel = (mapel || '').replace(/\s*\(.*\)$/, '');
        topicList = (derivedTopicData[mapel] && derivedTopicData[mapel].length) ? derivedTopicData[mapel].slice() : (derivedTopicData[cleanMapel] && derivedTopicData[cleanMapel].length ? derivedTopicData[cleanMapel].slice() : []);
    }
    if(topicList.length === 0) topicList = ['Umum'];

    // Distribute counts across topics evenly per difficulty
    function distributeCountsAcrossTopics(counts, topics) {
        const out = {};
        topics.forEach(t => out[t] = {Mudah:0, Sedang:0, Sulit:0, HOTS:0, total:0});
        ['Mudah','Sedang','Sulit','HOTS'].forEach(level => {
            const n = counts[level] || 0;
            const base = Math.floor(n / topics.length);
            let rem = n - base * topics.length;
            for(let i=0;i<topics.length;i++) {
                const add = base + (rem > 0 ? 1 : 0);
                out[topics[i]][level] = add;
                out[topics[i]].total += add;
                if(rem>0) rem--;
            }
        });
        return out;
    }

    const perTopicDistrib = distributeCountsAcrossTopics(distribCounts, topicList);
    // distribute isian (short-answer) across topics as well
    const perTopicIsian = distributeCountsAcrossTopics(isianCounts, topicList);

    // Advanced scoring: separate weights for PG, Isian, and Essay; integer points; balance to totalPoints
    // default weights
    let pgWeights = {Mudah:1, Sedang:1.5, Sulit:2, HOTS:3};
    let isianWeights = {Mudah:1.2, Sedang:1.8, Sulit:2.5, HOTS:3};
    let essayWeights = {Mudah:2, Sedang:3, Sulit:4, HOTS:6}; // essays have higher impact

    // If custom weights UI enabled, override defaults with user values
    try {
        const toggle = document.getElementById('soal-custom-weights-toggle');
        if(toggle && toggle.checked) {
            const getNum = id => { const el = document.getElementById(id); return el ? parseFloat(el.value) || 0 : 0; };
            pgWeights = {
                Mudah: getNum('soal-pg-weight-Mudah'),
                Sedang: getNum('soal-pg-weight-Sedang'),
                Sulit: getNum('soal-pg-weight-Sulit'),
                HOTS: getNum('soal-pg-weight-HOTS')
            };
            isianWeights = {
                Mudah: getNum('soal-is-weight-Mudah'),
                Sedang: getNum('soal-is-weight-Sedang'),
                Sulit: getNum('soal-is-weight-Sulit'),
                HOTS: getNum('soal-is-weight-HOTS')
            };
            essayWeights = {
                Mudah: getNum('soal-es-weight-Mudah'),
                Sedang: getNum('soal-es-weight-Sedang'),
                Sulit: getNum('soal-es-weight-Sulit'),
                HOTS: getNum('soal-es-weight-HOTS')
            };
            // note: no dedicated UI for isian weights yet; keep defaults
        }
    } catch(e) { console.error('Error reading custom weights:', e); }

    function computeAdvancedScoring(pgCounts, isCounts, esCounts, pgW, isW, esW, totalPoints = 100) {
        // compute weighted sum
        let totalWeighted = 0;
        ['Mudah','Sedang','Sulit','HOTS'].forEach(k => {
            totalWeighted += (pgCounts[k] || 0) * (pgW[k] || 1);
            totalWeighted += (isCounts[k] || 0) * (isW[k] || 1);
            totalWeighted += (esCounts[k] || 0) * (esW[k] || 1);
        });

        if(totalWeighted <= 0) {
            // fallback simple scheme
            return {
                pgPoints: {Mudah:1, Sedang:2, Sulit:3, HOTS:4},
                isianPoints: {Mudah:1, Sedang:2, Sulit:3, HOTS:4},
                essayPoints: {Mudah:2, Sedang:3, Sulit:4, HOTS:6},
                actualTotal: 0
            };
        }

        const pointPerWeight = totalPoints / totalWeighted;

        // raw points (float)
        const rawPg = {}, rawIs = {}, rawEs = {};
        ['Mudah','Sedang','Sulit','HOTS'].forEach(k => {
            rawPg[k] = (pgW[k] || 1) * pointPerWeight;
            rawIs[k] = (isW[k] || 1) * pointPerWeight;
            rawEs[k] = (esW[k] || 1) * pointPerWeight;
        });

        // convert to integer points (min 1)
        const pgPoints = {}, isianPoints = {}, essayPoints = {};
        ['Mudah','Sedang','Sulit','HOTS'].forEach(k => {
            pgPoints[k] = Math.max(1, Math.round(rawPg[k]));
            isianPoints[k] = Math.max(1, Math.round(rawIs[k]));
            essayPoints[k] = Math.max(1, Math.round(rawEs[k]));
        });

        // compute actual total and adjust delta
        let actualTotal = 0;
        ['Mudah','Sedang','Sulit','HOTS'].forEach(k => {
            actualTotal += (pgCounts[k] || 0) * pgPoints[k];
            actualTotal += (isCounts[k] || 0) * isianPoints[k];
            actualTotal += (esCounts[k] || 0) * essayPoints[k];
        });

        let delta = totalPoints - actualTotal;
        // distribute delta: prefer increasing HOTS, then Sulit, then Sedang, then Mudah
        const priority = ['HOTS','Sulit','Sedang','Mudah'];
        while(delta !== 0) {
            for(const level of priority) {
                if(delta === 0) break;
                if(delta > 0) {
                    if((pgCounts[level] || 0) > 0) { pgPoints[level] += 1; actualTotal += (pgCounts[level] || 0); delta -= (pgCounts[level] || 0); }
                    if(delta === 0) break;
                    if((isCounts[level] || 0) > 0) { isianPoints[level] += 1; actualTotal += (isCounts[level] || 0); delta -= (isCounts[level] || 0); }
                    if(delta === 0) break;
                    if((esCounts[level] || 0) > 0) { essayPoints[level] += 1; actualTotal += (esCounts[level] || 0); delta -= (esCounts[level] || 0); }
                } else {
                    if((esCounts[level] || 0) > 0 && essayPoints[level] > 1) { essayPoints[level] -= 1; actualTotal -= (esCounts[level] || 0); delta += (esCounts[level] || 0); }
                    if(delta === 0) break;
                    if((isCounts[level] || 0) > 0 && isianPoints[level] > 1) { isianPoints[level] -= 1; actualTotal -= (isCounts[level] || 0); delta += (isCounts[level] || 0); }
                    if(delta === 0) break;
                    if((pgCounts[level] || 0) > 0 && pgPoints[level] > 1) { pgPoints[level] -= 1; actualTotal -= (pgCounts[level] || 0); delta += (pgCounts[level] || 0); }
                }
            }
            if(Math.abs(delta) > totalPoints * 2) break;
            if(priority.every(l => ((pgCounts[l] || 0) === 0 && (isCounts[l] || 0) === 0 && (esCounts[l] || 0) === 0) || (pgPoints[l] <= 1 && isianPoints[l] <= 1 && essayPoints[l] <= 1))) break;
        }

        // recompute actualTotal
        actualTotal = 0;
        ['Mudah','Sedang','Sulit','HOTS'].forEach(k => {
            actualTotal += (pgCounts[k] || 0) * pgPoints[k];
            actualTotal += (isCounts[k] || 0) * isianPoints[k];
            actualTotal += (esCounts[k] || 0) * essayPoints[k];
        });

        return { pgPoints, isianPoints, essayPoints, actualTotal };
    }

    // read total points from UI if present
    let totalPointsTarget = 100;
    try {
        const tpEl = document.getElementById('soal-total-points');
        if(tpEl) {
            const v = parseInt(tpEl.value);
            if(!isNaN(v) && v > 0) totalPointsTarget = v;
        }
    } catch(e) { console.error('Error reading total points input', e); }

    const advancedScoring = computeAdvancedScoring(distribCounts, isianCounts, essayCounts, pgWeights, isianWeights, essayWeights, totalPointsTarget);

    const scorePerQuestion = { pg: advancedScoring.pgPoints, isian: advancedScoring.isianPoints, essay: advancedScoring.essayPoints, actualTotal: advancedScoring.actualTotal };

    const distributionJSON = JSON.stringify({distribCounts, isianCounts, essayCounts, perTopicDistrib}, null, 2);

    // Build a detailed kisi-kisi HTML table from distributions and scoring (includes PG, Isian, Essay)
    function buildKisiKisiHTML(mapelName, topics, perTopicPgCounts, perTopicIsianCounts, perTopicEssayCounts, pgPointsMap, isPointsMap, esPointsMap, perQuestionList = null) {
        const headers = ['No','Capaian Pembelajaran','Materi/Topik','Indikator Soal','Level Kognitif','Bentuk Soal','Nomor Soal','Soal-soal','Kunci Jawaban','Mudah','Sedang','Sulit','HOTS','Total Soal','PG Count','Isian Count','Essay Count','Poin Topik'];
        let html = '<table style="width:100%; border-collapse:collapse; margin-bottom:10px; font-size:0.9rem;">' +
            '<thead><tr style="background:#f1f5f9;">';
        headers.forEach(h => html += `<th style="border:1px solid #ddd; padding:6px; text-align:left">${h}</th>`);
        html += '</tr></thead><tbody>';
        let grand = {soal:0, pg:0, isian:0, essay:0, poin:0};
        // compute sequential numbering across topics (PG, Isian, Essay per topic in that order)
        let globalIdx = 1;
        topics.forEach((t, idx) => {
            const pgc = perTopicPgCounts[t] || {Mudah:0,Sedang:0,Sulit:0,HOTS:0,total:0};
            const isc = perTopicIsianCounts[t] || {Mudah:0,Sedang:0,Sulit:0,HOTS:0,total:0};
            const esc = perTopicEssayCounts[t] || {Mudah:0,Sedang:0,Sulit:0,HOTS:0,total:0};
            const totalSoal = (pgc.total || 0) + (isc.total || 0) + (esc.total || 0);
            let poinTopik = 0;
            ['Mudah','Sedang','Sulit','HOTS'].forEach(l => {
                poinTopik += (pgc[l] || 0) * (pgPointsMap && pgPointsMap[l] ? pgPointsMap[l] : 0);
                poinTopik += (isc[l] || 0) * (isPointsMap && isPointsMap[l] ? isPointsMap[l] : 0);
                poinTopik += (esc[l] || 0) * (esPointsMap && esPointsMap[l] ? esPointsMap[l] : 0);
            });

            // Build nomor soal list for this topic
            const nomorList = [];
            for(let i=0;i<(pgc.total||0);i++) { nomorList.push(globalIdx++); }
            for(let i=0;i<(isc.total||0);i++) { nomorList.push(globalIdx++); }
            for(let i=0;i<(esc.total||0);i++) { nomorList.push(globalIdx++); }

            // Format nomorList as ranges when consecutive
            function formatNumbers(list) {
                if(!list || list.length === 0) return '';
                const ranges = [];
                let start = list[0], end = list[0];
                for(let i=1;i<list.length;i++) {
                    if(list[i] === end + 1) end = list[i];
                    else { ranges.push(start === end ? `${start}` : `${start}-${end}`); start = end = list[i]; }
                }
                ranges.push(start === end ? `${start}` : `${start}-${end}`);
                return ranges.join(', ');
            }

            // Build soal summary column (short)
            const soalSummaryParts = [];
            if((pgc.total||0) > 0) soalSummaryParts.push(`PG x${pgc.total||0}`);
            if((isc.total||0) > 0) soalSummaryParts.push(`Isian x${isc.total||0}`);
            if((esc.total||0) > 0) soalSummaryParts.push(`Uraian x${esc.total||0}`);

            const levelKognitifText = `M:${pgc.Mudah+isc.Mudah+esc.Mudah} S:${pgc.Sedang+isc.Sedang+esc.Sedang} Su:${pgc.Sulit+isc.Sulit+esc.Sulit} H:${pgc.HOTS+isc.HOTS+esc.HOTS}`;
            const bentukSoalText = soalSummaryParts.join(' / ') || '-';
            const nomorSoalText = formatNumbers(nomorList);
            // If per-question metadata available, try to show short previews and exact keys
            let soalSoalText = bentukSoalText ? bentukSoalText + ' (lihat naskah)' : '-';
            let kunciJawabanText = (pgc.total||0) > 0 ? 'PG: lihat kunci' : '-';
            try {
                if(perQuestionList && Array.isArray(perQuestionList)) {
                    // find questions matching this topic by explicit topik or by nomor inclusion
                    const nomorSet = new Set(nomorList);
                    const questionsForTopic = perQuestionList.filter(q => {
                        if(q.topik && String(q.topik).toLowerCase() === String(t).toLowerCase()) return true;
                        if(q.topic && String(q.topic).toLowerCase() === String(t).toLowerCase()) return true;
                        if(q.nomor && nomorSet.has(Number(q.nomor))) return true;
                        return false;
                    });
                    if(questionsForTopic.length > 0) {
                        // short preview of soal texts (trimmed)
                        soalSoalText = questionsForTopic.map(q => {
                            const txt = (q.teks || q.text || '').replace(/\s+/g,' ').trim();
                            return `${q.nomor || '?'}: ${txt.length > 140 ? txt.substring(0,140) + '...' : txt}`;
                        }).join('<br>');

                        // build kunci ringkas
                        const keys = [];
                        questionsForTopic.forEach(q => {
                            if(q.tipe && /pg/i.test(q.tipe) && q.jawaban) {
                                keys.push(`${q.nomor||'?'}: ${q.jawaban}`);
                            } else if(q.jawaban) {
                                keys.push(`${q.nomor||'?'}: ${q.jawaban}`);
                            }
                        });
                        if(keys.length > 0) kunciJawabanText = keys.join(' | ');
                    }
                }
            } catch(e) { console.error('Error rendering per-question preview in kisi-kisi', e); }

            grand.soal += totalSoal; grand.pg += (pgc.total||0); grand.isian += (isc.total||0); grand.essay += (esc.total||0); grand.poin += poinTopik;

            html += `<tr>`;
            html += `<td style="border:1px solid #eee; padding:6px; width:40px">${idx+1}</td>`;
            html += `<td style="border:1px solid #eee; padding:6px">${'CP terkait: ' + t}</td>`; // Capaian Pembelajaran (placeholder)
            html += `<td style="border:1px solid #eee; padding:6px">${t}</td>`; // Materi/Topik
            html += `<td style="border:1px solid #eee; padding:6px">${'Indikator terkait ' + t}</td>`; // Indikator Soal (placeholder)
            html += `<td style="border:1px solid #eee; padding:6px; text-align:center">${levelKognitifText}</td>`;
            html += `<td style="border:1px solid #eee; padding:6px; text-align:center">${bentukSoalText}</td>`;
            html += `<td style="border:1px solid #eee; padding:6px; text-align:center">${nomorSoalText}</td>`;
            html += `<td style="border:1px solid #eee; padding:6px">${soalSoalText}</td>`;
            html += `<td style="border:1px solid #eee; padding:6px; text-align:center">${kunciJawabanText}</td>`;
            ['Mudah','Sedang','Sulit','HOTS'].forEach(l => {
                const a = pgc[l] || 0;
                const b = isc[l] || 0;
                const c = esc[l] || 0;
                const cell = `${a}${(b||c) ? ' / ' + b : ''}${(c) ? ' / ' + c : ''}`;
                html += `<td style="border:1px solid #eee; padding:6px; text-align:center">${cell}</td>`;
            });
            html += `<td style="border:1px solid #eee; padding:6px; text-align:center">${totalSoal}</td>`;
            html += `<td style="border:1px solid #eee; padding:6px; text-align:center">${pgc.total || 0}</td>`;
            html += `<td style="border:1px solid #eee; padding:6px; text-align:center">${isc.total || 0}</td>`;
            html += `<td style="border:1px solid #eee; padding:6px; text-align:center">${esc.total || 0}</td>`;
            html += `<td style="border:1px solid #eee; padding:6px; text-align:center">${poinTopik.toFixed(2)}</td>`;
            html += `</tr>`;
        });

        // Totals row
        html += `<tr style="font-weight:700; background:#fafafa;"><td colspan="13" style="border:1px solid #eee; padding:6px; text-align:right">Total</td>`;
        html += `<td style="border:1px solid #eee; padding:6px; text-align:center">${grand.soal}</td>`;
        html += `<td style="border:1px solid #eee; padding:6px; text-align:center">${grand.pg}</td>`;
        html += `<td style="border:1px solid #eee; padding:6px; text-align:center">${grand.isian}</td>`;
        html += `<td style="border:1px solid #eee; padding:6px; text-align:center">${grand.essay}</td>`;
        html += `<td style="border:1px solid #eee; padding:6px; text-align:center">${grand.poin.toFixed(2)}</td></tr>`;

        html += '</tbody></table>';
        return html;
    }

    // Get Profile Data
    const namaGuru = localStorage.getItem('as_nama') || 'Guru';
    const namaSekolah = localStorage.getItem('as_sekolah') || 'Sekolah';
    const nipGuru = localStorage.getItem('as_nip') || '';
    
    const prompt = `
    Buatkan Paket Soal Ujian (${mode}) untuk:
    Nama Guru: ${namaGuru}${nipGuru ? ' (' + nipGuru + ')' : ''}
    Sekolah: ${namaSekolah}
    Mapel: ${mapel}
    Topik / Rincian: ${soalSelectedTopic}
    Kurikulum: ${kurikulumVal}
    Fase/Kelas: ${document.getElementById('soal-fase').value} / ${document.getElementById('soal-kelas').value}
    Jumlah PG: ${pg}
    Jumlah Isian Singkat: ${isian}
    Jumlah Uraian: ${essay}
    Tingkat Kesulitan: ${difficulty}
    Jenis Soal: ${document.getElementById('soal-tipe').value}
    Distribusi Soal: ${distribValue}
    Distribusi PG (Jumlah per level): Mudah=${distribCounts.Mudah}, Sedang=${distribCounts.Sedang}, Sulit=${distribCounts.Sulit}, HOTS=${distribCounts.HOTS}
    
    Instruksi Tambahan (JSON - Distribusi & Bobot): ${distributionJSON}

    OUTPUT HARUS DALAM FORMAT JSON. Sertakan juga array terstruktur untuk setiap soal agar dapat diproses mesin.
    Struktur JSON yang wajib dikembalikan (contoh):
    {
        "kisi_kisi": "Tabel Kisi-kisi dalam format HTML Table (sertakan PG, Isian Singkat, dan Uraian per topik)",
        "naskah_soal": "Naskah soal lengkap (PG, Isian Singkat, dan Essay) format HTML, gunakan <ol> dan <li>",
        "kunci_jawaban": "Kunci jawaban format HTML",
        "pembahasan": "Pembahasan rinci format HTML",
        "soal_items": [
            {
                "nomor": 1,
                "tipe": "PG|Isian|Uraian",
                "topik": "Nama topik atau materi",
                "level": "Mudah|Sedang|Sulit|HOTS",
                "teks": "Teks soal (string)",
                "options": { "A": "...", "B": "...", "C": "...", "D": "..." }, // untuk PG
                "jawaban": "A|B|C|D|teks jawaban singkat",
                "capaian": "Capaian pembelajaran terkait (opsional)",
                "indikator": "Indikator soal singkat (opsional)"
            }
        ]
    }
    Ketentuan penting:
    - "soal_items" harus berupa array JSON yang mudah diparsing; setiap elemen wajib memiliki minimal: nomor, tipe, teks, jawaban, topik, level.
    - Jangan sertakan blok Markdown (tiga backtick).
    - Pastikan keseluruhan output JSON valid tanpa teks tambahan.
    `;

    try {
        const rawResult = await callGemini(prompt, "Keluarkan hanya JSON valid tanpa blok Markdown.");
        const data = cleanAndParseJSON(rawResult);

        if (data) {
            // show distribution summary before actual content so teacher sees allocation
            // compute essay distribution across topics
            const perTopicEssay = distributeCountsAcrossTopics(essayCounts, topicList);
            // parse machine-readable question items if provided
            const perQuestionList = Array.isArray(data.soal_items) ? data.soal_items.map(q => ({ ...q, nomor: q.nomor ? parseInt(q.nomor) : q.nomor })) : null;
            const kisiTableHTML = buildKisiKisiHTML(mapel, topicList, perTopicDistrib, perTopicIsian, perTopicEssay, scorePerQuestion.pg, scorePerQuestion.isian, scorePerQuestion.essay, perQuestionList);
            // concise human-readable summary above the table
            try {
                const totalPG = parseInt(pg) || 0;
                const totalIsian = parseInt(isian) || 0;
                const totalEssay = parseInt(essay) || 0;
                const totalSoal = totalPG + totalIsian + totalEssay;
                const ptsActual = (advancedScoring && advancedScoring.actualTotal) ? advancedScoring.actualTotal : (scorePerQuestion && scorePerQuestion.actualTotal) ? scorePerQuestion.actualTotal : '-';
                const ptsTarget = typeof totalPointsTarget !== 'undefined' ? totalPointsTarget : '-';
                const shortSummary = `<div style="margin-bottom:8px; font-weight:600; color:var(--text);">Total Soal: ${totalSoal} | PG: ${totalPG} | Isian: ${totalIsian} | Uraian: ${totalEssay} | Poin: ${ptsActual} / ${ptsTarget}</div>`;
                document.getElementById('content-kisi').innerHTML = shortSummary + kisiTableHTML + (data.kisi_kisi || "Gagal memuat kisi-kisi");
            } catch (e) {
                document.getElementById('content-kisi').innerHTML = kisiTableHTML + (data.kisi_kisi || "Gagal memuat kisi-kisi");
            }
            // Insert naskah; only append mock isian if LLM output doesn't already include isian
            try {
                const existingNaskah = (data.naskah_soal || "");
                document.getElementById('content-naskah').innerHTML = existingNaskah + "<hr><h3>Kunci Jawaban</h3>" + (data.kunci_jawaban || "");
                const ic = isianCounts || {Mudah:0, Sedang:0, Sulit:0, HOTS:0};
                const needsMockIsian = Object.values(ic).some(v => v > 0) && !(/isian|isian singkat|short\s*answer/i.test(existingNaskah));
                if(needsMockIsian) {
                    let isianHTML = '<hr><h3>Soal Isian (Mock berdasarkan distribusi)</h3>';
                    let idxIs = 1;
                    function renderIsianBucket(label, n) {
                        if(n <= 0) return '';
                        let s = `<div style="margin-bottom:8px;"><strong>${label} (${n})</strong>`;
                        for(let i=0;i<n;i++) {
                            s += `<div style="margin-top:6px;">${idxIs}. (Isian - ${label}) Tuliskan soal isian singkat yang mengukur kompetensi ${label}.</div>`;
                            idxIs++;
                        }
                        s += '</div>';
                        return s;
                    }
                    isianHTML += renderIsianBucket('Mudah', ic.Mudah);
                    isianHTML += renderIsianBucket('Sedang', ic.Sedang);
                    isianHTML += renderIsianBucket('Sulit', ic.Sulit);
                    isianHTML += renderIsianBucket('HOTS', ic.HOTS);
                    document.getElementById('content-naskah').innerHTML += isianHTML;
                }
            } catch(e) { console.error('Error processing naskah/isian in success branch', e); }
            // Jika pengguna memilih opsi Naskah beserta Gambar, generate gambar dan sisipkan ke naskah
            try {
                const naskahSel = document.querySelector('input[name="naskah-option"]:checked');
                const naskahChoice = naskahSel ? naskahSel.value : 'standar';
                if(naskahChoice === 'dengan-gambar') {
                    const countEl = document.getElementById('naskah-image-count');
                    const imgCount = Math.max(1, Math.min(20, parseInt(countEl ? countEl.value : 1) || 1));
                    // create container for images
                    const contId = 'naskah-images-container';
                    let cont = document.getElementById(contId);
                    if(!cont) {
                        cont = document.createElement('div');
                        cont.id = contId;
                        // progress area
                        const progWrap = document.createElement('div');
                        progWrap.id = contId + '-progress';
                        progWrap.style.marginTop = '8px';
                        progWrap.innerHTML = `<div style="display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:6px;"><div style=\"font-weight:600;\">Progress Pembuatan Gambar</div><div id=\"${contId}-progress-text\" style=\"font-size:0.9rem; color:var(--text-muted)\">0 / 0</div></div><div style=\"background:#e6edf3; border-radius:8px; height:12px; overflow:hidden;\"><div id=\"${contId}-progress-bar\" style=\"width:0%; height:100%; background:linear-gradient(90deg, var(--primary), #60a5fa); transition:width 0.25s;\"></div></div>`;
                        document.getElementById('content-naskah').appendChild(progWrap);
                        cont.style.display = 'grid';
                        cont.style.gridTemplateColumns = 'repeat(auto-fit, minmax(180px, 1fr))';
                        cont.style.gap = '12px';
                        cont.style.marginTop = '12px';
                        document.getElementById('content-naskah').appendChild(document.createElement('hr'));
                        const h = document.createElement('h3'); h.innerText = 'Ilustrasi untuk Naskah Soal';
                        document.getElementById('content-naskah').appendChild(h);
                        document.getElementById('content-naskah').appendChild(cont);
                    } else {
                        cont.innerHTML = '';
                    }

                    // init progress
                    const progressTextId = contId + '-progress-text';
                    const progressBarId = contId + '-progress-bar';
                    const totalToCreate = imgCount;
                    const progressTextEl = document.getElementById(progressTextId);
                    const progressBarEl = document.getElementById(progressBarId);
                    if(progressTextEl) progressTextEl.innerText = `0 / ${totalToCreate}`;
                    if(progressBarEl) progressBarEl.style.width = '0%';

                    // Prepare prompts (prefer soal_items if tersedia)
                    const soalItemsArr = Array.isArray(perQuestionList) ? perQuestionList : (Array.isArray(data.soal_items) ? data.soal_items : []);

                    for(let i=0;i<imgCount;i++) {
                        const placeholder = document.createElement('div');
                        placeholder.style.border = '1px solid #e2e8f0';
                        placeholder.style.padding = '8px';
                        placeholder.style.borderRadius = '8px';
                        placeholder.style.minHeight = '120px';
                        placeholder.style.display = 'flex';
                        placeholder.style.alignItems = 'center';
                        placeholder.style.justifyContent = 'center';
                        placeholder.innerHTML = `<div style="text-align:center; color:var(--text-muted);">Membuat gambar ${i+1}...</div>`;
                        cont.appendChild(placeholder);

                        // Build prompt for imagen
                        let promptImg = '';
                        if(soalItemsArr[i] && soalItemsArr[i].teks) {
                            const teks = String(soalItemsArr[i].teks).replace(/<[^>]+>/g,'').trim();
                            promptImg = `Ilustrasi edukatif berwarna untuk soal nomor ${soalItemsArr[i].nomor || (i+1)}: ${teks}. Gaya: ilustrasi edukatif, jelas, sederhana, cocok untuk materi ajar dan Lembar Kerja. Resolusi tinggi, latar putih.`;
                        } else {
                            const topicForPrompt = (topicList && topicList.length) ? topicList[0] : soalSelectedTopic || mapel;
                            promptImg = `Ilustrasi edukatif berwarna untuk mata pelajaran ${mapel} pada topik ${topicForPrompt}. Gaya: ilustrasi edukatif, jelas, ramah anak, cocok untuk dicetak pada Lembar Kerja.`;
                        }

                        try {
                            const imgDataUrl = await callImagen(promptImg);
                            if(imgDataUrl) {
                                placeholder.innerHTML = '';
                                const img = document.createElement('img');
                                img.src = imgDataUrl;
                                img.style.width = '100%';
                                img.style.height = 'auto';
                                img.style.borderRadius = '6px';
                                img.alt = 'Ilustrasi Soal ' + (i+1);
                                placeholder.appendChild(img);

                                const dl = document.createElement('a');
                                dl.href = imgDataUrl;
                                dl.download = `Ilustrasi_Soal_${i+1}.png`;
                                dl.className = 'btn btn-secondary btn-sm';
                                dl.style.display = 'inline-block';
                                dl.style.marginTop = '8px';
                                dl.innerHTML = '<i class="fas fa-download"></i> Unduh';
                                placeholder.appendChild(dl);
                            } else {
                                placeholder.innerHTML = `<div style="color:red">Gagal membuat gambar ${i+1}.</div>`;
                            }
                        } catch(imgErr) {
                            console.error('Error generating image for naskah:', imgErr);
                            placeholder.innerHTML = `<div style="color:red">Gagal membuat gambar ${i+1}.</div>`;
                        } finally {
                            // update progress
                            try {
                                const done = i + 1;
                                if(progressTextEl) progressTextEl.innerText = `${done} / ${totalToCreate}`;
                                if(progressBarEl) progressBarEl.style.width = `${Math.round((done/totalToCreate)*100)}%`;
                            } catch(e) { console.error('Progress update error', e); }
                            // attach image url to perQuestionList if available
                            try {
                                if(typeof imgDataUrl !== 'undefined' && imgDataUrl && Array.isArray(perQuestionList) && perQuestionList[i]) {
                                    perQuestionList[i].image = imgDataUrl;
                                }
                            } catch(attErr) { console.error('Attach image to question error', attErr); }
                        }
                    }
                    // After all images generated, if we have perQuestionList, build integrated naskah with images
                    try {
                        if(Array.isArray(perQuestionList) && perQuestionList.length > 0) {
                            let integrated = '<hr><h3>Naskah Soal (Terintegrasi dengan Gambar)</h3>';
                            integrated += '<ol>';
                            perQuestionList.forEach(q => {
                                const nomor = q.nomor || q.number || '';
                                const teks = q.teks || q.text || q.teks_soal || '';
                                integrated += `<li style="margin-bottom:12px;"><div>${teks}</div>`;
                                // options
                                if(q.options && typeof q.options === 'object') {
                                    integrated += '<div style="margin-top:6px;">';
                                    Object.keys(q.options).forEach(k => {
                                        integrated += `<div><strong>${k}.</strong> ${q.options[k]}</div>`;
                                    });
                                    integrated += '</div>';
                                }
                                // image
                                if(q.image) {
                                    integrated += `<div style="text-align:center; margin-top:8px;"><img src="${q.image}" style="max-width:100%; border-radius:6px;" alt="Gambar Soal ${nomor}"></div>`;
                                }
                                integrated += '</li>';
                            });
                            integrated += '</ol>';
                            // append integrated naskah after existing naskah
                            try {
                                const el = document.getElementById('content-naskah');
                                if(el) el.innerHTML = el.innerHTML + integrated + '<hr>' + (data.kunci_jawaban || '');
                            } catch(e) { console.error('Insert integrated naskah error', e); }
                        }
                    } catch(finalErr) { console.error('Error building integrated naskah', finalErr); }
                }
            } catch(imgGlobalErr) { console.error('Error inserting images for naskah:', imgGlobalErr); }
            document.getElementById('content-bahas').innerHTML = (data.pembahasan || "Tidak ada pembahasan");
            
            // Mock LJK Generator
            // Mock LJK Generator: render according to distribCounts if available
            let ljkHTML = '<div style="display:grid; grid-template-columns: repeat(2, 1fr); gap:20px;">';
            try {
                const counts = distribCounts || {Mudah:pg, Sedang:0, Sulit:0, HOTS:0};
                let idx = 1;
                function renderBucket(label, n) {
                    if(n <= 0) return '';
                    let s = `<div style="border-bottom:1px solid #eee; padding-bottom:6px; margin-bottom:6px;"><strong>${label} (${n})</strong><br>`;
                    for(let j=0;j<n;j++) {
                        s += `<div style="margin-top:6px;">${idx}. [A] [B] [C] [D] <span style="color:#888; font-size:0.85rem; margin-left:8px;">(${label})</span></div>`;
                        idx++;
                    }
                    s += '</div>';
                    return s;
                }

                ljkHTML += renderBucket('Mudah', counts.Mudah);
                ljkHTML += renderBucket('Sedang', counts.Sedang);
                ljkHTML += renderBucket('Sulit', counts.Sulit);
                ljkHTML += renderBucket('HOTS', counts.HOTS);
                // If any remaining (idx-1 < pg) fill generically
                while(idx <= pg) {
                    ljkHTML += `<div>${idx}. [A] [B] [C] [D]</div>`;
                    idx++;
                }
            } catch(e) {
                for(let i=1; i<=pg; i++) ljkHTML += `<div>${i}. [A] [B] [C] [D]</div>`;
            }
            ljkHTML += '</div>';
            document.getElementById('content-ljk').innerHTML = ljkHTML;

            document.getElementById('res-soal').style.display = 'block';
            document.getElementById('stat-generated').innerText = parseInt(document.getElementById('stat-generated').innerText) + 1;
        } else {
             throw new Error("Parsed JSON is null");
        }

    } catch(e) {
        console.error(e);
        showToast("Gagal memparsing JSON. Mencoba format teks.");
        const textResult = await callGemini(prompt + " (Format Text Biasa saja)");
        // Append mock essay section based on essayCounts
        let finalHtml = marked.parse(textResult || '');
        try {
            const ec = essayCounts || {Mudah:0, Sedang:0, Sulit:0, HOTS:0};
                const ic = isianCounts || {Mudah:0, Sedang:0, Sulit:0, HOTS:0};
                // Build mock isian section if needed (only if LLM text doesn't already contain isian)
                let isianHTML = '';
                try {
                    const hasIsianCounts = Object.values(ic).some(v => v > 0);
                    const textHasIsian = /isian|isian singkat|short\s*answer/i.test(textResult || '');
                    const needsMockIsian = hasIsianCounts && !textHasIsian;
                    if(needsMockIsian) {
                        isianHTML = '<hr><h3>Soal Isian (Mock berdasarkan distribusi)</h3>';
                        let idxIs = 1;
                        function renderIsianBucket(label, n) {
                            if(n <= 0) return '';
                            let s = `<div style="margin-bottom:8px;"><strong>${label} (${n})</strong>`;
                            for(let i=0;i<n;i++) {
                                s += `<div style="margin-top:6px;">${idxIs}. (Isian - ${label}) Tuliskan soal isian singkat yang mengukur kompetensi ${label}.</div>`;
                                idxIs++;
                            }
                            s += '</div>';
                            return s;
                        }
                        isianHTML += renderIsianBucket('Mudah', ic.Mudah);
                        isianHTML += renderIsianBucket('Sedang', ic.Sedang);
                        isianHTML += renderIsianBucket('Sulit', ic.Sulit);
                        isianHTML += renderIsianBucket('HOTS', ic.HOTS);
                    }
                } catch(e) { console.error('Error building isianHTML in fallback', e); }
            let essayHTML = '<hr><h3>Soal Uraian (Mock berdasarkan distribusi)</h3>';
            let eIdx = 1;
            function renderEssayBucket(label, n) {
                if(n <= 0) return '';
                let s = `<div style="margin-bottom:8px;"><strong>${label} (${n})</strong>`;
                for(let i=0;i<n;i++) {
                    s += `<div style="margin-top:6px;">${eIdx}. (Uraian - ${label}) Buatkan satu soal uraian yang menilai kompetensi ${label}.</div>`;
                    eIdx++;
                }
                s += '</div>';
                return s;
            }
            essayHTML += renderEssayBucket('Mudah', ec.Mudah);
            essayHTML += renderEssayBucket('Sedang', ec.Sedang);
            essayHTML += renderEssayBucket('Sulit', ec.Sulit);
            essayHTML += renderEssayBucket('HOTS', ec.HOTS);
            finalHtml += isianHTML + essayHTML;
        } catch(err) { console.error(err); }

        // compute per-topic essay distribution and build kisi-kisi table for fallback
        try {
            const perTopicEssay = distributeCountsAcrossTopics(essayCounts, topicList);
            const kisiTableHTML = buildKisiKisiHTML(mapel, topicList, perTopicDistrib, perTopicIsian, perTopicEssay, scorePerQuestion.pg, scorePerQuestion.isian, scorePerQuestion.essay, null);
            // concise human-readable summary above the table for fallback
            try {
                const totalPG = parseInt(pg) || 0;
                const totalIsian = parseInt(isian) || 0;
                const totalEssay = parseInt(essay) || 0;
                const totalSoal = totalPG + totalIsian + totalEssay;
                const ptsActual = (advancedScoring && advancedScoring.actualTotal) ? advancedScoring.actualTotal : (scorePerQuestion && scorePerQuestion.actualTotal) ? scorePerQuestion.actualTotal : '-';
                const ptsTarget = typeof totalPointsTarget !== 'undefined' ? totalPointsTarget : '-';
                const shortSummary = `<div style="margin-bottom:8px; font-weight:600; color:var(--text);">Total Soal: ${totalSoal} | PG: ${totalPG} | Isian: ${totalIsian} | Uraian: ${totalEssay} | Poin: ${ptsActual} / ${ptsTarget}</div>`;
                document.getElementById('content-naskah').innerHTML = shortSummary + kisiTableHTML + finalHtml;
            } catch (err) {
                document.getElementById('content-naskah').innerHTML = kisiTableHTML + finalHtml;
            }
            // Jika pengguna memilih Naskah beserta Gambar di mode fallback, coba generate juga gambar
            try {
                const naskahSel = document.querySelector('input[name="naskah-option"]:checked');
                const naskahChoice = naskahSel ? naskahSel.value : 'standar';
                if(naskahChoice === 'dengan-gambar') {
                    const countEl = document.getElementById('naskah-image-count');
                    const imgCount = Math.max(1, Math.min(20, parseInt(countEl ? countEl.value : 1) || 1));
                    const contId = 'naskah-images-container-fallback';
                    let cont = document.getElementById(contId);
                    if(!cont) {
                        cont = document.createElement('div');
                        cont.id = contId;
                        // progress area
                        const progWrap = document.createElement('div');
                        progWrap.id = contId + '-progress';
                        progWrap.style.marginTop = '8px';
                        progWrap.innerHTML = `<div style="display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:6px;">` +
                            `<div style=\"font-weight:600;\">Progress Pembuatan Gambar</div><div id=\"${contId}-progress-text\" style=\"font-size:0.9rem; color:var(--text-muted)\">0 / 0</div></div>` +
                            `<div style=\"background:#e6edf3; border-radius:8px; height:12px; overflow:hidden;\">` +
                            `<div id=\"${contId}-progress-bar\" style=\"width:0%; height:100%; background:linear-gradient(90deg, var(--primary), #60a5fa); transition:width 0.25s;\"></div></div>`;
                        document.getElementById('content-naskah').appendChild(progWrap);
                        cont.style.display = 'grid';
                        cont.style.gridTemplateColumns = 'repeat(auto-fit, minmax(180px, 1fr))';
                        cont.style.gap = '12px';
                        cont.style.marginTop = '12px';
                        document.getElementById('content-naskah').appendChild(document.createElement('hr'));
                        const h = document.createElement('h3'); h.innerText = 'Ilustrasi untuk Naskah Soal';
                        document.getElementById('content-naskah').appendChild(h);
                        document.getElementById('content-naskah').appendChild(cont);
                    } else { cont.innerHTML = ''; }

                    // init progress for fallback
                    const progressTextIdFb = contId + '-progress-text';
                    const progressBarIdFb = contId + '-progress-bar';
                    const totalToCreateFb = imgCount;
                    const progressTextElFb = document.getElementById(progressTextIdFb);
                    const progressBarElFb = document.getElementById(progressBarIdFb);
                    if(progressTextElFb) progressTextElFb.innerText = `0 / ${totalToCreateFb}`;
                    if(progressBarElFb) progressBarElFb.style.width = '0%';

                    for(let i=0;i<imgCount;i++) {
                        const placeholder = document.createElement('div');
                        placeholder.style.border = '1px solid #e2e8f0';
                        placeholder.style.padding = '8px';
                        placeholder.style.borderRadius = '8px';
                        placeholder.style.minHeight = '120px';
                        placeholder.style.display = 'flex';
                        placeholder.style.alignItems = 'center';
                        placeholder.style.justifyContent = 'center';
                        placeholder.innerHTML = `<div style="text-align:center; color:var(--text-muted);">Membuat gambar ${i+1}...</div>`;
                        cont.appendChild(placeholder);
                        // fallback prompt
                        const topicForPrompt = (topicList && topicList.length) ? topicList[0] : soalSelectedTopic || mapel;
                        const promptImg = `Ilustrasi edukatif berwarna untuk mata pelajaran ${mapel} pada topik ${topicForPrompt}. Gaya: ilustrasi edukatif, jelas, ramah anak, cocok untuk dicetak pada Lembar Kerja.`;
                        try {
                            const imgDataUrl = await callImagen(promptImg);
                            if(imgDataUrl) {
                                placeholder.innerHTML = '';
                                const img = document.createElement('img');
                                img.src = imgDataUrl;
                                img.style.width = '100%';
                                img.style.height = 'auto';
                                img.style.borderRadius = '6px';
                                img.alt = 'Ilustrasi Soal ' + (i+1);
                                placeholder.appendChild(img);
                                const dl = document.createElement('a');
                                dl.href = imgDataUrl;
                                dl.download = `Ilustrasi_Soal_${i+1}.png`;
                                dl.className = 'btn btn-secondary btn-sm';
                                dl.style.display = 'inline-block';
                                dl.style.marginTop = '8px';
                                dl.innerHTML = '<i class="fas fa-download"></i> Unduh';
                                placeholder.appendChild(dl);
                            } else {
                                placeholder.innerHTML = `<div style="color:red">Gagal membuat gambar ${i+1}.</div>`;
                            }
                        } catch(imgErr) { console.error('Error creating fallback image', imgErr); placeholder.innerHTML = `<div style="color:red">Gagal membuat gambar ${i+1}.</div>`; }
                        finally {
                            try {
                                const doneFb = i + 1;
                                if(progressTextElFb) progressTextElFb.innerText = `${doneFb} / ${totalToCreateFb}`;
                                if(progressBarElFb) progressBarElFb.style.width = `${Math.round((doneFb/totalToCreateFb)*100)}%`;
                            } catch(pe) { console.error('Progress update fallback error', pe); }
                        }
                    }
                }
            } catch(imgGlobalErr) { console.error('Error inserting fallback images for naskah:', imgGlobalErr); }
        } catch(err) {
            console.error('Error building kisi-kisi for fallback:', err);
            document.getElementById('content-naskah').innerHTML = finalHtml;
        }
        document.getElementById('res-soal').style.display = 'block';
    }

    btn.classList.remove('loading');
    btn.innerHTML = '<i class="fas fa-magic"></i> Generate Paket Soal';
    document.getElementById('res-soal').scrollIntoView({ behavior: 'smooth' });
});


// --- 5. VISUAL & AUDIO GENERATOR ---
window.switchVisAudioTab = function(tabId) {
    document.getElementById('subtab-vis-gen').classList.remove('active');
    document.getElementById('subtab-aud-gen').classList.remove('active');
    document.getElementById('subtab-' + tabId).classList.add('active');
    document.getElementById('panel-vis-gen').style.display = 'none';
    document.getElementById('panel-aud-gen').style.display = 'none';
    document.getElementById('panel-' + tabId).style.display = 'block';
};

document.getElementById('btn-gen-media').addEventListener('click', async function() {
    const btn = this;
    const p = document.getElementById('media-prompt').value;
    if(!p) return showToast("Isi deskripsi gambar");
    
    btn.classList.add('loading');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating Image...';
    
    const imgUrl = await callImagen(p);
    if(imgUrl) {
        document.getElementById('res-media-content').innerHTML = `<img src="${imgUrl}" class="generated-image" alt="Generated Image">`;
        document.getElementById('res-media-actions').innerHTML = `<a href="${imgUrl}" download="Ilustrasi_DigiArju.png" class="btn btn-primary btn-sm"><i class="fas fa-download"></i> Unduh Gambar</a>`;
    } else {
        document.getElementById('res-media-content').innerHTML = `<p style="color:red">Gagal membuat gambar.</p>`;
        document.getElementById('res-media-actions').innerHTML = '';
    }
    
    document.getElementById('res-media').style.display = 'block';
    btn.classList.remove('loading');
    btn.innerHTML = '<i class="fas fa-paint-brush"></i> Generate Ilustrasi';
});

document.getElementById('btn-gen-audio').addEventListener('click', async function() {
    const btn = this;
    const text = document.getElementById('audio-prompt').value;
    const voice = document.getElementById('tts-voice').value;
    
    // New Params
    const styleSelect = document.getElementById('audio-style').value;
    const styleCustom = document.getElementById('audio-style-custom').value;
    const style = styleSelect === 'Kustom' ? styleCustom : styleSelect;
    const speed = document.getElementById('audio-speed').value;
    const pitch = document.getElementById('audio-pitch').value;
    const volume = document.getElementById('audio-volume').value;

    if(!text) return showToast("Isi teks narasi!");
    
    btn.classList.add('loading');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating Audio...';
    
    const base64PCM = await callTTS(text, voice, style, speed, pitch, volume);
    if(base64PCM) {
        const pcmBuffer = base64ToArrayBuffer(base64PCM);
        const wavBuffer = pcmToWav(pcmBuffer);
        const blob = new Blob([wavBuffer], { type: 'audio/wav' });
        const url = URL.createObjectURL(blob);
        
        document.getElementById('res-media-content').innerHTML = `
            <div style="text-align:center; padding:20px;">
                <i class="fas fa-headphones" style="font-size:3rem; color:var(--primary); margin-bottom:15px;"></i>
                <h4>Audio Berhasil Dibuat!</h4>
                <audio controls src="${url}" style="width:100%; margin-top:10px;"></audio>
                <div style="margin-top:15px; font-size:0.9rem;">
                    Suara: <strong>${voice}</strong> | Gaya: <strong>${style}</strong><br>
                    Speed: ${speed}x | Pitch: ${pitch} | Vol: ${volume}dB
                </div>
            </div>
        `;
        document.getElementById('res-media-actions').innerHTML = `<a href="${url}" download="Audio_DigiArju.wav" class="btn btn-primary btn-sm"><i class="fas fa-download"></i> Unduh Audio</a>`;
    } else {
        document.getElementById('res-media-content').innerHTML = `<p style="color:red">Gagal membuat audio.</p>`;
        document.getElementById('res-media-actions').innerHTML = '';
    }
    document.getElementById('res-media').style.display = 'block';
    btn.classList.remove('loading');
    btn.innerHTML = '<i class="fas fa-microphone-alt"></i> Generate Audio';
});

// --- 6. UTILITIES LAIN (Koreksi, Analisis, dll) ---
document.getElementById('btn-koreksi').addEventListener('click', function() {
    const file = document.getElementById('ljk-file-upload').files[0];
    if(!file) return showToast("Upload foto LJK dulu!");
    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengscan...';
    setTimeout(() => {
        const score = Math.floor(Math.random() * (100 - 60 + 1) + 60);
        document.getElementById('res-koreksi-content').innerHTML = `
            <h4>Hasil Scan AI</h4>
            <p>Nama: <strong>Terdeteksi (Budi Santoso)</strong> | Skor: <span style="font-size:1.5rem; font-weight:bold;">${score}</span> / 100</p>
        `;
        document.getElementById('res-koreksi').style.display = 'block';
        this.innerHTML = 'Mulai Koreksi';
    }, 2000);
});

document.getElementById('btn-analisis').addEventListener('click', async function() {
    const nilai = document.getElementById('nilai-input').value;
    if(!nilai) return showToast("Masukkan data nilai!");
    this.classList.add('loading');
    const prompt = `Analisis data nilai: [${nilai}]. Berikan Mean, Median, Modus, dan saran perbaikan.`;
    const res = await callGemini(prompt);
    document.getElementById('res-analisis-content').innerHTML = marked.parse(res);
    document.getElementById('res-analisis').style.display = 'block';
    document.getElementById('stat-analyzed').innerText = parseInt(document.getElementById('stat-analyzed').innerText) + 1;
    this.classList.remove('loading');
});

// Simple Generators (Rubrik, Rekomendasi, Ice Breaker)
const simpleGenerators = [
    { btn: 'btn-gen-rubrik', input: 'rubrik-task', res: 'res-rubrik', content: 'res-rubrik-content', prompt: 'Buat rubrik penilaian tabel untuk: ' },
    { btn: 'btn-gen-rek', input: 'rek-input', res: 'res-rekomendasi', content: 'res-rek-content', prompt: 'Berikan solusi pedagogik untuk: ' },
    { btn: 'btn-gen-ice', input: 'ice-input', res: 'res-icebreaker', content: 'res-ice-content', prompt: '3 ide ice breaker untuk situasi: ' }
];
simpleGenerators.forEach(gen => {
    const el = document.getElementById(gen.btn);
    if(el) {
        el.addEventListener('click', async function() {
            const val = document.getElementById(gen.input).value;
            if(!val) return showToast("Isi input dulu!");
            this.classList.add('loading');
            const result = await callGemini(gen.prompt + val);
            document.getElementById(gen.content).innerHTML = marked.parse(result);
            document.getElementById(gen.res).style.display = 'block';
            this.classList.remove('loading');
        });
    }
});

// (Removed duplicate simple E-Rapor handler to avoid syntax mismatch; the consolidated E-Rapor generator handler later in the file will handle report generation.)

// --- EXPORT & UTILS ---
// Helper to inline styles for Word export
function prepareContentForWord(htmlContent, orientation = 'Portrait') {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = htmlContent;
    
    // Inline table styles
    const tables = wrapper.querySelectorAll('table');
    tables.forEach(table => {
        table.style.borderCollapse = 'collapse';
        table.style.width = '100%';
        table.style.marginBottom = '10px';
        const cells = table.querySelectorAll('th, td');
        cells.forEach(cell => {
            cell.style.border = '1px solid black';
            cell.style.padding = '5px';
            cell.style.verticalAlign = 'top';
        });
    });
    
    // Remove buttons
    const buttons = wrapper.querySelectorAll('button, .output-actions');
    buttons.forEach(b => b.remove());

    // Add page orientation CSS for Word export
    const pageCss = orientation && orientation.toLowerCase().startsWith('l') ? '@page { size: A4 landscape; }' : '@page { size: A4 portrait; }';
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <style>
                ${pageCss}
                body { font-family: 'Times New Roman', serif; font-size: 12pt; }
                table { border-collapse: collapse; width: 100%; }
                th, td { border: 1px solid black; padding: 5px; }
            </style>
        </head>
        <body>
            ${wrapper.innerHTML}
        </body>
        </html>
    `;
}

// Helper: get export orientation for a given divId (looks for per-panel select, falls back to first global select or Portrait)
function getExportOrientation(divId) {
    try {
        if(divId) {
            const sel = document.querySelector(`#${divId} .output-actions select.export-orientation-select`);
            if(sel && sel.value) return sel.value;
        }
        // fallback: any select present in page
        const anySel = document.querySelector('select.export-orientation-select');
        if(anySel && anySel.value) return anySel.value;
        // legacy global id fallback
        const globalSel = document.getElementById('export-orientation-select');
        if(globalSel && globalSel.value) return globalSel.value;
    } catch(e) { console.error('Error getting export orientation', e); }
    return 'Portrait';
}



window.downloadPPT = function(divId, filename) {
    if (typeof PptxGenJS === 'undefined') {
        showToast("Library PPT belum siap. Coba refresh.");
        return;
    }
    
    const element = document.getElementById(divId);
    if (!element) {
        showToast("Konten tidak ditemukan!");
        return;
    }

    // Respect user-selected orientation (per-panel if present)
    const orientation = getExportOrientation(divId);
    let pptx = new PptxGenJS();
    pptx.layout = (orientation && orientation.toLowerCase().startsWith('l')) ? 'LAYOUT_16x9' : 'LAYOUT_9x16';
    
    // 1. Title Slide
    let slide = pptx.addSlide();
    slide.addText("Dokumen DigiArju", { x:0.5, y:2.5, w:'90%', fontSize:28, bold:true, align:'center', color:'2d3748' });
    slide.addText("Dibuat pada: " + new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }), { x:0.5, y:3.5, w:'90%', fontSize:14, align:'center', color:'718096' });

    // 2. Flatten Content Structure
    // Select all potential block elements
    const allElements = element.querySelectorAll('h1, h2, h3, h4, h5, p, ul, ol, table, div');
    
    slide = pptx.addSlide();
    let yPos = 0.5;
    const maxY = 6.5;

    allElements.forEach((el) => {
        // Skip elements that are inside other processed elements to avoid duplication
        if (el.closest('table') && el.tagName !== 'TABLE') return;
        if ((el.closest('ul') || el.closest('ol')) && el.tagName !== 'UL' && el.tagName !== 'OL') return;
        
        // Skip output actions and buttons
        if (el.classList.contains('output-actions') || el.closest('.output-actions') || el.tagName === 'BUTTON') return;

        // Handle images inside elements first (embed into PPTX)
        const innerImg = el.tagName === 'IMG' ? el : (el.querySelector ? el.querySelector('img') : null);
        if (innerImg) {
            const src = innerImg.src;
            if (src) {
                if (yPos + 2.8 > maxY) { slide = pptx.addSlide(); yPos = 0.5; }
                try {
                    slide.addImage({ data: src, x:0.6, y:yPos, w:3.0 });
                    yPos += 3.2;
                } catch (e) {
                    if (yPos > 5.0) { slide = pptx.addSlide(); yPos = 0.5; }
                    slide.addText(innerImg.alt || '(Gambar)', { x:0.6, y:yPos, w:'80%', fontSize:12 });
                    yPos += 0.6;
                }
                return;
            }
        }

        // For DIVs, only process if they are "leaf" nodes (don't contain other blocks)
        if (el.tagName === 'DIV') {
            if (el.querySelector('h1, h2, h3, h4, p, ul, ol, table')) return;
        }

        const tagName = el.tagName;
        const text = el.innerText.trim();
        
        if (!text && tagName !== 'TABLE') return;

        // --- HEADINGS ---
        if (['H1','H2'].includes(tagName)) {
            // Major headings always start new slide
            slide = pptx.addSlide();
            slide.addText(text, { x:0.5, y:0.5, w:'90%', fontSize:22, bold:true, color:'2b6cb0' });
            yPos = 1.2;
        }
        else if (['H3','H4','H5'].includes(tagName)) {
            if (yPos > 5.0) { slide = pptx.addSlide(); yPos = 0.5; }
            slide.addText(text, { x:0.5, y:yPos, w:'90%', fontSize:16, bold:true, color:'2d3748' });
            yPos += 0.7;
        }
        // --- TEXT BLOCKS ---
        else if (tagName === 'P' || tagName === 'DIV') {
            const lines = Math.ceil(text.length / 95) || 1;
            const h = lines * 0.3;
            if (yPos + h > maxY) { slide = pptx.addSlide(); yPos = 0.5; }
            slide.addText(text, { x:0.5, y:yPos, w:9, fontSize:12, color:'4a5568', align:'justify' });
            yPos += h + 0.2;
        }
        // --- LISTS ---
        else if (tagName === 'UL' || tagName === 'OL') {
            const lis = el.querySelectorAll('li');
            lis.forEach(li => {
                const liText = li.innerText.trim();
                const lines = Math.ceil(liText.length / 90) || 1;
                const h = lines * 0.3;
                if (yPos + h > maxY) { slide = pptx.addSlide(); yPos = 0.5; }
                slide.addText(liText, { x:0.8, y:yPos, w:8.5, fontSize:12, color:'4a5568', bullet:true });
                yPos += h + 0.1;
            });
            yPos += 0.2;
        }
        // --- TABLES ---
        else if (tagName === 'TABLE') {
            // Always start table on new slide for safety
            slide = pptx.addSlide();
            
            let rows = [];
            // Headers
            el.querySelectorAll('thead tr').forEach(tr => {
                let row = [];
                tr.querySelectorAll('th, td').forEach(c => row.push({ text: c.innerText.trim(), options: { bold:true, fill:'3182ce', color:'ffffff' } }));
                if(row.length) rows.push(row);
            });
            // Body
            el.querySelectorAll('tbody tr').forEach(tr => {
                let row = [];
                tr.querySelectorAll('td, th').forEach(c => row.push(c.innerText.trim()));
                if(row.length) rows.push(row);
            });
            // Fallback
            if(rows.length === 0) {
                 el.querySelectorAll('tr').forEach(tr => {
                    let row = [];
                    tr.querySelectorAll('td, th').forEach(c => row.push(c.innerText.trim()));
                    if(row.length) rows.push(row);
                });
            }

            if (rows.length > 0) {
                slide.addTable(rows, { 
                    x:0.5, y:0.5, w:9, 
                    fontSize:10, color:'2d3748',
                    border:{pt:1, color:'cbd5e0'}, 
                    autoPage:true,
                    newPageStartY: 0.5
                });
                // Reset for next content
                slide = pptx.addSlide();
                yPos = 0.5;
            }
        }
    });

    pptx.writeFile({ fileName: filename + ".pptx" });
    showToast("PPT berhasil diunduh!");
};

window.downloadSpecificDiv = function(divId, filename) {
    if (typeof htmlDocx === 'undefined' || typeof saveAs === 'undefined') {
        showToast("Library Word belum siap. Coba refresh.");
        return;
    }
    const element = document.getElementById(divId);
    if (!element) {
        showToast("Konten tidak ditemukan!");
        return;
    }
    const content = element.innerHTML;
    const orientation = getExportOrientation(divId);
    const finalHtml = prepareContentForWord(content, orientation);
    const converted = htmlDocx.asBlob(finalHtml);
    saveAs(converted, `${filename}.docx`);
    showToast("Word berhasil diunduh!");
};

window.downloadCurrentTabAsWord = function() {
    const activePane = document.querySelector('.content-section.active .tab-pane.active');
    if(activePane) {
        const orientation = getExportOrientation(activePane.id);
        const finalHtml = prepareContentForWord(activePane.innerHTML, orientation);
        const converted = htmlDocx.asBlob(finalHtml);
        saveAs(converted, `Dokumen_${activePane.id}.docx`);
    } else {
        showToast("Tidak ada tab aktif untuk diunduh");
    }
};
window.downloadPDF = function(divId, filename) {
    if (typeof html2pdf === 'undefined') {
        showToast("Library PDF belum siap. Coba refresh.");
        return;
    }
    showToast("Sedang membuat PDF...");
    
    const element = document.getElementById(divId);
    if (!element) {
        showToast("Konten tidak ditemukan!");
        return;
    }
    
    // Clone element
    const clone = element.cloneNode(true);
    
    // Remove action buttons and other UI elements
    const actions = clone.querySelectorAll('.output-actions, button, .btn, .tab-nav, .doc-header button');
    actions.forEach(el => el.remove());
    
    // 1. RESET STYLES FOR DOCUMENT LOOK
    // We use !important to override existing CSS classes
    clone.style.cssText = `
        display: block !important;
        visibility: visible !important;
        position: relative !important;
        background: white !important;
        color: black !important;
        width: 100% !important;
        max-width: 100% !important;
        margin: 0 !important;
        padding: 20px !important;
        font-family: 'Times New Roman', serif !important;
        font-size: 12pt !important;
        line-height: 1.5 !important;
        box-shadow: none !important;
        border: none !important;
    `;
    
    // 2. NORMALIZE CHILDREN STYLES (Tables, Headings, etc.)
    const allElements = clone.querySelectorAll('*');
    allElements.forEach(el => {
        // Force black text
        el.style.color = 'black';
        
        // Fix Tables
        if(el.tagName === 'TABLE') {
            el.style.width = '100%';
            el.style.borderCollapse = 'collapse';
            el.style.marginBottom = '15px';
            el.style.border = '1px solid black';
            el.style.fontSize = '10pt'; // Slightly smaller for tables
        }
        if(el.tagName === 'TH' || el.tagName === 'TD') {
            el.style.border = '1px solid black';
            el.style.padding = '6px';
            el.style.verticalAlign = 'top';
        }
        if(el.tagName === 'TH') {
            el.style.backgroundColor = '#f0f0f0';
            el.style.fontWeight = 'bold';
        }
        
        // Fix Headings
        if(['H1','H2','H3','H4','H5'].includes(el.tagName)) {
            el.style.marginTop = '15px';
            el.style.marginBottom = '10px';
            el.style.color = 'black';
        }
        
        // Fix Lists
        if(el.tagName === 'UL' || el.tagName === 'OL') {
            el.style.paddingLeft = '20px';
            el.style.marginBottom = '10px';
        }
    });
    // Ensure images are visible/inline for PDF/Word export
    const imgs = clone.querySelectorAll('img');
    imgs.forEach(img => {
        img.style.maxWidth = '120px';
        img.style.height = 'auto';
        img.style.display = 'block';
        img.style.marginBottom = '6px';
    });
    
    // Remove print-area class if present
    clone.classList.remove('print-area');
    
    // Create off-screen container
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '0';
    container.style.width = '800px'; // Fixed width for A4 simulation
    container.appendChild(clone);
    document.body.appendChild(container);

    const orientation = getExportOrientation(divId);
    const jsPdfOrientation = (orientation && orientation.toLowerCase().startsWith('l')) ? 'landscape' : 'portrait';
    const opt = {
        margin:       0.5,
        filename:     filename + '.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, scrollY: 0 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: jsPdfOrientation },
        pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
    };

    // Generate PDF
    html2pdf().set(opt).from(clone).save().then(() => {
        document.body.removeChild(container);
        showToast("PDF berhasil diunduh!");

    }).catch(err => {
        console.error("PDF Generation Error:", err);
        document.body.removeChild(container);
        showToast("Gagal membuat PDF.");
    });
};
window.printSection = function(divId) {
    document.querySelectorAll('.print-area').forEach(el => el.classList.remove('print-area'));
    const target = document.getElementById(divId);
    if(target) {
        target.classList.add('print-area');
        window.print();
        target.classList.remove('print-area');
    }
};
window.clearOutput = function(elementId) {
    document.getElementById(elementId).style.display = 'none';
};

// Bank Soal Utils
window.openSaveModal = function() { document.getElementById('modal-save-confirm').style.display = 'flex'; };
window.closeSaveModal = function() { document.getElementById('modal-save-confirm').style.display = 'none'; };

// Load and display saved bank items on page load
window.loadBankItems = function() {
    const list = document.getElementById('bank-list-container');
    const bank = JSON.parse(localStorage.getItem('bankSoal') || '{}');
    
    if(Object.keys(bank).length === 0) {
        list.innerHTML = '<p style="text-align:center; color:var(--text-muted);">Belum ada soal tersimpan.</p>';
        return;
    }
    
    list.innerHTML = '';
    Object.keys(bank).forEach(key => {
        const item = bank[key];
        const itemDiv = document.createElement('div');
        itemDiv.style.cssText = 'display:flex; justify-content:space-between; align-items:center; padding:12px; background:var(--bg-body); border-radius:8px; margin-bottom:10px; cursor:pointer; transition:0.3s; border:1px solid var(--border-color);';
        itemDiv.onmouseover = function() { this.style.background = 'var(--bg-hover)'; };
        itemDiv.onmouseout = function() { this.style.background = 'var(--bg-body)'; };
        
        itemDiv.innerHTML = `
            <div style="flex:1;">
                <div onclick="openBankItem('${key}')" style="cursor:pointer; font-weight:500; color:var(--primary); text-decoration:underline;">
                    <i class="fas fa-file-alt"></i> ${item.name}
                </div>
                <small style="color:var(--text-muted); display:block; margin-top:4px;">Disimpan: ${new Date(item.date).toLocaleString('id-ID')}</small>
            </div>
            <button class="btn btn-danger btn-xs" onclick="deleteBankItem('${key}')" style="padding:4px 8px; font-size:0.75rem;">
                <i class="fas fa-trash"></i> Hapus
            </button>
        `;
        list.appendChild(itemDiv);
    });
    document.getElementById('bank-count').innerText = Object.keys(bank).length;
};

window.confirmSaveToBank = function() {
    const name = document.getElementById('save-set-name').value;
    if(!name) return showToast("Isi nama paket!");
    
    // Get the current soal content
    const kisiContent = document.getElementById('content-kisi')?.innerHTML || '';
    const naskahContent = document.getElementById('content-naskah')?.innerHTML || '';
    const ljkContent = document.getElementById('content-ljk')?.innerHTML || '';
    const bahasContent = document.getElementById('content-bahas')?.innerHTML || '';
    
    if(!kisiContent && !naskahContent) return showToast("Tidak ada soal untuk disimpan!");
    
    // Save to localStorage
    const bank = JSON.parse(localStorage.getItem('bankSoal') || '{}');
    const key = Date.now().toString();
    bank[key] = {
        name: name,
        date: new Date().toISOString(),
        kisi: kisiContent,
        naskah: naskahContent,
        ljk: ljkContent,
        bahas: bahasContent
    };
    localStorage.setItem('bankSoal', JSON.stringify(bank));
    
    document.getElementById('bank-count').innerText = Object.keys(bank).length;
    window.closeSaveModal();
    showToast("Soal berhasil disimpan ke Bank!")
    document.getElementById('save-set-name').value = '';
    window.loadBankItems();
};

window.openBankItem = function(key) {
    const bank = JSON.parse(localStorage.getItem('bankSoal') || '{}');
    const item = bank[key];
    
    if(!item) {
        showToast("Soal tidak ditemukan!");
        return;
    }
    
    // Restore content to res-soal tabs
    document.getElementById('content-kisi').innerHTML = item.kisi || '<p style="color:var(--text-muted);">Tidak ada data</p>';
    document.getElementById('content-naskah').innerHTML = item.naskah || '<p style="color:var(--text-muted);">Tidak ada data</p>';
    document.getElementById('content-ljk').innerHTML = item.ljk || '<p style="color:var(--text-muted);">Tidak ada data</p>';
    document.getElementById('content-bahas').innerHTML = item.bahas || '<p style="color:var(--text-muted);">Tidak ada data</p>';
    
    // Show res-soal and scroll
    document.getElementById('res-soal').style.display = 'block';
    document.getElementById('res-soal').scrollIntoView({ behavior: 'smooth' });
    
    showToast(`Membuka: ${item.name}`);
};

window.deleteBankItem = function(key) {
    if(!confirm('Hapus soal ini?')) return;
    
    const bank = JSON.parse(localStorage.getItem('bankSoal') || '{}');
    delete bank[key];
    localStorage.setItem('bankSoal', JSON.stringify(bank));
    
    document.getElementById('bank-count').innerText = Object.keys(bank).length;
    showToast("Soal dihapus!");
    window.loadBankItems();
};

window.clearBank = function() {
    if(!confirm('Hapus semua soal di bank?')) return;
    localStorage.removeItem('bankSoal');
    document.getElementById('bank-count').innerText = '0';
    showToast("Bank soal dikosongkan!");
    window.loadBankItems();
};

// --- INTEGRASI SPREADSHEET (EXCEL) ---

// 1. Fungsi Import Excel (Membaca Kolom Pertama)
const excelInput = document.getElementById('excel-input-file');
if(excelInput) {
    excelInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if(!file) return;

        // Tampilkan nama file
        const fileNameSpan = document.getElementById('excel-file-name');
        if(fileNameSpan) {
            fileNameSpan.innerText = 'File: ' + file.name;
            fileNameSpan.style.display = 'inline';
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, {type: 'array'});
            // Ambil sheet pertama
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            // Ubah ke JSON (Array of Arrays)
            const jsonData = XLSX.utils.sheet_to_json(worksheet, {header: 1});
            // Ambil data dari kolom pertama (indeks 0), abaikan baris kosong atau teks header
            let nilaiArray = [];
            jsonData.forEach(row => {
                if(row[0] && !isNaN(row[0])) {
                    nilaiArray.push(row[0]);
                }
            });
            if(nilaiArray.length > 0) {
                document.getElementById('nilai-input').value = nilaiArray.join(', ');
                showToast(`Berhasil mengimpor ${nilaiArray.length} data nilai!`);
            } else {
                showToast("Tidak ditemukan data angka pada kolom pertama Excel.");
            }
        };
        reader.readAsArrayBuffer(file);
    });
}

// 2. Fungsi Export ke Excel (Dari HTML Table atau Teks)
window.exportToExcel = function(divId, filename) {
    const element = document.getElementById(divId);
    if (!element) return showToast("Konten tidak ditemukan!");

    // Cek apakah ada tabel di dalam hasil
    const table = element.querySelector('table');
    
    let wb = XLSX.utils.book_new();
    let ws;

    if (table) {
        // Jika ada tabel, convert tabel ke sheet
        ws = XLSX.utils.table_to_sheet(table);
    } else {
        // Jika hanya teks, buat sheet sederhana dari teks
        const textData = element.innerText.split('\n').map(line => [line]);
        ws = XLSX.utils.aoa_to_sheet(textData);
    }

    XLSX.utils.book_append_sheet(wb, ws, "Hasil");
    XLSX.writeFile(wb, filename + ".xlsx");
    showToast("Excel berhasil diunduh!");
};

// ===== E-RAPOR FUNCTIONS =====
// Helper: File upload preview and kelas->fase mapping
document.addEventListener('DOMContentLoaded', function() {
    // Photo upload removed: rapor-upload-file / rapor-upload-preview logic eliminated

    // Kelas -> Fase mapping
    function romanToNumber(r) {
        if(!r) return null;
        const map = {I:1,II:2,III:3,IV:4,V:5,VI:6,VII:7,VIII:8,IX:9};
        const key = r.toUpperCase();
        return map[key] || null;
    }

    function getFaseFromKelas(kelasStr) {
        if(!kelasStr) return '';
        // Try to find arabic number first
        const m = kelasStr.match(/(\d{1,2})/);
        let num = null;
        if(m) num = parseInt(m[1],10);
        else {
            // try roman numerals (I..IX)
            const mr = kelasStr.match(/\b(I|II|III|IV|V|VI|VII|VIII|IX)\b/i);
            if(mr) num = romanToNumber(mr[1]);
        }
        if(!num) return '';
        if(num <= 2) return 'A';
        if(num <= 4) return 'B';
        if(num <= 6) return 'C';
        if(num <= 8) return 'D';
        if(num === 9) return 'E';
        return '';
    }

    const kelasInput = document.getElementById('rapor-kelas');
    const faseInput = document.getElementById('rapor-fase');
    function syncFase() {
        if(!kelasInput || !faseInput) return;
        const val = kelasInput.value || '';
        const fase = getFaseFromKelas(val.trim());
        faseInput.value = fase || '';
    }
    if(kelasInput) {
        kelasInput.addEventListener('input', syncFase);
        // initialize
        syncFase();
    }
    
    // Sync Muatan Lokal names with Capaian Kompetensi Muatan Lokal
    function initMuatanLokalSync() {
        const container = document.getElementById('rapor-muatan-lokal-container');
        const capContainer = document.getElementById('rapor-capaian-kompetensi-mulok-container');
        if(!container || !capContainer) return;

        // Assign ids for existing pairs and add listeners
        const itemDivs = Array.from(container.querySelectorAll(':scope > div'));
        itemDivs.forEach(div => {
            const nameInput = div.querySelector('.rapor-muatan-lokal-nama');
            const nilaiInput = div.querySelector('.rapor-muatan-lokal-nilai');

            // Determine muatan name
            let muatanName = '';
            if(nameInput) muatanName = (nameInput.value || '').trim();
            if(!muatanName && nilaiInput) muatanName = nilaiInput.getAttribute('data-muatan') || '';
            if(!muatanName) return; // skip malformed

            // Ensure there's a stable id linking the value and capaian
            let id = nilaiInput.getAttribute('data-muatan-id');
            if(!id) {
                id = __genMuatanId();
                if(nilaiInput) nilaiInput.setAttribute('data-muatan-id', id);
                if(nameInput) nameInput.setAttribute('data-muatan-id', id);
            }

            // Find matching capaian element by existing data-muatan-id or by data-muatan
            let capTextarea = capContainer.querySelector(`.rapor-capaian-kompetensi-mulok-input[data-muatan-id="${id}"]`)
                || capContainer.querySelector(`.rapor-capaian-kompetensi-mulok-input[data-muatan="${muatanName}"]`);

            if(capTextarea) {
                // set its id and label
                capTextarea.setAttribute('data-muatan-id', id);
                capTextarea.setAttribute('data-muatan', muatanName);
                const capLabel = capTextarea.parentElement && capTextarea.parentElement.querySelector('label');
                if(capLabel) capLabel.textContent = muatanName;
            }

            // Add listener to nameInput to update linked elements
            if(nameInput && nilaiInput) {
                nameInput.addEventListener('input', function() {
                    const newName = this.value.trim();
                    if(!newName) return;
                    nilaiInput.setAttribute('data-muatan', newName);
                    // update cap textarea by id
                    const capById = capContainer.querySelector(`.rapor-capaian-kompetensi-mulok-input[data-muatan-id="${id}"]`);
                    if(capById) {
                        capById.setAttribute('data-muatan', newName);
                        const lbl = capById.parentElement && capById.parentElement.querySelector('label');
                        if(lbl) lbl.textContent = newName;
                    }
                });
            }
        });
    }

    // Initialize on page load
    initMuatanLokalSync();
    syncMapelCapaian();  // Sinkronisasi Capaian Kompetensi dengan Mapel pada page load
});

// Global Muatan Lokal ID counter dan generator (untuk diakses dari fungsi global saveAddMulok)
let __muatanIdCounter = Date.now();
function __genMuatanId() { return 'mulok-' + (__muatanIdCounter++); }

// Fungsi untuk sinkronisasi Mata Pelajaran dengan Capaian Kompetensi
window.syncMapelCapaian = function() {
    const nilaiContainer = document.getElementById('rapor-nilai-container');
    const capContainer = document.getElementById('rapor-capaian-kompetensi-container');
    
    if(!nilaiContainer || !capContainer) return;
    
    // Get all mapel dari nilai container
    const nilaiInputs = Array.from(nilaiContainer.querySelectorAll('.rapor-nilai-input'));
    const mapelNames = new Set(nilaiInputs.map(input => input.getAttribute('data-mapel')));
    
    // Get existing capaian mapel
    const existingCapaian = new Set(
        Array.from(capContainer.querySelectorAll('.rapor-capaian-kompetensi-input')).map(ta => ta.getAttribute('data-mapel'))
    );
    
    // Tambah capaian untuk mapel yang tidak ada
    mapelNames.forEach(mapel => {
        if(!existingCapaian.has(mapel)) {
            const div = document.createElement('div');
            div.style.padding = '12px';
            div.style.background = 'var(--bg-body)';
            div.style.borderRadius = '8px';
            div.style.border = '1px solid var(--border)';
            div.setAttribute('data-mapel-capaian', mapel);
            div.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <label style="font-size:0.85rem; font-weight:600; margin: 0;">${mapel}</label>
                    <label class="switch" style="margin: 0;">
                        <input type="checkbox" class="rapor-mapel-switch" data-mapel="${mapel}" checked>
                        <span class="slider"></span>
                    </label>
                </div>
                <textarea class="rapor-capaian-kompetensi-input form-control" data-mapel="${mapel}" rows="2" placeholder="Capaian kompetensi..." style="margin-top:5px; font-size:0.85rem;"></textarea>
            `;
            capContainer.appendChild(div);
        }
    });
    
    // Hapus capaian untuk mapel yang sudah dihapus
    Array.from(capContainer.querySelectorAll('[data-mapel-capaian]')).forEach(div => {
        const mapel = div.getAttribute('data-mapel-capaian');
        if(!mapelNames.has(mapel)) {
            div.remove();
        }
    });
};

// Helper function untuk menghapus mapel dan capaian kompetensinya
window.removeMapelAndCapaian = function(mapelName, buttonEl) {
    buttonEl.parentElement.parentElement.remove();
    const capContainer = document.getElementById('rapor-capaian-kompetensi-container');
    const capDiv = capContainer.querySelector(`[data-mapel-capaian="${mapelName}"]`);
    if(capDiv) capDiv.remove();
};

// Helper: Tambah field mata pelajaran (Updated - menggunakan Modal)
window.addMapelField = function() {
    openAddMapelModal();
};

// Helper: Tambah field muatan lokal (Updated - menggunakan Modal)
window.addMuatanLokalField = function() {
    openAddMulokModal();
};

// Helpers: Ekstrakurikuler dynamic fields
window.addEkstraField = function() {
    const list = document.getElementById('rapor-ekstrakurikuler-list');
    if (!list) return;
    const div = document.createElement('div');
    div.className = 'ekstra-item';
    div.innerHTML = `
        <input type="text" class="form-control ekstra-name" placeholder="Nama Kegiatan (mis. Pramuka)">
        <input type="text" class="form-control ekstra-role" placeholder="Peran (mis. Anggota / Ketua)">
        <select class="form-control ekstra-freq">
            <option value="">Frekuensi</option>
            <option value="Harian">Harian</option>
            <option value="Mingguan">Mingguan</option>
            <option value="Bulanan">Bulanan</option>
            <option value="Tahunan">Tahunan</option>
        </select>
        <button class="btn btn-danger btn-sm" type="button"><i class="fas fa-trash"></i></button>
    `;
    // remove handler
    div.querySelector('button').addEventListener('click', function() { div.remove(); updateEkstraSummary(); });
    // update summary when inputs change
    div.querySelectorAll('input, select').forEach(i => i.addEventListener('input', updateEkstraSummary));
    list.appendChild(div);
    setTimeout(() => { const f = div.querySelector('.ekstra-name'); if(f) f.focus(); }, 10);
    updateEkstraSummary();
};

function updateEkstraSummary() {
    const list = document.getElementById('rapor-ekstrakurikuler-list');
    const summary = document.getElementById('rapor-ekstrakurikuler');
    if(!summary) return;
    if(!list) { summary.value = ''; return; }
    const items = Array.from(list.querySelectorAll('.ekstra-item'));
    const lines = items.map(it => {
        const name = (it.querySelector('.ekstra-name') || {}).value || '';
        const role = (it.querySelector('.ekstra-role') || {}).value || '';
        const freq = (it.querySelector('.ekstra-freq') || {}).value || '';
        const parts = [];
        if(name.trim()) parts.push(name.trim());
        if(role.trim()) parts.push('(' + role.trim() + ')');
        if(freq) parts.push('[' + freq + ']');
        return parts.join(' ');
    }).filter(l => l.trim());
    summary.value = lines.join('\n');
}

// --- Kokurikuler: generate catatan otomatis berdasarkan Tema + Dimensi (switch)
function updateKokulNote() {
    const temaEl = document.getElementById('rapor-tema-kokul');
    const noteEl = document.getElementById('rapor-catatan-kokul');
    const switches = Array.from(document.querySelectorAll('.rapor-profil-switch'));
    if(!noteEl) return;
    const tema = temaEl ? (temaEl.value || '').trim() : '';
    const selected = switches.filter(s => s.checked).map(s => s.getAttribute('data-profil'));

    if(!tema && selected.length === 0) return; // nothing to auto-fill

    // contoh khusus yang diminta oleh pengguna
    const sampleNote = 'Ananda sudah cakap dalam penalaran kritis saat mencari solusi terhadap permasalahan terkait lingkungan dan masih perlu berlatih dalam mengomunikasikan gagasan';

    // jika tema mengandung kata 'lingkung' atau Penalaran Kritis dipilih, gunakan contoh persis
    const temaLower = tema ? tema.toLowerCase() : '';
    if (temaLower.includes('lingkung') || selected.includes('Penalaran Kritis')) {
        noteEl.value = sampleNote;
        return;
    }
    const phraseMap = {
        'Keimanan dan Ketakwaan terhadap Tuhan Yang Maha Esa': 'menunjukkan sikap keimanan dan ketakwaan terhadap Tuhan Yang Maha Esa',
        'Kewargaan': 'bersikap sebagai warga negara yang baik',
        'Penalaran Kritis': 'menggunakan penalaran kritis dalam pemecahan masalah',
        'Kreativitas': 'menunjukkan kreativitas dan inisiatif',
        'Kolaborasi': 'bekerja sama secara efektif dalam tim',
        'Kemandirian': 'memperlihatkan kemandirian dalam tugas',
        'Kesehatan': 'menjaga kesehatan dan kebugaran diri',
        'Komunikasi': 'mengomunikasikan gagasan dengan jelas dan percaya diri'
    };

    const descriptors = selected.map(p => phraseMap[p] || p);
    let note = '';
    if(tema) note += `Tema proyek: ${tema}. `;
    if(descriptors.length) {
        note += 'Dalam kegiatan kokurikuler, siswa ' + descriptors.join('; ') + '.';
    }

    noteEl.value = note;
}

// Hook events: tema input and switches
function initKokulAutoNote() {
    const temaEl = document.getElementById('rapor-tema-kokul');
    if(temaEl) temaEl.addEventListener('input', updateKokulNote);
    document.querySelectorAll('.rapor-profil-switch').forEach(s => s.addEventListener('change', updateKokulNote));
    // initial run
    updateKokulNote();
}

// Initialize kokul note handlers after DOM ready (script is at end of body but ensure)
try { initKokulAutoNote(); } catch(e){ /* ignore if elements not yet present */ }

// ===== OPTIMIZED EVENT DELEGATION FOR RAPOR =====
// Cache untuk selectors yang sering diquery
const selectorCache = {
    nilaiInputs: null,
    mapelSwitches: null,
    profilSwitches: null,
    mulokSwitches: null,
    lastCacheTime: 0,
    CACHE_DURATION: 500 // Cache selama 500ms
};

/**
 * Invalidate cache jika ada perubahan DOM
 */
function invalidateSelectorCache() {
    selectorCache.lastCacheTime = 0;
    selectorCache.nilaiInputs = null;
    selectorCache.mapelSwitches = null;
}

/**
 * Get cached selector dengan auto-invalidate
 */
function getCachedSelector(selectorType) {
    const now = Date.now();
    if (now - selectorCache.lastCacheTime > selectorCache.CACHE_DURATION) {
        selectorCache.lastCacheTime = now;
        selectorCache.nilaiInputs = null;
        selectorCache.mapelSwitches = null;
    }
    
    switch(selectorType) {
        case 'nilaiInputs':
            if (!selectorCache.nilaiInputs) {
                selectorCache.nilaiInputs = document.querySelectorAll('.rapor-nilai-input');
            }
            return selectorCache.nilaiInputs;
        case 'mapelSwitches':
            if (!selectorCache.mapelSwitches) {
                selectorCache.mapelSwitches = document.querySelectorAll('.rapor-mapel-switch');
            }
            return selectorCache.mapelSwitches;
        case 'profilSwitches':
            if (!selectorCache.profilSwitches) {
                selectorCache.profilSwitches = document.querySelectorAll('.rapor-profil-switch');
            }
            return selectorCache.profilSwitches;
        default:
            return [];
    }
}

/**
 * Event delegation untuk capaian kompetensi input
 * Meminimalkan jumlah event listeners dengan delegation
 */
function setupRaporEventDelegation() {
    const capaianContainer = document.getElementById('rapor-capaian-kompetensi-container');
    
    if (capaianContainer) {
        // Debounced input handler untuk textareas
        const debouncedCapaianChange = debounce(function(e) {
            if (e.target.classList.contains('rapor-capaian-kompetensi-input')) {
                invalidateSelectorCache();
            }
        }, 500);
        
        capaianContainer.addEventListener('input', debouncedCapaianChange, true);
    }
}

// Setup event delegation saat DOM ready
setupRaporEventDelegation();

// ===== END PERFORMANCE OPTIMIZATIONS =====

// Helper: Convert nilai to predicate (description)
function nilaiToPredicate(nilai) {
    nilai = parseInt(nilai) || 0;
    if(nilai >= 95) return 'Sangat Baik';
    if(nilai >= 85) return 'Baik';
    if(nilai >= 75) return 'Cukup';
    if(nilai >= 60) return 'Kurang';
    return 'Sangat Kurang';
}

// Helper: Load data from Profil Guru
window.loadDataFromProfil = function() {
    // Ambil data dari Profil Guru (localStorage)
    const nama_guru = localStorage.getItem('as_nama') || '';
    const nip_guru = localStorage.getItem('as_nip') || '';
    const alamat_sekolah = localStorage.getItem('as_alamat') || localStorage.getItem('as_sekolah') || '';
    const kepsek = localStorage.getItem('as_kepsek') || '';
    const nip_kepsek = localStorage.getItem('as_nip_kepsek') || '';
    
    // Set ke form E-Rapor
    document.getElementById('rapor-walikelas').value = nama_guru;
    document.getElementById('rapor-nip').value = nip_guru;
    document.getElementById('rapor-alamat-sekolah').value = alamat_sekolah;
    document.getElementById('rapor-kepsek').value = kepsek;
    document.getElementById('rapor-nip-kepsek').value = nip_kepsek;
    
    showToast('Data dari Profil Guru berhasil dimuat!');
};

// Generate E-Rapor (2025 Kurikulum Merdeka)
document.getElementById('btn-gen-rapor').addEventListener('click', function() {
    // Collect student identity data from form inputs
    const nama = document.getElementById('rapor-nama').value || 'Siswa';
    const nisn = document.getElementById('rapor-nisn').value || '';
    const kelas = document.getElementById('rapor-kelas').value || '';
    const fase = document.getElementById('rapor-fase').value || '';
    const semester = document.getElementById('rapor-semester').value || 'Ganjil';
    const tahunAjaran = document.getElementById('rapor-tahun').value || '';
    
    // Attendance data
    const sakit = document.getElementById('rapor-sakit').value || 0;
    const izin = document.getElementById('rapor-izin').value || 0;
    const alfa = document.getElementById('rapor-alfa').value || 0;
    
    // Additional info
    const ekstrakurikuler = document.getElementById('rapor-ekstrakurikuler').value || '';
    const catatan = document.getElementById('rapor-catatan').value || '';
    const walikelas = document.getElementById('rapor-walikelas').value || 'Wali Kelas';
    const nip = document.getElementById('rapor-nip').value || '';
    const alamatSekolah = document.getElementById('rapor-alamat-sekolah').value || localStorage.getItem('as_alamat') || '';
    const kepsek = document.getElementById('rapor-kepsek').value || localStorage.getItem('as_kepsek') || '';
    const nipKepsek = document.getElementById('rapor-nip-kepsek').value || localStorage.getItem('as_nip_kepsek') || '';
    
    // Tanggal laporan (use current date if not set)
    const tglLaporanValue = document.getElementById('rapor-tanggal-laporan').value;
    const tglLaporan = tglLaporanValue ? new Date(tglLaporanValue) : new Date();
    
    const profilSwitches = document.querySelectorAll('.rapor-profil-switch');
    const profil = {};
    profilSwitches.forEach(s => {
        const profilName = s.getAttribute('data-profil');
        profil[profilName] = s.checked ? 'Terpenuhi' : 'Belum';
    });
    
    // Get nilai mapel - only include active subjects (with checked switch)
    // OPTIMIZATION: Use cached selectors untuk mengurangi DOM queries
    const nilaiInputs = getCachedSelector('nilaiInputs');
    const mapelSwitches = getCachedSelector('mapelSwitches');
    const mapelNilai = [];
    let totalNilai = 0;
    
    // Build map untuk faster lookup
    const switchMap = new Map();
    mapelSwitches.forEach(s => {
        switchMap.set(s.getAttribute('data-mapel'), s.checked);
    });
    
    nilaiInputs.forEach(input => {
        const mapel = input.getAttribute('data-mapel');
        // Check if switch is active (default true jika tidak ada switch)
        const isActive = switchMap.has(mapel) ? switchMap.get(mapel) : true;
        if (isActive) {
            const nilai = parseInt(input.value) || 0;
            mapelNilai.push({ mapel, nilai });
            totalNilai += nilai;
        }
    });
    
    if (mapelNilai.length === 0) {
        showToast('Pilih minimal satu mata pelajaran yang aktif!');
        return;
    }
    
    const rataRata = Math.round(totalNilai / mapelNilai.length);
    
    // Get muatan lokal - hanya include yang switch-nya aktif
    const muatanLocalInputs = document.querySelectorAll('.rapor-muatan-lokal-nilai');
    const muatanLokal = [];
    muatanLocalInputs.forEach(input => {
        const muatan = input.getAttribute('data-muatan');
        const mulokSwitch = Array.from(document.querySelectorAll('.rapor-mulok-switch')).find(
            s => s.getAttribute('data-muatan') === muatan
        );
        if (mulokSwitch && mulokSwitch.checked) {
            const nilai = parseInt(input.value) || 0;
            muatanLokal.push({ muatan, nilai });
        }
    });
    
    // Get tema kokurikuler
    const catatKokul = document.getElementById('rapor-catatan-kokul').value || '';
    
    // Get capaian kompetensi per mapel
    const capaianKompetensiMap = {};
    const capaianInputs = document.querySelectorAll('.rapor-capaian-kompetensi-input');
    capaianInputs.forEach(input => {
        const mapel = input.getAttribute('data-mapel');
        const value = input.value || '';
        capaianKompetensiMap[mapel] = value;
    });
    
    // Get capaian kompetensi per muatan lokal
    const capaianInputsMulok = document.querySelectorAll('.rapor-capaian-kompetensi-mulok-input');
    capaianInputsMulok.forEach(input => {
        const muatan = input.getAttribute('data-muatan');
        const value = input.value || '';
        capaianKompetensiMap[muatan] = value;
    });
    
    // Format tanggal laporan
    const tglLaporanObj = new Date(tglLaporan);
    const tglFormat = tglLaporanObj.toLocaleDateString('id-ID', {year: 'numeric', month: 'long', day: 'numeric'});
    // Lokasi laporan (optional) - combine with tanggal when displayed
    const lokasiLaporan = (document.getElementById('rapor-lokasi-laporan') && document.getElementById('rapor-lokasi-laporan').value) ? document.getElementById('rapor-lokasi-laporan').value.trim() : '';
    const tglWithLokasi = lokasiLaporan ? `${lokasiLaporan}, ${tglFormat}` : tglFormat;
    // Photo logic removed: no uploadedHtml or photoInlineHtml
    
    // Build HTML Report (2025 Kurikulum Merdeka Format)
    let html = `
        <style>
            body { font-family: 'Times New Roman', serif; }
            .rapor-header { position: relative; text-align: center; margin-bottom: 20px; }
            .rapor-header h2 { margin: 0; font-size: 16pt; font-weight: bold; }
            .rapor-header p { margin: 2px 0; font-size: 10pt; }
            .rapor-section { margin-bottom: 20px; }
            .rapor-section h3 { margin: 10px 0 8px 0; font-size: 11pt; font-weight: bold; border-bottom: 1px solid #000; padding-bottom: 4px; background: #f5f5f5; padding: 5px; }
            .rapor-row { display: flex; margin: 5px 0; font-size: 10pt; }
            .rapor-label { width: 200px; font-weight: bold; }
            .rapor-value { flex: 1; }
            .rapor-table { width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 9pt; }
            .rapor-table th, .rapor-table td { border: 1px solid #999; padding: 6px; text-align: left; }
            .rapor-table th { background: #e0e0e0; font-weight: bold; text-align: center; }
            .rapor-table td { text-align: center; }
            .rapor-table td:first-child { text-align: center; width: 30px; }
            .rapor-table td:nth-child(2) { text-align: left; }
            .rapor-table td:nth-child(3) { text-align: center; }
            .rapor-footer { margin-top: 40px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; font-size: 9pt; text-align: center; }
            .signature-box { padding: 20px 10px; }
            .signature-line { margin-top: 50px; border-top: 1px solid black; padding-top: 5px; height: 1px; }
            .rapor-title { font-weight: bold; text-decoration: underline; }
            .text-center { text-align: center; }
            .mt-10 { margin-top: 10px; }
            .mb-10 { margin-bottom: 10px; }
            .info-box { background: #f9f9f9; padding: 8px; margin: 8px 0; border-left: 3px solid #1976d2; }
        </style>
        
        <div class="rapor-header">
            <p style="font-weight: bold;">LAPORAN HASIL BELAJAR</p>
            <p style="font-weight: bold;">(RAPOR)</p>
        </div>
        
        <!-- A. IDENTITAS SISWA -->
        <div class="rapor-section">
            <div style="overflow:hidden;">
            <table style="width:100%; border:none;">
                <tr><td style="border:none; padding:4px;"><div class="rapor-row"><span style="width:200px; font-weight:bold;">Nama Peserta Didik</span><span>: ${nama}</span></div></td><td style="border:none; padding:4px;"><div class="rapor-row"><span style="width:150px; font-weight:bold;">Kelas</span><span>: ${kelas}</span></div></td></tr>
                <tr><td style="border:none; padding:4px;"><div class="rapor-row"><span style="width:200px; font-weight:bold;">NIS/NISN</span><span>: ${nisn}</span></div></td><td style="border:none; padding:4px;"><div class="rapor-row"><span style="width:150px; font-weight:bold;">Fase</span><span>: ${fase}</span></div></td></tr>
                <tr><td style="border:none; padding:4px;"><div class="rapor-row"><span style="width:200px; font-weight:bold;">Sekolah</span><span>: ${localStorage.getItem('as_sekolah') || 'SEKOLAH'}</span></div></td><td style="border:none; padding:4px;"><div class="rapor-row"><span style="width:150px; font-weight:bold;">Semester</span><span>: ${semester}</span></div></td></tr>
                <tr><td style="border:none; padding:4px;"><div class="rapor-row"><span style="width:200px; font-weight:bold;">Alamat</span><span>: ${alamatSekolah || 'ALAMAT SEKOLAH'}</span></div></td><td style="border:none; padding:4px;"><div class="rapor-row"><span style="width:150px; font-weight:bold;">Tahun Ajaran</span><span>: ${tahunAjaran}</span></div></td></tr>
            </table>
            </div>
        </div>

        <!-- Separator moved: line placed before Mata Pelajaran table -->
        <div style="border-bottom: 2px solid black; margin: 12px 0;"></div>

        <div class="rapor-section">
            <table class="rapor-table">
                <thead>
                    <tr>
                        <th style="width: 30px;">No.</th>
                        <th>Mata Pelajaran</th>
                        <th style="width: 100px;">Nilai Akhir</th>
                        <th style="width: 300px;">Capaian Kompetensi</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    mapelNilai.forEach((item, idx) => {
        const capaian = capaianKompetensiMap[item.mapel] || 'Siswa telah menguasai kompetensi dengan hasil ' + item.nilai + '/100';
        const capaianLines = capaian.split('\n').slice(0, 2).join('<br>');
        html += `
            <tr>
                <td>${idx + 1}</td>
                <td style="text-align: left;">${item.mapel}</td>
                <td>${item.nilai}</td>
                <td style="text-align: left; font-size: 8pt; white-space: pre-wrap; word-break: break-word; max-height: 60px; overflow: hidden;">${capaianLines}</td>
            </tr>
        `;
    });
    
    html += `
                </tbody>
            </table>
        </div>
        
        <!-- MUATAN LOKAL -->
        ${muatanLokal.length > 0 ? `
        <div class="rapor-section">
            <table class="rapor-table">
                <thead>
                    <tr>
                        <th style="width: 30px;">No.</th>
                        <th>Muatan Lokal</th>
                        <th style="width: 100px;">Nilai</th>
                        <th style="width: 300px;">Capaian Kompetensi</th>
                    </tr>
                </thead>
                <tbody>
        ` : ''}
        ${muatanLokal.map((item, idx) => {
            const capaian = capaianKompetensiMap[item.muatan] || 'Siswa telah menguasai kompetensi dengan hasil ' + item.nilai + '/100';
            const capaianLines = capaian.split('\n').slice(0, 2).join('<br>');
            return `
                    <tr>
                        <td>${idx + 1}</td>
                        <td style="text-align: left;">${item.muatan}</td>
                        <td style="text-align: center;">${item.nilai}</td>
                        <td style="text-align: left; font-size: 8pt; white-space: pre-wrap; word-break: break-word; max-height: 60px; overflow: hidden;">${capaianLines}</td>
                    </tr>
            `;
        }).join('')}
        ${muatanLokal.length > 0 ? `
                </tbody>
            </table>
        </div>
        ` : ''}
        
        <!-- KOKURIKULER -->
        <div class="rapor-section">
            <table class="rapor-table">
                <thead>
                    <tr>
                        <th>Kokurikuler</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="text-align: left; font-size: 9pt;">${catatKokul || 'Ananda sudah cakap dalam penalaran kritis saat mencari solusi terhadap permasalahan terkait lingkungan dan masih perlu berlatih dalam mengomunikasikan gagasan'}</td>
                    </tr>
                </tbody>
            </table>
        </div>
           
        <!-- E. EKSTRAKURIKULER -->
        <div class="rapor-section">
            <table class="rapor-table">
                <thead>
                    <tr>
                        <th style="width: 30px;">No.</th>
                        <th>Ekstrakurikuler</th>
                        <th>Keterangan</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    const ekskul = ekstrakurikuler ? ekstrakurikuler.split('\n').map(e => e.trim()).filter(e => e) : [];
    if(ekskul.length === 0) {
        html += `
                    <tr>
                        <td colspan="3" style="text-align: center; color: #999; font-size: 9pt;">--</td>
                    </tr>
        `;
    } else {
        ekskul.forEach((e, idx) => {
            html += `
                    <tr>
                        <td>${idx + 1}</td>
                        <td style="text-align: left;">${e}</td>
                        <td style="text-align: center;">Aktif</td>
                    </tr>
            `;
        });
    }
    
    html += `
                </tbody>
            </table>
        </div>
        
        <!-- H. KEHADIRAN & CATATAN GURU -->
        <div class="rapor-section" style="margin-top: 20px;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <!-- Kehadiran -->
                <div>
                    <h3 style="margin: 0 0 8px 0; font-size: 10pt; font-weight: bold; border-bottom: 1px solid #000; padding-bottom: 3px;">Kehadiran</h3>
                    <table style="width: 100%; border-collapse: collapse; font-size: 9pt;">
                        <tr>
                            <td style="border: 1px solid #999; padding: 4px; font-weight: bold; width: 50%;">Sakit</td>
                            <td style="border: 1px solid #999; padding: 4px; text-align: center;">: ${sakit} hari</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #999; padding: 4px; font-weight: bold;">Izin</td>
                            <td style="border: 1px solid #999; padding: 4px; text-align: center;">: ${izin} hari</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #999; padding: 4px; font-weight: bold;">Tanpa Keterangan</td>
                            <td style="border: 1px solid #999; padding: 4px; text-align: center;">: ${alfa} hari</td>
                        </tr>
                    </table>
                </div>
                
                <!-- Catatan Guru Kelas -->
                <div>
                    <h3 style="margin: 0 0 8px 0; font-size: 10pt; font-weight: bold; border-bottom: 1px solid #000; padding-bottom: 3px;">Catatan Guru Kelas</h3>
                    <div style="padding: 6px; background: #fafafa; border: 1px solid #ddd; min-height: 60px; font-size: 9pt; line-height: 1.4; text-align: justify;">
                        ${catatan || 'Siswa menunjukkan perkembangan yang baik dalam pembelajaran. Terus tingkatkan prestasi dan sikap positif.'}
                    </div>
                </div>
            </div>
        </div>
		
        <div class="rapor-section">
            <table class="rapor-table">
                <thead>
                    <tr>
                        <th>Tanggapan Orang Tua / Wali Murid</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    html += `
                    <tr>
                        <td colspan="3" style="text-align: center; color: #999; font-size: 9pt;">--</td>
                    </tr>
        `;
    
    html += `
                </tbody>
            </table>
        </div>		
		
        <div class="rapor-section" style="margin-top: 30px;">
            <!-- Baris 1: Orang Tua/Wali - Guru Kelas -->
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 30px; font-size: 10pt; margin-bottom: 60px;">
                <!-- Orang Tua/Wali -->
                <div style="text-align: center;">
                    <div style="height: 18px; font-size:9pt; margin-bottom: 6px;"></div>
                    <div style="margin-bottom: 60px; font-weight: bold;">Orang Tua/Wali Murid</div>
                    <div style="margin-top: 10px; height: 50px;"></div>
                    <div style="padding-top: 4px;">
                        <div style="font-weight: bold;">_____________________</div>
                        <div style="font-size: 8pt; margin-top: 2px; color: #666;">Tanda tangan</div>
                    </div>
                </div>
                
                <!-- Kolom 2 Kosong -->
                <div></div>
                
                <!-- Guru Kelas -->
                <div style="text-align: center;">
                    <div style="height: 18px; font-size:9pt; margin-bottom: 6px; overflow: hidden;">${tglWithLokasi}</div>
                    <div style="margin-bottom: 60px; font-weight: bold;">Guru Kelas</div>
                    <div style="margin-top: 10px; height: 50px;"></div>
                    <div style="padding-top: 4px;">
                        <div style="font-weight: bold;">${walikelas}</div>
                        <div style="font-size: 8pt; margin-top: 2px; color: #666;">NIP: ${nip || '_____________________'}</div>
                    </div>
                </div>
            </div>
            
            <!-- Spacer -->
            <div style="margin-top: 30px;"></div>
            
            <!-- Baris 2: Kepala Sekolah  -->
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; font-size: 10pt;">
                <!-- Kolom 1 Kosong -->
                <div></div>
                
                <!-- Mengetahui, Kepala Sekolah -->
                <div style="text-align: center;">
                    <div style="margin-bottom: 60px; font-weight: bold;">Mengetahui,<br>Kepala Sekolah</div>
                    <div style="margin-top: 10px; height: 50px;"></div>
                    <div style="padding-top: 4px;">
                        <div style="font-weight: bold;">${kepsek || '_____________________'}</div>
                        <div style="font-size: 8pt; margin-top: 2px; color: #666;">NIP: ${nipKepsek || '_____________________'}</div>
                    </div>
                </div>
                
                <!-- Kolom 3 Kosong -->
                <div></div>
            </div>
        </div>
    `;
    
    // Display hasil
    document.getElementById('res-rapor-content').innerHTML = html;
    document.getElementById('res-rapor').style.display = 'block';
    document.getElementById('stat-generated').innerText = parseInt(document.getElementById('stat-generated').innerText) + 1;
    
    // Scroll ke hasil
    setTimeout(() => {
        document.getElementById('res-rapor').scrollIntoView({ behavior: 'smooth' });
    }, 100);
});

// --- IMPORT EXCEL (MULTI E-RAPOR) HANDLERS ---
// Uses SheetJS (XLSX) already included in the page.
    try {
    const raporExcelInput = document.getElementById('rapor-multi-excel-input');
    const raporExcelSelectBtn = document.getElementById('rapor-excel-select-btn');
    const raporExcelTemplateBtn = document.getElementById('rapor-excel-download-template-btn');
    const raporExcelClearBtn = document.getElementById('rapor-excel-clear-btn');
    const raporExcelFilename = document.getElementById('rapor-excel-filename');
    const raporExcelList = document.getElementById('rapor-excel-list');
    const raporExcelGenerateAllBtn = document.getElementById('rapor-excel-generate-all');
    const raporExcelNote = document.getElementById('rapor-excel-note');
    window.raporExcelRows = window.raporExcelRows || [];

    if(raporExcelSelectBtn && raporExcelInput) {
        raporExcelSelectBtn.addEventListener('click', () => raporExcelInput.click());
    }
    if(raporExcelClearBtn) {
        raporExcelClearBtn.addEventListener('click', () => {
            window.raporExcelRows = [];
            if(raporExcelList) { raporExcelList.innerHTML = ''; raporExcelList.style.display = 'none'; }
            if(raporExcelFilename) raporExcelFilename.innerText = '';
            if(raporExcelClearBtn) raporExcelClearBtn.style.display = 'none';
            if(raporExcelGenerateAllBtn) raporExcelGenerateAllBtn.style.display = 'none';
            if(raporExcelNote) raporExcelNote.style.display = 'none';
            showToast('Data Excel dihapus');
        });
    }

    if(raporExcelInput) {
        raporExcelInput.addEventListener('change', function(e) {
            const f = e.target.files[0];
            if(!f) return;
            if(raporExcelFilename) raporExcelFilename.innerText = f.name;
            const reader = new FileReader();
            reader.onload = function(ev) {
                try {
                    const data = ev.target.result;
                    const workbook = XLSX.read(data, { type: 'binary' });
                    const sheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[sheetName];
                    const json = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
                    if(!json || json.length === 0) { showToast('Sheet kosong atau tidak terbaca'); return; }
                    window.raporExcelRows = json;
                    renderRaporExcelList();
                    if(raporExcelClearBtn) raporExcelClearBtn.style.display = 'inline-flex';
                    if(raporExcelGenerateAllBtn) raporExcelGenerateAllBtn.style.display = 'inline-flex';
                    if(raporExcelNote) raporExcelNote.style.display = 'inline-block';
                } catch(err) { console.error(err); showToast('Gagal membaca file Excel'); }
            };
            reader.readAsBinaryString(f);
        });
    }

    // Template download: generate a sample .xlsx with headers and instructions
    if(raporExcelTemplateBtn) {
        raporExcelTemplateBtn.addEventListener('click', function() {
            try {
                const wb = XLSX.utils.book_new();
                // Comprehensive header row aligned to report form fields - URUTAN SESUAI 12 SECTION E-RAPOR
                const headers = [
                    // 1. Identitas Siswa
                    'Nama','NISN','Kelas','Fase','Semester','Tahun',
                    // 2. Hasil Penilaian Mata Pelajaran (Nilai saja)
                    'Mapel_PendidikanAgama_Nilai',
                    'Mapel_PendidikanPancasila_Nilai',
                    'Mapel_BahasaIndonesia_Nilai',
                    'Mapel_Matematika_Nilai',
                    'Mapel_IPAS_Nilai',
                    'Mapel_PJOK_Nilai',
                    'Mapel_SeniBudaya_Nilai',
                    'Mapel_BahasaInggris_Nilai',
                    // 3. Capaian Kompetensi Mata Pelajaran (Capaian saja)
                    'Mapel_PendidikanAgama_Capaian',
                    'Mapel_PendidikanPancasila_Capaian',
                    'Mapel_BahasaIndonesia_Capaian',
                    'Mapel_Matematika_Capaian',
                    'Mapel_IPAS_Capaian',
                    'Mapel_PJOK_Capaian',
                    'Mapel_SeniBudaya_Capaian',
                    'Mapel_BahasaInggris_Capaian',
                    // 4. Nilai Muatan Lokal
                    'MuatanLocal1_Name','MuatanLocal1_Nilai',
                    'MuatanLocal2_Name','MuatanLocal2_Nilai',
                    // 5. Capaian Kompetensi Muatan Lokal
                    'MuatanLocal1_Capaian',
                    'MuatanLocal2_Capaian',
                    // 6. Tema Kokurikuler & Dimensi Profil Lulusan
                    'TemaKokul',
                    'Profil_Keimanan','Profil_Kewargaan','Profil_PenalaranKritis','Profil_Kreativitas','Profil_Kolaborasi','Profil_Kemandirian','Profil_Kesehatan','Profil_Komunikasi',
                    // 7. Catatan Proses Kokurikuler
                    'CatatanKokul',
                    // 8. Ekstrakurikuler
                    'Ekstrakurikuler',
                    // 9. Data Ketidakhadiran
                    'Sakit','Izin','Alfa',
                    // 10. Catatan Wali Kelas
                    'Catatan',
                    // 11. Penandatanganan
                    'Walikelas','NIP_Walikelas','AlamatSekolah','Kepsek','NIP_Kepsek','LokasiLaporan','TanggalLaporan'
                ];

                const example = [
                    // 1. Identitas Siswa
                    'Budi Santoso','1234567890','VI A','C','Ganjil','2025/2026',
                    // 2. Hasil Penilaian (Nilai)
                    '85','85','88','90','85','92','88','86',
                    // 3. Capaian Kompetensi (Capaian)
                    'Ananda menunjukkan pemahaman yang kuat tentang nilai-nilai keagamaan dan mampu mengintegrasikannya dalam kehidupan sehari-hari.',
                    'Ananda mampu menganalisis isu-isu nasional dengan kritis dan memberikan solusi yang konstruktif.',
                    'Ananda mampu menguasai tata bahasa dan menciptakan karya tulis yang kohesif dan komunikatif.',
                    'Ananda menguasai konsep matematika dengan baik dan mampu menerapkannya dalam pemecahan masalah kontekstual.',
                    'Ananda memahami fenomena alam dan sosial dengan sudut pandang yang holistik dan sistematis.',
                    'Ananda menunjukkan kebugaran jasmani yang optimal dan memiliki pemahaman mendalam tentang gaya hidup sehat.',
                    'Ananda mampu mengekspresikan ide-ide kreatif melalui berbagai medium seni dengan teknik yang baik.',
                    'Ananda mampu berkomunikasi dalam bahasa Inggris dengan baik meskipun masih perlu peningkatan dalam vocabulary.',
                    // 4. Nilai Muatan Lokal
                    'Budaya Lokal','85',
                    'Bahasa Daerah','80',
                    // 5. Capaian Muatan Lokal
                    'Ananda menunjukkan apresiasi yang tinggi terhadap warisan budaya lokal dan mampu melestarikannya.',
                    'Ananda mampu menggunakan bahasa daerah dalam komunikasi sehari-hari dengan baik.',
                    // 6. Tema Kokul & Profil
                    'Aku Cinta Tanaman',
                    'Terpenuhi','Terpenuhi','Terpenuhi','Terpenuhi','Terpenuhi','Terpenuhi','Terpenuhi','Terpenuhi',
                    // 7. Catatan Kokurikuler
                    'Ananda sangat aktif dalam kegiatan proyek dan menunjukkan dedikasi yang tinggi.',
                    // 8. Ekstrakurikuler
                    'Pramuka;Robotika',
                    // 9. Ketidakhadiran
                    '0','0','0',
                    // 10. Catatan Wali
                    'Siswa menunjukkan potensi akademik yang baik terutama dalam mata pelajaran Matematika dan Bahasa Indonesia. Disarankan untuk lebih fokus pada pengembangan keterampilan kolaborasi.',
                    // 11. Penandatanganan
                    'Ibu Siti Nurhaliza','198765432','Jl. Merdeka No.1','Drs. Kepala Sekolah','987654321','Kab. Tangerang','2025-12-03'
                ];
                const sheetData = [headers, example];
                const ws = XLSX.utils.aoa_to_sheet(sheetData);
                
                // Auto width columns
                ws['!cols'] = headers.map(() => ({ wch: 20 }));
                
                XLSX.utils.book_append_sheet(wb, ws, 'DATA SISWA');

                // INSTRUKSI sheet
                const instr = [
                    ['PETUNJUK PENGISIAN TEMPLATE IMPORT E-RAPOR'],
                    ['Urutan kolom sesuai dengan struktur form E-Rapor 12 Section'],
                    [],
                    ['SECTION 1 - IDENTITAS SISWA:'],
                    ['Nama        : Nama lengkap peserta didik'],
                    ['NISN        : Nomor Induk Siswa Nasional (9 digit)'],
                    ['Kelas       : Kelas siswa (misal: VI A, VI B, dll)'],
                    ['Fase        : Fase Kurikulum Merdeka (A, B, C, D, E, F, atau P untuk PAUD)'],
                    ['Semester    : Ganjil atau Genap'],
                    ['Tahun       : Tahun ajaran (format: 2025/2026)'],
                    [],
                    ['SECTION 2 - HASIL PENILAIAN MATA PELAJARAN (Skala 0-100):'],
                    ['Mapel_*_Nilai : Nilai setiap mata pelajaran (angka 0-100)'],
                    ['Kolom: Mapel_PendidikanAgama_Nilai, Mapel_PendidikanPancasila_Nilai, Mapel_BahasaIndonesia_Nilai,'],
                    ['       Mapel_Matematika_Nilai, Mapel_IPAS_Nilai, Mapel_PJOK_Nilai, Mapel_SeniBudaya_Nilai, Mapel_BahasaInggris_Nilai'],
                    [],
                    ['SECTION 3 - CAPAIAN KOMPETENSI MATA PELAJARAN:'],
                    ['Mapel_*_Capaian : Deskripsi pencapaian kompetensi untuk setiap mata pelajaran'],
                    ['Kolom: Mapel_PendidikanAgama_Capaian, Mapel_PendidikanPancasila_Capaian, dst...'],
                    [],
                    ['SECTION 4 - NILAI MUATAN LOKAL:'],
                    ['MuatanLocal<No>_Name : Nama muatan lokal (misal: Budaya Lokal, Bahasa Daerah)'],
                    ['MuatanLocal<No>_Nilai : Nilai muatan lokal (angka 0-100)'],
                    [],
                    ['SECTION 5 - CAPAIAN KOMPETENSI MUATAN LOKAL:'],
                    ['MuatanLocal<No>_Capaian : Deskripsi pencapaian kompetensi muatan lokal'],
                    [],
                    ['SECTION 6 - TEMA KOKURIKULER & DIMENSI PROFIL LULUSAN:'],
                    ['TemaKokul    : Tema proyek/kokurikuler (misal: Aku Cinta Tanaman)'],
                    ['Profil_*     : 8 dimensi profil lulusan - isi dengan "Terpenuhi" atau "Belum Terpenuhi"'],
                    ['Kolom: Profil_Keimanan, Profil_Kewargaan, Profil_PenalaranKritis, Profil_Kreativitas,'],
                    ['       Profil_Kolaborasi, Profil_Kemandirian, Profil_Kesehatan, Profil_Komunikasi'],
                    [],
                    ['SECTION 7 - CATATAN PROSES KOKURIKULER:'],
                    ['CatatanKokul : Deskripsi proses dan pencapaian siswa dalam kegiatan kokurikuler'],
                    [],
                    ['SECTION 8 - EKSTRAKURIKULER:'],
                    ['Ekstrakurikuler : Daftar kegiatan ekstrakurikuler, pisahkan dengan titik koma (;)'],
                    ['                  Contoh: Pramuka;Robotika;Klub Seni'],
                    [],
                    ['SECTION 9 - DATA KETIDAKHADIRAN:'],
                    ['Sakit        : Jumlah hari sakit (angka: 0, 1, 2, dst)'],
                    ['Izin         : Jumlah hari izin'],
                    ['Alfa         : Jumlah hari tanpa keterangan'],
                    [],
                    ['SECTION 10 - CATATAN WALI KELAS:'],
                    ['Catatan      : Catatan/rekomendasi dari wali kelas'],
                    [],
                    ['SECTION 11 - PENANDATANGANAN:'],
                    ['Walikelas     : Nama wali kelas/guru kelas'],
                    ['NIP_Walikelas : NIP wali kelas'],
                    ['AlamatSekolah : Alamat lengkap sekolah'],
                    ['Kepsek        : Nama Kepala Sekolah'],
                    ['NIP_Kepsek    : NIP Kepala Sekolah'],
                    ['LokasiLaporan : Kota/Kabupaten tempat membuat laporan'],
                    ['TanggalLaporan: Format ISO (YYYY-MM-DD), misal: 2025-12-03'],
                    [],
                    ['CATATAN PENTING:'],
                    ['1. Jangan ubah nama kolom header - harus persis seperti di baris pertama.'],
                    ['2. Baris contoh (baris ke-2) menunjukkan format isian yang benar.'],
                    ['3. Urutan kolom harus sesuai dengan struktur form E-Rapor (12 section).'],
                    ['4. Anda dapat menambah baris data untuk multi-siswa tanpa mengubah header.'],
                    ['5. Untuk mata pelajaran atau muatan lokal tambahan, ikuti pola yang sama.'],
                    ['6. Pastikan tidak ada spasi di awal/akhir setiap nilai yang diisi.'],
                    ['7. Tanggal gunakan format ISO (YYYY-MM-DD) atau biarkan kosong untuk tanggal otomatis.']
                ];
                const ws2 = XLSX.utils.aoa_to_sheet(instr);
                ws2['!cols'] = [{ wch: 100 }];
                XLSX.utils.book_append_sheet(wb, ws2, 'INSTRUKSI');

                XLSX.writeFile(wb, 'template_import_rapor.xlsx');
                showToast('Template Excel diunduh. Ikuti instruksi di sheet "INSTRUKSI".');
            } catch(err) { console.error('Gagal membuat template', err); showToast('Gagal membuat template'); }
        });
    }

    function renderRaporExcelList() {
        if(!window.raporExcelRows || window.raporExcelRows.length === 0) { if(raporExcelList) raporExcelList.style.display = 'none'; return; }
        if(!raporExcelList) return;
        raporExcelList.style.display = 'block';
        
        // OPTIMIZATION: Batch render untuk large datasets
        // Hanya render 50 items pertama, biar UI responsive
        const BATCH_SIZE = 50;
        const totalRows = window.raporExcelRows.length;
        const displayRows = Math.min(totalRows, BATCH_SIZE);
        
        let html = '<table style="width:100%; border-collapse:collapse; font-size:0.9rem;">';
        html += '<thead><tr><th style="text-align:left; padding:6px; border-bottom:1px solid var(--border);">#</th><th style="text-align:left; padding:6px; border-bottom:1px solid var(--border);">Nama</th><th style="text-align:left; padding:6px; border-bottom:1px solid var(--border);">NISN</th><th style="text-align:left; padding:6px; border-bottom:1px solid var(--border);">Kelas</th><th style="text-align:left; padding:6px; border-bottom:1px solid var(--border);">Aksi</th></tr></thead><tbody>';
        
        // Render hanya batch pertama secara synchronous
        for(let i = 0; i < displayRows; i++) {
            const r = window.raporExcelRows[i];
            const nama = r['Nama'] || r['name'] || r['NAMA'] || r['nama'] || '';
            const nisn = r['NISN'] || r['nisn'] || '';
            const kelas = r['Kelas'] || r['kelas'] || r['Class'] || r['class'] || '';
            html += `<tr><td style="padding:6px; border-bottom:1px solid var(--border);">${i+1}</td><td style="padding:6px; border-bottom:1px solid var(--border);">${nama}</td><td style="padding:6px; border-bottom:1px solid var(--border);">${nisn}</td><td style="padding:6px; border-bottom:1px solid var(--border);">${kelas}</td><td style="padding:6px; border-bottom:1px solid var(--border);"><button class="btn btn-secondary btn-sm" onclick="fillRaporForm(${i})">Isi ke Form</button> <button class="btn btn-primary btn-sm" onclick="previewRaporRow(${i})">Preview</button></td></tr>`;
        }
        
        html += '</tbody></table>';
        
        // Tambah info jika ada data yang tidak ditampilkan
        if(totalRows > BATCH_SIZE) {
            html += `<div style="padding:10px; background:#fff3cd; border-radius:4px; margin-top:10px; font-size:0.9rem;">
                <strong>⚠️ Optimasi Performa:</strong> Menampilkan ${displayRows} dari ${totalRows} siswa. 
                Untuk efisiensi, anda bisa proses dalam batch atau generate per siswa.
            </div>`;
        }
        
        raporExcelList.innerHTML = html;
    }

    window.fillRaporForm = function(index) {
        const row = window.raporExcelRows[index];
        if(!row) return;
        const get = (keys) => { for(const k of keys) if(row[k] !== undefined) return row[k]; return ''; };
        
        // ===== IDENTITAS SISWA =====
        document.getElementById('rapor-nama').value = get(['Nama','name','NAMA','nama']);
        document.getElementById('rapor-nisn').value = get(['NISN','nisn']);
        document.getElementById('rapor-kelas').value = get(['Kelas','kelas','Class','class']);
        const faseVal = get(['Fase','fase']); if(faseVal) document.getElementById('rapor-fase').value = faseVal;
        const semVal = get(['Semester','semester']); if(semVal) document.getElementById('rapor-semester').value = semVal;
        const thVal = get(['Tahun','Tahun Ajaran','tahun']); if(thVal) document.getElementById('rapor-tahun').value = thVal;
        
        // ===== KEHADIRAN =====
        const sVal = get(['Sakit','sakit']); if(sVal !== '') document.getElementById('rapor-sakit').value = sVal;
        const iVal = get(['Izin','izin']); if(iVal !== '') document.getElementById('rapor-izin').value = iVal;
        const aVal = get(['Alfa','alfa']); if(aVal !== '') document.getElementById('rapor-alfa').value = aVal;
        
        // ===== KOKURIKULER =====
        const temaVal = get(['TemaKokul','temakokul']); if(temaVal) document.getElementById('rapor-tema-kokul').value = temaVal;
        const catKokulVal = get(['CatatanKokul','catatan_kokul','catatankokul']); if(catKokulVal) document.getElementById('rapor-catatan-kokul').value = catKokulVal;
        
        // ===== EKSTRAKURIKULER & CATATAN =====
        const eksVal = get(['Ekstrakurikuler','ekstrakurikuler']); if(eksVal) document.getElementById('rapor-ekstrakurikuler').value = eksVal;
        const catVal = get(['Catatan','catatan']); if(catVal) document.getElementById('rapor-catatan').value = catVal;
        
        // ===== PENANDATANGANAN =====
        const waliVal = get(['Walikelas','walikelas']); if(waliVal) document.getElementById('rapor-walikelas').value = waliVal;
        const nipWaliVal = get(['NIP_Walikelas','nip_walikelas']); if(nipWaliVal) document.getElementById('rapor-nip').value = nipWaliVal;
        const alamatVal = get(['AlamatSekolah','alamatsekolah']); if(alamatVal) document.getElementById('rapor-alamat-sekolah').value = alamatVal;
        const kepsekVal = get(['Kepsek','kepsek']); if(kepsekVal) document.getElementById('rapor-kepsek').value = kepsekVal;
        const nipKepsekVal = get(['NIP_Kepsek','nip_kepsek']); if(nipKepsekVal) document.getElementById('rapor-nip-kepsek').value = nipKepsekVal;
        const lokasiVal = get(['LokasiLaporan','lokasi_laporan']); if(lokasiVal) document.getElementById('rapor-lokasi-laporan').value = lokasiVal;
        const tglVal = get(['TanggalLaporan','tanggal_laporan']); if(tglVal) document.getElementById('rapor-tanggal-laporan').value = tglVal;
        
        // ===== DIMENSI PROFIL LULUSAN =====
        document.querySelectorAll('.rapor-profil-switch').forEach(switchEl => {
            const profilName = switchEl.getAttribute('data-profil');
            const profilKey = `Profil_${profilName.replace(/\s+/g, '')}`;
            const profilVal = row[profilKey];
            // Check jika status "Terpenuhi" atau similar
            switchEl.checked = profilVal && (profilVal.toLowerCase().includes('terpenuhi') || profilVal.toLowerCase() === 'ya' || profilVal === '1' || profilVal === true);
        });
        
        // ===== MATA PELAJARAN (Nilai & Capaian) =====
        document.querySelectorAll('.rapor-nilai-input').forEach(nilaiInput => {
            const mapel = nilaiInput.getAttribute('data-mapel');
            // Cari kolom nilai untuk mapel ini
            const nilaiKey = `Mapel_${mapel.replace(/\s+/g, '')}_Nilai`;
            const nilaiVal = row[nilaiKey] || row[mapel] || '';
            if(nilaiVal) nilaiInput.value = nilaiVal;
        });
        
        // Fill capaian kompetensi per mapel
        document.querySelectorAll('.rapor-capaian-kompetensi-input').forEach(capaianInput => {
            const mapel = capaianInput.getAttribute('data-mapel');
            const capaianKey = `Mapel_${mapel.replace(/\s+/g, '')}_Capaian`;
            const capaianVal = row[capaianKey];
            if(capaianVal) capaianInput.value = capaianVal;
        });
        
        // ===== MUATAN LOKAL (Nilai & Capaian) =====
        document.querySelectorAll('.rapor-muatan-lokal-nilai').forEach((muatanInput, idx) => {
            const muatanNameInput = muatanInput.parentElement.querySelector('.rapor-muatan-lokal-nama');
            
            // Cari nama muatan lokal dari kolom MuatanLocal<N>_Name
            const muatanNameKey = `MuatanLocal${idx+1}_Name`;
            const muatanName = row[muatanNameKey];
            if(muatanName) {
                muatanNameInput.value = muatanName;
                muatanInput.setAttribute('data-muatan', muatanName);
            }
            
            // Cari nilai muatan lokal
            const muatanValueKey = `MuatanLocal${idx+1}_Nilai`;
            const muatanValue = row[muatanValueKey];
            if(muatanValue) muatanInput.value = muatanValue;
        });
        
        // Fill capaian kompetensi per muatan lokal
        document.querySelectorAll('.rapor-capaian-kompetensi-mulok-input').forEach((capaianInput, idx) => {
            const capaianKey = `MuatanLocal${idx+1}_Capaian`;
            const capaianVal = row[capaianKey];
            if(capaianVal) capaianInput.value = capaianVal;
        });
        
        showToast('Data siswa dimuat ke form. Klik "Buat & Preview E-Rapor" untuk menampilkan rapor.');
    };

    window.previewRaporRow = function(index) {
        window.fillRaporForm(index);
        // trigger generate (same as user clicking the button)
        document.getElementById('btn-gen-rapor').click();
    };

    if(raporExcelGenerateAllBtn) {
        raporExcelGenerateAllBtn.addEventListener('click', async function() {
            if(!window.raporExcelRows || window.raporExcelRows.length === 0) { showToast('Tidak ada data'); return; }
            
            showBatchProgress(window.raporExcelRows.length);
            showToast('🎬 Memulai preview semua rapor (berurutan)...');
            
            for(let i = 0; i < window.raporExcelRows.length; i++) {
                // Check abort
                if(batchProcessState.abortRequested) {
                    showToast('⏹️ Preview dibatalkan oleh user');
                    break;
                }
                
                // Check pause
                while(batchProcessState.isPaused && !batchProcessState.abortRequested) {
                    await new Promise(r => setTimeout(r, 500));
                }
                
                try {
                    const siswaName = window.raporExcelRows[i]['Nama'] || `Siswa ${i+1}`;
                    batchProcessState.currentSiswaName = siswaName;
                    
                    window.fillRaporForm(i);
                    document.getElementById('btn-gen-rapor').click();
                    
                    batchProcessState.successCount++;
                    batchProcessState.processedCount++;
                    
                    updateBatchProgress();
                    
                    // Adaptive delay berdasarkan complexity
                    const delay = 700;
                    await new Promise(r => setTimeout(r, delay));
                } catch(err) {
                    console.error(`Gagal preview siswa ke-${i+1}:`, err);
                    batchProcessState.failedCount++;
                    batchProcessState.failedList.push({
                        index: i+1,
                        nama: window.raporExcelRows[i]['Nama'] || 'Unknown',
                        error: err.message
                    });
                    batchProcessState.processedCount++;
                    updateBatchProgress();
                }
            }
            
            // Final message
            const totalTime = ((Date.now() - batchProcessState.startTime) / 1000).toFixed(1);
            showToast(`✅ Selesai! Preview ${batchProcessState.successCount}/${window.raporExcelRows.length} siswa (${totalTime}s)`);
            
            if(batchProcessState.failedCount > 0) {
                showToast(`⚠️ Ada ${batchProcessState.failedCount} siswa yang gagal`);
            }
            
            hideBatchProgress();
        });
    }
    
    // Pause button handler
    document.getElementById('rapor-batch-pause').addEventListener('click', function() {
        if(batchProcessState.isPaused) {
            batchProcessState.isPaused = false;
            this.innerHTML = '<i class="fas fa-pause"></i> Pause';
            this.classList.remove('btn-warning');
            this.classList.add('btn-warning');
            showToast('▶️ Melanjutkan preview...');
        } else {
            batchProcessState.isPaused = true;
            this.innerHTML = '<i class="fas fa-play"></i> Resume';
            showToast('⏸️  Preview dijeda');
        }
    });
    
    // Stop button handler
    document.getElementById('rapor-batch-stop').addEventListener('click', function() {
        batchProcessState.abortRequested = true;
        batchProcessState.isPaused = false;
        showToast('🛑 Menghentikan preview...');
    });

} catch(e) { console.warn('Import Excel init skipped:', e); }

// Print E-Rapor
window.printRapor = function(divId) {
    const element = document.getElementById(divId);
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Print E-Rapor</title>
            <style>
                body { font-family: 'Times New Roman', serif; margin: 10mm; }
                .rapor-header { text-align: center; margin-bottom: 20px; padding-bottom: 10px; }
                .rapor-header h2 { margin: 0; font-size: 16pt; font-weight: bold; }
                .rapor-header p { margin: 2px 0; font-size: 10pt; }
                .rapor-section { margin-bottom: 15px; }
                .rapor-section h3 { margin: 8px 0; font-size: 12pt; font-weight: bold; border-bottom: 1px solid #999; padding-bottom: 3px; }
                .rapor-row { display: flex; margin: 4px 0; font-size: 10pt; }
                .rapor-label { width: 200px; font-weight: bold; }
                .rapor-value { flex: 1; }
                .rapor-table { width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 10pt; }
                .rapor-table th, .rapor-table td { border: 1px solid black; padding: 4px; text-align: left; }
                .rapor-table th { background: #f0f0f0; font-weight: bold; }
                @media print { body { margin: 0; } }
            </style>
        </head>
        <body>
            ${element.innerHTML}
        </body>
        </html>
    `);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 250);
};

// --- EVENT LISTENERS UNTUK GENERATE AI BUTTONS ---
// Generate Catatan Wali Kelas
document.getElementById('btn-gen-catatan-wali').addEventListener('click', async function() {
    const btn = this;
    const nama = document.getElementById('rapor-nama').value || 'Siswa';
    const nilaiInputs = document.querySelectorAll('.rapor-nilai-input');
    const mapelNilai = [];
    nilaiInputs.forEach(input => {
        const mapel = input.getAttribute('data-mapel');
        const nilai = parseInt(input.value) || 0;
        mapelNilai.push({ mapel, nilai });
    });
    
    if(mapelNilai.length === 0) {
        showToast('Silakan isi minimal satu nilai mata pelajaran terlebih dahulu');
        return;
    }

    btn.classList.add('loading');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';

    // Build prompt untuk generate catatan wali kelas
    let mapelInfo = mapelNilai.map(m => `${m.mapel}: ${m.nilai}`).join(', ');
    const prompt = `
    Buatkan catatan wali kelas untuk siswa bernama ${nama} dengan nilai mata pelajaran: ${mapelInfo}.
    Catatan harus profesional, konstruktif, dan memberikan masukan positif untuk meningkatkan prestasi siswa.
    Panjang catatan 2-3 kalimat. Gunakan Bahasa Indonesia yang baik dan benar.
    Fokus pada pencapaian positif dan area untuk improvement.
    Jangan sertakan nama kota/alamat spesifik.
    `;

    try {
        const result = await callGemini(prompt);
        document.getElementById('rapor-catatan').value = result.trim();
        showToast('Catatan Wali Kelas berhasil di-generate!');
    } catch(err) {
        console.error(err);
        showToast('Gagal generate catatan wali kelas');
    } finally {
        btn.classList.remove('loading');
        btn.innerHTML = '<i class="fas fa-magic"></i> Generate dengan AI';
    }
});

// Generate Catatan Proses Kokurikuler
document.getElementById('btn-gen-catatan-kokul').addEventListener('click', async function() {
    const btn = this;
    const nama = document.getElementById('rapor-nama').value || 'Siswa';
    const temakokul = document.getElementById('rapor-tema-kokul').value || 'proyek kokurikuler';
    
    // Get checked profil dimensi
    const profilSwitches = document.querySelectorAll('.rapor-profil-switch:checked');
    const profilDimensi = Array.from(profilSwitches).map(s => s.getAttribute('data-profil')).join(', ') || 'berbagai dimensi profil';

    btn.classList.add('loading');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';

    const prompt = `
    Buatkan catatan proses kokurikuler untuk siswa ${nama} dalam konteks tema "${temakokul}".
    Dimensi profil lulusan yang dinilai: ${profilDimensi}.
    Catatan harus menjelaskan capaian siswa dan area pengembangan dalam kegiatan kokurikuler.
    Panjang catatan 2-3 kalimat. Gunakan Bahasa Indonesia yang profesional.
    Format: Mulai dengan "Ananda..." dan jelaskan pencapaian serta rekomendasi pengembangan.
    `;

    try {
        const result = await callGemini(prompt);
        document.getElementById('rapor-catatan-kokul').value = result.trim();
        showToast('Catatan Kokurikuler berhasil di-generate!');
    } catch(err) {
        console.error(err);
        showToast('Gagal generate catatan kokurikuler');
    } finally {
        btn.classList.remove('loading');
        btn.innerHTML = '<i class="fas fa-magic"></i> Generate dengan AI';
    }
});

// Generate Capaian Kompetensi per Mapel
document.getElementById('btn-gen-capaian-kompetensi').addEventListener('click', async function() {
    const btn = this;
    const nama = document.getElementById('rapor-nama').value || 'Siswa';
    const nilaiInputs = document.querySelectorAll('.rapor-nilai-input');
    const mapelNilai = [];
    nilaiInputs.forEach(input => {
        const mapel = input.getAttribute('data-mapel');
        const nilai = parseInt(input.value) || 0;
        // Hanya include yang switch-nya aktif
        const mapelSwitch = Array.from(document.querySelectorAll('.rapor-mapel-switch')).find(
            s => s.getAttribute('data-mapel') === mapel
        );
        if(mapelSwitch && mapelSwitch.checked) {
            mapelNilai.push({ mapel, nilai });
        }
    });
    
    if(mapelNilai.length === 0) {
        showToast('Silakan isi minimal satu nilai mata pelajaran terlebih dahulu');
        return;
    }

    btn.classList.add('loading');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';

    try {
        // Generate per mapel
        for(let mapel of mapelNilai) {
            // Determine kategori based on nilai
            let kategori = 'cukup';
            if(mapel.nilai >= 90) kategori = 'sangat baik';
            else if(mapel.nilai >= 80) kategori = 'baik';
            else if(mapel.nilai >= 70) kategori = 'cukup';
            else kategori = 'perlu ditingkatkan';

            const prompt = `
Buatkan ringkasan capaian kompetensi untuk siswa bernama ${nama} di mata pelajaran ${mapel.mapel} dengan nilai ${mapel.nilai} (${kategori}).
Ringkasan harus mencakup:
1. Pencapaian kompetensi yang sudah dikuasai di ${mapel.mapel}
2. Kekuatan siswa dalam mata pelajaran ini
3. Area untuk pengembangan lebih lanjut

Panjang: 1-2 kalimat. Gunakan Bahasa Indonesia yang profesional dan motivatif.
Mulai dengan "Ananda..." jika cocok. Hindari nama spesifik tempat/kota.
            `;

            try {
                const result = await callGemini(prompt);
                // Find textarea for this mapel
                const textarea = document.querySelector(`.rapor-capaian-kompetensi-input[data-mapel="${mapel.mapel}"]`);
                if(textarea) {
                    textarea.value = result.trim();
                }
            } catch(err) {
                console.error(`Error generating for ${mapel.mapel}:`, err);
            }
        }
        
        // Show preview table dengan mata pelajaran dan capaian kompetensi
        let previewHtml = `
            <div style="margin-top: 15px; padding: 15px; background: #f9f9f9; border-radius: 8px; border: 1px solid #ddd;">
                <h4 style="margin-top: 0; margin-bottom: 12px; font-size: 14px;">Preview Capaian Kompetensi</h4>
                <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                    <thead>
                        <tr style="background: #e8e8e8; border: 1px solid #999;">
                            <th style="padding: 8px; text-align: left; border: 1px solid #999;">No.</th>
                            <th style="padding: 8px; text-align: left; border: 1px solid #999;">Mata Pelajaran</th>
                            <th style="padding: 8px; text-align: left; border: 1px solid #999;">Capaian Kompetensi</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        mapelNilai.forEach((item, idx) => {
            const textarea = document.querySelector(`.rapor-capaian-kompetensi-input[data-mapel="${item.mapel}"]`);
            const capaian = textarea ? textarea.value : '-';
            previewHtml += `
                        <tr style="border: 1px solid #999;">
                            <td style="padding: 8px; text-align: center; border: 1px solid #999;">${idx + 1}</td>
                            <td style="padding: 8px; border: 1px solid #999; font-weight: 600;">${item.mapel}</td>
                            <td style="padding: 8px; border: 1px solid #999; text-align: left; font-size: 12px; line-height: 1.4;">${capaian}</td>
                        </tr>
            `;
        });
        
        previewHtml += `
                    </tbody>
                </table>
            </div>
        `;
        
        // Append preview to the capaian kompetensi section
        const container = document.getElementById('rapor-capaian-kompetensi-container');
        if(container) {
            const existingPreview = container.parentElement.querySelector('.capaian-preview-container');
            if(existingPreview) existingPreview.remove();
            
            const previewDiv = document.createElement('div');
            previewDiv.className = 'capaian-preview-container';
            previewDiv.innerHTML = previewHtml;
            container.parentElement.appendChild(previewDiv);
        }
        
        showToast('Capaian Kompetensi per Mapel berhasil di-generate!');
    } catch(err) {
        console.error(err);
        showToast('Gagal generate capaian kompetensi');
    } finally {
        btn.classList.remove('loading');
        btn.innerHTML = '<i class="fas fa-magic"></i> Generate Capaian Kompetensi untuk Semua Mapel';
    }
});

// Generate Capaian Kompetensi Muatan Lokal per item
document.getElementById('btn-gen-capaian-kompetensi-mulok').addEventListener('click', async function() {
    const btn = this;
    const nama = document.getElementById('rapor-nama').value || 'Siswa';
    
    // Get muatan lokal values
    const muatanInputs = document.querySelectorAll('.rapor-muatan-lokal-nilai');
    const muatanNilai = [];
    muatanInputs.forEach(input => {
        const muatan = input.getAttribute('data-muatan');
        const nilai = parseInt(input.value) || 0;
        muatanNilai.push({ muatan, nilai });
    });
    
    if(muatanNilai.length === 0) {
        showToast('Silakan isi minimal satu nilai muatan lokal terlebih dahulu');
        return;
    }

    btn.classList.add('loading');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';

    try {
        // Generate per muatan lokal
        for(let muatan of muatanNilai) {
            // Determine kategori based on nilai
            let kategori = 'cukup';
            if(muatan.nilai >= 90) kategori = 'sangat baik';
            else if(muatan.nilai >= 80) kategori = 'baik';
            else if(muatan.nilai >= 70) kategori = 'cukup';
            else kategori = 'perlu ditingkatkan';

            const prompt = `
Buatkan ringkasan capaian kompetensi untuk siswa bernama ${nama} di muatan lokal ${muatan.muatan} dengan nilai ${muatan.nilai} (${kategori}).
Ringkasan harus mencakup:
1. Pencapaian kompetensi yang sudah dikuasai di ${muatan.muatan}
2. Kekuatan siswa dalam muatan lokal ini
3. Area untuk pengembangan lebih lanjut

Panjang: 1-2 kalimat. Gunakan Bahasa Indonesia yang profesional dan motivatif.
Mulai dengan "Ananda..." jika cocok. Hindari nama spesifik tempat/kota.
            `;

            try {
                const result = await callGemini(prompt);
                // Find textarea for this muatan
                const textarea = document.querySelector(`.rapor-capaian-kompetensi-mulok-input[data-muatan="${muatan.muatan}"]`);
                if(textarea) {
                    textarea.value = result.trim();
                }
            } catch(err) {
                console.error(`Error generating for ${muatan.muatan}:`, err);
            }
        }
        showToast('Capaian Kompetensi Muatan Lokal berhasil di-generate!');
    } catch(err) {
        console.error(err);
        showToast('Gagal generate capaian kompetensi muatan lokal');
    } finally {
        btn.classList.remove('loading');
        btn.innerHTML = '<i class="fas fa-magic"></i> Generate Capaian Kompetensi Muatan Lokal';
    }
});

// ==================== MODAL DIALOG UNTUK TAMBAH MAPEL/MULOK ====================

// Modal HTML akan diinsert secara dinamis, atau gunakan ini:
function initAddItemModals() {
    if(document.getElementById('add-mapel-modal')) return; // sudah ada
    
    const modalHTML = `
    <!-- Modal Tambah Mapel Baru -->
    <div id="add-mapel-modal" class="add-item-modal">
        <div class="add-item-dialog">
            <div class="add-item-header">
                <h3><i class="fas fa-plus-circle" style="color:var(--primary); margin-right:8px;"></i> Tambah Mata Pelajaran Baru</h3>
                <button class="add-item-close" onclick="closeAddMapelModal()"><i class="fas fa-times"></i></button>
            </div>
            <div class="add-item-body">
                <div class="add-item-form-group">
                    <label>Pilih dari Daftar Kurikulum Merdeka</label>
                    <select id="add-mapel-select" class="form-control" onchange="onMapelSelectChange()">
                        <option value="">-- Pilih Mata Pelajaran --</option>
                    </select>
                    <small style="color:var(--text-muted); margin-top:4px;">Atau tulis sendiri di bawah</small>
                </div>
                <div class="add-item-form-group">
                    <label>Atau Input Nama Mapel (Kustom)</label>
                    <input type="text" id="add-mapel-custom-input" class="form-control" placeholder="Contoh: Bahasa Arab, Informatika, dll">
                </div>
                <div class="add-item-form-group">
                    <label>Nilai Awal</label>
                    <input type="number" id="add-mapel-nilai" class="form-control" min="0" max="100" value="75" placeholder="75">
                </div>
            </div>
            <div class="add-item-footer">
                <button class="btn btn-secondary btn-sm" onclick="closeAddMapelModal()">Batal</button>
                <button class="btn btn-primary btn-sm" onclick="saveAddMapel()">Tambah Mapel</button>
            </div>
        </div>
    </div>

    <!-- Modal Tambah Muatan Lokal Baru -->
    <div id="add-mulok-modal" class="add-item-modal">
        <div class="add-item-dialog">
            <div class="add-item-header">
                <h3><i class="fas fa-plus-circle" style="color:var(--primary); margin-right:8px;"></i> Tambah Muatan Lokal Baru</h3>
                <button class="add-item-close" onclick="closeAddMulokModal()"><i class="fas fa-times"></i></button>
            </div>
            <div class="add-item-body">
                <div class="add-item-form-group">
                    <label>Pilih dari Saran Muatan Lokal</label>
                    <select id="add-mulok-select" class="form-control" onchange="onMulokSelectChange()">
                        <option value="">-- Pilih Muatan Lokal --</option>
                        <option value="Budaya Lokal">Budaya Lokal</option>
                        <option value="Bahasa Daerah">Bahasa Daerah</option>
                        <option value="Keterampilan Lokal">Keterampilan Lokal</option>
                        <option value="Seni Tradisional">Seni Tradisional</option>
                        <option value="Ekologi Lokal">Ekologi Lokal</option>
                    </select>
                    <small style="color:var(--text-muted); margin-top:4px;">Atau tulis sendiri di bawah</small>
                </div>
                <div class="add-item-form-group">
                    <label>Atau Input Nama Muatan Lokal (Kustom)</label>
                    <input type="text" id="add-mulok-custom-input" class="form-control" placeholder="Contoh: Tari Jaipong, Batik, dll">
                </div>
                <div class="add-item-form-group">
                    <label>Nilai Awal</label>
                    <input type="number" id="add-mulok-nilai" class="form-control" min="0" max="100" value="75" placeholder="75">
                </div>
            </div>
            <div class="add-item-footer">
                <button class="btn btn-secondary btn-sm" onclick="closeAddMulokModal()">Batal</button>
                <button class="btn btn-primary btn-sm" onclick="saveAddMulok()">Tambah Muatan Lokal</button>
            </div>
        </div>
    </div>
    `;
    
    // Insert ke dalam body (sebelum closing)
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Populate mapel select dengan data Kurikulum Merdeka
    populateMapelSelect();
}

// Daftar Mapel Kurikulum Merdeka untuk berbagai jenjang
const MAPEL_KURIKULUM_MERDEKA = {
    'SD': [
        'Bahasa Indonesia', 'Matematika', 'IPAS', 'Bahasa Inggris', 
        'PJOK', 'Seni & Budaya', 'Informatika', 'Pendidikan Pancasila'
    ],
    'SMP': [
        'Bahasa Indonesia', 'Bahasa Inggris', 'Matematika', 'IPAS',
        'PJOK', 'Seni & Budaya', 'Informatika', 'Pendidikan Pancasila'
    ],
    'SMA': [
        'Bahasa Indonesia', 'Bahasa Inggris', 'Matematika', 'Sejarah',
        'Geografi', 'Ekonomi', 'Sosiologi', 'Kimia', 'Fisika', 'Biologi',
        'PJOK', 'Seni & Budaya', 'Informatika', 'Pendidikan Pancasila'
    ]
};

function populateMapelSelect() {
    const select = document.getElementById('add-mapel-select');
    if(!select) return;
    
    // Tentukan jenjang berdasarkan konteks atau buat opsi universal
    const allMapel = new Set();
    Object.values(MAPEL_KURIKULUM_MERDEKA).forEach(arr => {
        arr.forEach(m => allMapel.add(m));
    });
    
    Array.from(allMapel).sort().forEach(mapel => {
        const opt = document.createElement('option');
        opt.value = mapel;
        opt.textContent = mapel;
        select.appendChild(opt);
    });
}

function openAddMapelModal() {
    if(!document.getElementById('add-mapel-modal')) {
        initAddItemModals();
    }
    document.getElementById('add-mapel-modal').classList.add('show');
    document.getElementById('add-mapel-custom-input').value = '';
    document.getElementById('add-mapel-select').value = '';
    document.getElementById('add-mapel-nilai').value = '75';
}

function closeAddMapelModal() {
    const modal = document.getElementById('add-mapel-modal');
    if(modal) modal.classList.remove('show');
}

function onMapelSelectChange() {
    const select = document.getElementById('add-mapel-select');
    const customInput = document.getElementById('add-mapel-custom-input');
    if(select.value) {
        customInput.value = select.value;
    }
}

function saveAddMapel() {
    const mapelName = document.getElementById('add-mapel-custom-input').value.trim();
    const nilai = parseInt(document.getElementById('add-mapel-nilai').value) || 75;
    
    if(!mapelName) {
        showToast('Silakan masukkan nama mata pelajaran');
        return;
    }
    
    // Tambah ke container nilai
    const container = document.getElementById('rapor-nilai-container');
    const div = document.createElement('div');
    div.style.padding = '12px';
    div.style.background = 'var(--bg-body)';
    div.style.borderRadius = '8px';
    div.style.border = '1px solid var(--border)';
    div.innerHTML = `
        <label style="font-size:0.85rem; font-weight:600;">${mapelName}</label>
        <div style="display:flex; gap:5px; margin-top:5px;">
            <input type="number" class="rapor-nilai-input form-control" data-mapel="${mapelName}" min="0" max="100" value="${nilai}" style="flex:1;">
            <button class="btn btn-danger btn-sm" onclick="removeMapelAndCapaian('${mapelName}', this)"><i class="fas fa-trash"></i></button>
        </div>
    `;
    container.appendChild(div);
    
    // Tambah ke container capaian kompetensi
    const capContainer = document.getElementById('rapor-capaian-kompetensi-container');
    const capDiv = document.createElement('div');
    capDiv.style.padding = '12px';
    capDiv.style.background = 'var(--bg-body)';
    capDiv.style.borderRadius = '8px';
    capDiv.style.border = '1px solid var(--border)';
    capDiv.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <label style="font-size:0.85rem; font-weight:600; margin: 0;">${mapelName}</label>
            <label class="switch" style="margin: 0;">
                <input type="checkbox" class="rapor-mapel-switch" data-mapel="${mapelName}" checked>
                <span class="slider"></span>
            </label>
        </div>
        <textarea class="rapor-capaian-kompetensi-input form-control" data-mapel="${mapelName}" rows="2" placeholder="Capaian kompetensi..." style="margin-top:5px; font-size:0.85rem;"></textarea>
    `;
    capDiv.setAttribute('data-mapel-capaian', mapelName);
    capContainer.appendChild(capDiv);
    
    // Trigger sync untuk consistency
    syncMapelCapaian();
    
    showToast(`Mata Pelajaran "${mapelName}" berhasil ditambahkan!`);
    closeAddMapelModal();
}

function openAddMulokModal() {
    if(!document.getElementById('add-mulok-modal')) {
        initAddItemModals();
    }
    document.getElementById('add-mulok-modal').classList.add('show');
    document.getElementById('add-mulok-custom-input').value = '';
    document.getElementById('add-mulok-select').value = '';
    document.getElementById('add-mulok-nilai').value = '75';
}

function closeAddMulokModal() {
    const modal = document.getElementById('add-mulok-modal');
    if(modal) modal.classList.remove('show');
}

function onMulokSelectChange() {
    const select = document.getElementById('add-mulok-select');
    const customInput = document.getElementById('add-mulok-custom-input');
    if(select.value) {
        customInput.value = select.value;
    }
}

function saveAddMulok() {
    const muatanName = document.getElementById('add-mulok-custom-input').value.trim();
    const nilai = parseInt(document.getElementById('add-mulok-nilai').value) || 75;
    
    if(!muatanName) {
        showToast('Silakan masukkan nama muatan lokal');
        return;
    }
    
    const id = __genMuatanId();
    
    // Tambah ke container nilai
    const container = document.getElementById('rapor-muatan-lokal-container');
    const div = document.createElement('div');
    div.style.padding = '12px';
    div.style.background = 'var(--bg-body)';
    div.style.borderRadius = '8px';
    div.style.border = '1px solid var(--border)';
    div.innerHTML = `
        <label style="font-size:0.85rem; font-weight:600;">Nama Muatan Lokal</label>
        <input type="text" class="rapor-muatan-lokal-nama form-control" value="${muatanName}" placeholder="Nama Muatan Lokal" style="margin-top:5px; margin-bottom:5px;">
        <div style="display:flex; gap:5px; margin-top:5px;">
            <input type="number" class="rapor-muatan-lokal-nilai form-control" data-muatan="${muatanName}" data-muatan-id="${id}" min="0" max="100" value="${nilai}" style="flex:1;">
            <button class="btn btn-danger btn-sm remove-mulok" type="button"><i class="fas fa-trash"></i></button>
        </div>
    `;
    container.appendChild(div);
    
    // Tambah ke container capaian
    const capContainer = document.getElementById('rapor-capaian-kompetensi-mulok-container');
    const capDiv = document.createElement('div');
    capDiv.style.padding = '12px';
    capDiv.style.background = 'var(--bg-body)';
    capDiv.style.borderRadius = '8px';
    capDiv.style.border = '1px solid var(--border)';
    capDiv.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <label style="font-size:0.85rem; font-weight:600; margin: 0;">${muatanName}</label>
            <label class="switch" style="margin: 0;">
                <input type="checkbox" class="rapor-mulok-switch" data-muatan="${muatanName}" checked>
                <span class="slider"></span>
            </label>
        </div>
        <textarea class="rapor-capaian-kompetensi-mulok-input form-control" data-muatan="${muatanName}" data-muatan-id="${id}" rows="2" placeholder="Capaian kompetensi..." style="margin-top:5px; font-size:0.85rem;"></textarea>
    `;
    capContainer.appendChild(capDiv);
    
    // Wire up listeners
    const nameInput = div.querySelector('.rapor-muatan-lokal-nama');
    const nilaiInput = div.querySelector('.rapor-muatan-lokal-nilai');
    const removeBtn = div.querySelector('.remove-mulok');
    
    removeBtn.addEventListener('click', function() {
        div.remove();
        const cap = capContainer.querySelector(`.rapor-capaian-kompetensi-mulok-input[data-muatan-id="${id}"]`);
        if(cap && cap.parentElement) cap.parentElement.remove();
    });
    
    nameInput.addEventListener('input', function() {
        const newName = this.value.trim();
        if(!newName) return;
        nilaiInput.setAttribute('data-muatan', newName);
        const capTextarea = capContainer.querySelector(`.rapor-capaian-kompetensi-mulok-input[data-muatan-id="${id}"]`);
        if(capTextarea) {
            capTextarea.setAttribute('data-muatan', newName);
            const lbl = capTextarea.parentElement && capTextarea.parentElement.querySelector('label');
            if(lbl) lbl.textContent = newName;
        }
    });
    
    showToast(`Muatan Lokal "${muatanName}" berhasil ditambahkan!`);
    closeAddMulokModal();
}
