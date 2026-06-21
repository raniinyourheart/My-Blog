'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PenLine, User, Lock, Mail, Eye, EyeOff, UserPlus, CheckCircle, Sparkles, ChevronRight, Shield } from 'lucide-react';

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
    <div className="min-h-screen bg-[#f8f9fc] flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-100/10 rounded-full blur-3xl"></div>
      
      <div className="relative w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100/50 backdrop-blur-sm">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600/20 rounded-2xl blur-xl"></div>
                <div className="relative bg-blue-700 p-3.5 rounded-2xl shadow-lg">
                  <PenLine className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
              Daftar Akun
            </h1>
            <div className="flex items-center justify-center space-x-2 mt-1">
              <span className="h-1 w-8 bg-blue-700 rounded-full"></span>
              <span className="h-1 w-4 bg-blue-400 rounded-full"></span>
              <span className="h-1 w-2 bg-blue-200 rounded-full"></span>
            </div>
            <p className="text-sm text-gray-500 mt-3 font-medium">
              Buat akun untuk akses dashboard
            </p>
          </div>

          {/* Form Register */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg text-sm flex items-start space-x-3">
                <span className="text-red-500 font-bold text-lg">!</span>
                <span>{error}</span>
              </div>
            )}
            {success && (
              <div className="bg-green-50 border-l-4 border-green-500 text-green-700 px-4 py-3 rounded-lg text-sm flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>{success}</span>
              </div>
            )}

            <div className="space-y-1">
              <label className="block text-sm font-semibold text-gray-700">
                Username <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-gray-400 group-focus-within:text-blue-700 transition-colors duration-200" />
                </div>
                <input
                  type="text"
                  required
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  className="w-full border-2 border-gray-200 rounded-xl pl-10 pr-4 py-3 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-700 transition-all duration-200 placeholder:text-gray-400"
                  placeholder="Masukkan username"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-semibold text-gray-700">
                Nama Lengkap
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-gray-400 group-focus-within:text-blue-700 transition-colors duration-200" />
                </div>
                <input
                  type="text"
                  value={form.full_name}
                  onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                  className="w-full border-2 border-gray-200 rounded-xl pl-10 pr-4 py-3 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-700 transition-all duration-200 placeholder:text-gray-400"
                  placeholder="Masukkan nama lengkap (opsional)"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-semibold text-gray-700">
                Email
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400 group-focus-within:text-blue-700 transition-colors duration-200" />
                </div>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border-2 border-gray-200 rounded-xl pl-10 pr-4 py-3 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-700 transition-all duration-200 placeholder:text-gray-400"
                  placeholder="Masukkan email (opsional)"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-semibold text-gray-700">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400 group-focus-within:text-blue-700 transition-colors duration-200" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full border-2 border-gray-200 rounded-xl pl-10 pr-12 py-3 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-700 transition-all duration-200 placeholder:text-gray-400"
                  placeholder="Minimal 6 karakter"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 rounded-lg hover:bg-gray-100"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-semibold text-gray-700">
                Konfirmasi Password <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400 group-focus-within:text-blue-700 transition-colors duration-200" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  className="w-full border-2 border-gray-200 rounded-xl pl-10 pr-4 py-3 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-700 transition-all duration-200 placeholder:text-gray-400"
                  placeholder="Ulangi password"
                />
              </div>
            </div>

            {/* Password Requirements */}
            <div className="bg-gray-50/50 rounded-xl p-3 border border-gray-200">
              <p className="text-xs text-gray-500 font-medium mb-1">Password harus:</p>
              <div className="grid grid-cols-2 gap-1">
                <span className={`text-xs flex items-center space-x-1 ${form.password.length >= 6 ? 'text-green-600' : 'text-gray-400'}`}>
                  <CheckCircle className={`w-3 h-3 ${form.password.length >= 6 ? 'text-green-500' : 'text-gray-300'}`} />
                  <span>Minimal 6 karakter</span>
                </span>
                <span className={`text-xs flex items-center space-x-1 ${form.password.length > 0 && /[A-Z]/.test(form.password) ? 'text-green-600' : 'text-gray-400'}`}>
                  <CheckCircle className={`w-3 h-3 ${form.password.length > 0 && /[A-Z]/.test(form.password) ? 'text-green-500' : 'text-gray-300'}`} />
                  <span>Huruf besar</span>
                </span>
                <span className={`text-xs flex items-center space-x-1 ${form.password.length > 0 && /[a-z]/.test(form.password) ? 'text-green-600' : 'text-gray-400'}`}>
                  <CheckCircle className={`w-3 h-3 ${form.password.length > 0 && /[a-z]/.test(form.password) ? 'text-green-500' : 'text-gray-300'}`} />
                  <span>Huruf kecil</span>
                </span>
                <span className={`text-xs flex items-center space-x-1 ${form.password.length > 0 && /[0-9]/.test(form.password) ? 'text-green-600' : 'text-gray-400'}`}>
                  <CheckCircle className={`w-3 h-3 ${form.password.length > 0 && /[0-9]/.test(form.password) ? 'text-green-500' : 'text-gray-300'}`} />
                  <span>Angka</span>
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="relative w-full bg-blue-700 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-700/20 hover:shadow-xl hover:shadow-blue-700/30 active:transform active:scale-[0.98] overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center space-x-2">
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Memproses...</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    <span>Daftar</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-400">atau</span>
            </div>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Sudah punya akun?{' '}
              <Link href="/login" className="text-blue-700 hover:text-blue-800 font-semibold transition-colors duration-200 hover:underline inline-flex items-center space-x-1">
                <span>Login di sini</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </p>
          </div>

          {/* Features */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex flex-col space-y-2 text-xs text-gray-400">
              <div className="flex items-center justify-center space-x-4">
                <span className="flex items-center space-x-1">
                  <Shield className="w-3 h-3 text-blue-500" />
                  <span>Data Terenkripsi</span>
                </span>
                <span className="w-px h-3 bg-gray-200"></span>
                <span className="flex items-center space-x-1">
                  <Sparkles className="w-3 h-3 text-blue-500" />
                  <span>Gratis Selamanya</span>
                </span>
                <span className="w-px h-3 bg-gray-200"></span>
                <span className="flex items-center space-x-1">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  <span>Verifikasi Email</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-400">
            © 2026 MyBlog. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}