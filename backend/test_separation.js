const axios = require('axios');
const API_URL = 'http://localhost:5000/api';

async function test() {
    try {
        console.log('1. Fetching current data...');
        const res1 = await axios.get(API_URL + '/reports');
        const initialDate = res1.data.current[0].report_date;
        console.log('Date:', initialDate);

        console.log('2. Updating daily data for Bruno Premi...');
        await axios.post(API_URL + '/reports', {
            date: initialDate,
            data: [{
                brand_name: 'Bruno Premi',
                harian_n_qty: 10,
                harian_n_harga: 1000000
            }]
        });

        console.log('3. Updating cumulative data for Bruno Premi...');
        await axios.post(API_URL + '/reports', {
            date: initialDate,
            data: [{
                brand_name: 'Bruno Premi',
                kumulatif_n_qty: 50,
                kumulatif_n_harga: 5000000
            }]
        });

        console.log('4. Verifying merged data...');
        const res2 = await axios.get(API_URL + '/reports?date=' + initialDate);
        const bruno = res2.data.current.find(r => r.brand_name === 'Bruno Premi');
        console.log('Bruno Premi Result:', JSON.stringify(bruno, null, 2));

        if (bruno.harian_n_qty === 10 && bruno.kumulatif_n_qty === 50) {
            console.log('\nSUCCESS: Daily and Cumulative data are stored separately and merged correctly!');
        } else {
            console.log('\nFAILURE: Data mismatch.');
            process.exit(1);
        }
    } catch (err) {
        console.error('Test failed:', err.message);
        process.exit(1);
    }
}
test();
