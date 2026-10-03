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

const DEVICES = [
  { name: 'iPhone 15 Pro', width: 280, height: 580, radius: 48, bezel: 4, notch: 'dynamic-island', screenRadius: 44 },
  { name: 'iPhone 15', width: 280, height: 580, radius: 48, bezel: 4, notch: 'notch', screenRadius: 44 },
  { name: 'iPhone SE', width: 270, height: 540, radius: 36, bezel: 4, notch: 'home', screenRadius: 0 },
  { name: 'Pixel 8', width: 274, height: 580, radius: 40, bezel: 4, notch: 'punch-hole', screenRadius: 36 },
  { name: 'Galaxy S24', width: 274, height: 590, radius: 36, bezel: 3, notch: 'punch-hole', screenRadius: 32 },
  { name: 'Generic', width: 270, height: 560, radius: 32, bezel: 3, notch: 'none', screenRadius: 28 },
];

const COLORS = [
  { name: 'Space Black', frame: '#1a1a1a', side: '#2a2a2a' },
  { name: 'Silver', frame: '#c0c0c0', side: '#d0d0d0' },
  { name: 'Gold', frame: '#d4a574', side: '#e0b890' },
  { name: 'Blue', frame: '#394f6a', side: '#4a6080' },
  { name: 'Purple', frame: '#5a4a6a', side: '#6a5a7a' },
];

