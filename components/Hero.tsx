import React, { useEffect, useState } from 'react';
import { PlayCircle, ArrowRight, Zap } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import Waveform from './Waveform';

interface HeroProps {
  onCta: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCta }) => {
  const [heroImage, setHeroImage] = useState<string | null>(null);

  useEffect(() => {
    const generateHeroImage = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [
              { text: 'Create a wide cinematic hero banner for a premium AI music creation platform. Dark gradient background (black → deep blue → violet). Soft floating particles and dynamic soundwave light trails across the screen. A subtle glowing music waveform in the center, blending into mist-like neon energy. Style: Apple product launch × futuristic digital art × high-end audio visualization. Lighting: soft, volumetric, elegant. Mood: emotional, inspiring, premium, modern, technological. Ultra high resolution, 21:9 ratio.' }
            ]
          },
          config: {
            imageConfig: {
              aspectRatio: '16:9' // Closest supported ratio to 21:9
            }
          }
        });

        if (response.candidates?.[0]?.content?.parts) {
          for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
              const base64String = part.inlineData.data;
              setHeroImage(`data:image/png;base64,${base64String}`);
              break;
            }
          }
        }
      } catch (error) {
        console.error("Failed to generate hero image:", error);
      }
    };

    generateHeroImage();
  }, []);

  return (
    <section className="relative overflow-hidden min-h-[85vh] flex items-center justify-center">
      
      {/* Background Layer */}
      <div className="absolute inset-0 flex items-center justify-center z-0 overflow-hidden">
        
        {/* 1. Loading State: Dynamic Waveform */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${heroImage ? 'opacity-0' : 'opacity-40'}`}>
            <div className="w-full h-64 md:h-96 max-w-7xl">
                <Waveform />
            </div>
        </div>

        {/* 2. Success State: AI Generated Image */}
        {heroImage && (
             <div className="absolute inset-0 animate-fade-in opacity-0" style={{ animationFillMode: 'forwards' }}>
                 <img 
                    src={heroImage} 
                    alt="AI Generated Soundscape" 
                    className="w-full h-full object-cover opacity-70 mix-blend-screen"
                 />
                 {/* Gradient Overlays for Text Readability */}
                 <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#0f172a]/20 to-[#0f172a]"></div>
                 <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0f172a]/40 to-[#0f172a]"></div>
             </div>
        )}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center pt-10 text-center">
        
        <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 shadow-2xl animate-fade-in-up hover:bg-white/10 transition-colors cursor-default">
            <Zap className="w-4 h-4 text-brand-cyan mr-2 fill-current" />
            <span className="text-sm font-semibold text-slate-200 tracking-wide">AI 驱动 · 录音室品质 · 24H极速交付</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-6 leading-[1.15] drop-shadow-xl relative">
          当情感有了音色<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-white to-brand-pink animate-gradient-x">
            每段人生都有和弦
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-3xl leading-relaxed font-medium">
          你的故事独一无二，为你写下独有的乐章。
          <br className="hidden md:block" />
          用 <span className="text-white font-bold">行业领先的 AI 技术</span>，打造专属于你的爆款 BGM。
        </p>

        <div className="flex flex-col sm:flex-row gap-5 mb-20 w-full sm:w-auto">
          <button 
            onClick={onCta}
            className="group relative px-10 py-5 bg-gradient-to-r from-brand-cyan to-brand-pink text-white rounded-full font-bold text-lg hover:shadow-[0_10px_30px_rgba(42,240,234,0.3)] transition-all duration-300 transform hover:-translate-y-1"
          >
            <span className="relative z-10 flex items-center justify-center">
              立即开始定制 <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          
          <button 
            className="px-10 py-5 rounded-full font-bold text-lg text-white border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all flex items-center justify-center hover:border-brand-pink/50 hover:shadow-[0_0_20px_rgba(255,0,80,0.2)]"
          >
            <PlayCircle className="w-5 h-5 mr-2" />
            试听热门案例
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 md:gap-24 w-full max-w-4xl border-t border-white/10 pt-10 backdrop-blur-sm bg-black/10 rounded-3xl mt-8">
            {[
                { label: '极速交付', value: '24H' },
                { label: '原创好评', value: 'High' },
                { label: '商用授权', value: 'Lifetime' },
            ].map((item, i) => (
                <div key={i} className="flex flex-col items-center py-4">
                    <span className="text-3xl md:text-5xl font-black text-white mb-2">{item.value}</span>
                    <span className="text-xs md:text-sm text-slate-500 font-bold uppercase tracking-widest">{item.label}</span>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};
export default Hero;