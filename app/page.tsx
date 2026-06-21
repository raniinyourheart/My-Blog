'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  PenLine, 
  Calendar, 
  ArrowRight, 
  User, 
  Clock, 
  BookOpen,
  Sparkles,
  ChevronRight,
  Tag,
  Heart,
  MessageCircle,
  Quote,
  Globe,
  Coffee,
  Star,
  Zap,
  Feather,
  Award,
  TrendingUp,
  Briefcase,
  Search,
  X
} from 'lucide-react';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredPost, setHoveredPost] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const categories = [
    'Semua',
    'Ekonomi',
    'Teknologi',
    'Wisata',
    'Bisnis',
    'Kuliner',
    'Fashion',
    'Pendidikan',
    'Cinta'
  ];

  useEffect(() => {
    fetch('http://localhost:5000/api/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setLoading(false);
      });
  }, []);

  // Filter posts based on search and category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-200 border-t-blue-400 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <PenLine className="w-6 h-6 text-blue-400 animate-pulse" />
            </div>
          </div>
          <p className="mt-6 text-blue-400 font-medium text-lg">Memuat konten...</p>
          <div className="mt-3 flex justify-center space-x-1.5">
            <span className="w-2.5 h-2.5 bg-blue-200 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
            <span className="w-2.5 h-2.5 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span>
            <span className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
            <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.45s' }}></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ===== NAVBAR ===== */}
      <nav className="bg-white/90 backdrop-blur-md shadow-sm border-b border-blue-100/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-300/30 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-blue-500 p-2.5 rounded-xl transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 shadow-lg shadow-blue-500/20">
                  <PenLine className="w-6 h-6 text-white" />
                </div>
              </div>
              <span className="text-2xl font-bold text-blue-600">
                MyBlog
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-10">
              <Link href="/" className="text-gray-600 hover:text-blue-500 font-medium transition-all duration-300 relative group">
                Beranda
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="#articles" className="text-gray-600 hover:text-blue-500 font-medium transition-all duration-300 relative group">
                Artikel
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="#about" className="text-gray-600 hover:text-blue-500 font-medium transition-all duration-300 relative group">
                Tentang
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>

            <button className="md:hidden p-2.5 rounded-xl hover:bg-blue-50 transition-all duration-300">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden bg-white border-b border-blue-100/50">
        {/* Animated Background Circles - Soft Blue */}
        <div className="absolute inset-0">
          <div className="absolute top-5 left-5 w-72 h-72 bg-blue-100/30 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
          <div className="absolute top-10 right-10 w-96 h-96 bg-blue-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-float-delay"></div>
          <div className="absolute bottom-5 left-1/4 w-80 h-80 bg-blue-100/25 rounded-full mix-blend-multiply filter blur-3xl animate-float-delay-2"></div>
          <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-blue-50/40 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-50/20 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full text-blue-500 text-sm font-medium mb-10 shadow-sm border border-blue-100/50 animate-fade-in-up">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>✨ Platform Berbagi Pengetahuan & Inspirasi</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <span className="text-blue-600">
                Berbagi Cerita
              </span>
              <br />
              <span className="text-gray-700">&</span>
              <span className="text-blue-500">
                {" "}Inspirasi
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Menyajikan artikel-artikel berkualitas tentang pengalaman hidup, 
              pengembangan diri, dan wawasan menarik untuk perjalanan Anda.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-5 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Link 
                href="#articles" 
                className="group inline-flex items-center space-x-3 bg-blue-500 text-white px-10 py-4 rounded-full font-semibold hover:bg-blue-600 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105 shadow-lg shadow-blue-500/20"
              >
                <BookOpen className="w-5 h-5" />
                <span>Jelajahi Artikel</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
              <Link 
                href="#about" 
                className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-sm text-gray-700 px-10 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50"
              >
                <Coffee className="w-5 h-5" />
                <span>Kenali Saya</span>
              </Link>
            </div>

            <div className="mt-16 flex flex-wrap justify-center gap-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-5 py-3 rounded-full border border-blue-100/50 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <div className="bg-blue-50 p-1.5 rounded-full">
                  <Clock className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <span className="font-bold text-gray-700">{posts.length}</span>
                  <span className="text-gray-400 text-sm ml-1">Artikel</span>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-5 py-3 rounded-full border border-blue-100/50 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <div className="bg-blue-50 p-1.5 rounded-full">
                  <Award className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <span className="font-bold text-gray-700">1</span>
                  <span className="text-gray-400 text-sm ml-1">Penulis</span>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-5 py-3 rounded-full border border-blue-100/50 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <div className="bg-blue-50 p-1.5 rounded-full">
                  <Heart className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <span className="font-bold text-gray-700">❤️</span>
                  <span className="text-gray-400 text-sm ml-1">Dari Hati</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ARTICLES SECTION ===== */}
      <section id="articles" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 gap-6">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center space-x-2 bg-blue-50 px-5 py-2 rounded-full text-blue-500 text-sm font-medium mb-4 border border-blue-100/50">
              <Zap className="w-4 h-4" />
              <span>Konten Terbaru</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
              📚 Koleksi Artikel
            </h2>
            <p className="text-gray-400 mt-3 text-lg">Temukan cerita dan pengetahuan dari berbagai sudut pandang</p>
          </div>
          <div className="flex items-center space-x-3 bg-white px-6 py-3 rounded-full shadow-sm border border-blue-100/50 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-blue-50 p-1.5 rounded-full">
              <TrendingUp className="w-4 h-4 text-blue-400" />
            </div>
            <span className="text-sm text-gray-500 font-medium">{filteredPosts.length} Artikel Tersedia</span>
          </div>
        </div>

        {/* Search & Category Section */}
        <div className="mb-12 space-y-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-blue-400" />
            </div>
            <input
              type="text"
              placeholder="Cari artikel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-3.5 bg-white border border-blue-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-300 shadow-sm text-gray-700 placeholder:text-gray-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Category Tags */}
          <div className="flex flex-wrap justify-center gap-2.5">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white shadow-md shadow-blue-500/20'
                    : 'bg-white text-gray-500 border border-blue-100 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-500'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="relative overflow-hidden bg-white rounded-3xl shadow-sm p-20 text-center border border-blue-100/50">
            <div className="absolute inset-0 bg-blue-50/20"></div>
            <div className="relative">
              <div className="w-28 h-28 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <PenLine className="w-14 h-14 text-blue-400" />
              </div>
              <h3 className="text-3xl font-bold text-gray-700 mb-4">Tidak Ada Artikel</h3>
              <p className="text-gray-400 text-lg">Belum ada artikel yang sesuai dengan pencarian Anda.</p>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post: any, index: number) => (
              <article 
                key={post.id} 
                className="group relative bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-blue-100/50 hover:border-blue-300 flex flex-col"
                style={{
                  animationDelay: `${index * 150}ms`
                }}
                onMouseEnter={() => setHoveredPost(post.id)}
                onMouseLeave={() => setHoveredPost(null)}
              >
                <div className="absolute inset-0 bg-blue-50/0 group-hover:bg-blue-50/20 transition-all duration-700"></div>
                
                <Link href={`/blog/${post.slug}`} className="flex flex-col h-full relative z-10">
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-xs font-semibold text-white bg-blue-500 px-4 py-2 rounded-full shadow-sm">
                        <Tag className="w-3 h-3 inline mr-1.5" />
                        {post.category || 'Artikel'}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center space-x-1.5 bg-blue-50/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-blue-100/50">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {new Date(post.created_at).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </span>
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-500 transition-all duration-300 mb-3 line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-400 text-sm mb-6 flex-grow line-clamp-3 leading-relaxed">
                      {post.excerpt || 'Baca selengkapnya untuk mengetahui cerita lengkapnya...'}
                    </p>

                    <div className="flex items-center justify-between pt-5 border-t border-blue-100/50 mt-auto">
                      <div className="flex items-center space-x-3">
                        <div className="w-11 h-11 bg-blue-500 rounded-full flex items-center justify-center shadow-sm shadow-blue-500/20">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-gray-700">Rani</span>
                          <div className="flex items-center space-x-1.5 text-xs text-gray-400">
                            <Briefcase className="w-3 h-3" />
                            <span>Penulis</span>
                          </div>
                        </div>
                      </div>
                      <span className="text-blue-500 group-hover:translate-x-2 transition-all duration-300 flex items-center space-x-1.5 font-semibold">
                        <span className="text-sm">Baca</span>
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>

                {/* Card glow effect */}
                <div className={`absolute -inset-1 bg-blue-300/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10`}></div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* ===== ABOUT / TENTANG SECTION ===== */}
      <section id="about" className="relative overflow-hidden bg-white border-y border-blue-100/50 py-24">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-100/20 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-200/15 rounded-full mix-blend-multiply filter blur-3xl animate-float-delay"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-50/20 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-blue-50 px-5 py-2 rounded-full text-blue-500 text-sm font-medium mb-5 border border-blue-100/50 animate-fade-in-up">
              <Heart className="w-4 h-4" />
              <span>Tentang Blog Ini</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Cerita dari Hati
            </h2>
            <div className="w-28 h-1.5 bg-blue-400 mx-auto mt-5 rounded-full animate-fade-in-up" style={{ animationDelay: '0.2s' }}></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="group bg-white/90 backdrop-blur-sm rounded-2xl p-9 border border-blue-100/50 shadow-sm hover:shadow-xl transition-all duration-400 hover:-translate-y-2 hover:border-blue-200">
                <div className="flex items-start space-x-5">
                  <div className="bg-blue-500 p-4 rounded-2xl flex-shrink-0 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-400">
                    <Quote className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-500 transition-colors duration-300">Ruang untuk Cerita</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Blog ini adalah ruang personal untuk menyimpan cerita, pemikiran, dan refleksi 
                      tentang kehidupan, kehilangan, harapan, serta berbagai hal yang sering kali 
                      sulit diungkapkan secara langsung.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group bg-white/90 backdrop-blur-sm rounded-2xl p-9 border border-blue-100/50 shadow-sm hover:shadow-xl transition-all duration-400 hover:-translate-y-2 hover:border-blue-200">
                <div className="flex items-start space-x-5">
                  <div className="bg-blue-500 p-4 rounded-2xl flex-shrink-0 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-400">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-500 transition-colors duration-300">Dari Hati ke Kata</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Melalui tulisan, setiap pengalaman diubah menjadi rangkaian kata yang dapat 
                      dibaca, dipahami, dan mungkin dirasakan oleh orang lain. 
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="group bg-white/90 backdrop-blur-sm rounded-2xl p-9 border border-blue-100/50 shadow-sm hover:shadow-xl transition-all duration-400 hover:-translate-y-2 hover:border-blue-200">
                <div className="flex items-start space-x-5">
                  <div className="bg-blue-500 p-4 rounded-2xl flex-shrink-0 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-400">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-500 transition-colors duration-300">Teman Berbagi</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Semoga setiap artikel yang ditulis di sini dapat menjadi teman bagi siapa pun 
                      yang sedang mencari makna, jawaban, atau sekadar ingin merasa tidak sendirian.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group bg-white/90 backdrop-blur-sm rounded-2xl p-9 border border-blue-100/50 shadow-sm hover:shadow-xl transition-all duration-400 hover:-translate-y-2 hover:border-blue-200">
                <div className="flex items-start space-x-5">
                  <div className="bg-blue-500 p-4 rounded-2xl flex-shrink-0 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-400">
                    <PenLine className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-500 transition-colors duration-300">Terus Menulis</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Sebagian tulisan lahir dari pengamatan, sebagian dari imajinasi, dan sebagian 
                      lagi dari perasaan yang pernah singgah dalam perjalanan hidup.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-white border-t border-blue-100/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-500 p-2.5 rounded-xl shadow-lg shadow-blue-500/20">
                <PenLine className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-blue-600">
                MyBlog
              </span>
              <span className="text-gray-300 text-sm">© 2026</span>
            </div>
            <div className="flex items-center space-x-10 text-sm text-gray-400">
              <span className="flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <span>Build by Rani</span>
              </span>
              <div className="flex space-x-5">
                <Link href="#" className="text-gray-400 hover:text-blue-500 transition-all duration-300 hover:-translate-y-0.5">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-blue-500 transition-all duration-300 hover:-translate-y-0.5">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.387.6.113.82-.26.82-.58 0-.287-.01-1.05-.015-2.06-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.085 1.838 1.237 1.838 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.123-.3-.535-1.52.117-3.16 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.64.24 2.86.118 3.16.768.84 1.233 1.91 1.233 3.22 0 4.61-2.804 5.62-5.476 5.92.43.37.824 1.102.824 2.22 0 1.602-.015 2.894-.015 3.287 0 .322.216.698.825.58C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-blue-500 transition-all duration-300 hover:-translate-y-0.5">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* ===== CUSTOM CSS ===== */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          25% {
            transform: translate(30px, -40px) scale(1.08);
          }
          50% {
            transform: translate(-20px, 30px) scale(0.92);
          }
          75% {
            transform: translate(15px, -20px) scale(1.05);
          }
        }
        
        .animate-float {
          animation: float 10s ease-in-out infinite;
        }
        
        .animate-float-delay {
          animation: float 12s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        .animate-float-delay-2 {
          animation: float 14s ease-in-out infinite;
          animation-delay: 4s;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
        
        @keyframes fadeInUpSlow {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        article {
          animation: fadeInUpSlow 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}