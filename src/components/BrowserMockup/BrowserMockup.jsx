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
  'linear-gradient(135deg, #C6FFDD 0%, #FBD786 50%, #f7797d 100%)',
  'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  'linear-gradient(135deg, #334155 0%, #1e293b 100%)',
];

const SHADOWS = {
  none: 'none',
  small: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)',
  medium: '0 10px 25px -5px rgba(0,0,0,0.2), 0 8px 10px -6px rgba(0,0,0,0.1)',
  large: '0 25px 50px -12px rgba(0,0,0,0.4)',
};

function ChromeFrame({ url, isDark, children }) {
  const bg = isDark ? '#1f1f1f' : '#dee1e6';
  const tabBg = isDark ? '#2b2b2b' : '#fff';
  const textColor = isDark ? '#ccc' : '#5f6368';
  const urlBg = isDark ? '#323232' : '#f1f3f4';

  return (
    <div style={{ backgroundColor: tabBg, borderRadius: '12px', overflow: 'hidden' }}>
      <div style={{ backgroundColor: bg, padding: '8px 12px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F56' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FFBD2E' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27C93F' }} />
          </div>
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', gap: '4px',
            backgroundColor: tabBg, borderRadius: '8px 8px 0 0', padding: '6px 12px',
            fontSize: '12px', color: textColor, maxWidth: '200px',
          }}>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {url || 'New Tab'}
            </span>
          </div>
        </div>
        <div style={{
          backgroundColor: tabBg, borderRadius: '8px 8px 0 0', padding: '6px 12px',
          display: 'flex', alignItems: 'center', gap: '8px',
        }}>
          <div style={{ display: 'flex', gap: '8px', color: textColor }}>
            <span style={{ fontSize: '14px' }}>&#8592;</span>
            <span style={{ fontSize: '14px' }}>&#8594;</span>
            <span style={{ fontSize: '14px' }}>&#8635;</span>
          </div>
          <div style={{
            flex: 1, backgroundColor: urlBg, borderRadius: '20px', padding: '6px 14px',
            fontSize: '13px', color: textColor,
          }}>
            {url || 'https://example.com'}
          </div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}

function SafariFrame({ url, isDark, children }) {
  const bg = isDark ? '#2a2a2a' : '#f5f5f5';
  const textColor = isDark ? '#aaa' : '#666';
  const urlBg = isDark ? '#1a1a1a' : '#fff';

  return (
    <div style={{ backgroundColor: bg, borderRadius: '12px', overflow: 'hidden' }}>
      <div style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F56' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FFBD2E' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27C93F' }} />
        </div>
        <div style={{
          flex: 1, backgroundColor: urlBg, borderRadius: '8px', padding: '6px 16px',
          fontSize: '13px', color: textColor, textAlign: 'center',
          border: isDark ? '1px solid #444' : '1px solid #ddd',
        }}>
          {url || 'example.com'}
        </div>
        <div style={{ width: '44px' }} />
      </div>
      <div>{children}</div>
    </div>
  );
}

