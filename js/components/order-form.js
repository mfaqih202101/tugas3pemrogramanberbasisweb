Vue.component('order-form', {
    template: '#tpl-order',
    props: ['paketList', 'pengirimanList'],
    data() {
        return {
            order: { paket: '', ekspedisi: '', nama: '', alamat: '' }
        };
    },
    methods: {
        prosesOrder() {
            alert(`Terima kasih ${this.order.nama}, pesanan paket ${this.order.paket} akan dikirim ke ${this.order.alamat} via ${this.order.ekspedisi}.`);
            this.order = { paket: '', ekspedisi: '', nama: '', alamat: '' }; // Reset form
        }
    }
});