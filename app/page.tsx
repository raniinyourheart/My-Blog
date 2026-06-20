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
  Quote
} from 'lucide-react';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-navy-600 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-navy-600 font-medium">Memuat artikel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50">
      {/* ===== NAVBAR ===== */}
      <nav className="bg-white shadow-sm border-b border-blue-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="bg-navy-700 p-2 rounded-lg transform group-hover:scale-105 transition">
                <PenLine className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-navy-700">
                MyBlog
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-navy-600 hover:text-navy-800 font-medium transition border-b-2 border-navy-600 pb-1">
                Home
              </Link>
              <Link href="#articles" className="text-navy-500 hover:text-navy-700 font-medium transition">
                Artikel
              </Link>
              <Link href="#about" className="text-navy-500 hover:text-navy-700 font-medium transition">
                Tentang
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section className="bg-white border-b border-blue-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-full text-navy-700 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 text-navy-600" />
              <span>Selamat datang di blog saya</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-800 mb-4 leading-tight">
              Berbagi Cerita & 
              <span className="text-navy-600"> Inspirasi</span>
            </h1>
            <p className="text-lg text-navy-500 max-w-2xl mx-auto mb-8">
              Temukan artikel-artikel menarik tentang pengalaman, pembelajaran, dan hal-hal seru lainnya.
            </p>
            <Link 
              href="#articles" 
              className="inline-flex items-center space-x-2 bg-navy-700 text-white px-8 py-3 rounded-full font-medium hover:bg-navy-800 transition shadow-md hover:shadow-lg"
            >
              <BookOpen className="w-5 h-5" />
              <span>Mulai Membaca</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== ARTICLES SECTION ===== */}
      <section id="articles" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-800">
              📚 Semua Artikel
            </h2>
            <p className="text-navy-500 mt-1">Temukan cerita-cerita terbaru dari saya</p>
          </div>
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
            <Clock className="w-4 h-4 text-navy-400" />
            <span className="text-sm text-navy-600 font-medium">{posts.length} Artikel</span>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-blue-200">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <PenLine className="w-10 h-10 text-navy-600" />
            </div>
            <h3 className="text-2xl font-bold text-navy-700 mb-3">Belum Ada Artikel</h3>
            <p className="text-navy-500">Masih kosong nih, tapi nanti akan ada tulisan menarik!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post: any, index: number) => (
              <article 
                key={post.id} 
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-blue-200 hover:border-navy-300 flex flex-col"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-medium text-white bg-navy-600 px-3 py-1 rounded-full">
                        <Tag className="w-3 h-3 inline mr-1" />
                        Artikel
                      </span>
                      <span className="text-xs text-navy-400 flex items-center space-x-1">
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

                    <h3 className="text-xl font-bold text-navy-800 group-hover:text-navy-600 transition mb-2">
                      {post.title}
                    </h3>

                    <p className="text-navy-500 text-sm mb-4 flex-grow">
                      {post.excerpt || 'Baca selengkapnya untuk mengetahui cerita lengkapnya...'}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-blue-100 mt-auto">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-navy-700 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-medium text-navy-600">Rani</span>
                      </div>
                      <span className="text-navy-600 group-hover:translate-x-1 transition flex items-center space-x-1 font-medium">
                        <span className="text-sm">Baca Selengkapnya</span>
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* ===== ABOUT / TENTANG SECTION ===== */}
      <section id="about" className="bg-white border-y border-blue-200 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-800">
              Tentang Blog Ini
            </h2>
            <div className="w-16 h-1 bg-navy-600 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Kolom Kiri */}
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                <div className="flex items-start space-x-4">
                  <div className="bg-navy-700 p-3 rounded-xl flex-shrink-0">
                    <Quote className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-navy-800 mb-2">Ruang untuk Cerita</h3>
                    <p className="text-navy-600 leading-relaxed">
                      Blog ini adalah ruang untuk menyimpan cerita, pemikiran, dan refleksi tentang 
                      kehidupan, kehilangan, harapan, serta berbagai hal yang sering kali sulit 
                      diungkapkan secara langsung.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                <div className="flex items-start space-x-4">
                  <div className="bg-navy-700 p-3 rounded-xl flex-shrink-0">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-navy-800 mb-2">Dari Hati ke Kata</h3>
                    <p className="text-navy-600 leading-relaxed">
                      Melalui tulisan, setiap pengalaman diubah menjadi rangkaian kata yang dapat 
                      dibaca, dipahami, dan mungkin dirasakan oleh orang lain. 
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Kolom Kanan */}
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                <div className="flex items-start space-x-4">
                  <div className="bg-navy-700 p-3 rounded-xl flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-navy-800 mb-2">Teman Berbagi</h3>
                    <p className="text-navy-600 leading-relaxed">
                      Semoga setiap artikel yang ditulis di sini dapat menjadi teman bagi siapa pun 
                      yang sedang mencari makna, jawaban, atau sekadar ingin merasa tidak sendirian.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                <div className="flex items-start space-x-4">
                  <div className="bg-navy-700 p-3 rounded-xl flex-shrink-0">
                    <PenLine className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-navy-800 mb-2">Terus Menulis</h3>
                    <p className="text-navy-600 leading-relaxed">
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
      <footer className="bg-white border-t border-blue-200 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="bg-navy-700 p-1.5 rounded-lg">
                <PenLine className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-navy-700">MyBlog</span>
              <span className="text-navy-400 text-sm">© 2026</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-navy-500">
              <span className="flex items-center space-x-1">
                <span>Built || by Rani</span>
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* ===== CUSTOM CSS ===== */}
      <style jsx>{`
        .text-navy-50 { color: #f0f4ff; }
        .text-navy-100 { color: #090909; }
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
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        article {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}