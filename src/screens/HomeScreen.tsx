import { Heart } from 'lucide-react';
import coverPhoto from '../assets/cover.jpeg';
import { CategoryCard } from '../components/CategoryCard';
import type { MuscleGroup } from '../types/exercise';
import './HomeScreen.css';

interface HomeScreenProps {
  onSelectMuscleGroup: (group: MuscleGroup) => void;
  onOpenFavorites: () => void;
}

const CATEGORIES: { group: MuscleGroup; label: string; icon: string; color: string; colorSoft: string }[] = [
  { group: 'pecho', label: 'Pecho', icon: 'heart-pulse', color: 'var(--color-pecho)', colorSoft: 'var(--color-pecho-soft)' },
  { group: 'hombros', label: 'Hombros', icon: 'triangle', color: 'var(--color-hombros)', colorSoft: 'var(--color-hombros-soft)' },
  { group: 'abdominales', label: 'Abdominales', icon: 'activity', color: 'var(--color-abdominales)', colorSoft: 'var(--color-abdominales-soft)' },
  { group: 'piernas', label: 'Piernas', icon: 'footprints', color: 'var(--color-piernas)', colorSoft: 'var(--color-piernas-soft)' },
  { group: 'gluteos', label: 'Glúteos', icon: 'flame', color: 'var(--color-gluteos)', colorSoft: 'var(--color-gluteos-soft)' },
];

export function HomeScreen({ onSelectMuscleGroup, onOpenFavorites }: HomeScreenProps) {
  const today = new Date();
  const hour = today.getHours();
  const greeting = hour < 12 ? 'Buenos días' : hour < 20 ? 'Buenas tardes' : 'Buenas noches';

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

      <div className="home-screen__body screen" style={{ paddingTop: 24 }}>
        <p className="home-screen__section-label">Elige un grupo muscular</p>
        <div className="home-screen__list">
          {CATEGORIES.map((c) => (
            <CategoryCard
              key={c.group}
              label={c.label}
              icon={c.icon}
              color={c.color}
              colorSoft={c.colorSoft}
              onClick={() => onSelectMuscleGroup(c.group)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
