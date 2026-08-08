import { PartyPopper } from 'lucide-react';
import type { DurationMinutes, Level, MuscleGroup } from '../types/exercise';
import { MUSCLE_GROUP_LABELS } from '../types/exercise';
import './CompletionScreen.css';

interface CompletionScreenProps {
  muscleGroup: MuscleGroup;
  level: Level;
  duration: DurationMinutes;
  exerciseCount: number;
  onRestart: () => void;
}

export function CompletionScreen({ muscleGroup, duration, exerciseCount, onRestart }: CompletionScreenProps) {
  return (
    <div className="screen completion-screen">
      <div className="completion-screen__icon">
        <PartyPopper size={40} />
      </div>
      <h1 className="completion-screen__title">¡Rutina completada!</h1>
      <p className="completion-screen__caption">
        Terminaste {exerciseCount} ejercicios de {MUSCLE_GROUP_LABELS[muscleGroup].toLowerCase()} en aproximadamente {duration} minutos.
      </p>
      <button className="start-button" onClick={onRestart}>
        Volver al inicio
      </button>
    </div>
  );
}
