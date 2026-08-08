import { TopBar } from '../components/TopBar';
import { DynamicIcon } from '../components/DynamicIcon';
import type { Level, MuscleGroup, RoutineConfig, RoutineExercise } from '../types/exercise';
import { MUSCLE_GROUP_LABELS, LEVEL_LABELS } from '../types/exercise';
import './RoutinePreviewScreen.css';

interface RoutinePreviewScreenProps {
  muscleGroups: MuscleGroup[];
  level: Level;
  config: RoutineConfig;
  routine: RoutineExercise[];
  onStart: () => void;
  onBack: () => void;
}

export function RoutinePreviewScreen({ muscleGroups, level, config, routine, onStart, onBack }: RoutinePreviewScreenProps) {
  const groupLabel = muscleGroups.map((g) => MUSCLE_GROUP_LABELS[g]).join(' + ');
  const isCircuit = config.mode === 'circuit';
  const uniqueExercises = isCircuit ? routine.filter((e) => e.round === 1) : routine;

  return (
    <div>
      <TopBar onBack={onBack} title="Tu rutina" step={{ current: 4, total: 4 }} />
      <div className="screen">
        <h1 className="preview-screen__title">
          {groupLabel} · {LEVEL_LABELS[level]}
        </h1>
        <p className="preview-screen__caption">
          {isCircuit
            ? `${uniqueExercises.length} ejercicios × ${config.mode === 'circuit' ? config.rounds : 1} rondas`
            : `${routine.length} ejercicios · ${config.mode === 'time' ? config.duration : ''} minutos aproximados`}
        </p>

        <div className="preview-screen__list">
          {uniqueExercises.map((ex) => (
            <div key={`${ex.id}-${ex.order}`} className="preview-item">
              <span className="preview-item__index">{ex.order}</span>
              <span className="preview-item__icon">
                <DynamicIcon name={ex.icon} size={20} />
              </span>
              <div className="preview-item__info">
                <p className="preview-item__name">{ex.name}</p>
                <p className="preview-item__meta">
                  {MUSCLE_GROUP_LABELS[ex.muscleGroup]} · {ex.sets} series · {ex.reps}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="preview-screen__cta">
        <button className="start-button" onClick={onStart}>
          Empezar rutina
        </button>
      </div>
    </div>
  );
}
