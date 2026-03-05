export interface BrandData {
    brand_name: string;
    harian_n_qty: number;
    harian_n_harga: number;
    harian_ob_qty: number;
    harian_ob_harga: number;
    kumulatif_n_qty: number;
    kumulatif_n_harga: number;
    kumulatif_ob_qty: number;
    kumulatif_ob_harga: number;
}

export const BRANDS = [
    'Bruno Premi', 'Rohde', 'Triset', 'Yongki Komaladi', 'Fladeo',
    'Lawrensia', 'Steve & Co', 'Dr Kevin', 'Cardinal', 'St Moritz',
    'Genny', 'Peter Keiza', 'Laviola'
];

// Helper to parse string "1/351.920" -> { qty: 1, harga: 351920 }
const parseValue = (valStr: string) => {
    if (!valStr || valStr.trim() === '') return { qty: 0, harga: 0 };
    const parts = valStr.split('/').map(p => p.trim());
    if (parts.length !== 2) return { qty: 0, harga: 0 };
    const qty = parseInt(parts[0].replace(/\./g, ''), 10) || 0;
    const harga = parseInt(parts[1].replace(/\./g, ''), 10) || 0;
    return { qty, harga };
};

// Extractor function from raw text
export const parseRawText = (text: string, currentData: BrandData[], yesterdayData: BrandData[], mode: 'AWAL' | 'LANJUTAN'): BrandData[] => {
    const lines = text.split('\n').map(l => l.trim());

    // If AWAL, clear everything to 0 first. If LANJUTAN, keep current data.
    let newData = [];
    if (mode === 'AWAL') {
        newData = BRANDS.map(name => ({
            brand_name: name,
            harian_n_qty: 0, harian_n_harga: 0,
            harian_ob_qty: 0, harian_ob_harga: 0,
            kumulatif_n_qty: 0, kumulatif_n_harga: 0,
            kumulatif_ob_qty: 0, kumulatif_ob_harga: 0
        }));
    } else {
        newData = [...currentData];
    }

    let section: 'HARIAN' | 'KUMULATIF' | null = null;
    let currentBrandIndex = -1;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Detect section
        if (line.toUpperCase().includes('KOMPETITOR HARIAN')) {
            section = 'HARIAN';
            continue;
        } else if (line.toUpperCase().includes('KOMPETITOR 1-30') || line.toUpperCase().includes('KOMPETITOR 1-')) {
            section = 'KUMULATIF';
            continue;
        }

        if (!section) continue;

        // Detect Brand
        // Matches "1.Bruno premi" or "1. Bruno Premi"
        const brandMatch = line.match(/^(\d+)\.\s*(.+)$/i);
        if (brandMatch) {
            const nameStr = brandMatch[2].trim().toLowerCase();

            // Find matching brand in our constants
            currentBrandIndex = BRANDS.findIndex(b => {
                const bName = b.toLowerCase();
                // Handle "yongki" vs "yongki komaladi"
                if (bName.includes('yongki') && nameStr.includes('yongki')) return true;
                if (bName.includes('steve') && nameStr.includes('steve')) return true;
                if (bName.includes(nameStr) || nameStr.includes(bName)) return true;
                return false;
            });
            continue;
        }

        if (currentBrandIndex === -1) continue;

        // Detect N, Ob, Ttl
        const lowerLine = line.toLowerCase();
        const yRecord = yesterdayData.find(y => y.brand_name === newData[currentBrandIndex].brand_name);

        // Handle "N : 1/351.920", "N :", "N:"
        if (lowerLine.startsWith('n') && lowerLine.includes(':')) {
            const val = line.substring(line.indexOf(':') + 1).trim();
            const { qty, harga } = parseValue(val);
            if (section === 'HARIAN') {
                if (mode === 'LANJUTAN') {
                    newData[currentBrandIndex].harian_n_qty += qty;
                    newData[currentBrandIndex].harian_n_harga += harga;
                } else {
                    newData[currentBrandIndex].harian_n_qty = qty;
                    newData[currentBrandIndex].harian_n_harga = harga;
                }

                // Auto calc kumulatif
                const yQty = yRecord ? yRecord.kumulatif_n_qty : 0;
                const yHarga = yRecord ? yRecord.kumulatif_n_harga : 0;
                newData[currentBrandIndex].kumulatif_n_qty = newData[currentBrandIndex].harian_n_qty + yQty;
                newData[currentBrandIndex].kumulatif_n_harga = newData[currentBrandIndex].harian_n_harga + yHarga;
            } else {
                if (mode === 'LANJUTAN') {
                    newData[currentBrandIndex].kumulatif_n_qty += qty;
                    newData[currentBrandIndex].kumulatif_n_harga += harga;
                } else {
                    newData[currentBrandIndex].kumulatif_n_qty = qty;
                    newData[currentBrandIndex].kumulatif_n_harga = harga;
                }
            }
        } else if (lowerLine.startsWith('ob') && lowerLine.includes(':')) {
            const val = line.substring(line.indexOf(':') + 1).trim();
            const { qty, harga } = parseValue(val);
            if (section === 'HARIAN') {
                if (mode === 'LANJUTAN') {
                    newData[currentBrandIndex].harian_ob_qty += qty;
                    newData[currentBrandIndex].harian_ob_harga += harga;
                } else {
                    newData[currentBrandIndex].harian_ob_qty = qty;
                    newData[currentBrandIndex].harian_ob_harga = harga;
                }

                // Auto calc kumulatif
                const yQty = yRecord ? yRecord.kumulatif_ob_qty : 0;
                const yHarga = yRecord ? yRecord.kumulatif_ob_harga : 0;
                newData[currentBrandIndex].kumulatif_ob_qty = newData[currentBrandIndex].harian_ob_qty + yQty;
                newData[currentBrandIndex].kumulatif_ob_harga = newData[currentBrandIndex].harian_ob_harga + yHarga;
            } else {
                if (mode === 'LANJUTAN') {
                    newData[currentBrandIndex].kumulatif_ob_qty += qty;
                    newData[currentBrandIndex].kumulatif_ob_harga += harga;
                } else {
                    newData[currentBrandIndex].kumulatif_ob_qty = qty;
                    newData[currentBrandIndex].kumulatif_ob_harga = harga;
                }
            }
        }
        // Ttl is auto-calculated later, so we can ignore parsing it exactly
    }

    return newData;
};

