const body = document.body;
const darkModeIcon = document.getElementById('darkModeIcon');
const contentWrapper = document.getElementById('contentWrapper');

if (localStorage.getItem('theme') === 'dark' && darkModeIcon) {
    darkModeIcon.className = "fa-solid fa-sun text-yellow-300";
}

const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

if (contentWrapper) {
    contentWrapper.addEventListener('scroll', () => {
        const winScroll = contentWrapper.scrollTop;
        const height = contentWrapper.scrollHeight - contentWrapper.clientHeight;
        const scrolled = (winScroll / height) * 100;

        const progress = document.getElementById('reading-progress');
        if (progress) progress.style.width = scrolled + '%';

        const btt = document.getElementById('back-to-top');
        if (btt) {
            if (winScroll > 300) btt.classList.add('show');
            else btt.classList.remove('show');
        }
    });
}

function openAppsModal() {
    const m = document.getElementById('appsModal');
    if (m) {
        m.classList.remove('hidden');
        m.classList.add('flex');
        setTimeout(() => {
            m.classList.remove('opacity-0');
            if (m.children[0]) {
                m.children[0].classList.remove('scale-95');
                m.children[0].classList.add('scale-100');
            }
        }, 10);
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }
}

function closeAppsModal() {
    const m = document.getElementById('appsModal');
    if (m) {
        m.classList.add('opacity-0');
        if (m.children[0]) {
            m.children[0].classList.remove('scale-100');
            m.children[0].classList.add('scale-95');
        }
        setTimeout(() => {
            m.classList.add('hidden');
            m.classList.remove('flex');
        }, 300);
    }
}

function openSearch() {
    const overlay = document.getElementById('searchOverlay');
    if (overlay) {
        overlay.classList.remove('hidden');
        overlay.classList.add('flex');
        document.getElementById('searchInputRef').focus();
    }
}

function closeSearch() {
    const overlay = document.getElementById('searchOverlay');
    if (overlay) {
        overlay.classList.add('hidden');
        overlay.classList.remove('flex');
        const suggestions = document.getElementById('searchSuggestions');
        if (suggestions) suggestions.classList.add('hidden');
        document.getElementById('searchInputRef').value = '';
    }
}

function toggleDarkMode() {
    body.classList.toggle('dark');
    const isDark = body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (darkModeIcon) darkModeIcon.className = isDark ? "fa-solid fa-sun text-yellow-300" : "fa-solid fa-moon text-white";
}

function closeLightbox() {
    document.getElementById('lightbox-overlay').classList.remove('active');
}

const searchInputRef = document.getElementById('searchInputRef');
const searchSuggestions = document.getElementById('searchSuggestions');
let searchTimeout;

function handleSearchSubmit(e) {
    const query = document.getElementById('searchInputRef').value.trim();
    if (!query) {
        e.preventDefault();
        showToast("Ketikkan sesuatu terlebih dahulu!", "#ef4444");
        return false;
    }
    return true;
}

