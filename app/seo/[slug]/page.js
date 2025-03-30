'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function SEOPage() {
  const { slug } = useParams();
  const [seoData, setSeoData] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('seoHistory');
    if (stored) {
      const history = JSON.parse(stored);
      const match = history.find(item => item.slug === slug);
      setSeoData(match);
    }
  }, [slug]);

  if (!seoData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <h1 className="text-xl">No SEO data found for: <span className="text-purple-400">/{slug}</span></h1>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-6 py-10">
      <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl space-y-4">
        <h1 className="text-2xl font-bold text-center text-purple-400 mb-6">📄 SEO Result for <code>/{slug}</code></h1>
        <p><strong>Title:</strong> {seoData.title}</p>
        <p><strong>Meta Description:</strong> {seoData.meta}</p>
        <p><strong>Keywords:</strong> {seoData.keywords}</p>
        <p><strong>Slug:</strong> /{seoData.slug}</p>
        <p><strong>Alt Text:</strong> {seoData.alt}</p>
        <p><strong>Description:</strong> {seoData.description}</p>
      </div>
    </main>
  );
}
