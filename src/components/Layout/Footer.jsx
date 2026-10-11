export default function Footer() {
  return (
    <footer className="border-t border-da-border mt-auto bg-da-surface">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <span className="text-lg font-bold text-da-text">DoAide</span>
            <span className="text-lg font-light text-da-muted">|</span>
            <span className="text-lg font-bold text-brand-primary">Screenshot</span>
          </div>
          <p className="text-da-muted text-sm">
            Free screenshot tools. No login. No watermark on free tier.
          </p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-medium">
              A DoAide Product
            </span>
            <a
              href="https://doaide.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-da-muted hover:text-brand-primary text-sm transition-colors no-underline"
            >
              DoAide.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
