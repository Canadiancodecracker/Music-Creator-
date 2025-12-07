import React, { useState } from 'react';
import { Menu, X, Music, Sparkles } from 'lucide-react';
import { Page, OrderState, INITIAL_ORDER_STATE } from './types';
import Hero from './components/Hero';
import Wizard from './components/Wizard';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import { ValueSection, TechSection, PromiseSection, ScenariosSection, ShowcaseSection, TrustSection } from './components/LandingModules';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [order, setOrder] = useState<OrderState>(INITIAL_ORDER_STATE);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const updateOrder = (updates: Partial<OrderState>) => {
    setOrder(prev => ({ ...prev, ...updates }));
  };

  // Shared Header Component
  const Header = () => (
    <nav className="sticky top-0 z-50 w-full bg-[#0f172a]/70 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center cursor-pointer group" onClick={() => navigateTo('home')}>
            <div className="relative mr-2 transform transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-3">
                <div className="absolute inset-0 bg-brand-cyan blur-md opacity-50 group-hover:opacity-100 group-hover:blur-lg transition-all duration-300"></div>
                <div className="relative p-1.5 rounded-lg bg-black border border-white/10 group-hover:border-brand-cyan/50 transition-colors">
                    <Music className="h-6 w-6 text-brand-cyan group-hover:text-white transition-colors" />
                </div>
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white group-hover:tracking-wide transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(42,240,234,0.5)]">
                SONIC<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-pink">SOUL</span>
            </span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <button onClick={() => navigateTo('home')} className={`text-sm font-semibold transition-colors hover:text-brand-cyan ${currentPage === 'home' ? 'text-white' : 'text-slate-400'}`}>首页</button>
              <button onClick={() => navigateTo('portfolio')} className={`text-sm font-semibold transition-colors hover:text-brand-cyan ${currentPage === 'portfolio' ? 'text-white' : 'text-slate-400'}`}>作品集</button>
              <button onClick={() => navigateTo('customize')} className="relative group overflow-hidden bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 hover:scale-105">
                <span className="absolute inset-0 bg-gradient-to-r from-brand-cyan to-brand-pink opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative group-hover:text-white transition-colors duration-300">立即定制</span>
              </button>
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-white/5 inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-white/10 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-[#0f172a] border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button onClick={() => navigateTo('home')} className="text-slate-300 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium">首页</button>
            <button onClick={() => navigateTo('portfolio')} className="text-slate-300 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium">作品集</button>
            <button onClick={() => navigateTo('customize')} className="text-brand-cyan block w-full text-left px-3 py-2 rounded-md text-base font-bold">立即定制</button>
          </div>
        </div>
      )}
    </nav>
  );

  return (
    <div className="min-h-screen text-slate-50 font-sans selection:bg-brand-pink selection:text-white relative">
      
      {/* GLOBAL DYNAMIC BACKGROUND */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#0f172a]">
         {/* Noise Overlay */}
         <div className="bg-noise absolute inset-0 z-20"></div>
         
         {/* Gradient Blobs */}
         <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-brand-cyan/20 rounded-full blur-[100px] animate-float z-10 mix-blend-screen"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-brand-pink/10 rounded-full blur-[120px] animate-float-delayed z-10 mix-blend-screen"></div>
         <div className="absolute top-[40%] left-[30%] w-[30vw] h-[30vw] bg-indigo-600/20 rounded-full blur-[80px] animate-pulse-slow z-10 mix-blend-screen"></div>
      </div>

      <Header />

      <main className="relative z-10">
        {currentPage === 'home' && (
          <>
            <Hero onCta={() => navigateTo('customize')} />
            <div className="space-y-0">
                <ValueSection />
                <TechSection />
                <PromiseSection />
                <ScenariosSection />
                <ShowcaseSection />
                <TrustSection />
            </div>
            <FAQ />
          </>
        )}

        {currentPage === 'customize' && (
          <Wizard 
            order={order} 
            updateOrder={updateOrder} 
            onSuccess={() => navigateTo('success')}
          />
        )}

        {currentPage === 'portfolio' && (
          <div className="pt-10">
            <ShowcaseSection />
          </div>
        )}

        {currentPage === 'success' && (
            <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
                <div className="bg-gradient-to-tr from-brand-cyan to-blue-600 p-6 rounded-full mb-6 shadow-[0_0_30px_rgba(42,240,234,0.3)] animate-bounce">
                    <Sparkles className="h-12 w-12 text-white" />
                </div>
                <h2 className="text-4xl font-extrabold mb-4 text-white">提交成功！</h2>
                <p className="text-slate-400 max-w-md mb-10 text-lg">
                    我们已收到您的定制需求。客服将在15分钟内通过微信添加您，确认最终细节。
                </p>
                <div className="bg-white/10 p-6 rounded-3xl backdrop-blur-md border border-white/20 mb-10 shadow-2xl">
                   {/* Placeholder for QR Code */}
                   <div className="w-48 h-48 bg-white rounded-xl flex items-center justify-center text-slate-900 text-sm font-bold border-4 border-white/20">
                        客服微信二维码
                   </div>
                </div>
                <button 
                    onClick={() => navigateTo('home')}
                    className="bg-white text-slate-900 px-12 py-4 rounded-full hover:bg-slate-200 transition-all font-bold shadow-xl hover:scale-105"
                >
                    返回首页
                </button>
            </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;