// Format currency with thousands separator: 1.549.000
export const formatNumber = (num: number) => {
    if (num === 0) return '';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const formatValueStr = (qty: number, harga: number) => {
    if (qty === 0 && harga === 0) return '';
    return `${qty}/${formatNumber(harga)}`;
};

// Formatter function to Whatsapp Text
export const generateReportText = (data: BrandData[]) => {
    let text = 'KOMPETITOR HARIAN\n';

    data.forEach((item, index) => {
        const tQty = item.harian_n_qty + item.harian_ob_qty;
        const tHarga = item.harian_n_harga + item.harian_ob_harga;

        const displayName = item.brand_name.includes('Yongki') ? 'Yongki' : item.brand_name;
        const ttlLabel = item.brand_name.includes('Laviola') ? 'Total' : 'Ttl';

        text += `${index + 1}. ${displayName}\n`;
        text += `   N : ${formatValueStr(item.harian_n_qty, item.harian_n_harga)}\n`;
        text += `   Ob : ${formatValueStr(item.harian_ob_qty, item.harian_ob_harga)}\n`;
        text += `   ${ttlLabel} : ${formatValueStr(tQty, tHarga)}\n`;
    });

    text += '\nKOMPETITOR 1-30\n';

    data.forEach((item, index) => {
        const tQty = item.kumulatif_n_qty + item.kumulatif_ob_qty;
        const tHarga = item.kumulatif_n_harga + item.kumulatif_ob_harga;

        text += `${index + 1}. ${item.brand_name}\n`;
        text += `N : ${formatValueStr(item.kumulatif_n_qty, item.kumulatif_n_harga) ? `${formatValueStr(item.kumulatif_n_qty, item.kumulatif_n_harga).replace('/', ' / ')}` : ''}\n`;
        text += `Ob : ${formatValueStr(item.kumulatif_ob_qty, item.kumulatif_ob_harga) ? `${formatValueStr(item.kumulatif_ob_qty, item.kumulatif_ob_harga).replace('/', ' / ')}` : ''}\n`;
        text += `Ttl : ${formatValueStr(tQty, tHarga) ? `${formatValueStr(tQty, tHarga).replace('/', ' / ')}` : ''}\n\n`;
    });

    return text.trim();
};

// Generate empty template text
export const generateEmptyTemplate = () => {
    let text = 'KOMPETITOR HARIAN\n';

    BRANDS.forEach((brand, index) => {
        text += `${index + 1}. ${brand}\n`;
        text += `   N : \n`;
        text += `   Ob : \n`;
        text += `   Ttl : \n`;
    });

    return text.trim();
};
