import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function ImageCard({ image }) {
  const [showLightbox, setShowLightbox] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <>
      {/* Pristine 2D Card Element (Only the Image) */}
      <div
        className="relative w-full aspect-[3/4] max-w-[180px] rounded-2xl overflow-hidden bg-white border border-slate-200/70 shadow-sm cursor-pointer transition-all duration-300 hover:border-violet-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:scale-[1.03] animate-fade-in-scale group"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setShowLightbox(true)}
      >
        {/* Actual Generated Image */}
        <img
          src={image.url}
          alt={image.prompt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Delicate Border Light Glow Effect on Hover */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-violet-400/35 rounded-2xl transition-colors duration-300 pointer-events-none" />
      </div>

      {/* Pure Image-Only Lightbox Overlay */}
      <AnimatePresence>
        {showLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-6 bg-slate-900/60 backdrop-blur-md"
            onClick={() => setShowLightbox(false)}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowLightbox(false)}
              className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-white/90 border border-slate-200 text-slate-600 hover:text-rose-500 shadow-md hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Immersive Image-Only Container */}
            <motion.div
              initial={{ scale: 0.94, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 15 }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="relative max-w-[90vw] max-h-[85vh] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-white p-1.5 border border-white/50"
              onClick={(e) => e.stopPropagation()} // Prevent close on image container click
            >
              <img
                src={image.url}
                alt={image.prompt}
                className="max-w-full max-h-[82vh] object-contain rounded-xl select-none"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
