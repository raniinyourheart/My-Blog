'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PenLine, User, Lock, Mail, Eye, EyeOff, UserPlus } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    full_name: '',
    email: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validasi password
    if (form.password !== form.confirmPassword) {
      setError('Password dan konfirmasi password tidak sama');
      setLoading(false);
      return;
    }

    if (form.password.length < 6) {
      setError('Password minimal 6 karakter');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
          full_name: form.full_name || form.username,
          email: form.email || ''
        })
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess('✅ Registrasi berhasil! Silakan login.');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setError(data.error || 'Registrasi gagal!');
      }
    } catch (err) {
      setError('Terjadi kesalahan. Coba lagi!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full border border-gray-200">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <div className="bg-navy-700 p-2.5 rounded-xl">
              <PenLine className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Daftar Akun</h1>
          <p className="text-sm text-gray-500 mt-1">Buat akun untuk akses dashboard</p>
        </div>

        {/* Form Register */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm">
              {success}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Username *
            </label>
            <div className="relative">
              <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-navy-700 focus:border-transparent transition"
                placeholder="Masukkan username"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Nama Lengkap
            </label>
            <input
              type="text"
              value={form.full_name}
              onChange={(e) => setForm({ ...form, full_name: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-navy-700 focus:border-transparent transition"
              placeholder="Masukkan nama lengkap"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Email
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-navy-700 focus:border-transparent transition"
                placeholder="Masukkan email (opsional)"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Password *
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-12 py-2.5 focus:outline-none focus:ring-2 focus:ring-navy-700 focus:border-transparent transition"
                placeholder="Minimal 6 karakter"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Konfirmasi Password *
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-navy-700 focus:border-transparent transition"
                placeholder="Ulangi password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-navy-700 text-white py-2.5 rounded-lg font-semibold hover:bg-navy-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <UserPlus className="w-5 h-5" />
            <span>{loading ? 'Memproses...' : 'Daftar'}</span>
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <span>Sudah punya akun? </span>
          <Link href="/login" className="text-navy-700 hover:underline font-medium">
            Login di sini
          </Link>
        </div>
      </div>

      <style jsx>{`
        .text-navy-50 { color: #f0f4ff; }
        .text-navy-100 { color: #dbe4f5; }
        .text-navy-200 { color: #b7c9e6; }
        .text-navy-300 { color: #93add6; }
        .text-navy-400 { color: #6f92c7; }
        .text-navy-500 { color: #4b77b7; }
        .text-navy-600 { color: #2a5a9c; }
        .text-navy-700 { color: #1a3d6b; }
        .text-navy-800 { color: #0e284a; }
        .text-navy-900 { color: #07142a; }
        
        .bg-navy-50 { background-color: #f0f4ff; }
        .bg-navy-100 { background-color: #dbe4f5; }
        .bg-navy-200 { background-color: #b7c9e6; }
        .bg-navy-300 { background-color: #93add6; }
        .bg-navy-400 { background-color: #6f92c7; }
        .bg-navy-500 { background-color: #4b77b7; }
        .bg-navy-600 { background-color: #2a5a9c; }
        .bg-navy-700 { background-color: #1a3d6b; }
        .bg-navy-800 { background-color: #0e284a; }
        .bg-navy-900 { background-color: #07142a; }
      `}</style>
    </div>
  );
}