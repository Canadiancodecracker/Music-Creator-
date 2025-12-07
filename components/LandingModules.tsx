import React from 'react';
import { Clock, ShieldCheck, Music, Sparkles, Briefcase, Video, Gift, Heart, User } from 'lucide-react';
import DemoPlayer from './DemoPlayer';

// Shared Section Wrapper
const SectionWrapper: React.FC<{ children: React.ReactNode, className?: string, id?: string }> = ({ children, className = "", id }) => (
    <section id={id} className={`py-24 relative ${className}`}>
        {children}
    </section>
);

// Animated Title Component with Bounce Effect
const AnimatedTitle: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = "" }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef<HTMLHeadingElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <h2
      ref={ref}
      className={`${className} transition-all duration-1000 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] transform ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
      }`}
    >
      {children}
    </h2>
  );
};

// Section 2: Value Proposition
export const ValueSection = () => (
  <SectionWrapper id="value">
    <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
      <AnimatedTitle className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">
        音乐，是视频的<span className="text-brand-pink">心跳</span>。
      </AnimatedTitle>
      <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto font-medium">
        无论是 15 秒的短视频，还是 10 分钟的 Vlog，
        <br />
        好的 BGM 能助力视频完播率提升，让情感共鸣直抵人心。
      </p>

      <div className="mt-16 grid gap-6 md:grid-cols-2">
         {[
            { 
                title: "商业与流量", 
                subtitle: "For Business",
                icon: "🚀",
                items: ["提升品牌气质的广告配乐", "短视频热门 BGM 定制", "避免素材库版权纠纷"] 
            },
            { 
                title: "情感与记忆", 
                subtitle: "For Memories",
                icon: "❤️",
                items: ["献给父母的感恩主题曲", "独一无二的求婚/婚礼音乐", "家族纪录片专属旋律"] 
            }
         ].map((card, i) => (
             <div key={i} className="group relative rounded-[2rem] border border-white/10 bg-surface-glass p-8 md:p-12 backdrop-blur-xl hover:bg-surface-glassHigh transition-all duration-500 text-left overflow-hidden">
                 <div className="absolute top-0 right-0 p-8 opacity-20 text-6xl group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0">{card.icon}</div>
                 <h3 className="text-2xl font-bold text-white mb-1">{card.title}</h3>
                 <p className="text-xs font-bold text-brand-cyan uppercase tracking-widest mb-6">{card.subtitle}</p>
                 <ul className="space-y-4 relative z-10">
                     {card.items.map((item, j) => (
                         <li key={j} className="flex items-start text-slate-300 text-sm font-medium">
                             <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan mt-1.5 mr-3 flex-shrink-0 shadow-[0_0_8px_rgba(42,240,234,0.8)]"></div>
                             {item}
                         </li>
                     ))}
                 </ul>
             </div>
         ))}
      </div>
    </div>
  </SectionWrapper>
);

