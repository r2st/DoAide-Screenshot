import { useState, useRef, useCallback } from 'react';
import { toPng } from 'html-to-image';

const GRADIENTS = [
  { name: 'Sunset', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { name: 'Flamingo', value: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { name: 'Ocean', value: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { name: 'Mint', value: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
  { name: 'Peach', value: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  { name: 'Lavender', value: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' },
  { name: 'Fire', value: 'linear-gradient(135deg, #f12711 0%, #f5af19 100%)' },
  { name: 'Deep Blue', value: 'linear-gradient(135deg, #0c3483 0%, #a2b6df 100%)' },
  { name: 'Aurora', value: 'linear-gradient(135deg, #C6FFDD 0%, #FBD786 50%, #f7797d 100%)' },
  { name: 'Midnight', value: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)' },
  { name: 'Forest', value: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' },
  { name: 'Berry', value: 'linear-gradient(135deg, #fc5c7d 0%, #6a82fb 100%)' },
  { name: 'Slate', value: 'linear-gradient(135deg, #334155 0%, #1e293b 100%)' },
  { name: 'Rose', value: 'linear-gradient(135deg, #fecdd3 0%, #fda4af 50%, #fb7185 100%)' },
  { name: 'Gold', value: 'linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)' },
  { name: 'Emerald', value: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)' },
];

const FONTS = [
  { name: 'Sans', value: "'Inter', system-ui, sans-serif", import: '' },
  { name: 'Serif', value: "'Merriweather', Georgia, serif", import: '' },
  { name: 'Mono', value: "'JetBrains Mono', monospace", import: '' },
  { name: 'Handwriting', value: "'Caveat', cursive", import: '' },
];

const ASPECT_RATIOS = [
  { name: 'Square', value: '1/1', width: 540, height: 540, label: '1:1' },
  { name: 'Wide', value: '16/9', width: 640, height: 360, label: '16:9' },
  { name: 'Story', value: '9/16', width: 360, height: 640, label: '9:16' },
  { name: 'Post', value: '4/5', width: 480, height: 600, label: '4:5' },
];

export default function TweetScreenshot() {
  const [text, setText] = useState("The best time to plant a tree was 20 years ago. The second best time is now.");
  const [author, setAuthor] = useState("Chinese Proverb");
  const [handle, setHandle] = useState("");
  const [gradient, setGradient] = useState(GRADIENTS[0].value);
  const [font, setFont] = useState(FONTS[0].value);
  const [fontSize, setFontSize] = useState(24);
  const [textAlign, setTextAlign] = useState('center');
  const [textColor, setTextColor] = useState('white');
  const [cardStyle, setCardStyle] = useState('quotes');
  const [aspectRatio, setAspectRatio] = useState(0);
  const [exporting, setExporting] = useState(false);

  const captureRef = useRef(null);
  const ar = ASPECT_RATIOS[aspectRatio];

  const handleExport = useCallback(async () => {
    if (!captureRef.current) return;
    setExporting(true);
    try {
      const dataUrl = await toPng(captureRef.current, { pixelRatio: 2, cacheBust: true });
      const link = document.createElement('a');
      link.download = `quote-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setExporting(false);
    }
  }, []);

  const handleCopy = useCallback(async () => {
    if (!captureRef.current) return;
    setExporting(true);
    try {
      const dataUrl = await toPng(captureRef.current, { pixelRatio: 2, cacheBust: true });
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
    } catch (err) {
      console.error('Copy failed:', err);
    } finally {
      setExporting(false);
    }
  }, []);

  const color = textColor === 'white' ? '#ffffff' : '#1e293b';
  const subColor = textColor === 'white' ? 'rgba(255,255,255,0.7)' : 'rgba(30,41,59,0.6)';

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Preview */}
          <div className="flex-1 flex flex-col items-center">
            <div className="w-full overflow-auto rounded-xl border border-slate-700/50 bg-slate-900/50 p-6 flex justify-center">
              <div
                ref={captureRef}
                style={{
                  background: gradient,
                  width: `${ar.width}px`,
                  height: `${ar.height}px`,
                  position: 'relative',
                }}
                className="flex items-center justify-center overflow-hidden"
              >
                <div
                  className="px-10 py-8 w-full h-full flex flex-col items-center justify-center"
                  style={{ textAlign }}
                >
                  {cardStyle === 'quotes' && (
                    <div style={{ color: subColor, fontSize: '72px', fontFamily: 'Georgia, serif', lineHeight: 1, marginBottom: '-8px', opacity: 0.4 }}>
                      &ldquo;
                    </div>
                  )}

                  {cardStyle === 'border' && (
                    <div style={{ position: 'absolute', inset: '20px', border: `2px solid ${textColor === 'white' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)'}`, borderRadius: '12px', pointerEvents: 'none' }} />
                  )}

                  <p style={{
                    color,
                    fontFamily: font,
                    fontSize: `${fontSize}px`,
                    lineHeight: 1.5,
                    fontWeight: font.includes('Caveat') ? 400 : 500,
                    maxWidth: '90%',
                    ...(cardStyle === 'shadow' ? {
                      textShadow: '0 2px 20px rgba(0,0,0,0.3)',
                    } : {}),
                  }}>
                    {text}
                  </p>

                  {(author || handle) && (
                    <div style={{ marginTop: '24px' }}>
                      {author && (
                        <p style={{ color: subColor, fontFamily: font, fontSize: `${Math.max(14, fontSize - 8)}px`, fontWeight: 600 }}>
                          &mdash; {author}
                        </p>
                      )}
                      {handle && (
                        <p style={{ color: subColor, fontFamily: font, fontSize: `${Math.max(12, fontSize - 10)}px`, marginTop: '4px', opacity: 0.8 }}>
                          {handle}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div style={{ position: 'absolute', bottom: '8px', right: '12px' }}>
                  <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '9px', fontFamily: 'Inter, sans-serif' }}>
                    screenshot.doaide.com
                  </span>
                </div>
              </div>
            </div>

            {/* Text Input */}
            <div className="w-full mt-4 space-y-3">
              <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                className="w-full h-28 bg-slate-900 border border-slate-700 rounded-lg p-4 text-slate-200 text-sm resize-y focus:outline-none focus:border-brand-gold/50"
                placeholder="Type your quote or tweet..."
              />
              <div className="flex gap-3">
                <input
                  type="text"
                  value={author}
                  onChange={e => setAuthor(e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 text-sm focus:outline-none focus:border-brand-gold/50"
                  placeholder="Author name"
                />
                <input
                  type="text"
                  value={handle}
                  onChange={e => setHandle(e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 text-sm focus:outline-none focus:border-brand-gold/50"
                  placeholder="@handle or source"
                />
              </div>
            </div>

            {/* Export */}
            <div className="flex gap-3 mt-4 w-full">
              <button
                onClick={handleExport}
                disabled={exporting}
                className="flex-1 bg-brand-gold hover:bg-yellow-500 text-slate-900 font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
              >
                {exporting ? 'Exporting...' : 'Download PNG'}
              </button>
              <button
                onClick={handleCopy}
                disabled={exporting}
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                Copy
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className="w-full lg:w-72 space-y-4">
            {/* Aspect Ratio */}
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Aspect Ratio</label>
              <div className="grid grid-cols-2 gap-2">
                {ASPECT_RATIOS.map((a, i) => (
                  <button
                    key={i}
                    onClick={() => setAspectRatio(i)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${aspectRatio === i ? 'bg-brand-gold text-slate-900' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                  >
                    {a.name} ({a.label})
                  </button>
                ))}
              </div>
            </div>

            {/* Background */}
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Background</label>
              <div className="grid grid-cols-4 gap-2">
                {GRADIENTS.map((g, i) => (
                  <button
                    key={i}
                    onClick={() => setGradient(g.value)}
                    className={`w-full h-8 rounded-md border-2 transition-colors ${gradient === g.value ? 'border-brand-gold' : 'border-transparent'}`}
                    style={{ background: g.value }}
                    title={g.name}
                  />
                ))}
              </div>
            </div>

            {/* Font */}
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Font</label>
              <div className="grid grid-cols-2 gap-2">
                {FONTS.map((f, i) => (
                  <button
                    key={i}
                    onClick={() => setFont(f.value)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${font === f.value ? 'bg-brand-gold text-slate-900' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Font Size */}
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Font Size: {fontSize}px</label>
              <input
                type="range" min="16" max="48" value={fontSize}
                onChange={e => setFontSize(Number(e.target.value))}
                className="w-full accent-brand-gold"
              />
            </div>

            {/* Text Alignment */}
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Alignment</label>
              <div className="flex gap-2">
                {['left', 'center', 'right'].map(a => (
                  <button
                    key={a}
                    onClick={() => setTextAlign(a)}
                    className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors capitalize ${textAlign === a ? 'bg-brand-gold text-slate-900' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            {/* Text Color */}
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Text Color</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setTextColor('white')}
                  className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${textColor === 'white' ? 'bg-brand-gold text-slate-900' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                >
                  White
                </button>
                <button
                  onClick={() => setTextColor('dark')}
                  className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${textColor === 'dark' ? 'bg-brand-gold text-slate-900' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                >
                  Dark
                </button>
              </div>
            </div>

            {/* Card Style */}
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Style</label>
              <div className="grid grid-cols-2 gap-2">
                {['minimal', 'quotes', 'border', 'shadow'].map(s => (
                  <button
                    key={s}
                    onClick={() => setCardStyle(s)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors capitalize ${cardStyle === s ? 'bg-brand-gold text-slate-900' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
