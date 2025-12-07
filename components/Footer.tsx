import React from 'react';
import { Mail, MessageCircle, Music } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-brand-dark/90 backdrop-blur-xl border-t border-white/5 pt-20 pb-12 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* Brand */}
          <div className="col-span-1">
             <div className="flex items-center mb-6 group cursor-pointer">
                <div className="relative mr-2">
                    <div className="absolute inset-0 bg-brand-cyan blur opacity-50"></div>
                    <Music className="relative h-6 w-6 text-brand-cyan" />
                </div>
                <span className="font-extrabold text-xl tracking-tight text-white">
                    SONIC<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-pink">SOUL</span>
                </span>
             </div>
             <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">
               Hear the Difference.<br/>
               Make It Sound Like You.
             </p>
             <div className="flex space-x-4">
                 {/* Social placeholders */}
                 <div className="w-10 h-10 rounded-full bg-white/5 hover:bg-brand-cyan/20 hover:text-brand-cyan flex items-center justify-center transition-colors cursor-pointer border border-white/5">
                    <span className="text-xs font-bold">INS</span>
                 </div>
                 <div className="w-10 h-10 rounded-full bg-white/5 hover:bg-brand-pink/20 hover:text-brand-pink flex items-center justify-center transition-colors cursor-pointer border border-white/5">
                    <span className="text-xs font-bold">TK</span>
                 </div>
             </div>
          </div>
          
          {/* Links */}
          <div className="grid grid-cols-2 gap-8 col-span-1 md:col-span-2">
            <div>
                <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider">关于我们</h4>
                <ul className="space-y-4 text-sm text-slate-500 font-medium">
                <li className="hover:text-brand-cyan cursor-pointer transition-colors">公司简介</li>
                <li className="hover:text-brand-cyan cursor-pointer transition-colors">商用授权条款</li>
                <li className="hover:text-brand-cyan cursor-pointer transition-colors">隐私政策</li>
                <li className="hover:text-brand-cyan cursor-pointer transition-colors">常见问题</li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider">联系方式</h4>
                <ul className="space-y-4 text-sm text-slate-500 font-medium">
                <li className="flex items-center hover:text-white transition-colors"><Mail className="w-4 h-4 mr-3" /> support@sonicsoul.ai</li>
                <li className="flex items-center hover:text-white transition-colors"><MessageCircle className="w-4 h-4 mr-3" /> 微信: SonicSoul_CS</li>
                <li className="mt-4 text-xs text-slate-600 bg-white/5 inline-block px-3 py-1 rounded-full">工作时间: 周一至周日 9:00 - 22:00</li>
                </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600 font-medium">
          <p>&copy; 2024 SonicSoul AI. All rights reserved.</p>
          <p className="mt-2 md:mt-0">京ICP备XXXXXXXX号-1</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;