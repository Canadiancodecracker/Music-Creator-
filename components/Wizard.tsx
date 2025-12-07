import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Gift, Briefcase, Music2, Mic2, FileAudio, Play, Pause } from 'lucide-react';
import { OrderState } from '../types';
import Pricing from './Pricing';

interface WizardProps {
  order: OrderState;
  updateOrder: (updates: Partial<OrderState>) => void;
  onSuccess: () => void;
}

const Wizard: React.FC<WizardProps> = ({ order, updateOrder, onSuccess }) => {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    window.scrollTo(0, 0);
    setStep(step + 1);
  };

  const handleBack = () => {
    window.scrollTo(0, 0);
    setStep(step - 1);
  };

  // Step 1: Purpose
  const PurposeStep = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black mb-2 text-white">您想创作什么样的音乐？</h2>
        <p className="text-slate-400">选择您的主要用途，让我们更懂您的需求。</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <button
          onClick={() => { updateOrder({ purpose: 'gift' }); handleNext(); }}
          className={`p-10 rounded-[2rem] border-2 transition-all flex flex-col items-center text-center gap-6 hover:scale-105 group backdrop-blur-xl
            ${order.purpose === 'gift' ? 'border-brand-pink bg-brand-pink/10 shadow-[0_0_30px_rgba(255,0,80,0.15)]' : 'border-white/5 bg-surface-glass hover:bg-surface-glassHigh hover:border-brand-pink/50'}`}
        >
          <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-colors ${order.purpose === 'gift' ? 'bg-brand-pink text-white' : 'bg-white/5 text-brand-pink group-hover:bg-brand-pink group-hover:text-white'}`}>
            <Gift className="w-9 h-9" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">情感礼物</h3>
            <p className="text-slate-400 text-sm font-medium leading-relaxed">生日祝福、婚礼配乐、表白纪念。<br/>侧重情感表达与温暖氛围。</p>
          </div>
        </button>

        <button
          onClick={() => { updateOrder({ purpose: 'business' }); handleNext(); }}
          className={`p-10 rounded-[2rem] border-2 transition-all flex flex-col items-center text-center gap-6 hover:scale-105 group backdrop-blur-xl
            ${order.purpose === 'business' ? 'border-brand-cyan bg-brand-cyan/10 shadow-[0_0_30px_rgba(42,240,234,0.15)]' : 'border-white/5 bg-surface-glass hover:bg-surface-glassHigh hover:border-brand-cyan/50'}`}
        >
          <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-colors ${order.purpose === 'business' ? 'bg-brand-cyan text-slate-900' : 'bg-white/5 text-brand-cyan group-hover:bg-brand-cyan group-hover:text-slate-900'}`}>
            <Briefcase className="w-9 h-9" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">商业用途</h3>
            <p className="text-slate-400 text-sm font-medium leading-relaxed">短视频BGM、广告配乐、企业宣传。<br/>侧重节奏感与版权合规。</p>
          </div>
        </button>
      </div>
    </div>
  );

  // Step 2: Style & Mood
  const StyleStep = () => {
    const styles = [
        { id: 'cpop', name: 'C-Pop', desc: '潮流 / 活力', color: 'from-blue-500 to-cyan-400' },
        { id: 'guofeng', name: '国风', desc: '东方 / 韵味', color: 'from-red-500 to-orange-400' },
        { id: 'lofi', name: 'Lo-Fi', desc: '惬意 / 氛围', color: 'from-indigo-400 to-purple-400' },
        { id: 'edm', name: 'EDM', desc: '电音 / 燃炸', color: 'from-fuchsia-500 to-pink-500' },
        { id: 'rock', name: '摇滚', desc: '激昂 / 力量', color: 'from-orange-500 to-red-600' },
        { id: 'folk', name: '民谣', desc: '质朴 / 叙事', color: 'from-emerald-400 to-teal-500' },
        { id: 'jazz', name: '爵士', desc: '浪漫 / 慵懒', color: 'from-violet-500 to-purple-600' },
        { id: 'piano', name: '钢琴纯音', desc: '静谧 / 治愈', color: 'from-sky-400 to-blue-500' }
    ];

    const [playingStyle, setPlayingStyle] = useState<string | null>(null);

    // Auto-stop preview simulation after 5 seconds
    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (playingStyle) {
            timer = setTimeout(() => setPlayingStyle(null), 5000);
        }
        return () => clearTimeout(timer);
    }, [playingStyle]);

    const handlePlayPreview = (e: React.MouseEvent, id: string) => {
        e.stopPropagation(); // Prevent card selection when clicking play
        if (playingStyle === id) {
            setPlayingStyle(null);
        } else {
            setPlayingStyle(id);
        }
    };
    
    const toggleStyle = (s: string) => {
      const current = order.style;
      if (current.includes(s)) {
        updateOrder({ style: current.filter(i => i !== s) });
      } else {
        if (current.length < 3) {
            updateOrder({ style: [...current, s] });
        }
      }
    };

    return (
      <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-black mb-2 text-white">定义风格与情绪</h2>
        </div>

        {/* Mood Slider */}
        <div className="bg-surface-glass backdrop-blur-xl p-8 rounded-[1.5rem] border border-white/10">
          <label className="block text-sm font-bold text-white mb-6 uppercase tracking-wider">情绪基调 (Mood)</label>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-4 font-medium">
            <span>冷静 / 忧伤</span>
            <span>平静 / 叙事</span>
            <span>活力 / 兴奋</span>
          </div>
          <div className="relative w-full h-2 bg-white/10 rounded-full">
             <input 
                type="range" 
                min="0" 
                max="100" 
                value={order.mood} 
                onChange={(e) => updateOrder({ mood: parseInt(e.target.value) })}
                className="absolute w-full h-full opacity-0 cursor-pointer z-10"
             />
             <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand-cyan to-brand-pink rounded-full"
                style={{ width: `${order.mood}%` }}
             ></div>
             <div 
                className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg transform transition-transform"
                style={{ left: `calc(${order.mood}% - 12px)` }}
             ></div>
          </div>
        </div>

        {/* Style Selection Grid */}
        <div className="bg-surface-glass backdrop-blur-xl p-8 rounded-[1.5rem] border border-white/10">
          <label className="block text-sm font-bold text-white mb-6 uppercase tracking-wider">音乐风格 (最多选3项)</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {styles.map((s) => {
                const isSelected = order.style.includes(s.name);
                const isPlaying = playingStyle === s.id;
                
                return (
                    <div 
                        key={s.id}
                        onClick={() => toggleStyle(s.name)}
                        className={`relative group p-4 rounded-2xl border cursor-pointer transition-all duration-300 overflow-hidden
                            ${isSelected 
                                ? 'border-brand-cyan bg-brand-cyan/10 shadow-[0_0_20px_rgba(42,240,234,0.15)] transform -translate-y-1' 
                                : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30'}
                        `}
                    >
                        {/* Selected Indicator */}
                         {isSelected && (
                            <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-brand-cyan shadow-[0_0_8px_rgba(42,240,234,0.8)] z-20"></div>
                        )}

                        {/* Top Section: Icon/Visuals */}
                        <div className="flex items-center justify-between mb-4 relative z-10">
                            <button
                                onClick={(e) => handlePlayPreview(e, s.id)}
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg
                                    ${isPlaying 
                                        ? 'bg-brand-pink text-white scale-110' 
                                        : 'bg-white/10 text-white hover:bg-white hover:text-brand-dark group-hover:scale-105'}
                                `}
                            >
                                {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
                            </button>
                            
                            {/* Animated Bars when playing */}
                            {isPlaying && (
                                <div className="flex items-end gap-[2px] h-6">
                                    {[1,2,3,4].map(i => (
                                        <div 
                                            key={i} 
                                            className="w-1 bg-brand-pink rounded-t-sm" 
                                            style={{ 
                                                height: '100%', 
                                                animation: `pulse 0.5s infinite ease-in-out ${i * 0.15}s alternate` 
                                            }}
                                        ></div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Bottom Section: Info */}
                        <div className="relative z-10">
                            <h4 className={`font-bold text-lg mb-1 transition-colors ${isSelected ? 'text-white' : 'text-slate-200'}`}>{s.name}</h4>
                            <p className={`text-xs font-medium transition-colors ${isSelected ? 'text-brand-cyan' : 'text-slate-500'}`}>{s.desc}</p>
                        </div>
                        
                        {/* Background Gradient Blob on Hover/Active */}
                        <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br ${s.color} opacity-0 blur-[40px] transition-opacity duration-500 rounded-full pointer-events-none
                            ${isSelected || isPlaying ? 'opacity-30' : 'group-hover:opacity-10'}
                        `}></div>
                    </div>
                );
            })}
          </div>
        </div>

        {/* Vocal Selection */}
        <div className="bg-surface-glass backdrop-blur-xl p-8 rounded-[1.5rem] border border-white/10">
          <label className="block text-sm font-bold text-white mb-6 uppercase tracking-wider">人声类型</label>
          <div className="grid grid-cols-3 gap-4">
             <button 
                onClick={() => updateOrder({ vocal: 'female' })}
                className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center gap-3 ${order.vocal === 'female' ? 'border-brand-pink bg-brand-pink/10 text-white' : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10'}`}
             >
                <Mic2 className="w-6 h-6" /> <span className="font-medium">女声</span>
             </button>
             <button 
                onClick={() => updateOrder({ vocal: 'male' })}
                className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center gap-3 ${order.vocal === 'male' ? 'border-brand-cyan bg-brand-cyan/10 text-white' : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10'}`}
             >
                <Mic2 className="w-6 h-6" /> <span className="font-medium">男声</span>
             </button>
             <button 
                onClick={() => updateOrder({ vocal: 'instrumental' })}
                className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center gap-3 ${order.vocal === 'instrumental' ? 'border-purple-500 bg-purple-500/10 text-white' : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10'}`}
             >
                <FileAudio className="w-6 h-6" /> <span className="font-medium">纯音乐</span>
             </button>
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <button onClick={handleBack} className="text-slate-400 hover:text-white flex items-center px-4 py-2 font-medium transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> 上一步
          </button>
          <button 
            onClick={handleNext} 
            disabled={order.style.length === 0}
            className="bg-white text-slate-900 hover:bg-brand-cyan hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 rounded-full font-bold flex items-center transition-all shadow-lg"
          >
            下一步 <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    );
  };

  // Step 3: Details & Pay
  const SubmitStep = () => (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-black mb-2 text-white">确认细节与支付</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Col: Form */}
        <div className="space-y-6">
             {/* Story/Lyrics Input */}
             <div className="bg-surface-glass backdrop-blur-xl p-6 rounded-[1.5rem] border border-white/10">
                <label className="block text-sm font-bold text-white mb-4 uppercase tracking-wider">补充故事或歌词 (可选)</label>
                <textarea
                    rows={4}
                    value={order.story}
                    onChange={(e) => updateOrder({ story: e.target.value })}
                    placeholder="例如：这是送给女朋友的25岁生日礼物，她喜欢大海，名字叫Alice..."
                    className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan transition-colors"
                ></textarea>
            </div>

            {/* Pricing Selection */}
            <Pricing selectedPackage={order.package} onSelect={(p) => updateOrder({ package: p })} />
        </div>

        {/* Right Col: Summary & Pay */}
        <div className="bg-surface-glass backdrop-blur-xl p-8 rounded-[1.5rem] border border-white/10 h-fit sticky top-24">
            <h3 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-4">订单摘要</h3>
            
            <div className="space-y-4 mb-8 text-sm text-slate-300 font-medium">
                <div className="flex justify-between">
                    <span>用途</span>
                    <span className="text-white">{order.purpose === 'gift' ? '情感礼物' : '商业用途'}</span>
                </div>
                <div className="flex justify-between">
                    <span>风格</span>
                    <span className="text-white">{order.style.join(', ') || '未选择'}</span>
                </div>
                <div className="flex justify-between">
                    <span>人声</span>
                    <span className="text-white">
                        {order.vocal === 'male' ? '男声' : order.vocal === 'female' ? '女声' : '纯音乐'}
                    </span>
                </div>
                <div className="flex justify-between pt-4 border-t border-white/10 items-center">
                    <span className="font-bold text-lg text-white">总计</span>
                    <span className="font-black text-3xl text-brand-cyan">
                        {order.package === 'basic' ? '¥299' : order.package === 'standard' ? '¥599' : '¥1299'}
                    </span>
                </div>
            </div>

            {/* Payment Mockup */}
            <div className="bg-white p-6 rounded-2xl mb-6 flex flex-col items-center shadow-xl">
                 {/* This would be a real QR code in prod */}
                 <div className="w-32 h-32 bg-slate-100 mb-3 flex items-center justify-center text-slate-900 text-xs text-center font-bold border-2 border-dashed border-slate-300 rounded-lg">
                    微信/支付宝<br/>扫码支付
                 </div>
                 <p className="text-slate-500 text-xs font-bold uppercase tracking-wide">安全支付保障</p>
            </div>

            <button 
                onClick={onSuccess}
                className="w-full bg-gradient-to-r from-brand-cyan to-brand-pink text-white font-bold py-4 rounded-xl shadow-[0_4px_20px_rgba(255,0,80,0.3)] hover:shadow-[0_4px_30px_rgba(255,0,80,0.5)] transition-all transform hover:-translate-y-0.5"
            >
                我已支付，提交订单
            </button>
            <button onClick={handleBack} className="w-full text-slate-500 text-sm mt-4 hover:text-white transition-colors">
                返回修改
            </button>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-12 md:py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-16">
            <div className="flex items-center justify-between max-w-2xl mx-auto relative">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -z-10 rounded-full"></div>
                <div 
                    className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-brand-cyan to-brand-pink -z-10 rounded-full transition-all duration-500"
                    style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
                ></div>
                
                {[1, 2, 3].map((i) => (
                    <div key={i} className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-4 transition-all duration-300 ${step >= i ? 'bg-brand-cyan border-brand-cyan text-slate-900 scale-110' : 'bg-brand-dark border-white/20 text-slate-500'}`}>
                        {i}
                    </div>
                ))}
            </div>
            <div className="flex justify-between max-w-2xl mx-auto mt-3 text-xs font-bold tracking-wider text-slate-500 px-1 uppercase">
                <span className={step >= 1 ? 'text-white' : ''}>选择用途</span>
                <span className={step >= 2 ? 'text-white' : ''}>定义风格</span>
                <span className={step >= 3 ? 'text-white' : ''}>支付提交</span>
            </div>
        </div>

        {step === 1 && <PurposeStep />}
        {step === 2 && <StyleStep />}
        {step === 3 && <SubmitStep />}
      </div>
    </section>
  );
};

export default Wizard;