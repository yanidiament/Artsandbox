import React, { useState, useRef } from 'react';
import { Send, Loader2, Sparkles } from 'lucide-react';

export default function ChatInterface({ 
  onSendMessage, 
  isGenerating = false 
}) {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim() || isGenerating) return;
    
    onSendMessage(inputText.trim());
    setInputText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full h-[16vh] min-h-[95px] flex flex-col justify-center bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-[0_-8px_30px_rgba(15,23,42,0.03)] px-4 md:px-8 relative z-20">
      
      {/* Visual Status Indicator / Loading Row */}
      <div className="max-w-3xl w-full mx-auto h-5 mb-1.5 flex items-center justify-between text-[11px] font-medium font-sans">
        {isGenerating ? (
          <div className="flex items-center gap-1.5 text-violet-600 animate-pulse">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Fusing visual context and synthesizing image...</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[9px] tracking-wider">
            <Sparkles className="w-3 h-3 text-violet-400" />
            <span>READY TO SYNTHESIZE</span>
          </div>
        )}
        <span className="hidden sm:inline text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold">Imagen chat v2.0</span>
      </div>

      {/* Input Deck Row */}
      <div className="max-w-3xl w-full mx-auto">
        <form onSubmit={handleSubmit} className="flex gap-3.5 items-center">
          <div className="relative flex-1 rounded-2xl overflow-hidden bg-slate-50 border border-slate-200/80 focus-within:border-violet-400 focus-within:shadow-[0_0_15px_rgba(139,92,246,0.12)] focus-within:bg-white transition-all duration-200">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isGenerating}
              placeholder="Describe a new prompt (e.g. 'Astronaut opening a glowing chest'...)"
              rows={1}
              className="w-full bg-transparent px-4.5 py-3 md:py-3.5 pr-12 text-sm text-slate-800 placeholder-slate-400 focus:outline-none resize-none min-h-[46px] max-h-[70px] font-sans leading-relaxed"
              style={{ height: 'auto' }}
            />
          </div>

          <button
            type="submit"
            disabled={!inputText.trim() || isGenerating}
            className={`p-3 md:p-3.5 rounded-2xl font-semibold flex items-center justify-center transition-all duration-200 ${
              !inputText.trim() || isGenerating
                ? 'bg-slate-100 text-slate-350 border border-transparent cursor-not-allowed'
                : 'bg-gradient-to-tr from-cyan-500 to-violet-500 hover:from-cyan-600 hover:to-violet-600 text-white border border-violet-400/25 hover:shadow-[0_6px_20px_rgba(139,92,246,0.25)] active:scale-95'
            }`}
          >
            <Send className="w-4.5 h-4.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
