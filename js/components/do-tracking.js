Vue.component('do-tracking', {
    template: '#tpl-tracking',
    props: ['trackingData', 'pengirimanList', 'paketList'],
    data() {
        return {
            searchQuery: '',
            form: { nim: '', nama: '', ekspedisi: '', paket: '', tanggalKirim: new Date().toISOString().slice(0,10), total: 0 },
            bsModal: null
        };
    },
    mounted() {
        this.bsModal = new bootstrap.Modal(document.getElementById('modalDoForm'));
    },
    computed: {
        filteredTracking() {
            if(!this.searchQuery) return this.trackingData;
            const q = this.searchQuery.toLowerCase();
            return this.trackingData.filter(i => i.noDO.toLowerCase().includes(q) || i.nama.toLowerCase().includes(q));
        },
        generatedDONumber() {
            return `DO${new Date().getFullYear()}-${String(this.trackingData.length + 1).padStart(4, '0')}`;
        }
    },
    watch: {
        'form.paket'(val) {
            const p = this.paketList.find(i => i.kode === val);
            if(p) this.form.total = p.harga;
        }
    },
    methods: {
        formatRupiah(val) { return "Rp " + (val||0).toLocaleString('id-ID'); },
        bukaModal() { this.bsModal.show(); },
        submitDO() {
            const newDO = {
                noDO: this.generatedDONumber,
                ...this.form,
                status: 'Diproses',
                perjalanan: [{ waktu: new Date().toLocaleString(), keterangan: 'Order Dibuat' }]
            };
            this.trackingData.unshift(newDO);
            this.bsModal.hide();
        },
        hapusDO(item) {
            if(confirm('Hapus DO ini?')) {
                const idx = this.trackingData.indexOf(item);
                if(idx > -1) this.trackingData.splice(idx, 1);
            }
        }
    }
});