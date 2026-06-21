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
  Share2,
  Quote,
  Globe,
  Coffee,
  Star,
  Zap
} from 'lucide-react';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredPost, setHoveredPost] = useState(null);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-indigo-600 border-t-transparent mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <PenLine className="w-6 h-6 text-indigo-600 animate-pulse" />
            </div>
          </div>
          <p className="mt-6 text-indigo-700 font-medium text-lg">Memuat artikel...</p>
          <div className="mt-2 flex justify-center space-x-1">
            <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
            <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50/30 to-purple-50/30">
      {/* ===== NAVBAR ===== */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-br from-indigo-600 to-purple-600 p-2 rounded-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <PenLine className="w-6 h-6 text-white" />
                </div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                MyBlog
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-indigo-600 font-medium transition relative group">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 transition-all group-hover:w-full"></span>
              </Link>
              <Link href="#articles" className="text-gray-600 hover:text-indigo-600 font-medium transition relative group">
                Artikel
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 transition-all group-hover:w-full"></span>
              </Link>
              <Link href="#about" className="text-gray-600 hover:text-indigo-600 font-medium transition relative group">
                Tentang
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 transition-all group-hover:w-full"></span>
              </Link>
            </div>

            <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 border-b border-white/20">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-full text-indigo-700 text-sm font-medium mb-8 shadow-lg border border-white/50">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span>✨ Selamat datang di blog saya</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Berbagi Cerita
              </span>
              <br />
              <span className="text-gray-800">&</span>
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                {" "}Inspirasi
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              Temukan artikel-artikel menarik tentang pengalaman, pembelajaran, 
              dan hal-hal seru lainnya dalam perjalanan hidup.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                href="#articles" 
                className="group inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3.5 rounded-full font-medium hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <BookOpen className="w-5 h-5" />
                <span>Mulai Membaca</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </Link>
              <Link 
                href="#about" 
                className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm text-gray-700 px-8 py-3.5 rounded-full font-medium hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-indigo-300"
              >
                <Coffee className="w-5 h-5" />
                <span>Tentang Saya</span>
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
                <Clock className="w-4 h-4 text-indigo-500" />
                <span>{posts.length} Artikel</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
                <User className="w-4 h-4 text-purple-500" />
                <span>1 Penulis</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
                <Heart className="w-4 h-4 text-pink-500" />
                <span>Dari Hati</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ARTICLES SECTION ===== */}
      <section id="articles" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-indigo-100 px-4 py-1.5 rounded-full text-indigo-700 text-sm font-medium mb-3">
              <Zap className="w-4 h-4" />
              <span>Terbaru</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
              📚 Semua Artikel
            </h2>
            <p className="text-gray-500 mt-2 text-lg">Temukan cerita-cerita terbaru dari saya</p>
          </div>
          <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-lg border border-white/50">
            <Clock className="w-4 h-4 text-indigo-500" />
            <span className="text-sm text-gray-700 font-medium">{posts.length} Artikel</span>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-16 text-center border border-white/50">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50"></div>
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <PenLine className="w-12 h-12 text-indigo-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-3">Belum Ada Artikel</h3>
              <p className="text-gray-500 text-lg">Masih kosong nih, tapi nanti akan ada tulisan menarik!</p>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any, index: number) => (
              <article 
                key={post.id} 
                className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/50 hover:border-indigo-300 flex flex-col"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
                onMouseEnter={() => setHoveredPost(post.id)}
                onMouseLeave={() => setHoveredPost(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/0 to-purple-50/0 group-hover:from-indigo-50/50 group-hover:to-purple-50/50 transition-all duration-500"></div>
                
                <Link href={`/blog/${post.slug}`} className="flex flex-col h-full relative z-10">
                  <div className="p-7 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-1.5 rounded-full shadow-md">
                        <Tag className="w-3 h-3 inline mr-1" />
                        Artikel
                      </span>
                      <span className="text-xs text-gray-500 flex items-center space-x-1 bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {new Date(post.created_at).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition duration-300 mb-3 line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-500 text-sm mb-5 flex-grow line-clamp-3 leading-relaxed">
                      {post.excerpt || 'Baca selengkapnya untuk mengetahui cerita lengkapnya...'}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200/50 mt-auto">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-gray-700">Rani</span>
                          <div className="flex items-center space-x-1 text-xs text-gray-400">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span>Penulis</span>
                          </div>
                        </div>
                      </div>
                      <span className="text-indigo-600 group-hover:translate-x-2 transition-all duration-300 flex items-center space-x-1 font-semibold">
                        <span className="text-sm">Baca</span>
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>

                {/* Card glow effect */}
                <div className={`absolute -inset-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`}></div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* ===== ABOUT / TENTANG SECTION ===== */}
      <section id="about" className="relative overflow-hidden bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/30 border-y border-white/20 py-20">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-indigo-100 px-4 py-1.5 rounded-full text-indigo-700 text-sm font-medium mb-4">
              <Heart className="w-4 h-4" />
              <span>Tentang Blog Ini</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
              Cerita dari Hati
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Kolom Kiri */}
            <div className="space-y-6">
              <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start space-x-5">
                  <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-3.5 rounded-2xl flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Quote className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Ruang untuk Cerita</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Blog ini adalah ruang untuk menyimpan cerita, pemikiran, dan refleksi tentang 
                      kehidupan, kehilangan, harapan, serta berbagai hal yang sering kali sulit 
                      diungkapkan secara langsung.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start space-x-5">
                  <div className="bg-gradient-to-br from-pink-600 to-purple-600 p-3.5 rounded-2xl flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Dari Hati ke Kata</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Melalui tulisan, setiap pengalaman diubah menjadi rangkaian kata yang dapat 
                      dibaca, dipahami, dan mungkin dirasakan oleh orang lain. 
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Kolom Kanan */}
            <div className="space-y-6">
              <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start space-x-5">
                  <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-3.5 rounded-2xl flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Teman Berbagi</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Semoga setiap artikel yang ditulis di sini dapat menjadi teman bagi siapa pun 
                      yang sedang mencari makna, jawaban, atau sekadar ingin merasa tidak sendirian.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start space-x-5">
                  <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-3.5 rounded-2xl flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <PenLine className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Terus Menulis</h3>
                    <p className="text-gray-600 leading-relaxed">
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
      <footer className="bg-white/80 backdrop-blur-md border-t border-white/20 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2 rounded-lg">
                <PenLine className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                MyBlog
              </span>
              <span className="text-gray-400 text-sm">© 2026</span>
            </div>
            <div className="flex items-center space-x-8 text-sm text-gray-500">
              <span className="flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <span>Built with ❤️ by Rani</span>
              </span>
              <div className="flex space-x-4">
                <Link href="#" className="hover:text-indigo-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </Link>
                <Link href="#" className="hover:text-indigo-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.387.6.113.82-.26.82-.58 0-.287-.01-1.05-.015-2.06-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.085 1.838 1.237 1.838 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.123-.3-.535-1.52.117-3.16 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.64.24 2.86.118 3.16.768.84 1.233 1.91 1.233 3.22 0 4.61-2.804 5.62-5.476 5.92.43.37.824 1.102.824 2.22 0 1.602-.015 2.894-.015 3.287 0 .322.216.698.825.58C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                </Link>
                <Link href="#" className="hover:text-indigo-600 transition-colors">
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
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        article {
          animation: fadeInUp 0.7s ease-out forwards;
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