// Section 3: Technical Advantage
export const TechSection = () => (
  <SectionWrapper className="" id="tech">
    <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
      <div>
        <div className="inline-block px-4 py-1.5 rounded-full bg-brand-pink/10 border border-brand-pink/20 text-brand-pink text-xs font-black tracking-widest mb-8">AI + HUMAN</div>
        <AnimatedTitle className="text-4xl md:text-6xl font-black text-white mb-8 leading-[1.1]">
          AI 的速度。<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-pink">专业的制作水准。</span>
        </AnimatedTitle>
        <p className="text-slate-400 text-lg leading-relaxed mb-10 font-medium">
          我们使用最前沿的生成式 AI 模型快速捕捉灵感，再由资深制作人进行「精细化」调整。
          <br /><br />
          你不需要懂乐理，只需要懂你的故事。
        </p>

        <div className="space-y-6">
             {[
                 "精准匹配情绪（温柔、燃、治愈、赛博朋克…）",
                 "支持「以图生音」或「视频配乐」模式",
                 "多版本 AB Test，选出最能打动你的那一条"
             ].map((txt, i) => (
                 <div key={i} className="flex items-center text-slate-300 font-medium">
                     <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mr-5 text-brand-cyan text-sm font-bold border border-white/10 shadow-lg">{i+1}</div>
                     {txt}
                 </div>
             ))}
        </div>
      </div>
      
      <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan to-brand-pink opacity-20 blur-[100px] rounded-full group-hover:opacity-30 transition-opacity duration-1000"></div>
          <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 bg-black/40 backdrop-blur-2xl p-8 shadow-2xl">
              <div className="flex flex-col gap-4">
                  {[1,2,3].map((n) => (
                      <div key={n} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-default">
                          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${n===1 ? 'from-brand-cyan to-blue-500' : n===2 ? 'from-purple-500 to-brand-pink' : 'from-orange-400 to-yellow-500'} opacity-80`}></div>
                          <div className="flex-1 space-y-2">
                              <div className="h-2.5 w-1/3 bg-white/20 rounded-full"></div>
                              <div className="h-2.5 w-3/4 bg-white/10 rounded-full"></div>
                          </div>
                          <div className="text-[10px] text-white/50 font-mono border border-white/10 px-2 py-1 rounded">WAV</div>
                      </div>
                  ))}
              </div>
          </div>
      </div>
    </div>
  </SectionWrapper>
);

// Section 4: Promise
export const PromiseSection = () => (
  <SectionWrapper id="promise">
    <div className="max-w-7xl mx-auto px-4">
        <AnimatedTitle className="text-3xl md:text-5xl font-black text-white mb-20 text-center">不仅是音乐，更是服务。</AnimatedTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
                { icon: Clock, title: "24h 极速交付", desc: "天下武功，唯快不破" },
                { icon: Sparkles, title: "独家原创", desc: "拒绝撞车，拒绝侵权" },
                { icon: ShieldCheck, title: "商用授权", desc: "全平台通用，终身无忧" },
                { icon: Music, title: "多轮精修", desc: "直到听见你心中的旋律" }
            ].map((item, idx) => (
                <div key={idx} className="bg-surface-glass p-10 rounded-[2rem] border border-white/5 hover:border-brand-cyan/30 transition-all hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)] group backdrop-blur-xl">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-cyan/20 transition-colors">
                        <item.icon className="w-8 h-8 text-slate-300 group-hover:text-brand-cyan transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed font-medium">{item.desc}</p>
                </div>
            ))}
        </div>
    </div>
  </SectionWrapper>
);

// Section 5: Scenarios
export const ScenariosSection = () => (
  <SectionWrapper className="" id="scenarios">
    <div className="max-w-7xl mx-auto px-4">
        <AnimatedTitle className="text-3xl md:text-5xl font-black text-white mb-20 text-center">灵感，无处不在。</AnimatedTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
                { icon: Briefcase, color: "text-brand-cyan", title: "品牌广告 / TVC", desc: "用声音建立品牌听觉资产，3秒抓住注意力。" },
                { icon: Video, color: "text-brand-pink", title: "抖音 / Vlog / 短视频", desc: "风格统一，提升完播率，打造个人IP。" },
                { icon: Gift, color: "text-purple-400", title: "生日 / 纪念日礼物", desc: "将你们的故事写进歌里，独一无二的浪漫。" },
                { icon: Heart, color: "text-red-400", title: "婚礼 / 记录片", desc: "让感动的瞬间，拥有专属的背景音乐。" }
            ].map((item, idx) => (
                <div key={idx} className="p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/5 flex items-start gap-8 hover:bg-white/[0.06] transition-colors backdrop-blur-md">
                    <div className={`p-5 rounded-2xl bg-black/20 ${item.color} flex-shrink-0 ring-1 ring-white/10`}>
                        <item.icon size={32} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                        <p className="text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  </SectionWrapper>
);

// Section 6: Showcase Wrapper
export const ShowcaseSection = () => (
    <SectionWrapper id="showcase">
        <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-20">
                <AnimatedTitle className="text-3xl md:text-5xl font-black text-white mb-6">听见未来的声音。</AnimatedTitle>
                <p className="text-slate-400 font-medium">所有案例均为 SonicSoul 原创，已获商用授权。</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <DemoPlayer 
                    title="Neon Dreams" 
                    tags={['City Pop', '赛博朋克', 'Vlog']} 
                    category="commercial"
                    duration="2:45"
                    imageUrl="https://picsum.photos/400/400?random=1"
                  />
                  <DemoPlayer 
                    title="Morning Coffee" 
                    tags={['Lo-Fi', '治愈', '探店']} 
                    category="emotional"
                    duration="3:12"
                    imageUrl="https://picsum.photos/400/400?random=2"
                  />
                   <DemoPlayer 
                    title="Epic Journey" 
                    tags={['Cinematic', '史诗', '宣传片']} 
                    category="commercial"
                    duration="1:58"
                    imageUrl="https://picsum.photos/400/400?random=3"
                  />
                  <DemoPlayer 
                    title="Bamboo Forest" 
                    tags={['国潮', '古风', '旅拍']} 
                    category="emotional"
                    duration="4:05"
                    imageUrl="https://picsum.photos/400/400?random=4"
                  />
            </div>
        </div>
    </SectionWrapper>
)

// Section 7: Trust
export const TrustSection = () => (
    <SectionWrapper id="trust" className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <AnimatedTitle className="text-3xl font-black text-white mb-16">信赖之选。</AnimatedTitle>
            <div className="grid md:grid-cols-2 gap-8 mb-20 max-w-5xl mx-auto">
                {[
                    { text: "SonicSoul 有效解决了我的 BGM 版权头痛问题，而且音乐质量非常出色，完全不像是 AI 做的，很有情感。", name: "Alex. Z", role: "知名 Vlog 博主" },
                    { text: "我们的产品发布视频用了这里的定制音乐，节奏点卡得非常完美，交付速度极快，24小时内就拿到了。", name: "TechStart Inc.", role: "独角兽科技公司" }
                ].map((item, i) => (
                    <div key={i} className="bg-surface-glass p-10 rounded-[2rem] border border-white/5 relative text-left backdrop-blur-xl hover:bg-surface-glassHigh transition-colors">
                        <div className="text-6xl text-brand-cyan/20 font-serif mb-6 absolute top-8 right-8">"</div>
                        <p className="text-slate-200 text-lg leading-relaxed mb-8 relative z-10 font-medium">
                            {item.text}
                        </p>
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-gradient-to-br from-slate-700 to-slate-600 rounded-full mr-4 border-2 border-white/10"></div>
                            <div>
                                <div className="text-white font-bold text-base">{item.name}</div>
                                <div className="text-sm text-brand-cyan font-medium">{item.role}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="inline-flex items-center px-8 py-4 rounded-full bg-white/5 border border-white/10 text-slate-300 backdrop-blur-md shadow-xl">
                <User className="w-5 h-5 mr-3 text-brand-pink" />
                <span className="font-bold text-white mr-1">6,000+</span> 首作品已交付
            </div>
        </div>
    </SectionWrapper>
);