import React from 'react';
import { Check, X } from 'lucide-react';
import { OrderState } from '../types';

interface PricingProps {
  selectedPackage: OrderState['package'];
  onSelect: (pkg: OrderState['package']) => void;
}

const Pricing: React.FC<PricingProps> = ({ selectedPackage, onSelect }) => {
  const plans = [
    {
      id: 'basic',
      name: '流量款',
      price: '¥299',
      features: [
        { name: 'AI生成高质量音频', included: true },
        { name: '商用授权协议', included: true },
        { name: 'MP3 格式交付', included: true },
        { name: '人工精修混音', included: false },
        { name: '分轨文件交付', included: false },
        { name: '24小时极速交付', included: true },
      ]
    },
    {
      id: 'standard',
      name: '主力款',
      price: '¥599',
      popular: true,
      features: [
        { name: 'AI生成高质量音频', included: true },
        { name: '商用授权协议', included: true },
        { name: '高音质 WAV + MP3', included: true },
        { name: '人工精修混音 (1次)', included: true },
        { name: '分轨文件交付', included: false },
        { name: '24小时极速交付', included: true },
      ]
    },
    {
      id: 'premium',
      name: '高端款',
      price: '¥1299',
      features: [
        { name: 'AI生成高质量音频', included: true },
        { name: '全渠道买断授权', included: true },
        { name: '高音质 WAV + MP3', included: true },
        { name: '资深制作人精修 (3次)', included: true },
        { name: '分轨文件交付 (Stems)', included: true },
        { name: '1对1 专属客服', included: true },
      ]
    }
  ];

  return (
    <div className="w-full space-y-4">
        <h3 className="text-lg font-bold mb-4 text-white uppercase tracking-wider">选择套餐</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => (
            <div 
            key={plan.id}
            onClick={() => onSelect(plan.id as any)}
            className={`
                relative p-6 rounded-2xl cursor-pointer border transition-all duration-300 backdrop-blur-md
                ${selectedPackage === plan.id 
                ? 'border-brand-cyan bg-brand-cyan/10 shadow-[0_0_20px_rgba(42,240,234,0.1)] transform -translate-y-1' 
                : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'}
            `}
            >
            {plan.popular && (
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                <span className="bg-brand-pink text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg">HOT</span>
                </div>
            )}
            
            <div className="mb-4">
                <h4 className="text-lg font-bold text-white">{plan.name}</h4>
                <div className={`text-2xl font-black mt-1 ${selectedPackage === plan.id ? 'text-brand-cyan' : 'text-slate-200'}`}>{plan.price}</div>
            </div>

            <ul className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center text-xs font-medium">
                    {feature.included ? (
                    <div className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center mr-2 flex-shrink-0">
                        <Check className="w-2.5 h-2.5 text-green-400" />
                    </div>
                    ) : (
                    <div className="w-4 h-4 rounded-full bg-white/5 flex items-center justify-center mr-2 flex-shrink-0">
                         <X className="w-2.5 h-2.5 text-slate-600" />
                    </div>
                    )}
                    <span className={feature.included ? 'text-slate-300' : 'text-slate-600'}>
                    {feature.name}
                    </span>
                </li>
                ))}
            </ul>

            <div className={`w-full py-2.5 rounded-xl text-center text-sm font-bold transition-all ${selectedPackage === plan.id ? 'bg-brand-cyan text-slate-900 shadow-lg' : 'bg-white/5 text-slate-500 group-hover:bg-white/10'}`}>
                {selectedPackage === plan.id ? '已选择' : '点击选择'}
            </div>
            </div>
        ))}
        </div>
    </div>
  );
};

export default Pricing;