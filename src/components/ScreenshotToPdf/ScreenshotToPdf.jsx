import { useState, useRef, useCallback } from 'react';
import { jsPDF } from 'jspdf';

const PAGE_SIZES = [
  { name: 'A4', width: 210, height: 297 },
  { name: 'Letter', width: 215.9, height: 279.4 },
  { name: 'A3', width: 297, height: 420 },
  { name: 'A5', width: 148, height: 210 },
];

const LAYOUTS = [
  { name: 'Fit to Page', value: 'fit' },
  { name: 'Fill Page', value: 'fill' },
  { name: 'Original Size', value: 'original' },
];

export default function ScreenshotToPdf() {
  const [images, setImages] = useState([]);
  const [pageSize, setPageSize] = useState(0);
  const [orientation, setOrientation] = useState('portrait');
  const [layout, setLayout] = useState('fit');
  const [margin, setMargin] = useState(10);
  const [exporting, setExporting] = useState(false);

  const fileInputRef = useRef(null);

  const handleUpload = (e) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const img = new Image();
        img.onload = () => {
          setImages(prev => [...prev, { src: ev.target.result, width: img.width, height: img.height, name: file.name }]);
        };
        img.src = ev.target.result;
      };
      reader.readAsDataURL(file);
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleUpload({ target: { files } });
  };

  const removeImage = (idx) => {
    setImages(prev => prev.filter((_, i) => i !== idx));
  };

  const moveImage = (idx, dir) => {
    setImages(prev => {
      const arr = [...prev];
      const target = idx + dir;
      if (target < 0 || target >= arr.length) return arr;
      [arr[idx], arr[target]] = [arr[target], arr[idx]];
      return arr;
    });
  };

  const handleExport = useCallback(async () => {
    if (images.length === 0) return;
    setExporting(true);

    try {
      const ps = PAGE_SIZES[pageSize];
      const isLandscape = orientation === 'landscape';
      const pageW = isLandscape ? ps.height : ps.width;
      const pageH = isLandscape ? ps.width : ps.height;

      const doc = new jsPDF({
        orientation: isLandscape ? 'landscape' : 'portrait',
        unit: 'mm',
        format: [ps.width, ps.height],
      });

      for (let i = 0; i < images.length; i++) {
        if (i > 0) doc.addPage();

        const img = images[i];
        const availW = pageW - margin * 2;
        const availH = pageH - margin * 2;
        const imgAspect = img.width / img.height;

        let drawW, drawH, drawX, drawY;

        if (layout === 'fit') {
          if (imgAspect > availW / availH) {
            drawW = availW;
            drawH = availW / imgAspect;
          } else {
            drawH = availH;
            drawW = availH * imgAspect;
          }
          drawX = margin + (availW - drawW) / 2;
          drawY = margin + (availH - drawH) / 2;
        } else if (layout === 'fill') {
          if (imgAspect > availW / availH) {
            drawH = availH;
            drawW = availH * imgAspect;
          } else {
            drawW = availW;
            drawH = availW / imgAspect;
          }
          drawX = margin + (availW - drawW) / 2;
          drawY = margin + (availH - drawH) / 2;
        } else {
          const pxToMm = 0.264583;
          drawW = img.width * pxToMm;
          drawH = img.height * pxToMm;
          if (drawW > availW) {
            const s = availW / drawW;
            drawW *= s;
            drawH *= s;
          }
          if (drawH > availH) {
            const s = availH / drawH;
            drawW *= s;
            drawH *= s;
          }
          drawX = margin + (availW - drawW) / 2;
          drawY = margin + (availH - drawH) / 2;
        }

        doc.addImage(img.src, 'PNG', drawX, drawY, drawW, drawH);
      }

      doc.save(`screenshots-${Date.now()}.pdf`);
    } catch (err) {
      console.error('PDF export failed:', err);
    } finally {
      setExporting(false);
    }
  }, [images, pageSize, orientation, layout, margin]);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-da-text mb-2">Screenshot to PDF</h1>
          <p className="text-da-muted text-sm">Convert one or more screenshots into a PDF document</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Images */}
          <div className="flex-1 flex flex-col items-center">
            <div
              className="w-full rounded-xl border border-da-border bg-[var(--da-input-bg)]/50 p-4"
              onDrop={handleDrop}
              onDragOver={e => e.preventDefault()}
            >
              {images.length === 0 ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center py-20 cursor-pointer"
                >
                  <div className="text-5xl text-slate-600 mb-4">+</div>
                  <p className="text-da-muted text-sm font-medium mb-1">Add screenshots to convert to PDF</p>
                  <p className="text-da-muted text-xs">Click or drag & drop multiple images</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {images.map((img, i) => (
                    <div key={i} className="flex items-center gap-3 bg-[var(--da-sidebar-bg)]/50 rounded-lg p-3 border border-da-border">
                      <div className="text-da-muted text-sm font-mono w-6 text-center">{i + 1}</div>
                      <img src={img.src} alt={img.name} className="w-16 h-12 object-cover rounded border border-da-border" />
                      <div className="flex-1 min-w-0">
                        <p className="text-da-text text-sm truncate">{img.name}</p>
                        <p className="text-da-muted text-xs">{img.width} x {img.height}</p>
                      </div>
                      <div className="flex gap-1">
                        <button onClick={() => moveImage(i, -1)} disabled={i === 0} className="w-7 h-7 bg-da-surface hover:bg-da-card-hover text-da-muted rounded text-xs disabled:opacity-30">&#9650;</button>
                        <button onClick={() => moveImage(i, 1)} disabled={i === images.length - 1} className="w-7 h-7 bg-da-surface hover:bg-da-card-hover text-da-muted rounded text-xs disabled:opacity-30">&#9660;</button>
                        <button onClick={() => removeImage(i)} className="w-7 h-7 bg-red-900/50 hover:bg-red-900/80 text-red-300 rounded text-xs">&#10005;</button>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-3 border-2 border-dashed border-da-border rounded-lg text-da-muted text-sm hover:border-brand-primary/50 transition-colors"
                  >
                    + Add More Images
                  </button>
                </div>
              )}
            </div>

            <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleUpload} className="hidden" />

            <div className="flex gap-3 mt-4 w-full">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-3 bg-da-surface hover:bg-da-card-hover text-da-text rounded-lg transition-colors"
              >
                Add Images
              </button>
              <button
                onClick={handleExport}
                disabled={exporting || images.length === 0}
                className="flex-1 bg-brand-primary hover:bg-brand-primary-hover text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
              >
                {exporting ? 'Generating...' : `Download PDF (${images.length} page${images.length !== 1 ? 's' : ''})`}
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className="w-full lg:w-72 space-y-4">
            <div className="bg-[var(--da-sidebar-bg)]/50 rounded-xl p-4 border border-da-border">
              <label className="block text-xs font-medium text-da-muted mb-2 uppercase tracking-wider">Page Size</label>
              <div className="grid grid-cols-2 gap-2">
                {PAGE_SIZES.map((ps, i) => (
                  <button
                    key={ps.name}
                    onClick={() => setPageSize(i)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${pageSize === i ? 'bg-brand-primary text-white' : 'bg-da-surface text-da-muted hover:bg-da-card-hover'}`}
                  >
                    {ps.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[var(--da-sidebar-bg)]/50 rounded-xl p-4 border border-da-border">
              <label className="block text-xs font-medium text-da-muted mb-2 uppercase tracking-wider">Orientation</label>
              <div className="flex gap-2">
                <button onClick={() => setOrientation('portrait')} className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${orientation === 'portrait' ? 'bg-brand-primary text-white' : 'bg-da-surface text-da-muted'}`}>Portrait</button>
                <button onClick={() => setOrientation('landscape')} className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${orientation === 'landscape' ? 'bg-brand-primary text-white' : 'bg-da-surface text-da-muted'}`}>Landscape</button>
              </div>
            </div>

            <div className="bg-[var(--da-sidebar-bg)]/50 rounded-xl p-4 border border-da-border">
              <label className="block text-xs font-medium text-da-muted mb-2 uppercase tracking-wider">Layout</label>
              <div className="space-y-2">
                {LAYOUTS.map(l => (
                  <button
                    key={l.value}
                    onClick={() => setLayout(l.value)}
                    className={`w-full px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors ${layout === l.value ? 'bg-brand-primary text-white' : 'bg-da-surface text-da-muted hover:bg-da-card-hover'}`}
                  >
                    {l.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[var(--da-sidebar-bg)]/50 rounded-xl p-4 border border-da-border">
              <label className="block text-xs font-medium text-da-muted mb-2 uppercase tracking-wider">Margin: {margin}mm</label>
              <input type="range" min="0" max="30" value={margin} onChange={e => setMargin(Number(e.target.value))} className="w-full accent-brand-primary" />
            </div>

            {images.length > 0 && (
              <div className="bg-[var(--da-sidebar-bg)]/50 rounded-xl p-4 border border-da-border">
                <button
                  onClick={() => setImages([])}
                  className="w-full px-3 py-2 bg-red-900/50 hover:bg-red-900/80 text-red-300 rounded-lg text-xs font-medium transition-colors"
                >
                  Clear All Images
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
