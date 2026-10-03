export default function Footer() {
  return (
    <footer className="border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-white">DoAide</span>
            <span className="text-lg font-bold italic text-brand-gold">Screenshot</span>
          </div>
          <p className="text-slate-500 text-sm">
            Free screenshot tools. No login. No watermark on free tier.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://doaide.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-brand-gold text-sm transition-colors no-underline"
            >
              DoAide.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
