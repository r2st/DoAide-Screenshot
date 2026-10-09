import { useState, useRef, useCallback, useEffect } from 'react';

const TOOLS = [
  { id: 'rect', label: 'Rectangle', icon: '□' },
  { id: 'circle', label: 'Circle', icon: '○' },
  { id: 'arrow', label: 'Arrow', icon: '→' },
  { id: 'line', label: 'Line', icon: '—' },
  { id: 'freehand', label: 'Draw', icon: '✎' },
  { id: 'highlight', label: 'Highlight', icon: '\u{1F7E8}' },
  { id: 'text', label: 'Text', icon: 'T' },
  { id: 'blur', label: 'Blur', icon: '▨' },
];

const COLORS = [
  '#ef4444', '#f97316', '#eab308', '#22c55e',
  '#3b82f6', '#8b5cf6', '#ec4899', '#ffffff',
  '#000000', '#64748b',
];

export default function ImageAnnotator() {
  const [image, setImage] = useState(null);
  const [imgDims, setImgDims] = useState({ w: 0, h: 0 });
  const [tool, setTool] = useState('rect');
  const [color, setColor] = useState('#ef4444');
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [annotations, setAnnotations] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const [currentAnnotation, setCurrentAnnotation] = useState(null);
  const [textInput, setTextInput] = useState('');
  const [textPos, setTextPos] = useState(null);
  const [exporting, setExporting] = useState(false);

  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const maxW = 900;
        const scale = img.width > maxW ? maxW / img.width : 1;
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        setImgDims({ w, h });
        imgRef.current = img;
        setImage(ev.target.result);
        setAnnotations([]);
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
      fileInputRef.current.files = dt.files;
      handleUpload({ target: { files: [file] } });
    }
  };

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imgRef.current) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imgRef.current, 0, 0, imgDims.w, imgDims.h);

    const allAnnotations = currentAnnotation ? [...annotations, currentAnnotation] : annotations;

    allAnnotations.forEach(a => {
      ctx.strokeStyle = a.color;
      ctx.fillStyle = a.color;
      ctx.lineWidth = a.strokeWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      switch (a.type) {
        case 'rect':
          ctx.strokeRect(a.x, a.y, a.w, a.h);
          break;
        case 'circle': {
          const rx = Math.abs(a.w) / 2;
          const ry = Math.abs(a.h) / 2;
          ctx.beginPath();
          ctx.ellipse(a.x + a.w / 2, a.y + a.h / 2, rx, ry, 0, 0, Math.PI * 2);
          ctx.stroke();
          break;
        }
        case 'arrow': {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(a.x2, a.y2);
          ctx.stroke();
          const angle = Math.atan2(a.y2 - a.y, a.x2 - a.x);
          const headLen = 16;
          ctx.beginPath();
          ctx.moveTo(a.x2, a.y2);
          ctx.lineTo(a.x2 - headLen * Math.cos(angle - 0.4), a.y2 - headLen * Math.sin(angle - 0.4));
          ctx.moveTo(a.x2, a.y2);
          ctx.lineTo(a.x2 - headLen * Math.cos(angle + 0.4), a.y2 - headLen * Math.sin(angle + 0.4));
          ctx.stroke();
          break;
        }
        case 'line':
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(a.x2, a.y2);
          ctx.stroke();
          break;
        case 'freehand':
          if (a.points.length < 2) break;
          ctx.beginPath();
          ctx.moveTo(a.points[0].x, a.points[0].y);
          a.points.forEach(p => ctx.lineTo(p.x, p.y));
          ctx.stroke();
          break;
        case 'highlight':
          ctx.fillStyle = a.color + '40';
          ctx.fillRect(a.x, a.y, a.w, a.h);
          break;
        case 'text':
          ctx.font = `bold ${a.fontSize}px Inter, system-ui, sans-serif`;
          ctx.fillText(a.text, a.x, a.y);
          break;
        case 'blur': {
          const bx = Math.min(a.x, a.x + a.w);
          const by = Math.min(a.y, a.y + a.h);
          const bw = Math.abs(a.w);
          const bh = Math.abs(a.h);
          if (bw > 0 && bh > 0) {
            const imgData = ctx.getImageData(bx, by, bw, bh);
            const size = 10;
            for (let py = 0; py < bh; py += size) {
              for (let px = 0; px < bw; px += size) {
                let r = 0, g = 0, b = 0, count = 0;
                for (let dy = 0; dy < size && py + dy < bh; dy++) {
                  for (let dx = 0; dx < size && px + dx < bw; dx++) {
                    const idx = ((py + dy) * bw + (px + dx)) * 4;
                    r += imgData.data[idx];
                    g += imgData.data[idx + 1];
                    b += imgData.data[idx + 2];
                    count++;
                  }
                }
                r = Math.round(r / count);
                g = Math.round(g / count);
                b = Math.round(b / count);
                for (let dy = 0; dy < size && py + dy < bh; dy++) {
                  for (let dx = 0; dx < size && px + dx < bw; dx++) {
                    const idx = ((py + dy) * bw + (px + dx)) * 4;
                    imgData.data[idx] = r;
                    imgData.data[idx + 1] = g;
                    imgData.data[idx + 2] = b;
                  }
                }
              }
            }
            ctx.putImageData(imgData, bx, by);
          }
          break;
        }
      }
    });
  }, [annotations, currentAnnotation, imgDims]);

  useEffect(() => { redraw(); }, [redraw]);

  const getPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY };
  };

  const handlePointerDown = (e) => {
    e.preventDefault();
    const pos = getPos(e);

    if (tool === 'text') {
      setTextPos(pos);
      setTextInput('');
      return;
    }

    setDrawing(true);
    const base = { color, strokeWidth, type: tool };

    if (tool === 'freehand') {
      setCurrentAnnotation({ ...base, points: [pos] });
    } else if (tool === 'arrow' || tool === 'line') {
      setCurrentAnnotation({ ...base, ...pos, x2: pos.x, y2: pos.y });
    } else {
      setCurrentAnnotation({ ...base, ...pos, w: 0, h: 0 });
    }
  };

  const handlePointerMove = (e) => {
    if (!drawing || !currentAnnotation) return;
    e.preventDefault();
    const pos = getPos(e);

    setCurrentAnnotation(prev => {
      if (prev.type === 'freehand') {
        return { ...prev, points: [...prev.points, pos] };
      }
      if (prev.type === 'arrow' || prev.type === 'line') {
        return { ...prev, x2: pos.x, y2: pos.y };
      }
      return { ...prev, w: pos.x - prev.x, h: pos.y - prev.y };
    });
  };

  const handlePointerUp = () => {
    if (!drawing || !currentAnnotation) return;
    setDrawing(false);
    setAnnotations(prev => [...prev, currentAnnotation]);
    setCurrentAnnotation(null);
  };

  const handleTextSubmit = () => {
    if (!textInput.trim() || !textPos) return;
    setAnnotations(prev => [...prev, {
      type: 'text', color, strokeWidth,
      x: textPos.x, y: textPos.y,
      text: textInput, fontSize: 18 + strokeWidth * 2,
    }]);
    setTextPos(null);
    setTextInput('');
  };

  const handleUndo = () => {
    setAnnotations(prev => prev.slice(0, -1));
  };

  const handleClear = () => {
    setAnnotations([]);
  };

  const handleExport = useCallback(async () => {
    if (!canvasRef.current) return;
    setExporting(true);
    try {
      const dataUrl = canvasRef.current.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `annotated-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } finally {
      setExporting(false);
    }
  }, []);

  const handleCopy = useCallback(async () => {
    if (!canvasRef.current) return;
    setExporting(true);
    try {
      const blob = await new Promise(resolve => canvasRef.current.toBlob(resolve, 'image/png'));
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
    } catch (err) {
      console.error('Copy failed:', err);
    } finally {
      setExporting(false);
    }
  }, []);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Image Annotator</h1>
          <p className="text-slate-400 text-sm">Add arrows, shapes, text, highlights, and blur to any image</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Canvas */}
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
                  <p className="text-slate-400 text-sm font-medium mb-1">Upload an image to annotate</p>
                  <p className="text-slate-500 text-xs">Click or drag & drop</p>
                </div>
              ) : (
                <div className="flex justify-center relative">
                  <canvas
                    ref={canvasRef}
                    width={imgDims.w}
                    height={imgDims.h}
                    style={{ maxWidth: '100%', cursor: tool === 'text' ? 'text' : 'crosshair', touchAction: 'none' }}
                    onMouseDown={handlePointerDown}
                    onMouseMove={handlePointerMove}
                    onMouseUp={handlePointerUp}
                    onMouseLeave={handlePointerUp}
                    onTouchStart={handlePointerDown}
                    onTouchMove={handlePointerMove}
                    onTouchEnd={handlePointerUp}
                  />
                  {textPos && (
                    <div
                      className="absolute flex gap-1"
                      style={{
                        left: `${(textPos.x / imgDims.w) * 100}%`,
                        top: `${(textPos.y / imgDims.h) * 100}%`,
                      }}
                    >
                      <input
                        type="text"
                        value={textInput}
                        onChange={e => setTextInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleTextSubmit()}
                        autoFocus
                        placeholder="Type text..."
                        className="bg-slate-800 border border-brand-gold text-white text-sm rounded px-2 py-1 w-40 focus:outline-none"
                      />
                      <button onClick={handleTextSubmit} className="bg-brand-gold text-slate-900 text-xs px-2 rounded font-medium">Add</button>
                      <button onClick={() => setTextPos(null)} className="bg-slate-700 text-white text-xs px-2 rounded">Cancel</button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />

            <div className="flex gap-3 mt-4 w-full">
              <button onClick={() => fileInputRef.current?.click()} className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
                {image ? 'Change' : 'Upload'}
              </button>
              <button onClick={handleExport} disabled={exporting || !image} className="flex-1 bg-brand-gold hover:bg-yellow-500 text-slate-900 font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50">
                {exporting ? 'Exporting...' : 'Download PNG'}
              </button>
              <button onClick={handleCopy} disabled={exporting || !image} className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors disabled:opacity-50">Copy</button>
            </div>
          </div>

          {/* Controls */}
          <div className="w-full lg:w-72 space-y-4">
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Tool</label>
              <div className="grid grid-cols-2 gap-2">
                {TOOLS.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setTool(t.id)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${tool === t.id ? 'bg-brand-gold text-slate-900' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                  >
                    {t.icon} {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Color</label>
              <div className="grid grid-cols-5 gap-2">
                {COLORS.map(c => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`w-full h-8 rounded-md border-2 transition-colors ${color === c ? 'border-brand-gold' : 'border-transparent'}`}
                    style={{ background: c, boxShadow: c === '#000000' ? 'inset 0 0 0 1px #333' : c === '#ffffff' ? 'inset 0 0 0 1px #ccc' : 'none' }}
                  />
                ))}
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Stroke Width: {strokeWidth}px</label>
              <input type="range" min="1" max="10" value={strokeWidth} onChange={e => setStrokeWidth(Number(e.target.value))} className="w-full accent-brand-gold" />
            </div>

            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 space-y-2">
              <button onClick={handleUndo} disabled={annotations.length === 0} className="w-full px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-xs font-medium transition-colors disabled:opacity-50">
                Undo Last
              </button>
              <button onClick={handleClear} disabled={annotations.length === 0} className="w-full px-3 py-2 bg-red-900/50 hover:bg-red-900/80 text-red-300 rounded-lg text-xs font-medium transition-colors disabled:opacity-50">
                Clear All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