export default function PhoneMockup() {
  const [image, setImage] = useState(null);
  const [device, setDevice] = useState(0);
  const [color, setColor] = useState(0);
  const [bgType, setBgType] = useState('gradient');
  const [bgColor, setBgColor] = useState('#1e293b');
  const [bgGradient, setBgGradient] = useState(GRADIENTS[0]);
  const [padding, setPadding] = useState(48);
  const [showShadow, setShowShadow] = useState(true);
  const [orientation, setOrientation] = useState('portrait');
  const [exporting, setExporting] = useState(false);

  const captureRef = useRef(null);
  const fileInputRef = useRef(null);

  const d = DEVICES[device];
  const c = COLORS[color];
  const isLandscape = orientation === 'landscape';
  const frameW = isLandscape ? d.height : d.width;
  const frameH = isLandscape ? d.width : d.height;

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
      link.download = `phone-mockup-${Date.now()}.png`;
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

  const renderNotch = () => {
    if (d.notch === 'dynamic-island') {
      return (
        <div style={{
          position: 'absolute', top: d.bezel + 10, left: '50%', transform: 'translateX(-50%)',
          width: 90, height: 28, borderRadius: 20, background: '#000', zIndex: 10,
        }} />
      );
    }
    if (d.notch === 'notch') {
      return (
        <div style={{
          position: 'absolute', top: d.bezel, left: '50%', transform: 'translateX(-50%)',
          width: 140, height: 30, borderRadius: '0 0 20px 20px', background: c.frame, zIndex: 10,
        }} />
      );
    }
    if (d.notch === 'punch-hole') {
      return (
        <div style={{
          position: 'absolute', top: d.bezel + 12, left: '50%', transform: 'translateX(-50%)',
          width: 12, height: 12, borderRadius: '50%', background: '#1a1a1a', zIndex: 10,
          border: '2px solid #333',
        }} />
      );
    }
    if (d.notch === 'home') {
      return (
        <div style={{
          position: 'absolute', bottom: d.bezel + 8, left: '50%', transform: 'translateX(-50%)',
          width: 44, height: 44, borderRadius: '50%', border: `2px solid ${c.side}`, zIndex: 10,
        }} />
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Preview */}
          <div className="flex-1 flex flex-col items-center">
            <div className="w-full overflow-auto rounded-xl border border-slate-700/50 bg-slate-900/50 p-6 flex justify-center">
              <div
                ref={captureRef}
                style={{ background: bg, padding: `${padding}px`, position: 'relative' }}
                className="inline-block"
              >
                <div style={{
                  width: frameW, height: frameH,
                  borderRadius: d.radius, background: c.frame,
                  padding: d.bezel, position: 'relative',
                  boxShadow: showShadow ? `0 25px 60px -10px rgba(0,0,0,0.5), inset 0 0 0 1px ${c.side}` : 'none',
                }}>
                  {/* Side buttons */}
                  <div style={{ position: 'absolute', left: -2, top: 100, width: 3, height: 30, background: c.side, borderRadius: '2px 0 0 2px' }} />
                  <div style={{ position: 'absolute', left: -2, top: 145, width: 3, height: 50, background: c.side, borderRadius: '2px 0 0 2px' }} />
                  <div style={{ position: 'absolute', left: -2, top: 205, width: 3, height: 50, background: c.side, borderRadius: '2px 0 0 2px' }} />
                  <div style={{ position: 'absolute', right: -2, top: 150, width: 3, height: 70, background: c.side, borderRadius: '0 2px 2px 0' }} />

                  {/* Screen */}
                  <div style={{
                    width: '100%', height: '100%',
                    borderRadius: d.screenRadius, overflow: 'hidden',
                    background: '#000', position: 'relative',
                  }}>
                    {renderNotch()}
                    {image ? (
                      <img src={image} alt="App screenshot" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        onDrop={handleDrop}
                        onDragOver={e => e.preventDefault()}
                        className="cursor-pointer"
                        style={{
                          width: '100%', height: '100%',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexDirection: 'column', gap: '8px',
                        }}
                      >
                        <div style={{ fontSize: '40px', color: '#333' }}>+</div>
                        <p style={{ color: '#555', fontSize: '12px' }}>Upload screenshot</p>
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ textAlign: 'right', paddingTop: '8px' }}>
                  <span style={{ color: 'rgba(148,163,184,0.4)', fontSize: '10px', fontFamily: 'Inter, sans-serif' }}>
                    screenshot.doaide.com
                  </span>
                </div>
              </div>
            </div>

            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />

            <div className="flex gap-3 mt-4 w-full">
              <button onClick={() => fileInputRef.current?.click()} className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">Upload Image</button>
              <button onClick={handleExport} disabled={exporting} className="flex-1 bg-brand-gold hover:bg-yellow-500 text-slate-900 font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50">
                {exporting ? 'Exporting...' : 'Download PNG'}
              </button>
              <button onClick={handleCopy} disabled={exporting} className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors disabled:opacity-50">Copy</button>
            </div>
          </div>

          {/* Controls */}
          <div className="w-full lg:w-72 space-y-4">
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Device</label>
              <div className="space-y-2">
                {DEVICES.map((dev, i) => (
                  <button
                    key={i}
                    onClick={() => setDevice(i)}
                    className={`w-full px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors ${device === i ? 'bg-brand-gold text-slate-900' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                  >
                    {dev.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Color</label>
              <div className="flex gap-2">
                {COLORS.map((col, i) => (
                  <button
                    key={i}
                    onClick={() => setColor(i)}
                    className={`w-10 h-10 rounded-full border-2 transition-colors ${color === i ? 'border-brand-gold' : 'border-transparent'}`}
                    style={{ background: col.frame }}
                    title={col.name}
                  />
                ))}
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Orientation</label>
              <div className="flex gap-2">
                <button onClick={() => setOrientation('portrait')} className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${orientation === 'portrait' ? 'bg-brand-gold text-slate-900' : 'bg-slate-700 text-slate-300'}`}>Portrait</button>
                <button onClick={() => setOrientation('landscape')} className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${orientation === 'landscape' ? 'bg-brand-gold text-slate-900' : 'bg-slate-700 text-slate-300'}`}>Landscape</button>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Padding: {padding}px</label>
              <input type="range" min="16" max="96" value={padding} onChange={e => setPadding(Number(e.target.value))} className="w-full accent-brand-gold" />
            </div>

            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-slate-300">Shadow</span>
                <div
                  className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${showShadow ? 'bg-brand-gold' : 'bg-slate-600'}`}
                  onClick={() => setShowShadow(!showShadow)}
                >
                  <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${showShadow ? 'translate-x-5' : 'translate-x-0.5'}`} />
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
