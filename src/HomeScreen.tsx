import { useState } from 'react';
import { Heart } from 'lucide-react';
import coverPhoto from '../assets/IMG_2361.jpeg';
import { CategoryCard } from '../components/CategoryCard';
import type { MuscleGroup } from '../types/exercise';
import './HomeScreen.css';

interface HomeScreenProps {
  onContinue: (groups: MuscleGroup[]) => void;
  onOpenFavorites: () => void;
}

const CATEGORIES: { group: MuscleGroup; label: string; icon: string; color: string; colorSoft: string }[] = [
  { group: 'pecho', label: 'Pecho', icon: 'heart-pulse', color: 'var(--color-pecho)', colorSoft: 'var(--color-pecho-soft)' },
  { group: 'hombros', label: 'Hombros', icon: 'triangle', color: 'var(--color-hombros)', colorSoft: 'var(--color-hombros-soft)' },
  { group: 'abdominales', label: 'Abdominales', icon: 'activity', color: 'var(--color-abdominales)', colorSoft: 'var(--color-abdominales-soft)' },
  { group: 'piernas', label: 'Piernas', icon: 'footprints', color: 'var(--color-piernas)', colorSoft: 'var(--color-piernas-soft)' },
  { group: 'gluteos', label: 'Glúteos', icon: 'flame', color: 'var(--color-gluteos)', colorSoft: 'var(--color-gluteos-soft)' },
];

export function HomeScreen({ onContinue, onOpenFavorites }: HomeScreenProps) {
  const [selected, setSelected] = useState<MuscleGroup[]>([]);
  const today = new Date();
  const hour = today.getHours();
  const greeting = hour < 12 ? 'Buenos días' : hour < 20 ? 'Buenas tardes' : 'Buenas noches';

  const toggle = (group: MuscleGroup) => {
    setSelected((prev) => (prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group]));
  };

  return (
    <div className="home-screen">
      <div className="home-hero">
        <img src={coverPhoto} alt="Tu foto de portada" className="home-hero__img" />
        <div className="home-hero__overlay" />
        <button className="home-hero__favorites-btn" onClick={onOpenFavorites} aria-label="Ver favoritos">
          <Heart size={20} />
        </button>
        <div className="home-hero__content">
          <p className="home-hero__greeting">{greeting} 👋</p>
          <h1 className="home-hero__title">Tu entrenamiento</h1>
          <p className="home-hero__subtitle">Solo necesitas una colchoneta</p>
        </div>
      </div>

      <div className="home-screen__body screen" style={{ paddingTop: 24, paddingBottom: selected.length > 0 ? 110 : 32 }}>
        <p className="home-screen__section-label">
          Elige uno o varios grupos musculares
        </p>
        <div className="home-screen__list">
          {CATEGORIES.map((c) => (
            <CategoryCard
              key={c.group}
              label={c.label}
              icon={c.icon}
              color={c.color}
              colorSoft={c.colorSoft}
              selected={selected.includes(c.group)}
              onClick={() => toggle(c.group)}
            />
          ))}
        </div>
      </div>

      {selected.length > 0 && (
        <div className="home-screen__cta">
          <button className="start-button" onClick={() => onContinue(selected)}>
            Continuar · {selected.length} {selected.length === 1 ? 'grupo' : 'grupos'} seleccionado{selected.length === 1 ? '' : 's'}
          </button>
        </div>
      )}
    </div>
  );
}
