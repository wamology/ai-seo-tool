'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [seoData, setSeoData] = useState(null);
  const [history, setHistory] = useState([]);
  const router = useRouter();

  const features = [
    { title: 'AI-driven SEO Recommendations', icon: '📈', desc: 'Real-time suggestions based on your products and competitors.' },
    { title: 'Site Audit Tools', icon: '🛠️', desc: 'Automatically find and fix SEO issues site-wide.' },
    { title: 'Automatic Product Optimization', icon: '🛒', desc: 'Enhance titles, descriptions, and metadata in one click.' },
    { title: 'AI Content Suggestions', icon: '🧠', desc: 'Generate product copy, meta tags, and more with AI.' },
  ];

  const steps = [
    { step: '1', title: 'Upload Your Store', desc: 'Connect or upload your product data for instant analysis.' },
    { step: '2', title: 'AI Analyzes', desc: 'Our engine scans your listings and metadata in real time.' },
    { step: '3', title: 'Get Optimized', desc: 'Receive actionable SEO insights to boost visibility.' },
  ];

  const testimonials = [
    { name: 'Fatima R.', company: 'eCom Haven', feedback: 'This tool cut our SEO workload in half. Super intuitive and accurate!' },
    { name: 'James M.', company: 'StreetWear Co.', feedback: 'Game changer! The product optimization is spot-on and saved us hours.' },
    { name: 'Ayesha K.', company: 'Dubai Deals', feedback: 'Finally, an AI tool that actually helps eCommerce SEO. We saw traffic jump in a week!' },
  ];

  useEffect(() => {
    document.title = 'EcomAi SEO - Fast SEO Tool';
    const stored = localStorage.getItem('seoHistory');
    if (stored) setHistory(JSON.parse(stored));
  }, []);

  const handleGenerate = async () => {
    const inputText =
      description ||
      (file?.name?.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ') || 'AI Product');
  
    try {
      const res = await fetch('/api/generate-seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: inputText }),
      });
  
      const data = await res.json();
  
      // ✅ Log what came back from the AI
      console.log('🧠 AI Response:', data);
  
      if (data.error) {
        alert('Something went wrong!');
        return;
      }
  
      setSeoData(data);
      const updatedHistory = [data, ...history.slice(0, 4)];
      setHistory(updatedHistory);
      localStorage.setItem('seoHistory', JSON.stringify(updatedHistory));
    } catch (err) {
      console.error('API error:', err);
      alert('Something went wrong!');
    }
  };
  
  const clearHistory = () => {
    localStorage.removeItem('seoHistory');
    setHistory([]); // keeps seoData and all UI intact
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      {/* Header */}
      <header className="flex items-center justify-between max-w-7xl mx-auto px-6 py-6">
        <div className="text-2xl font-bold tracking-tight">⚡ EcomAi SEO</div>
        <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-300">
          <a href="#" className="hover:text-purple-400 transition">Pricing</a>
          <a href="#" className="hover:text-purple-400 transition">Insights</a>
          <a href="#" className="hover:text-purple-400 transition">Affiliates</a>
          <a href="#" className="hover:text-purple-400 transition">Guide</a>
        </nav>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-transform hover:scale-105">
          Start Free Trial
        </button>
      </header>

      {/* Hero */}
      <section className="text-center mt-20 max-w-4xl mx-auto px-6">
        <h1 className="text-5xl font-extrabold mb-4 leading-tight tracking-tight">
          Unlock Your SEO Potential with AI
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Automatically optimize your eCommerce store's SEO with AI-driven recommendations and insights.
        </p>
      </section>

      {/* SEO Generator */}
      <section className="mt-28 px-6 max-w-5xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-10 tracking-tight text-white">🧠 Generate Your SEO Content</h2>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 shadow-lg text-left space-y-6">
          <div>
            <label className="text-sm text-gray-300 block mb-1">Upload Product Image (optional)</label>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} className="block w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white" />
          </div>
          <div>
            <label className="text-sm text-gray-300 block mb-1">Product Description (optional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Premium leather backpack with laptop sleeve"
              rows={3}
              className="w-full p-3 bg-white/10 text-white border border-white/20 rounded"
            ></textarea>
          </div>
          <button
            onClick={handleGenerate}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition"
          >
            Generate SEO
          </button>
        </div>
      </section>

      {/* SEO Result */}
      {seoData && (
        <section className="mt-16 px-6 max-w-5xl mx-auto text-left">
          <h3 className="text-3xl font-bold mb-6 text-purple-300">🎯 AI-Generated SEO</h3>
          <div className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-4 text-sm">
            <p><strong>Title:</strong> {seoData.title}</p>
            <p><strong>Meta:</strong> {seoData.meta}</p>
            <p><strong>Keywords:</strong> {seoData.keywords}</p>
            <p><strong>Slug:</strong> <a href={`/seo/${seoData.slug}`} className="text-blue-400 underline">/{seoData.slug}</a></p>
            <p><strong>Alt:</strong> {seoData.alt}</p>
            <p><strong>Description:</strong> {seoData.description}</p>
          </div>
        </section>
      )}

      {/* Previous Results + Clear History */}
      {history.length > 0 && (
        <section className="mt-16 px-6 max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-white">🕘 Previous Results</h3>
            <button
              onClick={clearHistory}
              className="text-sm text-red-400 border border-red-400 px-3 py-1 rounded hover:bg-red-500 hover:text-white transition"
            >
              Clear History
            </button>
          </div>
          <ul className="space-y-4 text-sm">
            {history.map((item, index) => (
              <li key={index} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p><strong>Title:</strong> {item.title}</p>
                <p><strong>Slug:</strong> <a href={`/seo/${item.slug}`} className="text-blue-400 underline">/{item.slug}</a></p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Features */}
      <section className="mt-28 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-10 tracking-tight text-white">🚀 Key Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 text-center transition hover:shadow-lg hover:shadow-purple-600/30">
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-gray-300">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="mt-28 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-10 tracking-tight text-white">🔄 How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {steps.map((step, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 transition hover:shadow-md hover:shadow-purple-500/30">
              <div className="w-12 h-12 mx-auto mb-4 text-lg font-bold bg-purple-700 text-white rounded-full flex items-center justify-center">
                {step.step}
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-gray-300">{step.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 relative h-2 bg-white/10 rounded-full overflow-hidden">
          <div className="absolute h-full w-1/3 bg-purple-500 animate-pulse rounded-full" />
        </div>
      </section>

      {/* Testimonials */}
      <section className="mt-28 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-12 tracking-tight text-white">💬 What Our Users Say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 shadow-md">
              <p className="text-sm text-gray-300 mb-4">"{t.feedback}"</p>
              <div className="flex items-center gap-3 mt-4">
                <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-sm">
                  {t.name.split(' ')[0][0]}{t.name.split(' ')[1]?.[0]}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-28 px-6 max-w-7xl mx-auto border-t border-white/10 pt-10 pb-16 text-sm text-gray-400">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p>© {new Date().getFullYear()} EcomAi SEO. All rights reserved.</p>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-purple-400 transition">Twitter</a>
            <a href="#" className="hover:text-purple-400 transition">LinkedIn</a>
            <a href="#" className="hover:text-purple-400 transition">Instagram</a>
          </div>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-white font-semibold">Stay updated with AI SEO insights!</p>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="flex w-full sm:w-auto">
            <input type="email" placeholder="Enter your email" className="px-4 py-2 rounded-l-lg bg-white/10 text-white border border-white/20 focus:outline-none" />
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-r-lg transition">Subscribe</button>
          </form>
        </div>
      </footer>
    </main>
  );
}
