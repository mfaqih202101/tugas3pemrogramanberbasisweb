Vue.component('status-badge', {
    template: '#tpl-badge',
    props: ['status', 'type', 'qty', 'safety'],
    computed: {
        badgeTextClass() {
            if (this.type === 'stok') {
                if (this.qty === 0) return 'status-text-danger';
                if (this.qty < this.safety) return 'status-text-warning';
                return 'status-text-aman';
            }
            return 'badge bg-info text-dark';
        },
        badgeLabel() {
            if (this.type === 'stok') {
                if (this.qty === 0) return 'Kosong';
                if (this.qty < this.safety) return 'Menipis';
                return 'Aman';
            }
            return this.status;
        },
        badgeIcon() {
            if (this.type === 'stok') {
                if (this.qty === 0) return 'fas fa-times-circle';
                if (this.qty < this.safety) return 'fas fa-exclamation-triangle';
                return 'fas fa-check-circle';
            }
            return 'fas fa-truck';
        }
    }
});