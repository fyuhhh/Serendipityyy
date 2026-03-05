const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

const BRANDS_LIST = [
    'Bruno Premi', 'Rohde', 'Triset', 'Yongki Komaladi', 'Fladeo',
    'Lawrensia', 'Steve & Co', 'Dr Kevin', 'Cardinal', 'St Moritz',
    'Genny', 'Peter Keiza', 'Laviola'
];

let db;

// Initialize database tables
async function initializeDB() {
    try {
        // Connect without database first
        const initialConnection = await mysql.createConnection(dbConfig);

        // Create DB if not exists
        await initialConnection.query('CREATE DATABASE IF NOT EXISTS `laporan_triset`');
        await initialConnection.end();

        // Now establish pool with the database
        db = mysql.createPool({ ...dbConfig, database: 'laporan_triset' });
        const connection = await db.getConnection();

        // New Table: report_harian
        await connection.query(`
          CREATE TABLE IF NOT EXISTS report_harian (
            id INT AUTO_INCREMENT PRIMARY KEY,
            brand_name VARCHAR(100) NOT NULL,
            report_date DATE NOT NULL,
            n_qty INT DEFAULT 0,
            n_harga BIGINT DEFAULT 0,
            ob_qty INT DEFAULT 0,
            ob_harga BIGINT DEFAULT 0,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            UNIQUE KEY unique_brand_date (brand_name, report_date)
          )
        `);

        // New Table: report_kumulatif
        await connection.query(`
          CREATE TABLE IF NOT EXISTS report_kumulatif (
            id INT AUTO_INCREMENT PRIMARY KEY,
            brand_name VARCHAR(100) NOT NULL,
            report_date DATE NOT NULL,
            n_qty INT DEFAULT 0,
            n_harga BIGINT DEFAULT 0,
            ob_qty INT DEFAULT 0,
            ob_harga BIGINT DEFAULT 0,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            UNIQUE KEY unique_brand_date (brand_name, report_date)
          )
        `);

        // Migration from old table if exists
        try {
            const [oldTableExists] = await connection.query("SHOW TABLES LIKE 'report_data'");
            if (oldTableExists.length > 0) {
                console.log('Migrating data from report_data to new separate tables...');

                // Migrate harian
                await connection.query(`
                    INSERT IGNORE INTO report_harian (brand_name, report_date, n_qty, n_harga, ob_qty, ob_harga)
                    SELECT brand_name, report_date, harian_n_qty, harian_n_harga, harian_ob_qty, harian_ob_harga FROM report_data
                `);

                // Migrate kumulatif
                await connection.query(`
                    INSERT IGNORE INTO report_kumulatif (brand_name, report_date, n_qty, n_harga, ob_qty, ob_harga)
                    SELECT brand_name, report_date, kumulatif_n_qty, kumulatif_n_harga, kumulatif_ob_qty, kumulatif_ob_harga FROM report_data
                `);

                // Rename old table as backup
                await connection.query('RENAME TABLE report_data TO report_data_backup_' + Date.now());
                console.log('Migration completed.');
            }
        } catch (migrationError) {
            console.error('Migration error:', migrationError);
        }

        console.log('Database initialized successfully');
        connection.release();
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}

initializeDB();

// GET available dates
app.get('/api/dates', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT DATE_FORMAT(report_date, "%Y-%m-%d") as date 
            FROM report_harian 
            GROUP BY report_date
            HAVING SUM(n_qty) > 0 OR SUM(ob_qty) > 0
            ORDER BY date DESC
        `);
        res.json(rows.map(r => r.date));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Helper to merge harian and kumulatif records
function mergeRecords(harian, kumulatif, requestedDate) {
    return BRANDS_LIST.map(brand => {
        const findRecord = (arr, name) => arr.find(r =>
            r.brand_name.toLowerCase() === name.toLowerCase() ||
            (name.toLowerCase().includes('yongki') && r.brand_name.toLowerCase().includes('yongki')) ||
            (name.toLowerCase().includes('steve') && r.brand_name.toLowerCase().includes('steve'))
        ) || {};

        const h = findRecord(harian, brand);
        const k = findRecord(kumulatif, brand);

        return {
            brand_name: brand,
            report_date: requestedDate,
            harian_n_qty: h.n_qty || 0,
            harian_n_harga: h.n_harga || 0,
            harian_ob_qty: h.ob_qty || 0,
            harian_ob_harga: h.ob_harga || 0,
            kumulatif_n_qty: k.n_qty || 0,
            kumulatif_n_harga: k.n_harga || 0,
            kumulatif_ob_qty: k.ob_qty || 0,
            kumulatif_ob_harga: k.ob_harga || 0
        };
    });
}

// GET all data
app.get('/api/reports', async (req, res) => {
    const requestedDate = req.query.date || new Date().toLocaleDateString('en-CA');

    try {
        let [harianRows] = await db.query('SELECT * FROM report_harian WHERE report_date = ? ORDER BY brand_name ASC', [requestedDate]);
        let [kumulatifRows] = await db.query('SELECT * FROM report_kumulatif WHERE report_date = ? ORDER BY brand_name ASC', [requestedDate]);

        // If no data exists for this date, automatically initialize from the most recent date
        if (harianRows.length === 0 && kumulatifRows.length === 0) {
            const [recentDates] = await db.query(`
                SELECT report_date FROM (
                    SELECT report_date FROM report_harian WHERE report_date < ?
                    UNION
                    SELECT report_date FROM report_kumulatif WHERE report_date < ?
                ) AS prev_dates ORDER BY report_date DESC LIMIT 1
            `, [requestedDate, requestedDate]);

            if (recentDates.length > 0) {
                const lastDate = recentDates[0].report_date;
                // We only copy cumulative data forward
                const [oldKumulatif] = await db.query('SELECT * FROM report_kumulatif WHERE report_date = ?', [lastDate]);

                for (const row of oldKumulatif) {
                    await db.query(`INSERT IGNORE INTO report_kumulatif 
                        (brand_name, report_date, n_qty, n_harga, ob_qty, ob_harga) 
                        VALUES (?, ?, ?, ?, ?, ?)`,
                        [row.brand_name, requestedDate, row.n_qty, row.n_harga, row.ob_qty, row.ob_harga]);
                }
            } else {
                for (const brand of BRANDS_LIST) {
                    await db.query('INSERT IGNORE INTO report_kumulatif (brand_name, report_date) VALUES (?, ?)', [brand, requestedDate]);
                }
            }
            [harianRows] = await db.query('SELECT * FROM report_harian WHERE report_date = ?', [requestedDate]);
            [kumulatifRows] = await db.query('SELECT * FROM report_kumulatif WHERE report_date = ?', [requestedDate]);
        }

        const merged = mergeRecords(harianRows, kumulatifRows, requestedDate);

        // Fetch yesterday's data to send to frontend for calculation
        const [prevDates] = await db.query(`
            SELECT report_date FROM (
                SELECT report_date FROM report_harian WHERE report_date < ?
                UNION
                SELECT report_date FROM report_kumulatif WHERE report_date < ?
            ) AS prev_dates ORDER BY report_date DESC LIMIT 1
        `, [requestedDate, requestedDate]);

        let yesterdayMerged = [];
        if (prevDates.length > 0) {
            const yDate = prevDates[0].report_date;
            const [yHarian] = await db.query('SELECT * FROM report_harian WHERE report_date = ?', [yDate]);
            const [yKum] = await db.query('SELECT * FROM report_kumulatif WHERE report_date = ?', [yDate]);
            yesterdayMerged = mergeRecords(yHarian, yKum, yDate);
        }

        res.json({
            current: merged,
            yesterday: yesterdayMerged
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST update data (Bulk/Single)
app.post('/api/reports', async (req, res) => {
    const payload = req.body;
    const reportDate = payload.date || new Date().toLocaleDateString('en-CA');
    const dataArray = payload.data || payload;

    if (!Array.isArray(dataArray)) {
        return res.status(400).json({ error: 'Data must be an array' });
    }

    try {
        for (const item of dataArray) {
            const {
                brand_name,
                harian_n_qty, harian_n_harga, harian_ob_qty, harian_ob_harga,
                kumulatif_n_qty, kumulatif_n_harga, kumulatif_ob_qty, kumulatif_ob_harga
            } = item;

            // Update Harian
            if (harian_n_qty !== undefined || harian_n_harga !== undefined || harian_ob_qty !== undefined || harian_ob_harga !== undefined) {
                await db.query(`
                    INSERT INTO report_harian (brand_name, report_date, n_qty, n_harga, ob_qty, ob_harga)
                    VALUES (?, ?, ?, ?, ?, ?)
                    ON DUPLICATE KEY UPDATE
                      n_qty = VALUES(n_qty), n_harga = VALUES(n_harga),
                      ob_qty = VALUES(ob_qty), ob_harga = VALUES(ob_harga)
                `, [brand_name, reportDate, harian_n_qty || 0, harian_n_harga || 0, harian_ob_qty || 0, harian_ob_harga || 0]);
            }

            // Update Kumulatif
            if (kumulatif_n_qty !== undefined || kumulatif_n_harga !== undefined || kumulatif_ob_qty !== undefined || kumulatif_ob_harga !== undefined) {
                await db.query(`
                    INSERT INTO report_kumulatif (brand_name, report_date, n_qty, n_harga, ob_qty, ob_harga)
                    VALUES (?, ?, ?, ?, ?, ?)
                    ON DUPLICATE KEY UPDATE
                      n_qty = VALUES(n_qty), n_harga = VALUES(n_harga),
                      ob_qty = VALUES(ob_qty), ob_harga = VALUES(ob_harga)
                `, [brand_name, reportDate, kumulatif_n_qty || 0, kumulatif_n_harga || 0, kumulatif_ob_qty || 0, kumulatif_ob_harga || 0]);
            }
        }

        res.json({ message: 'Data updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE report data for a specific date
app.delete('/api/reports', async (req, res) => {
    const reportDate = req.query.date;
    if (!reportDate) return res.status(400).json({ error: 'Date parameter is required' });

    try {
        await db.query('DELETE FROM report_harian WHERE report_date = ?', [reportDate]);
        await db.query('DELETE FROM report_kumulatif WHERE report_date = ?', [reportDate]);
        res.json({ message: `Data for ${reportDate} deleted successfully` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST reset data
app.post('/api/reset', async (req, res) => {
    try {
        await db.query('TRUNCATE TABLE report_harian');
        await db.query('TRUNCATE TABLE report_kumulatif');
        res.json({ message: 'Database reset successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
