/* --- NETWORK PROCESSOR: SERVICE WORKER V-FINAL --- */
const CACHE_NAME = 'smk-nufa-ultimate-v1'; 
const ASSETS = [
    './',                // Root folder
    './index.html',      // File utama
    './manifest.json',   // Identitas
    './bgm.mp3',         // Audio
    // --- DATABASE FOTO (CACHE) ---
    './foto1.jpg',
    './foto2.jpg',
    './foto3.jpg',
    './foto4.jpg',
    './foto5.jpg',
    './foto6.jpg',
    './foto7.jpg',
    './foto8.jpg',
    './foto9.jpg'
];

// 1. INSTALL: Simpan semua aset ke memori HP
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('>> SYSTEM: CACHING FULL ASSETS...');
            return cache.addAll(ASSETS);
        })
    );
});

// 2. ACTIVATE: Hapus cache versi lama (Penting saat kamu update foto nanti)
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys.map(key => {
                if(key !== CACHE_NAME) return caches.delete(key);
            }));
        })
    );
});

// 3. FETCH: Mode Offline Otomatis
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then(res => {
            // Jika ada di cache, ambil. Jika tidak, download dari internet.
            return res || fetch(e.request);
        })
    );
});
