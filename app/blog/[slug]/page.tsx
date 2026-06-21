'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import * as React from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Clock, 
  Share2, 
  Heart, 
  Bookmark,
  X,
  Link2,
  Eye,
  Tag,
  ChevronRight
} from 'lucide-react';

export default function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [readingTime, setReadingTime] = useState(0);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/posts/${slug}`);
        const data = await res.json();
        
        if (res.status === 404 || data.error) {
          setError(data.error || 'Artikel tidak ditemukan');
        } else {
          setPost(data);
          const wordCount = data.content?.split(/\s+/).length || 0;
          setReadingTime(Math.ceil(wordCount / 200));
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

  const convertMarkdownToHTML = (text: string) => {
    if (!text) return '';
    
    let html = text;
    
    html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
    html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    const paragraphs = html.split(/\n\s*\n/);
    html = paragraphs.map(p => {
      if (p.trim().startsWith('<h')) {
        return p.trim();
      }
      return `<p>${p.replace(/\n/g, '<br />')}</p>`;
    }).join('');
    
    html = html.replace(/<p>-\s(.*?)<\/p>/g, '<li>$1</li>');
    html = html.replace(/(<li>.*?<\/li>)+/g, '<ul>$&</ul>');
    html = html.replace(/<p>&gt;\s(.*?)<\/p>/g, '<blockquote>$1</blockquote>');
    
    return html;
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: post?.title,
        text: post?.excerpt || 'Baca artikel ini',
        url: window.location.href,
      });
    } catch (err) {
      navigator.clipboard.writeText(window.location.href);
      alert('Link artikel telah disalin!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-200 border-t-blue-500 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-blue-500">MB</span>
            </div>
          </div>
          <p className="mt-6 text-blue-400 font-medium text-lg">Memuat artikel...</p>
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

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-xl p-12 text-center max-w-md border border-blue-100">
          <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl">📖</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            {error || 'Artikel Tidak Ditemukan'}
          </h1>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Maaf, artikel yang kamu cari tidak tersedia atau telah dihapus.
          </p>
          <Link 
            href="/" 
            className="inline-flex items-center space-x-2 bg-blue-500 text-white px-8 py-3.5 rounded-full font-medium hover:bg-blue-600 transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>
      </div>
    );
  }

  const contentHTML = convertMarkdownToHTML(post.content);

  return (
    <div className="min-h-screen bg-white">
      {/* ===== NAVBAR ===== */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-blue-100/50 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="bg-blue-500 p-2 rounded-xl shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-all duration-300">
                <span className="text-white font-bold text-sm">MB</span>
              </div>
              <span className="text-xl font-bold text-blue-600">
                MyBlog
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className="p-2 rounded-full hover:bg-blue-50 transition-colors duration-300 text-gray-400 hover:text-blue-500"
              >
                <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-blue-500 text-blue-500' : ''}`} />
              </button>
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="p-2 rounded-full hover:bg-blue-50 transition-colors duration-300 text-gray-400 hover:text-red-500"
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
              <button
                onClick={handleShare}
                className="p-2 rounded-full hover:bg-blue-50 transition-colors duration-300 text-gray-400 hover:text-blue-500"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <Link 
                href="/" 
                className="hidden sm:inline-flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors duration-300 font-medium text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ===== ARTICLE HEADER ===== */}
      <div className="border-b border-blue-100/50 bg-blue-50/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center space-x-2 mb-6">
            <span className="inline-flex items-center space-x-1.5 bg-blue-100 text-blue-600 text-xs font-semibold px-4 py-2 rounded-full">
              <Tag className="w-3.5 h-3.5" />
              <span>{post.category || 'Artikel'}</span>
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-sm text-gray-400 flex items-center space-x-1.5">
              <Clock className="w-4 h-4" />
              <span>{readingTime} menit baca</span>
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Rani</p>
                <p className="text-gray-400 text-xs">Penulis</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-gray-400">
              <span className="flex items-center space-x-1.5">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(post.created_at).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </span>
              <span className="text-gray-300">|</span>
              <span className="flex items-center space-x-1.5">
                <Eye className="w-4 h-4" />
                <span>1.2k dibaca</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ===== ARTICLE CONTENT ===== */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-3xl">
          {post.image && (
            <div className="mb-10 rounded-2xl overflow-hidden shadow-lg border border-blue-100/50">
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
          
          <div 
            className="article-content prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: contentHTML }}
          />

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-blue-100/50">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-500 font-medium">
                Bagikan artikel ini
              </p>
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleShare}
                  className="p-2.5 rounded-full bg-blue-50 text-blue-500 hover:bg-blue-100 transition-all duration-300 hover:scale-110"
                >
                  <X className="w-5 h-5" />
                </button>
                <button
                  onClick={handleShare}
                  className="p-2.5 rounded-full bg-blue-50 text-blue-500 hover:bg-blue-100 transition-all duration-300 hover:scale-110"
                >
                  <Link2 className="w-5 h-5" />
                </button>
                <button
                  onClick={handleShare}
                  className="p-2.5 rounded-full bg-blue-50 text-blue-500 hover:bg-blue-100 transition-all duration-300 hover:scale-110"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-blue-100/50">
            <Link 
              href="/" 
              className="inline-flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors duration-300 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Beranda</span>
            </Link>
            <Link 
              href="#articles" 
              className="inline-flex items-center space-x-2 text-blue-500 hover:text-blue-600 transition-colors duration-300 font-medium"
            >
              <span>Artikel Lainnya</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </article>
      </div>

      {/* ===== FOOTER ===== */}
      <footer className="bg-white border-t border-blue-100/50 py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-500 p-2 rounded-xl shadow-lg shadow-blue-500/20">
                <span className="text-white font-bold text-xs">MB</span>
              </div>
              <span className="font-bold text-lg text-blue-600">MyBlog</span>
              <span className="text-gray-300 text-sm">© 2026</span>
            </div>
            <div className="text-sm text-gray-400">
              Build by Rani
            </div>
          </div>
        </div>
      </footer>

      {/* ===== CUSTOM CSS ===== */}
      <style jsx>{`
        .article-content {
          color: #374151;
          font-size: 1.125rem;
          line-height: 1.9;
        }
        
        .article-content h1 {
          font-size: 2.5rem;
          font-weight: 800;
          color: #111827;
          margin-top: 2.5rem;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
        }
        
        .article-content h2 {
          font-size: 2rem;
          font-weight: 700;
          color: #111827;
          margin-top: 2.5rem;
          margin-bottom: 1.25rem;
          letter-spacing: -0.01em;
        }
        
        .article-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #111827;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        
        .article-content p {
          margin-top: 1.5rem !important;
          margin-bottom: 1.5rem !important;
          line-height: 1.9;
          color: #374151;
        }
        
        .article-content p:first-child {
          margin-top: 0 !important;
        }
        
        .article-content p:last-child {
          margin-bottom: 0 !important;
        }
        
        .article-content strong {
          color: #111827;
          font-weight: 700;
        }
        
        .article-content em {
          font-style: italic;
          color: #4B5563;
        }
        
        .article-content ul {
          margin-top: 1rem;
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
          list-style-type: disc;
          color: #374151;
        }
        
        .article-content li {
          margin-bottom: 0.5rem;
          line-height: 1.8;
        }
        
        .article-content li::marker {
          color: #3B82F6;
        }
        
        .article-content blockquote {
          border-left: 4px solid #3B82F6;
          background: #EFF6FF;
          padding: 1.25rem 1.75rem;
          margin: 2rem 0;
          border-radius: 0 12px 12px 0;
          font-style: italic;
          color: #1E40AF;
        }
        
        .article-content blockquote p {
          margin: 0 !important;
          color: #1E40AF;
        }
        
        .article-content code {
          background: #EFF6FF;
          padding: 0.125rem 0.5rem;
          border-radius: 6px;
          font-size: 0.875rem;
          color: #1E40AF;
          font-family: 'Courier New', monospace;
        }
        
        .article-content pre {
          background: #111827;
          padding: 1.5rem;
          border-radius: 12px;
          overflow-x: auto;
          margin: 1.5rem 0;
        }
        
        .article-content pre code {
          background: transparent;
          color: #E5E7EB;
          padding: 0;
          font-size: 0.875rem;
        }
        
        .article-content img {
          border-radius: 12px;
          margin: 2rem 0;
          max-width: 100%;
          height: auto;
        }
        
        .article-content a {
          color: #3B82F6;
          text-decoration: underline;
          text-underline-offset: 2px;
          transition: color 0.2s;
        }
        
        .article-content a:hover {
          color: #2563EB;
        }
        
        @media (max-width: 640px) {
          .article-content {
            font-size: 1rem;
          }
          
          .article-content h1 {
            font-size: 1.75rem;
          }
          
          .article-content h2 {
            font-size: 1.5rem;
          }
          
          .article-content h3 {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
}