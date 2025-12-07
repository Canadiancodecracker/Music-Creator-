export type Page = 'home' | 'customize' | 'portfolio' | 'success';

export interface DemoTrack {
  id: string;
  title: string;
  tags: string[];
  duration: string;
  imageUrl: string; // Placeholder image URL
  category: 'commercial' | 'emotional';
}

export interface OrderState {
  purpose: 'gift' | 'business' | null;
  mood: number; // 0 (Calm) to 100 (Excited)
  style: string[];
  vocal: 'male' | 'female' | 'instrumental';
  story: string;
  package: 'basic' | 'standard' | 'premium';
}

export const INITIAL_ORDER_STATE: OrderState = {
  purpose: null,
  mood: 50,
  style: [],
  vocal: 'female',
  story: '',
  package: 'standard'
};