if (searchInputRef && searchSuggestions) {
    searchInputRef.addEventListener('input', function (e) {
        clearTimeout(searchTimeout);
        const query = e.target.value.trim();

        if (query.length < 3) {
            searchSuggestions.classList.add('hidden');
            return;
        }

        searchTimeout = setTimeout(() => {
            searchSuggestions.classList.remove('hidden');
            searchSuggestions.style.display = 'flex';
            searchSuggestions.innerHTML = '<div class="p-5 text-center text-slate-500 dark:text-slate-400 text-sm"><i class="fa-solid fa-circle-notch fa-spin mr-2"></i>Mencari hasil...</div>';

            fetch('/feeds/posts/summary?alt=json&max-results=4&q=' + encodeURIComponent(query))
                .then(res => res.json())
                .then(data => {
                    const entries = data.feed.entry;
                    if (!entries || entries.length === 0) {
                        searchSuggestions.innerHTML = '<div class="p-5 text-center text-slate-500 dark:text-slate-400 text-sm">Tidak ada hasil ditemukan untuk "<b>' + query + '</b>"</div>';
                        return;
                    }

                    let html = '';
                    entries.forEach(entry => {
                        const title = entry.title.$t;
                        let link = '#';
                        entry.link.forEach(l => { if (l.rel === 'alternate') link = l.href; });

                        html += `<a href="${link}" class="px-5 py-3.5 border-b border-slate-100 dark:border-slate-700 hover:bg-red-50 dark:hover:bg-slate-700/80 flex items-center gap-4 transition-colors no-underline group">
                                    <div class="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0 text-slate-400 group-hover:text-red-500 transition-colors">
                                        <i class="fa-solid fa-file-lines"></i>
                                    </div>
                                    <span class="text-sm font-bold text-slate-700 dark:text-slate-200 line-clamp-2">${title}</span>
                                 </a>`;
                    });

                    html += `<a href="/search?q=${encodeURIComponent(query)}" class="px-5 py-3 bg-slate-50 dark:bg-slate-800 text-center text-xs font-bold text-red-600 dark:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors block">Lihat Semua Hasil Untuk "${query}" &rarr;</a>`;

                    searchSuggestions.innerHTML = html;
                })
                .catch(err => {
                    searchSuggestions.innerHTML = '<div class="p-5 text-center text-slate-500 dark:text-slate-400 text-sm">Terjadi kesalahan. Silakan tekan Enter untuk mencari.</div>';
                });
        }, 500);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    if (typeof lucide !== 'undefined') lucide.createIcons();

    document.querySelectorAll('.reveal-on-scroll').forEach(el => scrollObserver.observe(el));

    const postBody = document.querySelector('.post-body');
    const rtDisplays = document.querySelectorAll('.reading-time-display');
    if (postBody && rtDisplays.length > 0) {
        const text = postBody.innerText || postBody.textContent;
        const wordCount = text.trim().split(/\s+/).length;
        const readTime = Math.ceil(wordCount / 200);
        rtDisplays.forEach(el => {
            el.innerHTML = `Estimasi <b>${readTime} menit</b> membaca`;
        });
    }

    const postImages = document.querySelectorAll('.post-body img');
    const lightbox = document.getElementById('lightbox-overlay');
    const lightboxImg = document.getElementById('lightbox-img');

    postImages.forEach(img => {
        img.addEventListener('click', function (e) {
            if (e.target.parentElement.tagName === 'A') {
                e.preventDefault();
            }
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
        });
    });

    const loader = document.getElementById('system-loader');
    if (loader) {
        let p = 0;
        const bar = document.getElementById('loaderBar');
        const i = setInterval(() => {
            p += Math.random() * 5;
            if (p > 100) p = 100;
            if (bar) bar.style.width = `${p}%`;
            if (p >= 100) { clearInterval(i); setTimeout(() => loader.classList.add('loaded'), 500); }
        }, 30);
    }
});


const gridContainer = document.getElementById('appGrid');

function renderApps(filteredApps) {
    if (!gridContainer || !filteredApps) return;
    gridContainer.innerHTML = '';
    filteredApps.forEach((app, index) => {
        const card = document.createElement('a');
        card.href = app.url;
        card.className = `app-card p-4 cursor-pointer flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-3 md:gap-4 group no-underline reveal-on-scroll`;

        card.innerHTML = `
            <div class="w-12 h-12 md:w-14 md:h-14 rounded-xl flex-shrink-0 flex items-center justify-center text-xl shadow-sm relative transition-all duration-300 group-hover:shadow-md ${app.bg} border border-slate-100 dark:border-slate-700/50">
                <i class="fa-solid ${app.icon} ${app.color}"></i>
            </div>
            <div class="w-full">
                <div class="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-0.5">${app.sub}</div>
                <h3 class="text-sm md:text-base font-bold text-slate-800 dark:text-slate-100 mb-1 group-hover:text-red-600 transition-colors">${app.name}</h3>
                <p class="text-[11px] text-slate-500 dark:text-slate-400 leading-snug hidden md:block">${app.desc}</p>
            </div>
        `;

        card.addEventListener('click', function (e) {
            e.preventDefault();
            showToast(app.name, app.hex);
            setTimeout(() => {
                if (app.url && app.url !== '#') window.location.href = app.url;
            }, 800);
        });
        gridContainer.appendChild(card);
    });
}

function showToast(appName, colorHex) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.style.borderLeft = `4px solid ${colorHex}`;
    toast.innerHTML = `<div class="flex items-center justify-center gap-3"><i class="fa-solid fa-circle-notch fa-spin" style="color:${colorHex}"></i> <span>Membuka <b>${appName}</b>...</span></div>`;
    toast.className = "show";
    setTimeout(() => toast.className = toast.className.replace("show", ""), 2000);
}

if (window.appMenuData) {
    renderApps(window.appMenuData);
}


(function () {
    var keyElement = document.getElementById('template-license-key');
    var popup = document.getElementById('activation-popup');
    var card = document.getElementById('activation-card');
    var inputToken = keyElement ? keyElement.innerText.trim() : '';
    var blogId = typeof currentBloggerId !== 'undefined' ? currentBloggerId : '';
    var secretKey = "DIGIARJU_RAHASIA_2026";

    function generateExpectedToken(id, secret) {
        var str = id + secret;
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
            var char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return "ARJU-" + Math.abs(hash).toString(16).toUpperCase();
    }

    var expectedToken = generateExpectedToken(blogId, secretKey);
    var isInvalid = (inputToken !== expectedToken);

    if (isInvalid) {
        if (popup) {
            popup.classList.remove('hidden');
            popup.classList.add('flex');

            setTimeout(function () {
                if (card) {
                    card.classList.remove('scale-95');
                    card.classList.add('scale-100');
                }
            }, 50);

            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
        }

        document.addEventListener("DOMContentLoaded", function () {
            var wrapper = document.getElementById('contentWrapper');
            var chat = document.getElementById('ai-chat-section');
            if (wrapper) { wrapper.style.display = 'none'; wrapper.remove(); }
            if (chat) { chat.style.display = 'none'; chat.remove(); }
        });
    }
})();
