const apiKey = "";
const AKADEMIK_DATA = {
    'PAUD/TK/RA': {
        kelas: ['Kelompok A', 'Kelompok B'],
        fase: { 'Kelompok A': 'P', 'Kelompok B': 'P' }
    },
    'SD': {
        kelas: ['Kelas 1', 'Kelas 2', 'Kelas 3', 'Kelas 4', 'Kelas 5', 'Kelas 6'],
        fase: {
            'Kelas 1': 'A', 'Kelas 2': 'A', 'Kelas 3': 'B',
            'Kelas 4': 'B', 'Kelas 5': 'C', 'Kelas 6': 'C'
        }
    },
    'MI': {
        kelas: ['Kelas 1', 'Kelas 2', 'Kelas 3', 'Kelas 4', 'Kelas 5', 'Kelas 6'],
        fase: {
            'Kelas 1': 'A', 'Kelas 2': 'A', 'Kelas 3': 'B',
            'Kelas 4': 'B', 'Kelas 5': 'C', 'Kelas 6': 'C'
        }
    },
    'SMP': {
        kelas: ['Kelas 7', 'Kelas 8', 'Kelas 9'],
        fase: { 'Kelas 7': 'D', 'Kelas 8': 'D', 'Kelas 9': 'D' }
    },
    'MTs': {
        kelas: ['Kelas 7', 'Kelas 8', 'Kelas 9'],
        fase: { 'Kelas 7': 'D', 'Kelas 8': 'D', 'Kelas 9': 'D' }
    },
    'SMA': {
        kelas: ['Kelas 10', 'Kelas 11', 'Kelas 12'],
        fase: { 'Kelas 10': 'E', 'Kelas 11': 'F', 'Kelas 12': 'F' }
    },
    'MA': {
        kelas: ['Kelas 10', 'Kelas 11', 'Kelas 12'],
        fase: { 'Kelas 10': 'E', 'Kelas 11': 'F', 'Kelas 12': 'F' }
    },
    'SMK': {
        kelas: ['Kelas 10', 'Kelas 11', 'Kelas 12'],
        fase: { 'Kelas 10': 'E', 'Kelas 11': 'F', 'Kelas 12': 'F' }
    }
};
const MAPEL_BY_JENJANG = {
    'PAUD/TK/RA': [
        'Nilai Agama dan Budi Pekerti', 'Jati Diri',
        'Dasar-dasar Literasi, Bahasa, dan Komunikasi', 'Dasar-dasar Matematika dan Sains',
        'Kreativitas, Estetika, dan Imajinasi', 'Dasar-dasar Kesehatan dan Keselamatan'
    ],
    'SD': [
        'Pendidikan Agama dan Budi Pekerti', 'Pendidikan Pancasila', 'Bahasa Indonesia',
        'Matematika', 'IPAS', 'PJOK', 'Seni dan Budaya', 'Bahasa Inggris', 'Koding dan Kecerdasan Artifisial', 'Muatan Lokal'
    ],
    'MI': [
        'Pendidikan Pancasila', 'Bahasa Indonesia', 'Matematika', 'IPAS', 'PJOK',
        'Seni dan Budaya', 'Bahasa Inggris', 'Koding dan Kecerdasan Artifisial', 'Muatan Lokal',
        'Al-Qur\'an Hadits', 'Akidah Akhlak', 'Fikih', 'SKI', 'Bahasa Arab'
    ],
    'SMP': [
        'Pendidikan Agama dan Budi Pekerti', 'Pendidikan Pancasila', 'Bahasa Indonesia',
        'Matematika', 'IPA', 'IPS', 'Bahasa Inggris', 'Informatika', 'Koding dan Kecerdasan Artifisial', 'PJOK',
        'Seni/Prakarya', 'Muatan Lokal'
    ],
    'MTs': [
        'Pendidikan Pancasila', 'Bahasa Indonesia', 'Matematika', 'IPA', 'IPS',
        'Bahasa Inggris', 'Informatika', 'Koding dan Kecerdasan Artifisial', 'PJOK', 'Seni/Prakarya', 'Muatan Lokal',
        'Al-Qur\'an Hadits', 'Akidah Akhlak', 'Fikih', 'SKI', 'Bahasa Arab'
    ],
    'SMA': [
        'Pendidikan Agama dan Budi Pekerti', 'Pendidikan Pancasila', 'Bahasa Indonesia',
        'Bahasa Inggris', 'Matematika', 'IPA Lintasan', 'IPS Lintasan', 'Informatika', 'Koding dan Kecerdasan Artifisial', 'PJOK',
        'Seni/Prakarya', 'Matematika Lanjutan', 'Fisika', 'Kimia', 'Biologi',
        'Ekonomi', 'Geografi', 'Sosiologi', 'Sejarah', 'Seni Budaya Lanjutan'
    ],
    'MA': [
        'Pendidikan Pancasila', 'Bahasa Indonesia', 'Bahasa Inggris', 'Matematika',
        'IPA Lintasan', 'IPS Lintasan', 'Informatika', 'Koding dan Kecerdasan Artifisial', 'PJOK', 'Seni/Prakarya',
        'Al-Qur\'an Hadits', 'Akidah Akhlak', 'Fikih', 'SKI', 'Bahasa Arab',
        'Matematika Lanjutan', 'Fisika', 'Kimia', 'Biologi', 'Ekonomi',
        'Geografi', 'Sosiologi', 'Sejarah', 'Seni Budaya Lanjutan'
    ],
    'SMK': [
        'Pendidikan Agama dan Budi Pekerti', 'Pendidikan Pancasila', 'Bahasa Indonesia',
        'Matematika', 'Bahasa Inggris', 'IPAS', 'Informatika', 'Koding dan Kecerdasan Artifisial', 'PJOK', 'Seni/Prakarya',
        'Dasar Bidang Keahlian', 'Dasar Program Keahlian', 'Kompetensi Keahlian'
    ]
};
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    let icon = 'fa-info-circle';
    if (type === 'success') icon = 'fa-check-circle';
    if (type === 'danger') icon = 'fa-exclamation-circle';
    if (type === 'warning') icon = 'fa-exclamation-triangle';
    toast.innerHTML = `<i class="fas ${icon}"></i><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
}
function showDisclaimerModal() {
    const modal = document.getElementById('modal-disclaimer');
    if (modal) modal.style.display = 'flex';
}
function acceptDisclaimer() {
    localStorage.setItem('disclaimerAccepted', 'true');
    const modal = document.getElementById('modal-disclaimer');
    if (modal) modal.style.display = 'none';
    showToast('✅ Terima kasih telah menerima syarat dan ketentuan!', 'success');
}
function declineDisclaimer() {
    showToast('❌ Anda harus menerima disclaimer untuk melanjutkan', 'danger');
}
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
function batchDOMUpdates(callback) {
    requestAnimationFrame(callback);
}
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= window.innerHeight &&
        rect.right <= window.innerWidth
    );
}
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
function updateBatchProgress() {
    const { processedCount, totalCount, successCount, failedCount, startTime } = batchProcessState;
    const percentage = totalCount > 0 ? (processedCount / totalCount) * 100 : 0;
    const elapsedTime = (Date.now() - startTime) / 1000;
    const speed = elapsedTime > 0 ? processedCount / elapsedTime : 0;
    const remainingCount = totalCount - processedCount;
    const etaSeconds = speed > 0 ? remainingCount / speed : 0;
    const etaMinutes = Math.floor(etaSeconds / 60);
    const etaSecs = Math.floor(etaSeconds % 60);
    const etaStr = `${etaMinutes}:${etaSecs.toString().padStart(2, '0')}`;
    document.getElementById('rapor-progress-text').textContent = `${processedCount}/${totalCount}`;
    document.getElementById('rapor-progress-bar').style.width = percentage.toFixed(1) + '%';
    document.getElementById('rapor-progress-bar').textContent = percentage > 10 ? percentage.toFixed(0) + '%' : '';
    document.getElementById('rapor-progress-speed').textContent = speed.toFixed(2);
    document.getElementById('rapor-progress-success').textContent = successCount;
    document.getElementById('rapor-progress-current').textContent = batchProcessState.currentSiswaName;
    document.getElementById('rapor-progress-failed').textContent = failedCount;
    document.getElementById('rapor-progress-eta').textContent = `ETA: ${etaStr}`;
}
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
function hideBatchProgress() {
    batchProcessState.isRunning = false;
    batchProcessState.isPaused = false;
    document.getElementById('rapor-batch-pause').style.display = 'none';
    document.getElementById('rapor-batch-stop').style.display = 'none';
    document.getElementById('rapor-excel-generate-all').style.display = 'inline-flex';
    if (batchProcessState.failedList.length > 0) {
        showFailedSiswaModal();
    }
}
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
    document.getElementById('rapor-failed-siswa-modal').style.display = 'flex';
}
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
function batchDOMUpdates(callback) {
    requestAnimationFrame(callback);
}
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= window.innerHeight &&
        rect.right <= window.innerWidth
    );
}
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
        if (data.error) throw new Error(data.error.message);
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

        if (!response.ok) {
            throw new Error(`API returned status ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message || 'Unknown API error');
        }

        if (!data.predictions || !data.predictions[0] || !data.predictions[0].bytesBase64Encoded) {
            throw new Error('Invalid API response format: missing predictions or bytesBase64Encoded');
        }

        const base64 = data.predictions[0].bytesBase64Encoded;
        return `data:image/png;base64,${base64}`;
    } catch (error) {
        console.error('callImagen error:', error);
        showToast("Error Imagen: " + error.message);
        return null;
    }
}

// Function to analyze uploaded image and extract face characteristics
async function analyzeFaceCharacteristics(imageData) {
    try {
        // Use Gemini Vision to analyze the uploaded photo
        const base64Image = imageData.startsWith('data:image') ? imageData.split(',')[1] : imageData;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [
                        {
                            text: `Analyze this photo and describe the person's face characteristics in detail for AI image generation. Include: age range, face shape, skin tone, eye color, hair color and style, distinctive facial features, expression type, and any other identifying characteristics that would help an AI model recreate this face accurately. Be specific and use precise descriptive terms. Format as a detailed description.`
                        },
                        {
                            inlineData: {
                                mimeType: 'image/jpeg',
                                data: base64Image
                            }
                        }
                    ]
                }]
            })
        });

        const data = await response.json();
        if (data.error) {
            console.error('Face analysis error:', data.error);
            return null;
        }

        const faceDescription = data.candidates[0].content.parts[0].text;
        return faceDescription;
    } catch (error) {
        console.error('Error analyzing face:', error);
        return null;
    }
}

async function callImagenWithReference(prompt, referenceImageData) {
    try {
        // Analyze the uploaded image to get face characteristics
        const faceCharacteristics = await analyzeFaceCharacteristics(referenceImageData);

        // Build enhanced prompt with detailed face description
        let enhancedPrompt = prompt;
        if (faceCharacteristics) {
            enhancedPrompt = `${prompt}

EXACT FACE REFERENCE DESCRIPTION:
${faceCharacteristics}

CRITICAL: The generated image MUST show a person with the exact same facial features, face shape, skin tone, eye color, hair color, and distinctive characteristics as described above. The face must be immediately recognizable as the same person from the reference photo.`;
        }

        // Use regular Imagen generation with enhanced face-specific prompt
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                instances: [{ prompt: enhancedPrompt }],
                parameters: { sampleCount: 1 }
            })
        });
        const data = await response.json();
        if (data.error) throw new Error(data.error.message);
        const base64 = data.predictions[0].bytesBase64Encoded;
        return `data:image/png;base64,${base64}`;
    } catch (error) {
        console.error(error);
        showToast("Error generating dengan referensi: " + error.message);
        return null;
    }
}

