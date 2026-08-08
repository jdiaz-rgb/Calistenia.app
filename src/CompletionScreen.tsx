import { PartyPopper } from 'lucide-react';
import type { MuscleGroup } from '../types/exercise';
import { MUSCLE_GROUP_LABELS } from '../types/exercise';
import './CompletionScreen.css';

interface CompletionScreenProps {
  muscleGroups: MuscleGroup[];
  exerciseCount: number;
  onRestart: () => void;
}

export function CompletionScreen({ muscleGroups, exerciseCount, onRestart }: CompletionScreenProps) {
  const groupLabel = muscleGroups.map((g) => MUSCLE_GROUP_LABELS[g]).join(', ').toLowerCase();
  return (
    <div className="screen completion-screen">
      <div className="completion-screen__icon">
        <PartyPopper size={40} />
      </div>
      <h1 className="completion-screen__title">¡Rutina completada!</h1>
      <p className="completion-screen__caption">
        Terminaste {exerciseCount} ejercicios de {groupLabel}. ¡Buen trabajo!
      </p>
      <button className="start-button" onClick={onRestart}>
        Volver al inicio
      </button>
    </div>
  );
}
