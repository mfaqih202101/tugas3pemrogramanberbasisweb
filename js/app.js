// Fungsi Helper: Memuat file HTML template dan menyuntikkannya ke DOM
async function loadTemplate(id, url) {
    const response = await fetch(url);
    const text = await response.text();
    const script = document.createElement('script');
    script.type = 'text/x-template';
    script.id = id;
    script.innerHTML = text;
    document.body.appendChild(script);
}

// Inisialisasi Aplikasi Utama
async function initApp() {
    // 1. Load Templates (Wajib selesai sebelum Vue mount)
    await Promise.all([
        loadTemplate('tpl-stock', 'templates/stock-table.html'),
        loadTemplate('tpl-tracking', 'templates/do-tracking.html'),
        loadTemplate('tpl-order', 'templates/order-form.html'),
        loadTemplate('tpl-badge', 'templates/status-badge.html'),
        loadTemplate('tpl-modal', 'templates/app-modal.html')
    ]);

    // 2. Load Data JSON
    const data = await apiService.getData();

    // 3. Mount Vue
    new Vue({
        el: '#app',
        data: {
            currentTab: 'home', // stok | tracking | order
            state: {
                stok: data ? data.stok : [],
                tracking: data ? data.tracking : [],
                paket: data ? data.paket : [],
                upbjjList: data ? data.upbjjList : [],
                kategoriList: data ? data.kategoriList : [],
                pengirimanList: data ? data.pengirimanList : []
            }
        }
    });
}

// Jalankan
initApp();