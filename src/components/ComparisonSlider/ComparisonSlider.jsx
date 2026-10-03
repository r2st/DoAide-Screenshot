import { useState, useRef, useCallback, useEffect } from 'react';
import { toPng } from 'html-to-image';

const GRADIENTS = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  'linear-gradient(135deg, #0c3483 0%, #a2b6df 100%)',
  'linear-gradient(135deg, #334155 0%, #1e293b 100%)',
];

export default function ComparisonSlider() {
  const [beforeImage, setBeforeImage] = useState(null);
  const [afterImage, setAfterImage] = useState(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [showLabels, setShowLabels] = useState(true);
  const [bgType, setBgType] = useState('gradient');
  const [bgColor, setBgColor] = useState('#1e293b');
  const [bgGradient, setBgGradient] = useState(GRADIENTS[0]);
  const [padding, setPadding] = useState(32);
  const [borderRadius, setBorderRadius] = useState(12);
  const [isDragging, setIsDragging] = useState(false);
  const [exporting, setExporting] = useState(false);

  const captureRef = useRef(null);
  const sliderRef = useRef(null);
  const beforeInputRef = useRef(null);
  const afterInputRef = useRef(null);

  const handleImageUpload = (setter) => (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setter(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (setter) => (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (ev) => setter(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const updateSliderPos = useCallback((clientX) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pct);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) updateSliderPos(e.clientX);
    };
    const handleMouseUp = () => setIsDragging(false);
    const handleTouchMove = (e) => {
      if (isDragging) updateSliderPos(e.touches[0].clientX);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, updateSliderPos]);

  const handleExport = useCallback(async () => {
    if (!captureRef.current) return;
    setExporting(true);
    try {
      const dataUrl = await toPng(captureRef.current, { pixelRatio: 2, cacheBust: true });
      const link = document.createElement('a');
      link.download = `comparison-${Date.now()}.png`;
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
  const hasImages = beforeImage && afterImage;

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Preview */}
          <div className="flex-1 flex flex-col items-center">
            <div className="w-full overflow-auto rounded-xl border border-slate-700/50 bg-slate-900/50 p-4">
              {!hasImages ? (
                <div className="flex gap-4 justify-center py-8">
                  <div
                    onClick={() => beforeInputRef.current?.click()}
                    onDrop={handleDrop(setBeforeImage)}
                    onDragOver={e => e.preventDefault()}
                    className="w-64 h-48 border-2 border-dashed border-slate-600 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-brand-gold/50 transition-colors"
                  >
                    <div className="text-4xl text-slate-500 mb-2">+</div>
                    <p className="text-slate-400 text-sm font-medium">Before Image</p>
                    <p className="text-slate-500 text-xs mt-1">Click or drag</p>
                  </div>
                  <div
                    onClick={() => afterInputRef.current?.click()}
                    onDrop={handleDrop(setAfterImage)}
                    onDragOver={e => e.preventDefault()}
                    className="w-64 h-48 border-2 border-dashed border-slate-600 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-brand-gold/50 transition-colors"
                  >
                    <div className="text-4xl text-slate-500 mb-2">+</div>
                    <p className="text-slate-400 text-sm font-medium">After Image</p>
                    <p className="text-slate-500 text-xs mt-1">Click or drag</p>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center">
                  <div
                    ref={captureRef}
                    style={{ background: bg, padding: `${padding}px`, position: 'relative' }}
                    className="inline-block"
                  >
                    <div
                      ref={sliderRef}
                      style={{
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: `${borderRadius}px`,
                        userSelect: 'none',
                        cursor: 'col-resize',
                      }}
                      onMouseDown={(e) => { setIsDragging(true); updateSliderPos(e.clientX); }}
                      onTouchStart={(e) => { setIsDragging(true); updateSliderPos(e.touches[0].clientX); }}
                    >
                      {/* After (bottom layer) */}
                      <img src={afterImage} alt="After" style={{ display: 'block', maxWidth: '700px', width: '100%', pointerEvents: 'none' }} />

                      {/* Before (clipped) */}
                      <div style={{
                        position: 'absolute', top: 0, left: 0, bottom: 0,
                        width: `${sliderPos}%`, overflow: 'hidden',
                      }}>
                        <img src={beforeImage} alt="Before" style={{ display: 'block', maxWidth: '700px', width: `${100 / (sliderPos / 100)}%`, maxHeight: '100%', pointerEvents: 'none' }} />
                      </div>

                      {/* Divider */}
                      <div style={{
                        position: 'absolute', top: 0, bottom: 0,
                        left: `${sliderPos}%`, transform: 'translateX(-50%)',
                        width: '3px', background: '#fff',
                        boxShadow: '0 0 8px rgba(0,0,0,0.5)',
                      }}>
                        <div style={{
                          position: 'absolute', top: '50%', left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: 36, height: 36, borderRadius: '50%',
                          background: '#fff', display: 'flex',
                          alignItems: 'center', justifyContent: 'center',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                          fontSize: '14px', color: '#333', fontWeight: 'bold',
                        }}>
                          &#8596;
                        </div>
                      </div>

                      {/* Labels */}
                      {showLabels && (
                        <>
                          <div style={{
                            position: 'absolute', top: 12, left: 12,
                            background: 'rgba(0,0,0,0.6)', color: '#fff',
                            padding: '4px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600,
                          }}>
                            Before
                          </div>
                          <div style={{
                            position: 'absolute', top: 12, right: 12,
                            background: 'rgba(0,0,0,0.6)', color: '#fff',
                            padding: '4px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600,
                          }}>
                            After
                          </div>
                        </>
                      )}
                    </div>
                    <div style={{ textAlign: 'right', paddingTop: '8px' }}>
                      <span style={{ color: 'rgba(148,163,184,0.4)', fontSize: '10px', fontFamily: 'Inter, sans-serif' }}>
                        screenshot.doaide.com
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <input ref={beforeInputRef} type="file" accept="image/*" onChange={handleImageUpload(setBeforeImage)} className="hidden" />
            <input ref={afterInputRef} type="file" accept="image/*" onChange={handleImageUpload(setAfterImage)} className="hidden" />

            <div className="flex gap-3 mt-4 w-full">
              <button onClick={() => { beforeInputRef.current?.click(); }} className="px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm">Before</button>
              <button onClick={() => { afterInputRef.current?.click(); }} className="px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm">After</button>
              <button onClick={handleExport} disabled={exporting || !hasImages} className="flex-1 bg-brand-gold hover:bg-yellow-500 text-slate-900 font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50">
                {exporting ? 'Exporting...' : 'Download PNG'}
              </button>
              <button onClick={handleCopy} disabled={exporting || !hasImages} className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors disabled:opacity-50">Copy</button>
            </div>
          </div>

          {/* Controls */}
          <div className="w-full lg:w-72 space-y-4">
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Slider Position: {Math.round(sliderPos)}%</label>
              <input type="range" min="0" max="100" value={sliderPos} onChange={e => setSliderPos(Number(e.target.value))} className="w-full accent-brand-gold" />
            </div>

            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-slate-300">Show Labels</span>
                <div
                  className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${showLabels ? 'bg-brand-gold' : 'bg-slate-600'}`}
                  onClick={() => setShowLabels(!showLabels)}
                >
                  <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${showLabels ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </div>
              </label>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Padding: {padding}px</label>
              <input type="range" min="0" max="64" value={padding} onChange={e => setPadding(Number(e.target.value))} className="w-full accent-brand-gold" />
            </div>

            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Border Radius: {borderRadius}px</label>
              <input type="range" min="0" max="32" value={borderRadius} onChange={e => setBorderRadius(Number(e.target.value))} className="w-full accent-brand-gold" />
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
