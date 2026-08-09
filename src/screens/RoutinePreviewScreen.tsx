import { TopBar } from '../components/TopBar';
import { DynamicIcon } from '../components/DynamicIcon';
import { unlockAudio } from '../lib/beep';
import type { DurationMinutes, Level, MuscleGroup, RoutineExercise } from '../types/exercise';
import { MUSCLE_GROUP_LABELS, LEVEL_LABELS } from '../types/exercise';
import './RoutinePreviewScreen.css';

interface RoutinePreviewScreenProps {
  muscleGroups: MuscleGroup[];
  level: Level;
  duration: DurationMinutes;
  routine: RoutineExercise[];
  onStart: () => void;
  onBack: () => void;
}

export function RoutinePreviewScreen({ muscleGroups, level, duration, routine, onStart, onBack }: RoutinePreviewScreenProps) {
  const groupsLabel = muscleGroups.map((g) => MUSCLE_GROUP_LABELS[g]).join(' + ');

  return (
    <div>
      <TopBar onBack={onBack} title="Tu rutina" step={{ current: 3, total: 3 }} />
      <div className="screen">
        <h1 className="preview-screen__title">
          {groupsLabel} · {LEVEL_LABELS[level]}
        </h1>
        <p className="preview-screen__caption">
          {routine.length} ejercicios · {duration} minutos aproximados
        </p>

        <div className="preview-screen__list">
          {routine.map((ex) => (
            <div key={`${ex.id}-${ex.order}`} className="preview-item">
              <span className="preview-item__index">{ex.order}</span>
              <span className="preview-item__icon">
                <DynamicIcon name={ex.icon} size={20} />
              </span>
              <div className="preview-item__info">
                <p className="preview-item__name">{ex.name}</p>
                <p className="preview-item__meta">
                  {ex.sets} series · {ex.reps}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="preview-screen__cta">
        <button
          className="start-button"
          onClick={() => {
            unlockAudio();
            onStart();
          }}
        >
          Empezar rutina
        </button>
      </div>
    </div>
  );
}
