import { useState, useRef, useCallback, useEffect } from 'react';

const ASPECT_RATIOS = [
  { name: 'Free', value: null },
  { name: '1:1', value: 1 },
  { name: '4:3', value: 4 / 3 },
  { name: '3:2', value: 3 / 2 },
  { name: '16:9', value: 16 / 9 },
  { name: '9:16', value: 9 / 16 },
  { name: '4:5', value: 4 / 5 },
  { name: '2:3', value: 2 / 3 },
];

export default function ImageCropper() {
  const [image, setImage] = useState(null);
  const [imgDims, setImgDims] = useState({ w: 0, h: 0, naturalW: 0, naturalH: 0 });
  const [crop, setCrop] = useState({ x: 0, y: 0, w: 0, h: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragMode, setDragMode] = useState(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [aspectRatio, setAspectRatio] = useState(null);
  const [quality, setQuality] = useState('png');
  const [exporting, setExporting] = useState(false);

  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const maxW = 800;
        const scale = img.width > maxW ? maxW / img.width : 1;
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        imgRef.current = img;
        setImgDims({ w, h, naturalW: img.width, naturalH: img.height });
        setCrop({ x: w * 0.1, y: h * 0.1, w: w * 0.8, h: h * 0.8 });
        setImage(ev.target.result);
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const dt = new DataTransfer();
      dt.items.add(file);
      handleUpload({ target: { files: [file] } });
    }
  };

  const constrain = useCallback((newCrop) => {
    let { x, y, w, h } = newCrop;
    w = Math.max(20, Math.min(w, imgDims.w));
    h = Math.max(20, Math.min(h, imgDims.h));
    if (aspectRatio) {
      h = w / aspectRatio;
      if (h > imgDims.h) {
        h = imgDims.h;
        w = h * aspectRatio;
      }
    }
    x = Math.max(0, Math.min(x, imgDims.w - w));
    y = Math.max(0, Math.min(y, imgDims.h - h));
    return { x, y, w, h };
  }, [imgDims, aspectRatio]);

  const getRelPos = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const handlePointerDown = (e, mode) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
    setDragMode(mode);
    setDragStart(getRelPos(e));
  };

  useEffect(() => {
    if (!dragging) return;

    const handleMove = (e) => {
      const pos = getRelPos(e);
      const dx = pos.x - dragStart.x;
      const dy = pos.y - dragStart.y;
      setDragStart(pos);

      setCrop(prev => {
        if (dragMode === 'move') {
          return constrain({ ...prev, x: prev.x + dx, y: prev.y + dy });
        }
        let newCrop = { ...prev };
        if (dragMode.includes('e')) newCrop.w = prev.w + dx;
        if (dragMode.includes('w')) { newCrop.x = prev.x + dx; newCrop.w = prev.w - dx; }
        if (dragMode.includes('s')) newCrop.h = prev.h + dy;
        if (dragMode.includes('n')) { newCrop.y = prev.y + dy; newCrop.h = prev.h - dy; }
        return constrain(newCrop);
      });
    };

    const handleUp = () => setDragging(false);

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('touchend', handleUp);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleUp);
    };
  }, [dragging, dragMode, dragStart, constrain]);

  useEffect(() => {
    if (!image || !imgDims.w) return;
    setCrop(prev => constrain(prev));
  }, [aspectRatio, constrain, image, imgDims]);

  const handleExport = useCallback(async () => {
    if (!imgRef.current) return;
    setExporting(true);
    try {
      const scaleX = imgDims.naturalW / imgDims.w;
      const scaleY = imgDims.naturalH / imgDims.h;
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(crop.w * scaleX);
      canvas.height = Math.round(crop.h * scaleY);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(
        imgRef.current,
        crop.x * scaleX, crop.y * scaleY,
        crop.w * scaleX, crop.h * scaleY,
        0, 0, canvas.width, canvas.height
      );
      const mimeType = quality === 'jpg' ? 'image/jpeg' : 'image/png';
      const ext = quality === 'jpg' ? 'jpg' : 'png';
      const dataUrl = canvas.toDataURL(mimeType, 0.92);
      const link = document.createElement('a');
      link.download = `cropped-${Date.now()}.${ext}`;
      link.href = dataUrl;
      link.click();
    } finally {
      setExporting(false);
    }
  }, [crop, imgDims, quality]);

  const handleCopy = useCallback(async () => {
    if (!imgRef.current) return;
    setExporting(true);
    try {
      const scaleX = imgDims.naturalW / imgDims.w;
      const scaleY = imgDims.naturalH / imgDims.h;
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(crop.w * scaleX);
      canvas.height = Math.round(crop.h * scaleY);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(
        imgRef.current,
        crop.x * scaleX, crop.y * scaleY,
        crop.w * scaleX, crop.h * scaleY,
        0, 0, canvas.width, canvas.height
      );
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
    } catch (err) {
      console.error('Copy failed:', err);
    } finally {
      setExporting(false);
    }
  }, [crop, imgDims]);

  const cropInfo = image && imgDims.w ? {
    scaleX: imgDims.naturalW / imgDims.w,
    scaleY: imgDims.naturalH / imgDims.h,
    outputW: Math.round(crop.w * (imgDims.naturalW / imgDims.w)),
    outputH: Math.round(crop.h * (imgDims.naturalH / imgDims.h)),
  } : null;

  const handles = ['nw', 'ne', 'sw', 'se', 'n', 's', 'e', 'w'];
  const handleStyle = (pos) => {
    const base = { position: 'absolute', width: 12, height: 12, background: '#F0B429', border: '2px solid #fff', zIndex: 10 };
    const map = {
      nw: { top: -6, left: -6, cursor: 'nw-resize' },
      ne: { top: -6, right: -6, cursor: 'ne-resize' },
      sw: { bottom: -6, left: -6, cursor: 'sw-resize' },
      se: { bottom: -6, right: -6, cursor: 'se-resize' },
      n: { top: -6, left: '50%', marginLeft: -6, cursor: 'n-resize' },
      s: { bottom: -6, left: '50%', marginLeft: -6, cursor: 's-resize' },
      e: { top: '50%', right: -6, marginTop: -6, cursor: 'e-resize' },
      w: { top: '50%', left: -6, marginTop: -6, cursor: 'w-resize' },
    };
    return { ...base, ...map[pos] };
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Image Cropper</h1>
          <p className="text-slate-400 text-sm">Crop images to any size or aspect ratio, then download</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Preview */}
          <div className="flex-1 flex flex-col items-center">
            <div className="w-full overflow-auto rounded-xl border border-slate-700/50 bg-slate-900/50 p-4">
              {!image ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={e => e.preventDefault()}
                  className="flex flex-col items-center justify-center py-20 cursor-pointer"
                >
                  <div className="text-5xl text-slate-600 mb-4">+</div>
                  <p className="text-slate-400 text-sm font-medium mb-1">Upload an image to crop</p>
                  <p className="text-slate-500 text-xs">Click or drag & drop</p>
                </div>
              ) : (
                <div className="flex justify-center">
                  <div
                    ref={containerRef}
                    style={{ position: 'relative', width: imgDims.w, height: imgDims.h, touchAction: 'none' }}
                  >
                    <img src={image} alt="Source" style={{ display: 'block', width: imgDims.w, height: imgDims.h, pointerEvents: 'none' }} />
                    {/* Dim overlay */}
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', pointerEvents: 'none' }}>
                      <div style={{
                        position: 'absolute',
                        left: crop.x, top: crop.y,
                        width: crop.w, height: crop.h,
                        background: 'transparent',
                        boxShadow: '0 0 0 9999px rgba(0,0,0,0.5)',
                      }} />
                    </div>
                    {/* Crop area */}
                    <div
                      style={{
                        position: 'absolute',
                        left: crop.x, top: crop.y,
                        width: crop.w, height: crop.h,
                        border: '2px solid #F0B429',
                        cursor: 'move',
                      }}
                      onMouseDown={(e) => handlePointerDown(e, 'move')}
                      onTouchStart={(e) => handlePointerDown(e, 'move')}
                    >
                      {/* Grid lines */}
                      <div style={{ position: 'absolute', left: '33.33%', top: 0, bottom: 0, width: 1, background: 'rgba(240,180,41,0.4)' }} />
                      <div style={{ position: 'absolute', left: '66.66%', top: 0, bottom: 0, width: 1, background: 'rgba(240,180,41,0.4)' }} />
                      <div style={{ position: 'absolute', top: '33.33%', left: 0, right: 0, height: 1, background: 'rgba(240,180,41,0.4)' }} />
                      <div style={{ position: 'absolute', top: '66.66%', left: 0, right: 0, height: 1, background: 'rgba(240,180,41,0.4)' }} />
                      {handles.map(h => (
                        <div
                          key={h}
                          style={handleStyle(h)}
                          onMouseDown={(e) => handlePointerDown(e, h)}
                          onTouchStart={(e) => handlePointerDown(e, h)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />

            <div className="flex gap-3 mt-4 w-full">
              <button onClick={() => fileInputRef.current?.click()} className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
                {image ? 'Change' : 'Upload'}
              </button>
              <button onClick={handleExport} disabled={exporting || !image} className="flex-1 bg-brand-gold hover:bg-yellow-500 text-slate-900 font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50">
                {exporting ? 'Exporting...' : `Download ${quality.toUpperCase()}`}
              </button>
              <button onClick={handleCopy} disabled={exporting || !image} className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors disabled:opacity-50">Copy</button>
            </div>
          </div>

          {/* Controls */}
          <div className="w-full lg:w-72 space-y-4">
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Aspect Ratio</label>
              <div className="grid grid-cols-2 gap-2">
                {ASPECT_RATIOS.map(ar => (
                  <button
                    key={ar.name}
                    onClick={() => setAspectRatio(ar.value)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${aspectRatio === ar.value ? 'bg-brand-gold text-slate-900' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                  >
                    {ar.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Format</label>
              <div className="flex gap-2">
                {['png', 'jpg'].map(f => (
                  <button
                    key={f}
                    onClick={() => setQuality(f)}
                    className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors uppercase ${quality === f ? 'bg-brand-gold text-slate-900' : 'bg-slate-700 text-slate-300'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {cropInfo && (
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Output</label>
                <p className="text-white text-sm">{cropInfo.outputW} x {cropInfo.outputH} px</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
