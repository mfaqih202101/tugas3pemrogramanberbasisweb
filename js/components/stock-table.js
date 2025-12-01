Vue.component('ba-stock-table', {
    template: '#tpl-stock',
    props: ['items', 'upbjjList', 'kategoriList'],
    data() {
        return {
            filter: { upbjj: '', lowStock: false, emptyStock: false },
            sortBy: 'default',
            form: { kode: '', judul: '', kategori: '', upbjj: '', lokasiRak: '', harga: 0, qty: 0, safety: 0, catatanHTML: '' },
            isEditMode: false,
            editIndex: null,
            bsModal: null
        };
    },
    mounted() {
        // Inisialisasi modal menggunakan ID yang ada di template
        this.bsModal = new bootstrap.Modal(document.getElementById('modalStokForm'));
    },
    computed: {
        totalRestock() { return this.items.filter(i => i.qty < i.safety).length; },
        filteredStok() {
            let result = this.items;
            // 1. Filter UPBJJ
            if (this.filter.upbjj) result = result.filter(i => i.upbjj === this.filter.upbjj);
            
            // 2. Filter Status
            if (this.filter.lowStock || this.filter.emptyStock) {
                result = result.filter(item => {
                    const isLow = item.qty < item.safety && item.qty > 0;
                    const isEmpty = item.qty === 0;
                    if (this.filter.lowStock && this.filter.emptyStock) return isLow || isEmpty;
                    if (this.filter.lowStock) return isLow;
                    if (this.filter.emptyStock) return isEmpty;
                });
            }

            // 3. Sorting
            if (this.sortBy === 'judul') result = result.slice().sort((a,b) => a.judul.localeCompare(b.judul));
            if (this.sortBy === 'stok') result = result.slice().sort((a,b) => a.qty - b.qty);
            
            return result;
        }
    },
    methods: {
        formatRupiah(val) { return "Rp " + (val||0).toLocaleString('id-ID'); },
        bukaModalTambah() {
            this.isEditMode = false;
            this.form = { kode: '', judul: '', kategori: '', upbjj: '', lokasiRak: '', harga: 0, qty: 0, safety: 0, catatanHTML: '' };
            this.bsModal.show();
        },
        bukaModalEdit(item) {
            this.isEditMode = true;
            this.editIndex = this.items.indexOf(item);
            this.form = { ...item };
            this.bsModal.show();
        },
        simpanData() {
            if (this.isEditMode) {
                this.$set(this.items, this.editIndex, { ...this.form });
            } else {
                this.items.push({ ...this.form });
            }
            this.bsModal.hide();
        },
        hapusData(item) {
            if(confirm('Hapus item ini?')) {
                const idx = this.items.indexOf(item);
                if (idx > -1) this.items.splice(idx, 1);
            }
        }
    }
});