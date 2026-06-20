const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Koneksi ke database MySQL
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', // Kosongin kalo pake XAMPP default
    database: 'my_blog'
}).promise();

// ===== API ROUTES =====

// 1. GET semua artikel (buat landing page)
app.get('/api/posts', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM posts ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. GET 1 artikel berdasarkan slug (buat halaman baca)
app.get('/api/posts/:slug', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM posts WHERE slug = ?', [req.params.slug]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Artikel tidak ditemukan' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. POST buat artikel baru (dari dashboard)
app.post('/api/posts', async (req, res) => {
    try {
        const { title, slug, content, excerpt, image } = req.body;
        
        const [result] = await db.query(
            'INSERT INTO posts (title, slug, content, excerpt, image) VALUES (?, ?, ?, ?, ?)',
            [title, slug, content, excerpt, image]
        );
        
        res.status(201).json({
            id: result.insertId,
            title,
            slug,
            content,
            excerpt,
            image
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. PUT update artikel (dari dashboard)
app.put('/api/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, slug, content, excerpt, image } = req.body;
        
        await db.query(
            'UPDATE posts SET title = ?, slug = ?, content = ?, excerpt = ?, image = ? WHERE id = ?',
            [title, slug, content, excerpt, image, id]
        );
        
        res.json({ message: 'Artikel berhasil diupdate' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 5. DELETE artikel (dari dashboard)
app.delete('/api/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM posts WHERE id = ?', [id]);
        res.json({ message: 'Artikel berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`🚀 Backend berjalan di http://localhost:${PORT}`);
    console.log(`📡 API tersedia di http://localhost:${PORT}/api/posts`);
});