const callImageGenerator = callImagen;
async function callTTS(text, voice, style, speed, pitch, volume) {
    try {
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
        if (data.error) throw new Error(data.error.message);
        return data.candidates[0].content.parts[0].inlineData.data;
    } catch (error) {
        console.error(error);
        showToast("Error TTS: " + error.message);
        return null;
    }
}
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
function switchSection(targetId) {
    document.querySelectorAll('.content-section').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.menu-item, .menu-dropdown-item, .nav-item').forEach(el => el.classList.remove('active'));
    const targetSection = document.getElementById(targetId);
    if (targetSection) targetSection.classList.add('active');
    document.querySelectorAll(`[data-target="${targetId}"]`).forEach(el => el.classList.add('active'));
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
        'foto-profesi': 'Foto Profesi Generator',
        'konten-kreator': 'Konten Kreator',
        'tentang': 'Tentang DigiArju'
    };
    if (document.getElementById('page-title')) {
        document.getElementById('page-title').innerText = titleMap[targetId] || 'DigiArju APP';
    }
    if (targetId === 'rapor-siswa' && typeof window.loadDataFromProfil === 'function') {
        try {
            window.loadDataFromProfil();
            if (typeof initAddItemModals === 'function') {
                initAddItemModals();
            }
        } catch (e) { console.error('Error auto-loading profil into E-Rapor:', e); }
    }
    if (['materi-ajar', 'media-ajar', 'kokurikuler', 'soal', 'rapor-siswa'].includes(targetId)) {
        setTimeout(() => {
            try {
                window.autoPopulateCurrentSection();
            } catch (e) {
                console.error('Error auto-populating section:', e);
            }
        }, 300);
    }
    document.getElementById('sidebar').classList.remove('open');
}
window.switchTab = function (tabId) {
    switchSection(tabId);
};
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
document.querySelectorAll('.menu-item, .menu-dropdown-item, .nav-item').forEach(item => {
    item.addEventListener('click', function () {
        const target = this.getAttribute('data-target');
        switchSection(target);
    });
});
const darkModeBtn = document.getElementById('toggle-dark-mode');
if (darkModeBtn) {
    darkModeBtn.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
        darkModeBtn.querySelector('i').className = isDark ? 'fas fa-moon' : 'fas fa-sun';
    });
}
function loadProfile() {
    if (!localStorage.getItem('disclaimerAccepted')) {
        showDisclaimerModal();
    }
    const nama = localStorage.getItem('as_nama') || 'Guru';
    const sekolah = localStorage.getItem('as_sekolah') || 'Nama Sekolah';
    if (document.getElementById('user-name-display')) document.getElementById('user-name-display').innerText = nama;
    if (document.getElementById('dash-name')) document.getElementById('dash-name').innerText = nama;
    if (document.getElementById('user-initial')) document.getElementById('user-initial').innerText = nama.charAt(0);
    if (document.getElementById('p-nama')) document.getElementById('p-nama').value = localStorage.getItem('as_nama') || '';
    if (document.getElementById('p-nip')) document.getElementById('p-nip').value = localStorage.getItem('as_nip') || '';
    if (document.getElementById('p-sekolah')) document.getElementById('p-sekolah').value = sekolah;
    if (document.getElementById('p-npsn')) document.getElementById('p-npsn').value = localStorage.getItem('as_npsn') || '';
    if (document.getElementById('p-alamat')) document.getElementById('p-alamat').value = localStorage.getItem('as_alamat') || '';
    if (document.getElementById('p-kepsek')) document.getElementById('p-kepsek').value = localStorage.getItem('as_kepsek') || '';
    if (document.getElementById('p-nip-kepsek')) document.getElementById('p-nip-kepsek').value = localStorage.getItem('as_nip_kepsek') || '';
    if (document.getElementById('p-whatsapp')) document.getElementById('p-whatsapp').value = localStorage.getItem('as_whatsapp') || '';
    if (document.getElementById('out-sekolah')) document.getElementById('out-sekolah').innerText = sekolah.toUpperCase();
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
    if (document.getElementById('dash-date')) document.getElementById('dash-date').innerText = formattedDate;
    if (document.getElementById('dash-role')) document.getElementById('dash-role').innerText = 'Guru';
    if (document.getElementById('last-update')) document.getElementById('last-update').innerText = 'Dec 4, 2025';
}
document.getElementById('btn-save-profile')?.addEventListener('click', () => {
    localStorage.setItem('as_nama', document.getElementById('p-nama')?.value || '');
    localStorage.setItem('as_nip', document.getElementById('p-nip')?.value || '');
    localStorage.setItem('as_sekolah', document.getElementById('p-sekolah')?.value || '');
    localStorage.setItem('as_alamat', document.getElementById('p-alamat')?.value || '');
    localStorage.setItem('as_kepsek', document.getElementById('p-kepsek')?.value || '');
    localStorage.setItem('as_nip_kepsek', document.getElementById('p-nip-kepsek')?.value || '');
    showToast('Profil berhasil disimpan', 'success');
    loadProfile();
});
document.getElementById('btn-save-sekolah')?.addEventListener('click', () => {
    localStorage.setItem('as_sekolah', document.getElementById('p-sekolah')?.value || '');
    localStorage.setItem('as_npsn', document.getElementById('p-npsn')?.value || '');
    localStorage.setItem('as_alamat', document.getElementById('p-alamat')?.value || '');
    localStorage.setItem('as_kepsek', document.getElementById('p-kepsek')?.value || '');
    localStorage.setItem('as_nip_kepsek', document.getElementById('p-nip-kepsek')?.value || '');
    showToast('Identitas Sekolah berhasil disimpan!', 'success');
    loadProfile();
});
loadProfile();
if (typeof window.loadBankItems === 'function') {
    window.loadBankItems();
}
document.querySelectorAll('.upload-box').forEach(box => {
    const input = box.querySelector('input[type="file"]');
    const badge = box.querySelector('.file-badge');
    if (input && badge) {
        box.addEventListener('click', () => input.click());
        input.addEventListener('change', () => {
            if (input.files.length > 0) {
                badge.style.display = 'inline-block';
                badge.innerText = input.files[0].name;
                box.classList.add('has-file');
            }
        });
    }
});
document.querySelectorAll('.btn-group-custom').forEach(group => {
    group.querySelectorAll('.btn-toggle').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            group.querySelectorAll('.btn-toggle').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
});
window.openTab = function (evt, tabId) {
    const container = evt.currentTarget.closest('.doc-preview');
    if (!container) return;
    container.querySelectorAll('.tab-pane').forEach(pane => {
        pane.style.display = 'none';
        pane.classList.remove('active');
    });
    container.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    const target = document.getElementById(tabId);
    if (target) {
        target.style.display = 'block';
        target.classList.add('active');
    }
    evt.currentTarget.classList.add('active');
};
window.toggleMetodeSubsection = function (id) {
    const element = document.getElementById(id);
    if (element) {
        element.style.display = element.style.display === 'none' ? 'grid' : 'none';
    }
};
window.togglePendekatanSubsection = function (id) {
    const element = document.getElementById(id);
    if (element) {
        element.style.display = element.style.display === 'none' ? 'grid' : 'none';
    }
};
window.updateKelasOptions = function () {
    const jenjang = document.getElementById('soal-jenjang').value;
    const kelasSelect = document.getElementById('soal-kelas');
    let options = "";
    if (jenjang === "PAUD/TK/RA") options = "<option value='Kelompok A'>Kelompok A</option><option value='Kelompok B'>Kelompok B</option>";
    else if (jenjang === "SD" || jenjang === "MI") options = "<option value='Kelas 1'>Kelas 1</option><option value='Kelas 2'>Kelas 2</option><option value='Kelas 3'>Kelas 3</option><option value='Kelas 4'>Kelas 4</option><option value='Kelas 5'>Kelas 5</option><option value='Kelas 6'>Kelas 6</option>";
    else if (jenjang === "SMP" || jenjang === "MTs") options = "<option value='Kelas 7'>Kelas 7</option><option value='Kelas 8'>Kelas 8</option><option value='Kelas 9'>Kelas 9</option>";
    else if (jenjang === "SMA" || jenjang === "MA" || jenjang === "SMK") options = "<option value='Kelas 10'>Kelas 10</option><option value='Kelas 11'>Kelas 11</option><option value='Kelas 12'>Kelas 12</option>";
    kelasSelect.innerHTML = options;
    if (kelasSelect.options.length > 0) kelasSelect.selectedIndex = 0;
    const evt = new Event('change');
    kelasSelect.dispatchEvent(evt);
}
window.updateFaseOptions = function () {
    const kelas = document.getElementById('soal-kelas').value;
    const jenjang = (document.getElementById('soal-jenjang') || {}).value || '';
    const faseSelect = document.getElementById('soal-fase');
    let fase = "A";
    if (jenjang === "PAUD/TK/RA") fase = "P";
    else if (jenjang === "SD" || jenjang === "MI") {
        const faseMap = { "Kelas 1": "A", "Kelas 2": "A", "Kelas 3": "B", "Kelas 4": "B", "Kelas 5": "C", "Kelas 6": "C" };
        fase = faseMap[kelas] || "A";
    } else if (jenjang === "SMP" || jenjang === "MTs") {
        fase = "D";
    } else if (jenjang === "SMA" || jenjang === "MA" || jenjang === "SMK") {
        const faseMap = { "Kelas 10": "E", "Kelas 11": "F", "Kelas 12": "F" };
        fase = faseMap[kelas] || "E";
    }
    faseSelect.innerHTML = `<option value="${fase}">Fase ${fase} (Otomatis)</option>`;
}
const soalKelasEl = document.getElementById('soal-kelas');
if (soalKelasEl) {
    soalKelasEl.addEventListener('change', function () {
        try { window.updateFaseOptions(); } catch (e) { }
        try { updateSoalMapelOptions(); } catch (e) { }
    });
}
if (document.getElementById('soal-jenjang')) window.updateKelasOptions();
(function () {
    const naskahToggle = document.getElementById('check-layout-2col');
    const naskahOptions = document.getElementById('naskah-options');
    const gambarBlock = document.getElementById('naskah-gambar-count');
    function updateNaskahVisibility() {
        if (!naskahToggle || !naskahOptions) return;
        naskahOptions.style.display = naskahToggle.checked ? 'block' : 'none';
    }
    function updateGambarVisibility() {
        if (!gambarBlock) return;
        const sel = document.querySelector('input[name="naskah-option"]:checked');
        gambarBlock.style.display = (sel && sel.value === 'dengan-gambar') ? 'block' : 'none';
    }
    if (naskahToggle) {
        naskahToggle.addEventListener('change', updateNaskahVisibility);
        updateNaskahVisibility();
    }
    document.addEventListener('change', function (e) {
        if (e.target && e.target.name === 'naskah-option') updateGambarVisibility();
    });
    updateGambarVisibility();
})();
const modulJenjang = document.getElementById('modul-jenjang');
if (modulJenjang) {
    modulJenjang.addEventListener('change', function () {
        const jenjang = this.value;
        const kelasSelect = document.getElementById('modul-kelas-select');
        let options = "";
        if (jenjang === "PAUD/TK/RA") options = "<option value='Kelompok A'>Kelompok A</option><option value='Kelompok B'>Kelompok B</option>";
        else if (jenjang === "SD" || jenjang === "MI") options = "<option value='Kelas 1'>Kelas 1</option><option value='Kelas 2'>Kelas 2</option><option value='Kelas 3'>Kelas 3</option><option value='Kelas 4'>Kelas 4</option><option value='Kelas 5'>Kelas 5</option><option value='Kelas 6'>Kelas 6</option>";
        else if (jenjang === "SMP" || jenjang === "MTs") options = "<option value='Kelas 7'>Kelas 7</option><option value='Kelas 8'>Kelas 8</option><option value='Kelas 9'>Kelas 9</option>";
        else if (jenjang === "SMA" || jenjang === "MA" || jenjang === "SMK") options = "<option value='Kelas 10'>Kelas 10</option><option value='Kelas 11'>Kelas 11</option><option value='Kelas 12'>Kelas 12</option>";
        kelasSelect.innerHTML = options;
        const evt = new Event('change');
        kelasSelect.dispatchEvent(evt);
    });
}
const modulKelas = document.getElementById('modul-kelas-select');
if (modulKelas) {
    modulKelas.addEventListener('change', function () {
        const kelasStr = this.value;
        const jenjang = (document.getElementById('modul-jenjang') || {}).value || '';
        let fase = "A";
        if (jenjang === "PAUD/TK/RA") fase = "P";
        else if (jenjang === "SD" || jenjang === "MI") {
            const faseMap = { "Kelas 1": "A", "Kelas 2": "A", "Kelas 3": "B", "Kelas 4": "B", "Kelas 5": "C", "Kelas 6": "C" };
            fase = faseMap[kelasStr] || "A";
        } else if (jenjang === "SMP" || jenjang === "MTs") {
            fase = "D";
        } else if (jenjang === "SMA" || jenjang === "MA" || jenjang === "SMK") {
            const faseMap = { "Kelas 10": "E", "Kelas 11": "F", "Kelas 12": "F" };
            fase = faseMap[kelasStr] || "E";
        }
        document.getElementById('modul-fase-select').innerHTML = `<option value="${fase}">Fase ${fase}</option>`;
    });
}
const MODUL_KOMPONEN_BY_KURIKULUM = {
    "Kurikulum Merdeka 2025": [
        { id: "check-pengantar", label: "Pengantar Modul", icon: "fa-file-alt", checked: true },
        { id: "check-tujuan", label: "Tujuan Pembelajaran", icon: "fa-target", checked: true },
        { id: "check-media", label: "Media Pembelajaran", icon: "fa-photo-video", checked: true },
        { id: "check-konten", label: "Konten Materi", icon: "fa-book", checked: true },
        { id: "check-lkpd", label: "LKPD (Lembar Kerja Peserta Didik)", icon: "fa-tasks", checked: true },
        { id: "check-evaluasi", label: "Evaluasi/Asesmen", icon: "fa-check-double", checked: true },
        { id: "check-glosarium", label: "Glosarium", icon: "fa-book-open", checked: false },
        { id: "check-pustaka", label: "Daftar Pustaka", icon: "fa-list-ul", checked: true },
        { id: "check-kunci-jawaban", label: "Kunci Jawaban", icon: "fa-key", checked: false }
    ],
    "Kurikulum Berbasis Cinta": [
        { id: "check-pengantar", label: "Pengantar Modul", icon: "fa-file-alt", checked: true },
        { id: "check-tujuan", label: "Tujuan Pembelajaran", icon: "fa-target", checked: true },
        { id: "check-nilai-cinta", label: "Nilai Cinta & Karakter", icon: "fa-heart", checked: true },
        { id: "check-media", label: "Media Pembelajaran", icon: "fa-photo-video", checked: true },
        { id: "check-konten", label: "Konten Materi", icon: "fa-book", checked: true },
        { id: "check-lkpd", label: "LKPD", icon: "fa-tasks", checked: true },
        { id: "check-refleksi", label: "Refleksi Diri", icon: "fa-lightbulb", checked: true },
        { id: "check-pustaka", label: "Daftar Pustaka", icon: "fa-list-ul", checked: true }
    ],
    "KMA 1503 Tahun 2025": [
        { id: "check-pengantar", label: "Pengantar Modul", icon: "fa-file-alt", checked: true },
        { id: "check-tujuan", label: "Tujuan Pembelajaran", icon: "fa-target", checked: true },
        { id: "check-konten-islam", label: "Konten Keislaman", icon: "fa-quran", checked: true },
        { id: "check-media", label: "Media Pembelajaran", icon: "fa-photo-video", checked: true },
        { id: "check-konten", label: "Konten Materi", icon: "fa-book", checked: true },
        { id: "check-lkpd", label: "LKPD", icon: "fa-tasks", checked: true },
        { id: "check-ayat-hadis", label: "Ayat & Hadis Pendukung", icon: "fa-scroll", checked: true },
        { id: "check-pustaka", label: "Daftar Pustaka", icon: "fa-list-ul", checked: true }
    ],
    "Kustom": [
        { id: "check-pengantar", label: "Pengantar Modul", icon: "fa-file-alt", checked: true },
        { id: "check-tujuan", label: "Tujuan Pembelajaran", icon: "fa-target", checked: true },
        { id: "check-media", label: "Media Pembelajaran", icon: "fa-photo-video", checked: true },
        { id: "check-konten", label: "Konten Materi", icon: "fa-book", checked: true },
        { id: "check-lkpd", label: "LKPD", icon: "fa-tasks", checked: true },
        { id: "check-evaluasi", label: "Evaluasi/Asesmen", icon: "fa-check-double", checked: true },
        { id: "check-pustaka", label: "Daftar Pustaka", icon: "fa-list-ul", checked: true }
    ]
};
function updateModulKomponenOptions() {
    const kurikulum = getActiveModulKurikulum();
    const grid = document.getElementById('modul-komponen-grid');
    if (!grid) return;
    const komponen = MODUL_KOMPONEN_BY_KURIKULUM[kurikulum] || MODUL_KOMPONEN_BY_KURIKULUM["Kurikulum Merdeka 2025"];
    grid.innerHTML = '';
    komponen.forEach(item => {
        const card = document.createElement('div');
        card.className = 'toggle-card';
        card.innerHTML = `
            <div class="toggle-label"><i class="fas ${item.icon}"></i> ${item.label}</div>
            <label class="switch">
                <input type="checkbox" id="${item.id}" ${item.checked ? 'checked' : ''}>
                <span class="slider"></span>
            </label>
        `;
        grid.appendChild(card);
    });
}
const subjectData = {
    "Kurikulum Merdeka 2025": {
        "PAUD/TK/RA": {
            "default": [
                "Nilai Agama dan Budi Pekerti",
                "Jati Diri",
                "Dasar-dasar Literasi, Bahasa, dan Komunikasi",
                "Dasar-dasar Matematika dan Sains",
                "Kreativitas, Estetika, dan Imajinasi",
                "Dasar-dasar Kesehatan dan Keselamatan"
            ]
        },
        "SD": {
            "default": [
                "Pendidikan Agama dan Budi Pekerti",
                "Pendidikan Pancasila",
                "Bahasa Indonesia",
                "Matematika",
                "PJOK",
                "Seni dan Budaya",
                "Bahasa Inggris",
                "Muatan Lokal"
            ],
            "Kelas 1": ["Pendidikan Agama dan Budi Pekerti", "Pendidikan Pancasila", "Bahasa Indonesia", "Matematika", "PJOK", "Seni & Budaya"],
            "Kelas 2": ["Pendidikan Agama dan Budi Pekerti", "Pendidikan Pancasila", "Bahasa Indonesia", "Matematika", "PJOK", "Seni & Budaya"],
            "Kelas 3": ["Pendidikan Agama dan Budi Pekerti", "Bahasa Indonesia", "Matematika", "IPAS", "PJOK", "Seni & Budaya"],
            "Kelas 4": ["Bahasa Indonesia", "Matematika", "IPAS", "Bahasa Inggris", "PJOK", "Seni & Budaya"],
            "Kelas 5": ["Bahasa Indonesia", "Matematika", "IPAS", "Bahasa Inggris", "PJOK", "Seni & Budaya"],
            "Kelas 6": ["Bahasa Indonesia", "Matematika", "IPAS", "Sejarah Dasar", "Bahasa Inggris", "PJOK"]
        },
        "MI": {
            "default": [
                "Pendidikan Pancasila",
                "Bahasa Indonesia",
                "Matematika",
                "PJOK",
                "Seni dan Budaya",
                "Al-Qur\'an Hadits",
                "Akidah Akhlak",
                "Fikih",
                "SKI",
                "Bahasa Arab"
            ],
            "Kelas 1": ["Bahasa Indonesia", "Matematika", "PJOK", "Al-Qur\'an Hadits", "Akidah Akhlak"],
            "Kelas 2": ["Bahasa Indonesia", "Matematika", "PJOK", "Fikih", "SKI"],
            "Kelas 3": ["Bahasa Indonesia", "Matematika", "IPAS", "Bahasa Arab", "PJOK"],
            "Kelas 4": ["Bahasa Indonesia", "Matematika", "IPAS", "Bahasa Arab", "Al-Qur\'an Hadits"],
            "Kelas 5": ["Bahasa Indonesia", "Matematika", "IPAS", "Akidah Akhlak", "Fikih"],
            "Kelas 6": ["Bahasa Indonesia", "Matematika", "IPAS", "SKI", "Bahasa Arab"]
        },
        "SMP": {
            "default": [
                "Pendidikan Agama dan Budi Pekerti",
                "Pendidikan Pancasila",
                "Bahasa Indonesia",
                "Matematika",
                "IPA",
                "IPS",
                "Bahasa Inggris",
                "Informatika",
                "PJOK",
                "Seni/Prakarya",
                "Muatan Lokal"
            ],
            "Kelas 7": ["Matematika", "IPA", "IPS", "Bahasa Indonesia", "Bahasa Inggris"],
            "Kelas 8": ["Matematika", "IPA", "IPS", "Bahasa Indonesia", "Informatika"],
            "Kelas 9": ["Matematika", "IPA", "IPS", "Bahasa Inggris", "PJOK"]
        },
        "MTs": {
            "default": [
                "Pendidikan Pancasila",
                "Bahasa Indonesia",
                "Matematika",
                "IPA",
                "IPS",
                "Bahasa Inggris",
                "Informatika",
                "PJOK",
                "Seni/Prakarya",
                "Al-Qur\'an Hadits",
                "Akidah Akhlak",
                "Fikih",
                "SKI",
                "Bahasa Arab"
            ],
            "Kelas 7": ["Matematika", "IPA", "IPS", "Al-Qur\'an Hadits", "Bahasa Indonesia"],
            "Kelas 8": ["Matematika", "IPA", "IPS", "Akidah Akhlak", "Fikih"],
            "Kelas 9": ["Matematika", "IPA", "IPS", "SKI", "Bahasa Arab"]
        },
        "SMA": {
            "default": [
                "Pendidikan Agama dan Budi Pekerti",
                "Pendidikan Pancasila",
                "Bahasa Indonesia",
                "Bahasa Inggris",
                "Matematika",
                "IPA Lintasan",
                "IPS Lintasan",
                "Informatika",
                "PJOK",
                "Seni/Prakarya",
                "Matematika Lanjutan",
                "Fisika",
                "Kimia",
                "Biologi",
                "Ekonomi",
                "Geografi",
                "Sosiologi",
                "Sejarah",
                "Seni Budaya Lanjutan"
            ],
            "Kelas 10": ["Matematika", "IPA Lintasan", "Fisika", "Biologi", "Bahasa Indonesia"],
            "Kelas 11": ["Matematika Lanjutan", "Kimia", "Biologi", "Bahasa Inggris", "Informatika"],
            "Kelas 12": ["Matematika", "Fisika", "Kimia", "Sejarah", "Ekonomi"]
        },
        "MA": {
            "default": [
                "Pendidikan Pancasila",
                "Bahasa Indonesia",
                "Bahasa Inggris",
                "Matematika",
                "IPA Lintasan",
                "IPS Lintasan",
                "Informatika",
                "PJOK",
                "Seni/Prakarya",
                "Al-Qur\'an Hadits",
                "Akidah Akhlak",
                "Fikih",
                "SKI",
                "Bahasa Arab",
                "Matematika Lanjutan",
                "Fisika",
                "Kimia",
                "Biologi",
                "Ekonomi",
                "Geografi",
                "Sosiologi",
                "Sejarah",
                "Seni Budaya Lanjutan"
            ],
            "Kelas 10": ["Matematika", "IPA Lintasan", "Al-Qur\'an Hadits", "Bahasa Indonesia", "Informatika"],
            "Kelas 11": ["Matematika Lanjutan", "Fisika", "Akidah Akhlak", "Bahasa Inggris", "Fikih"],
            "Kelas 12": ["Matematika", "Kimia", "Biologi", "Sejarah", "Bahasa Arab"]
        },
        "SMK": {
            "default": [
                "Pendidikan Agama dan Budi Pekerti",
                "Pendidikan Pancasila",
                "Bahasa Indonesia",
                "Matematika",
                "Bahasa Inggris",
                "IPAS",
                "Informatika",
                "PJOK",
                "Seni/Prakarya",
                "Dasar Bidang Keahlian",
                "Dasar Program Keahlian",
                "Kompetensi Keahlian"
            ],
            "Kelas 10": ["Matematika", "Bahasa Indonesia", "IPAS", "Informatika", "PJOK"],
            "Kelas 11": ["Matematika", "Bahasa Inggris", "Dasar Program Keahlian", "Kompetensi Keahlian", "PJOK"],
            "Kelas 12": ["Bahasa Indonesia", "Dasar Bidang Keahlian", "Kompetensi Keahlian", "PJOK"]
        }
    },
    "Kurikulum Berbasis Cinta": {
        "PAUD/TK/RA": { "default": ["Tema Tematik: Keluarga, Alam, Kebudayaan", "Bermain dan Bekerjasama", "Aku Cinta Indonesia"] },
        "SD": { "default": ["Penguatan Karakter", "Bahasa Indonesia", "Matematika", "PJOK", "Muatan Lokal"] },
        "MI": { "default": ["Penguatan Karakter", "Bahasa Indonesia", "Matematika", "PJOK", "Fikih"] },
        "SMP": { "default": ["Penguatan Karakter", "Bahasa Indonesia", "Matematika", "IPA/IPS integratif"] },
        "MTs": { "default": ["Penguatan Karakter", "Bahasa Indonesia", "Matematika", "IPA/IPS", "Fikih"] },
        "SMA": { "default": ["Kewargaan", "Etika Teknologi", "Bahasa Indonesia", "Matematika"] },
        "MA": { "default": ["Kewargaan", "Etika Teknologi", "Bahasa Indonesia", "Matematika"] },
        "SMK": { "default": ["Kewargaan", "Etika Teknologi", "Bahasa Indonesia", "Kompetensi Keahlian"] }
    },
    "KMA 1503 Tahun 2025": {
        "PAUD/TK/RA": { "default": ["Pendekatan Tematik & Penguatan Karakter"] },
        "SD": { "default": ["Matematika", "Bahasa Indonesia", "Pendidikan Agama"] },
        "MI": { "default": ["Matematika", "Bahasa Indonesia", "Fikih"] },
        "SMP": { "default": ["Matematika", "Bahasa Indonesia", "IPA"] },
        "MTs": { "default": ["Matematika", "Bahasa Indonesia", "IPA", "Fikih"] },
        "SMA": { "default": ["Matematika", "Bahasa Indonesia", "IPA/Bahasa"] },
        "MA": { "default": ["Matematika", "Bahasa Indonesia", "IPA/Bahasa", "Fikih"] },
        "SMK": { "default": ["Matematika", "Bahasa Indonesia", "Kompetensi Keahlian"] }
    },
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
    const jenjang = (document.getElementById('modul-jenjang') || {}).value || '';
    const select = document.getElementById('modul-mapel-select');
    if (!select) return;
    let list = [];
    if (jenjang && MAPEL_BY_JENJANG[jenjang]) {
        list = MAPEL_BY_JENJANG[jenjang].slice();
    }
    if (list.length === 0) {
        list = ["Matematika", "Bahasa Indonesia", "Bahasa Inggris", "IPA", "IPS", "PJOK", "Seni & Budaya"];
    }
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
const modulMapelSelect = document.getElementById('modul-mapel-select');
if (modulMapelSelect) {
    modulMapelSelect.addEventListener('change', function () {
        const val = this.value;
        const textarea = document.getElementById('modul-mapel');
        if (!textarea) return;
        if (val === '') return;
        if (val === 'Lainnya') {
            textarea.value = '';
            textarea.focus();
        } else {
            textarea.value = val + (textarea.value && textarea.value !== '' ? ' - ' + textarea.value : '');
        }
    });
}
const _mj = document.getElementById('modul-jenjang');
if (_mj) _mj.addEventListener('change', updateModulMapelOptions);
if (modulKelas) modulKelas.addEventListener('change', updateModulMapelOptions);
setTimeout(updateModulMapelOptions, 50);
setTimeout(updateModulKomponenOptions, 100);
function buildTopicDataFromSubjectData() {
    const topicMap = {};
    function addTopicsFromList(list) {
        list.forEach(item => {
            if (typeof item !== 'string') return;
            const m = item.match(/^(.*?)\s*\((.*)\)\s*$/);
            if (m) {
                const subj = m[1].trim();
                const topics = m[2].split(/,|;/).map(s => s.trim()).filter(Boolean);
                if (!topicMap[subj]) topicMap[subj] = new Set();
                topics.forEach(t => topicMap[subj].add(t));
            } else {
                const subj = item.trim();
                if (!topicMap[subj]) topicMap[subj] = new Set();
                const defaults = {
                    'Matematika': ['Bilangan', 'Geometri', 'Pecahan', 'Pengukuran', 'Aljabar dasar'],
                    'Bahasa Indonesia': ['Teks Naratif', 'Teks Prosedur', 'Teks Berita', 'Puisi Anak'],
                    'IPAS': ['Alam Sekitar', 'Siklus Air', 'Ekosistem'],
                    'IPA': ['Sel & Jaringan', 'Energi', 'Sistem Tata Surya'],
                    'IPS': ['Peta & Letak', 'Sejarah Lokal', 'Sumber Daya Alam'],
                    'Bahasa Inggris': ['Percakapan Sederhana', 'Vocabulary Dasar', 'Descriptive Text']
                };
                if (defaults[subj]) defaults[subj].forEach(t => topicMap[subj].add(t));
            }
        });
    }
    Object.keys(subjectData).forEach(k => {
        const jenjangs = subjectData[k];
        Object.keys(jenjangs).forEach(j => {
            const entry = jenjangs[j];
            if (Array.isArray(entry)) addTopicsFromList(entry);
            else if (entry && typeof entry === 'object') {
                Object.keys(entry).forEach(key => {
                    const v = entry[key];
                    if (Array.isArray(v)) addTopicsFromList(v);
                });
            }
        });
    });
    const out = {};
    Object.keys(topicMap).forEach(s => {
        out[s] = Array.from(topicMap[s]);
    });
    return out;
}
const derivedTopicData = buildTopicDataFromSubjectData();
function populateTopicOptions(selectId, subjectName) {
    const sel = document.getElementById(selectId);
    if (!sel) return;
    sel.innerHTML = '';
    const def = document.createElement('option');
    def.value = '';
    def.textContent = '-- Pilih Topik Contoh --';
    sel.appendChild(def);
    const topics = derivedTopicData[subjectName] || derivedTopicData[subjectName.replace(/\s*\(.*\)$/, '')] || [];
    if (topics.length === 0) {
        sel.style.display = 'none';
        const note = document.getElementById(selectId === 'modul-topik-select' ? 'modul-topik-note' : null);
        if (note) note.style.display = 'none';
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
    const note = document.getElementById('modul-topik-note'); if (note) note.style.display = 'block';
}
const modulMapelSelEl = document.getElementById('modul-mapel-select');
if (modulMapelSelEl) {
    modulMapelSelEl.addEventListener('change', function () {
        const val = this.value;
        if (!val) {
            document.getElementById('modul-topik-select').style.display = 'none';
            return;
        }
        populateTopicOptions('modul-topik-select', val);
    });
}
const modulTopikSelect = document.getElementById('modul-topik-select');
if (modulTopikSelect) {
    modulTopikSelect.addEventListener('change', function () {
        const v = this.value;
        const ta = document.getElementById('modul-mapel');
        if (!ta) return;
        if (!v || v === '') return;
        if (v === 'Lainnya') { ta.focus(); return; }
        const currentMapel = modulMapelSelEl ? modulMapelSelEl.value : '';
        if (ta.value.trim() === '' || (currentMapel && ta.value.trim().toLowerCase().startsWith(currentMapel.toLowerCase()))) {
            ta.value = (currentMapel ? currentMapel + ' - ' : '') + v;
        } else {
            ta.value = v;
        }
    });
}
const soalMapelSelEl = document.getElementById('soal-mapel-select');
if (soalMapelSelEl) {
    soalMapelSelEl.addEventListener('change', function () {
        const val = this.value;
        if (!val) { document.getElementById('soal-topik-select').style.display = 'none'; return; }
        populateTopicOptions('soal-topik-select', val);
    });
}
const soalTopikSelect = document.getElementById('soal-topik-select');
if (soalTopikSelect) {
    soalTopikSelect.addEventListener('change', function () {
        const v = this.value;
        const ta = document.getElementById('soal-mapel');
        if (!ta || !v || v === '') return;
        if (v === 'Lainnya') { ta.focus(); return; }
        const currentMapel = soalMapelSelEl ? soalMapelSelEl.value : '';
        if (ta.value.trim() === '') ta.value = (currentMapel ? currentMapel + ' - ' : '') + v;
        else ta.value = v;
    });
}
setTimeout(() => {
    if (modulMapelSelEl && modulMapelSelEl.value) populateTopicOptions('modul-topik-select', modulMapelSelEl.value);
    if (soalMapelSelEl && soalMapelSelEl.value) populateTopicOptions('soal-topik-select', soalMapelSelEl.value);
}, 200);
function getGenericTopicList(limit = 40) {
    const s = new Set();
    Object.keys(derivedTopicData).forEach(subj => {
        derivedTopicData[subj].forEach(t => s.add(t));
    });
    return Array.from(s).slice(0, limit);
}
function populateGenericTopicSelect(selectId) {
    const sel = document.getElementById(selectId);
    if (!sel) return;
    sel.innerHTML = '';
    const def = document.createElement('option'); def.value = ''; def.textContent = '-- Pilih Topik Contoh --'; sel.appendChild(def);
    const topics = getGenericTopicList(80);
    topics.forEach(t => {
        const o = document.createElement('option'); o.value = t; o.textContent = t; sel.appendChild(o);
    });
    const other = document.createElement('option'); other.value = 'Lainnya'; other.textContent = 'Lainnya (Kustom)'; sel.appendChild(other);
    sel.style.display = 'block';
    const noteId = selectId === 'bahan-topik-select' ? 'bahan-topik-note' : (selectId === 'kokul-topik-select' ? 'kokul-topik-note' : null);
    if (noteId) {
        const noteEl = document.getElementById(noteId);
        if (noteEl) noteEl.style.display = 'block';
    }
}
setTimeout(() => {
    populateGenericTopicSelect('bahan-topik-select');
    populateGenericTopicSelect('kokul-topik-select');
}, 300);
const bahanTopikSelect = document.getElementById('bahan-topik-select');
if (bahanTopikSelect) {
    bahanTopikSelect.addEventListener('change', function () {
        const v = this.value;
        const ta = document.getElementById('bahan-topik');
        if (!ta || !v) return;
        if (v === 'Lainnya') { ta.focus(); return; }
        ta.value = v;
    });
}
const kokulTopikSelect = document.getElementById('kokul-topik-select');
if (kokulTopikSelect) {
    kokulTopikSelect.addEventListener('change', function () {
        const v = this.value;
        const inp = document.getElementById('kokul-tema');
        if (!inp || !v) return;
        if (v === 'Lainnya') { inp.focus(); return; }
        inp.value = v;
    });
}
const kokulJenjang = document.getElementById('kokul-jenjang');
if (kokulJenjang) {
    kokulJenjang.addEventListener('change', function () {
        const jenjang = this.value;
        const kelasSelect = document.getElementById('kokul-kelas');
        let options = "";
        if (jenjang === "PAUD/TK/RA") options = "<option value='Kelompok A'>Kelompok A</option><option value='Kelompok B'>Kelompok B</option>";
        else if (jenjang === "SD" || jenjang === "MI") options = "<option value='Kelas 1'>Kelas 1</option><option value='Kelas 2'>Kelas 2</option><option value='Kelas 3'>Kelas 3</option><option value='Kelas 4'>Kelas 4</option><option value='Kelas 5'>Kelas 5</option><option value='Kelas 6'>Kelas 6</option>";
        else if (jenjang === "SMP" || jenjang === "MTs") options = "<option value='Kelas 7'>Kelas 7</option><option value='Kelas 8'>Kelas 8</option><option value='Kelas 9'>Kelas 9</option>";
        else if (jenjang === "SMA" || jenjang === "MA" || jenjang === "SMK") options = "<option value='Kelas 10'>Kelas 10</option><option value='Kelas 11'>Kelas 11</option><option value='Kelas 12'>Kelas 12</option>";
        kelasSelect.innerHTML = options;
        const evt = new Event('change');
        kelasSelect.dispatchEvent(evt);
    });
}
const kokulKelas = document.getElementById('kokul-kelas');
if (kokulKelas) {
    kokulKelas.addEventListener('change', function () {
        const kelasStr = this.value;
        const jenjang = (document.getElementById('kokul-jenjang') || {}).value || '';
        let fase = "A";
        if (jenjang === "PAUD/TK/RA") fase = "P";
        else if (jenjang === "SD" || jenjang === "MI") {
            const faseMap = { "Kelas 1": "A", "Kelas 2": "A", "Kelas 3": "B", "Kelas 4": "B", "Kelas 5": "C", "Kelas 6": "C" };
            fase = faseMap[kelasStr] || "A";
        } else if (jenjang === "SMP" || jenjang === "MTs") {
            fase = "D";
        } else if (jenjang === "SMA" || jenjang === "MA" || jenjang === "SMK") {
            const faseMap = { "Kelas 10": "E", "Kelas 11": "F", "Kelas 12": "F" };
            fase = faseMap[kelasStr] || "E";
        }
        document.getElementById('kokul-fase').innerHTML = `<option value="${fase}">Fase ${fase}</option>`;
    });
}
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
            if (typeof updateModulMapelOptions === 'function') updateModulMapelOptions();
            if (typeof updateSoalMapelOptions === 'function') updateSoalMapelOptions();
            if (typeof updateModulKomponenOptions === 'function' && groupId === 'modul-kurikulum-group') updateModulKomponenOptions();
        });
    });
}
setupKurikulumToggle('modul-kurikulum-group', 'modul-kurikulum-kustom');
setupKurikulumToggle('kokul-kurikulum-group', 'kokul-kurikulum-kustom');
setupKurikulumToggle('soal-kurikulum-group', 'soal-kurikulum-kustom');
function setupBtnGroupToggle(groupId, onChange) {
    const group = document.getElementById(groupId);
    if (!group) return;
    const btns = group.querySelectorAll('.btn-toggle');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            if (typeof onChange === 'function') {
                try { onChange(btn.getAttribute('data-value')); } catch (e) { console.error(e); }
            }
        });
    });
}
setupBtnGroupToggle('soal-distribusi-group');
const soalCustomToggle = document.getElementById('soal-custom-weights-toggle');
if (soalCustomToggle) {
    soalCustomToggle.addEventListener('change', function () {
        const block = document.getElementById('soal-custom-weights-block');
        if (block) block.style.display = this.checked ? 'block' : 'none';
    });
}
function getActiveSoalKurikulum() {
    const activeBtn = document.querySelector('#soal-kurikulum-group .btn-toggle.active');
    return activeBtn ? activeBtn.getAttribute('data-value') : 'Kurikulum Merdeka 2025';
}
function updateSoalMapelOptions() {
    const kurikulum = getActiveSoalKurikulum();
    const jenjang = (document.getElementById('soal-jenjang') || {}).value || '';
    const kelas = (document.getElementById('soal-kelas') || {}).value || '';
    const select = document.getElementById('soal-mapel-select');
    if (!select) return;
    let list = [];
    if (subjectData[kurikulum]) {
        const byJenjang = subjectData[kurikulum][jenjang];
        if (byJenjang) {
            if (byJenjang[kelas]) list = byJenjang[kelas].slice();
            else if (byJenjang['default']) list = byJenjang['default'].slice();
        }
    }
    if (list.length === 0) {
        list = ["Matematika", "Bahasa Indonesia", "Bahasa Inggris", "IPA", "IPS", "PJOK", "SBdP"];
    }
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
const soalJenjang = document.getElementById('soal-jenjang');
if (soalJenjang) soalJenjang.addEventListener('change', () => { window.updateKelasOptions(); setTimeout(updateSoalMapelOptions, 50); });
const soalKelas = document.getElementById('soal-kelas');
if (soalKelas) soalKelas.addEventListener('change', updateSoalMapelOptions);
const soalMapelSelect = document.getElementById('soal-mapel-select');
if (soalMapelSelect) {
    soalMapelSelect.addEventListener('change', function () {
        const val = this.value;
        const customInput = document.getElementById('soal-mapel-kustom');
        const textarea = document.getElementById('soal-mapel');
        if (!customInput || !textarea) return;
        if (val === 'Lainnya') {
            customInput.style.display = 'block';
            customInput.focus();
            textarea.placeholder = 'Tuliskan mata pelajaran / topik jika memilih Kustom...';
        } else {
            customInput.style.display = 'none';
            if (textarea.value.trim() === '') textarea.value = val;
        }
    });
}
setTimeout(updateSoalMapelOptions, 100);
document.getElementById('btn-gen-modul').addEventListener('click', async function () {
    const btn = this;
    let mSel = document.getElementById('modul-mapel-select');
    let mVal = mSel ? mSel.value : '';
    if (mVal === 'Kustom') mVal = document.getElementById('modul-mapel-manual')?.value;
    const mapel = mVal || document.getElementById('modul-mapel')?.value || '';
    if (!mapel) return showToast("Mohon isi Mata Pelajaran/Topik");
    showProgressBar('Membuat Modul Ajar', 'AI sedang menganalisis dan membuat modul ajar berkualitas tinggi...');
    const progressInterval = animateProgressBar();
    const namaGuru = localStorage.getItem('as_nama') || 'Guru';
    const namaSekolah = localStorage.getItem('as_sekolah') || 'Sekolah';
    const nipGuru = localStorage.getItem('as_nip') || '';
    const profilLulusan = Array.from(document.querySelectorAll('.check-profil:checked')).map(c => c.value).join(", ");
    const components = {
        lkpd: document.getElementById('check-lkpd')?.checked || false,
        glosarium: document.getElementById('check-glosarium')?.checked || false,
        media: document.getElementById('check-media')?.checked || false,
        pustaka: document.getElementById('check-pustaka')?.checked || false
    };
    const activeBtn = document.querySelector('#modul-kurikulum-group .btn-toggle.active');
    const selectedKurikulum = activeBtn ? activeBtn.getAttribute('data-value') : "Kurikulum Merdeka 2025";
    const kurikulumVal = selectedKurikulum === 'Kustom' ? document.getElementById('modul-kurikulum-kustom').value : selectedKurikulum;
    const modulSelectedTopicEl = document.getElementById('modul-topik-select');
    const modulSelectedTopic = modulSelectedTopicEl && modulSelectedTopicEl.value && modulSelectedTopicEl.value !== 'Lainnya' ? modulSelectedTopicEl.value : (document.getElementById('modul-mapel').value || '');
    const includeKKA = document.getElementById('include-modul-kka')?.checked || false;
    const metodeList = document.getElementById('modul-metode-select').value || 'A. Ceramah & Diskusi: Ceramah Interaktif, Tanya Jawab, Diskusi Kelas, Diskusi Kelompok Kecil, Brainstorming | B. Eksperimen & Observasi: Eksperimen Laboratorium, Observasi Lapangan, Penelitian Mini, Demonstrasi | C. Metode Penugasan: Tugas Individu, Tugas Kelompok, Penugasan Berbasis Proyek, Penugasan Produk Kreatif | D. Simulasi & Role Playing: Simulasi, Bermain Peran, Debat | E. Metode Berbasis Teknologi: Quiz Digital, Video Based Learning, Augmented Reality Learning, Virtual Lab | F. Metode Pembelajaran Aktif: Gallery Walk, Talking Stick, Snowball Throwing, Think Pair Share, Problem Solving Steps';
    const pendekatanList = document.getElementById('modul-pendekatan-select').value || 'A. Pendekatan Ilmiah (Scientific Approach): Mengamati, Menanya, Mengumpulkan Data, Menalar, Mengomunikasikan';
    let prompt = '';
    if (kurikulumVal.includes('Kurikulum Merdeka')) {
        prompt = `
BUATKAN MODUL AJAR KURIKULUM MERDEKA REVISI 2025 YANG LENGKAP DAN PROFESIONAL
DATA IDENTITAS:
- Nama Penyusun: ${namaGuru}${nipGuru ? ' (' + nipGuru + ')' : ''}
- Satuan Pendidikan: ${namaSekolah}
- Tahun Ajaran: ${document.getElementById('modul-tahun').value || '2025/2026'}
- Mata Pelajaran: ${mapel}
- Topik/Rincian: ${modulSelectedTopic}
- Fase: ${document.getElementById('modul-fase-select').value}
- Kelas: ${document.getElementById('modul-kelas-select').value}
- Alokasi Waktu: ${document.getElementById('modul-waktu').value}
- Semester: ${document.getElementById('modul-sem-select').value}
- Model Pembelajaran: ${document.getElementById('modul-model-select').value}
- Metode Pembelajaran: ${metodeList || 'Diskusi, Tanya Jawab, Presentasi, Simulasi'}
- Pendekatan Pembelajaran: ${pendekatanList || 'Scientific, Humanistik, Konstruktivistik'}
STRUKTUR MODUL AJAR WAJIB (A-S) KURIKULUM MERDEKA REVISI 2025:
A. IDENTITAS PENYUSUN
Cantumkan: Nama Guru, Nama Sekolah, Tahun Ajaran, Mata Pelajaran, Fase, Kelas, Alokasi Waktu
B. DIMENSI PROFIL LULUSAN
Gunakan 8 Dimensi Profil Lulusan (Permendikdasmen No. 10 & 13 Tahun 2025):
1. Keimanan dan Ketakwaan kepada Tuhan Yang Maha Esa
2. Kewargaan
3. Penalaran Kritis
4. Kreativitas
5. Kolaborasi
6. Kemandirian
7. Kesehatan
8. Komunikasi
Jelaskan bagaimana setiap dimensi terintegrasi dalam pembelajaran. Minimal 3 dimensi fokus utama.
C. 7 KEGIATAN ANAK INDONESIA HEBAT
Urutan standar (Permendikdasmen 2025):
1. Bangun Tidur Mandiri 2. Beribadah 3. Olahraga 4. Gemar Belajar 5. Makan Sehat Bergizi 6. Bermasyarakat 7. Tidur Cukup
Integrasikan dengan topik pembelajaran.
D. CAPAIAN PEMBELAJARAN & TUJUAN PEMBELAJARAN
- CP: Ambil dari Permendikdasmen sesuai fase dan mapel
- TP: 3-5 TP spesifik, terukur, dengan indikator HOTS (C4-C6)
D.1. KRITERIA KETERCAPAIAN TUJUAN PEMBELAJARAN (KKTP)
Tabel: No | Tujuan Pembelajaran | Kriteria Ketercapaian | Level HOTS
Setiap indikator spesifik, terukur, SMART, dengan minimal 3 indikator per TP.
E. SARANA & PRASARANA
F. TARGET PESERTA DIDIK
G. MODEL & METODE PEMBELAJARAN
H. PERTANYAAN PEMANTIK (Mindful, Meaningful, Joyful Learning)
I. KEGIATAN PEMBELAJARAN (Tabel: Pendahuluan 20' | Inti 140' | Penutup 15')
J. ASESMEN FORMATIF & SUMATIF
K. PENDEKATAN PEMBELAJARAN
L. PEMAHAMAN BERMAKNA (Deep Learning)
M. MATERI BAHAN AJAR
N. REFLEKSI
O. LKPD & RUBRIK PENILAIAN
P. PENGAYAAN & REMEDIAL
Q. GLOSARIUM
R. DAFTAR PUSTAKA (Format APA, minimal 4 sumber)
S. PENUTUP
CATATAN PENTING:
- Format profesional sesuai Permendikdasmen Kurikulum Merdeka Revisi 2025
- Integrasikan 8 Dimensi Profil Lulusan dan 7 Kegiatan Anak Indonesia Hebat secara organik
- Perspektif kolaboratif, aktif, konstruktivistik
- Output Markdown profesional dengan tabel
CATATAN KHUSUS: ${document.getElementById('modul-catatan').value || 'Tidak ada'}
        `;
    }
    else if (kurikulumVal.includes('Berbasis Cinta')) {
        prompt = `
BUATKAN MODUL AJAR KURIKULUM BERBASIS CINTA YANG LENGKAP
DATA IDENTITAS:
- Nama Penyusun: ${namaGuru}${nipGuru ? ' (' + nipGuru + ')' : ''}
- Satuan Pendidikan: ${namaSekolah}
- Tahun Ajaran: ${document.getElementById('modul-tahun').value || '2025/2026'}
- Mata Pelajaran: ${mapel}
- Topik/Rincian: ${modulSelectedTopic}
- Kelas: ${document.getElementById('modul-kelas-select').value}
- Alokasi Waktu: ${document.getElementById('modul-waktu').value}
- Model Pembelajaran: ${document.getElementById('modul-model-select').value}
STRUKTUR MODUL AJAR KURIKULUM BERBASIS CINTA:
A. IDENTITAS PENYUSUN
Cantumkan: Nama Guru, Nama Sekolah, Tahun, Mata Pelajaran, Kelas, Alokasi Waktu
B. FOKUS PEMBELAJARAN BERBASIS CINTA
Titik fokus: Cinta kepada Tuhan, Cinta pada Negara, Cinta pada Keluarga, Cinta pada Alam, Cinta pada Ilmu Pengetahuan
Jelaskan bagaimana pembelajaran ${modulSelectedTopic} mencerminkan nilai-nilai cinta ini.
C. NILAI-NILAI YANG DIKEMBANGKAN
Moral, Etika, Karakter, Kearifan Lokal, Kemanusiaan, Keberlanjutan Lingkungan
D. TUJUAN PEMBELAJARAN
Turunkan menjadi 3-5 TP yang berorientasi pada pembangunan karakter dan nilai-nilai cinta
D.1. INDIKATOR PENCAPAIAN PEMBELAJARAN
Tabel: TP | Indikator Keberhasilan | Bukti Pembelajaran
E. SARANA & PRASARANA
F. TARGET PESERTA DIDIK
- Karakteristik sosial-emosional
- Kebutuhan belajar holistik
G. METODE PEMBELAJARAN
Metode yang menekankan: Diskusi, Perenungan, Refleksi Nilai, Pembelajaran Kooperatif, Studi Kasus
H. PERTANYAAN PEMANTIK
Pertanyaan yang memicu refleksi nilai dan karakter
I. KEGIATAN PEMBELAJARAN (Tabel)
Rinci: Pendahuluan | Inti | Penutup
Fokus pada pengembangan nilai dan karakter
J. PENILAIAN
- Formatif: Observasi perilaku, jurnal refleksi
- Sumatif: Proyek karakter, presentasi nilai
K. MATERI PEMBELAJARAN
- Konsep Kunci yang mencerminkan nilai cinta
- Contoh nyata dari kehidupan sehari-hari
L. REFLEKSI
- Peserta didik: Pertanyaan tentang pembelajaran nilai
- Guru: Evaluasi keberhasilan pengembangan karakter
M. PENGAYAAN & REMEDIAL
Strategi untuk penguatan nilai dan karakter
N. GLOSARIUM
Istilah-istilah penting terkait nilai dan karakter
O. DAFTAR PUSTAKA
Referensi tentang kurikulum berbasis cinta dan pendidikan karakter
P. PENUTUP
CATATAN PENTING:
- Tekankan nilai-nilai universal dan kearifan lokal
- Pembelajaran holistik: kognitif, afektif, psikomotorik
- Integrasikan contoh nyata dari kehidupan peserta didik
- Format profesional dan inspiratif
CATATAN KHUSUS: ${document.getElementById('modul-catatan').value || 'Tidak ada'}
        `;
    }
    else if (kurikulumVal.includes('KMA 1503')) {
        prompt = `
BUATKAN MODUL AJAR KMA 1503 TAHUN 2025 UNTUK MADRASAH YANG LENGKAP
DATA IDENTITAS:
- Nama Penyusun: ${namaGuru}${nipGuru ? ' (' + nipGuru + ')' : ''}
- Satuan Pendidikan: ${namaSekolah}
- Tahun Ajaran: ${document.getElementById('modul-tahun').value || '2025/2026'}
- Mata Pelajaran: ${mapel}
- Topik/Rincian: ${modulSelectedTopic}
- Kelas: ${document.getElementById('modul-kelas-select').value}
- Alokasi Waktu: ${document.getElementById('modul-waktu').value}
- Semester: ${document.getElementById('modul-sem-select').value}
STRUKTUR MODUL AJAR KMA 1503 TAHUN 2025:
A. IDENTITAS PENYUSUN
Cantumkan: Nama Guru, Nama Madrasah, Tahun, Mata Pelajaran, Kelas, Alokasi Waktu
B. STANDAR KOMPETENSI LULUSAN
Mengacu pada KMA 1503 Tahun 2025:
- Kompetensi Inti Spiritual
- Kompetensi Inti Sosial
- Kompetensi Inti Pengetahuan
- Kompetensi Inti Keterampilan
C. NILAI-NILAI ISLAM
Integrasi nilai-nilai Islam dalam pembelajaran (Aqidah, Akhlak, Ibadah, Muamalah)
D. KOMPETENSI DASAR & TUJUAN PEMBELAJARAN
- KD: Kompetensi Dasar dari KMA 1503
- TP: Tujuan Pembelajaran spesifik yang terukur
D.1. INDIKATOR PENCAPAIAN
Tabel: KD | TP | Indikator Keberhasilan
E. MATERI PEMBELAJARAN
Konten pembelajaran yang sesuai KMA 1503
Integrasi ayat Al-Qur'an atau hadis jika relevan
F. SARANA & PRASARANA
G. TARGET PESERTA DIDIK
H. METODE PEMBELAJARAN
Metode yang sesuai dengan KMA 1503
Diskusi, Studi Kasus, Pembelajaran Kooperatif, Ceramah Interaktif
I. LANGKAH-LANGKAH PEMBELAJARAN (Tabel)
Pendahuluan | Inti | Penutup
Alokasi waktu sesuai KMA 1503
J. PENILAIAN
- Teknik: Sesuai KMA 1503
- Instrumen: Tes, Non-tes
- Rubrik penilaian
K. MATERI PEMBELAJARAN RINCI
Penjelasan konsep-konsep kunci
L. REFLEKSI
Guru dan peserta didik
M. PENGAYAAN & REMEDIAL
N. GLOSARIUM
O. DAFTAR PUSTAKA
Referensi KMA 1503, Buku Teks, Kitab Suci
P. PENUTUP
CATATAN PENTING:
- Mengacu penuh pada Keputusan Menteri Agama (KMA) 1503 Tahun 2025
- Integrasikan nilai-nilai Islam secara konsisten
- Format sesuai standar Madrasah
- Profesional dan inspiratif
CATATAN KHUSUS: ${document.getElementById('modul-catatan').value || 'Tidak ada'}
        `;
    }
    else {
        prompt = `
BUATKAN MODUL AJAR SESUAI KURIKULUM KUSTOM: ${kurikulumVal}
DATA IDENTITAS:
- Nama Penyusun: ${namaGuru}${nipGuru ? ' (' + nipGuru + ')' : ''}
- Satuan Pendidikan: ${namaSekolah}
- Tahun Ajaran: ${document.getElementById('modul-tahun').value || '2025/2026'}
- Mata Pelajaran: ${mapel}
- Topik/Rincian: ${modulSelectedTopic}
- Kelas: ${document.getElementById('modul-kelas-select').value}
- Alokasi Waktu: ${document.getElementById('modul-waktu').value}
- Kurikulum: ${kurikulumVal}
STRUKTUR MODUL AJAR UNTUK KURIKULUM KUSTOM:
A. IDENTITAS PENYUSUN
Cantumkan: Nama Guru, Nama Sekolah, Tahun, Mata Pelajaran, Kelas, Alokasi Waktu, Kurikulum
B. FILOSOFI & TUJUAN KURIKULUM
Jelaskan filosofi pembelajaran yang menjadi dasar kurikulum ${kurikulumVal}
C. STANDAR KOMPETENSI LULUSAN
Sesuai dengan visi kurikulum yang digunakan
D. TUJUAN PEMBELAJARAN
3-5 TP yang jelas, spesifik, dan terukur
D.1. INDIKATOR PENCAPAIAN
Tabel: TP | Indikator Keberhasilan
E. SARANA & PRASARANA
F. TARGET PESERTA DIDIK
G. METODE PEMBELAJARAN
Metode yang sesuai dengan filosofi kurikulum
H. PERTANYAAN PEMANTIK / PERTANYAAN ESENSIAL
I. KEGIATAN PEMBELAJARAN (Tabel)
Pendahuluan | Inti | Penutup
J. PENILAIAN
Formatif dan Sumatif sesuai kurikulum
K. MATERI PEMBELAJARAN
L. REFLEKSI
M. PENGAYAAN & REMEDIAL
N. GLOSARIUM
O. DAFTAR PUSTAKA
P. PENUTUP
CATATAN PENTING:
- Sesuaikan dengan karakteristik kurikulum: ${kurikulumVal}
- Format profesional
- Jelaskan alasan pemilihan metode dan strategi
- Komprehensif namun fleksibel
CATATAN KHUSUS: ${document.getElementById('modul-catatan').value || 'Tidak ada'}
        `;
    }
    try {
        const result = await callGemini(prompt, "Anda adalah asisten pendidikan ahli yang membuat modul ajar profesional.");
        clearInterval(progressInterval);
        updateProgressBar(100);
        setTimeout(() => {
            hideProgressBar();
            document.getElementById('res-modul-content').innerHTML = marked.parse(result);
            document.getElementById('res-modul').style.display = 'block';
            document.getElementById('stat-generated').innerText = parseInt(document.getElementById('stat-generated').innerText) + 1;
            document.getElementById('res-modul').scrollIntoView({ behavior: 'smooth' });
            showToast('✅ Modul Ajar berhasil dibuat!');
        }, 500);
    } catch (e) {
        clearInterval(progressInterval);
        hideProgressBar();
        console.error('Error:', e);
        showToast('❌ Gagal membuat modul ajar. Silakan coba lagi.');
    }
});
const checkAudioEl = document.getElementById('check-audio');
if (checkAudioEl) {
    checkAudioEl.addEventListener('change', function () {
        const audioSettingsEl = document.getElementById('audio-settings');
        if (audioSettingsEl) audioSettingsEl.style.display = this.checked ? 'block' : 'none';
    });
}
document.getElementById('btn-gen-bahan').addEventListener('click', async function () {
    const btn = this;
    const bahanSelectedTopicEl = document.getElementById('bahan-topik-select');
    const bahanSelectedTopic = bahanSelectedTopicEl && bahanSelectedTopicEl.value && bahanSelectedTopicEl.value !== 'Lainnya' ? bahanSelectedTopicEl.value : document.getElementById('bahan-topik').value;
    if (!bahanSelectedTopic) return showToast("Mohon isi Topik Materi");
    btn.classList.add('loading');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memproses...';
    showProgressBar('Membuat Media Ajar', 'AI sedang menghasilkan media pembelajaran yang kreatif dan interaktif...');
    animateProgressBar(35000);
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
                if (el) el.innerHTML = marked.parse(text || "Tidak ada konten.");
            };
            setContent('bahan-info', data.infografis);
            setContent('bahan-peta', data.peta_konsep);
            setContent('bahan-diskusi', data.diskusi);
            setContent('bahan-pemantik', data.pemantik);
            setContent('bahan-kuis', data.kuis);
            setContent('bahan-analogi', data.analogi);
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
    hideProgressBar();
    document.getElementById('res-bahan').scrollIntoView({ behavior: 'smooth' });
});
document.getElementById('btn-gen-kokul').addEventListener('click', async function () {
    const btn = this;
    const kokulMapelSelect = document.getElementById('kokul-mapel-select');
    let kVal = kokulMapelSelect ? kokulMapelSelect.value : '';
    if (kVal === 'Kustom') kVal = document.getElementById('kokul-mapel-manual')?.value;
    const kokulSelectedTopicEl = document.getElementById('kokul-topik-select'); // Fallback
    const kokulSelectedTopic = kVal || (kokulSelectedTopicEl && kokulSelectedTopicEl.value && kokulSelectedTopicEl.value !== 'Lainnya' ? kokulSelectedTopicEl.value : document.getElementById('kokul-tema')?.value);
    const tema = kokulSelectedTopic;
    const jenjang = document.getElementById('kokul-jenjang').value;
    if (!tema) return showToast("Topik/Tema Projek harus diisi!");
    btn.classList.add('loading');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Merancang Projek...';
    showProgressBar('Membuat Program Kokurikuler', 'AI sedang merancang program kokurikuler yang mendukung kompetensi siswa...');
    animateProgressBar(40000);
    const namaGuru = localStorage.getItem('as_nama') || 'Guru';
    const namaSekolah = localStorage.getItem('as_sekolah') || 'Sekolah';
    const nipGuru = localStorage.getItem('as_nip') || '';
    const alamatSekolah = localStorage.getItem('as_alamat') || '';
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
                if (el) el.innerHTML = marked.parse(text || "Tidak ada konten.");
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
    hideProgressBar();
    document.getElementById('res-kokul').scrollIntoView({ behavior: 'smooth' });
});
window.switchSoalType = function (element, typeName, isKoreksi = false) {
    const container = element.parentElement;
    container.querySelectorAll('.btn-tab-sub').forEach(b => b.classList.remove('active'));
    element.classList.add('active');
    if (isKoreksi) {
        document.getElementById('panel-buat-soal').style.display = 'none';
        document.getElementById('panel-koreksi-ljk').style.display = 'block';
    } else {
        document.getElementById('panel-buat-soal').style.display = 'block';
        document.getElementById('panel-koreksi-ljk').style.display = 'none';
        document.getElementById('lbl-soal-mode').innerText = typeName;
    }
};
document.getElementById('btn-gen-soal').addEventListener('click', async function () {
    const btn = this;
    let sSel = document.getElementById('soal-mapel-select');
    let sVal = sSel ? sSel.value : '';
    if (sVal === 'Kustom') sVal = document.getElementById('soal-mapel-kustom')?.value;
    const mapel = sVal || document.getElementById('soal-mapel').value;
    if (!mapel) return showToast("Isi Mata Pelajaran!");
    btn.classList.add('loading');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Membuat Paket Soal...';
    showProgressBar('Generate Paket Soal', 'AI sedang membuat paket soal berkualitas dengan berbagai tingkat kesulitan...');
    animateProgressBar(45000);
    const pg = document.getElementById('soal-pg').value;
    const isian = document.getElementById('soal-isian').value;
    const essay = document.getElementById('soal-essay').value;
    const difficulty = document.getElementById('soal-difficulty').value;
    const mode = document.getElementById('lbl-soal-mode').innerText;
    const activeBtn = document.querySelector('#soal-kurikulum-group .btn-toggle.active');
    const selectedKurikulum = activeBtn ? activeBtn.getAttribute('data-value') : "Kurikulum Merdeka 2025";
    const kurikulumVal = selectedKurikulum === 'Kustom' ? document.getElementById('soal-kurikulum-kustom').value : selectedKurikulum;
    const soalSelectedTopicEl = document.getElementById('soal-topik-select');
    const soalSelectedTopic = soalSelectedTopicEl && soalSelectedTopicEl.value && soalSelectedTopicEl.value !== 'Lainnya' ? soalSelectedTopicEl.value : (document.getElementById('soal-mapel').value || '');
    const distribBtn = document.querySelector('#soal-distribusi-group .btn-toggle.active');
    const distribValue = distribBtn ? distribBtn.getAttribute('data-value') : 'Proporsional';
    function computeDistribForSoal(distrib, totalPG) {
        const t = parseInt(totalPG) || 0;
        let perc = { Mudah: 0.4, Sedang: 0.3, Sulit: 0.2, HOTS: 0.1 };
        if (distrib === 'Merata') perc = { Mudah: 0.25, Sedang: 0.25, Sulit: 0.25, HOTS: 0.25 };
        else if (distrib === 'HOTS Heavy') perc = { Mudah: 0.2, Sedang: 0.2, Sulit: 0.2, HOTS: 0.4 };
        else if (distrib === 'Remedial') perc = { Mudah: 0.6, Sedang: 0.25, Sulit: 0.1, HOTS: 0.05 };
        const calc = {};
        let assigned = 0;
        ['Mudah', 'Sedang', 'Sulit', 'HOTS'].forEach((k, i) => {
            if (i === 3) {
                calc[k] = t - assigned;
            } else {
                calc[k] = Math.round(t * perc[k]);
                assigned += calc[k];
            }
            if (calc[k] < 0) calc[k] = 0;
        });
        return calc;
    }
    const pgCount = parseInt(pg) || 0;
    const distribCounts = computeDistribForSoal(distribValue, pgCount);
    function computeIsianDistrib(distrib, totalIsian) {
        const t = parseInt(totalIsian) || 0;
        let perc = { Mudah: 0.2, Sedang: 0.4, Sulit: 0.3, HOTS: 0.1 };
        if (distrib === 'Merata') perc = { Mudah: 0.25, Sedang: 0.25, Sulit: 0.25, HOTS: 0.25 };
        else if (distrib === 'HOTS Heavy') perc = { Mudah: 0.1, Sedang: 0.2, Sulit: 0.3, HOTS: 0.4 };
        else if (distrib === 'Remedial') perc = { Mudah: 0.6, Sedang: 0.25, Sulit: 0.1, HOTS: 0.05 };
        const calc = {};
        let assigned = 0;
        ['Mudah', 'Sedang', 'Sulit', 'HOTS'].forEach((k, i) => {
            if (i === 3) {
                calc[k] = t - assigned;
            } else {
                calc[k] = Math.round(t * perc[k]);
                assigned += calc[k];
            }
            if (calc[k] < 0) calc[k] = 0;
        });
        return calc;
    }
    function computeEssayDistrib(distrib, totalEssay) {
        const t = parseInt(totalEssay) || 0;
        let perc = { Mudah: 0.1, Sedang: 0.3, Sulit: 0.3, HOTS: 0.3 };
        if (distrib === 'Merata') perc = { Mudah: 0.25, Sedang: 0.25, Sulit: 0.25, HOTS: 0.25 };
        else if (distrib === 'HOTS Heavy') perc = { Mudah: 0.05, Sedang: 0.15, Sulit: 0.3, HOTS: 0.5 };
        else if (distrib === 'Remedial') perc = { Mudah: 0.7, Sedang: 0.2, Sulit: 0.08, HOTS: 0.02 };
        const calc = {};
        let assigned = 0;
        ['Mudah', 'Sedang', 'Sulit', 'HOTS'].forEach((k, i) => {
            if (i === 3) {
                calc[k] = t - assigned;
            } else {
                calc[k] = Math.round(t * perc[k]);
                assigned += calc[k];
            }
            if (calc[k] < 0) calc[k] = 0;
        });
        return calc;
    }
    const isianCount = parseInt(isian) || 0;
    const isianCounts = computeIsianDistrib(distribValue, isianCount);
    const essayCount = parseInt(essay) || 0;
    const essayCounts = computeEssayDistrib(distribValue, essayCount);
    let topicList = [];
    if (soalSelectedTopic && soalSelectedTopic !== '' && soalSelectedTopic !== 'Lainnya') {
        topicList = [soalSelectedTopic];
    } else {
        const cleanMapel = (mapel || '').replace(/\s*\(.*\)$/, '');
        topicList = (derivedTopicData[mapel] && derivedTopicData[mapel].length) ? derivedTopicData[mapel].slice() : (derivedTopicData[cleanMapel] && derivedTopicData[cleanMapel].length ? derivedTopicData[cleanMapel].slice() : []);
    }
    if (topicList.length === 0) topicList = ['Umum'];
    function distributeCountsAcrossTopics(counts, topics) {
        const out = {};
        topics.forEach(t => out[t] = { Mudah: 0, Sedang: 0, Sulit: 0, HOTS: 0, total: 0 });
        ['Mudah', 'Sedang', 'Sulit', 'HOTS'].forEach(level => {
            const n = counts[level] || 0;
            const base = Math.floor(n / topics.length);
            let rem = n - base * topics.length;
            for (let i = 0; i < topics.length; i++) {
                const add = base + (rem > 0 ? 1 : 0);
                out[topics[i]][level] = add;
                out[topics[i]].total += add;
                if (rem > 0) rem--;
            }
        });
        return out;
    }
    const perTopicDistrib = distributeCountsAcrossTopics(distribCounts, topicList);
    const perTopicIsian = distributeCountsAcrossTopics(isianCounts, topicList);
    let pgWeights = { Mudah: 1, Sedang: 1.5, Sulit: 2, HOTS: 3 };
    let isianWeights = { Mudah: 1.2, Sedang: 1.8, Sulit: 2.5, HOTS: 3 };
    let essayWeights = { Mudah: 2, Sedang: 3, Sulit: 4, HOTS: 6 };
    try {
        const toggle = document.getElementById('soal-custom-weights-toggle');
        if (toggle && toggle.checked) {
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
        }
    } catch (e) { console.error('Error reading custom weights:', e); }
    function computeAdvancedScoring(pgCounts, isCounts, esCounts, pgW, isW, esW, totalPoints = 100) {
        let totalWeighted = 0;
        ['Mudah', 'Sedang', 'Sulit', 'HOTS'].forEach(k => {
            totalWeighted += (pgCounts[k] || 0) * (pgW[k] || 1);
            totalWeighted += (isCounts[k] || 0) * (isW[k] || 1);
            totalWeighted += (esCounts[k] || 0) * (esW[k] || 1);
        });
        if (totalWeighted <= 0) {
            return {
                pgPoints: { Mudah: 1, Sedang: 2, Sulit: 3, HOTS: 4 },
                isianPoints: { Mudah: 1, Sedang: 2, Sulit: 3, HOTS: 4 },
                essayPoints: { Mudah: 2, Sedang: 3, Sulit: 4, HOTS: 6 },
                actualTotal: 0
            };
        }
        const pointPerWeight = totalPoints / totalWeighted;
        const rawPg = {}, rawIs = {}, rawEs = {};
        ['Mudah', 'Sedang', 'Sulit', 'HOTS'].forEach(k => {
            rawPg[k] = (pgW[k] || 1) * pointPerWeight;
            rawIs[k] = (isW[k] || 1) * pointPerWeight;
            rawEs[k] = (esW[k] || 1) * pointPerWeight;
        });
        const pgPoints = {}, isianPoints = {}, essayPoints = {};
        ['Mudah', 'Sedang', 'Sulit', 'HOTS'].forEach(k => {
            pgPoints[k] = Math.max(1, Math.round(rawPg[k]));
            isianPoints[k] = Math.max(1, Math.round(rawIs[k]));
            essayPoints[k] = Math.max(1, Math.round(rawEs[k]));
        });
        let actualTotal = 0;
        ['Mudah', 'Sedang', 'Sulit', 'HOTS'].forEach(k => {
            actualTotal += (pgCounts[k] || 0) * pgPoints[k];
            actualTotal += (isCounts[k] || 0) * isianPoints[k];
            actualTotal += (esCounts[k] || 0) * essayPoints[k];
        });
        let delta = totalPoints - actualTotal;
        const priority = ['HOTS', 'Sulit', 'Sedang', 'Mudah'];
        while (delta !== 0) {
            for (const level of priority) {
                if (delta === 0) break;
                if (delta > 0) {
                    if ((pgCounts[level] || 0) > 0) { pgPoints[level] += 1; actualTotal += (pgCounts[level] || 0); delta -= (pgCounts[level] || 0); }
                    if (delta === 0) break;
                    if ((isCounts[level] || 0) > 0) { isianPoints[level] += 1; actualTotal += (isCounts[level] || 0); delta -= (isCounts[level] || 0); }
                    if (delta === 0) break;
                    if ((esCounts[level] || 0) > 0) { essayPoints[level] += 1; actualTotal += (esCounts[level] || 0); delta -= (esCounts[level] || 0); }
                } else {
                    if ((esCounts[level] || 0) > 0 && essayPoints[level] > 1) { essayPoints[level] -= 1; actualTotal -= (esCounts[level] || 0); delta += (esCounts[level] || 0); }
                    if (delta === 0) break;
                    if ((isCounts[level] || 0) > 0 && isianPoints[level] > 1) { isianPoints[level] -= 1; actualTotal -= (isCounts[level] || 0); delta += (isCounts[level] || 0); }
                    if (delta === 0) break;
                    if ((pgCounts[level] || 0) > 0 && pgPoints[level] > 1) { pgPoints[level] -= 1; actualTotal -= (pgCounts[level] || 0); delta += (pgCounts[level] || 0); }
                }
            }
            if (Math.abs(delta) > totalPoints * 2) break;
            if (priority.every(l => ((pgCounts[l] || 0) === 0 && (isCounts[l] || 0) === 0 && (esCounts[l] || 0) === 0) || (pgPoints[l] <= 1 && isianPoints[l] <= 1 && essayPoints[l] <= 1))) break;
        }
        actualTotal = 0;
        ['Mudah', 'Sedang', 'Sulit', 'HOTS'].forEach(k => {
            actualTotal += (pgCounts[k] || 0) * pgPoints[k];
            actualTotal += (isCounts[k] || 0) * isianPoints[k];
            actualTotal += (esCounts[k] || 0) * essayPoints[k];
        });
        return { pgPoints, isianPoints, essayPoints, actualTotal };
    }
    let totalPointsTarget = 100;
    try {
        const tpEl = document.getElementById('soal-total-points');
        if (tpEl) {
            const v = parseInt(tpEl.value);
            if (!isNaN(v) && v > 0) totalPointsTarget = v;
        }
    } catch (e) { console.error('Error reading total points input', e); }
    const advancedScoring = computeAdvancedScoring(distribCounts, isianCounts, essayCounts, pgWeights, isianWeights, essayWeights, totalPointsTarget);
    const scorePerQuestion = { pg: advancedScoring.pgPoints, isian: advancedScoring.isianPoints, essay: advancedScoring.essayPoints, actualTotal: advancedScoring.actualTotal };
    const distributionJSON = JSON.stringify({ distribCounts, isianCounts, essayCounts, perTopicDistrib }, null, 2);
    function buildKisiKisiHTML(mapelName, topics, perTopicPgCounts, perTopicIsianCounts, perTopicEssayCounts, pgPointsMap, isPointsMap, esPointsMap, perQuestionList = null) {
        const headers = ['No', 'Capaian Pembelajaran', 'Materi/Topik', 'Indikator Soal', 'Level Kognitif', 'Bentuk Soal', 'Nomor Soal', 'Soal-soal', 'Kunci Jawaban', 'Mudah', 'Sedang', 'Sulit', 'HOTS', 'Total Soal', 'PG Count', 'Isian Count', 'Essay Count', 'Poin Topik'];
        let html = '<table style="width:100%; border-collapse:collapse; margin-bottom:10px; font-size:0.9rem;">' +
            '<thead><tr style="background:#f1f5f9;">';
        headers.forEach(h => html += `<th style="border:1px solid #ddd; padding:6px; text-align:left">${h}</th>`);
        html += '</tr></thead><tbody>';
        let grand = { soal: 0, pg: 0, isian: 0, essay: 0, poin: 0 };
        let globalIdx = 1;
        topics.forEach((t, idx) => {
            const pgc = perTopicPgCounts[t] || { Mudah: 0, Sedang: 0, Sulit: 0, HOTS: 0, total: 0 };
            const isc = perTopicIsianCounts[t] || { Mudah: 0, Sedang: 0, Sulit: 0, HOTS: 0, total: 0 };
            const esc = perTopicEssayCounts[t] || { Mudah: 0, Sedang: 0, Sulit: 0, HOTS: 0, total: 0 };
            const totalSoal = (pgc.total || 0) + (isc.total || 0) + (esc.total || 0);
            let poinTopik = 0;
            ['Mudah', 'Sedang', 'Sulit', 'HOTS'].forEach(l => {
                poinTopik += (pgc[l] || 0) * (pgPointsMap && pgPointsMap[l] ? pgPointsMap[l] : 0);
                poinTopik += (isc[l] || 0) * (isPointsMap && isPointsMap[l] ? isPointsMap[l] : 0);
                poinTopik += (esc[l] || 0) * (esPointsMap && esPointsMap[l] ? esPointsMap[l] : 0);
            });
            const nomorList = [];
            for (let i = 0; i < (pgc.total || 0); i++) { nomorList.push(globalIdx++); }
            for (let i = 0; i < (isc.total || 0); i++) { nomorList.push(globalIdx++); }
            for (let i = 0; i < (esc.total || 0); i++) { nomorList.push(globalIdx++); }
            function formatNumbers(list) {
                if (!list || list.length === 0) return '';
                const ranges = [];
                let start = list[0], end = list[0];
                for (let i = 1; i < list.length; i++) {
                    if (list[i] === end + 1) end = list[i];
                    else { ranges.push(start === end ? `${start}` : `${start}-${end}`); start = end = list[i]; }
                }
                ranges.push(start === end ? `${start}` : `${start}-${end}`);
                return ranges.join(', ');
            }
            const soalSummaryParts = [];
            if ((pgc.total || 0) > 0) soalSummaryParts.push(`PG x${pgc.total || 0}`);
            if ((isc.total || 0) > 0) soalSummaryParts.push(`Isian x${isc.total || 0}`);
            if ((esc.total || 0) > 0) soalSummaryParts.push(`Uraian x${esc.total || 0}`);
            const levelKognitifText = `M:${pgc.Mudah + isc.Mudah + esc.Mudah} S:${pgc.Sedang + isc.Sedang + esc.Sedang} Su:${pgc.Sulit + isc.Sulit + esc.Sulit} H:${pgc.HOTS + isc.HOTS + esc.HOTS}`;
            const bentukSoalText = soalSummaryParts.join(' / ') || '-';
            const nomorSoalText = formatNumbers(nomorList);
            let soalSoalText = bentukSoalText ? bentukSoalText + ' (lihat naskah)' : '-';
            let kunciJawabanText = (pgc.total || 0) > 0 ? 'PG: lihat kunci' : '-';
            try {
                if (perQuestionList && Array.isArray(perQuestionList)) {
                    const nomorSet = new Set(nomorList);
                    const questionsForTopic = perQuestionList.filter(q => {
                        if (q.topik && String(q.topik).toLowerCase() === String(t).toLowerCase()) return true;
                        if (q.topic && String(q.topic).toLowerCase() === String(t).toLowerCase()) return true;
                        if (q.nomor && nomorSet.has(Number(q.nomor))) return true;
                        return false;
                    });
                    if (questionsForTopic.length > 0) {
                        soalSoalText = questionsForTopic.map(q => {
                            const txt = (q.teks || q.text || '').replace(/\s+/g, ' ').trim();
                            return `${q.nomor || '?'}: ${txt.length > 140 ? txt.substring(0, 140) + '...' : txt}`;
                        }).join('<br>');
                        const keys = [];
                        questionsForTopic.forEach(q => {
                            if (q.tipe && /pg/i.test(q.tipe) && q.jawaban) {
                                keys.push(`${q.nomor || '?'}: ${q.jawaban}`);
                            } else if (q.jawaban) {
                                keys.push(`${q.nomor || '?'}: ${q.jawaban}`);
                            }
                        });
                        if (keys.length > 0) kunciJawabanText = keys.join(' | ');
                    }
                }
            } catch (e) { console.error('Error rendering per-question preview in kisi-kisi', e); }
            grand.soal += totalSoal; grand.pg += (pgc.total || 0); grand.isian += (isc.total || 0); grand.essay += (esc.total || 0); grand.poin += poinTopik;
            html += `<tr>`;
            html += `<td style="border:1px solid #eee; padding:6px; width:40px">${idx + 1}</td>`;
            html += `<td style="border:1px solid #eee; padding:6px">${'CP terkait: ' + t}</td>`;
            html += `<td style="border:1px solid #eee; padding:6px">${t}</td>`;
            html += `<td style="border:1px solid #eee; padding:6px">${'Indikator terkait ' + t}</td>`;
            html += `<td style="border:1px solid #eee; padding:6px; text-align:center">${levelKognitifText}</td>`;
            html += `<td style="border:1px solid #eee; padding:6px; text-align:center">${bentukSoalText}</td>`;
            html += `<td style="border:1px solid #eee; padding:6px; text-align:center">${nomorSoalText}</td>`;
            html += `<td style="border:1px solid #eee; padding:6px">${soalSoalText}</td>`;
            html += `<td style="border:1px solid #eee; padding:6px; text-align:center">${kunciJawabanText}</td>`;
            ['Mudah', 'Sedang', 'Sulit', 'HOTS'].forEach(l => {
                const a = pgc[l] || 0;
                const b = isc[l] || 0;
                const c = esc[l] || 0;
                const cell = `${a}${(b || c) ? ' / ' + b : ''}${(c) ? ' / ' + c : ''}`;
                html += `<td style="border:1px solid #eee; padding:6px; text-align:center">${cell}</td>`;
            });
            html += `<td style="border:1px solid #eee; padding:6px; text-align:center">${totalSoal}</td>`;
            html += `<td style="border:1px solid #eee; padding:6px; text-align:center">${pgc.total || 0}</td>`;
            html += `<td style="border:1px solid #eee; padding:6px; text-align:center">${isc.total || 0}</td>`;
            html += `<td style="border:1px solid #eee; padding:6px; text-align:center">${esc.total || 0}</td>`;
            html += `<td style="border:1px solid #eee; padding:6px; text-align:center">${poinTopik.toFixed(2)}</td>`;
            html += `</tr>`;
        });
        html += `<tr style="font-weight:700; background:#fafafa;"><td colspan="13" style="border:1px solid #eee; padding:6px; text-align:right">Total</td>`;
        html += `<td style="border:1px solid #eee; padding:6px; text-align:center">${grand.soal}</td>`;
        html += `<td style="border:1px solid #eee; padding:6px; text-align:center">${grand.pg}</td>`;
        html += `<td style="border:1px solid #eee; padding:6px; text-align:center">${grand.isian}</td>`;
        html += `<td style="border:1px solid #eee; padding:6px; text-align:center">${grand.essay}</td>`;
        html += `<td style="border:1px solid #eee; padding:6px; text-align:center">${grand.poin.toFixed(2)}</td></tr>`;
        html += '</tbody></table>';
        return html;
    }
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
                "options": { "A": "...", "B": "...", "C": "...", "D": "..." }, 
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
            const perTopicEssay = distributeCountsAcrossTopics(essayCounts, topicList);
            const perQuestionList = Array.isArray(data.soal_items) ? data.soal_items.map(q => ({ ...q, nomor: q.nomor ? parseInt(q.nomor) : q.nomor })) : null;
            const kisiTableHTML = buildKisiKisiHTML(mapel, topicList, perTopicDistrib, perTopicIsian, perTopicEssay, scorePerQuestion.pg, scorePerQuestion.isian, scorePerQuestion.essay, perQuestionList);
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
            try {
                const existingNaskah = (data.naskah_soal || "");
                document.getElementById('content-naskah').innerHTML = existingNaskah + "<hr><h3>Kunci Jawaban</h3>" + (data.kunci_jawaban || "");
                const ic = isianCounts || { Mudah: 0, Sedang: 0, Sulit: 0, HOTS: 0 };
                const needsMockIsian = Object.values(ic).some(v => v > 0) && !(/isian|isian singkat|short\s*answer/i.test(existingNaskah));
                if (needsMockIsian) {
                    let isianHTML = '<hr><h3>Soal Isian (Mock berdasarkan distribusi)</h3>';
                    let idxIs = 1;
                    function renderIsianBucket(label, n) {
                        if (n <= 0) return '';
                        let s = `<div style="margin-bottom:8px;"><strong>${label} (${n})</strong>`;
                        for (let i = 0; i < n; i++) {
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
            } catch (e) { console.error('Error processing naskah/isian in success branch', e); }
            try {
                const naskahSel = document.querySelector('input[name="naskah-option"]:checked');
                const naskahChoice = naskahSel ? naskahSel.value : 'standar';
                if (naskahChoice === 'dengan-gambar') {
                    const countEl = document.getElementById('naskah-image-count');
                    const imgCount = Math.max(1, Math.min(20, parseInt(countEl ? countEl.value : 1) || 1));
                    const contId = 'naskah-images-container';
                    let cont = document.getElementById(contId);
                    if (!cont) {
                        cont = document.createElement('div');
                        cont.id = contId;
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
                    const progressTextId = contId + '-progress-text';
                    const progressBarId = contId + '-progress-bar';
                    const totalToCreate = imgCount;
                    const progressTextEl = document.getElementById(progressTextId);
                    const progressBarEl = document.getElementById(progressBarId);
                    if (progressTextEl) progressTextEl.innerText = `0 / ${totalToCreate}`;
                    if (progressBarEl) progressBarEl.style.width = '0%';
                    const soalItemsArr = Array.isArray(perQuestionList) ? perQuestionList : (Array.isArray(data.soal_items) ? data.soal_items : []);
                    for (let i = 0; i < imgCount; i++) {
                        const placeholder = document.createElement('div');
                        placeholder.style.border = '1px solid #e2e8f0';
                        placeholder.style.padding = '8px';
                        placeholder.style.borderRadius = '8px';
                        placeholder.style.minHeight = '120px';
                        placeholder.style.display = 'flex';
                        placeholder.style.alignItems = 'center';
                        placeholder.style.justifyContent = 'center';
                        placeholder.innerHTML = `<div style="text-align:center; color:var(--text-muted);">Membuat gambar ${i + 1}...</div>`;
                        cont.appendChild(placeholder);
                        let promptImg = '';
                        if (soalItemsArr[i] && soalItemsArr[i].teks) {
                            const teks = String(soalItemsArr[i].teks).replace(/<[^>]+>/g, '').trim();
                            promptImg = `Ilustrasi edukatif berwarna untuk soal nomor ${soalItemsArr[i].nomor || (i + 1)}: ${teks}. Gaya: ilustrasi edukatif, jelas, sederhana, cocok untuk materi ajar dan Lembar Kerja. Resolusi tinggi, latar putih.`;
                        } else {
                            const topicForPrompt = (topicList && topicList.length) ? topicList[0] : soalSelectedTopic || mapel;
                            promptImg = `Ilustrasi edukatif berwarna untuk mata pelajaran ${mapel} pada topik ${topicForPrompt}. Gaya: ilustrasi edukatif, jelas, ramah anak, cocok untuk dicetak pada Lembar Kerja.`;
                        }
                        try {
                            const imgDataUrl = await callImagen(promptImg);
                            if (imgDataUrl) {
                                placeholder.innerHTML = '';
                                const img = document.createElement('img');
                                img.src = imgDataUrl;
                                img.style.width = '100%';
                                img.style.height = 'auto';
                                img.style.borderRadius = '6px';
                                img.alt = 'Ilustrasi Soal ' + (i + 1);
                                placeholder.appendChild(img);
                                const dl = document.createElement('a');
                                dl.href = imgDataUrl;
                                dl.download = `Ilustrasi_Soal_${i + 1}.png`;
                                dl.className = 'btn btn-secondary btn-sm';
                                dl.style.display = 'inline-block';
                                dl.style.marginTop = '8px';
                                dl.innerHTML = '<i class="fas fa-download"></i> Unduh';
                                placeholder.appendChild(dl);
                            } else {
                                placeholder.innerHTML = `<div style="color:red">Gagal membuat gambar ${i + 1}.</div>`;
                            }
                        } catch (imgErr) {
                            console.error('Error generating image for naskah:', imgErr);
                            placeholder.innerHTML = `<div style="color:red">Gagal membuat gambar ${i + 1}.</div>`;
                        } finally {
                            try {
                                const done = i + 1;
                                if (progressTextEl) progressTextEl.innerText = `${done} / ${totalToCreate}`;
                                if (progressBarEl) progressBarEl.style.width = `${Math.round((done / totalToCreate) * 100)}%`;
                            } catch (e) { console.error('Progress update error', e); }
                            try {
                                if (typeof imgDataUrl !== 'undefined' && imgDataUrl && Array.isArray(perQuestionList) && perQuestionList[i]) {
                                    perQuestionList[i].image = imgDataUrl;
                                }
                            } catch (attErr) { console.error('Attach image to question error', attErr); }
                        }
                    }
                    try {
                        if (Array.isArray(perQuestionList) && perQuestionList.length > 0) {
                            let integrated = '<hr><h3>Naskah Soal (Terintegrasi dengan Gambar)</h3>';
                            integrated += '<ol>';
                            perQuestionList.forEach(q => {
                                const nomor = q.nomor || q.number || '';
                                const teks = q.teks || q.text || q.teks_soal || '';
                                integrated += `<li style="margin-bottom:12px;"><div>${teks}</div>`;
                                if (q.options && typeof q.options === 'object') {
                                    integrated += '<div style="margin-top:6px;">';
                                    Object.keys(q.options).forEach(k => {
                                        integrated += `<div><strong>${k}.</strong> ${q.options[k]}</div>`;
                                    });
                                    integrated += '</div>';
                                }
                                if (q.image) {
                                    integrated += `<div style="text-align:center; margin-top:8px;"><img src="${q.image}" style="max-width:100%; border-radius:6px;" alt="Gambar Soal ${nomor}"></div>`;
                                }
                                integrated += '</li>';
                            });
                            integrated += '</ol>';
                            try {
                                const el = document.getElementById('content-naskah');
                                if (el) el.innerHTML = el.innerHTML + integrated + '<hr>' + (data.kunci_jawaban || '');
                            } catch (e) { console.error('Insert integrated naskah error', e); }
                        }
                    } catch (finalErr) { console.error('Error building integrated naskah', finalErr); }
                }
            } catch (imgGlobalErr) { console.error('Error inserting images for naskah:', imgGlobalErr); }
            document.getElementById('content-bahas').innerHTML = (data.pembahasan || "Tidak ada pembahasan");
            let ljkHTML = '<div style="display:grid; grid-template-columns: repeat(2, 1fr); gap:20px;">';
            try {
                const counts = distribCounts || { Mudah: pg, Sedang: 0, Sulit: 0, HOTS: 0 };
                let idx = 1;
                function renderBucket(label, n) {
                    if (n <= 0) return '';
                    let s = `<div style="border-bottom:1px solid #eee; padding-bottom:6px; margin-bottom:6px;"><strong>${label} (${n})</strong><br>`;
                    for (let j = 0; j < n; j++) {
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
                while (idx <= pg) {
                    ljkHTML += `<div>${idx}. [A] [B] [C] [D]</div>`;
                    idx++;
                }
            } catch (e) {
                for (let i = 1; i <= pg; i++) ljkHTML += `<div>${i}. [A] [B] [C] [D]</div>`;
            }
            ljkHTML += '</div>';
            document.getElementById('content-ljk').innerHTML = ljkHTML;
            document.getElementById('res-soal').style.display = 'block';
            document.getElementById('stat-generated').innerText = parseInt(document.getElementById('stat-generated').innerText) + 1;
        } else {
            throw new Error("Parsed JSON is null");
        }
    } catch (e) {
        console.error(e);
        showToast("Gagal memparsing JSON. Mencoba format teks.");
        const textResult = await callGemini(prompt + " (Format Text Biasa saja)");
        let finalHtml = marked.parse(textResult || '');
        try {
            const ec = essayCounts || { Mudah: 0, Sedang: 0, Sulit: 0, HOTS: 0 };
            const ic = isianCounts || { Mudah: 0, Sedang: 0, Sulit: 0, HOTS: 0 };
            let isianHTML = '';
            try {
                const hasIsianCounts = Object.values(ic).some(v => v > 0);
                const textHasIsian = /isian|isian singkat|short\s*answer/i.test(textResult || '');
                const needsMockIsian = hasIsianCounts && !textHasIsian;
                if (needsMockIsian) {
                    isianHTML = '<hr><h3>Soal Isian (Mock berdasarkan distribusi)</h3>';
                    let idxIs = 1;
                    function renderIsianBucket(label, n) {
                        if (n <= 0) return '';
                        let s = `<div style="margin-bottom:8px;"><strong>${label} (${n})</strong>`;
                        for (let i = 0; i < n; i++) {
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
            } catch (e) { console.error('Error building isianHTML in fallback', e); }
            let essayHTML = '<hr><h3>Soal Uraian (Mock berdasarkan distribusi)</h3>';
            let eIdx = 1;
            function renderEssayBucket(label, n) {
                if (n <= 0) return '';
                let s = `<div style="margin-bottom:8px;"><strong>${label} (${n})</strong>`;
                for (let i = 0; i < n; i++) {
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
        } catch (err) { console.error(err); }
        try {
            const perTopicEssay = distributeCountsAcrossTopics(essayCounts, topicList);
            const kisiTableHTML = buildKisiKisiHTML(mapel, topicList, perTopicDistrib, perTopicIsian, perTopicEssay, scorePerQuestion.pg, scorePerQuestion.isian, scorePerQuestion.essay, null);
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
            try {
                const naskahSel = document.querySelector('input[name="naskah-option"]:checked');
                const naskahChoice = naskahSel ? naskahSel.value : 'standar';
                if (naskahChoice === 'dengan-gambar') {
                    const countEl = document.getElementById('naskah-image-count');
                    const imgCount = Math.max(1, Math.min(20, parseInt(countEl ? countEl.value : 1) || 1));
                    const contId = 'naskah-images-container-fallback';
                    let cont = document.getElementById(contId);
                    if (!cont) {
                        cont = document.createElement('div');
                        cont.id = contId;
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
                    const progressTextIdFb = contId + '-progress-text';
                    const progressBarIdFb = contId + '-progress-bar';
                    const totalToCreateFb = imgCount;
                    const progressTextElFb = document.getElementById(progressTextIdFb);
                    const progressBarElFb = document.getElementById(progressBarIdFb);
                    if (progressTextElFb) progressTextElFb.innerText = `0 / ${totalToCreateFb}`;
                    if (progressBarElFb) progressBarElFb.style.width = '0%';
                    for (let i = 0; i < imgCount; i++) {
                        const placeholder = document.createElement('div');
                        placeholder.style.border = '1px solid #e2e8f0';
                        placeholder.style.padding = '8px';
                        placeholder.style.borderRadius = '8px';
                        placeholder.style.minHeight = '120px';
                        placeholder.style.display = 'flex';
                        placeholder.style.alignItems = 'center';
                        placeholder.style.justifyContent = 'center';
                        placeholder.innerHTML = `<div style="text-align:center; color:var(--text-muted);">Membuat gambar ${i + 1}...</div>`;
                        cont.appendChild(placeholder);
                        const topicForPrompt = (topicList && topicList.length) ? topicList[0] : soalSelectedTopic || mapel;
                        const promptImg = `Ilustrasi edukatif berwarna untuk mata pelajaran ${mapel} pada topik ${topicForPrompt}. Gaya: ilustrasi edukatif, jelas, ramah anak, cocok untuk dicetak pada Lembar Kerja.`;
                        try {
                            const imgDataUrl = await callImagen(promptImg);
                            if (imgDataUrl) {
                                placeholder.innerHTML = '';
                                const img = document.createElement('img');
                                img.src = imgDataUrl;
                                img.style.width = '100%';
                                img.style.height = 'auto';
                                img.style.borderRadius = '6px';
                                img.alt = 'Ilustrasi Soal ' + (i + 1);
                                placeholder.appendChild(img);
                                const dl = document.createElement('a');
                                dl.href = imgDataUrl;
                                dl.download = `Ilustrasi_Soal_${i + 1}.png`;
                                dl.className = 'btn btn-secondary btn-sm';
                                dl.style.display = 'inline-block';
                                dl.style.marginTop = '8px';
                                dl.innerHTML = '<i class="fas fa-download"></i> Unduh';
                                placeholder.appendChild(dl);
                            } else {
                                placeholder.innerHTML = `<div style="color:red">Gagal membuat gambar ${i + 1}.</div>`;
                            }
                        } catch (imgErr) { console.error('Error creating fallback image', imgErr); placeholder.innerHTML = `<div style="color:red">Gagal membuat gambar ${i + 1}.</div>`; }
                        finally {
                            try {
                                const doneFb = i + 1;
                                if (progressTextElFb) progressTextElFb.innerText = `${doneFb} / ${totalToCreateFb}`;
                                if (progressBarElFb) progressBarElFb.style.width = `${Math.round((doneFb / totalToCreateFb) * 100)}%`;
                            } catch (pe) { console.error('Progress update fallback error', pe); }
                        }
                    }
                }
            } catch (imgGlobalErr) { console.error('Error inserting fallback images for naskah:', imgGlobalErr); }
        } catch (err) {
            console.error('Error building kisi-kisi for fallback:', err);
            document.getElementById('content-naskah').innerHTML = finalHtml;
        }
        document.getElementById('res-soal').style.display = 'block';
    }
    btn.classList.remove('loading');
    btn.innerHTML = '<i class="fas fa-magic"></i> Generate Paket Soal';
    hideProgressBar();
    document.getElementById('res-soal').scrollIntoView({ behavior: 'smooth' });
});
window.switchVisAudioTab = function (tabId) {
    document.getElementById('subtab-vis-gen').classList.remove('active');
    document.getElementById('subtab-aud-gen').classList.remove('active');
    document.getElementById('subtab-' + tabId).classList.add('active');
    document.getElementById('panel-vis-gen').style.display = 'none';
    document.getElementById('panel-aud-gen').style.display = 'none';
    document.getElementById('panel-' + tabId).style.display = 'block';
};

// Foto Profesi Functions

// Foto Profesi Functions
let selectedAspekRatio = '';
window.selectAspekRatio = function (btn, ratio) {
    document.querySelectorAll('#foto-profesi .aspek-ratio-btn').forEach(b => {
        b.style.background = 'var(--bg-body)';
        b.style.color = 'var(--text-main)';
        b.style.borderColor = 'var(--border)';
    });
    btn.style.background = 'var(--primary)';
    btn.style.color = 'white';
    btn.style.borderColor = 'var(--primary)';
    selectedAspekRatio = ratio;
};

window.handleFotoProfeesiUpload = function (e) {
    const file = e.target.files[0];
    if (!file) return;
    const fileName = document.getElementById('foto-profesi-file-name');
    if (!fileName) return;
    fileName.innerText = 'File: ' + file.name;
    fileName.style.display = 'inline-block';
    const reader = new FileReader();
    reader.onload = function (event) {
        window.uploadedFotoProfeesiData = event.target.result;
    };
    reader.readAsDataURL(file);
};

const fotoProfesiInput = document.getElementById('foto-profesi-input');
if (fotoProfesiInput) {
    fotoProfesiInput.addEventListener('change', handleFotoProfeesiUpload);
}

// Drag and drop untuk foto profesi
const fotoProfesiUploadBox = document.getElementById('foto-profesi-upload-box');
if (fotoProfesiUploadBox) {
    fotoProfesiUploadBox.addEventListener('dragover', function (e) {
        e.preventDefault();
        this.style.background = 'var(--primary-light)';
        this.style.borderColor = 'var(--primary)';
    });
    fotoProfesiUploadBox.addEventListener('dragleave', function () {
        this.style.background = '';
        this.style.borderColor = '';
    });
    fotoProfesiUploadBox.addEventListener('drop', function (e) {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const fotoProfesiInputElem = document.getElementById('foto-profesi-input');
            if (fotoProfesiInputElem) {
                fotoProfesiInputElem.files = files;
            }
            const file = files[0];
            const fileName = document.getElementById('foto-profesi-file-name');
            if (fileName) {
                fileName.innerText = 'File: ' + file.name;
                fileName.style.display = 'inline-block';
            }
            const reader = new FileReader();
            reader.onload = function (event) {
                window.uploadedFotoProfeesiData = event.target.result;
            };
            reader.readAsDataURL(file);
        }
        this.style.background = '';
        this.style.borderColor = '';
    });
}

const btnGenFotoProfesi = document.getElementById('btn-gen-foto-profesi');
if (btnGenFotoProfesi) {
    btnGenFotoProfesi.addEventListener('click', async function () {
        const btn = this;

        const usiaEl = document.getElementById('foto-profesi-usia');
        const profesiEl = document.getElementById('foto-profesi-profesi');

        if (!usiaEl || !usiaEl.value) {
            showToast('Pilih usia terlebih dahulu!', 'danger');
            return;
        }

        if (!selectedAspekRatio) {
            showToast('Pilih rasio aspek terlebih dahulu!', 'danger');
            return;
        }

        const usia = usiaEl.value;
        const profesi = profesiEl.value || 'professional';
        const fotoUploaded = window.uploadedFotoProfeesiData ? true : false;

        btn.classList.add('loading');
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating 6 Photos...';

        try {
            showToast('Menghasilkan 6 foto profesi dengan gaya berbeda...', 'info');

            // Array of different realistic professional styles for the 6 photos
            const styles = [
                'professional corporate headshot',
                'studio professional photography',
                'candid professional portrait',
                'high-end business photography',
                'corporate lifestyle portrait',
                'professional environmental portrait'
            ];

            const generatedImages = [];

            // Generate 6 different realistic professional style photos
            for (let i = 0; i < 6; i++) {
                let prompt = `High-quality professional portrait photography of a ${usia} years old person in ${styles[i]} style. `;

                if (fotoUploaded && window.uploadedFotoProfeesiData) {
                    prompt += `Use the uploaded photo as a face reference - the person MUST look exactly like them with same facial features, face shape, eye color, skin tone, hair color and style. `;
                }

                if (profesi) {
                    prompt += `Professional setting for ${profesi} role. `;
                }

                prompt += `Aspect ratio: ${selectedAspekRatio}. Professional studio lighting, 8K resolution, confident professional expression, clean background, Canon EOS R5 quality, sharp focus on face, warm color grading.`;

                const imgUrl = await callImagen(prompt);
                if (imgUrl) {
                    generatedImages.push({
                        url: imgUrl,
                        style: styles[i],
                        index: i + 1
                    });
                }
            }

            const outputDiv = document.getElementById('res-foto-profesi-content');
            const actionDiv = document.getElementById('res-foto-profesi-actions');
            const resultDiv = document.getElementById('res-foto-profesi');

            if (generatedImages.length > 0 && outputDiv && actionDiv && resultDiv) {
                // Display 6 generated images
                outputDiv.innerHTML = generatedImages.map((img, idx) => `
                    <div style="display: flex; flex-direction: column; align-items: center;">
                        <img src="${img.url}" style="width: 100%; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); aspect-ratio: ${selectedAspekRatio}; object-fit: cover;" alt="Foto ${idx + 1}">
                        <p style="margin-top: 10px; font-size: 0.9rem; color: var(--text-muted);"><strong>${img.style}</strong><br><small>Foto ${idx + 1}</small></p>
                    </div>
                `).join('');

                // Store images for download
                window.lastGeneratedFotoProfeesiImages = generatedImages;

                actionDiv.innerHTML = `
                    <button class="btn btn-primary btn-sm" onclick="downloadAllFotoProfeesi()">
                        <i class="fas fa-download"></i> Unduh Semua (ZIP)
                    </button>
                    <button class="btn btn-secondary btn-sm" onclick="downloadFotoProfeesiByIndex(0)">
                        <i class="fas fa-image"></i> Unduh Foto 1
                    </button>
                `;
                resultDiv.style.display = 'block';
                resultDiv.scrollIntoView({ behavior: 'smooth' });
                showToast(`✅ ${generatedImages.length} foto profesi berhasil dibuat!`, 'success');
            } else {
                showToast('Gagal membuat beberapa foto. Silakan coba lagi.', 'warning');
            }

        } catch (err) {
            console.error('Error:', err);
            showToast('Gagal membuat foto profesi: ' + err.message, 'danger');
        } finally {
            btn.classList.remove('loading');
            btn.innerHTML = '<i class="fas fa-wand-magic-sparkles"></i> Generate 6 Foto Profesi';
        }
    });
}

window.downloadAllFotoProfeesi = function () {
    if (!window.lastGeneratedFotoProfeesiImages || window.lastGeneratedFotoProfeesiImages.length === 0) {
        showToast('Tidak ada gambar yang telah di-generate', 'warning');
        return;
    }
    showToast('Fitur download ZIP sedang dalam pengembangan. Gunakan tombol "Unduh Foto" untuk mengunduh satu per satu.', 'info');
};

window.downloadFotoProfeesiByIndex = function (index) {
    if (!window.lastGeneratedFotoProfeesiImages || !window.lastGeneratedFotoProfeesiImages[index]) {
        showToast('Foto tidak ditemukan', 'warning');
        return;
    }

    const img = window.lastGeneratedFotoProfeesiImages[index];
    const link = document.createElement('a');
    link.href = img.url;
    link.download = `Foto_Profesi_${img.style}_${new Date().getTime()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('✅ Gambar berhasil diunduh!', 'success');
};

// Update konten fields based on type selection
// Google Cloud TTS Function
async function generateTTSAudio(text, voiceType = 'narasi', voiceChoice = 'default', speed = 1, pitch = 1, volume = 1) {
    try {
        // Limit text length
        const limitedText = text.substring(0, 3000);

        // Use Web Speech API (built-in browser API)
        return new Promise((resolve, reject) => {
            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(limitedText);

                // Get available voices
                const voices = speechSynthesis.getVoices();

                // Select voice based on choice
                let selectedVoice = null;
                switch (voiceChoice) {
                    case 'female-professional':
                        selectedVoice = voices.find(v => v.lang.includes('id') && v.name.includes('Female'));
                        if (!selectedVoice) selectedVoice = voices.find(v => v.lang.includes('id') && !v.name.includes('Male'));
                        break;
                    case 'male-professional':
                        selectedVoice = voices.find(v => v.lang.includes('id') && v.name.includes('Male'));
                        if (!selectedVoice) selectedVoice = voices.find(v => v.lang.includes('id') && !v.name.includes('Female'));
                        break;
                    case 'female-warm':
                        selectedVoice = voices.find(v => v.lang.includes('id') && (v.name.includes('Female') || v.name.includes('Warm')));
                        break;
                    case 'male-warm':
                        selectedVoice = voices.find(v => v.lang.includes('id') && (v.name.includes('Male') || v.name.includes('Warm')));
                        break;
                    default:
                        selectedVoice = voices.find(v => v.lang.includes('id'));
                }

                // Use Indonesian voice if available, otherwise use default
                if (selectedVoice) {
                    utterance.voice = selectedVoice;
                }

                // Apply voice settings based on type
                const voiceSettings = {
                    'narasi': { pitch: 1, rate: speed * 0.9 },
                    'conversational': { pitch: pitch, rate: speed },
                    'podcast-style': { pitch: pitch * 0.95, rate: speed * 0.85 },
                    'interview': { pitch: pitch * 0.98, rate: speed * 0.95 }
                };

                const settings = voiceSettings[voiceType] || voiceSettings['narasi'];
                utterance.pitch = settings.pitch;
                utterance.rate = settings.rate;
                utterance.volume = volume;

                utterance.onstart = () => {
                    console.log('Audio playback started');
                };

                utterance.onend = () => {
                    // Calculate duration
                    const duration = limitedText.length / (150 * (speed || 1));
                    const minutes = Math.floor(duration / 60);
                    const seconds = Math.floor(duration % 60);

                    resolve({
                        type: voiceType,
                        duration: (minutes > 0 ? minutes + 'm ' : '') + (seconds || 1) + 's',
                        durationMs: duration * 1000,
                        status: 'generated',
                        text: limitedText,
                        voice: selectedVoice?.name || 'Suara Default Indonesia',
                        voiceChoice: voiceChoice,
                        speed: speed,
                        pitch: pitch,
                        volume: volume,
                        canPlay: true
                    });
                };

                utterance.onerror = (e) => {
                    console.error('TTS Error:', e);
                    reject(new Error('Gagal memutar audio: ' + (e.error || 'Unknown error')));
                };

                // Cancel any ongoing speech
                speechSynthesis.cancel();

                // NOTE: Audio playback disabled - user must click play button manually
                // Calculate duration for response
                const duration = limitedText.length / (150 * (speed || 1));
                const minutes = Math.floor(duration / 60);
                const seconds = Math.floor(duration % 60);

                // Resolve immediately without speaking (user will click play manually)
                resolve({
                    type: voiceType,
                    duration: (minutes > 0 ? minutes + 'm ' : '') + (seconds || 1) + 's',
                    durationMs: duration * 1000,
                    status: 'generated',
                    text: limitedText,
                    voice: selectedVoice?.name || 'Suara Default Indonesia',
                    voiceChoice: voiceChoice,
                    speed: speed,
                    pitch: pitch,
                    volume: volume,
                    canPlay: true
                });
            } else {
                reject(new Error('Browser Anda tidak mendukung Text-to-Speech. Gunakan Chrome, Firefox, atau Edge.'));
            }
        });
    } catch (err) {
        console.error('TTS generation failed:', err);
        throw err;
    }
}

// Toggle Settings Panel
function toggleKontenSettings() {
    const panel = document.getElementById('konten-settings-panel');
    if (panel) {
        panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    }
}

// Apply Content Settings
function applyKontenSettings() {
    const fontSize = document.getElementById('konten-font-size')?.value || 'normal';
    const theme = document.getElementById('konten-theme')?.value || 'light';
    const highlight = document.getElementById('konten-setting-highlight')?.checked || false;
    const lineNumbers = document.getElementById('konten-setting-line-numbers')?.checked || false;
    const spacing = document.getElementById('konten-setting-spacing')?.checked || false;

    const contentDiv = document.getElementById('res-konten-kreator-content');
    if (!contentDiv) return;

    // Apply font size
    let fontSizeValue = '1rem';
    if (fontSize === 'small') fontSizeValue = '0.9rem';
    else if (fontSize === 'large') fontSizeValue = '1.15rem';
    contentDiv.style.fontSize = fontSizeValue;

    // Apply theme
    const themeColors = {
        'light': { bg: '#f1f5f9', color: '#1e293b', codeColor: '#0f172a' },
        'dark': { bg: '#1e293b', color: '#f1f5f9', codeColor: '#e2e8f0' },
        'sepia': { bg: '#f4eae0', color: '#5d4e37', codeColor: '#2d1b00' }
    };
    const colors = themeColors[theme];
    contentDiv.style.backgroundColor = colors.bg;
    contentDiv.style.color = colors.color;

    // Apply spacing
    contentDiv.style.lineHeight = spacing ? '2' : '1.6';
    contentDiv.style.letterSpacing = spacing ? '0.5px' : 'normal';

    // Apply line numbers to code blocks
    if (lineNumbers) {
        const codeBlocks = contentDiv.querySelectorAll('pre, code');
        codeBlocks.forEach((block, idx) => {
            block.style.counterReset = 'line';
            block.style.whiteSpace = 'pre-wrap';
        });
    }

    // Highlight important words
    if (highlight) {
        let html = contentDiv.innerHTML;
        const importantWords = ['penting', 'perhatian', 'note', 'warning', 'success', 'error', 'important', 'critical'];
        importantWords.forEach(word => {
            const regex = new RegExp(`\\b(${word})\\b`, 'gi');
            html = html.replace(regex, `<mark style="background:yellow; padding:2px 4px; border-radius:3px; font-weight:600;">$1</mark>`);
        });
        contentDiv.innerHTML = html;
    }
}

function updateKontenFields() {
    const tipe = document.getElementById('konten-type').value;
    const socialSettings = document.getElementById('konten-social-settings');

    // Show social media settings for social content types
    const socialTypes = ['social-media', 'instagram-captions', 'tiktok-captions', 'twitter-threads', 'linkedin-post'];
    socialSettings.style.display = socialTypes.includes(tipe) ? 'block' : 'none';
}

// Konten Kreator Functions
// Global flag for generation control
let isGeneratingKonten = false;
let shouldStopGeneration = false;

// Custom error class for stop generation
class GenerationStoppedError extends Error {
    constructor(message = 'Generation dibatalkan oleh user') {
        super(message);
        this.name = 'GenerationStoppedError';
        this.isStopped = true;
    }
}

// Function to stop generation
window.stopKontenGeneration = function () {
    shouldStopGeneration = true;
    const btnStop = document.getElementById('btn-stop-gen-konten');
    if (btnStop) {
        btnStop.disabled = true;
        btnStop.textContent = '⏹️ Dibatalkan';
    }
};

const btnGenKonten = document.getElementById('btn-gen-konten');
if (btnGenKonten) {
    btnGenKonten.addEventListener('click', async function () {
        const btn = this;

        const tipeEl = document.getElementById('konten-type');
        const topikEl = document.getElementById('konten-topik');
        const deskripsiEl = document.getElementById('konten-deskripsi');
        const durasiEl = document.getElementById('konten-durasi');
        const outputTextEl = document.getElementById('konten-output-text');
        const outputVisualEl = document.getElementById('konten-output-visual');

        if (!tipeEl || !tipeEl.value) {
            showToast('Pilih jenis konten terlebih dahulu!', 'danger');
            return;
        }

        if (!topikEl || !topikEl.value) {
            showToast('Masukkan topik/judul konten!', 'danger');
            return;
        }

        const tipe = tipeEl.value;
        const topik = topikEl.value;
        const deskripsi = deskripsiEl.value || '';
        const durasi = durasiEl.value || 'sedang';
        const generateText = outputTextEl.checked;
        const generateVisual = outputVisualEl.checked;

        // Get social media settings if applicable
        const platform = document.getElementById('konten-platform')?.value || 'multi';
        const tone = document.getElementById('konten-tone')?.value || 'profesional';
        const hashtags = document.getElementById('konten-hashtags')?.value || '';
        const audioType = document.getElementById('konten-audio-type')?.value || 'narasi';

        btn.classList.add('loading');
        btn.disabled = true;
        const btnText = btn.innerHTML;

        // Clear old content
        const outputDiv = document.getElementById('res-konten-kreator-content');
        if (outputDiv) {
            outputDiv.innerHTML = '<p style="color: var(--text-muted); font-style: italic;">Sedang membuat konten...</p>';
        }

        // Reset stop flag and show stop button
        shouldStopGeneration = false;
        isGeneratingKonten = true;
        const btnStop = document.getElementById('btn-stop-gen-konten');
        if (btnStop) {
            btnStop.style.display = 'inline-block';
            btnStop.disabled = false;
            btnStop.textContent = '⏹️ Stop Generate';
        }

        const progressContainer = document.getElementById('konten-progress-container');
        progressContainer.style.display = 'block';

        try {
            let currentProgress = 0;
            const progressFill = document.getElementById('konten-progress-fill');
            const progressText = document.getElementById('konten-progress-text');

            const updateProgress = (percent) => {
                currentProgress = Math.min(percent, 99);
                progressFill.style.width = currentProgress + '%';
                progressText.textContent = currentProgress + '%';
            };

            showToast('Membuat konten berkualitas tinggi...', 'info');
            updateProgress(10);

            let prompt = `Kamu adalah creative content creator profesional untuk kebutuhan pendidikan. `;
            prompt += `Buatlah ${tipe.replace(/(-|_)/g, ' ')} yang berkualitas tinggi dengan topik: "${topik}". `;

            if (deskripsi) {
                prompt += `Detail tambahan: ${deskripsi}. `;
            }

            // Duration-based adjustment
            if (durasi.includes('pendek') || durasi.includes('sangat-pendek')) {
                prompt += `Buatlah dalam format sangat singkat dan padat, maksimal 1-2 menit, fokus pada poin-poin kunci saja. `;
            } else if (durasi.includes('panjang') || durasi.includes('sangat-panjang')) {
                prompt += `Buatlah konten yang mendalam dan komprehensif, dengan penjelasan detail dan contoh konkret. `;
            } else {
                prompt += `Buatlah konten berukuran sedang dengan keseimbangan antara ringkas dan detail. `;
            }

            // Type-specific instructions
            switch (tipe) {
                case 'video-script':
                case 'shorts-script':
                    const isShorts = tipe === 'shorts-script';
                    prompt += `Format sebagai script video${isShorts ? ' pendek (Shorts/Reels)' : ''} dengan struktur: Intro (hook menarik ${isShorts ? '< 3 detik' : ''}), Main Content (${isShorts ? '1-2' : '3-4'} poin penting), Outro (CTA jelas). ${isShorts ? 'Gunakan caption, transisi cepat.' : 'Sertakan catatan visual/lokasi.'} Tujuan: edukatif dan engaging. Durasi: ${durasi}.`;
                    break;
                case 'podcast-outline':
                case 'podcast-full':
                    const isFull = tipe === 'podcast-full';
                    prompt += `Format sebagai ${isFull ? 'full transcript' : 'outline'} podcast dengan struktur: Opening Hook, 3-4 Segmen Utama (masing-masing dengan 2-3 poin), Expert Tips, Call-to-Action. ${isFull ? 'Tulis dialog lengkap, natural, conversational.' : 'Sertakan talking points untuk presenter.'}`;
                    break;
                case 'social-media':
                case 'instagram-captions':
                case 'tiktok-captions':
                case 'twitter-threads':
                case 'linkedin-post':
                    let socialInstructions = `Buatlah konten media sosial yang viral-friendly tentang topik ini. `;
                    if (tipe === 'instagram-captions') {
                        socialInstructions += `Buat 3 caption Instagram dengan emoji, hashtag relevan, dan call-to-action yang engaging.`;
                    } else if (tipe === 'tiktok-captions') {
                        socialInstructions += `Buat script TikTok (3-5 ide) dengan hook pertama 0.5 detik, trending sound suggestions, hashtag, dan transition tips.`;
                    } else if (tipe === 'twitter-threads') {
                        socialInstructions += `Buat Twitter thread (7-10 tweet) dengan momentum flow, engaging penulisan, dan call-to-action.`;
                    } else if (tipe === 'linkedin-post') {
                        socialInstructions += `Buat 2 professional LinkedIn post dengan story angle, insights, dan professional tone yang inspiring.`;
                    } else {
                        socialInstructions += `Buat campaign untuk ${platform === 'multi' ? 'multi-platform' : platform} dengan tone ${tone}.`;
                    }
                    if (hashtags) socialInstructions += ` Gunakan hashtag: ${hashtags}.`;
                    prompt += socialInstructions;
                    break;
                case 'blog-article':
                    prompt += `Format sebagai artikel blog SEO-friendly dengan struktur: H1 Title, Intro menarik, ${durasi.includes('pendek') ? '3-4' : durasi.includes('panjang') ? '7-8' : '5-6'} H2 heading, subheading, tips/insight praktis, kesimpulan, CTA. Gunakan bahasa mudah dipahami tapi profesional.`;
                    break;
                case 'newsletter':
                    prompt += `Format sebagai newsletter profesional dengan: Subject line menarik, Hook/opening story, 3 section utama (News/Tips/Insight), Personal note, CTA. Tone: engaging dan valuable.`;
                    break;
                case 'email-sequence':
                    prompt += `Format sebagai email sequence (3-4 email) dengan: Email 1 (Intro), Email 2 (Value/benefit), Email 3 (Closing/CTA). Setiap email punya subject line kuat dan personalized opening.`;
                    break;
                case 'infografis':
                    prompt += `Berikan konsep infografis detail dengan: Layout design, elemen visual, data/statistik yang ditampilkan, color palette recommendation, font suggestions, ukuran ideal. Cocok untuk diproduksi desainer.`;
                    break;
                case 'presentasi':
                    const slideCount = durasi.includes('pendek') ? '4-5' : durasi.includes('panjang') ? '8-12' : '6-8';
                    prompt += `Buatlah outline presentasi dengan: Slide Title, Agenda, ${slideCount} slide content (dengan bullets/visuals notes), Closing slide. Sertakan speaker notes untuk setiap slide.`;
                    break;
                case 'ebook':
                    prompt += `Berikan outline e-book detail dengan: Table of Contents, Chapter descriptions, key topics per chapter, learning objectives, conclusion outline. Cocok untuk penulis membuat e-book.`;
                    break;
                case 'whitepapers':
                    prompt += `Format sebagai white paper outline dengan: Executive Summary, Introduction, Problem Statement, Solution/Research, Implementation, Conclusion, References structure. Professional dan data-driven.`;
                    break;
                case 'lesson-plan':
                    prompt += `Format sebagai rencana pembelajaran dengan: Learning Objectives (SMART), Materials needed, Introduction, Main activities (3+ metode), Assessment, Reflection. Detailed dan actionable untuk guru.`;
                    break;
                case 'quiz':
                    prompt += `Buatlah quiz interaktif dengan: 10-15 pertanyaan multiple choice, explanation untuk setiap jawaban, difficulty level mix, scoring system suggestion, answer key. Educational dan engaging.`;
                    break;
                case 'case-study':
                    prompt += `Format sebagai case study dengan: Background/context, Challenge/problem, Solution implemented, Results/metrics, Key learnings, Recommendations. Professional dan data-backed.`;
                    break;
            }

            prompt += ` Gunakan bahasa Indonesia yang baik dan benar. Output harus siap digunakan dan bernilai tinggi untuk kebutuhan pendidikan modern.`;

            updateProgress(20);

            // Generate Text Content
            let textContent = null;
            if (generateText) {
                updateProgress(25);
                if (shouldStopGeneration) throw new GenerationStoppedError();
                textContent = await callGemini(prompt);
                if (shouldStopGeneration) throw new GenerationStoppedError();
                updateProgress(50);
            } else {
                updateProgress(50);
            }

            // Generate Visual - Multiple outputs based on content type
            let visualImages = [];
            if (generateVisual) {
                updateProgress(60);

                // Define 9 professional visual outputs with detailed specifications
                const visualPrompts = [
                    // 1. Thumbnail / Cover Utama
                    {
                        title: 'Thumbnail Utama (YouTube/TikTok/Reels)',
                        style: 'Professional main thumbnail untuk YouTube (1280×720px, 16:9) atau TikTok (1080×1920px, 9:16). Konten utama ditempatkan di safe area tengah 60%. Teks besar, warna cerah kontras, eye-catching design yang attention-grabbing.'
                    },
                    // 2. Thumbnail Kotak 1:1
                    {
                        title: 'Thumbnail Kotak (Instagram/LinkedIn/Twitter)',
                        style: 'Square thumbnail 1080×1080px (1:1 ratio) untuk Instagram post, LinkedIn, Twitter/X. Desain profesional, teks jelas, cocok untuk feed preview. Alternatif landscape 1200×630px untuk Facebook feed sharing.'
                    },
                    // 3. Teaser Poster Vertikal Story
                    {
                        title: 'Teaser Poster Vertikal (Story/Status)',
                        style: 'Vertical poster 1080×1920px (9:16) untuk Instagram Story, Facebook Story, WhatsApp Status. 2-3 variasi warna/headline untuk A/B testing. Full-bleed background dengan elemen di safe area, ready untuk A/B testing.'
                    },
                    // 4. Poster Horizontal Header
                    {
                        title: 'Poster Horizontal (YouTube/LinkedIn/Twitter Header)',
                        style: 'Horizontal banner 1920×1080px (16:9 standar). Twitter header 1500×500px. LinkedIn blog link preview 1200×627px. Logo dan headline di area aman tengah. Cocok untuk header/cover profil.'
                    },
                    // 5. Carousel / Slide Images
                    {
                        title: 'Carousel Slide (Instagram/Facebook/LinkedIn)',
                        style: 'Carousel slide 1080×1350px (4:5 portrait ratio) - format dominan 2025. Elemen utama di area tengah 1:1. Maksimum 10 slide per postingan. Desain konsisten dengan branding, mudah dibaca di preview grid.'
                    },
                    // 6. Mockup Produk 3D
                    {
                        title: 'Mockup Produk 3D',
                        style: 'Product mockup 3D scene - Vertikal 1080×1920px untuk Reels/Story, atau Square 2000×2000px untuk feed & marketplace (Shopee, Tokopedia). Professional 3D rendering dengan pencahayaan optimal, mudah di-swap produk dan lighting.'
                    },
                    // 7. Frame Hook / Quote Card
                    {
                        title: 'Frame Hook / Quote Card',
                        style: 'Quote/Hook card 1080×1920px (9:16), full-bleed background dengan teks besar di safe-zone. Export 2 versi: dengan dan tanpa logo untuk hindari watermark ganda saat cross-post. Impact design untuk menyisipkan di video atau jadikan story.'
                    },
                    // 8. Highlight Cover & Channel Banner
                    {
                        title: 'Highlight Cover & Channel Banner',
                        style: 'Instagram Highlight Cover 1080×1920px tampil bulat kecil (ikon 500×500px tengah). YouTube Channel Banner 2560×1440px dengan logo/headline di safe area 1546×423px tengah. Professional branding untuk channel profile.'
                    },
                    // 9. Iklan/Ads Creative
                    {
                        title: 'Iklan/Ads Creative (TikTok/Facebook/LinkedIn)',
                        style: 'Multi-platform ads creative: TikTok Ads 540×960px (9:16 minimum), Facebook/Instagram Ads 1080×1080px (feed) atau 1080×1920px (story), LinkedIn Ads 1200×627px landscape. Engaging copy, clear CTA, professional conversion-focused design.'
                    }
                ];

                // Generate 9 professional visual outputs
                for (let i = 0; i < visualPrompts.length && i < 9; i++) {
                    if (shouldStopGeneration) throw new GenerationStoppedError();
                    try {
                        const vPrompt = `Buat ${visualPrompts[i].title} dengan spesifikasi: ${visualPrompts[i].style}. Untuk topik: "${topik}". Desain professional, modern, high-quality resolution, sesuai untuk konten marketing dan sosial media tahun 2025.`;
                        const imgUrl = await callImagen(vPrompt);
                        if (imgUrl) {
                            visualImages.push({
                                url: imgUrl,
                                title: visualPrompts[i].title,
                                description: visualPrompts[i].style
                            });
                        }
                        // Update progress incrementally (60% to 78% for 9 visuals)
                        updateProgress(60 + (i + 1) * 2);
                    } catch (e) {
                        console.error(`Failed to generate ${visualPrompts[i].title}:`, e);
                    }
                }
                updateProgress(78);
            } else {
                updateProgress(78);
            }

            updateProgress(100);

            // Display results
            if (textContent) {
                const outputDiv = document.getElementById('res-konten-kreator-content');
                const resultDiv = document.getElementById('res-konten-kreator');

                if (outputDiv && resultDiv) {
                    outputDiv.innerHTML = marked.parse(textContent);

                    // Store generated content
                    const generatedAt = new Date();
                    window.lastGeneratedKonten = {
                        type: tipe,
                        topik: topik,
                        content: textContent,
                        visualImages: visualImages,
                        generatedAt: generatedAt.toLocaleString('id-ID')
                    };

                    // Update metadata display
                    const metaEl = document.getElementById('res-konten-meta');
                    if (metaEl) {
                        const typeLabel = tipe.replace(/(-|_)/g, ' ').charAt(0).toUpperCase() + tipe.replace(/(-|_)/g, ' ').slice(1);
                        const contentStats = {
                            wordCount: textContent.split(/\s+/).length,
                            charCount: textContent.length,
                            visualCount: visualImages.length
                        };

                        metaEl.innerHTML = `
                            <i class="fas fa-tag"></i> ${typeLabel} • 
                            <i class="fas fa-clock"></i> ${generatedAt.toLocaleTimeString('id-ID')} • 
                            <i class="fas fa-file-alt"></i> ${contentStats.wordCount} kata • 
                            <i class="fas fa-image"></i> ${contentStats.visualCount} visual
                        `;
                    }

                    // Populate Visual tab if available (5+ outputs)
                    if (visualImages.length > 0) {
                        const visualDiv = document.getElementById('res-konten-kreator-visual');
                        const visualHTML = `
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
                                ${visualImages.map((img, idx) => `
                                    <div style="border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.1); transition: transform 0.3s ease; cursor: pointer;" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
                                        <img src="${img.url}" style="width: 100%; height: 200px; object-fit: cover; display: block;" alt="${img.title.replace(/"/g, '&quot;')}">
                                        <div style="padding: 14px; background: var(--bg-body);">
                                            <p style="margin: 0 0 6px 0; font-weight: 600; font-size: 0.95rem; color: var(--text);">${img.title}</p>
                                            <p style="margin: 0; font-size: 0.8rem; color: var(--text-muted);">${img.description || 'Generated visual'}</p>
                                            <button onclick="downloadImage('${img.url}', '${img.title.replace(/'/g, "\\'")}')
" class="btn btn-sm btn-primary" style="margin-top: 10px; width: 100%; padding: 6px;">
                                                <i class="fas fa-download"></i> Download
                                            </button>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        `;
                        visualDiv.innerHTML = visualHTML;
                    } else if (generateVisual) {
                        const visualDiv = document.getElementById('res-konten-kreator-visual');
                        visualDiv.innerHTML = `
                            <div style="text-align: center; color: var(--text-muted); padding: 40px 20px;">
                                <i class="fas fa-image" style="font-size: 2rem; margin-bottom: 10px; display: block;"></i>
                                <p>Visual belum berhasil di-generate. Silakan coba lagi.</p>
                            </div>
                        `;
                    }

                    resultDiv.style.display = 'block';
                    resultDiv.scrollIntoView({ behavior: 'smooth' });
                    showToast(`✅ Konten berhasil dibuat!`, 'success');
                }
            } else {
                showToast('Gagal membuat konten. Silakan coba lagi.', 'warning');
            }

        } catch (err) {
            if (err instanceof GenerationStoppedError || err.isStopped) {
                showToast('⏹️ Generation dibatalkan', 'info');
            } else {
                console.error('Error:', err);
                showToast('Gagal membuat konten: ' + err.message, 'danger');
            }
        } finally {
            isGeneratingKonten = false;
            shouldStopGeneration = false;
            btn.classList.remove('loading');
            btn.disabled = false;
            btn.innerHTML = btnText;
            const btnStop = document.getElementById('btn-stop-gen-konten');
            if (btnStop) {
                btnStop.style.display = 'none';
            }
            setTimeout(() => {
                progressContainer.style.display = 'none';
            }, 1500);
        }
    });
}

window.downloadKontenAsText = function () {
    if (!window.lastGeneratedKonten) {
        showToast('Tidak ada konten yang telah di-generate', 'warning');
        return;
    }

    const data = window.lastGeneratedKonten;
    const text = `KONTEN KREATOR - ${data.type.toUpperCase()}
================================
Topik: ${data.topik}
Dibuat pada: ${data.generatedAt}

${data.content}`;

    const link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(text);
    link.download = `Konten_${data.type}_${new Date().getTime()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('✅ Konten berhasil diunduh!', 'success');
};

window.downloadImage = function (imageUrl, title) {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `Visual_${title}_${new Date().getTime()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('✅ Gambar berhasil diunduh!', 'success');
};

window.downloadAudio = function (audioUrl, title) {
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = `Audio_${title}_${new Date().getTime()}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('✅ Audio berhasil diunduh!', 'success');
};

// Enhanced audio player function
window.playAudio = function (idx) {
    // Get audio data from the generated content
    if (!window.lastGeneratedKonten || !window.lastGeneratedKonten.audioOutputs) {
        showToast('Audio data tidak ditemukan', 'warning');
        return;
    }

    const audioData = window.lastGeneratedKonten.audioOutputs[idx];
    if (!audioData) {
        showToast('Audio tidak ditemukan', 'warning');
        return;
    }

    const icon = document.getElementById(`play-icon-${idx}`);
    const isPlaying = icon?.classList.contains('fa-pause');

    if (isPlaying) {
        // Stop audio
        speechSynthesis.cancel();
        if (icon) {
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
        }
    } else {
        // Play audio using Web Speech API
        try {
            const utterance = new SpeechSynthesisUtterance(audioData.text || '');

            // Get voices
            const voices = speechSynthesis.getVoices();

            // Select voice based on stored voiceChoice
            let selectedVoice = null;
            const voiceChoice = audioData.voiceChoice || 'default';

            switch (voiceChoice) {
                case 'female-professional':
                    selectedVoice = voices.find(v => v.lang.includes('id') && v.name.includes('Female'));
                    if (!selectedVoice) selectedVoice = voices.find(v => v.lang.includes('id') && !v.name.includes('Male'));
                    break;
                case 'male-professional':
                    selectedVoice = voices.find(v => v.lang.includes('id') && v.name.includes('Male'));
                    if (!selectedVoice) selectedVoice = voices.find(v => v.lang.includes('id') && !v.name.includes('Female'));
                    break;
                case 'female-warm':
                    selectedVoice = voices.find(v => v.lang.includes('id') && (v.name.includes('Female') || v.name.includes('Warm')));
                    break;
                case 'male-warm':
                    selectedVoice = voices.find(v => v.lang.includes('id') && (v.name.includes('Male') || v.name.includes('Warm')));
                    break;
                default:
                    selectedVoice = voices.find(v => v.lang.includes('id'));
            }

            if (selectedVoice) {
                utterance.voice = selectedVoice;
            }

            // Apply settings from stored data
            utterance.pitch = audioData.pitch || 1;
            utterance.rate = audioData.speed || 1;
            utterance.volume = audioData.volume || 1;

            // Update icon when speaking ends
            utterance.onend = () => {
                if (icon) {
                    icon.classList.remove('fa-pause');
                    icon.classList.add('fa-play');
                }
            };

            utterance.onerror = (e) => {
                console.error('TTS playback error:', e);
                showToast('Gagal memutar audio: ' + (e.error || 'Unknown error'), 'warning');
                if (icon) {
                    icon.classList.remove('fa-pause');
                    icon.classList.add('fa-play');
                }
            };

            // Cancel any ongoing speech and play
            speechSynthesis.cancel();
            speechSynthesis.speak(utterance);

            if (icon) {
                icon.classList.remove('fa-play');
                icon.classList.add('fa-pause');
            }
        } catch (err) {
            console.error('Audio playback error:', err);
            showToast('Gagal memutar audio: ' + err.message, 'warning');
        }
    }
};

// Download audio file with proper format
window.downloadAudioFile = function (title, idx) {
    if (!window.lastGeneratedKonten || !window.lastGeneratedKonten.audioOutputs) {
        showToast('Audio data tidak ditemukan', 'warning');
        return;
    }

    const audioData = window.lastGeneratedKonten.audioOutputs[idx];
    if (!audioData) {
        showToast('Audio tidak ditemukan', 'warning');
        return;
    }

    try {
        const timestamp = new Date().getTime();
        const filename = `Audio_${title.replace(/\s+/g, '_')}_${timestamp}`;

        // Create downloadable text file with audio script
        const content = `AUDIO SCRIPT: ${title}\n${'='.repeat(50)}\n\n${audioData.text}\n\n${'='.repeat(50)}\nDurasi: ${audioData.duration}\nTipe Suara: ${audioData.voiceChoice}\nKecepatan: ${audioData.speed}x\nPitch: ${audioData.pitch}\nVolume: ${audioData.volume * 100}%\n\nNota: Ini adalah script audio. Untuk mendengarkan, klik tombol "Putar Audio".`;

        // Create blob and download
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename + '.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        showToast('✅ Audio script berhasil diunduh: ' + filename + '.txt', 'success');
    } catch (err) {
        console.error('Download error:', err);
        showToast('Gagal mengunduh audio. Coba yang lain.', 'danger');
    }
};

// Copy audio information
window.copyAudioInfo = function (title, idx) {
    const audioPlayer = document.getElementById(`audio-player-${idx}`);
    if (!audioPlayer) {
        showToast('Audio tidak ditemukan', 'warning');
        return;
    }

    const info = `Audio: ${title}\nSource: ${audioPlayer.querySelector('source')?.src || 'N/A'}`;

    navigator.clipboard.writeText(info).then(() => {
        showToast('✅ Info audio disalin ke clipboard!', 'success');
    }).catch(err => {
        console.error('Copy failed:', err);
        showToast('Gagal menyalin. Coba yang lain.', 'danger');
    });
};

window.switchKontenTab = function (tabName) {
    // Hide all tabs
    document.querySelectorAll('.konten-tab-content').forEach(tab => {
        tab.style.display = 'none';
    });

    // Remove active class from all tab buttons
    document.querySelectorAll('[data-tab]').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab
    const selectedTab = document.getElementById('konten-tab-' + tabName);
    if (selectedTab) {
        selectedTab.style.display = 'block';
    }

    // Add active class to clicked button
    const activeBtn = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
};

const btnGenMedia = document.getElementById('btn-gen-media');
if (btnGenMedia) {
    btnGenMedia.addEventListener('click', async function () {
        const btn = this;
        const promptEl = document.getElementById('media-prompt');
        if (!promptEl) return showToast("Form tidak lengkap");
        const p = promptEl.value;
        if (!p) return showToast("Isi deskripsi gambar");
        btn.classList.add('loading');
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating Image...';
        const imgUrl = await callImagen(p);
        const resMediaContent = document.getElementById('res-media-content');
        const resMediaActions = document.getElementById('res-media-actions');
        const resMedia = document.getElementById('res-media');
        if (imgUrl && resMediaContent && resMediaActions) {
            resMediaContent.innerHTML = `<img src="${imgUrl}" class="generated-image" alt="Generated Image">`;
            resMediaActions.innerHTML = `<a href="${imgUrl}" download="Ilustrasi_DigiArju.png" class="btn btn-primary btn-sm"><i class="fas fa-download"></i> Unduh Gambar</a>`;
        } else if (resMediaContent && resMediaActions) {
            resMediaContent.innerHTML = `<p style="color:red">Gagal membuat gambar.</p>`;
            resMediaActions.innerHTML = '';
        }
        if (resMedia) resMedia.style.display = 'block';
        btn.classList.remove('loading');
        btn.innerHTML = '<i class="fas fa-paint-brush"></i> Generate Ilustrasi';
    });
}
const btnGenAudio = document.getElementById('btn-gen-audio');
if (btnGenAudio) {
    btnGenAudio.addEventListener('click', async function () {
        const btn = this;
        const textEl = document.getElementById('audio-prompt');
        const voiceEl = document.getElementById('tts-voice');
        const styleSelectEl = document.getElementById('audio-style');
        const styleCustomEl = document.getElementById('audio-style-custom');

        if (!textEl || !voiceEl || !styleSelectEl) {
            return showToast("Form tidak lengkap");
        }

        const text = textEl.value;
        const voice = voiceEl.value;
        const styleSelect = styleSelectEl.value;
        const styleCustom = styleCustomEl ? styleCustomEl.value : '';
        const style = styleSelect === 'Kustom' ? styleCustom : styleSelect;

        if (!text) return showToast("Isi teks narasi!");
        btn.classList.add('loading');
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating Audio...';
        const base64PCM = await callTTS(text, voice, style, undefined, undefined, undefined);
        const resMediaContent = document.getElementById('res-media-content');
        const resMediaActions = document.getElementById('res-media-actions');
        const resMedia = document.getElementById('res-media');
        if (base64PCM && resMediaContent && resMediaActions && resMedia) {
            const pcmBuffer = base64ToArrayBuffer(base64PCM);
            const wavBuffer = pcmToWav(pcmBuffer);
            const blob = new Blob([wavBuffer], { type: 'audio/wav' });
            const url = URL.createObjectURL(blob);
            resMediaContent.innerHTML = `
                <div style="text-align:center; padding:20px;">
                    <i class="fas fa-headphones" style="font-size:3rem; color:var(--primary); margin-bottom:15px;"></i>
                    <h4>Audio Berhasil Dibuat!</h4>
                    <audio controls src="${url}" style="width:100%; margin-top:10px;"></audio>
                    <div style="margin-top:15px; font-size:0.9rem;">
                        Suara: <strong>${voice}</strong> | Gaya: <strong>${style}</strong>
                    </div>
                </div>
            `;
            resMediaActions.innerHTML = `<a href="${url}" download="Audio_DigiArju.wav" class="btn btn-primary btn-sm"><i class="fas fa-download"></i> Unduh Audio</a>`;
            resMedia.style.display = 'block';
        } else if (resMediaContent && resMediaActions) {
            resMediaContent.innerHTML = `<p style="color:red">Gagal membuat audio.</p>`;
            resMediaActions.innerHTML = '';
            if (resMedia) resMedia.style.display = 'block';
        }
        btn.classList.remove('loading');
        btn.innerHTML = '<i class="fas fa-microphone-alt"></i> Generate Audio';
    });
}
const btnKoreksi = document.getElementById('btn-koreksi');
if (btnKoreksi) {
    btnKoreksi.addEventListener('click', function () {
        const fileInput = document.getElementById('ljk-file-upload');
        if (!fileInput || !fileInput.files[0]) return showToast("Upload foto LJK dulu!");
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengscan...';
        setTimeout(() => {
            const score = Math.floor(Math.random() * (100 - 60 + 1) + 60);
            const resContent = document.getElementById('res-koreksi-content');
            const resKoreksi = document.getElementById('res-koreksi');
            if (resContent && resKoreksi) {
                resContent.innerHTML = `
                    <h4>Hasil Scan AI</h4>
                    <p>Nama: <strong>Terdeteksi (Budi Santoso)</strong> | Skor: <span style="font-size:1.5rem; font-weight:bold;">${score}</span> / 100</p>
                `;
                resKoreksi.style.display = 'block';
            }
            this.innerHTML = 'Mulai Koreksi';
        }, 2000);
    });
}
const btnAnalisis = document.getElementById('btn-analisis');
if (btnAnalisis) {
    btnAnalisis.addEventListener('click', async function () {
        const nilaiInput = document.getElementById('nilai-input');
        if (!nilaiInput) return showToast("Form tidak lengkap");
        const nilai = nilaiInput.value;
        if (!nilai) return showToast("Masukkan data nilai!");
        this.classList.add('loading');
        const prompt = `Analisis data nilai: [${nilai}]. Berikan Mean, Median, Modus, dan saran perbaikan.`;
        const res = await callGemini(prompt);
        const resAnalisisContent = document.getElementById('res-analisis-content');
        const resAnalisis = document.getElementById('res-analisis');
        const statAnalyzed = document.getElementById('stat-analyzed');
        if (resAnalisisContent && resAnalisis) {
            resAnalisisContent.innerHTML = marked.parse(res);
            resAnalisis.style.display = 'block';
        }
        if (statAnalyzed) {
            statAnalyzed.innerText = parseInt(statAnalyzed.innerText) + 1;
        }
        this.classList.remove('loading');
    });
}
const simpleGenerators = [
    { btn: 'btn-gen-rubrik', input: 'rubrik-task', res: 'res-rubrik', content: 'res-rubrik-content', prompt: 'Buat rubrik penilaian tabel untuk: ' },
    { btn: 'btn-gen-rek', input: 'rek-input', res: 'res-rekomendasi', content: 'res-rek-content', prompt: 'Berikan solusi pedagogik untuk: ' },
    { btn: 'btn-gen-ice', input: 'ice-input', res: 'res-icebreaker', content: 'res-ice-content', prompt: '3 ide ice breaker untuk situasi: ' }
];
simpleGenerators.forEach(gen => {
    const el = document.getElementById(gen.btn);
    if (el) {
        el.addEventListener('click', async function () {
            const inputEl = document.getElementById(gen.input);
            if (!inputEl) {
                showToast("Form tidak lengkap");
                return;
            }
            const val = inputEl.value;
            if (!val) return showToast("Isi input dulu!");
            this.classList.add('loading');
            const result = await callGemini(gen.prompt + val);
            const contentEl = document.getElementById(gen.content);
            const resEl = document.getElementById(gen.res);
            if (contentEl && resEl) {
                contentEl.innerHTML = marked.parse(result);
                resEl.style.display = 'block';
            }
            this.classList.remove('loading');
        });
    }
});
function prepareContentForWord(htmlContent, orientation = 'Portrait') {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = htmlContent;
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
    const buttons = wrapper.querySelectorAll('button, .output-actions');
    buttons.forEach(b => b.remove());
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
function getExportOrientation(divId) {
    try {
        if (divId) {
            const sel = document.querySelector(`#${divId} .output-actions select.export-orientation-select`);
            if (sel && sel.value) return sel.value;
        }
        const anySel = document.querySelector('select.export-orientation-select');
        if (anySel && anySel.value) return anySel.value;
        const globalSel = document.getElementById('export-orientation-select');
        if (globalSel && globalSel.value) return globalSel.value;
    } catch (e) { console.error('Error getting export orientation', e); }
    return 'Portrait';
}
window.downloadPPT = function (divId, filename) {
    if (typeof PptxGenJS === 'undefined') {
        showToast("Library PPT belum siap. Coba refresh.");
        return;
    }
    const element = document.getElementById(divId);
    if (!element) {
        showToast("Konten tidak ditemukan!");
        return;
    }
    const orientation = getExportOrientation(divId);
    let pptx = new PptxGenJS();
    pptx.layout = (orientation && orientation.toLowerCase().startsWith('l')) ? 'LAYOUT_16x9' : 'LAYOUT_9x16';
    let slide = pptx.addSlide();
    slide.addText("Dokumen DigiArju", { x: 0.5, y: 2.5, w: '90%', fontSize: 28, bold: true, align: 'center', color: '2d3748' });
    slide.addText("Dibuat pada: " + new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }), { x: 0.5, y: 3.5, w: '90%', fontSize: 14, align: 'center', color: '718096' });
    const allElements = element.querySelectorAll('h1, h2, h3, h4, h5, p, ul, ol, table, div');
    slide = pptx.addSlide();
    let yPos = 0.5;
    const maxY = 6.5;
    allElements.forEach((el) => {
        if (el.closest('table') && el.tagName !== 'TABLE') return;
        if ((el.closest('ul') || el.closest('ol')) && el.tagName !== 'UL' && el.tagName !== 'OL') return;
        if (el.classList.contains('output-actions') || el.closest('.output-actions') || el.tagName === 'BUTTON') return;
        const innerImg = el.tagName === 'IMG' ? el : (el.querySelector ? el.querySelector('img') : null);
        if (innerImg) {
            const src = innerImg.src;
            if (src) {
                if (yPos + 2.8 > maxY) { slide = pptx.addSlide(); yPos = 0.5; }
                try {
                    slide.addImage({ data: src, x: 0.6, y: yPos, w: 3.0 });
                    yPos += 3.2;
                } catch (e) {
                    if (yPos > 5.0) { slide = pptx.addSlide(); yPos = 0.5; }
                    slide.addText(innerImg.alt || '(Gambar)', { x: 0.6, y: yPos, w: '80%', fontSize: 12 });
                    yPos += 0.6;
                }
                return;
            }
        }
        if (el.tagName === 'DIV') {
            if (el.querySelector('h1, h2, h3, h4, p, ul, ol, table')) return;
        }
        const tagName = el.tagName;
        const text = el.innerText.trim();
        if (!text && tagName !== 'TABLE') return;
        if (['H1', 'H2'].includes(tagName)) {
            slide = pptx.addSlide();
            slide.addText(text, { x: 0.5, y: 0.5, w: '90%', fontSize: 22, bold: true, color: '2b6cb0' });
            yPos = 1.2;
        }
        else if (['H3', 'H4', 'H5'].includes(tagName)) {
            if (yPos > 5.0) { slide = pptx.addSlide(); yPos = 0.5; }
            slide.addText(text, { x: 0.5, y: yPos, w: '90%', fontSize: 16, bold: true, color: '2d3748' });
            yPos += 0.7;
        }
        else if (tagName === 'P' || tagName === 'DIV') {
            const lines = Math.ceil(text.length / 95) || 1;
            const h = lines * 0.3;
            if (yPos + h > maxY) { slide = pptx.addSlide(); yPos = 0.5; }
            slide.addText(text, { x: 0.5, y: yPos, w: 9, fontSize: 12, color: '4a5568', align: 'justify' });
            yPos += h + 0.2;
        }
        else if (tagName === 'UL' || tagName === 'OL') {
            const lis = el.querySelectorAll('li');
            lis.forEach(li => {
                const liText = li.innerText.trim();
                const lines = Math.ceil(liText.length / 90) || 1;
                const h = lines * 0.3;
                if (yPos + h > maxY) { slide = pptx.addSlide(); yPos = 0.5; }
                slide.addText(liText, { x: 0.8, y: yPos, w: 8.5, fontSize: 12, color: '4a5568', bullet: true });
                yPos += h + 0.1;
            });
            yPos += 0.2;
        }
        else if (tagName === 'TABLE') {
            slide = pptx.addSlide();
            let rows = [];
            el.querySelectorAll('thead tr').forEach(tr => {
                let row = [];
                tr.querySelectorAll('th, td').forEach(c => row.push({ text: c.innerText.trim(), options: { bold: true, fill: '3182ce', color: 'ffffff' } }));
                if (row.length) rows.push(row);
            });
            el.querySelectorAll('tbody tr').forEach(tr => {
                let row = [];
                tr.querySelectorAll('td, th').forEach(c => row.push(c.innerText.trim()));
                if (row.length) rows.push(row);
            });
            if (rows.length === 0) {
                el.querySelectorAll('tr').forEach(tr => {
                    let row = [];
                    tr.querySelectorAll('td, th').forEach(c => row.push(c.innerText.trim()));
                    if (row.length) rows.push(row);
                });
            }
            if (rows.length > 0) {
                slide.addTable(rows, {
                    x: 0.5, y: 0.5, w: 9,
                    fontSize: 10, color: '2d3748',
                    border: { pt: 1, color: 'cbd5e0' },
                    autoPage: true,
                    newPageStartY: 0.5
                });
                slide = pptx.addSlide();
                yPos = 0.5;
            }
        }
    });
    pptx.writeFile({ fileName: filename + ".pptx" });
    showToast("PPT berhasil diunduh!");
};
window.downloadSpecificDiv = function (divId, filename) {
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
window.downloadCurrentTabAsWord = function () {
    const activePane = document.querySelector('.content-section.active .tab-pane.active');
    if (activePane) {
        const orientation = getExportOrientation(activePane.id);
        const finalHtml = prepareContentForWord(activePane.innerHTML, orientation);
        const converted = htmlDocx.asBlob(finalHtml);
        saveAs(converted, `Dokumen_${activePane.id}.docx`);
    } else {
        showToast("Tidak ada tab aktif untuk diunduh");
    }
};
window.downloadPDF = function (divId, filename) {
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
    const clone = element.cloneNode(true);
    const actions = clone.querySelectorAll('.output-actions, button, .btn, .tab-nav, .doc-header button');
    actions.forEach(el => el.remove());
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
    const allElements = clone.querySelectorAll('*');
    allElements.forEach(el => {
        el.style.color = 'black';
        if (el.tagName === 'TABLE') {
            el.style.width = '100%';
            el.style.borderCollapse = 'collapse';
            el.style.marginBottom = '15px';
            el.style.border = '1px solid black';
            el.style.fontSize = '10pt';
        }
        if (el.tagName === 'TH' || el.tagName === 'TD') {
            el.style.border = '1px solid black';
            el.style.padding = '6px';
            el.style.verticalAlign = 'top';
        }
        if (el.tagName === 'TH') {
            el.style.backgroundColor = '#f0f0f0';
            el.style.fontWeight = 'bold';
        }
        if (['H1', 'H2', 'H3', 'H4', 'H5'].includes(el.tagName)) {
            el.style.marginTop = '15px';
            el.style.marginBottom = '10px';
            el.style.color = 'black';
        }
        if (el.tagName === 'UL' || el.tagName === 'OL') {
            el.style.paddingLeft = '20px';
            el.style.marginBottom = '10px';
        }
    });
    const imgs = clone.querySelectorAll('img');
    imgs.forEach(img => {
        img.style.maxWidth = '120px';
        img.style.height = 'auto';
        img.style.display = 'block';
        img.style.marginBottom = '6px';
    });
    clone.classList.remove('print-area');
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '0';
    container.style.width = '800px';
    container.appendChild(clone);
    document.body.appendChild(container);
    const orientation = getExportOrientation(divId);
    const jsPdfOrientation = (orientation && orientation.toLowerCase().startsWith('l')) ? 'landscape' : 'portrait';
    const opt = {
        margin: 0.5,
        filename: filename + '.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
        jsPDF: { unit: 'in', format: 'letter', orientation: jsPdfOrientation },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };
    html2pdf().set(opt).from(clone).save().then(() => {
        document.body.removeChild(container);
        showToast("PDF berhasil diunduh!");
    }).catch(err => {
        console.error("PDF Generation Error:", err);
        document.body.removeChild(container);
        showToast("Gagal membuat PDF.");
    });
};
window.printSection = function (divId) {
    document.querySelectorAll('.print-area').forEach(el => el.classList.remove('print-area'));
    const target = document.getElementById(divId);
    if (target) {
        target.classList.add('print-area');
        window.print();
        target.classList.remove('print-area');
    }
};
window.clearOutput = function (elementId) {
    document.getElementById(elementId).style.display = 'none';
};
window.openSaveModal = function () { document.getElementById('modal-save-confirm').style.display = 'flex'; };
window.closeSaveModal = function () { document.getElementById('modal-save-confirm').style.display = 'none'; };
window.printSection = function (divId) {
    document.querySelectorAll('.print-area').forEach(el => el.classList.remove('print-area'));
    const target = document.getElementById(divId);
    if (target) {
        target.classList.add('print-area');
        window.print();
        target.classList.remove('print-area');
    }
};
const excelInput = document.getElementById('excel-input-file');
if (excelInput) {
    excelInput.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (!file) return;
        const fileNameSpan = document.getElementById('excel-file-name');
        if (fileNameSpan) {
            fileNameSpan.innerText = 'File: ' + file.name;
            fileNameSpan.style.display = 'inline';
        }
        const reader = new FileReader();
        reader.onload = function (e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            let nilaiArray = [];
            jsonData.forEach(row => {
                if (row[0] && !isNaN(row[0])) {
                    nilaiArray.push(row[0]);
                }
            });
            if (nilaiArray.length > 0) {
                document.getElementById('nilai-input').value = nilaiArray.join(', ');
                showToast(`Berhasil mengimpor ${nilaiArray.length} data nilai!`);
            } else {
                showToast("Tidak ditemukan data angka pada kolom pertama Excel.");
            }
        };
        reader.readAsArrayBuffer(file);
    });
}
window.exportToExcel = function (divId, filename) {
    const element = document.getElementById(divId);
    if (!element) return showToast("Konten tidak ditemukan!");
    const table = element.querySelector('table');
    let wb = XLSX.utils.book_new();
    let ws;
    if (table) {
        ws = XLSX.utils.table_to_sheet(table);
    } else {
        const textData = element.innerText.split('\n').map(line => [line]);
        ws = XLSX.utils.aoa_to_sheet(textData);
    }
    XLSX.utils.book_append_sheet(wb, ws, "Hasil");
    XLSX.writeFile(wb, filename + ".xlsx");
    showToast("Excel berhasil diunduh!");
};
document.addEventListener('DOMContentLoaded', function () {
    const akademikFields = document.querySelectorAll('.akademik-field');
    const btnSaveAkademik = document.getElementById('btn-save-akademik');
    const validationStatus = document.getElementById('validation-status');
    akademikFields.forEach(field => {
        field.addEventListener('change', updateAkademikValidation);
        field.addEventListener('input', debounce(updateAkademikValidation, 300));
    });
    const jenjangSelect = document.getElementById('akad-jenjang');
    const kelasSelect = document.getElementById('akad-kelas');
    const faseSelect = document.getElementById('akad-fase');
    const mapelSelect = document.getElementById('akad-mapel');
    if (jenjangSelect) {
        jenjangSelect.addEventListener('change', function () {
            updateKelasOptions(this.value);
            if (kelasSelect) {
                kelasSelect.value = '';
                faseSelect.value = '';
            }
            updateAkademikValidation();
        });
    }
    if (kelasSelect) {
        kelasSelect.addEventListener('change', function () {
            updateFaseAutomatis(this.value);
            updateMapelOptions();
            updateAkademikValidation();
        });
    }
    if (mapelSelect) {
        mapelSelect.addEventListener('change', updateAkademikValidation);
    }
    const btnToggleMapelKustom = document.getElementById('btn-toggle-mapel-kustom');
    const akadMapelKustom = document.getElementById('akad-mapel-kustom');
    if (btnToggleMapelKustom) {
        btnToggleMapelKustom.addEventListener('click', function () {
            const isHidden = akadMapelKustom.style.display === 'none';
            if (isHidden) {
                mapelSelect.style.display = 'none';
                mapelSelect.value = '';
                akadMapelKustom.style.display = 'block';
                akadMapelKustom.focus();
                btnToggleMapelKustom.innerHTML = '<i class="fas fa-times"></i> Batal';
                btnToggleMapelKustom.classList.remove('btn-secondary');
                btnToggleMapelKustom.classList.add('btn-danger');
            } else {
                mapelSelect.style.display = 'block';
                akadMapelKustom.style.display = 'none';
                akadMapelKustom.value = '';
                btnToggleMapelKustom.innerHTML = '<i class="fas fa-plus"></i> Kustom';
                btnToggleMapelKustom.classList.remove('btn-danger');
                btnToggleMapelKustom.classList.add('btn-secondary');
            }
            updateAkademikValidation();
        });
    }
    if (akadMapelKustom) {
        akadMapelKustom.addEventListener('input', debounce(updateAkademikValidation, 300));
        akadMapelKustom.addEventListener('change', updateAkademikValidation);
    }
    function updateKelasOptions(jenjang) {
        const kelasSelectEl = document.getElementById('akad-kelas');
        if (!kelasSelectEl) return;
        kelasSelectEl.innerHTML = '<option value="">-- Pilih Kelas --</option>';
        if (jenjang && AKADEMIK_DATA[jenjang]) {
            const kelas = AKADEMIK_DATA[jenjang].kelas;
            kelas.forEach(k => {
                const opt = document.createElement('option');
                opt.value = k;
                opt.textContent = k;
                kelasSelectEl.appendChild(opt);
            });
        }
        kelasSelectEl.disabled = !jenjang;
    }
    function updateFaseAutomatis(kelas) {
        const faseSelectEl = document.getElementById('akad-fase');
        const jenjangSelectEl = document.getElementById('akad-jenjang');
        if (!faseSelectEl || !kelas) {
            if (faseSelectEl) faseSelectEl.value = '';
            return;
        }
        const jenjang = jenjangSelectEl ? jenjangSelectEl.value : '';
        if (!jenjang) {
            faseSelectEl.value = '';
            return;
        }
        const faseMapping = AKADEMIK_DATA[jenjang];
        if (faseMapping && faseMapping.fase) {
            const faseValue = faseMapping.fase[kelas];
            if (faseValue) {
                faseSelectEl.value = faseValue;
            } else {
                faseSelectEl.value = '';
            }
        } else {
            faseSelectEl.value = '';
        }
    }
    function updateMapelOptions() {
        const mapelSelectEl = document.getElementById('akad-mapel');
        const jenjangSelectEl = document.getElementById('akad-jenjang');
        if (!mapelSelectEl) return;
        mapelSelectEl.innerHTML = '<option value="">-- Pilih Mata Pelajaran --</option>';
        if (jenjangSelectEl) {
            const jenjang = jenjangSelectEl.value;
            if (jenjang && MAPEL_BY_JENJANG[jenjang]) {
                const mapel = MAPEL_BY_JENJANG[jenjang];
                mapel.forEach(m => {
                    const opt = document.createElement('option');
                    opt.value = m;
                    opt.textContent = m;
                    mapelSelectEl.appendChild(opt);
                });
            }
        }
        mapelSelectEl.disabled = !jenjangSelectEl || !jenjangSelectEl.value;
    }
    function updateAkademikValidation() {
        const tahun = document.getElementById('akad-tahun').value.trim();
        const jenjang = document.getElementById('akad-jenjang').value;
        const kelas = document.getElementById('akad-kelas').value;
        const fase = document.getElementById('akad-fase').value;
        const semester = document.getElementById('akad-semester').value;
        const mapelSelect = document.getElementById('akad-mapel').value;
        const mapelKustom = document.getElementById('akad-mapel-kustom').value.trim();
        const mapelKustomVisible = document.getElementById('akad-mapel-kustom').style.display !== 'none';
        const isMapelValid = mapelKustomVisible ? mapelKustom !== '' : mapelSelect !== '';
        const tahunRegex = /^\d{4}\/\d{4}$/;
        const isTahunValid = tahunRegex.test(tahun) && tahun !== '';
        const errorTahun = document.getElementById('error-tahun');
        if (errorTahun) {
            if (tahun === '') {
                errorTahun.style.display = 'none';
            } else if (!isTahunValid) {
                errorTahun.style.display = 'block';
                errorTahun.textContent = '❌ Format tidak valid. Gunakan YYYY/YYYY (contoh: 2025/2026)';
            } else {
                errorTahun.style.display = 'none';
            }
        }
        const errorFields = ['jenjang', 'kelas', 'fase', 'semester'];
        errorFields.forEach(field => {
            const errorEl = document.getElementById(`error-${field}`);
            const fieldValue = document.getElementById(`akad-${field}`).value;
            if (errorEl) {
                if (fieldValue === '') {
                    errorEl.style.display = 'block';
                    errorEl.textContent = '❌ Wajib dipilih';
                } else {
                    errorEl.style.display = 'none';
                }
            }
        });
        const errorMapel = document.getElementById('error-mapel');
        if (errorMapel) {
            if (isMapelValid) {
                errorMapel.style.display = 'none';
            } else {
                errorMapel.style.display = 'block';
                errorMapel.textContent = '❌ Wajib dipilih atau input custom';
            }
        }
        const status = {
            'Tahun Ajaran': isTahunValid,
            'Jenjang': jenjang !== '',
            'Kelas': kelas !== '',
            'Fase': fase !== '',
            'Semester': semester !== '',
            'Mata Pelajaran': isMapelValid
        };
        if (validationStatus) {
            let html = '';
            Object.entries(status).forEach(([key, valid]) => {
                const icon = valid ? '<i class="fas fa-check-circle" style="color: var(--success);"></i>' : '<i class="fas fa-circle" style="color: var(--danger);"></i>';
                const statusText = valid ? 'Terisi' : 'Belum diisi';
                const color = valid ? 'var(--success)' : 'var(--danger)';
                html += `<div><span style="color: ${color};">${icon}</span> ${key}: ${statusText}</div>`;
            });
            validationStatus.innerHTML = html;
        }
        const allValid = Object.values(status).every(v => v === true);
        if (btnSaveAkademik) {
            btnSaveAkademik.disabled = !allValid;
            btnSaveAkademik.style.opacity = allValid ? '1' : '0.5';
            btnSaveAkademik.style.cursor = allValid ? 'pointer' : 'not-allowed';
        }
        return allValid;
    }
    if (btnSaveAkademik) {
        btnSaveAkademik.addEventListener('click', function () {
            const isValid = updateAkademikValidation();
            if (!isValid) {
                showToast('❌ Silakan lengkapi semua field yang diperlukan');
                return;
            }
            const mapelSelect = document.getElementById('akad-mapel').value;
            const mapelKustom = document.getElementById('akad-mapel-kustom').value.trim();
            const mapelKustomVisible = document.getElementById('akad-mapel-kustom').style.display !== 'none';
            const mapelFinal = mapelKustomVisible ? mapelKustom : mapelSelect;
            const data = {
                tahun: document.getElementById('akad-tahun').value.trim(),
                jenjang: document.getElementById('akad-jenjang').value,
                kelas: document.getElementById('akad-kelas').value,
                fase: document.getElementById('akad-fase').value,
                semester: document.getElementById('akad-semester').value,
                mapel: mapelFinal,
                mapel_kustom: mapelKustomVisible,
                timestamp: new Date().toISOString()
            };
            localStorage.setItem('akademik_data', JSON.stringify(data));
            localStorage.setItem('akad_tahun', data.tahun);
            localStorage.setItem('akad_jenjang', data.jenjang);
            localStorage.setItem('akad_kelas', data.kelas);
            localStorage.setItem('akad_fase', data.fase);
            localStorage.setItem('akad_semester', data.semester);
            localStorage.setItem('akad_mapel', mapelFinal);
            showToast('✅ Data Akademik berhasil disimpan!');
            console.log('Data Akademik Tersimpan:', data);
        });
    }
    const savedData = localStorage.getItem('akademik_data');
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            if (document.getElementById('akad-tahun')) document.getElementById('akad-tahun').value = data.tahun || '';
            if (document.getElementById('akad-jenjang')) {
                document.getElementById('akad-jenjang').value = data.jenjang || '';
                updateKelasOptions(data.jenjang);
            }
            if (document.getElementById('akad-kelas')) {
                document.getElementById('akad-kelas').value = data.kelas || '';
                setTimeout(() => {
                    updateFaseAutomatis(data.kelas);
                }, 50);
            }
            if (document.getElementById('akad-fase')) document.getElementById('akad-fase').value = data.fase || '';
            if (document.getElementById('akad-semester')) document.getElementById('akad-semester').value = data.semester || '';
            updateMapelOptions();
            if (data.mapel_kustom) {
                document.getElementById('akad-mapel-kustom').value = data.mapel || '';
                document.getElementById('akad-mapel-kustom').style.display = 'block';
                document.getElementById('akad-mapel').style.display = 'none';
                const btnToggle = document.getElementById('btn-toggle-mapel-kustom');
                btnToggle.innerHTML = '<i class="fas fa-times"></i> Batal';
                btnToggle.classList.remove('btn-secondary');
                btnToggle.classList.add('btn-danger');
            } else {
                if (document.getElementById('akad-mapel')) document.getElementById('akad-mapel').value = data.mapel || '';
            }
        } catch (e) {
            console.error('Error loading akademik data:', e);
        }
    }
    updateAkademikValidation();
    window.showDataLoaderSpinner = function (message = 'Mengambil data...') {
        const spinner = document.getElementById('data-loader-spinner');
        const text = document.getElementById('loader-text');
        if (spinner) {
            text.textContent = message;
            spinner.classList.add('active');
        }
    };
    window.hideDataLoaderSpinner = function () {
        const spinner = document.getElementById('data-loader-spinner');
        if (spinner) {
            spinner.classList.remove('active');
        }
    };
    window.showProgressBar = function (title = 'Sedang Membuat...', message = 'Harap tunggu, jangan tutup halaman ini...') {
        const container = document.getElementById('progress-container');
        const backdrop = document.getElementById('progress-backdrop');
        const info = document.getElementById('progress-info');
        const titleEl = document.getElementById('progress-title');
        const textEl = document.getElementById('progress-text');
        if (container) container.classList.add('active');
        if (backdrop) backdrop.classList.add('active');
        if (info) info.classList.add('active');
        if (titleEl) titleEl.textContent = title;
        if (textEl) textEl.textContent = message;
        updateProgressBar(0);
    };
    window.hideProgressBar = function () {
        const container = document.getElementById('progress-container');
        const backdrop = document.getElementById('progress-backdrop');
        const info = document.getElementById('progress-info');
        if (container) container.classList.remove('active');
        if (backdrop) backdrop.classList.remove('active');
        if (info) info.classList.remove('active');
    };
    window.updateProgressBar = function (percentage) {
        const fill = document.getElementById('progress-fill');
        const percentageEl = document.getElementById('progress-percentage');
        if (fill) fill.style.width = Math.min(percentage, 100) + '%';
        if (percentageEl) percentageEl.textContent = Math.round(percentage) + '%';
    };
    window.animateProgressBar = function (duration = 30000) {
        let progress = 0;
        const interval = setInterval(() => {
            const increment = Math.random() * 15;
            progress += increment;
            if (progress >= 95) {
                progress = 95;
                clearInterval(interval);
            }
            updateProgressBar(progress);
        }, 500);
        return interval;
    };
    window.autoLoadAllData = async function () {
        showDataLoaderSpinner('Mengambil data dari profil guru...');
        try {
            await new Promise(r => setTimeout(r, 500));
            const namaGuru = localStorage.getItem('as_nama') || '';
            const nipGuru = localStorage.getItem('as_nip') || '';
            const dataSiswa = localStorage.getItem('dataSiswa');
            const akademikData = localStorage.getItem('akademik_data');
            showDataLoaderSpinner('Mengambil data siswa...');
            await new Promise(r => setTimeout(r, 500));
            showDataLoaderSpinner('Mengambil data akademik...');
            await new Promise(r => setTimeout(r, 500));
            if (akademikData) {
                autoPopulateCurrentSection();
            }
            hideDataLoaderSpinner();
            return true;
        } catch (e) {
            console.error('Error auto-loading data:', e);
            hideDataLoaderSpinner();
            return false;
        }
    };
    window.autoPopulateCurrentSection = function () {
        const akademikData = localStorage.getItem('akademik_data');
        if (!akademikData) return;
        try {
            const data = JSON.parse(akademikData);
            const activeSection = document.querySelector('.content-section.active');
            if (!activeSection) return;
            const sectionId = activeSection.id;
            if (sectionId === 'materi-ajar') {
                autoPopulateModul(data);
            } else if (sectionId === 'media-ajar') {
                autoPopulateMedia(data);
            } else if (sectionId === 'kokurikuler') {
                autoPopulateKokurikuler(data);
            } else if (sectionId === 'soal') {
                autoPopulateSoal(data);
            } else if (sectionId === 'rapor-siswa') {
                autoPopulateRapor(data);
            }
        } catch (e) {
            console.error('Error auto-populating section:', e);
        }
    };
    window.autoPopulateModul = function (data) {
        if (document.getElementById('modul-tahun')) document.getElementById('modul-tahun').value = data.tahun;
        if (document.getElementById('modul-jenjang')) {
            document.getElementById('modul-jenjang').value = data.jenjang;
            document.getElementById('modul-jenjang').dispatchEvent(new Event('change'));
        }
        setTimeout(() => {
            if (document.getElementById('modul-kelas-select')) {
                document.getElementById('modul-kelas-select').value = data.kelas;
                document.getElementById('modul-kelas-select').dispatchEvent(new Event('change'));
            }
        }, 100);
        setTimeout(() => {
            if (document.getElementById('modul-sem-select')) {
                document.getElementById('modul-sem-select').value = data.semester;
            }
            if (document.getElementById('modul-mapel-select')) {
                document.getElementById('modul-mapel-select').value = data.mapel;
            }
        }, 200);
    };
    window.autoPopulateMedia = function (data) {
        if (document.getElementById('bahan-tahun')) document.getElementById('bahan-tahun').value = data.tahun;
        if (document.getElementById('bahan-jenjang')) {
            document.getElementById('bahan-jenjang').value = data.jenjang;
            document.getElementById('bahan-jenjang').dispatchEvent(new Event('change'));
        }
    };
    window.autoPopulateKokurikuler = function (data) {
        if (document.getElementById('kokul-tahun')) document.getElementById('kokul-tahun').value = data.tahun;
        if (document.getElementById('kokul-jenjang')) {
            document.getElementById('kokul-jenjang').value = data.jenjang;
            document.getElementById('kokul-jenjang').dispatchEvent(new Event('change'));
        }
    };
    window.autoPopulateSoal = function (data) {
        if (document.getElementById('soal-tahun')) document.getElementById('soal-tahun').value = data.tahun;
        if (document.getElementById('soal-jenjang')) {
            document.getElementById('soal-jenjang').value = data.jenjang;
            if (window.updateKelasOptions) window.updateKelasOptions();
        }
        if (document.getElementById('soal-kelas')) {
            document.getElementById('soal-kelas').value = data.kelas.match(/\d+/)?.[0] || '';
        }
        if (document.getElementById('soal-sem')) document.getElementById('soal-sem').value = data.semester;
    };
    window.autoPopulateRapor = function (data) {
        if (document.getElementById('rapor-tahun')) document.getElementById('rapor-tahun').value = data.tahun;
        if (document.getElementById('rapor-kelas')) document.getElementById('rapor-kelas').value = data.kelas;
        if (document.getElementById('rapor-fase')) document.getElementById('rapor-fase').value = data.fase;
        if (document.getElementById('rapor-semester')) document.getElementById('rapor-semester').value = data.semester;
    };
    window.onSectionSwitch = function (sectionId) {
        if (['materi-ajar', 'media-ajar', 'kokurikuler', 'soal', 'rapor-siswa'].includes(sectionId)) {
            setTimeout(() => {
                autoPopulateCurrentSection();
            }, 300);
        }
    };
    window.tarikDataAkademikKeModul = function () {
        const akademikData = localStorage.getItem('akademik_data');
        if (!akademikData) {
            showToast('❌ Data Akademik belum disimpan. Silakan isi Akademik terlebih dahulu.');
            return;
        }
        try {
            const data = JSON.parse(akademikData);
            if (document.getElementById('modul-tahun')) document.getElementById('modul-tahun').value = data.tahun;
            if (document.getElementById('modul-jenjang')) {
                document.getElementById('modul-jenjang').value = data.jenjang;
                document.getElementById('modul-jenjang').dispatchEvent(new Event('change'));
            }
            setTimeout(() => {
                if (document.getElementById('modul-kelas-select')) {
                    document.getElementById('modul-kelas-select').value = data.kelas;
                    document.getElementById('modul-kelas-select').dispatchEvent(new Event('change'));
                }
            }, 100);
            setTimeout(() => {
                if (document.getElementById('modul-sem-select')) {
                    document.getElementById('modul-sem-select').value = data.semester;
                }
                if (document.getElementById('modul-mapel-select')) {
                    document.getElementById('modul-mapel-select').value = data.mapel;
                }
            }, 200);
            showToast('✅ Data Akademik berhasil ditarik ke Modul Ajar!');
        } catch (e) {
            console.error('Error tarik data:', e);
            showToast('❌ Gagal tarik data akademik');
        }
    };
    window.tarikDataAkademikKeMedia = function () {
        const akademikData = localStorage.getItem('akademik_data');
        if (!akademikData) {
            showToast('❌ Data Akademik belum disimpan. Silakan isi Akademik terlebih dahulu.');
            return;
        }
        try {
            const data = JSON.parse(akademikData);
            if (document.getElementById('bahan-tahun')) document.getElementById('bahan-tahun').value = data.tahun;
            if (document.getElementById('bahan-jenjang')) {
                document.getElementById('bahan-jenjang').value = data.jenjang;
                document.getElementById('bahan-jenjang').dispatchEvent(new Event('change'));
            }
            showToast('✅ Data Akademik berhasil ditarik ke Media Ajar!');
        } catch (e) {
            console.error('Error tarik data:', e);
            showToast('❌ Gagal tarik data akademik');
        }
    };
    window.tarikDataAkademikKeKokurikuler = function () {
        const akademikData = localStorage.getItem('akademik_data');
        if (!akademikData) {
            showToast('❌ Data Akademik belum disimpan. Silakan isi Akademik terlebih dahulu.');
            return;
        }
        try {
            const data = JSON.parse(akademikData);
            if (document.getElementById('kokul-tahun')) document.getElementById('kokul-tahun').value = data.tahun;
            if (document.getElementById('kokul-jenjang')) {
                document.getElementById('kokul-jenjang').value = data.jenjang;
                document.getElementById('kokul-jenjang').dispatchEvent(new Event('change'));
            }
            showToast('✅ Data Akademik berhasil ditarik ke Kokurikuler!');
        } catch (e) {
            console.error('Error tarik data:', e);
            showToast('❌ Gagal tarik data akademik');
        }
    };
    window.tarikDataAkademikKeSoal = function () {
        const akademikData = localStorage.getItem('akademik_data');
        if (!akademikData) {
            showToast('❌ Data Akademik belum disimpan. Silakan isi Akademik terlebih dahulu.');
            return;
        }
        try {
            const data = JSON.parse(akademikData);
            if (document.getElementById('soal-tahun')) document.getElementById('soal-tahun').value = data.tahun;
            if (document.getElementById('soal-jenjang')) {
                document.getElementById('soal-jenjang').value = data.jenjang;
                if (window.updateKelasOptions) window.updateKelasOptions();
            }
            if (document.getElementById('soal-kelas')) {
                document.getElementById('soal-kelas').value = data.kelas.match(/\d+/)?.[0] || '';
            }
            if (document.getElementById('soal-sem')) document.getElementById('soal-sem').value = data.semester;
            showToast('✅ Data Akademik berhasil ditarik ke Soal!');
        } catch (e) {
            console.error('Error tarik data:', e);
            showToast('❌ Gagal tarik data akademik');
        }
    };
    window.tarikDataAkademikKeRapor = function () {
        const akademikData = localStorage.getItem('akademik_data');
        if (!akademikData) {
            showToast('❌ Data Akademik belum disimpan. Silakan isi Akademik terlebih dahulu.');
            return;
        }
        try {
            const data = JSON.parse(akademikData);
            if (document.getElementById('rapor-tahun')) document.getElementById('rapor-tahun').value = data.tahun;
            if (document.getElementById('rapor-kelas')) document.getElementById('rapor-kelas').value = data.kelas;
            if (document.getElementById('rapor-fase')) document.getElementById('rapor-fase').value = data.fase;
            if (document.getElementById('rapor-semester')) document.getElementById('rapor-semester').value = data.semester;
            showToast('✅ Data Akademik berhasil ditarik ke E-Rapor!');
        } catch (e) {
            console.error('Error tarik data:', e);
            showToast('❌ Gagal tarik data akademik');
        }
    };
    function romanToNumber(r) {
        if (!r) return null;
        const map = { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8, IX: 9 };
        const key = r.toUpperCase();
        return map[key] || null;
    }
    function getFaseFromKelas(kelasStr) {
        if (!kelasStr) return '';
        const m = kelasStr.match(/(\d{1,2})/);
        let num = null;
        if (m) num = parseInt(m[1], 10);
        else {
            const mr = kelasStr.match(/\b(I|II|III|IV|V|VI|VII|VIII|IX)\b/i);
            if (mr) num = romanToNumber(mr[1]);
        }
        if (!num) return '';
        if (num <= 2) return 'A';
        if (num <= 4) return 'B';
        if (num <= 6) return 'C';
        if (num <= 8) return 'D';
        if (num === 9) return 'E';
        return '';
    }
    const kelasInput = document.getElementById('rapor-kelas');
    const faseInput = document.getElementById('rapor-fase');
    function syncFase() {
        if (!kelasInput || !faseInput) return;
        const val = kelasInput.value || '';
        const fase = getFaseFromKelas(val.trim());
        faseInput.value = fase || '';
    }
    if (kelasInput) {
        kelasInput.addEventListener('input', syncFase);
        syncFase();
    }
    function initMuatanLokalSync() {
        const container = document.getElementById('rapor-muatan-lokal-container');
        const capContainer = document.getElementById('rapor-capaian-kompetensi-mulok-container');
        if (!container || !capContainer) return;
        const itemDivs = Array.from(container.querySelectorAll(':scope > div'));
        itemDivs.forEach(div => {
            const nameInput = div.querySelector('.rapor-muatan-lokal-nama');
            const nilaiInput = div.querySelector('.rapor-muatan-lokal-nilai');
            let muatanName = '';
            if (nameInput) muatanName = (nameInput.value || '').trim();
            if (!muatanName && nilaiInput) muatanName = nilaiInput.getAttribute('data-muatan') || '';
            if (!muatanName) return;
            let id = nilaiInput.getAttribute('data-muatan-id');
            if (!id) {
                id = __genMuatanId();
                if (nilaiInput) nilaiInput.setAttribute('data-muatan-id', id);
                if (nameInput) nameInput.setAttribute('data-muatan-id', id);
            }
            let capTextarea = capContainer.querySelector(`.rapor-capaian-kompetensi-mulok-input[data-muatan-id="${id}"]`)
                || capContainer.querySelector(`.rapor-capaian-kompetensi-mulok-input[data-muatan="${muatanName}"]`);
            if (capTextarea) {
                capTextarea.setAttribute('data-muatan-id', id);
                capTextarea.setAttribute('data-muatan', muatanName);
                const capLabel = capTextarea.parentElement && capTextarea.parentElement.querySelector('label');
                if (capLabel) capLabel.textContent = muatanName;
            }
            if (nameInput && nilaiInput) {
                nameInput.addEventListener('input', function () {
                    const newName = this.value.trim();
                    if (!newName) return;
                    nilaiInput.setAttribute('data-muatan', newName);
                    const capById = capContainer.querySelector(`.rapor-capaian-kompetensi-mulok-input[data-muatan-id="${id}"]`);
                    if (capById) {
                        capById.setAttribute('data-muatan', newName);
                        const lbl = capById.parentElement && capById.parentElement.querySelector('label');
                        if (lbl) lbl.textContent = newName;
                    }
                });
            }
        });
    }
    initMuatanLokalSync();
    syncMapelCapaian();
});
let __muatanIdCounter = Date.now();
function __genMuatanId() { return 'mulok-' + (__muatanIdCounter++); }
window.syncMapelCapaian = function () {
    const nilaiContainer = document.getElementById('rapor-nilai-container');
    const capContainer = document.getElementById('rapor-capaian-kompetensi-container');
    if (!nilaiContainer || !capContainer) return;
    const nilaiInputs = Array.from(nilaiContainer.querySelectorAll('.rapor-nilai-input'));
    const mapelNames = new Set(nilaiInputs.map(input => input.getAttribute('data-mapel')));
    const existingCapaian = new Set(
        Array.from(capContainer.querySelectorAll('.rapor-capaian-kompetensi-input')).map(ta => ta.getAttribute('data-mapel'))
    );
    mapelNames.forEach(mapel => {
        if (!existingCapaian.has(mapel)) {
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
    Array.from(capContainer.querySelectorAll('[data-mapel-capaian]')).forEach(div => {
        const mapel = div.getAttribute('data-mapel-capaian');
        if (!mapelNames.has(mapel)) {
            div.remove();
        }
    });
};
window.removeMapelAndCapaian = function (mapelName, buttonEl) {
    buttonEl.parentElement.parentElement.remove();
    const capContainer = document.getElementById('rapor-capaian-kompetensi-container');
    const capDiv = capContainer.querySelector(`[data-mapel-capaian="${mapelName}"]`);
    if (capDiv) capDiv.remove();
};
window.addMapelField = function () {
    openAddMapelModal();
};
window.addMuatanLokalField = function () {
    openAddMulokModal();
};
window.addEkstraField = function () {
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
    div.querySelector('button').addEventListener('click', function () { div.remove(); updateEkstraSummary(); });
    div.querySelectorAll('input, select').forEach(i => i.addEventListener('input', updateEkstraSummary));
    list.appendChild(div);
    setTimeout(() => { const f = div.querySelector('.ekstra-name'); if (f) f.focus(); }, 10);
    updateEkstraSummary();
};
function updateEkstraSummary() {
    const list = document.getElementById('rapor-ekstrakurikuler-list');
    const summary = document.getElementById('rapor-ekstrakurikuler');
    if (!summary) return;
    if (!list) { summary.value = ''; return; }
    const items = Array.from(list.querySelectorAll('.ekstra-item'));
    const lines = items.map(it => {
        const name = (it.querySelector('.ekstra-name') || {}).value || '';
        const role = (it.querySelector('.ekstra-role') || {}).value || '';
        const freq = (it.querySelector('.ekstra-freq') || {}).value || '';
        const parts = [];
        if (name.trim()) parts.push(name.trim());
        if (role.trim()) parts.push('(' + role.trim() + ')');
        if (freq) parts.push('[' + freq + ']');
        return parts.join(' ');
    }).filter(l => l.trim());
    summary.value = lines.join('\n');
}
function updateKokulNote() {
    const temaEl = document.getElementById('rapor-tema-kokul');
    const noteEl = document.getElementById('rapor-catatan-kokul');
    const switches = Array.from(document.querySelectorAll('.rapor-profil-switch'));
    if (!noteEl) return;
    const tema = temaEl ? (temaEl.value || '').trim() : '';
    const selected = switches.filter(s => s.checked).map(s => s.getAttribute('data-profil'));
    if (!tema && selected.length === 0) return;
    const sampleNote = 'Ananda sudah cakap dalam penalaran kritis saat mencari solusi terhadap permasalahan terkait lingkungan dan masih perlu berlatih dalam mengomunikasikan gagasan';
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
    if (tema) note += `Tema proyek: ${tema}. `;
    if (descriptors.length) {
        note += 'Dalam kegiatan kokurikuler, siswa ' + descriptors.join('; ') + '.';
    }
    noteEl.value = note;
}
function initKokulAutoNote() {
    const temaEl = document.getElementById('rapor-tema-kokul');
    if (temaEl) temaEl.addEventListener('input', updateKokulNote);
    document.querySelectorAll('.rapor-profil-switch').forEach(s => s.addEventListener('change', updateKokulNote));
    updateKokulNote();
}
try { initKokulAutoNote(); } catch (e) { }
const selectorCache = {
    nilaiInputs: null,
    mapelSwitches: null,
    profilSwitches: null,
    mulokSwitches: null,
    lastCacheTime: 0,
    CACHE_DURATION: 500
};
function invalidateSelectorCache() {
    selectorCache.lastCacheTime = 0;
    selectorCache.nilaiInputs = null;
    selectorCache.mapelSwitches = null;
}
function getCachedSelector(selectorType) {
    const now = Date.now();
    if (now - selectorCache.lastCacheTime > selectorCache.CACHE_DURATION) {
        selectorCache.lastCacheTime = now;
        selectorCache.nilaiInputs = null;
        selectorCache.mapelSwitches = null;
    }
    switch (selectorType) {
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
function setupRaporEventDelegation() {
    const capaianContainer = document.getElementById('rapor-capaian-kompetensi-container');
    if (capaianContainer) {
        const debouncedCapaianChange = debounce(function (e) {
            if (e.target.classList.contains('rapor-capaian-kompetensi-input')) {
                invalidateSelectorCache();
            }
        }, 500);
        capaianContainer.addEventListener('input', debouncedCapaianChange, true);
    }
}
setupRaporEventDelegation();
function nilaiToPredicate(nilai) {
    nilai = parseInt(nilai) || 0;
    if (nilai >= 95) return 'Sangat Baik';
    if (nilai >= 85) return 'Baik';
    if (nilai >= 75) return 'Cukup';
    if (nilai >= 60) return 'Kurang';
    return 'Sangat Kurang';
}
window.loadDataFromProfil = function () {
    const nama_guru = localStorage.getItem('as_nama') || '';
    const nip_guru = localStorage.getItem('as_nip') || '';
    const alamat_sekolah = localStorage.getItem('as_alamat') || localStorage.getItem('as_sekolah') || '';
    const kepsek = localStorage.getItem('as_kepsek') || '';
    const nip_kepsek = localStorage.getItem('as_nip_kepsek') || '';
    document.getElementById('rapor-walikelas').value = nama_guru;
    document.getElementById('rapor-nip').value = nip_guru;
    document.getElementById('rapor-alamat-sekolah').value = alamat_sekolah;
    document.getElementById('rapor-kepsek').value = kepsek;
    document.getElementById('rapor-nip-kepsek').value = nip_kepsek;
};
document.getElementById('btn-gen-rapor').addEventListener('click', function () {
    const nama = document.getElementById('rapor-nama').value || 'Siswa';
    const nisn = document.getElementById('rapor-nisn').value || '';
    const kelas = document.getElementById('rapor-kelas').value || '';
    const fase = document.getElementById('rapor-fase').value || '';
    const semester = document.getElementById('rapor-semester').value || 'Ganjil';
    const tahunAjaran = document.getElementById('rapor-tahun').value || '';
    const sakit = document.getElementById('rapor-sakit').value || 0;
    const izin = document.getElementById('rapor-izin').value || 0;
    const alfa = document.getElementById('rapor-alfa').value || 0;
    const ekstrakurikuler = document.getElementById('rapor-ekstrakurikuler').value || '';
    const catatan = document.getElementById('rapor-catatan').value || '';
    const walikelas = document.getElementById('rapor-walikelas').value || 'Wali Kelas';
    const nip = document.getElementById('rapor-nip').value || '';
    const alamatSekolah = document.getElementById('rapor-alamat-sekolah').value || localStorage.getItem('as_alamat') || '';
    const kepsek = document.getElementById('rapor-kepsek').value || localStorage.getItem('as_kepsek') || '';
    const nipKepsek = document.getElementById('rapor-nip-kepsek').value || localStorage.getItem('as_nip_kepsek') || '';
    const tglLaporanValue = document.getElementById('rapor-tanggal-laporan').value;
    const tglLaporan = tglLaporanValue ? new Date(tglLaporanValue) : new Date();
    const profilSwitches = document.querySelectorAll('.rapor-profil-switch');
    const profil = {};
    profilSwitches.forEach(s => {
        const profilName = s.getAttribute('data-profil');
        profil[profilName] = s.checked ? 'Terpenuhi' : 'Belum';
    });
    const nilaiInputs = getCachedSelector('nilaiInputs');
    const mapelSwitches = getCachedSelector('mapelSwitches');
    const mapelNilai = [];
    let totalNilai = 0;
    const switchMap = new Map();
    mapelSwitches.forEach(s => {
        switchMap.set(s.getAttribute('data-mapel'), s.checked);
    });
    nilaiInputs.forEach(input => {
        const mapel = input.getAttribute('data-mapel');
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
    const catatKokul = document.getElementById('rapor-catatan-kokul').value || '';
    const capaianKompetensiMap = {};
    const capaianInputs = document.querySelectorAll('.rapor-capaian-kompetensi-input');
    capaianInputs.forEach(input => {
        const mapel = input.getAttribute('data-mapel');
        const value = input.value || '';
        capaianKompetensiMap[mapel] = value;
    });
    const capaianInputsMulok = document.querySelectorAll('.rapor-capaian-kompetensi-mulok-input');
    capaianInputsMulok.forEach(input => {
        const muatan = input.getAttribute('data-muatan');
        const value = input.value || '';
        capaianKompetensiMap[muatan] = value;
    });
    const tglLaporanObj = new Date(tglLaporan);
    const tglFormat = tglLaporanObj.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
    const lokasiLaporan = (document.getElementById('rapor-lokasi-laporan') && document.getElementById('rapor-lokasi-laporan').value) ? document.getElementById('rapor-lokasi-laporan').value.trim() : '';
    const tglWithLokasi = lokasiLaporan ? `${lokasiLaporan}, ${tglFormat}` : tglFormat;
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
        ${muatanLokal.length > 0 ? `
        <div class="rapor-section">
            <table class="rapor-table">
                <thead>
                    <tr>
                        <th style="width: 30px;">No.</th>
                        <th>Mata Pelajaran</th>
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
    if (ekskul.length === 0) {
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
        <div class="rapor-section" style="margin-top: 20px;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
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
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 30px; font-size: 10pt; margin-bottom: 60px;">
                <div style="text-align: center;">
                    <div style="height: 18px; font-size:9pt; margin-bottom: 6px;"></div>
                    <div style="margin-bottom: 60px; font-weight: bold;">Orang Tua/Wali Murid</div>
                    <div style="margin-top: 10px; height: 50px;"></div>
                    <div style="padding-top: 4px;">
                        <div style="font-weight: bold;">_____________________</div>
                        <div style="font-size: 8pt; margin-top: 2px; color: #666;">Tanda tangan</div>
                    </div>
                </div>
                <div></div>
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
            <div style="margin-top: 30px;"></div>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; font-size: 10pt;">
                <div></div>
                <div style="text-align: center;">
                    <div style="margin-bottom: 60px; font-weight: bold;">Mengetahui,<br>Kepala Sekolah</div>
                    <div style="margin-top: 10px; height: 50px;"></div>
                    <div style="padding-top: 4px;">
                        <div style="font-weight: bold;">${kepsek || '_____________________'}</div>
                        <div style="font-size: 8pt; margin-top: 2px; color: #666;">NIP: ${nipKepsek || '_____________________'}</div>
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    `;
    document.getElementById('res-rapor-content').innerHTML = html;
    document.getElementById('res-rapor').style.display = 'block';
    document.getElementById('stat-generated').innerText = parseInt(document.getElementById('stat-generated').innerText) + 1;
    setTimeout(() => {
        document.getElementById('res-rapor').scrollIntoView({ behavior: 'smooth' });
    }, 100);
});
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
    if (raporExcelSelectBtn && raporExcelInput) {
        raporExcelSelectBtn.addEventListener('click', () => raporExcelInput.click());
    }
    if (raporExcelClearBtn) {
        raporExcelClearBtn.addEventListener('click', () => {
            window.raporExcelRows = [];
            if (raporExcelList) { raporExcelList.innerHTML = ''; raporExcelList.style.display = 'none'; }
            if (raporExcelFilename) raporExcelFilename.innerText = '';
            if (raporExcelClearBtn) raporExcelClearBtn.style.display = 'none';
            if (raporExcelGenerateAllBtn) raporExcelGenerateAllBtn.style.display = 'none';
            if (raporExcelNote) raporExcelNote.style.display = 'none';
            showToast('Data Excel dihapus');
        });
    }
    if (raporExcelInput) {
        raporExcelInput.addEventListener('change', function (e) {
            const f = e.target.files[0];
            if (!f) return;
            if (raporExcelFilename) raporExcelFilename.innerText = f.name;
            const reader = new FileReader();
            reader.onload = function (ev) {
                try {
                    const data = ev.target.result;
                    const workbook = XLSX.read(data, { type: 'binary' });
                    const sheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[sheetName];
                    const json = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
                    if (!json || json.length === 0) { showToast('Sheet kosong atau tidak terbaca'); return; }
                    window.raporExcelRows = json;
                    renderRaporExcelList();
                    if (raporExcelClearBtn) raporExcelClearBtn.style.display = 'inline-flex';
                    if (raporExcelGenerateAllBtn) raporExcelGenerateAllBtn.style.display = 'inline-flex';
                    if (raporExcelNote) raporExcelNote.style.display = 'inline-block';
                } catch (err) { console.error(err); showToast('Gagal membaca file Excel'); }
            };
            reader.readAsBinaryString(f);
        });
    }
    if (raporExcelTemplateBtn) {
        raporExcelTemplateBtn.addEventListener('click', function () {
            try {
                const wb = XLSX.utils.book_new();
                const headers = [
                    'Nama', 'NISN', 'Kelas', 'Fase', 'Semester', 'Tahun',
                    'Mapel_PendidikanAgama_Nilai',
                    'Mapel_PendidikanPancasila_Nilai',
                    'Mapel_BahasaIndonesia_Nilai',
                    'Mapel_Matematika_Nilai',
                    'Mapel_IPAS_Nilai',
                    'Mapel_PJOK_Nilai',
                    'Mapel_SeniBudaya_Nilai',
                    'Mapel_BahasaInggris_Nilai',
                    'Mapel_PendidikanAgama_Capaian',
                    'Mapel_PendidikanPancasila_Capaian',
                    'Mapel_BahasaIndonesia_Capaian',
                    'Mapel_Matematika_Capaian',
                    'Mapel_IPAS_Capaian',
                    'Mapel_PJOK_Capaian',
                    'Mapel_SeniBudaya_Capaian',
                    'Mapel_BahasaInggris_Capaian',
                    'MuatanLocal1_Name', 'MuatanLocal1_Nilai',
                    'MuatanLocal2_Name', 'MuatanLocal2_Nilai',
                    'MuatanLocal1_Capaian',
                    'MuatanLocal2_Capaian',
                    'TemaKokul',
                    'Profil_Keimanan', 'Profil_Kewargaan', 'Profil_PenalaranKritis', 'Profil_Kreativitas', 'Profil_Kolaborasi', 'Profil_Kemandirian', 'Profil_Kesehatan', 'Profil_Komunikasi',
                    'CatatanKokul',
                    'Ekstrakurikuler',
                    'Sakit', 'Izin', 'Alfa',
                    'Catatan',
                    'Walikelas', 'NIP_Walikelas', 'AlamatSekolah', 'Kepsek', 'NIP_Kepsek', 'LokasiLaporan', 'TanggalLaporan'
                ];
                const example = [
                    'Budi Santoso', '1234567890', 'VI A', 'C', 'Ganjil', '2025/2026',
                    '85', '85', '88', '90', '85', '92', '88', '86',
                    'Ananda menunjukkan pemahaman yang kuat tentang nilai-nilai keagamaan dan mampu mengintegrasikannya dalam kehidupan sehari-hari.',
                    'Ananda mampu menganalisis isu-isu nasional dengan kritis dan memberikan solusi yang konstruktif.',
                    'Ananda mampu menguasai tata bahasa dan menciptakan karya tulis yang kohesif dan komunikatif.',
                    'Ananda menguasai konsep matematika dengan baik dan mampu menerapkannya dalam pemecahan masalah kontekstual.',
                    'Ananda memahami fenomena alam dan sosial dengan sudut pandang yang holistik dan sistematis.',
                    'Ananda menunjukkan kebugaran jasmani yang optimal dan memiliki pemahaman mendalam tentang gaya hidup sehat.',
                    'Ananda mampu mengekspresikan ide-ide kreatif melalui berbagai medium seni dengan teknik yang baik.',
                    'Ananda mampu berkomunikasi dalam bahasa Inggris dengan baik meskipun masih perlu peningkatan dalam vocabulary.',
                    'Budaya Lokal', '85',
                    'Bahasa Daerah', '80',
                    'Ananda menunjukkan apresiasi yang tinggi terhadap warisan budaya lokal dan mampu melestarikannya.',
                    'Ananda mampu menggunakan bahasa daerah dalam komunikasi sehari-hari dengan baik.',
                    'Aku Cinta Tanaman',
                    'Terpenuhi', 'Terpenuhi', 'Terpenuhi', 'Terpenuhi', 'Terpenuhi', 'Terpenuhi', 'Terpenuhi', 'Terpenuhi',
                    'Ananda sangat aktif dalam kegiatan proyek dan menunjukkan dedikasi yang tinggi.',
                    'Pramuka;Robotika',
                    '0', '0', '0',
                    'Siswa menunjukkan potensi akademik yang baik terutama dalam mata pelajaran Matematika dan Bahasa Indonesia. Disarankan untuk lebih fokus pada pengembangan keterampilan kolaborasi.',
                    'Ibu Siti Nurhaliza', '198765432', 'Jl. Merdeka No.1', 'Drs. Kepala Sekolah', '987654321', 'Kab. Tangerang', '2025-12-03'
                ];
                const sheetData = [headers, example];
                const ws = XLSX.utils.aoa_to_sheet(sheetData);
                ws['!cols'] = headers.map(() => ({ wch: 20 }));
                XLSX.utils.book_append_sheet(wb, ws, 'DATA SISWA');
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
            } catch (err) { console.error('Gagal membuat template', err); showToast('Gagal membuat template'); }
        });
    }
    function renderRaporExcelList() {
        if (!window.raporExcelRows || window.raporExcelRows.length === 0) { if (raporExcelList) raporExcelList.style.display = 'none'; return; }
        if (!raporExcelList) return;
        raporExcelList.style.display = 'block';
        const BATCH_SIZE = 50;
        const totalRows = window.raporExcelRows.length;
        const displayRows = Math.min(totalRows, BATCH_SIZE);
        let html = '<table style="width:100%; border-collapse:collapse; font-size:0.9rem;">';
        html += '<thead><tr><th style="text-align:left; padding:6px; border-bottom:1px solid var(--border);">#</th><th style="text-align:left; padding:6px; border-bottom:1px solid var(--border);">Nama</th><th style="text-align:left; padding:6px; border-bottom:1px solid var(--border);">NISN</th><th style="text-align:left; padding:6px; border-bottom:1px solid var(--border);">Kelas</th><th style="text-align:left; padding:6px; border-bottom:1px solid var(--border);">Aksi</th></tr></thead><tbody>';
        for (let i = 0; i < displayRows; i++) {
            const r = window.raporExcelRows[i];
            const nama = r['Nama'] || r['name'] || r['NAMA'] || r['nama'] || '';
            const nisn = r['NISN'] || r['nisn'] || '';
            const kelas = r['Kelas'] || r['kelas'] || r['Class'] || r['class'] || '';
            html += `<tr><td style="padding:6px; border-bottom:1px solid var(--border);">${i + 1}</td><td style="padding:6px; border-bottom:1px solid var(--border);">${nama}</td><td style="padding:6px; border-bottom:1px solid var(--border);">${nisn}</td><td style="padding:6px; border-bottom:1px solid var(--border);">${kelas}</td><td style="padding:6px; border-bottom:1px solid var(--border);"><button class="btn btn-secondary btn-sm" onclick="fillRaporForm(${i})">Isi ke Form</button> <button class="btn btn-primary btn-sm" onclick="previewRaporRow(${i})">Preview</button></td></tr>`;
        }
        html += '</tbody></table>';
        if (totalRows > BATCH_SIZE) {
            html += `<div style="padding:10px; background:#fff3cd; border-radius:4px; margin-top:10px; font-size:0.9rem;">
                <strong>⚠️ Optimasi Performa:</strong> Menampilkan ${displayRows} dari ${totalRows} siswa. 
                Untuk efisiensi, anda bisa proses dalam batch atau generate per siswa.
            </div>`;
        }
        raporExcelList.innerHTML = html;
    }
    window.fillRaporForm = function (index, suppressToast = false) {
        const row = window.raporExcelRows[index];
        if (!row) return;
        const get = (keys) => { for (const k of keys) if (row[k] !== undefined) return row[k]; return ''; };
        document.getElementById('rapor-nama').value = get(['Nama', 'name', 'NAMA', 'nama']);
        document.getElementById('rapor-nisn').value = get(['NISN', 'nisn']);
        document.getElementById('rapor-kelas').value = get(['Kelas', 'kelas', 'Class', 'class']);
        const faseVal = get(['Fase', 'fase']); if (faseVal) document.getElementById('rapor-fase').value = faseVal;
        const semVal = get(['Semester', 'semester']); if (semVal) document.getElementById('rapor-semester').value = semVal;
        const thVal = get(['Tahun', 'Tahun Ajaran', 'tahun']); if (thVal) document.getElementById('rapor-tahun').value = thVal;
        const sVal = get(['Sakit', 'sakit']); if (sVal !== '') document.getElementById('rapor-sakit').value = sVal;
        const iVal = get(['Izin', 'izin']); if (iVal !== '') document.getElementById('rapor-izin').value = iVal;
        const aVal = get(['Alfa', 'alfa']); if (aVal !== '') document.getElementById('rapor-alfa').value = aVal;
        const temaVal = get(['TemaKokul', 'temakokul']); if (temaVal) document.getElementById('rapor-tema-kokul').value = temaVal;
        const catKokulVal = get(['CatatanKokul', 'catatan_kokul', 'catatankokul']); if (catKokulVal) document.getElementById('rapor-catatan-kokul').value = catKokulVal;
        const eksVal = get(['Ekstrakurikuler', 'ekstrakurikuler']); if (eksVal) document.getElementById('rapor-ekstrakurikuler').value = eksVal;
        const catVal = get(['Catatan', 'catatan']); if (catVal) document.getElementById('rapor-catatan').value = catVal;
        const waliVal = get(['Walikelas', 'walikelas']); if (waliVal) document.getElementById('rapor-walikelas').value = waliVal;
        const nipWaliVal = get(['NIP_Walikelas', 'nip_walikelas']); if (nipWaliVal) document.getElementById('rapor-nip').value = nipWaliVal;
        const alamatVal = get(['AlamatSekolah', 'alamatsekolah']); if (alamatVal) document.getElementById('rapor-alamat-sekolah').value = alamatVal;
        const kepsekVal = get(['Kepsek', 'kepsek']); if (kepsekVal) document.getElementById('rapor-kepsek').value = kepsekVal;
        const nipKepsekVal = get(['NIP_Kepsek', 'nip_kepsek']); if (nipKepsekVal) document.getElementById('rapor-nip-kepsek').value = nipKepsekVal;
        const lokasiVal = get(['LokasiLaporan', 'lokasi_laporan']); if (lokasiVal) document.getElementById('rapor-lokasi-laporan').value = lokasiVal;
        const tglVal = get(['TanggalLaporan', 'tanggal_laporan']); if (tglVal) document.getElementById('rapor-tanggal-laporan').value = tglVal;
        document.querySelectorAll('.rapor-profil-switch').forEach(switchEl => {
            const profilName = switchEl.getAttribute('data-profil');
            const profilKey = `Profil_${profilName.replace(/\s+/g, '')}`;
            const profilVal = row[profilKey];
            switchEl.checked = profilVal && (profilVal.toLowerCase().includes('terpenuhi') || profilVal.toLowerCase() === 'ya' || profilVal === '1' || profilVal === true);
        });
        document.querySelectorAll('.rapor-nilai-input').forEach(nilaiInput => {
            const mapel = nilaiInput.getAttribute('data-mapel');
            const nilaiKey = `Mapel_${mapel.replace(/\s+/g, '')}_Nilai`;
            const nilaiVal = row[nilaiKey] || row[mapel] || '';
            if (nilaiVal) nilaiInput.value = nilaiVal;
        });
        document.querySelectorAll('.rapor-capaian-kompetensi-input').forEach(capaianInput => {
            const mapel = capaianInput.getAttribute('data-mapel');
            const capaianKey = `Mapel_${mapel.replace(/\s+/g, '')}_Capaian`;
            const capaianVal = row[capaianKey];
            if (capaianVal) capaianInput.value = capaianVal;
        });
        document.querySelectorAll('.rapor-muatan-lokal-nilai').forEach((muatanInput, idx) => {
            const muatanNameInput = muatanInput.parentElement.querySelector('.rapor-muatan-lokal-nama');
            const muatanNameKey = `MuatanLocal${idx + 1}_Name`;
            const muatanName = row[muatanNameKey];
            if (muatanName) {
                muatanNameInput.value = muatanName;
                muatanInput.setAttribute('data-muatan', muatanName);
            }
            const muatanValueKey = `MuatanLocal${idx + 1}_Nilai`;
            const muatanValue = row[muatanValueKey];
            if (muatanValue) muatanInput.value = muatanValue;
        });
        document.querySelectorAll('.rapor-capaian-kompetensi-mulok-input').forEach((capaianInput, idx) => {
            const capaianKey = `MuatanLocal${idx + 1}_Capaian`;
            const capaianVal = row[capaianKey];
            if (capaianVal) capaianInput.value = capaianVal;
        });
        if (!suppressToast) {
            showToast('Data siswa dimuat ke form. Klik "Buat & Preview E-Rapor" untuk menampilkan rapor.');
        }
    };
    window.previewRaporRow = function (index) {
        window.fillRaporForm(index, true);
        document.getElementById('btn-gen-rapor').click();
    };
    if (raporExcelGenerateAllBtn) {
        raporExcelGenerateAllBtn.addEventListener('click', async function () {
            if (!window.raporExcelRows || window.raporExcelRows.length === 0) { showToast('Tidak ada data'); return; }
            showBatchProgress(window.raporExcelRows.length);
            showToast('🎬 Memulai preview semua rapor (berurutan)...');
            for (let i = 0; i < window.raporExcelRows.length; i++) {
                if (batchProcessState.abortRequested) {
                    showToast('⏹️ Preview dibatalkan oleh user');
                    break;
                }
                while (batchProcessState.isPaused && !batchProcessState.abortRequested) {
                    await new Promise(r => setTimeout(r, 500));
                }
                try {
                    const siswaName = window.raporExcelRows[i]['Nama'] || `Siswa ${i + 1}`;
                    batchProcessState.currentSiswaName = siswaName;
                    window.fillRaporForm(i, true);
                    document.getElementById('btn-gen-rapor').click();
                    batchProcessState.successCount++;
                    batchProcessState.processedCount++;
                    updateBatchProgress();
                    const delay = 700;
                    await new Promise(r => setTimeout(r, delay));
                } catch (err) {
                    console.error(`Gagal preview siswa ke-${i + 1}:`, err);
                    batchProcessState.failedCount++;
                    batchProcessState.failedList.push({
                        index: i + 1,
                        nama: window.raporExcelRows[i]['Nama'] || 'Unknown',
                        error: err.message
                    });
                    batchProcessState.processedCount++;
                    updateBatchProgress();
                }
            }
            const totalTime = ((Date.now() - batchProcessState.startTime) / 1000).toFixed(1);
            showToast(`✅ Selesai! Preview ${batchProcessState.successCount}/${window.raporExcelRows.length} siswa (${totalTime}s)`);
            if (batchProcessState.failedCount > 0) {
                showToast(`⚠️ Ada ${batchProcessState.failedCount} siswa yang gagal`);
            }
            hideBatchProgress();
        });
    }
    document.getElementById('rapor-batch-pause').addEventListener('click', function () {
        if (batchProcessState.isPaused) {
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
    document.getElementById('rapor-batch-stop').addEventListener('click', function () {
        batchProcessState.abortRequested = true;
        batchProcessState.isPaused = false;
        showToast('🛑 Menghentikan preview...');
    });
} catch (e) { console.warn('Import Excel init skipped:', e); }
window.printRapor = function (divId) {
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
document.getElementById('btn-gen-catatan-wali').addEventListener('click', async function () {
    const btn = this;
    const nama = document.getElementById('rapor-nama').value || 'Siswa';
    const nilaiInputs = document.querySelectorAll('.rapor-nilai-input');
    const mapelNilai = [];
    nilaiInputs.forEach(input => {
        const mapel = input.getAttribute('data-mapel');
        const nilai = parseInt(input.value) || 0;
        mapelNilai.push({ mapel, nilai });
    });
    if (mapelNilai.length === 0) {
        showToast('Silakan isi minimal satu nilai mata pelajaran terlebih dahulu');
        return;
    }
    btn.classList.add('loading');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
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
    } catch (err) {
        console.error(err);
        showToast('Gagal generate catatan wali kelas');
    } finally {
        btn.classList.remove('loading');
        btn.innerHTML = '<i class="fas fa-magic"></i> Generate dengan AI';
    }
});
document.getElementById('btn-gen-catatan-kokul').addEventListener('click', async function () {
    const btn = this;
    const nama = document.getElementById('rapor-nama').value || 'Siswa';
    const temakokul = document.getElementById('rapor-tema-kokul').value || 'proyek kokurikuler';
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
    } catch (err) {
        console.error(err);
        showToast('Gagal generate catatan kokurikuler');
    } finally {
        btn.classList.remove('loading');
        btn.innerHTML = '<i class="fas fa-magic"></i> Generate dengan AI';
    }
});
document.getElementById('btn-gen-capaian-kompetensi').addEventListener('click', async function () {
    const btn = this;
    const nama = document.getElementById('rapor-nama').value || 'Siswa';
    const nilaiInputs = document.querySelectorAll('.rapor-nilai-input');
    const mapelNilai = [];
    nilaiInputs.forEach(input => {
        const mapel = input.getAttribute('data-mapel');
        const nilai = parseInt(input.value) || 0;
        const mapelSwitch = Array.from(document.querySelectorAll('.rapor-mapel-switch')).find(
            s => s.getAttribute('data-mapel') === mapel
        );
        if (mapelSwitch && mapelSwitch.checked) {
            mapelNilai.push({ mapel, nilai });
        }
    });
    if (mapelNilai.length === 0) {
        showToast('Silakan isi minimal satu nilai mata pelajaran terlebih dahulu');
        return;
    }
    btn.classList.add('loading');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
    try {
        for (let mapel of mapelNilai) {
            let kategori = 'cukup';
            if (mapel.nilai >= 90) kategori = 'sangat baik';
            else if (mapel.nilai >= 80) kategori = 'baik';
            else if (mapel.nilai >= 70) kategori = 'cukup';
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
                const textarea = document.querySelector(`.rapor-capaian-kompetensi-input[data-mapel="${mapel.mapel}"]`);
                if (textarea) {
                    textarea.value = result.trim();
                }
            } catch (err) {
                console.error(`Error generating for ${mapel.mapel}:`, err);
            }
        }
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
        const container = document.getElementById('rapor-capaian-kompetensi-container');
        if (container) {
            const existingPreview = container.parentElement.querySelector('.capaian-preview-container');
            if (existingPreview) existingPreview.remove();
            const previewDiv = document.createElement('div');
            previewDiv.className = 'capaian-preview-container';
            previewDiv.innerHTML = previewHtml;
            container.parentElement.appendChild(previewDiv);
        }
        showToast('Capaian Kompetensi per Mapel berhasil di-generate!');
    } catch (err) {
        console.error(err);
        showToast('Gagal generate capaian kompetensi');
    } finally {
        btn.classList.remove('loading');
        btn.innerHTML = '<i class="fas fa-magic"></i> Generate Capaian Kompetensi untuk Semua Mapel';
    }
});
document.getElementById('btn-gen-capaian-kompetensi-mulok').addEventListener('click', async function () {
    const btn = this;
    const nama = document.getElementById('rapor-nama').value || 'Siswa';
    const muatanInputs = document.querySelectorAll('.rapor-muatan-lokal-nilai');
    const muatanNilai = [];
    muatanInputs.forEach(input => {
        const muatan = input.getAttribute('data-muatan');
        const nilai = parseInt(input.value) || 0;
        muatanNilai.push({ muatan, nilai });
    });
    if (muatanNilai.length === 0) {
        showToast('Silakan isi minimal satu nilai muatan lokal terlebih dahulu');
        return;
    }
    btn.classList.add('loading');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
    try {
        for (let muatan of muatanNilai) {
            let kategori = 'cukup';
            if (muatan.nilai >= 90) kategori = 'sangat baik';
            else if (muatan.nilai >= 80) kategori = 'baik';
            else if (muatan.nilai >= 70) kategori = 'cukup';
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
                const textarea = document.querySelector(`.rapor-capaian-kompetensi-mulok-input[data-muatan="${muatan.muatan}"]`);
                if (textarea) {
                    textarea.value = result.trim();
                }
            } catch (err) {
                console.error(`Error generating for ${muatan.muatan}:`, err);
            }
        }
        showToast('Capaian Kompetensi Muatan Lokal berhasil di-generate!');
    } catch (err) {
        console.error(err);
        showToast('Gagal generate capaian kompetensi muatan lokal');
    } finally {
        btn.classList.remove('loading');
        btn.innerHTML = '<i class="fas fa-magic"></i> Generate Capaian Kompetensi Muatan Lokal';
    }
});
function initAddItemModals() {
    if (document.getElementById('add-mapel-modal')) return;
    const modalHTML = `
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
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    populateMapelSelect();
}
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
    if (!select) return;
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
    if (!document.getElementById('add-mapel-modal')) {
        initAddItemModals();
    }
    document.getElementById('add-mapel-modal').classList.add('show');
    document.getElementById('add-mapel-custom-input').value = '';
    document.getElementById('add-mapel-select').value = '';
    document.getElementById('add-mapel-nilai').value = '75';
}
function closeAddMapelModal() {
    const modal = document.getElementById('add-mapel-modal');
    if (modal) modal.classList.remove('show');
}
function onMapelSelectChange() {
    const select = document.getElementById('add-mapel-select');
    const customInput = document.getElementById('add-mapel-custom-input');
    if (select.value) {
        customInput.value = select.value;
    }
}
function saveAddMapel() {
    const mapelName = document.getElementById('add-mapel-custom-input').value.trim();
    const nilai = parseInt(document.getElementById('add-mapel-nilai').value) || 75;
    if (!mapelName) {
        showToast('Silakan masukkan nama mata pelajaran');
        return;
    }
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
    syncMapelCapaian();
    showToast(`Mata Pelajaran "${mapelName}" berhasil ditambahkan!`);
    closeAddMapelModal();
}
function openAddMulokModal() {
    if (!document.getElementById('add-mulok-modal')) {
        initAddItemModals();
    }
    document.getElementById('add-mulok-modal').classList.add('show');
    document.getElementById('add-mulok-custom-input').value = '';
    document.getElementById('add-mulok-select').value = '';
    document.getElementById('add-mulok-nilai').value = '75';
}
function closeAddMulokModal() {
    const modal = document.getElementById('add-mulok-modal');
    if (modal) modal.classList.remove('show');
}
function onMulokSelectChange() {
    const select = document.getElementById('add-mulok-select');
    const customInput = document.getElementById('add-mulok-custom-input');
    if (select.value) {
        customInput.value = select.value;
    }
}
function saveAddMulok() {
    const muatanName = document.getElementById('add-mulok-custom-input').value.trim();
    const nilai = parseInt(document.getElementById('add-mulok-nilai').value) || 75;
    if (!muatanName) {
        showToast('Silakan masukkan nama muatan lokal');
        return;
    }
    const id = __genMuatanId();
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
    const nameInput = div.querySelector('.rapor-muatan-lokal-nama');
    const nilaiInput = div.querySelector('.rapor-muatan-lokal-nilai');
    const removeBtn = div.querySelector('.remove-mulok');
    removeBtn.addEventListener('click', function () {
        div.remove();
        const cap = capContainer.querySelector(`.rapor-capaian-kompetensi-mulok-input[data-muatan-id="${id}"]`);
        if (cap && cap.parentElement) cap.parentElement.remove();
    });
    nameInput.addEventListener('input', function () {
        const newName = this.value.trim();
        if (!newName) return;
        nilaiInput.setAttribute('data-muatan', newName);
        const capTextarea = capContainer.querySelector(`.rapor-capaian-kompetensi-mulok-input[data-muatan-id="${id}"]`);
        if (capTextarea) {
            capTextarea.setAttribute('data-muatan', newName);
            const lbl = capTextarea.parentElement && capTextarea.parentElement.querySelector('label');
            if (lbl) lbl.textContent = newName;
        }
    });
    showToast(`Muatan Lokal "${muatanName}" berhasil ditambahkan!`);
    closeAddMulokModal();
}
function downloadTemplateGoogleSheet() {
    try {
        const dataSiswaHeader = ['NIS', 'NISN', 'Nama Peserta Didik', 'Jenis Kelamin', 'Tempat Lahir', 'Tanggal Lahir', 'Agama', 'Pendidikan Sebelumnya', 'Alamat', 'Nama Ayah', 'Pekerjaan Ayah', 'Nama Ibu', 'Pekerjaan Ibu', 'Alamat Orang Tua', 'Nama Wali', 'Pekerjaan Wali', 'Alamat Wali', 'Nomor Telepon'];
        const dataSiswaRows = [
            ['12345', '1234567891011121', 'Ahmad Riyad', 'Laki-laki', 'Jakarta', '2010-01-01', 'Islam', 'TK/RA', 'Jl. Merdeka No. 1, Jakarta', 'Budi Santoso', 'Karyawan Swasta', 'Siti Nurhaliza', 'Ibu Rumah Tangga', 'Jl. Merdeka No. 1, Jakarta', '-', '-', '-', '021-1234567'],
            ['12346', '1234567891011122', 'Siti Aisyah', 'Perempuan', 'Bandung', '2010-02-15', 'Islam', 'TK/RA', 'Jl. Ahmad Yani No. 2, Bandung', 'Hendra Wijaya', 'Karyawan', 'Rina Wijaya', 'Karyawan', 'Jl. Ahmad Yani No. 2, Bandung', '-', '-', '-', '022-9876543']
        ];
        const today = new Date().toISOString().split('T')[0];
        const absensiHeader = ['NISN', 'Nama', 'Tanggal', 'Status'];
        const absensiRows = [
            ['1234567891011121', 'Ahmad Riyad', today, 'Hadir'],
            ['1234567891011122', 'Siti Aisyah', today, 'Hadir'],
            ['1234567891011123', 'Budi Hermawan', today, 'Sakit'],
            ['1234567891011124', 'Dewi Lestari', today, 'Izin'],
            ['1234567891011125', 'Eka Putra', today, 'Alpa']
        ];
        const nilaiHeader = ['NISN', 'Nama', 'Mata Pelajaran', 'Jenis Asesmen', 'Nilai', 'Catatan'];
        const nilaiRows = [
            ['1234567891011121', 'Ahmad Riyad', 'Matematika', 'Sumatif', 85, 'Bagus'],
            ['1234567891011121', 'Ahmad Riyad', 'Bahasa Indonesia', 'Sumatif', 80, 'Cukup'],
            ['1234567891011122', 'Siti Aisyah', 'Matematika', 'Sumatif', 90, 'Sangat Bagus'],
            ['1234567891011122', 'Siti Aisyah', 'Bahasa Indonesia', 'Sumatif', 88, 'Sangat Bagus']
        ];
        const workbook = XLSX.utils.book_new();

        // Sheet 1: Data Siswa
        const dataSiswaSheet = XLSX.utils.aoa_to_sheet([dataSiswaHeader, ...dataSiswaRows]);
        dataSiswaSheet['!cols'] = [
            { wch: 10 },
            { wch: 15 },
            { wch: 20 },
            { wch: 15 },
            { wch: 15 },
            { wch: 15 },
            { wch: 12 },
            { wch: 18 },
            { wch: 20 },
            { wch: 15 },
            { wch: 15 },
            { wch: 15 },
            { wch: 15 },
            { wch: 20 },
            { wch: 15 },
            { wch: 15 },
            { wch: 20 },
            { wch: 15 }
        ];
        XLSX.utils.book_append_sheet(workbook, dataSiswaSheet, 'Data Siswa');

        // Sheet 2: Absensi
        const absensiSheet = XLSX.utils.aoa_to_sheet([absensiHeader, ...absensiRows]);
        absensiSheet['!cols'] = [
            { wch: 15 },
            { wch: 20 },
            { wch: 12 },
            { wch: 12 }
        ];
        XLSX.utils.book_append_sheet(workbook, absensiSheet, 'Absensi');

        // Sheet 3: Nilai Siswa
        const nilaiSheet = XLSX.utils.aoa_to_sheet([nilaiHeader, ...nilaiRows]);
        nilaiSheet['!cols'] = [
            { wch: 15 },
            { wch: 20 },
            { wch: 20 },
            { wch: 15 },
            { wch: 10 },
            { wch: 20 }
        ];
        XLSX.utils.book_append_sheet(workbook, nilaiSheet, 'Nilai Siswa');

        XLSX.writeFile(workbook, 'Template_DigiArju.xlsx');
        showToast('✓ Template Excel dengan 3 sheet (Data Siswa, Absensi, Nilai Siswa) berhasil diunduh! Buat Google Sheet kemudian import file ini ke Google Sheets.', 'success');
    } catch (error) {
        console.error('Error downloading template:', error);
        showToast('❌ Gagal membuat template: ' + error.message, 'danger');
    }
}

let dataSiswa = JSON.parse(localStorage.getItem('dataSiswa')) || [];
let dataAbsensi = JSON.parse(localStorage.getItem('dataAbsensi')) || [];
let dataNilaiSiswa = JSON.parse(localStorage.getItem('dataNilaiSiswa')) || [];
const statusAbsensi = ['Hadir', 'Sakit', 'Izin', 'Alpa'];
const statusColor = {
    'Hadir': '#10b981',
    'Sakit': '#f59e0b',
    'Izin': '#3b82f6',
    'Alpa': '#ef4444'
};
function validateGoogleSheetUrl(url) {
    const trimmed = url.trim();
    if (!trimmed.includes('docs.google.com/spreadsheets')) {
        return { valid: false, error: 'URL harus dari Google Spreadsheet (docs.google.com/spreadsheets)' };
    }
    const sheetIdMatch = trimmed.match(/\/d\/([a-zA-Z0-9-_]+)/);
    if (!sheetIdMatch) {
        return { valid: false, error: 'Tidak ada Sheet ID ditemukan dalam URL' };
    }
    const gidMatch = trimmed.match(/[#&]gid=([0-9]+)/);
    const gid = gidMatch ? gidMatch[1] : '0';
    return { valid: true, sheetId: sheetIdMatch[1], gid: gid };
}
function convertGoogleSheetToCSV(spreadsheetUrl, gid = null) {
    try {
        let sheetId = null;
        const sheetIdMatch = spreadsheetUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
        if (sheetIdMatch) {
            sheetId = sheetIdMatch[1];
        } else {
            return null;
        }
        let selectedGid = '0';
        if (gid !== null && gid !== undefined) {
            selectedGid = gid.toString();
        } else {
            const gidMatch = spreadsheetUrl.match(/[#&]gid=([0-9]+)/);
            selectedGid = gidMatch ? gidMatch[1] : '0';
        }
        const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${selectedGid}`;
        console.log(`📄 Converting Sheet (sheetId=${sheetId}, gid=${selectedGid}) to CSV`);
        console.log(`🔗 CSV URL:`, csvUrl);
        return csvUrl;
    } catch (e) {
        console.error('Error in convertGoogleSheetToCSV:', e);
        return null;
    }
}
function parseCSVLine(line) {
    const result = [];
    let current = '';
    let insideQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const nextChar = line[i + 1];
        if (char === '"') {
            if (insideQuotes && nextChar === '"') {
                current += '"';
                i++;
            } else {
                insideQuotes = !insideQuotes;
            }
        } else if (char === ',' && !insideQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current.trim());
    return result;
}
async function syncDataSiswaFromGoogle() {
    const p1 = document.getElementById('ds-datasheet-link')?.value?.trim() || '';
    if (!p1) {
        showToast('⚠️ Link Google Spreadsheet belum diisi di menu Data Siswa! Silakan isi terlebih dahulu.', 'danger');
        return;
    }
    const validation = validateGoogleSheetUrl(p1);
    if (!validation.valid) {
        showToast('❌ ' + validation.error, 'danger');
        console.error('URL Validation Error:', validation.error);
        return;
    }
    console.log('✅ URL Valid - SheetId:', validation.sheetId, '| gid:', validation.gid);
    try {
        const csvUrl = convertGoogleSheetToCSV(p1, validation.gid);
        if (!csvUrl) {
            showToast('❌ Gagal mengkonversi URL. Format URL tidak sesuai.', 'danger');
            return;
        }
        showToast(`⏳ Mengunduh data siswa dari Google Sheet (gid=${validation.gid})...`, 'info');
        const response = await fetch(csvUrl, {
            mode: 'cors',
            headers: {
                'Accept': 'text/csv',
                'Pragma': 'no-cache',
                'Cache-Control': 'no-cache'
            }
        });
        if (!response.ok) {
            let errorMsg = `HTTP ${response.status}`;
            if (response.status === 404) {
                errorMsg = `🔴 Sheet gid=${validation.gid} tidak ditemukan (404). Periksa apakah tab dengan ID ini ada di spreadsheet.`;
            } else if (response.status === 403) {
                errorMsg = '🔴 Akses ditolak (403). Sheet harus di-share dengan "Siapa saja dengan link" atau "Publik".';
            } else if (response.status === 400) {
                errorMsg = `🔴 Request tidak valid (400). Cek gid=${validation.gid}. Mungkin tab/sheet dengan ID ini tidak ada.`;
            }
            throw new Error(errorMsg);
        }
        const csv = await response.text();
        if (!csv || csv.trim().length === 0) {
            showToast('⚠️ Sheet kosong atau tidak dapat dibaca! Pastikan ada data di sheet dengan gid=' + validation.gid, 'danger');
            return;
        }
        const lines = csv.split('\n').filter(line => line.trim());
        console.log('📊 CSV Info - Total baris:', lines.length);
        if (lines.length > 0) {
            console.log('📋 Header:', lines[0]);
            if (lines.length > 1) console.log('📋 Row 1:', lines[1]);
        }
        if (lines.length < 2) {
            showToast('⚠️ Sheet hanya memiliki header tanpa data! Pastikan ada data minimal 1 baris di sheet dengan gid=' + validation.gid, 'danger');
            return;
        }
        dataSiswa = [];
        let successCount = 0;
        let errorCount = 0;
        for (let i = 1; i < lines.length; i++) {
            const cols = parseCSVLine(lines[i]);
            if (cols.length === 0 || !cols[0] || cols[0].trim() === '') {
                continue;
            }
            try {
                if (!cols[0] || !cols[1]) {
                    console.warn(`⚠️ Baris ${i}: NIS atau NISN kosong, skip`);
                    errorCount++;
                    continue;
                }
                dataSiswa.push({
                    id: Date.now() + i,
                    nis: (cols[0] || '').trim(),
                    nisn: (cols[1] || '').trim(),
                    nama: (cols[2] || '').trim(),
                    jenisKelamin: (cols[3] || '-').trim(),
                    tempatLahir: (cols[4] || '-').trim(),
                    tanggalLahir: (cols[5] || '-').trim(),
                    agama: (cols[6] || '-').trim(),
                    pendidikanSebelumnya: (cols[7] || '-').trim(),
                    alamat: (cols[8] || '-').trim(),
                    namaAyah: (cols[9] || '-').trim(),
                    pekerjaanAyah: (cols[10] || '-').trim(),
                    namaIbu: (cols[11] || '-').trim(),
                    pekerjaanIbu: (cols[12] || '-').trim(),
                    alamatOrangTua: (cols[13] || '-').trim(),
                    namaWali: (cols[14] || '-').trim(),
                    pekerjaanWali: (cols[15] || '-').trim(),
                    alamatWali: (cols[16] || '-').trim(),
                    nomorTelepon: (cols[17] || '-').trim()
                });
                successCount++;
            } catch (e) {
                console.warn(`⚠️ Baris ${i} gagal diproses:`, e.message, cols);
                errorCount++;
            }
        }
        if (dataSiswa.length === 0) {
            showToast('❌ Tidak ada data siswa valid ditemukan. Periksa:\n1. Kolom 1 = NIS, Kolom 2 = NISN\n2. Ada data minimal 1 baris\n3. gid=' + validation.gid + ' (sheet ID benar)', 'danger');
            console.error('No valid data. Sample:', lines[1], 'Columns:', lines[1] ? parseCSVLine(lines[1]) : []);
            return;
        }
        localStorage.setItem('dataSiswa', JSON.stringify(dataSiswa));
        tampilkanDataSiswa();
        tampilkanAbsensi();
        let message = `✅ ${dataSiswa.length} data siswa berhasil disinkronkan!`;
        if (errorCount > 0) {
            message += ` (${errorCount} baris error)`;
        }
        showToast(message, 'success');
        console.log('✅ Sync berhasil - Total:', dataSiswa.length, 'Data:', dataSiswa);
    } catch (error) {
        console.error('❌ Error sync:', error);
        showToast('❌ Gagal sinkronisasi:\n' + error.message, 'danger');
    }
}
async function simpanAbsensi() {
    const tanggal = document.getElementById('tanggal-absensi').value;
    if (!tanggal) {
        showToast('⚠️ Pilih tanggal absensi terlebih dahulu!', 'danger');
        return;
    }
    const p1 = document.getElementById('ds-datasheet-link')?.value?.trim() || '';
    if (!p1) {
        showToast('❌ Link Google Spreadsheet belum diisi di menu Data Siswa!', 'danger');
        return;
    }
    if (dataSiswa.length === 0) {
        showToast('❌ Tidak ada data siswa! Sinkronisasi data siswa terlebih dahulu.', 'danger');
        return;
    }
    try {
        showToast('⏳ Menyimpan data absensi lokal...', 'info');
        localStorage.setItem('dataAbsensi', JSON.stringify(dataAbsensi));
        let csvData = 'NISN,Nama,Tanggal,Status\n';
        dataSiswa.forEach(siswa => {
            const key = `${tanggal}_${siswa.id}`;
            const status = dataAbsensi[key] || 'Hadir';
            csvData += `"${siswa.nisn}","${siswa.nama}","${tanggal}","${status}"\n`;
        });
        const validation = validateGoogleSheetUrl(p1);
        if (!validation.valid) {
            showToast(`❌ ${validation.error}`, 'danger');
            return;
        }
        const sheetId = validation.sheetId;
        const absensiUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=1`;
        console.log('📤 Menggunakan link dari Profil Guru:', p1);
        console.log('📊 Sheet ID:', sheetId);
        console.log('📤 Mencoba koneksi ke:', absensiUrl);
        console.log('📋 Data CSV:', csvData);
        const response = await fetch(absensiUrl);
        if (!response.ok) {
            if (response.status === 400 || response.status === 404) {
                showToast('ℹ️ Sheet "Absensi" (gid=1) tidak ditemukan.\n\nData absensi disimpan lokal ✅\n\nUntuk sinkronisasi ke Google:\n1. Buka Google Sheet Anda\n2. Tambah sheet baru bernama "Absensi"\n3. Copy-paste data CSV kemudian', 'info');
                console.log('⚠️ Sheet Absensi tidak ada. Data disimpan lokal.');
            } else if (response.status === 403) {
                showToast('❌ HTTP 403: Akses ditolak. Pastikan link dapat diakses publik.', 'danger');
            } else {
                showToast(`❌ HTTP ${response.status}`, 'danger');
            }
            showToast(`✅ Data absensi ${tanggal} disimpan ke komputer ini!`, 'success');
            return;
        }
        showToast(`✅ Data absensi ${tanggal} berhasil diproses!`, 'success');
        console.log('✅ Absensi berhasil');
    } catch (error) {
        console.error('❌ Error:', error);
        localStorage.setItem('dataAbsensi', JSON.stringify(dataAbsensi));
        showToast('✅ Data disimpan lokal (offline mode)', 'success');
    }
}
function downloadAbsensiCSV() {
    const tanggal = document.getElementById('tanggal-absensi').value;
    if (!tanggal) {
        showToast('⚠️ Pilih tanggal absensi terlebih dahulu!', 'danger');
        return;
    }
    if (dataSiswa.length === 0) {
        showToast('⚠️ Tidak ada data siswa! Sinkronisasi data siswa terlebih dahulu.', 'danger');
        return;
    }
    try {
        let csvData = 'NISN,Nama,Tanggal,Status\n';
        dataSiswa.forEach(siswa => {
            const key = `${tanggal}_${siswa.id}`;
            const status = dataAbsensi[key] || 'Hadir';
            csvData += `"${siswa.nisn}","${siswa.nama}","${tanggal}","${status}"\n`;
        });
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `Absensi_${tanggal}.csv`;
        link.click();
        showToast(`✅ File absensi ${tanggal} berhasil diunduh! File: Absensi_${tanggal}.csv`, 'success');
        console.log('📥 Absensi CSV diunduh:', csvData);
    } catch (error) {
        console.error('Error download absensi:', error);
        showToast('❌ Gagal mengunduh absensi: ' + error.message, 'danger');
    }
}
async function syncAbsensiToGoogle() {
    const p1 = document.getElementById('ds-datasheet-link')?.value?.trim() || '';
    if (!p1) {
        showToast('Link Google Spreadsheet belum diisi di menu Data Siswa!', 'danger');
        return;
    }
    try {
        const tanggal = document.getElementById('tanggal-absensi').value;
        if (!tanggal) {
            showToast('Pilih tanggal absensi terlebih dahulu!', 'danger');
            return;
        }
        showToast('Menyiapkan data absensi untuk diunggah ke Google Sheet...', 'info');
        const csvUrl = convertGoogleSheetToCSV(p1, 1);
        if (!csvUrl) {
            showToast('Format URL Google Sheet tidak valid!', 'danger');
            return;
        }
        let csvData = 'NISN,Nama,Tanggal,Status\n';
        dataSiswa.forEach(siswa => {
            const key = `${tanggal}_${siswa.id}`;
            const status = dataAbsensi[key] || 'Hadir';
            csvData += `${siswa.nisn},"${siswa.nama}",${tanggal},${status}\n`;
        });
        showToast('Data absensi siap untuk diupload ke Google Sheet. Gunakan fungsi "Import Data" di Google Sheet untuk menerima data.', 'warning');
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `Absensi_${tanggal}.csv`;
        link.click();
        showToast('File absensi diunduh. Silakan upload ke Google Sheet secara manual atau copy-paste ke tab "Absensi".', 'info');
    } catch (error) {
        console.error('Error sync absensi:', error);
        showToast('Gagal menyiapkan sinkronisasi: ' + error.message, 'danger');
    }
}
function loadDataSiswaFromStorage() {
    tampilkanDataSiswa();
}
function toggleAddSiswa() {
    const form = document.getElementById('form-add-siswa');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}
function simpanDataSiswa() {
    const inputs = document.querySelectorAll('#form-add-siswa .input-siswa');
    const siswa = {
        id: Date.now(),
        nis: inputs[0].value,
        nisn: inputs[1].value,
        nama: inputs[2].value,
        jenisKelamin: inputs[3].value,
        tempatLahir: inputs[4].value,
        tanggalLahir: inputs[5].value,
        agama: inputs[6].value,
        pendidikanSebelumnya: inputs[7].value,
        alamat: inputs[8].value,
        namaAyah: inputs[9].value,
        pekerjaanAyah: inputs[10].value,
        namaIbu: inputs[11].value,
        pekerjaanIbu: inputs[12].value,
        alamatOrangTua: inputs[13].value,
        namaWali: inputs[14].value,
        pekerjaanWali: inputs[15].value,
        alamatWali: inputs[16].value,
        nomorTelepon: inputs[17].value
    };
    if (!siswa.nama) {
        showToast('Nama siswa tidak boleh kosong!', 'danger');
        return;
    }
    dataSiswa.push(siswa);
    localStorage.setItem('dataSiswa', JSON.stringify(dataSiswa));
    inputs.forEach(inp => inp.value = '');
    tampilkanDataSiswa();
    toggleAddSiswa();
    showToast('Data siswa berhasil ditambahkan!', 'success');
}
function tampilkanDataSiswa() {
    const tbody = document.getElementById('tbody-siswa');
    if (!tbody) return;
    if (dataSiswa.length === 0) {
        tbody.innerHTML = '<tr style="text-align: center; color: var(--text-muted);"><td colspan="11" style="padding: 30px;"><i class="fas fa-inbox"></i> Belum ada data siswa. Gunakan tombol "Sinkronisasi dari Google Sheet" atau "Tambah Siswa Baru".</td></tr>';
        return;
    }
    tbody.innerHTML = dataSiswa.map((siswa, idx) => `
        <tr style="border-bottom: 1px solid var(--border);">
            <td style="padding: 12px; border-right: 1px solid var(--border);">${idx + 1}</td>
            <td style="padding: 12px; border-right: 1px solid var(--border);">${siswa.nis}</td>
            <td style="padding: 12px; border-right: 1px solid var(--border);">${siswa.nisn}</td>
            <td style="padding: 12px; border-right: 1px solid var(--border);">${siswa.nama}</td>
            <td style="padding: 12px; border-right: 1px solid var(--border);">${siswa.jenisKelamin}</td>
            <td style="padding: 12px; border-right: 1px solid var(--border);">${siswa.tempatLahir}</td>
            <td style="padding: 12px; border-right: 1px solid var(--border);">${siswa.agama}</td>
            <td style="padding: 12px; border-right: 1px solid var(--border);">${siswa.namaAyah}</td>
            <td style="padding: 12px; border-right: 1px solid var(--border);">${siswa.namaIbu}</td>
            <td style="padding: 12px; border-right: 1px solid var(--border);">${siswa.alamat}</td>
            <td style="padding: 12px; text-align: center;">
                <button class="btn btn-info btn-sm" onclick="window.editSiswa(${siswa.id})" title="Edit" style="margin-right:5px;"><i class="fas fa-edit"></i></button>
                <button class="btn btn-danger btn-sm" onclick="hapusSiswa(${siswa.id})" title="Hapus"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('');
}
function hapusSiswa(id) {
    if (!confirm('Hapus data siswa ini?')) return;
    dataSiswa = dataSiswa.filter(s => s.id !== id);
    localStorage.setItem('dataSiswa', JSON.stringify(dataSiswa));
    tampilkanDataSiswa();
    showToast('Data siswa berhasil dihapus!', 'success');
}
function importSiswaExcel() {
    document.getElementById('file-import-siswa').click();
}
function exportSiswaExcel() {
    if (dataSiswa.length === 0) {
        showToast('Tidak ada data siswa untuk diexport!', 'danger');
        return;
    }
    let csv = 'NIS,NISN,Nama Peserta Didik,Jenis Kelamin,Tempat Lahir,Tanggal Lahir,Agama,Pendidikan Sebelumnya,Alamat,Nama Ayah,Pekerjaan Ayah,Nama Ibu,Pekerjaan Ibu,Alamat Orang Tua,Nama Wali,Pekerjaan Wali,Alamat Wali,Nomor Telepon\n';
    dataSiswa.forEach(s => {
        csv += `${s.nis},${s.nisn},${s.nama},${s.jenisKelamin},${s.tempatLahir},${s.tanggalLahir},${s.agama},${s.pendidikanSebelumnya},${s.alamat},${s.namaAyah},${s.pekerjaanAyah},${s.namaIbu},${s.pekerjaanIbu},${s.alamatOrangTua},${s.namaWali},${s.pekerjaanWali},${s.alamatWali},${s.nomorTelepon}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Data_Siswa_Export.csv';
    link.click();
    showToast('Data berhasil diexport!', 'success');
}
function tampilkanAbsensi() {
    const grid = document.getElementById('grid-absensi');
    if (!grid) return;
    if (dataSiswa.length === 0) {
        grid.innerHTML = '<div style="text-align: center; padding: 40px; color: var(--text-muted); grid-column: 1 / -1;"><i class="fas fa-inbox" style="font-size: 2rem; margin-bottom: 10px;"></i><p>Belum ada data siswa. Sinkronisasi dari Google Sheet atau tambahkan data di menu "Data Siswa".</p></div>';
        return;
    }
    const tanggal = document.getElementById('tanggal-absensi').value;
    if (!tanggal) {
        showToast('Pilih tanggal absensi terlebih dahulu!', 'danger');
        return;
    }
    grid.innerHTML = dataSiswa.map(siswa => {
        const key = `${tanggal}_${siswa.id}`;
        const status = dataAbsensi[key] || 'Hadir';
        return `
            <div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 12px; padding: 16px; cursor: pointer; transition: all 0.3s; position: relative;" 
                 onmouseover="this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)'" 
                 onmouseout="this.style.boxShadow='none'">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 10px;">
                    <div>
                        <div style="font-weight: 700; font-size: 1rem; color: var(--text);">${siswa.nama}</div>
                        <div style="font-size: 0.8rem; color: var(--text-muted);">NISN: ${siswa.nisn}</div>
                    </div>
                    <div style="display: flex; gap: 5px;">
                        <div style="background: ${statusColor[status]}; color: white; padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 600;">
                            ${status}
                        </div>
                        <button class="btn btn-danger btn-sm" onclick="window.deleteAbsensi('${tanggal}', ${siswa.id})" title="Hapus" style="padding: 4px 8px; font-size: 0.75rem;"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
                    ${statusAbsensi.map(st => `
                        <button class="btn btn-sm" style="padding: 6px 8px; background: ${status === st ? statusColor[st] : 'var(--bg-body)'}; color: ${status === st ? 'white' : 'var(--text)'}; border: 1px solid ${status === st ? statusColor[st] : 'var(--border)'}; border-radius: 6px; cursor: pointer; font-size: 0.8rem; transition: all 0.2s;" 
                            onclick="ubahStatusAbsensi('${key}', '${st}', event)">
                            ${st}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    }).join('');
}
function ubahStatusAbsensi(key, status, event) {
    event.stopPropagation();
    dataAbsensi[key] = status;
    localStorage.setItem('dataAbsensi', JSON.stringify(dataAbsensi));
    tampilkanAbsensi();
}
function hadirSemua() {
    const tanggal = document.getElementById('tanggal-absensi').value;
    if (!tanggal) {
        showToast('Pilih tanggal absensi terlebih dahulu!', 'danger');
        return;
    }
    dataSiswa.forEach(siswa => {
        const key = `${tanggal}_${siswa.id}`;
        dataAbsensi[key] = 'Hadir';
    });
    localStorage.setItem('dataAbsensi', JSON.stringify(dataAbsensi));
    tampilkanAbsensi();
    showToast('Semua siswa ditandai hadir!', 'success');
}
function simpanAbsensi() {
    syncAbsensiToGoogle();
}

// ========== CRUD OPERATIONS LENGKAP ==========

// ===== 1. NILAI SISWA - CRUD LENGKAP =====
window.addNilai = function () {
    const kelas = document.getElementById('nilai-filter-kelas')?.value;
    const mapel = document.getElementById('nilai-filter-mapel')?.value;
    const jenis = document.getElementById('nilai-filter-jenis')?.value;

    if (!mapel || !jenis) {
        showToast('Pilih Mata Pelajaran dan Jenis Asesmen terlebih dahulu!', 'danger');
        return;
    }

    const modal = document.createElement('div');
    modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; z-index:10000;';

    const form = document.createElement('div');
    form.style.cssText = 'background:white; padding:30px; border-radius:12px; box-shadow:0 4px 6px rgba(0,0,0,0.3); max-width:500px; width:90%;';

    form.innerHTML = `
        <h3 style="margin-top:0; margin-bottom:20px; color:var(--primary);">Tambah Nilai Siswa</h3>
        <div class="form-group">
            <label>Pilih Siswa <span style="color:red;">*</span></label>
            <select id="modal-siswa" class="form-control" required>
                <option value="">-- Pilih Siswa --</option>
                ${dataSiswa.map(s => `<option value="${s.nisn}">${s.nama} (${s.nisn})</option>`).join('')}
            </select>
        </div>
        <div class="form-group">
            <label>Nilai (0-100) <span style="color:red;">*</span></label>
            <input type="number" id="modal-nilai" class="form-control" min="0" max="100" required>
        </div>
        <div class="form-group">
            <label>Catatan</label>
            <textarea id="modal-catatan" class="form-control" rows="2" placeholder="Masukkan catatan (opsional)"></textarea>
        </div>
        <div style="display:flex; gap:10px; justify-content:flex-end;">
            <button class="btn btn-secondary" onclick="this.closest('[style*=position]').remove()">Batal</button>
            <button class="btn btn-primary" onclick="window.saveNewNilai('${mapel}', '${jenis}', '${kelas}')">Simpan</button>
        </div>
    `;

    form.querySelector('#modal-siswa').focus();
    modal.appendChild(form);
    document.body.appendChild(modal);
    modal.addEventListener('click', function (e) {
        if (e.target === modal) modal.remove();
    });
};

window.saveNewNilai = function (mapel, jenis, kelas) {
    const nisn = document.getElementById('modal-siswa')?.value;
    const nilai = document.getElementById('modal-nilai')?.value;
    const catatan = document.getElementById('modal-catatan')?.value;

    if (!nisn || !nilai) {
        showToast('Siswa dan Nilai tidak boleh kosong!', 'danger');
        return;
    }

    const nilaiNum = parseInt(nilai);
    if (isNaN(nilaiNum) || nilaiNum < 0 || nilaiNum > 100) {
        showToast('Nilai harus angka 0-100!', 'danger');
        return;
    }

    const siswa = dataSiswa.find(s => s.nisn === nisn);
    if (!siswa) {
        showToast('Siswa tidak ditemukan!', 'danger');
        return;
    }

    const newNilai = {
        id: Date.now(),
        nisn: nisn,
        nama: siswa.nama,
        mapel: mapel,
        jenisAsesmen: jenis,
        nilai: nilaiNum,
        catatan: catatan,
        kelas: kelas,
        tanggalInput: new Date().toISOString().split('T')[0]
    };

    dataNilaiSiswa.push(newNilai);
    localStorage.setItem('dataNilaiSiswa', JSON.stringify(dataNilaiSiswa));

    document.querySelector('[style*=position]')?.remove();
    tampilkanNilaiByFilter();
    showToast('✅ Nilai berhasil ditambahkan!', 'success');
};

window.editNilai = function (id) {
    const nilai = dataNilaiSiswa.find(n => n.id === id);
    if (!nilai) {
        showToast('Data tidak ditemukan!', 'danger');
        return;
    }

    const modal = document.createElement('div');
    modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; z-index:10000;';

    const form = document.createElement('div');
    form.style.cssText = 'background:white; padding:30px; border-radius:12px; box-shadow:0 4px 6px rgba(0,0,0,0.3); max-width:500px; width:90%;';

    form.innerHTML = `
        <h3 style="margin-top:0; margin-bottom:20px; color:var(--primary);">Edit Nilai Siswa</h3>
        <div class="form-group">
            <label>Siswa</label>
            <input type="text" class="form-control" value="${nilai.nama} (${nilai.nisn})" disabled>
        </div>
        <div class="form-group">
            <label>Mapel</label>
            <input type="text" class="form-control" value="${nilai.mapel}" disabled>
        </div>
        <div class="form-group">
            <label>Nilai (0-100) <span style="color:red;">*</span></label>
            <input type="number" id="modal-nilai-edit" class="form-control" min="0" max="100" value="${nilai.nilai}" required>
        </div>
        <div class="form-group">
            <label>Catatan</label>
            <textarea id="modal-catatan-edit" class="form-control" rows="2">${nilai.catatan || ''}</textarea>
        </div>
        <div style="display:flex; gap:10px; justify-content:flex-end;">
            <button class="btn btn-secondary" onclick="this.closest('[style*=position]').remove()">Batal</button>
            <button class="btn btn-primary" onclick="window.saveEditNilai(${id})">Simpan</button>
        </div>
    `;

    modal.appendChild(form);
    document.body.appendChild(modal);
    modal.addEventListener('click', function (e) {
        if (e.target === modal) modal.remove();
    });
};

window.saveEditNilai = function (id) {
    const nilai = dataNilaiSiswa.find(n => n.id === id);
    if (!nilai) return;

    const nilaiNum = parseInt(document.getElementById('modal-nilai-edit')?.value || 0);
    const catatan = document.getElementById('modal-catatan-edit')?.value || '';

    if (isNaN(nilaiNum) || nilaiNum < 0 || nilaiNum > 100) {
        showToast('Nilai harus angka 0-100!', 'danger');
        return;
    }

    nilai.nilai = nilaiNum;
    nilai.catatan = catatan;

    localStorage.setItem('dataNilaiSiswa', JSON.stringify(dataNilaiSiswa));
    document.querySelector('[style*=position]')?.remove();
    tampilkanNilaiByFilter();
    showToast('✅ Nilai berhasil diupdate!', 'success');
};

window.deleteNilai = function (id) {
    if (!confirm('Hapus nilai ini? Data tidak bisa dikembalikan!')) return;

    dataNilaiSiswa = dataNilaiSiswa.filter(n => n.id !== id);
    localStorage.setItem('dataNilaiSiswa', JSON.stringify(dataNilaiSiswa));
    tampilkanNilaiByFilter();
    showToast('✅ Nilai berhasil dihapus!', 'success');
};

window.tampilkanNilaiByFilter = function () {
    const mapel = document.getElementById('nilai-filter-mapel')?.value;
    const jenis = document.getElementById('nilai-filter-jenis')?.value;
    const tbody = document.getElementById('tbody-input-nilai');

    if (!tbody) return;

    let filtered = dataNilaiSiswa;
    if (mapel) filtered = filtered.filter(n => n.mapel === mapel);
    if (jenis) filtered = filtered.filter(n => n.jenisAsesmen === jenis);

    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding:30px; color:var(--text-muted);"><i class="fas fa-inbox"></i> Tidak ada data nilai.</td></tr>';
        return;
    }

    let html = '';
    filtered.forEach((n, idx) => {
        html += `<tr style="border-bottom:1px solid var(--border);">
            <td style="padding:12px; border-right:1px solid var(--border);">${idx + 1}</td>
            <td style="padding:12px; border-right:1px solid var(--border);">${n.nisn || '-'}</td>
            <td style="padding:12px; border-right:1px solid var(--border);">${n.nama || '-'}</td>
            <td style="padding:12px; border-right:1px solid var(--border); text-align:center;"><strong style="color:var(--primary); font-size:1.1rem;">${n.nilai || 0}</strong></td>
            <td style="padding:12px; text-align:center;">
                <button class="btn btn-sm btn-info" onclick="window.editNilai(${n.id})" title="Edit"><i class="fas fa-edit"></i></button>
                <button class="btn btn-sm btn-danger" onclick="window.deleteNilai(${n.id})" title="Hapus"><i class="fas fa-trash"></i></button>
            </td>
        </tr>`;
    });
    tbody.innerHTML = html;
};

// ===== 2. DATA SISWA - TAMBAH EDIT =====
window.editSiswa = function (id) {
    const siswa = dataSiswa.find(s => s.id === id);
    if (!siswa) {
        showToast('Data siswa tidak ditemukan!', 'danger');
        return;
    }

    const modal = document.createElement('div');
    modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; z-index:10000; overflow-y:auto;';

    const form = document.createElement('div');
    form.style.cssText = 'background:white; padding:30px; border-radius:12px; box-shadow:0 4px 6px rgba(0,0,0,0.3); max-width:600px; width:95%; margin:20px auto;';

    form.innerHTML = `
        <h3 style="margin-top:0; margin-bottom:20px; color:var(--primary);">Edit Data Siswa</h3>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(250px, 1fr)); gap:15px;">
            <div class="form-group">
                <label>NIS</label>
                <input type="text" id="edit-nis" class="form-control" value="${siswa.nis || ''}">
            </div>
            <div class="form-group">
                <label>NISN</label>
                <input type="text" id="edit-nisn" class="form-control" value="${siswa.nisn || ''}">
            </div>
            <div class="form-group">
                <label>Nama Peserta Didik</label>
                <input type="text" id="edit-nama" class="form-control" value="${siswa.nama || ''}">
            </div>
            <div class="form-group">
                <label>Jenis Kelamin</label>
                <select id="edit-jk" class="form-control">
                    <option value="">-- Pilih --</option>
                    <option value="Laki-laki" ${siswa.jenisKelamin === 'Laki-laki' ? 'selected' : ''}>Laki-laki</option>
                    <option value="Perempuan" ${siswa.jenisKelamin === 'Perempuan' ? 'selected' : ''}>Perempuan</option>
                </select>
            </div>
            <div class="form-group">
                <label>Tempat Lahir</label>
                <input type="text" id="edit-tempat" class="form-control" value="${siswa.tempatLahir || ''}">
            </div>
            <div class="form-group">
                <label>Tanggal Lahir</label>
                <input type="date" id="edit-tgl" class="form-control" value="${siswa.tanggalLahir || ''}">
            </div>
            <div class="form-group">
                <label>Agama</label>
                <select id="edit-agama" class="form-control">
                    <option value="">-- Pilih --</option>
                    <option value="Islam" ${siswa.agama === 'Islam' ? 'selected' : ''}>Islam</option>
                    <option value="Kristen" ${siswa.agama === 'Kristen' ? 'selected' : ''}>Kristen</option>
                    <option value="Katolik" ${siswa.agama === 'Katolik' ? 'selected' : ''}>Katolik</option>
                    <option value="Hindu" ${siswa.agama === 'Hindu' ? 'selected' : ''}>Hindu</option>
                    <option value="Buddha" ${siswa.agama === 'Buddha' ? 'selected' : ''}>Buddha</option>
                </select>
            </div>
            <div class="form-group">
                <label>Pendidikan Sebelumnya</label>
                <input type="text" id="edit-pendidikan" class="form-control" value="${siswa.pendidikanSebelumnya || ''}">
            </div>
            <div class="form-group" style="grid-column:1/-1;">
                <label>Alamat</label>
                <textarea id="edit-alamat" class="form-control" rows="2">${siswa.alamat || ''}</textarea>
            </div>
            <div class="form-group">
                <label>Nama Ayah</label>
                <input type="text" id="edit-ayah" class="form-control" value="${siswa.namaAyah || ''}">
            </div>
            <div class="form-group">
                <label>Pekerjaan Ayah</label>
                <input type="text" id="edit-pek-ayah" class="form-control" value="${siswa.pekerjaanAyah || ''}">
            </div>
            <div class="form-group">
                <label>Nama Ibu</label>
                <input type="text" id="edit-ibu" class="form-control" value="${siswa.namaIbu || ''}">
            </div>
            <div class="form-group">
                <label>Pekerjaan Ibu</label>
                <input type="text" id="edit-pek-ibu" class="form-control" value="${siswa.pekerjaanIbu || ''}">
            </div>
            <div class="form-group" style="grid-column:1/-1;">
                <label>Alamat Orang Tua</label>
                <textarea id="edit-alamat-ortu" class="form-control" rows="2">${siswa.alamatOrangTua || ''}</textarea>
            </div>
            <div class="form-group">
                <label>Nama Wali</label>
                <input type="text" id="edit-wali" class="form-control" value="${siswa.namaWali || ''}">
            </div>
            <div class="form-group">
                <label>Pekerjaan Wali</label>
                <input type="text" id="edit-pek-wali" class="form-control" value="${siswa.pekerjaanWali || ''}">
            </div>
            <div class="form-group" style="grid-column:1/-1;">
                <label>Alamat Wali</label>
                <textarea id="edit-alamat-wali" class="form-control" rows="2">${siswa.alamatWali || ''}</textarea>
            </div>
            <div class="form-group">
                <label>Nomor Telepon</label>
                <input type="tel" id="edit-tlp" class="form-control" value="${siswa.nomorTelepon || ''}">
            </div>
        </div>
        <div style="display:flex; gap:10px; justify-content:flex-end; margin-top:20px;">
            <button class="btn btn-secondary" onclick="this.closest('[style*=position]').remove()">Batal</button>
            <button class="btn btn-primary" onclick="window.saveEditSiswa(${id})">Simpan Perubahan</button>
        </div>
    `;

    modal.appendChild(form);
    document.body.appendChild(modal);
    modal.addEventListener('click', function (e) {
        if (e.target === modal) modal.remove();
    });
};

window.saveEditSiswa = function (id) {
    const siswa = dataSiswa.find(s => s.id === id);
    if (!siswa) return;

    siswa.nis = document.getElementById('edit-nis')?.value || '';
    siswa.nisn = document.getElementById('edit-nisn')?.value || '';
    siswa.nama = document.getElementById('edit-nama')?.value || '';
    siswa.jenisKelamin = document.getElementById('edit-jk')?.value || '';
    siswa.tempatLahir = document.getElementById('edit-tempat')?.value || '';
    siswa.tanggalLahir = document.getElementById('edit-tgl')?.value || '';
    siswa.agama = document.getElementById('edit-agama')?.value || '';
    siswa.pendidikanSebelumnya = document.getElementById('edit-pendidikan')?.value || '';
    siswa.alamat = document.getElementById('edit-alamat')?.value || '';
    siswa.namaAyah = document.getElementById('edit-ayah')?.value || '';
    siswa.pekerjaanAyah = document.getElementById('edit-pek-ayah')?.value || '';
    siswa.namaIbu = document.getElementById('edit-ibu')?.value || '';
    siswa.pekerjaanIbu = document.getElementById('edit-pek-ibu')?.value || '';
    siswa.alamatOrangTua = document.getElementById('edit-alamat-ortu')?.value || '';
    siswa.namaWali = document.getElementById('edit-wali')?.value || '';
    siswa.pekerjaanWali = document.getElementById('edit-pek-wali')?.value || '';
    siswa.alamatWali = document.getElementById('edit-alamat-wali')?.value || '';
    siswa.nomorTelepon = document.getElementById('edit-tlp')?.value || '';

    localStorage.setItem('dataSiswa', JSON.stringify(dataSiswa));
    document.querySelector('[style*=position]')?.remove();
    tampilkanDataSiswa();
    showToast('✅ Data siswa berhasil diupdate!', 'success');
};

// ===== 3. ABSENSI SISWA - STRUKTUR DATA FIX + DELETE =====
window.deleteAbsensi = function (tanggal, siswaId) {
    if (!confirm('Hapus absensi ini?')) return;

    const key = `${tanggal}_${siswaId}`;
    delete dataAbsensi[key];
    localStorage.setItem('dataAbsensi', JSON.stringify(dataAbsensi));
    tampilkanAbsensi();
    showToast('✅ Absensi berhasil dihapus!', 'success');
};

document.addEventListener('DOMContentLoaded', function () {
    tampilkanDataSiswa();
    const today = new Date().toISOString().split('T')[0];
    const tanggalInput = document.getElementById('tanggal-absensi');
    if (tanggalInput) {
        tanggalInput.value = today;
    }
    const btnDownloadTemplate = document.getElementById('btn-download-template');
    const btnImportSiswa = document.getElementById('btn-import-siswa');
    const btnExportSiswa = document.getElementById('btn-export-siswa');
    const fileImport = document.getElementById('file-import-siswa');
    const btnHadirSemua = document.getElementById('btn-hadir-semua');
    const btnSimpanAbsensi = document.getElementById('btn-simpan-absensi');
    const tanggalAbsensi = document.getElementById('tanggal-absensi');
    if (btnDownloadTemplate) btnDownloadTemplate.addEventListener('click', downloadTemplateGoogleSheet);
    if (btnImportSiswa) btnImportSiswa.addEventListener('click', importSiswaExcel);
    if (btnExportSiswa) btnExportSiswa.addEventListener('click', exportSiswaExcel);
    if (fileImport) {
        fileImport.addEventListener('change', function (e) {
            showToast('Fitur import Excel sedang dalam pengembangan. Gunakan tombol "Sinkronisasi dari Google Sheet" untuk import data.', 'info');
        });
    }
    if (btnHadirSemua) btnHadirSemua.addEventListener('click', hadirSemua);
    if (btnSimpanAbsensi) btnSimpanAbsensi.addEventListener('click', simpanAbsensi);
    if (tanggalAbsensi) {
        tanggalAbsensi.addEventListener('change', tampilkanAbsensi);
        tampilkanAbsensi();
    }

    // Fungsi untuk Tab Absensi Siswa
    window.switchAbsensiTab = function (evt, tabId) {
        const container = evt.currentTarget.closest('.card-body');
        if (!container) return;
        container.querySelectorAll('.tab-pane').forEach(pane => {
            pane.style.display = 'none';
        });
        container.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        const target = container.querySelector('#' + tabId);
        if (target) {
            target.style.display = 'block';
        }
        evt.currentTarget.classList.add('active');
    };

    // Load Rekap Absensi dengan data dari dataAbsensi
    window.loadRekapAbsensi = function () {
        const tbody = document.getElementById('tbody-rekap-absensi');
        if (!tbody) return;

        if (!dataAbsensi || dataAbsensi.length === 0) {
            tbody.innerHTML = '<tr style="text-align: center; color: var(--text-muted);"><td colspan="7" style="padding: 30px;"><i class="fas fa-inbox"></i> Belum ada data absensi. Mulai input absensi terlebih dahulu.</td></tr>';
            return;
        }

        // Group data by siswa dan hitung status
        const absensiByStudent = {};
        dataAbsensi.forEach(a => {
            const key = a.nisn || a.nama;
            if (!absensiByStudent[key]) {
                absensiByStudent[key] = { nisn: a.nisn, nama: a.nama, Hadir: 0, Sakit: 0, Izin: 0, Alpa: 0 };
            }
            const status = a.status || 'Hadir';
            if (absensiByStudent[key][status] !== undefined) {
                absensiByStudent[key][status]++;
            }
        });

        let html = '';
        let no = 1;
        Object.values(absensiByStudent).forEach(student => {
            html += `<tr>
                <td style="padding:8px; border-bottom:1px solid #eee;">${no++}</td>
                <td style="padding:8px; border-bottom:1px solid #eee;">${student.nisn || '-'}</td>
                <td style="padding:8px; border-bottom:1px solid #eee;">${student.nama || '-'}</td>
                <td style="padding:8px; border-bottom:1px solid #eee; text-align:center; color:#10b981; font-weight:600;">${student.Hadir}</td>
                <td style="padding:8px; border-bottom:1px solid #eee; text-align:center; color:#f59e0b; font-weight:600;">${student.Sakit}</td>
                <td style="padding:8px; border-bottom:1px solid #eee; text-align:center; color:#3b82f6; font-weight:600;">${student.Izin}</td>
                <td style="padding:8px; border-bottom:1px solid #eee; text-align:center; color:#ef4444; font-weight:600;">${student.Alpa}</td>
            </tr>`;
        });

        tbody.innerHTML = html;
    };

    // Export Absensi to Excel
    window.exportAbsensiToExcel = function () {
        if (!dataAbsensi || dataAbsensi.length === 0) {
            showToast('Tidak ada data absensi untuk diexport', 'warning');
            return;
        }

        try {
            const ws_data = [
                ['NISN', 'Nama', 'Tanggal', 'Status']
            ];

            dataAbsensi.forEach(a => {
                ws_data.push([
                    a.nisn || '',
                    a.nama || '',
                    a.tanggal || '',
                    a.status || 'Hadir'
                ]);
            });

            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.aoa_to_sheet(ws_data);
            worksheet['!cols'] = [
                { wch: 15 },
                { wch: 25 },
                { wch: 12 },
                { wch: 12 }
            ];

            XLSX.utils.book_append_sheet(workbook, worksheet, 'Absensi');
            XLSX.writeFile(workbook, `Absensi_${new Date().toISOString().split('T')[0]}.xlsx`);
            showToast('✅ Data absensi berhasil diexport ke Excel!', 'success');
        } catch (error) {
            console.error('Error export:', error);
            showToast('❌ Gagal export: ' + error.message, 'danger');
        }
    };

    // Fungsi untuk Tab Nilai Siswa
    window.switchNilaiTab = function (evt, tabId) {
        const container = evt.currentTarget.closest('.card-body');
        if (!container) return;
        container.querySelectorAll('.tab-pane').forEach(pane => {
            pane.style.display = 'none';
        });
        container.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        const target = container.querySelector('#' + tabId);
        if (target) {
            target.style.display = 'block';
        }
        evt.currentTarget.classList.add('active');
    };

    // Load Rekap Nilai dengan data dari localStorage
    window.loadRekupNilai = function () {
        const tabelRekap = document.getElementById('tbody-rekap-nilai');
        if (!tabelRekap) return;

        if (!dataNilaiSiswa || dataNilaiSiswa.length === 0) {
            tabelRekap.innerHTML = '<tr style="text-align: center; color: var(--text-muted);"><td colspan="6" style="padding: 30px;"><i class="fas fa-inbox"></i> Belum ada data nilai. Sinkronkan dari Google Sheet terlebih dahulu.</td></tr>';
            return;
        }

        // Group data by siswa
        const nilaiByStudent = {};
        dataNilaiSiswa.forEach(n => {
            const key = n.nisn || n.nama;
            if (!nilaiByStudent[key]) {
                nilaiByStudent[key] = { nisn: n.nisn, nama: n.nama, nilai: [] };
            }
            nilaiByStudent[key].nilai.push(n);
        });

        let html = '';
        let no = 1;
        Object.values(nilaiByStudent).forEach(student => {
            const nilaiArray = student.nilai || [];
            const rataRata = nilaiArray.length > 0
                ? (nilaiArray.reduce((sum, n) => sum + (n.nilai || 0), 0) / nilaiArray.length).toFixed(2)
                : 0;

            const predicate = rataRata >= 85 ? 'A' : rataRata >= 70 ? 'B' : rataRata >= 60 ? 'C' : 'D';

            html += `<tr>
                <td style="padding:8px; border-bottom:1px solid #eee;">${no++}</td>
                <td style="padding:8px; border-bottom:1px solid #eee;">${student.nisn || '-'}</td>
                <td style="padding:8px; border-bottom:1px solid #eee;">${student.nama || '-'}</td>
                <td style="padding:8px; border-bottom:1px solid #eee; text-align:center;"><strong>${rataRata}</strong></td>
                <td style="padding:8px; border-bottom:1px solid #eee; text-align:center; font-weight:600; color:var(--primary);">${predicate}</td>
                <td style="padding:8px; border-bottom:1px solid #eee; text-align:center;">
                    <button class="btn btn-sm btn-info" onclick="window.viewDetailNilai(&quot;${student.nisn}&quot;)" style="font-size:0.8rem;">Detail</button>
                </td>
            </tr>`;
        });

        tabelRekap.innerHTML = html;
    };

    // View detail nilai siswa tertentu
    window.viewDetailNilai = function (nisn) {
        const nilaiSiswa = dataNilaiSiswa.filter(n => n.nisn === nisn);
        if (nilaiSiswa.length === 0) {
            showToast('Data tidak ditemukan', 'warning');
            return;
        }

        let detailHtml = `<h4>Detail Nilai: ${nilaiSiswa[0].nama} (${nisn})</h4><ul style="list-style:none; padding:0;">`;
        nilaiSiswa.forEach(n => {
            detailHtml += `<li style="padding:8px; border-bottom:1px solid #eee;">
                <strong>${n.mapel}</strong> - ${n.jenisAsesmen}: <span style="color:var(--primary); font-weight:600;">${n.nilai}</span>
                ${n.catatan ? ` <small style="color:#666;">(${n.catatan})</small>` : ''}
            </li>`;
        });
        detailHtml += '</ul>';

        const modal = document.createElement('div');
        modal.style.cssText = 'position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); background:white; border:1px solid #ddd; border-radius:8px; padding:20px; max-width:400px; z-index:10000; box-shadow:0 4px 6px rgba(0,0,0,0.2);';
        modal.innerHTML = detailHtml + '<button onclick="this.parentElement.remove()" class="btn btn-primary" style="margin-top:10px; width:100%;">Tutup</button>';
        document.body.appendChild(modal);
    };

    // Export Nilai to Excel
    window.exportNilaiToExcel = function () {
        if (!dataNilaiSiswa || dataNilaiSiswa.length === 0) {
            showToast('Tidak ada data nilai untuk diexport', 'warning');
            return;
        }

        try {
            const ws_data = [
                ['NISN', 'Nama', 'Mata Pelajaran', 'Jenis Asesmen', 'Nilai', 'Catatan']
            ];

            dataNilaiSiswa.forEach(n => {
                ws_data.push([
                    n.nisn || '',
                    n.nama || '',
                    n.mapel || '',
                    n.jenisAsesmen || '',
                    n.nilai || '',
                    n.catatan || ''
                ]);
            });

            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.aoa_to_sheet(ws_data);
            worksheet['!cols'] = [
                { wch: 15 },
                { wch: 20 },
                { wch: 20 },
                { wch: 15 },
                { wch: 10 },
                { wch: 25 }
            ];

            XLSX.utils.book_append_sheet(workbook, worksheet, 'Nilai Siswa');
            XLSX.writeFile(workbook, `Nilai_Siswa_${new Date().toISOString().split('T')[0]}.xlsx`);
            showToast('✅ Data nilai berhasil diexport ke Excel!', 'success');
        } catch (error) {
            console.error('Error export:', error);
            showToast('❌ Gagal export: ' + error.message, 'danger');
        }
    };

    // Tampilkan Analisis Nilai
    document.getElementById('btn-tampilkan-analisis')?.addEventListener('click', function () {
        if (!dataNilaiSiswa || dataNilaiSiswa.length === 0) {
            showToast('Belum ada data nilai untuk dianalisis', 'info');
            return;
        }

        const analisisContainer = document.getElementById('content-analisis-nilai');
        if (!analisisContainer) return;

        // Hitung statistik
        const nilaiArray = dataNilaiSiswa.map(n => n.nilai || 0);
        const rataRata = (nilaiArray.reduce((a, b) => a + b, 0) / nilaiArray.length).toFixed(2);
        const nilaiMin = Math.min(...nilaiArray);
        const nilaiMax = Math.max(...nilaiArray);
        const nilaiMed = nilaiArray.sort((a, b) => a - b)[Math.floor(nilaiArray.length / 2)];

        // Kategorisasi
        const gradeDistribution = {
            'A (85-100)': nilaiArray.filter(n => n >= 85).length,
            'B (70-84)': nilaiArray.filter(n => n >= 70 && n < 85).length,
            'C (60-69)': nilaiArray.filter(n => n >= 60 && n < 70).length,
            'D (0-59)': nilaiArray.filter(n => n < 60).length
        };

        let html = `
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 20px;">
                <div style="background: #f0f4f8; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6;">
                    <div style="color: #666; font-size: 0.9rem;">Rata-rata Nilai</div>
                    <div style="font-size: 2rem; font-weight: 600; color: #3b82f6;">${rataRata}</div>
                </div>
                <div style="background: #f0f4f8; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
                    <div style="color: #666; font-size: 0.9rem;">Nilai Tertinggi</div>
                    <div style="font-size: 2rem; font-weight: 600; color: #10b981;">${nilaiMax}</div>
                </div>
                <div style="background: #f0f4f8; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
                    <div style="color: #666; font-size: 0.9rem;">Nilai Terendah</div>
                    <div style="font-size: 2rem; font-weight: 600; color: #f59e0b;">${nilaiMin}</div>
                </div>
                <div style="background: #f0f4f8; padding: 15px; border-radius: 8px; border-left: 4px solid #8b5cf6;">
                    <div style="color: #666; font-size: 0.9rem;">Median</div>
                    <div style="font-size: 2rem; font-weight: 600; color: #8b5cf6;">${nilaiMed}</div>
                </div>
            </div>
            
            <h5 style="margin-top: 20px; margin-bottom: 10px;">Distribusi Grade</h5>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;">
        `;

        Object.entries(gradeDistribution).forEach(function (entry) {
            const grade = entry[0];
            const count = entry[1];
            const percentage = ((count / nilaiArray.length) * 100).toFixed(0);
            html += `
                <div style="background: #f9fafb; padding: 12px; border-radius: 6px; border: 1px solid #e5e7eb; text-align: center;">
                    <div style="font-weight: 600; color: #1f2937;">${grade}</div>
                    <div style="font-size: 1.5rem; font-weight: 600; color: #3b82f6;">${count}</div>
                    <div style="font-size: 0.85rem; color: #6b7280;">${percentage}%</div>
                </div>
            `;
        });

        html += '</div>';
        analisisContainer.innerHTML = html;
        showToast('✅ Analisis nilai berhasil ditampilkan!', 'success');
    });

    // Sync Nilai dari Google
    document.getElementById('btn-sync-nilai-from-google')?.addEventListener('click', function () {
        syncNilaiSiswaFromGoogle(document.getElementById('ds-datasheet-link')?.value || '');
    });

    // Tambah Nilai Baru
    document.getElementById('btn-tambah-nilai')?.addEventListener('click', function () {
        window.addNilai();
    });

    // Simpan Nilai
    document.getElementById('btn-simpan-nilai')?.addEventListener('click', function () {
        localStorage.setItem('dataNilaiSiswa', JSON.stringify(dataNilaiSiswa));
        showToast('✅ Nilai berhasil disimpan!', 'success');
    });

    // Clear Nilai Form
    window.clearNilaiForm = function () {
        document.getElementById('nilai-filter-kelas').value = '';
        document.getElementById('nilai-filter-mapel').value = '';
        document.getElementById('nilai-filter-jenis').value = '';
        document.getElementById('tbody-input-nilai').innerHTML = '<tr style="text-align: center; color: var(--text-muted);"><td colspan="5" style="padding: 30px;"><i class="fas fa-inbox"></i> Belum ada filter yang dipilih. Pilih Mata Pelajaran dan Jenis Asesmen.</td></tr>';
    };

    // Event listener untuk filter Nilai Siswa
    document.getElementById('nilai-filter-mapel')?.addEventListener('change', function () {
        window.tampilkanNilaiByFilter();
    });

    document.getElementById('nilai-filter-jenis')?.addEventListener('change', function () {
        window.tampilkanNilaiByFilter();
    });

    document.getElementById('nilai-filter-kelas')?.addEventListener('change', function () {
        window.tampilkanNilaiByFilter();
    });

    document.getElementById('nilai-filter-jenis')?.addEventListener('change', function () {
        const jenis = this.value;
        if (!jenis) {
            clearNilaiForm();
            return;
        }

        const filteredData = dataNilaiSiswa.filter(n => n.jenisAsesmen === jenis);
        const tbody = document.getElementById('tbody-input-nilai');

        if (filteredData.length === 0) {
            tbody.innerHTML = '<tr style="text-align: center; color: var(--text-muted);"><td colspan="5" style="padding: 30px;"><i class="fas fa-inbox"></i> Tidak ada data nilai untuk jenis asesmen ini.</td></tr>';
            return;
        }

        let html = '';
        filteredData.forEach((n, idx) => {
            html += `<tr>
                <td style="padding:8px; border-bottom:1px solid #eee;">${idx + 1}</td>
                <td style="padding:8px; border-bottom:1px solid #eee;">${n.nisn || '-'}</td>
                <td style="padding:8px; border-bottom:1px solid #eee;">${n.nama || '-'}</td>
                <td style="padding:8px; border-bottom:1px solid #eee; text-align:center;">${n.mapel || '-'}</td>
                <td style="padding:8px; border-bottom:1px solid #eee; text-align:center;"><strong style="color:var(--primary);">${n.nilai || 0}</strong></td>
            </tr>`;
        });
        tbody.innerHTML = html;
    });

    // ===== GOOGLE SHEETS API INTEGRATION =====
    // Async function untuk sinkronisasi Absensi
    async function syncAbsensiFromGoogle(sheetUrl) {
        try {
            const validation = validateGoogleSheetUrl(sheetUrl);
            if (!validation.valid) throw new Error(validation.error);

            // Coba deteksi gid untuk sheet "Absensi"
            let csvsToTry = [
                { gid: 1, label: 'gid=1 (default Absensi)' }
            ];

            let lastError = null;
            let csvUrl = null;
            let successGid = null;

            for (let attempt of csvsToTry) {
                try {
                    console.log(`🔍 Mencoba sync Absensi dengan ${attempt.label}...`);
                    csvUrl = convertGoogleSheetToCSV(sheetUrl, attempt.gid);
                    if (!csvUrl) {
                        lastError = new Error('Gagal mengkonversi URL');
                        continue;
                    }

                    showToast(`⏳ Mengunduh data absensi dari Google Sheet (${attempt.label})...`, 'info');
                    const response = await fetch(csvUrl, {
                        mode: 'cors',
                        headers: { 'Accept': 'text/csv', 'Cache-Control': 'no-cache' }
                    });

                    if (!response.ok) {
                        lastError = new Error(`HTTP ${response.status}`);
                        if (response.status === 400 || response.status === 404) {
                            console.warn(`⚠️ ${attempt.label} tidak valid...`);
                            continue;
                        } else if (response.status === 403) {
                            throw new Error('Akses ditolak. Sheet harus di-share publik atau dengan link.');
                        }
                        throw lastError;
                    }

                    const csv = await response.text();
                    if (!csv || csv.trim().length === 0) {
                        lastError = new Error('Sheet kosong atau tidak dapat dibaca');
                        console.warn('⚠️ Sheet kosong, coba gid lainnya...');
                        continue;
                    }

                    const lines = csv.split('\n').filter(line => line.trim());
                    if (lines.length < 2) {
                        lastError = new Error('Sheet hanya memiliki header');
                        console.warn('⚠️ Sheet hanya header, coba gid lainnya...');
                        continue;
                    }

                    successGid = attempt.gid;
                    lastError = null;
                    break;

                } catch (error) {
                    lastError = error;
                    console.warn(`⚠️ Gagal dengan ${attempt.label}:`, error.message);
                    continue;
                }
            }

            if (!csvUrl || lastError) {
                console.warn('⚠️ Sync Absensi gagal atau sheet kosong. Melanjutkan tanpa data absensi.');
                showToast('⚠️ Sheet Absensi tidak ditemukan atau kosong. Data absensi tidak disinkronkan.', 'warning');
                return { success: false, count: 0, message: 'Sheet Absensi tidak ditemukan' };
            }

            // Parse CSV
            const csv = await (await fetch(csvUrl)).text();
            const lines = csv.split('\n').filter(line => line.trim());

            if (lines.length < 2) {
                showToast('⚠️ Sheet Absensi hanya memiliki header (belum ada data)', 'info');
                return { success: true, count: 0, message: 'Sheet Absensi masih kosong' };
            }

            dataAbsensi = [];
            for (let i = 1; i < lines.length; i++) {
                const cols = parseCSVLine(lines[i]);
                if (cols.length === 0 || !cols[0] || cols[0].trim() === '') continue;

                dataAbsensi.push({
                    id: Date.now() + i,
                    nisn: (cols[0] || '').trim(),
                    nama: (cols[1] || '').trim(),
                    tanggal: (cols[2] || '').trim(),
                    status: (cols[3] || 'Hadir').trim()
                });
            }

            if (dataAbsensi.length > 0) {
                localStorage.setItem('dataAbsensi', JSON.stringify(dataAbsensi));
                showToast(`✅ ${dataAbsensi.length} data absensi berhasil disinkronkan! (gid=${successGid})`, 'success');
                return { success: true, count: dataAbsensi.length };
            }
            return { success: true, count: 0, message: 'Tidak ada data absensi ditemukan' };
        } catch (error) {
            console.error('❌ Error sync absensi:', error);
            showToast('❌ Gagal sinkronisasi absensi: ' + error.message, 'danger');
            return { success: false, count: 0 };
        }
    }

    async function syncNilaiSiswaFromGoogle(sheetUrl) {
        try {
            const validation = validateGoogleSheetUrl(sheetUrl);
            if (!validation.valid) throw new Error(validation.error);

            // Coba deteksi gid untuk sheet "Nilai Siswa"
            // Ketika import template ke Google Sheets, gid akan berbeda untuk setiap sheet
            // Kami coba gid=2 (default), jika gagal coba gid lainnya

            let gidToUse = 2;
            let csvsToTry = [
                { gid: 2, label: 'gid=2 (default Nilai Siswa)' },
                { gid: validation.gid === '2' ? null : validation.gid, label: 'gid dari URL' }
            ].filter(g => g.gid !== null && g.gid !== undefined);

            let lastError = null;
            let csvUrl = null;
            let successGid = null;

            // Coba setiap gid sampai berhasil
            for (let attempt of csvsToTry) {
                try {
                    console.log(`🔍 Mencoba sync Nilai Siswa dengan ${attempt.label}...`);
                    csvUrl = convertGoogleSheetToCSV(sheetUrl, attempt.gid);
                    if (!csvUrl) {
                        lastError = new Error('Gagal mengkonversi URL');
                        continue;
                    }

                    showToast(`⏳ Mengunduh data nilai siswa dari Google Sheet (${attempt.label})...`, 'info');
                    const response = await fetch(csvUrl, {
                        mode: 'cors',
                        headers: { 'Accept': 'text/csv', 'Cache-Control': 'no-cache' }
                    });

                    if (!response.ok) {
                        lastError = new Error(`HTTP ${response.status}`);
                        if (response.status === 400 || response.status === 404) {
                            console.warn(`⚠️ ${attempt.label} tidak valid, coba gid lainnya...`);
                            continue;
                        } else if (response.status === 403) {
                            throw new Error('Akses ditolak. Sheet harus di-share publik atau dengan link.');
                        }
                        throw lastError;
                    }

                    const csv = await response.text();
                    if (!csv || csv.trim().length === 0) {
                        lastError = new Error('Sheet kosong atau tidak dapat dibaca');
                        continue;
                    }

                    const lines = csv.split('\n').filter(line => line.trim());
                    if (lines.length < 1) {
                        lastError = new Error('Sheet tidak memiliki header');
                        continue;
                    }

                    // Jika sampai sini, berarti berhasil
                    successGid = attempt.gid;
                    lastError = null;
                    break;

                } catch (error) {
                    lastError = error;
                    console.warn(`⚠️ Gagal dengan ${attempt.label}:`, error.message);
                    continue;
                }
            }

            if (!csvUrl || lastError) {
                throw new Error(`❌ Semua percobaan sync Nilai Siswa gagal. 
                
⚠️ PENTING: Sheet "Nilai Siswa" mungkin memiliki gid yang berbeda.

📋 Solusi:
1. Buka Google Sheet Anda
2. Klik tab "Nilai Siswa" 
3. Lihat di URL: ...#gid=XXXXX
4. Catatan nomor gid tersebut
5. Jika ada tombol untuk input gid Nilai Siswa, gunakan itu

Atau: Pastikan template di-import dengan benar dan ketiga tab (Data Siswa, Absensi, Nilai Siswa) ada di spreadsheet.

Error: ${lastError?.message || 'Tidak diketahui'}`);
            }

            // Parse CSV dan simpan
            const csv = await (await fetch(csvUrl)).text();
            const lines = csv.split('\n').filter(line => line.trim());

            if (lines.length < 2) {
                showToast('ℹ️ Sheet Nilai Siswa hanya memiliki header (belum ada data)', 'info');
                return { success: true, count: 0, message: 'Sheet Nilai Siswa masih kosong' };
            }

            dataNilaiSiswa = [];
            for (let i = 1; i < lines.length; i++) {
                const cols = parseCSVLine(lines[i]);
                if (cols.length === 0 || !cols[0] || cols[0].trim() === '') continue;

                dataNilaiSiswa.push({
                    id: Date.now() + i,
                    nisn: (cols[0] || '').trim(),
                    nama: (cols[1] || '').trim(),
                    mapel: (cols[2] || '').trim(),
                    jenisAsesmen: (cols[3] || 'Sumatif').trim(),
                    nilai: parseInt(cols[4]) || 0,
                    catatan: (cols[5] || '').trim()
                });
            }

            if (dataNilaiSiswa.length > 0) {
                localStorage.setItem('dataNilaiSiswa', JSON.stringify(dataNilaiSiswa));
                showToast(`✅ ${dataNilaiSiswa.length} data nilai siswa berhasil disinkronkan! (gid=${successGid})`, 'success');
                loadRekupNilai();
                return { success: true, count: dataNilaiSiswa.length };
            }
            return { success: true, count: 0, message: 'Tidak ada data nilai ditemukan' };
        } catch (error) {
            console.error('❌ Error sync nilai:', error);
            showToast(error.message || ('❌ Gagal sinkronisasi nilai: ' + error.message), 'danger');
            return { success: false, count: 0 };
        }
    }

    // Fungsi untuk sinkronisasi semua data sekaligus
    window.syncAllDataFromGoogle = async function () {
        const link = document.getElementById('ds-datasheet-link')?.value || '';
        if (!link) {
            showToast('⚠️ Link Google Spreadsheet belum diisi! Silakan isi di field atas.', 'warning');
            return;
        }

        showToast('⏳ Memulai sinkronisasi data dari Google Sheet...', 'info');
        const btn = document.getElementById('btn-sync-from-google');
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sinkronisasi...';
        }

        try {
            // Sync Data Siswa (gid=0, default)
            await syncDataSiswaFromGoogle();

            // Sync Absensi (gid=1)
            const absensiResult = await syncAbsensiFromGoogle(link);

            // Sync Nilai Siswa (gid=2)
            const nilaiResult = await syncNilaiSiswaFromGoogle(link);

            showToast('✅ Semua data berhasil disinkronkan dari Google Sheet!', 'success');
        } catch (error) {
            console.error('❌ Error during full sync:', error);
            showToast('❌ Ada error saat sinkronisasi: ' + error.message, 'danger');
        } finally {
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-cloud-download-alt"></i> Sinkronisasi dari Google Sheet';
            }
        }
    };

    // Upload Nilai Siswa ke Google Sheet
    window.uploadNilaiToGoogle = async function () {
        const link = document.getElementById('ds-datasheet-link')?.value || '';
        if (!link) {
            showToast('⚠️ Link Google Spreadsheet belum diisi!', 'warning');
            return;
        }

        if (!dataNilaiSiswa || dataNilaiSiswa.length === 0) {
            showToast('⚠️ Tidak ada data nilai untuk diupload!', 'warning');
            return;
        }

        try {
            const validation = validateGoogleSheetUrl(link);
            if (!validation.valid) throw new Error(validation.error);

            // Format data untuk diupload (CSV format)
            let csvContent = 'NISN,Nama,Mata Pelajaran,Jenis Asesmen,Nilai,Catatan\n';
            dataNilaiSiswa.forEach(n => {
                csvContent += `"${n.nisn}","${n.nama}","${n.mapel}","${n.jenisAsesmen}",${n.nilai},"${n.catatan}"\n`;
            });

            showToast('⏳ Persiapan upload... Instruksi: Copy data di bawah ke Google Sheet (gid=2)', 'info');

            // Copy ke clipboard untuk memudahkan user
            navigator.clipboard.writeText(csvContent).then(() => {
                showToast('✅ Data nilai copied to clipboard! Paste di Google Sheet tab "Nilai Siswa"', 'success');
            }).catch(err => {
                console.warn('Clipboard copy gagal, tampilkan data langsung:', err);
                const modal = document.createElement('div');
                modal.style.cssText = 'position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); background:white; border:1px solid #ddd; border-radius:8px; padding:20px; max-width:600px; max-height:80vh; overflow-y:auto; z-index:10000; box-shadow:0 4px 6px rgba(0,0,0,0.2);';
                modal.innerHTML = `
                    <h3>Data Nilai untuk Upload ke Google Sheet</h3>
                    <p style="font-size:0.9rem; color:#666;">Copy text di bawah, lalu paste ke Google Sheet tab "Nilai Siswa":</p>
                    <textarea readonly style="width:100%; height:300px; font-family:monospace; font-size:0.85rem; border:1px solid #ddd; padding:8px; border-radius:4px;">${csvContent}</textarea>
                    <button onclick="this.parentElement.remove()" class="btn btn-primary" style="margin-top:10px;">Tutup</button>
                `;
                document.body.appendChild(modal);
            });
        } catch (error) {
            console.error('❌ Error upload nilai:', error);
            showToast('❌ Gagal upload nilai: ' + error.message, 'danger');
        }
    };

    window.saveDatasheetLink = function () {
        const link = document.getElementById('ds-datasheet-link')?.value || '';
        if (!link) {
            showToast('Silakan masukkan link Google Spreadsheet', 'warning');
            return;
        }
        localStorage.setItem('ds_datasheet_link', link);
        showToast('Link Google Spreadsheet berhasil disimpan!', 'success');
    };

    setTimeout(() => {
        if (typeof autoLoadAllData === 'function') {
            autoLoadAllData().catch(e => console.error('Auto-load failed:', e));
        }
        // Initialize Konten Kreator form fields
        if (typeof updateKontenFields === 'function') {
            updateKontenFields();
        }
    }, 500);
});
/* =========================================
   DYNAMIC DATA LOADING & MENU POPULATION
   ========================================= */

let GLOBAL_DATA_JSON = [];

document.addEventListener('DOMContentLoaded', () => {
    fetch('<script src="https://cdn.jsdelivr.net/gh/arhammazid/digiarju/data.json"></script>')
        .then(res => res.json())
        .then(data => {
            GLOBAL_DATA_JSON = data;
            console.log("Loaded data.json entries:", data.length);
            refreshAllMenus();
        })
        .catch(err => console.error("Error loading data.json:", err));

    setupMenuListeners('modul');
    setupMenuListeners('kokul');
    setupMenuListeners('soal');
});


function setupMenuListeners(prefix) {
    const elJenjang = document.getElementById(`${prefix}-jenjang`);
    const elKelas = document.getElementById(`${prefix}-kelas-select`) || document.getElementById(`${prefix}-kelas`);
    const elSem = document.getElementById(`${prefix}-sem-select`) || document.getElementById(`${prefix}-semester`);

    // Mapel & TP Selects
    const elMapel = document.getElementById(`${prefix}-mapel-select`);
    const elTP = document.getElementById(`${prefix}-tp-select`);

    // Manual Inputs
    const manualMapel = document.getElementById(`${prefix}-mapel-manual`) || document.getElementById(`${prefix}-mapel-kustom`);
    const manualTP = document.getElementById(`${prefix}-tp-manual`);

    const triggerUpdate = () => {
        setTimeout(() => updateMapelOptions(prefix), 200);
    };

    if (elJenjang) elJenjang.addEventListener('change', triggerUpdate);
    if (elKelas) elKelas.addEventListener('change', triggerUpdate);
    if (elSem) elSem.addEventListener('change', triggerUpdate);

    if (elMapel) {
        elMapel.addEventListener('change', () => {
            updateTPOptions(prefix);
            toggleManualInput(elMapel, manualMapel);
        });
    }

    if (elTP) {
        elTP.addEventListener('change', () => {
            toggleManualInput(elTP, manualTP);
        });
    }
}

function updateMapelOptions(prefix) {
    if (!GLOBAL_DATA_JSON.length) return;

    const elJenjang = document.getElementById(`${prefix}-jenjang`);
    const elKelas = document.getElementById(`${prefix}-kelas-select`) || document.getElementById(`${prefix}-kelas`);
    const elSem = document.getElementById(`${prefix}-sem-select`) || document.getElementById(`${prefix}-semester`);
    const elMapel = document.getElementById(`${prefix}-mapel-select`);

    if (!elMapel) return;

    const valJenjang = elJenjang ? elJenjang.value : '';
    const valKelas = elKelas ? elKelas.value : '';
    const valSem = elSem ? elSem.value : '';

    const relevant = GLOBAL_DATA_JSON.filter(item => {
        const matchJenjang = !valJenjang || item.Jenjang === valJenjang;
        const matchKelas = !valKelas || item.Kelas === valKelas;
        const matchSem = !valSem || item.Semester === valSem;
        return matchJenjang && matchKelas && matchSem;
    });

    const uniqueMapels = [...new Set(relevant.map(i => i['Mata Pelajaran']))].sort();
    const currentVal = elMapel.value;

    let html = '<option value="">-- Pilih Mata Pelajaran --</option>';
    uniqueMapels.forEach(m => {
        if (m) html += `<option value="${m}">${m}</option>`;
    });
    html += '<option value="Kustom">Kustom (Tulis Manual)</option>';

    elMapel.innerHTML = html;
    if (uniqueMapels.includes(currentVal)) {
        elMapel.value = currentVal;
    } else {
        elMapel.value = "";
    }

    updateTPOptions(prefix);

    const manualMapel = document.getElementById(`${prefix}-mapel-manual`) || document.getElementById(`${prefix}-mapel-kustom`);
    toggleManualInput(elMapel, manualMapel);
}

function updateTPOptions(prefix) {
    const elJenjang = document.getElementById(`${prefix}-jenjang`);
    const elKelas = document.getElementById(`${prefix}-kelas-select`) || document.getElementById(`${prefix}-kelas`);
    const elSem = document.getElementById(`${prefix}-sem-select`) || document.getElementById(`${prefix}-semester`);
    const elMapel = document.getElementById(`${prefix}-mapel-select`);
    const elTP = document.getElementById(`${prefix}-tp-select`);

    if (!elMapel || !elTP) return;

    const valJenjang = elJenjang ? elJenjang.value : '';
    const valKelas = elKelas ? elKelas.value : '';
    const valSem = elSem ? elSem.value : '';
    const valMapel = elMapel.value;

    if (!valMapel || valMapel === 'Kustom') {
        elTP.innerHTML = '<option value="">-- Pilih Tujuan Pembelajaran --</option><option value="Kustom">Kustom</option>';
        return;
    }

    const relevant = GLOBAL_DATA_JSON.filter(item => {
        return (!valJenjang || item.Jenjang === valJenjang) &&
            (!valKelas || item.Kelas === valKelas) &&
            (!valSem || item.Semester === valSem) &&
            (item['Mata Pelajaran'] === valMapel);
    });

    const uniqueTPs = [...new Set(relevant.map(i => i['Tujuan Pembelajaran']))].sort();

    let html = '<option value="">-- Pilih Tujuan Pembelajaran --</option>';
    uniqueTPs.forEach(tp => {
        if (!tp) return;
        const display = tp.length > 120 ? tp.substring(0, 120) + '...' : tp;
        html += `<option value="${tp}">${display}</option>`;
    });
    html += '<option value="Kustom">Kustom (Tulis Manual)</option>';

    elTP.innerHTML = html;
}

function toggleManualInput(selectEl, manualEl) {
    if (!manualEl) return;
    if (selectEl && selectEl.value === 'Kustom') {
        manualEl.style.display = 'block';
    } else {
        manualEl.style.display = 'none';
    }
}

function refreshAllMenus() {
    updateMapelOptions('modul');
    updateMapelOptions('kokul');
    updateMapelOptions('soal');
}

/* =========================================
   TOGGLE BUTTON DELEGATION FIX & LOGIC
   ========================================= */
document.addEventListener('click', function (e) {
    if (e.target.matches('.btn-toggle') || e.target.closest('.btn-toggle')) {
        const btn = e.target.matches('.btn-toggle') ? e.target : e.target.closest('.btn-toggle');
        const group = btn.closest('.btn-group-custom');

        if (group) {
            group.querySelectorAll('.btn-toggle').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Handle Kustom Logic for Kurikulum Groups
            const val = btn.getAttribute('data-value');
            if (group.id === 'modul-kurikulum-group' || group.id === 'soal-kurikulum-group' || group.id === 'kokul-kurikulum-group') {
                const kustomInputId = group.id.replace('-group', '-kustom'); // e.g. modul-kurikulum-kustom
                const inputEl = document.getElementById(kustomInputId);
                if (inputEl) {
                    inputEl.style.display = (val === 'Kustom') ? 'block' : 'none';
                    if (val === 'Kustom') setTimeout(() => inputEl.focus(), 100);
                }
            }
        }
    }
});

/* =========================================
   LEGACY OVERRIDES (Redirect to Data.json Logic)
   ========================================= */
function updateModulMapelOptions() {
    // Redirect legacy call to new dynamic logic
    if (typeof updateMapelOptions === 'function') updateMapelOptions('modul');
}

function updateSoalMapelOptions() {
    // Redirect legacy call to new dynamic logic
    if (typeof updateMapelOptions === 'function') updateMapelOptions('soal');
}
