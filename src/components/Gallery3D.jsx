import React, { useRef, useEffect } from 'react';
import ImageCard from './ImageCard';
import { Image as ImageIcon, Sparkles } from 'lucide-react';

export default function Gallery3D({ images = [] }) {
  const scrollContainerRef = useRef(null);

  // Auto-scroll the gallery to the bottom when a new image is added
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [images]);

  return (
    <div 
      ref={scrollContainerRef}
      className="w-full h-[78vh] bg-slate-50/50 overflow-y-auto border-b border-slate-200/80 p-6 md:p-10 select-none scroll-smooth"
    >
      {images.length === 0 ? (
        /* Empty State Suggestions Deck */
        <div className="h-full w-full flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto py-12">
          {/* Glowing Minimalist Vector Card Outline */}
          <div className="relative w-36 h-48 rounded-2xl border-2 border-dashed border-slate-200 bg-white/40 flex flex-col items-center justify-center p-6 mb-6 shadow-sm animate-fade-in-scale">
            <div className="p-3 rounded-full bg-slate-100/80 text-slate-400 border border-slate-200/30">
              <ImageIcon className="w-6 h-6 animate-pulse" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-tr from-violet-500 to-cyan-500 shadow flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white animate-spin" style={{ animationDuration: '6s' }} />
            </div>
          </div>

          <div>
            <h3 className="text-slate-800 font-display text-base md:text-lg font-bold tracking-wide">
              No Images Generated Yet
            </h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed font-sans px-4">
              Enter a prompt in the input bar below. Images are generated sequentially, maintaining visual style and layout side-by-side.
            </p>
          </div>
        </div>
      ) : (
        /* Beautiful, Flat 2D Spaced Grid */
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-8 justify-items-center">
            {images.map((image, idx) => (
              <ImageCard 
                key={image.id} 
                image={image} 
                index={idx}
                active={idx === images.length - 1}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
