import { useState, useCallback } from 'react';
import { ClothingItem, Scene, WardrobeFilter, scenes, wardrobeItems, filterItems, filterLabels } from '@/data/wardrobe';
import { cn } from '@/lib/utils';

interface OutfitState {
  hat: ClothingItem | null;
  top: ClothingItem | null;
  bottom: ClothingItem | null;
  accessory: ClothingItem | null;
}

const emptyOutfit: OutfitState = { hat: null, top: null, bottom: null, accessory: null };

const slotConfig = [
{ key: 'hat' as const, label: '帽子', icon: '🎩' },
{ key: 'top' as const, label: '上衣', icon: '👕' },
{ key: 'bottom' as const, label: '下装', icon: '👗' },
{ key: 'accessory' as const, label: '首饰', icon: '💎' }];


const Index = () => {
  const [activeScene, setActiveScene] = useState<Scene>(scenes[0]);
  const [outfit, setOutfit] = useState<OutfitState>(emptyOutfit);
  const [filter, setFilter] = useState<WardrobeFilter>('all');

  const handleSceneChange = useCallback((scene: Scene) => {
    setActiveScene(scene);
    setOutfit(emptyOutfit);
  }, []);

  const handleSelectItem = useCallback((item: ClothingItem) => {
    setOutfit((prev) => ({ ...prev, [item.category]: item }));
  }, []);

  const handleRandomize = useCallback(() => {
    const pick = (cat: ClothingItem['category']) => {
      const pool = wardrobeItems.filter((i) => i.category === cat);
      return pool[Math.floor(Math.random() * pool.length)] ?? null;
    };
    setOutfit({ hat: pick('hat'), top: pick('top'), bottom: pick('bottom'), accessory: pick('accessory') });
  }, []);

  const handleClear = useCallback(() => setOutfit(emptyOutfit), []);

  const filteredItems = filterItems(wardrobeItems, filter);

  const selectedIds = new Set(
    Object.values(outfit).filter(Boolean).map((i) => i!.id)
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        {/* Header */}
        <h1 className="mb-6 text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">✨ 潘潘的私人穿搭师

        </h1>

        {/* Scene Switcher */}
        <div className="mb-8 flex flex-wrap justify-center gap-2 sm:gap-3">
          {scenes.map((scene) =>
          <button
            key={scene.id}
            onClick={() => handleSceneChange(scene)}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 sm:px-5 sm:text-base',
              activeScene.id === scene.id ?
              'bg-primary text-primary-foreground shadow-md scale-105' :
              'bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground'
            )}>
            
              {scene.emoji} {scene.name}
            </button>
          )}
        </div>

        {/* Outfit Preview */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-5 sm:gap-4">
          {slotConfig.map((slot) => {
            const item = outfit[slot.key];
            return (
              <div
                key={slot.key}
                className={cn(
                  'relative flex aspect-square flex-col items-center justify-center rounded-2xl transition-all duration-300',
                  item ?
                  'border-2 border-primary/40 bg-card shadow-sm' :
                  'border-2 border-dashed border-border bg-muted/50'
                )}>
                
                {item ?
                <div className="flex flex-col items-center gap-1 animate-scale-in">
                    {item.image ?
                  <img src={item.image} alt={item.name} className="h-12 w-12 object-contain sm:h-16 sm:w-16" onError={(e) => {e.currentTarget.style.display = 'none';e.currentTarget.nextElementSibling && ((e.currentTarget.nextElementSibling as HTMLElement).style.display = 'inline');}} /> :
                  null}
                    <span className="text-4xl sm:text-5xl" style={{ display: item.image ? 'none' : 'inline' }}>{item.emoji}</span>
                    <span className="text-xs font-medium text-foreground">{item.name}</span>
                  </div> :

                <div className="flex flex-col items-center gap-1 text-muted-foreground">
                    <span className="text-3xl sm:text-4xl opacity-40">{slot.icon}</span>
                    <span className="text-xs">{slot.label}</span>
                  </div>
                }
              </div>);

          })}
          {/* Scene tag slot */}
          <div className="flex aspect-square flex-col items-center justify-center rounded-2xl border-2 border-primary/30 bg-accent/50">
            <span className="text-3xl sm:text-4xl">{activeScene.emoji}</span>
            <span className="mt-1 text-xs font-medium text-accent-foreground">{activeScene.name}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mb-10 flex justify-center gap-3 sm:gap-4">
          <button
            onClick={handleRandomize}
            className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-md transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95 sm:px-8 sm:text-base">
            
            🎲 随机搭配
          </button>
          <button
            onClick={handleClear}
            className="rounded-full border-2 border-border bg-card px-6 py-2.5 text-sm font-semibold text-foreground transition-all duration-200 hover:bg-secondary active:scale-95 sm:px-8 sm:text-base">
            
            🗑️ 清空搭配
          </button>
        </div>

        {/* Wardrobe Section */}
        <div>
          <h2 className="mb-4 text-xl font-bold text-foreground sm:text-2xl">👗 我的衣橱</h2>

          {/* Filter tabs */}
          <div className="mb-5 flex flex-wrap gap-2">
            {filterLabels.map((f) =>
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                'rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200',
                filter === f.key ?
                'bg-primary text-primary-foreground shadow-sm' :
                'bg-secondary text-secondary-foreground hover:bg-accent'
              )}>
              
                {f.label}
              </button>
            )}
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {filteredItems.map((item) =>
            <button
              key={item.id}
              onClick={() => handleSelectItem(item)}
              className={cn(
                'group relative flex aspect-square flex-col items-center justify-center rounded-2xl border-2 bg-card transition-all duration-200 hover:scale-[1.04] hover:shadow-md active:scale-95',
                selectedIds.has(item.id) ?
                'border-primary shadow-md ring-2 ring-primary/20' :
                'border-border hover:border-primary/40'
              )}>
              
                {item.image ?
              <img src={item.image} alt={item.name} className="h-14 w-14 object-contain sm:h-16 sm:w-16 transition-transform duration-200 group-hover:scale-110" onError={(e) => {e.currentTarget.style.display = 'none';e.currentTarget.nextElementSibling && ((e.currentTarget.nextElementSibling as HTMLElement).style.display = 'inline');}} /> :
              null}
                <span className="text-4xl sm:text-5xl transition-transform duration-200 group-hover:scale-110" style={{ display: item.image ? 'none' : 'inline' }}>
                  {item.emoji}
                </span>
                <span className="mt-2 text-xs font-medium text-foreground sm:text-sm">{item.name}</span>
                <div
                className="absolute bottom-2 left-1/2 h-1.5 w-6 -translate-x-1/2 rounded-full"
                style={{ backgroundColor: item.color }} />
              
              </button>
            )}
          </div>
        </div>
      </div>
    </div>);

};

export default Index;