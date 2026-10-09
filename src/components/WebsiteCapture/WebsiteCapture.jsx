import { useState, useRef, useCallback } from 'react';
import { toPng } from 'html-to-image';

const GRADIENTS = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  'linear-gradient(135deg, #0c3483 0%, #a2b6df 100%)',
  'linear-gradient(135deg, #fc5c7d 0%, #6a82fb 100%)',
  'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
  'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  'linear-gradient(135deg, #334155 0%, #1e293b 100%)',
  'linear-gradient(135deg, #C6FFDD 0%, #FBD786 50%, #f7797d 100%)',
];

const VIEWPORTS = [
  { name: 'Desktop', width: 1280, height: 800, icon: '\u{1F5A5}' },
  { name: 'Tablet', width: 768, height: 1024, icon: '\u{1F4F1}' },
  { name: 'Mobile', width: 375, height: 812, icon: '\u{1F4F1}' },
];

export default function WebsiteCapture() {
  const [url, setUrl] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [viewport, setViewport] = useState(0);
  const [bgType, setBgType] = useState('gradient');
  const [bgColor, setBgColor] = useState('#1e293b');
  const [bgGradient, setBgGradient] = useState(GRADIENTS[0]);
  const [padding, setPadding] = useState(40);
  const [showUrlBar, setShowUrlBar] = useState(true);
  const [shadow, setShadow] = useState(true);
  const [exporting, setExporting] = useState(false);

  const captureRef = useRef(null);
  const fileInputRef = useRef(null);

  const captureWebsite = useCallback(async () => {
    if (!url.trim()) return;
    setLoading(true);
    setError('');

    let targetUrl = url.trim();
    if (!targetUrl.startsWith('http')) targetUrl = 'https://' + targetUrl;

    const vp = VIEWPORTS[viewport];
    const apiUrl = `https://api.microlink.io/?url=${encodeURIComponent(targetUrl)}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=${vp.width}&viewport.height=${vp.height}`;

    try {
      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error('Capture failed');
      const blob = await res.blob();
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
        setLoading(false);
      };
      reader.readAsDataURL(blob);
    } catch {
      setError('Could not capture this website. Try uploading a screenshot manually.');
      setLoading(false);
    }
  }, [url, viewport]);

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => { setImage(ev.target.result); setError(''); };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (ev) => { setImage(ev.target.result); setError(''); };
      reader.readAsDataURL(file);
    }
  };

  const handleExport = useCallback(async () => {
    if (!captureRef.current) return;
    setExporting(true);
    try {
      const dataUrl = await toPng(captureRef.current, { pixelRatio: 2, cacheBust: true });
      const link = document.createElement('a');
      link.download = `website-screenshot-${Date.now()}.png`;
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

  const bg = bgType === 'solid' ? bgColor : bgType === 'transparent' ? 'transparent' : bgGradient;
  const displayUrl = url.trim() ? url.trim().replace(/^https?:\/\//, '') : 'example.com';

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Website Screenshot Capture</h1>
          <p className="text-slate-400 text-sm">Enter a URL to capture or upload a screenshot to beautify</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Preview */}
          <div className="flex-1 flex flex-col items-center">
            {/* URL Input */}
            <div className="w-full flex gap-2 mb-4">
              <input
                type="text"
                value={url}
                onChange={e => setUrl(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && captureWebsite()}
                placeholder="Enter website URL (e.g., github.com)"
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 text-sm focus:outline-none focus:border-brand-gold/50"
              />
              <button
                onClick={captureWebsite}
                disabled={loading || !url.trim()}
                className="px-6 py-3 bg-brand-gold hover:bg-yellow-500 text-slate-900 font-semibold rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? 'Capturing...' : 'Capture'}
              </button>
            </div>

            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

            <div className="w-full overflow-auto rounded-xl border border-slate-700/50 bg-slate-900/50 p-4">
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="text-center">
                    <div className="w-10 h-10 border-2 border-brand-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-slate-400 text-sm">Capturing screenshot...</p>
                  </div>
                </div>
              ) : image ? (
                <div className="flex justify-center">
                  <div
                    ref={captureRef}
                    style={{ background: bg, padding: `${padding}px` }}
                    className="inline-block"
                  >
                    <div
                      style={{
                        borderRadius: '12px',
                        overflow: 'hidden',
                        boxShadow: shadow ? '0 25px 50px -12px rgba(0,0,0,0.5)' : 'none',
                      }}
                    >
                      {showUrlBar && (
                        <div style={{
                          background: '#1f1f1f',
                          padding: '8px 12px 6px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F56' }} />
                            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FFBD2E' }} />
                            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27C93F' }} />
                          </div>
                          <div style={{
                            flex: 1, background: '#323232', borderRadius: '6px', padding: '4px 12px',
                            fontSize: '12px', color: '#888', textAlign: 'center',
                          }}>
                            {displayUrl}
                          </div>
                        </div>
                      )}
                      <img src={image} alt="Website screenshot" style={{ display: 'block', width: '100%', maxWidth: '800px' }} />
                    </div>
                    <div style={{ textAlign: 'right', paddingTop: '8px' }}>
                      <span style={{ color: 'rgba(148,163,184,0.4)', fontSize: '10px', fontFamily: 'Inter, sans-serif' }}>
                        screenshot.doaide.com
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={e => e.preventDefault()}
                  className="flex flex-col items-center justify-center py-16 cursor-pointer"
                >
                  <div className="text-5xl text-slate-600 mb-4">+</div>
                  <p className="text-slate-400 text-sm font-medium mb-1">Enter a URL above or drop a screenshot here</p>
                  <p className="text-slate-500 text-xs">PNG, JPG supported</p>
                </div>
              )}
            </div>

            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />

            {/* Export Buttons */}
            <div className="flex gap-3 mt-4 w-full">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
              >
                Upload
              </button>
              <button
                onClick={handleExport}
                disabled={exporting || !image}
                className="flex-1 bg-brand-gold hover:bg-yellow-500 text-slate-900 font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
              >
                {exporting ? 'Exporting...' : 'Download PNG'}
              </button>
              <button
                onClick={handleCopy}
                disabled={exporting || !image}
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                Copy
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className="w-full lg:w-72 space-y-4">
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Viewport</label>
              <div className="space-y-2">
                {VIEWPORTS.map((vp, i) => (
                  <button
                    key={i}
                    onClick={() => setViewport(i)}
                    className={`w-full px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors ${viewport === i ? 'bg-brand-gold text-slate-900' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                  >
                    {vp.icon} {vp.name} ({vp.width}x{vp.height})
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Padding: {padding}px</label>
              <input type="range" min="0" max="96" value={padding} onChange={e => setPadding(Number(e.target.value))} className="w-full accent-brand-gold" />
            </div>

            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 space-y-3">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-slate-300">URL Bar</span>
                <div className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${showUrlBar ? 'bg-brand-gold' : 'bg-slate-600'}`} onClick={() => setShowUrlBar(!showUrlBar)}>
                  <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${showUrlBar ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </div>
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-slate-300">Shadow</span>
                <div className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${shadow ? 'bg-brand-gold' : 'bg-slate-600'}`} onClick={() => setShadow(!shadow)}>
                  <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${shadow ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </div>
              </label>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Background</label>
              <div className="flex gap-2 mb-3">
                {['gradient', 'solid', 'transparent'].map(t => (
                  <button key={t} onClick={() => setBgType(t)} className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${bgType === t ? 'bg-brand-gold text-slate-900' : 'bg-slate-700 text-slate-300'}`}>{t.charAt(0).toUpperCase() + t.slice(1)}</button>
                ))}
              </div>
              {bgType === 'gradient' && (
                <div className="grid grid-cols-4 gap-2">
                  {GRADIENTS.map((g, i) => (
                    <button key={i} onClick={() => setBgGradient(g)} className={`w-full h-8 rounded-md border-2 ${bgGradient === g ? 'border-brand-gold' : 'border-transparent'}`} style={{ background: g }} />
                  ))}
                </div>
              )}
              {bgType === 'solid' && (
                <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-full h-10 rounded-lg cursor-pointer bg-transparent" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
