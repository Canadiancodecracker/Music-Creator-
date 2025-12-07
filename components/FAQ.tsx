import React from 'react';

const FAQ = () => {
  const faqs = [
    {
      q: "版权是完全属于我吗？商用会有问题吗？",
      a: "是的。我们所有的套餐都包含商用授权。主力款和高端款更提供完整的版权买断协议，您可以放心地将其用于Youtube、抖音、广告投放等任何商业场景，无需担心版权投诉。"
    },
    {
      q: "如果不满意可以修改吗？",
      a: "当然可以。AI生成后，我们会有人工制作人进行初审。交付给您后，主力款包含1次免费大修，高端款包含3次精修。通常我们会提供2-3个初始版本供您选择，力求让您满意。"
    },
    {
      q: "交付需要多久？",
      a: "对于大多数订单，我们在24小时内交付初稿。如果您有特别紧急的需求（如6小时内），请联系客服选择加急服务。"
    }
  ];

  return (
    <section className="py-24 border-t border-white/5 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-3xl md:text-4xl font-black mb-12 text-center text-white">常见问题</h2>
        <div className="space-y-6">
          {faqs.map((item, idx) => (
            <div key={idx} className="bg-surface-glass backdrop-blur-md rounded-[1.5rem] p-8 border border-white/5 hover:bg-surface-glassHigh transition-colors">
              <h3 className="text-lg font-bold text-white mb-3">{item.q}</h3>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;