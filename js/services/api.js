const apiService = {
    async getData() {
        try {
            const response = await fetch('data/dataBahanAjar.json');
            if (!response.ok) throw new Error("Gagal mengambil data");
            
            const rawData = await response.json();

            // TRANSFORMASI DATA TRACKING
            // Data JSON Anda menggunakan format: [{ "DO-XXX": { ...data } }]
            // Kita ubah menjadi: [{ noDO: "DO-XXX", ...data }] agar mudah dibaca Tabel
            if (rawData.tracking && Array.isArray(rawData.tracking)) {
                rawData.tracking = rawData.tracking.map(item => {
                    // Cek jika item memiliki key dinamis (seperti "DO2025-0001")
                    const keys = Object.keys(item);
                    // Jika key pertama bukan 'noDO' dan item bukan object flat
                    if (keys.length > 0 && keys[0] !== 'noDO' && typeof item[keys[0]] === 'object') {
                        const noDO = keys[0];
                        return { 
                            noDO: noDO, 
                            ...item[noDO] 
                        };
                    }
                    return item;
                });
            }

            return rawData;

        } catch (error) {
            console.error("Error fetching data:", error);
            return null;
        }
    }
};