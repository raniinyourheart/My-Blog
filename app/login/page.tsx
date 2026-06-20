'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PenLine, User, Lock, Eye, EyeOff, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok) {
        // Simpan token & user di localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Redirect ke dashboard
        router.push('/dashboard');
      } else {
        setError(data.error || 'Login gagal!');
      }
    } catch (err) {
      setError('Terjadi kesalahan. Coba lagi!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full border border-gray-200">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <div className="bg-navy-700 p-2.5 rounded-xl">
              <PenLine className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">MyBlog</h1>
          <p className="text-sm text-gray-500 mt-1">Masuk ke dashboard admin</p>
        </div>

        {/* Form Login */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Username
            </label>
            <div className="relative">
              <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-navy-700 focus:border-transparent transition"
                placeholder="Masukkan username"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-12 py-2.5 focus:outline-none focus:ring-2 focus:ring-navy-700 focus:border-transparent transition"
                placeholder="Masukkan password"
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-navy-700 text-white py-2.5 rounded-lg font-semibold hover:bg-navy-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Memproses...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <span>Belum punya akun? </span>
          <Link href="/register" className="text-navy-700 hover:underline font-medium">
            Daftar di sini
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