import imgBangqiumao from '@/assets/棒球帽.png';
import imgYufumao from '@/assets/渔夫帽.jpeg';
import imgBeilei from '@/assets/贝雷帽.png';
import imgZhenzhi from '@/assets/针织帽.png';
import imgBaisechenshan from '@/assets/白色衬衫.png';
import imgTiaowenT from '@/assets/条纹T恤.png';
import imgZhenzhimaoyi from '@/assets/针织毛衣.png';
import imgWeiyi from '@/assets/卫衣.png';
import imgSuihuachenshan from '@/assets/碎花衬衫.png';
import imgBaizhequn from '@/assets/百褶裙.png';
import imgAziqun from '@/assets/A字裙.png';
import imgSuihuachangqun from '@/assets/碎花长裙.png';
import imgNiuzaiku from '@/assets/牛仔裤.png';
import imgXiuxianku from '@/assets/休闲裤.png';
import imgYundongku from '@/assets/运动裤.png';
import imgZhenzhuXianglian from '@/assets/珍珠项链.png';
import imgShoulian from '@/assets/手链.png';
import imgErhuan from '@/assets/耳环.png';
import imgMojing from '@/assets/墨镜.png';

export type ClothingCategory = 'hat' | 'top' | 'bottom' | 'accessory';
export type WardrobeFilter = 'all' | 'hat' | 'top' | 'skirt' | 'pants' | 'accessory';

export interface ClothingItem {
  id: string;
  name: string;
  category: ClothingCategory;
  subCategory?: 'skirt' | 'pants';
  emoji: string;
  image?: string;
  color: string;
}

export interface Scene {
  id: string;
  name: string;
  emoji: string;
}

export const scenes: Scene[] = [
  { id: 'commute', name: '通勤日常', emoji: '💼' },
  { id: 'travel', name: '旅游出行', emoji: '✈️' },
  { id: 'fitness', name: '健身运动', emoji: '🏃' },
  { id: 'date', name: '约会穿搭', emoji: '💕' },
  { id: 'casual', name: '休闲居家', emoji: '🏠' },
];

export const wardrobeItems: ClothingItem[] = [
  // Hats
  { id: 'h1', name: '棒球帽', category: 'hat', emoji: '🧢', image: imgBangqiumao, color: 'hsl(210, 60%, 70%)' },
  { id: 'h2', name: '渔夫帽', category: 'hat', emoji: '👒', image: imgYufumao, color: 'hsl(40, 60%, 80%)' },
  { id: 'h3', name: '贝雷帽', category: 'hat', emoji: '🎩', image: imgBeilei, color: 'hsl(0, 50%, 40%)' },
  { id: 'h4', name: '针织帽', category: 'hat', emoji: '🧶', image: imgZhenzhi, color: 'hsl(30, 50%, 65%)' },

  // Tops
  { id: 't1', name: '白色衬衫', category: 'top', emoji: '👔', image: imgBaisechenshan, color: 'hsl(0, 0%, 95%)' },
  { id: 't2', name: '条纹T恤', category: 'top', emoji: '👕', image: imgTiaowenT, color: 'hsl(210, 50%, 80%)' },
  { id: 't3', name: '针织毛衣', category: 'top', emoji: '🧥', image: imgZhenzhimaoyi, color: 'hsl(20, 40%, 70%)' },
  { id: 't4', name: '卫衣', category: 'top', emoji: '👚', image: imgWeiyi, color: 'hsl(340, 50%, 75%)' },
  { id: 't5', name: '碎花衬衫', category: 'top', emoji: '🌸', image: imgSuihuachenshan, color: 'hsl(330, 60%, 85%)' },

  // Bottoms - Skirts
  { id: 'b1', name: '百褶裙', category: 'bottom', subCategory: 'skirt', emoji: '👗', image: imgBaizhequn, color: 'hsl(240, 30%, 70%)' },
  { id: 'b2', name: 'A字裙', category: 'bottom', subCategory: 'skirt', emoji: '💃', image: imgAziqun, color: 'hsl(0, 60%, 70%)' },
  { id: 'b3', name: '碎花长裙', category: 'bottom', subCategory: 'skirt', emoji: '🌺', image: imgSuihuachangqun, color: 'hsl(340, 50%, 80%)' },

  // Bottoms - Pants
  { id: 'b4', name: '牛仔裤', category: 'bottom', subCategory: 'pants', emoji: '👖', image: imgNiuzaiku, color: 'hsl(210, 60%, 55%)' },
  { id: 'b5', name: '休闲裤', category: 'bottom', subCategory: 'pants', emoji: '🩳', image: imgXiuxianku, color: 'hsl(40, 30%, 75%)' },
  { id: 'b6', name: '运动裤', category: 'bottom', subCategory: 'pants', emoji: '🏃', image: imgYundongku, color: 'hsl(0, 0%, 30%)' },

  // Accessories
  { id: 'a1', name: '珍珠项链', category: 'accessory', emoji: '📿', image: imgZhenzhuXianglian, color: 'hsl(40, 50%, 90%)' },
  { id: 'a2', name: '手链', category: 'accessory', emoji: '💎', image: imgShoulian, color: 'hsl(50, 60%, 70%)' },
  { id: 'a3', name: '耳环', category: 'accessory', emoji: '✨', image: imgErhuan, color: 'hsl(45, 80%, 65%)' },
  { id: 'a4', name: '墨镜', category: 'accessory', emoji: '🕶️', image: imgMojing, color: 'hsl(0, 0%, 20%)' },
];

export const filterLabels: { key: WardrobeFilter; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'hat', label: '帽子' },
  { key: 'top', label: '上衣' },
  { key: 'skirt', label: '裙子' },
  { key: 'pants', label: '裤子' },
  { key: 'accessory', label: '首饰' },
];

export function filterItems(items: ClothingItem[], filter: WardrobeFilter): ClothingItem[] {
  if (filter === 'all') return items;
  if (filter === 'skirt') return items.filter(i => i.category === 'bottom' && i.subCategory === 'skirt');
  if (filter === 'pants') return items.filter(i => i.category === 'bottom' && i.subCategory === 'pants');
  return items.filter(i => i.category === filter);
}
