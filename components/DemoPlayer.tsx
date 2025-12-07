import React, { useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import { DemoTrack } from '../types';

interface DemoPlayerProps extends Omit<DemoTrack, 'id'> {}

const DemoPlayer: React.FC<DemoPlayerProps> = ({ title, tags, duration, category, imageUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // Mock play functionality
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return p + 1;
        });
      }, 50);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const descriptionMap: Record<string, string> = {
    'Neon Dreams': '适合品牌短片、生活方式 Vlog',
    'Morning Coffee': '适合亲子视频、纪念日回顾',
    'Epic Journey': '适合大片风格预告片、品牌故事',
    'Bamboo Forest': '适合东方美学品牌、城市形象片'
  };

  const desc = descriptionMap[title] || tags.join(' · ');

  return (
    <article className={`flex flex-col sm:flex-row rounded-[1.5rem] border p-4 items-center gap-5 transition-all duration-300 backdrop-blur-xl group
        ${isPlaying ? 'bg-white/10 border-brand-cyan/50 shadow-[0_0_20px_rgba(42,240,234,0.1)]' : 'bg-surface-glass border-white/5 hover:bg-surface-glassHigh hover:border-white/20'}
    `}>
      
      {/* Cover Art */}
      <div className="relative w-20 h-20 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg">
         <img src={imageUrl} alt={title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
         <button 
            onClick={togglePlay} 
            className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/40"
         >
             <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black shadow-xl transform scale-90 group-hover:scale-100 transition-transform">
                {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
             </div>
         </button>
      </div>

      <div className="flex-1 min-w-0 text-center sm:text-left w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
            <h3 className={`text-lg font-bold transition-colors ${isPlaying ? 'text-brand-cyan' : 'text-white'}`}>{title}</h3>
            <span className="text-xs font-mono text-slate-500">{duration}</span>
        </div>
        <p className="text-xs text-slate-400 mb-3 truncate font-medium">{desc}</p>
        
        {/* Progress Bar */}
        <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
            <div 
                className="h-full bg-gradient-to-r from-brand-cyan to-brand-pink transition-all duration-100 ease-linear shadow-[0_0_10px_rgba(42,240,234,0.5)]" 
                style={{ width: `${isPlaying ? progress : 0}%` }}
            ></div>
        </div>
      </div>
    </article>
  );
};

export default DemoPlayer;