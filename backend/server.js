const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Koneksi database
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'my_blog',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}).promise();

const JWT_SECRET = 'rahasia_kamu_12345';

// ===== AUTH ROUTES =====

// REGISTER (buat daftar akun baru)
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, password, full_name, email } = req.body;
    
    // Cek username sudah ada
    const [existing] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (existing.length > 0) {
      return res.status(400).json({ error: 'Username sudah digunakan' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const [result] = await db.query(
      'INSERT INTO users (username, password, full_name, email) VALUES (?, ?, ?, ?)',
      [username, hashedPassword, full_name || username, email || '']
    );
    
    res.status(201).json({ 
      message: 'Registrasi berhasil! Silakan login.',
      id: result.insertId 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// LOGIN
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Cari user
    const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (users.length === 0) {
      return res.status(401).json({ error: 'Username atau password salah' });
    }
    
    const user = users[0];
    
    // Verifikasi password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Username atau password salah' });
    }
    
    // Buat JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        full_name: user.full_name,
        email: user.email,
        avatar: user.avatar
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET PROFILE (pake token)
app.get('/api/auth/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Token tidak ditemukan' });
    }
    
    const decoded = jwt.verify(token, JWT_SECRET);
    const [users] = await db.query('SELECT id, username, full_name, email, avatar, created_at FROM users WHERE id = ?', [decoded.id]);
    
    if (users.length === 0) {
      return res.status(404).json({ error: 'User tidak ditemukan' });
    }
    
    res.json(users[0]);
  } catch (error) {
    res.status(401).json({ error: 'Token tidak valid' });
  }
});

// UPDATE PROFILE
app.put('/api/auth/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Token tidak ditemukan' });
    }
    
    const decoded = jwt.verify(token, JWT_SECRET);
    const { full_name, email, avatar, currentPassword, newPassword } = req.body;
    
    let query = 'UPDATE users SET full_name = ?, email = ?, avatar = ?';
    const params = [full_name, email, avatar];
    
    // Jika ada perubahan password
    if (newPassword && currentPassword) {
      const [users] = await db.query('SELECT password FROM users WHERE id = ?', [decoded.id]);
      const validPassword = await bcrypt.compare(currentPassword, users[0].password);
      
      if (!validPassword) {
        return res.status(401).json({ error: 'Password saat ini salah' });
      }
      
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      query += ', password = ?';
      params.push(hashedPassword);
    }
    
    query += ' WHERE id = ?';
    params.push(decoded.id);
    
    await db.query(query, params);
    
    res.json({ message: 'Profile berhasil diupdate!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ... API Posts yang udah ada tetap di sini ...

// ===== API POSTS (YANG UDAH ADA) =====
app.get('/api/posts', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM posts ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

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

app.post('/api/posts', async (req, res) => {
    try {
        const { title, slug, content, excerpt, image } = req.body;
        const [result] = await db.query(
            'INSERT INTO posts (title, slug, content, excerpt, image) VALUES (?, ?, ?, ?, ?)',
            [title, slug, content, excerpt, image]
        );
        res.status(201).json({ id: result.insertId, title, slug, content, excerpt, image });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/posts/:id', async (req, res) => {
    try {
        const { title, slug, content, excerpt, image } = req.body;
        await db.query(
            'UPDATE posts SET title = ?, slug = ?, content = ?, excerpt = ?, image = ? WHERE id = ?',
            [title, slug, content, excerpt, image, req.params.id]
        );
        res.json({ message: 'Artikel berhasil diupdate' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/posts/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM posts WHERE id = ?', [req.params.id]);
        res.json({ message: 'Artikel berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Backend berjalan di http://localhost:${PORT}`);
    console.log(`📡 API tersedia di http://localhost:${PORT}/api/posts`);
});