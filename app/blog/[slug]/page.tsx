'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import * as React from 'react';

export default function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/posts/${slug}`);
        const data = await res.json();
        
        if (res.status === 404 || data.error) {
          setError(data.error || 'Artikel tidak ditemukan');
        } else {
          setPost(data);
        }
      } catch (err) {
        console.error('Error:', err);
        setError('Gagal memuat artikel');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  // FUNGSI CONVERT MARKDOWN KE HTML (dengan paragraf berjarak)
  const convertMarkdownToHTML = (text: string) => {
    if (!text) return '';
    
    let html = text;
    
    // 1. Ubah # menjadi heading
    html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
    html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    
    // 2. Ubah **tebal** menjadi <strong>
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // 3. Ubah *miring* menjadi <em>
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // 4. Ubah baris kosong menjadi paragraf (PENTING!)
    const paragraphs = html.split(/\n\s*\n/);
    html = paragraphs.map(p => {
      // Lewati heading (sudah dibungkus)
      if (p.trim().startsWith('<h')) {
        return p.trim();
      }
      // Bungkus paragraf dengan <p>, ganti newline jadi <br />
      return `<p>${p.replace(/\n/g, '<br />')}</p>`;
    }).join('');
    
    // 5. Ubah list (- item) menjadi <ul>
    html = html.replace(/<p>-\s(.*?)<\/p>/g, '<li>$1</li>');
    html = html.replace(/(<li>.*?<\/li>)+/g, '<ul>$&</ul>');
    
    // 6. Ubah blockquote (> text)
    html = html.replace(/<p>&gt;\s(.*?)<\/p>/g, '<blockquote>$1</blockquote>');
    
    return html;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-navy-600 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-navy-600 font-medium">Memuat artikel...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-12 text-center max-w-md border border-blue-100">
          <div className="text-6xl mb-4">😅</div>
          <h1 className="text-2xl font-bold text-navy-800 mb-3">{error || 'Artikel Tidak Ditemukan'}</h1>
          <p className="text-navy-500 mb-6">
            Maaf, artikel yang kamu cari tidak ada atau sudah dihapus.
          </p>
          <Link 
            href="/" 
            className="inline-block bg-gradient-to-r from-navy-600 to-blue-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-xl transition"
          >
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  const contentHTML = convertMarkdownToHTML(post.content);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* NAVBAR */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="bg-gradient-to-r from-navy-700 to-blue-600 p-2 rounded-lg">
                <span className="text-white font-bold text-sm">MB</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-navy-700 to-blue-600 bg-clip-text text-transparent">
                MyBlog
              </span>
            </Link>
            <Link 
              href="/" 
              className="text-navy-500 hover:text-blue-600 transition flex items-center space-x-2 font-medium"
            >
              <span>← Kembali</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* KONTEN ARTIKEL */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-10 border border-blue-100">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-800 leading-tight mb-4">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-navy-500 border-b border-blue-100 pb-6 mb-6">
            <span>
              📅 {new Date(post.created_at).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </span>
            <span className="text-navy-300">|</span>
            <span>👤 Penulis</span>
          </div>
          
          {post.image && (
            <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full max-h-[500px] object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          )}
          
          {/* RENDER KONTEN DENGAN CSS MANUAL */}
          <div 
            className="article-content"
            dangerouslySetInnerHTML={{ __html: contentHTML }}
          />
        </article>

        <div className="mt-8 text-center">
          <Link 
            href="/" 
            className="inline-flex items-center space-x-2 text-navy-600 hover:text-blue-600 transition font-medium"
          >
            <span></span>
          </Link>
        </div>
      </div>

      {/* ===== CUSTOM CSS ===== */}
      <style jsx>{`
        /* Warna Navy */
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

        .from-navy-600 { --tw-gradient-from: #2a5a9c; }
        .to-navy-700 { --tw-gradient-to: #1a3d6b; }

        /* ===== CSS UNTUK KONTEN ARTIKEL (BIAR BERJARAK) ===== */
        .article-content {
          color: #1a3d6b;
          font-size: 1.1rem;
          line-height: 1.9;
        }
        
        .article-content h1 {
          font-size: 2.2rem;
          font-weight: 700;
          color: #0e284a;
          margin-top: 2.5rem;
          margin-bottom: 1.2rem;
        }
        
        .article-content h2 {
          font-size: 1.8rem;
          font-weight: 700;
          color: #0e284a;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        
        .article-content h3 {
          font-size: 1.4rem;
          font-weight: 700;
          color: #0e284a;
          margin-top: 1.5rem;
          margin-bottom: 0.8rem;
        }
        
        /* INI YANG PENTING: SETIAP PARAGRAF PUNYA JARAK */
        .article-content p {
          margin-top: 1.2rem !important;
          margin-bottom: 1.2rem !important;
          line-height: 1.9;
          color: #1a3d6b;
        }
        
        .article-content p:first-child {
          margin-top: 0;
        }
        
        .article-content ul {
          margin-top: 0.8rem;
          margin-bottom: 1.2rem;
          padding-left: 1.8rem;
          color: #1a3d6b;
        }
        
        .article-content li {
          margin-bottom: 0.5rem;
        }
        
        .article-content blockquote {
          border-left: 4px solid #2a5a9c;
          background: #f0f4ff;
          padding: 1rem 1.5rem;
          margin: 1.5rem 0;
          border-radius: 0 8px 8px 0;
          font-style: italic;
          color: #1a3d6b;
        }
        
        .article-content strong {
          color: #0e284a;
          font-weight: 700;
        }
        
        .article-content code {
          background: #dbe4f5;
          padding: 0.1rem 0.4rem;
          border-radius: 4px;
          font-size: 0.875rem;
          color: #0e284a;
        }
        
        .article-content pre {
          background: #0e284a;
          padding: 1.2rem;
          border-radius: 12px;
          overflow-x: auto;
          margin: 1.5rem 0;
        }
        
        .article-content pre code {
          background: transparent;
          color: white;
          padding: 0;
        }
      `}</style>
    </div>
  );
}