function FirefoxFrame({ url, isDark, children }) {
  const bg = isDark ? '#1c1b22' : '#f0f0f4';
  const tabBg = isDark ? '#2b2a33' : '#fff';
  const textColor = isDark ? '#bbb' : '#5b5b66';
  const urlBg = isDark ? '#42414d' : '#fff';

  return (
    <div style={{ backgroundColor: tabBg, borderRadius: '12px', overflow: 'hidden' }}>
      <div style={{ backgroundColor: bg, padding: '8px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F56' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FFBD2E' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27C93F' }} />
          </div>
          <div style={{
            flex: 1, backgroundColor: urlBg, borderRadius: '8px', padding: '6px 14px',
            fontSize: '13px', color: textColor,
            border: isDark ? '1px solid #555' : '1px solid #ccc',
          }}>
            {url || 'https://example.com'}
          </div>
          <div style={{ color: textColor, fontSize: '16px' }}>&#9776;</div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}

function ArcFrame({ url, isDark, children }) {
  const bg = isDark ? '#1a1a2e' : '#fafafa';
  const textColor = isDark ? '#888' : '#999';
  const urlBg = isDark ? '#16213e' : '#f0f0f0';

  return (
    <div style={{ backgroundColor: bg, borderRadius: '12px', overflow: 'hidden' }}>
      <div style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F56' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FFBD2E' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27C93F' }} />
        </div>
        <div style={{
          flex: 1, backgroundColor: urlBg, borderRadius: '6px', padding: '5px 12px',
          fontSize: '12px', color: textColor, textAlign: 'center',
        }}>
          {url || 'example.com'}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}

const BROWSERS = { chrome: ChromeFrame, safari: SafariFrame, firefox: FirefoxFrame, arc: ArcFrame };

export default function BrowserMockup() {
  const [image, setImage] = useState(null);
  const [browser, setBrowser] = useState('chrome');
  const [url, setUrl] = useState('https://myapp.com');
  const [isDark, setIsDark] = useState(true);
  const [bgType, setBgType] = useState('gradient');
  const [bgColor, setBgColor] = useState('#1e293b');
  const [bgGradient, setBgGradient] = useState(GRADIENTS[0]);
  const [padding, setPadding] = useState(48);
  const [shadow, setShadow] = useState('large');
  const [borderRadius, setBorderRadius] = useState(12);
  const [exporting, setExporting] = useState(false);

  const captureRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImage(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (ev) => setImage(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleExport = useCallback(async () => {
    if (!captureRef.current) return;
    setExporting(true);
    try {
      const dataUrl = await toPng(captureRef.current, { pixelRatio: 2, cacheBust: true });
      const link = document.createElement('a');
      link.download = `browser-mockup-${Date.now()}.png`;
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

  const BrowserComponent = BROWSERS[browser];
  const bg = bgType === 'solid' ? bgColor : bgType === 'transparent' ? 'transparent' : bgGradient;

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Preview */}
          <div className="flex-1 flex flex-col items-center">
            <div className="w-full overflow-auto rounded-xl border border-slate-700/50 bg-slate-900/50 p-4">
              <div className="flex justify-center">
                <div
                  ref={captureRef}
                  style={{ background: bg, padding: `${padding}px`, position: 'relative' }}
                  className="inline-block"
                >
                  <div style={{ boxShadow: SHADOWS[shadow], borderRadius: `${borderRadius}px`, overflow: 'hidden' }}>
                    <BrowserComponent url={url} isDark={isDark}>
                      {image ? (
                        <img src={image} alt="Screenshot" style={{ display: 'block', width: '100%', maxWidth: '800px' }} />
                      ) : (
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          onDrop={handleDrop}
                          onDragOver={e => e.preventDefault()}
                          className="cursor-pointer"
                          style={{
                            width: '600px', height: '400px',
                            backgroundColor: isDark ? '#1a1a1a' : '#fff',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            flexDirection: 'column', gap: '12px',
                          }}
                        >
                          <div style={{ fontSize: '48px', opacity: 0.3 }}>+</div>
                          <p style={{ color: isDark ? '#666' : '#999', fontSize: '14px' }}>
                            Click or drag an image here
                          </p>
                        </div>
                      )}
                    </BrowserComponent>
                  </div>
                  <div style={{ textAlign: 'right', paddingTop: '8px' }}>
                    <span style={{ color: 'rgba(148,163,184,0.4)', fontSize: '10px', fontFamily: 'Inter, sans-serif' }}>
                      screenshot.doaide.com
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />

            {/* Upload + Export */}
            <div className="flex gap-3 mt-4 w-full">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
              >
                Upload Image
              </button>
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
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Browser</label>
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(BROWSERS).map(b => (
                  <button
                    key={b}
                    onClick={() => setBrowser(b)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors capitalize ${browser === b ? 'bg-brand-gold text-slate-900' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">URL Text</label>
              <input
                type="text"
                value={url}
                onChange={e => setUrl(e.target.value)}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-brand-gold/50"
              />
            </div>

            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Frame Theme</label>
              <div className="flex gap-2">
                <button onClick={() => setIsDark(true)} className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${isDark ? 'bg-brand-gold text-slate-900' : 'bg-slate-700 text-slate-300'}`}>Dark</button>
                <button onClick={() => setIsDark(false)} className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${!isDark ? 'bg-brand-gold text-slate-900' : 'bg-slate-700 text-slate-300'}`}>Light</button>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Padding: {padding}px</label>
              <input type="range" min="0" max="96" value={padding} onChange={e => setPadding(Number(e.target.value))} className="w-full accent-brand-gold" />
            </div>

            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Shadow</label>
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(SHADOWS).map(s => (
                  <button key={s} onClick={() => setShadow(s)} className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors capitalize ${shadow === s ? 'bg-brand-gold text-slate-900' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>{s}</button>
                ))}
              </div>
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
