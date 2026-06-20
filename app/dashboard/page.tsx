'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  PenLine,
  FileText,
  Trash2,
  Edit,
  Plus,
  X,
  LogOut,
  User,
  Calendar,
  Eye,
  ChevronLeft,
  ChevronRight,
  Home,
  Bell,
  Search,
  CheckCircle,
  Clock,
  TrendingUp,
  Users,
  Eye as EyeIcon
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentTime, setCurrentTime] = useState(new Date());
  const router = useRouter();

  const [form, setForm] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    image: ''
  });

  // ===== JAM DIGITAL =====
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Jakarta'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'Asia/Jakarta'
    });
  };

  // ===== FETCH POSTS =====
  const fetchPosts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/posts');
      const data = await res.json();
      setPosts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // ===== CRUD HANDLERS =====
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingId 
      ? `http://localhost:5000/api/posts/${editingId}`
      : 'http://localhost:5000/api/posts';
    const method = editingId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        alert(editingId ? '✅ Artikel berhasil diupdate!' : '✅ Artikel berhasil dibuat!');
        setForm({ title: '', slug: '', content: '', excerpt: '', image: '' });
        setShowForm(false);
        setEditingId(null);
        setActiveTab('dashboard');
        fetchPosts();
      } else {
        alert('❌ Gagal menyimpan artikel');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Terjadi kesalahan');
    }
  };

  const handleEdit = (post: any) => {
    setForm({
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt || '',
      image: post.image || ''
    });
    setEditingId(post.id);
    setShowForm(true);
    setActiveTab('new');
  };

  const handleDelete = async (id: number) => {
    if (!confirm('⚠️ Yakin mau hapus artikel ini?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        alert('🗑️ Artikel berhasil dihapus!');
        fetchPosts();
      }
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Gagal menghapus artikel');
    }
  };

  const handleLogout = () => {
    if (confirm('Yakin mau logout?')) {
      router.push('/');
    }
  };

  // ===== BUKA FORM =====
  const openCreateForm = () => {
    setShowForm(true);
    setEditingId(null);
    setForm({ title: '', slug: '', content: '', excerpt: '', image: '' });
    setActiveTab('new');
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm({ title: '', slug: '', content: '', excerpt: '', image: '' });
    setActiveTab('dashboard');
  };

  // ===== DATA STATISTIK =====
  const totalPosts = posts.length;
  const publishedPosts = posts.length;

  // ===== DATA GRAFIK =====
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
    datasets: [
      {
        label: 'Total Artikel',
        data: [0, 1, 2, 3, 5, 8, 10, 12, 15, 18, 20, totalPosts],
        borderColor: '#1a3d6b',
        backgroundColor: 'rgba(26, 61, 107, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Pengunjung',
        data: [10, 25, 40, 55, 70, 90, 110, 130, 160, 200, 250, 320],
        borderColor: '#2a5a9c',
        backgroundColor: 'rgba(42, 90, 156, 0.05)',
        tension: 0.4,
        fill: true,
        borderDash: [5, 5],
      }
    ]
  };

  const barChartData = {
    labels: ['Kehidupan', 'Puisi', 'Cerpen', 'Opini', 'Lainnya'],
    datasets: [
      {
        label: 'Jumlah Artikel per Kategori',
        data: [
          posts.filter(p => p.title?.toLowerCase().includes('hidup') || p.title?.toLowerCase().includes('hati')).length || 3,
          posts.filter(p => p.title?.toLowerCase().includes('puisi') || p.title?.toLowerCase().includes('rindu')).length || 2,
          posts.filter(p => p.title?.toLowerCase().includes('cerita') || p.title?.toLowerCase().includes('kisah')).length || 4,
          posts.filter(p => p.title?.toLowerCase().includes('pendapat') || p.title?.toLowerCase().includes('opini')).length || 1,
          posts.filter(p => !p.title?.toLowerCase().includes('hidup') && !p.title?.toLowerCase().includes('hati') && !p.title?.toLowerCase().includes('puisi') && !p.title?.toLowerCase().includes('rindu') && !p.title?.toLowerCase().includes('cerita') && !p.title?.toLowerCase().includes('kisah') && !p.title?.toLowerCase().includes('pendapat')).length || 2
        ],
        backgroundColor: ['#1a3d6b', '#2a5a9c', '#4b77b7', '#6f92c7', '#93add6'],
        borderRadius: 8,
      }
    ]
  };

  const doughnutData = {
    labels: ['Published', 'Draft', 'Archived'],
    datasets: [
      {
        data: [publishedPosts, 0, 0],
        backgroundColor: ['#22c55e', '#eab308', '#ef4444'],
        borderWidth: 0,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 11
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0,0,0,0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-navy-700 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* ===== SIDEBAR ===== */}
      <aside 
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-white border-r border-gray-200 shadow-sm transition-all duration-300 flex flex-col fixed h-full z-40`}
      >
        <div className={`p-5 border-b border-gray-200 flex items-center ${sidebarOpen ? 'justify-between' : 'justify-center'}`}>
          {sidebarOpen ? (
            <>
              <div className="flex items-center space-x-3">
                <div className="bg-navy-700 p-2 rounded-lg">
                  <PenLine className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-navy-700">MyBlog</span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </>
          ) : (
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {/* DASHBOARD */}
          <button
            onClick={() => {
              setActiveTab('dashboard');
              setShowForm(false);
              setEditingId(null);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition ${
              activeTab === 'dashboard' && !showForm
                ? 'bg-navy-700 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <LayoutDashboard className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="font-medium">Dashboard</span>}
          </button>

          {/* BUAT ARTIKEL */}
          <button
            onClick={openCreateForm}
            className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition ${
              showForm && activeTab === 'new'
                ? 'bg-navy-700 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Plus className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="font-medium">Buat Artikel</span>}
          </button>

          {/* LIHAT BLOG */}
          <Link
            href="/"
            className="flex items-center space-x-3 px-4 py-2.5 rounded-lg transition text-gray-600 hover:bg-gray-100"
          >
            <Home className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="font-medium">Lihat Blog</span>}
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition text-red-500 hover:bg-red-50"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* ===== NAVBAR ===== */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-800">
                {showForm && activeTab === 'new' ? '✏️ Buat Artikel' : '📊 Dashboard'}
              </h1>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {showForm && activeTab === 'new' ? 'Form Editor' : 'Admin Panel'}
              </span>
            </div>

            <div className="flex items-center space-x-6">
              {/* JAM DIGITAL */}
              <div className="hidden md:block text-right">
                <div className="text-2xl font-mono font-bold text-navy-700 tracking-wider">
                  {formatTime(currentTime)}
                </div>
                <div className="text-xs text-gray-400">
                  {formatDate(currentTime)}
                </div>
              </div>

              <button className="text-gray-400 hover:text-gray-600 transition relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>

              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 bg-navy-700 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-semibold text-gray-700">Admin</p>
                  <p className="text-xs text-gray-400">Super Admin</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ===== KONTEN UTAMA ===== */}
        {showForm && activeTab === 'new' ? (
          /* ===== FORM BUAT ARTIKEL ===== */
          <div className="p-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">
                  {editingId ? '✏️ Edit Artikel' : '📝 Buat Artikel Baru'}
                </h3>
                <button
                  onClick={closeForm}
                  className="text-gray-400 hover:text-red-500 transition flex items-center space-x-1"
                >
                  <X className="w-5 h-5" />
                  <span className="text-sm">Tutup</span>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Judul Artikel *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-navy-700 focus:border-transparent transition"
                      placeholder="Masukkan judul artikel"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Slug (URL) *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.slug}
                      onChange={(e) => setForm({ ...form, slug: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-navy-700 focus:border-transparent transition"
                      placeholder="contoh: judul-artikel-ku"
                    />
                    <p className="text-xs text-gray-400 mt-1">Gunakan huruf kecil dan tanda (-) untuk spasi</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Ringkasan (Excerpt)
                  </label>
                  <input
                    type="text"
                    value={form.excerpt}
                    onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-navy-700 focus:border-transparent transition"
                    placeholder="Ringkasan singkat artikel"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    URL Gambar (Opsional)
                  </label>
                  <input
                    type="text"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-navy-700 focus:border-transparent transition"
                    placeholder="https://example.com/gambar.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Konten Artikel *
                  </label>
                  <textarea
                    required
                    rows={12}
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-navy-700 focus:border-transparent transition"
                    placeholder="Isi artikel di sini dengan Markdown atau HTML..."
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Bisa pakai Markdown: # Heading, **tebal**, *miring*, atau HTML langsung.
                  </p>
                </div>

                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="bg-navy-700 text-white px-8 py-2.5 rounded-lg font-semibold hover:bg-navy-800 transition"
                  >
                    {editingId ? 'Update Artikel' : 'Publish Artikel'}
                  </button>
                  <button
                    type="button"
                    onClick={closeForm}
                    className="bg-gray-100 text-gray-700 px-8 py-2.5 rounded-lg font-semibold hover:bg-gray-200 transition"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          /* ===== DASHBOARD ===== */
          <>
            {/* STATISTIK */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 p-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Artikel</p>
                    <p className="text-3xl font-bold text-gray-800">{totalPosts}</p>
                  </div>
                  <div className="w-11 h-11 bg-gray-100 rounded-full flex items-center justify-center">
                    <FileText className="w-5 h-5 text-gray-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Published</p>
                    <p className="text-3xl font-bold text-green-600">{publishedPosts}</p>
                  </div>
                  <div className="w-11 h-11 bg-green-50 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Views</p>
                    <p className="text-3xl font-bold text-blue-600">1.2K</p>
                  </div>
                  <div className="w-11 h-11 bg-blue-50 rounded-full flex items-center justify-center">
                    <EyeIcon className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Pengunjung</p>
                    <p className="text-3xl font-bold text-purple-600">342</p>
                  </div>
                  <div className="w-11 h-11 bg-purple-50 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Hari Ini</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                    </p>
                  </div>
                  <div className="w-11 h-11 bg-yellow-50 rounded-full flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-yellow-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* GRAFIK */}
            <div className="px-6 pb-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">📈 Tren Artikel</h3>
                      <p className="text-sm text-gray-400">Perkembangan jumlah artikel per bulan</p>
                    </div>
                    <div className="bg-gray-100 p-2 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-gray-600" />
                    </div>
                  </div>
                  <div className="h-64">
                    <Line data={lineChartData} options={chartOptions} />
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">📊 Status Artikel</h3>
                      <p className="text-sm text-gray-400">Distribusi status artikel</p>
                    </div>
                    <div className="bg-gray-100 p-2 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-gray-600" />
                    </div>
                  </div>
                  <div className="h-64 flex items-center justify-center">
                    <Doughnut data={doughnutData} options={chartOptions} />
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">📊 Kategori Artikel</h3>
                    <p className="text-sm text-gray-400">Distribusi artikel per kategori</p>
                  </div>
                  <div className="bg-gray-100 p-2 rounded-lg">
                    <FileText className="w-5 h-5 text-gray-600" />
                  </div>
                </div>
                <div className="h-64">
                  <Bar data={barChartData} options={chartOptions} />
                </div>
              </div>
            </div>

            {/* DAFTAR ARTIKEL */}
            <div className="px-6 pb-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">📚 Daftar Artikel</h3>
                    <p className="text-sm text-gray-400">Kelola semua artikel di blog-mu</p>
                  </div>
                  <button
                    onClick={openCreateForm}
                    className="bg-navy-700 text-white px-4 py-2 rounded-lg hover:bg-navy-800 transition flex items-center space-x-2 text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Buat Baru</span>
                  </button>
                </div>

                {posts.length === 0 ? (
                  <div className="p-12 text-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-10 h-10 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-lg">Belum ada artikel</p>
                    <p className="text-gray-400 text-sm">Mulai tulis artikel pertamamu sekarang!</p>
                    <button
                      onClick={openCreateForm}
                      className="mt-4 bg-navy-700 text-white px-6 py-2 rounded-lg hover:bg-navy-800 transition"
                    >
                      ✏️ Buat Artikel
                    </button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Judul</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Tanggal</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Status</th>
                          <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {posts.map((post: any) => (
                          <tr key={post.id} className="hover:bg-gray-50 transition">
                            <td className="px-6 py-4">
                              <div>
                                <p className="font-semibold text-gray-800">{post.title}</p>
                                <p className="text-sm text-gray-400 truncate max-w-xs hidden sm:block">
                                  {post.excerpt || 'Tidak ada ringkasan'}
                                </p>
                              </div>
                            </td>
                            <td className="px-6 py-4 hidden md:table-cell">
                              <div className="flex items-center space-x-2 text-sm text-gray-500">
                                <Calendar className="w-4 h-4" />
                                <span>
                                  {new Date(post.created_at).toLocaleDateString('id-ID', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric'
                                  })}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 hidden lg:table-cell">
                              <span className="inline-flex items-center space-x-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                                <CheckCircle className="w-3 h-3" />
                                <span>Published</span>
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex justify-end space-x-1">
                                <Link
                                  href={`/blog/${post.slug}`}
                                  target="_blank"
                                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                  title="Lihat"
                                >
                                  <Eye className="w-4 h-4" />
                                </Link>
                                <button
                                  onClick={() => handleEdit(post)}
                                  className="p-2 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition"
                                  title="Edit"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDelete(post.id)}
                                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                                  title="Hapus"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* ===== CUSTOM CSS ===== */}
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

        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </div>
  );
}