import { TopBar } from '../components/TopBar';
import { OptionCard } from '../components/OptionCard';
import type { DurationMinutes } from '../types/exercise';
import './SelectionScreen.css';

interface DurationScreenProps {
  onSelect: (duration: DurationMinutes) => void;
  onBack: () => void;
}

const DURATIONS: { value: DurationMinutes; subtitle: string }[] = [
  { value: 10, subtitle: 'Sesión rápida' },
  { value: 20, subtitle: 'Sesión estándar' },
  { value: 30, subtitle: 'Sesión completa' },
  { value: 45, subtitle: 'Sesión intensiva' },
];

export function DurationScreen({ onSelect, onBack }: DurationScreenProps) {
  return (
    <div>
      <TopBar onBack={onBack} title="Duración" step={{ current: 2, total: 3 }} />
      <div className="screen">
        <h1 className="selection-screen__title">¿Cuánto tiempo tienes?</h1>
        <p className="selection-screen__caption">Generaremos una rutina que se ajuste a tu tiempo disponible.</p>
        <div className="selection-screen__list">
          {DURATIONS.map((d) => (
            <OptionCard
              key={d.value}
              title={`${d.value} minutos`}
              subtitle={d.subtitle}
              onClick={() => onSelect(d.value)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
