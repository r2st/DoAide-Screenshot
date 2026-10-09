import { Link } from 'react-router-dom';
import ShareButtons from '../components/shared/ShareButtons';

const TOOLS = [
  {
    path: '/code',
    title: 'Code Screenshot',
    description: 'Beautiful syntax-highlighted code screenshots with 20+ themes',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <rect x="4" y="6" width="40" height="32" rx="4" stroke="#F0B429" strokeWidth="2.5" fill="none" />
        <circle cx="12" cy="13" r="2" fill="#FF5F56" />
        <circle cx="19" cy="13" r="2" fill="#FFBD2E" />
        <circle cx="26" cy="13" r="2" fill="#27C93F" />
        <path d="M12 22L18 28L12 34" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="22" y1="34" x2="36" y2="34" stroke="#F0B429" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
    gradient: 'from-purple-600/20 to-blue-600/20',
    border: 'border-purple-500/20',
  },
  {
    path: '/tweet',
    title: 'Tweet / Quote Card',
    description: 'Stunning quote cards for WhatsApp, Instagram & Twitter',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <rect x="6" y="8" width="36" height="32" rx="4" stroke="#F0B429" strokeWidth="2.5" fill="none" />
        <text x="12" y="28" fontSize="24" fill="#64748B" fontFamily="Georgia">&ldquo;</text>
        <line x1="20" y1="20" x2="36" y2="20" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
        <line x1="14" y1="26" x2="34" y2="26" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
        <line x1="18" y1="32" x2="30" y2="32" stroke="#F0B429" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    gradient: 'from-pink-600/20 to-orange-600/20',
    border: 'border-pink-500/20',
  },
  {
    path: '/browser',
    title: 'Browser Mockup',
    description: 'Wrap screenshots in Chrome, Safari, Firefox or Arc frames',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <rect x="4" y="6" width="40" height="36" rx="4" stroke="#F0B429" strokeWidth="2.5" fill="none" />
        <line x1="4" y1="16" x2="44" y2="16" stroke="#64748B" strokeWidth="2" />
        <circle cx="12" cy="11" r="2" fill="#FF5F56" />
        <circle cx="19" cy="11" r="2" fill="#FFBD2E" />
        <circle cx="26" cy="11" r="2" fill="#27C93F" />
        <rect x="12" y="22" width="24" height="14" rx="2" fill="#64748B" fillOpacity="0.2" />
      </svg>
    ),
    gradient: 'from-blue-600/20 to-cyan-600/20',
    border: 'border-blue-500/20',
  },
  {
    path: '/phone',
    title: 'Phone Mockup',
    description: 'iPhone & Android device frames for app screenshots',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <rect x="12" y="4" width="24" height="40" rx="6" stroke="#F0B429" strokeWidth="2.5" fill="none" />
        <rect x="20" y="8" width="8" height="3" rx="1.5" fill="#64748B" />
        <line x1="18" y1="38" x2="30" y2="38" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    gradient: 'from-green-600/20 to-emerald-600/20',
    border: 'border-green-500/20',
  },
  {
    path: '/compare',
    title: 'Comparison Slider',
    description: 'Before & after image comparison with interactive slider',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <rect x="4" y="8" width="40" height="32" rx="4" stroke="#F0B429" strokeWidth="2.5" fill="none" />
        <line x1="24" y1="8" x2="24" y2="40" stroke="#F0B429" strokeWidth="2.5" />
        <circle cx="24" cy="24" r="5" fill="#F0B429" />
        <path d="M22 24L20 22M22 24L20 26" stroke="#020617" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M26 24L28 22M26 24L28 26" stroke="#020617" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    gradient: 'from-amber-600/20 to-red-600/20',
    border: 'border-amber-500/20',
  },
  {
    path: '/capture',
    title: 'Website Capture',
    description: 'Enter any URL to capture a beautiful website screenshot',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <rect x="4" y="6" width="40" height="36" rx="4" stroke="#F0B429" strokeWidth="2.5" fill="none" />
        <circle cx="24" cy="26" r="8" stroke="#64748B" strokeWidth="2" fill="none" />
        <circle cx="24" cy="26" r="3" fill="#F0B429" />
        <line x1="4" y1="14" x2="44" y2="14" stroke="#64748B" strokeWidth="2" />
      </svg>
    ),
    gradient: 'from-teal-600/20 to-blue-600/20',
    border: 'border-teal-500/20',
  },
  {
    path: '/annotate',
    title: 'Image Annotator',
    description: 'Add arrows, shapes, text, highlights and blur to images',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <rect x="4" y="4" width="40" height="40" rx="4" stroke="#F0B429" strokeWidth="2.5" fill="none" />
        <path d="M14 34L20 16L26 34" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="16" y1="28" x2="24" y2="28" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
        <path d="M30 18L38 26" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M38 26L35 23M38 26L35 29" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    gradient: 'from-red-600/20 to-orange-600/20',
    border: 'border-red-500/20',
  },
  {
    path: '/crop',
    title: 'Image Cropper',
    description: 'Crop images to any size with aspect ratio presets',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <path d="M14 4V34H44" stroke="#F0B429" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M34 44V14H4" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
    gradient: 'from-violet-600/20 to-purple-600/20',
    border: 'border-violet-500/20',
  },
  {
    path: '/pdf',
    title: 'Screenshot to PDF',
    description: 'Convert multiple screenshots into a single PDF document',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <rect x="8" y="4" width="32" height="40" rx="3" stroke="#F0B429" strokeWidth="2.5" fill="none" />
        <path d="M16 4V14H8" stroke="#F0B429" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="14" y="32" fontSize="12" fill="#64748B" fontFamily="Inter, sans-serif" fontWeight="700">PDF</text>
      </svg>
    ),
    gradient: 'from-rose-600/20 to-pink-600/20',
    border: 'border-rose-500/20',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mesh-gradient absolute inset-0" />
        <div className="relative max-w-5xl mx-auto px-4 py-20 md:py-32 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            Beautiful Screenshots{' '}
            <span className="gradient-text">in Seconds</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Create stunning code screenshots, tweet cards, browser mockups, annotate images, crop, and export to PDF.
            Free forever. No login required.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/code"
              className="px-8 py-3 bg-brand-gold hover:bg-yellow-500 text-slate-900 font-semibold rounded-xl transition-colors no-underline text-lg"
            >
              Get Started
            </Link>
            <a
              href="#tools"
              className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition-colors no-underline text-lg border border-slate-700"
            >
              Explore Tools
            </a>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
          9 Free Tools, Zero Friction
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOOLS.map(tool => (
            <Link
              key={tool.path}
              to={tool.path}
              className={`group p-6 rounded-2xl border ${tool.border} bg-gradient-to-br ${tool.gradient} hover:scale-[1.02] transition-all duration-200 no-underline`}
            >
              <div className="mb-4">{tool.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-brand-gold transition-colors">
                {tool.title}
              </h3>
              <p className="text-slate-400 text-sm">{tool.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="text-3xl mb-3">&#9889;</div>
            <h3 className="text-white font-semibold mb-2">Instant Export</h3>
            <p className="text-slate-400 text-sm">2x resolution PNG export. Copy to clipboard or download.</p>
          </div>
          <div className="p-6">
            <div className="text-3xl mb-3">&#127912;</div>
            <h3 className="text-white font-semibold mb-2">20+ Themes</h3>
            <p className="text-slate-400 text-sm">Dracula, Nord, One Dark, and more. Beautiful gradients included.</p>
          </div>
          <div className="p-6">
            <div className="text-3xl mb-3">&#128274;</div>
            <h3 className="text-white font-semibold mb-2">100% Private</h3>
            <p className="text-slate-400 text-sm">Everything runs in your browser. No uploads, no tracking.</p>
          </div>
        </div>
      </section>

      {/* Blog CTA */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="p-8 rounded-2xl border border-slate-700/50 bg-slate-800/30">
          <h2 className="text-xl font-bold text-white mb-3 text-center">From the Blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/blog/how-to-create-beautiful-code-screenshots" className="text-slate-300 hover:text-brand-gold text-sm no-underline transition-colors">
              How to Create Beautiful Code Screenshots for Social Media &rarr;
            </Link>
            <Link to="/blog/screenshot-annotation-complete-guide" className="text-slate-300 hover:text-brand-gold text-sm no-underline transition-colors">
              The Complete Guide to Screenshot Annotation &rarr;
            </Link>
            <Link to="/blog/free-screenshot-tools-for-designers-2025" className="text-slate-300 hover:text-brand-gold text-sm no-underline transition-colors">
              9 Free Screenshot Tools for Designers in 2025 &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Share the Love</h2>
        <p className="text-slate-400 mb-6">Help others discover beautiful screenshot tools</p>
        <div className="flex justify-center">
          <ShareButtons />
        </div>
      </section>
    </div>
  );
}
