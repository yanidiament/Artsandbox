import React, { useState, useEffect } from 'react';
import { Download, Printer, X, Award, CheckCircle } from 'lucide-react';

export default function ExportModal({
  isOpen,
  onClose,
  canvasImage, // Data URL of the high-res canvas drawing
  activeModeName,
  theme,
  onExportComplete // Triggers canvas wipe and sandbox reset
}) {
  const [title, setTitle] = useState('Symphony of Chaos');
  const [artist, setArtist] = useState('Anonymous Artist');
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Set a generic random title on open to inspire the user
      const titles = [
        'Symphony of Chaos', 'Algorithmic Drift', 'Newtonian Whispers', 
        'Lévy Exploration', 'Ethereal Oscillations', 'Quantum Garden'
      ];
      setTitle(titles[Math.floor(Math.random() * titles.length)]);
      setArtist(localStorage.getItem('antigravity_artist') || 'Anonymous Artist');
      setExportSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Build the high-res museum poster canvas for physical printing
  const generatePoster = () => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const posterCanvas = document.createElement('canvas');
        // Configure standard poster size: 2400 x 3200 (sharp 300 DPI for A4/Letter size prints)
        posterCanvas.width = 2400;
        posterCanvas.height = 3200;
        const ctx = posterCanvas.getContext('2d');

        // 1. Draw premium archival gesso paper background
        ctx.fillStyle = '#faf9f6'; // Archival white paper
        ctx.fillRect(0, 0, posterCanvas.width, posterCanvas.height);

        // 2. Draw dual keyline boundary borders
        const outerMargin = 80;
        ctx.strokeStyle = '#1e1b18';
        ctx.lineWidth = 4;
        ctx.strokeRect(outerMargin, outerMargin, posterCanvas.width - outerMargin * 2, posterCanvas.height - outerMargin * 2);

        const innerMargin = 96;
        ctx.strokeStyle = 'rgba(30, 27, 24, 0.15)';
        ctx.lineWidth = 1;
        ctx.strokeRect(innerMargin, innerMargin, posterCanvas.width - innerMargin * 2, posterCanvas.height - innerMargin * 2);

        // 3. Draw high-res canvas image inside the centered matte area
        const matteTop = 160;
        const matteLeft = 160;
        const matteWidth = posterCanvas.width - matteLeft * 2;
        const matteHeight = 2200;

        // Draw shadow under the canvas artwork to simulate cardboard depth
        ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
        ctx.fillRect(matteLeft + 8, matteTop + 8, matteWidth, matteHeight);

        // Draw white board backing
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(matteLeft, matteTop, matteWidth, matteHeight);

        // Draw actual artwork scaled to cover the matte perfectly (maintain center crop)
        const imgAspect = img.width / img.height;
        const matteAspect = matteWidth / matteHeight;
        let drawWidth, drawHeight, offsetX, offsetY;

        if (imgAspect > matteAspect) {
          drawWidth = matteHeight * imgAspect;
          drawHeight = matteHeight;
          offsetX = matteLeft - (drawWidth - matteWidth) / 2;
          offsetY = matteTop;
        } else {
          drawWidth = matteWidth;
          drawHeight = matteWidth / imgAspect;
          offsetX = matteLeft;
          offsetY = matteTop - (drawHeight - matteHeight) / 2;
        }

        // Clip artwork to matte bounds
        ctx.save();
        ctx.beginPath();
        ctx.rect(matteLeft, matteTop, matteWidth, matteHeight);
        ctx.clip();
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        
        // Inner stroke inside the artwork matte border
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.lineWidth = 2;
        ctx.strokeRect(matteLeft, matteTop, matteWidth, matteHeight);
        ctx.restore();

        // 4. Draw Typography Plaque elements
        ctx.textAlign = 'center';
        ctx.fillStyle = '#1e1b18';

        // Title (Archival Serif font)
        ctx.font = 'italic bold 90px "Playfair Display", Georgia, serif';
        ctx.fillText(title, posterCanvas.width / 2, 2520);

        // Separator line
        ctx.strokeStyle = 'rgba(30, 27, 24, 0.2)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(posterCanvas.width / 2 - 150, 2570);
        ctx.lineTo(posterCanvas.width / 2 + 150, 2570);
        ctx.stroke();

        // Artist (Outfit / Sans-Serif font)
        ctx.font = '500 48px "Outfit", sans-serif';
        ctx.fillText(`CO-CREATED BY: ${artist.toUpperCase()}`, posterCanvas.width / 2, 2660);

        // Creation metadata
        ctx.font = '300 32px "Inter", sans-serif';
        ctx.fillStyle = '#6b7280';
        ctx.fillText(`Algorithmic Physics Engine: ${activeModeName}`, posterCanvas.width / 2, 2740);

        // Date
        const today = new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        ctx.fillText(`Archived on: ${today} • Antigravity Museum Sandbox`, posterCanvas.width / 2, 2800);

        // 5. Draw minor authenticity seal plaque
        ctx.font = 'bold 24px "Outfit", sans-serif';
        ctx.fillStyle = 'rgba(30, 27, 24, 0.3)';
        ctx.fillText('• ORIGINAL ARCHIVE CERTIFICATE •', posterCanvas.width / 2, 2920);

        resolve(posterCanvas.toDataURL('image/png', 1.0));
      };
      img.src = canvasImage;
    });
  };

  // Trigger download action
  const handleDownload = async () => {
    setIsExporting(true);
    localStorage.setItem('antigravity_artist', artist);

    try {
      const posterDataURL = await generatePoster();
      const link = document.createElement('a');
      link.download = `${title.toLowerCase().replace(/\s+/g, '_')}_exhibition.png`;
      link.href = posterDataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setExportSuccess(true);
      setTimeout(() => {
        onExportComplete();
        onClose();
      }, 1500);
    } catch (err) {
      console.error(err);
    } finally {
      setIsExporting(false);
    }
  };

  // Trigger print dialog
  const handlePrint = () => {
    localStorage.setItem('antigravity_artist', artist);
    
    // We open print dialogue
    window.print();

    setExportSuccess(true);
    setTimeout(() => {
      onExportComplete();
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/75 backdrop-blur-md select-none export-modal-overlay-bg">
      <div className="relative w-full max-w-5xl bg-stone-100 dark:bg-stone-900 border border-stone-200/20 rounded-2xl flex flex-col md:flex-row shadow-2xl animate-fade-in-scale overflow-hidden">
        
        {/* Left Side: Museum Matte & Frame Visualizer */}
        <div className="flex-1 bg-stone-200/50 dark:bg-stone-950 p-6 md:p-10 flex items-center justify-center border-b md:border-b-0 md:border-r border-stone-200/25">
          <div className="w-full max-w-md aspect-[3/4] bg-[#faf9f6] text-[#1e1b18] border-8 border-amber-900/90 rounded-sm p-6 flex flex-col justify-between shadow-2xl relative frame-shadow select-none">
            {/* Wooden frame inner highlight */}
            <div className="absolute inset-0 border border-amber-950/40 pointer-events-none" />

            {/* Inner Matte border lines */}
            <div className="flex-1 border border-stone-900/10 p-2 flex flex-col relative">
              
              {/* Artwork matte area */}
              <div className="flex-1 bg-white border border-stone-950/20 shadow-[0_2px_10px_rgba(0,0,0,0.1)_inset] relative overflow-hidden select-none">
                {canvasImage && (
                  <img 
                    src={canvasImage} 
                    alt="Exhibition Preview" 
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Plaque block details */}
              <div className="pt-4 text-center select-none">
                <h3 className="font-serif-display italic font-bold text-[14px] leading-tight max-w-[280px] mx-auto truncate text-neutral-800">
                  {title || 'Untitled Composition'}
                </h3>
                <div className="w-12 h-[1px] bg-neutral-900/20 mx-auto my-1" />
                <p className="font-display font-medium text-[8px] tracking-wider text-neutral-600">
                  CO-CREATED BY: {artist.toUpperCase() || 'ANONYMOUS'}
                </p>
                <p className="font-sans text-[6px] tracking-wide text-neutral-400 mt-0.5">
                  {activeModeName} Engine • Antigravity Museum
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Right Side: Curator Console Controls */}
        <div className="w-full md:w-96 p-6 md:p-10 flex flex-col justify-between gap-6">
          
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-500" />
              <h2 className="font-display font-bold text-base tracking-wide text-neutral-800 dark:text-neutral-100 uppercase">
                Curator Panel
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="p-1 rounded-full hover:bg-neutral-500/15 text-neutral-500 dark:hover:bg-neutral-800 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Exhibition Stamping Fields */}
          {exportSuccess ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-3.5 py-10">
              <CheckCircle className="w-16 h-16 text-emerald-500 animate-bounce" />
              <h3 className="font-display font-bold text-sm tracking-wide text-neutral-800 dark:text-neutral-100 uppercase">
                Artwork Archived Successfully!
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-[280px] leading-relaxed">
                Your exhibition copy is exporting. The gallery sandbox is wiping clean and resetting for the next piece...
              </p>
            </div>
          ) : (
            <div className="flex-1 flex flex-col gap-5 justify-center">
              
              <div className="space-y-4 p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10">
                <p className="text-[11px] leading-relaxed text-neutral-500 dark:text-neutral-400">
                  Submit this proposal to the Museum Registry. Enter an Exhibition Title and your Artist Name to stamp the print plaque.
                </p>
              </div>

              {/* Title Input */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold tracking-widest text-neutral-400 font-mono uppercase block">
                  Exhibition Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={36}
                  className="w-full py-1.5 px-0 text-sm museum-input font-serif-display italic border-b border-neutral-300 dark:border-neutral-700 bg-transparent text-neutral-800 dark:text-neutral-100 focus:outline-none focus:border-indigo-500"
                  placeholder="e.g. Symphony of Chaos"
                />
              </div>

              {/* Artist Input */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold tracking-widest text-neutral-400 font-mono uppercase block">
                  Artist Identity
                </label>
                <input
                  type="text"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  maxLength={24}
                  className="w-full py-1.5 px-0 text-sm museum-input font-display font-medium border-b border-neutral-300 dark:border-neutral-700 bg-transparent text-neutral-800 dark:text-neutral-100 focus:outline-none focus:border-indigo-500"
                  placeholder="e.g. Yani"
                />
              </div>

            </div>
          )}

          {/* Action Footer */}
          {!exportSuccess && (
            <div className="flex flex-col gap-2.5">
              
              {/* High-res download PNG */}
              <button
                onClick={handleDownload}
                disabled={isExporting}
                className="w-full py-3 px-4 rounded-xl bg-indigo-600 text-white font-display font-semibold tracking-wide text-xs hover:bg-indigo-700 transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/10 cursor-pointer disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>{isExporting ? 'Generating Plaque...' : 'Export High-Res Poster (PNG)'}</span>
              </button>

              {/* Native Print */}
              <button
                onClick={handlePrint}
                className="w-full py-3 px-4 rounded-xl border border-neutral-300 dark:border-neutral-700 font-display font-semibold tracking-wide text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-500/10 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Exhibition Copy</span>
              </button>

              <button
                onClick={onClose}
                className="w-full py-2 px-4 text-center text-[10px] text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition cursor-pointer"
              >
                Continue Designing / Seguir Co-creando
              </button>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
