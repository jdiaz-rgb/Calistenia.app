import { TopBar } from '../components/TopBar';
import { OptionCard } from '../components/OptionCard';
import type { Level, MuscleGroup } from '../types/exercise';
import { MUSCLE_GROUP_LABELS } from '../types/exercise';
import './SelectionScreen.css';

interface LevelScreenProps {
  muscleGroups: MuscleGroup[];
  onSelect: (level: Level) => void;
  onBack: () => void;
}

const LEVELS: { value: Level; subtitle: string }[] = [
  { value: 'principiante', subtitle: 'Estás empezando o retomando el hábito' },
  { value: 'intermedio', subtitle: 'Entrenas con cierta regularidad' },
  { value: 'avanzado', subtitle: 'Buscas un reto exigente' },
];

export function LevelScreen({ muscleGroups, onSelect, onBack }: LevelScreenProps) {
  const groupLabel = muscleGroups.map((g) => MUSCLE_GROUP_LABELS[g]).join(' + ');
  return (
    <div>
      <TopBar onBack={onBack} title={groupLabel} step={{ current: 1, total: 4 }} />
      <div className="screen">
        <h1 className="selection-screen__title">¿Cuál es tu nivel?</h1>
        <p className="selection-screen__caption">Ajustaremos la intensidad de tu rutina de {groupLabel.toLowerCase()}.</p>
        <div className="selection-screen__list">
          {LEVELS.map((l) => (
            <OptionCard
              key={l.value}
              title={l.value.charAt(0).toUpperCase() + l.value.slice(1)}
              subtitle={l.subtitle}
              onClick={() => onSelect(l.value)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
