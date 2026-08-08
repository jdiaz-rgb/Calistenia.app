import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, SkipForward, X } from 'lucide-react';
import { DynamicIcon } from '../components/DynamicIcon';
import { ProgressRing } from '../components/ProgressRing';
import { FavoriteButton } from '../components/FavoriteButton';
import { useCountdown } from '../hooks/useCountdown';
import { addFavorite, isFavorite, removeFavorite } from '../data/favorites';
import type { MuscleGroup, RoutineExercise } from '../types/exercise';
import './WorkoutScreen.css';

interface WorkoutScreenProps {
  routine: RoutineExercise[];
  muscleGroup: MuscleGroup;
  onExit: () => void;
  onFinish: () => void;
}

const GROUP_COLOR: Record<MuscleGroup, string> = {
  pecho: 'var(--color-pecho)',
  hombros: 'var(--color-hombros)',
  abdominales: 'var(--color-abdominales)',
  piernas: 'var(--color-piernas)',
  gluteos: 'var(--color-gluteos)',
};

type Phase = 'trabajo' | 'descanso';

export function WorkoutScreen({ routine, muscleGroup, onExit, onFinish }: WorkoutScreenProps) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('trabajo');
  const exercise = routine[index];
  const accent = GROUP_COLOR[muscleGroup];
  const isLast = index === routine.length - 1;

  const isTimed = Boolean(exercise.workSeconds);
  const phaseSeconds = phase === 'trabajo' ? exercise.workSeconds ?? 0 : exercise.restSeconds;

  const [favorite, setFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  useEffect(() => {
    let active = true;
    isFavorite(exercise.id).then((value) => {
      if (active) setFavorite(value);
    });
    return () => {
      active = false;
    };
  }, [exercise.id]);

  const toggleFavorite = async () => {
    setFavoriteLoading(true);
    if (favorite) {
      await removeFavorite(exercise.id);
      setFavorite(false);
    } else {
      await addFavorite(exercise);
      setFavorite(true);
    }
    setFavoriteLoading(false);
  };

  const goNext = () => {
    if (phase === 'trabajo') {
      setPhase('descanso');
    } else if (isLast) {
      onFinish();
    } else {
      setIndex((i) => i + 1);
      setPhase('trabajo');
    }
  };

  const goPrev = () => {
    if (phase === 'descanso') {
      setPhase('trabajo');
    } else if (index > 0) {
      setIndex((i) => i - 1);
      setPhase('trabajo');
    }
  };

  const { secondsLeft, isRunning, toggle, reset } = useCountdown(phaseSeconds || exercise.restSeconds, {
    onComplete: () => {
      if (phase === 'trabajo') setPhase('descanso');
      else goNext();
    },
  });

  useEffect(() => {
    reset(phaseSeconds || exercise.restSeconds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, phase]);

  const total = phaseSeconds || exercise.restSeconds || 1;
  const progress = 1 - secondsLeft / total;
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="workout-screen" style={{ '--accent': accent } as React.CSSProperties}>
      <div className="workout-screen__top">
        <button className="workout-screen__icon-btn" onClick={onExit} aria-label="Salir">
          <X size={20} />
        </button>
        <span className="workout-screen__progress-text">
          {index + 1} / {routine.length}
        </span>
        <FavoriteButton isFavorite={favorite} onToggle={toggleFavorite} loading={favoriteLoading} />
      </div>

      <div className="workout-screen__hero">
        <div className="workout-screen__media">
          <DynamicIcon name={exercise.icon} size={72} strokeWidth={1.6} />
        </div>
        <h1 className="workout-screen__name">{exercise.name}</h1>
        <span className="workout-screen__phase-badge">{phase === 'trabajo' ? 'En ejercicio' : 'Descanso'}</span>
      </div>

      <div className="workout-screen__timer">
        <ProgressRing progress={progress} color={phase === 'trabajo' ? accent : '#ffffff'} size={220} strokeWidth={12}>
          <span className="workout-screen__time">
            {minutes}:{seconds.toString().padStart(2, '0')}
          </span>
          <span className="workout-screen__time-label">
            {phase === 'trabajo' ? (isTimed ? 'restantes' : 'sugeridos') : 'de descanso'}
          </span>
        </ProgressRing>
        <button className="workout-screen__play-pause" onClick={toggle} aria-label={isRunning ? 'Pausar' : 'Reanudar'}>
          {isRunning ? <Pause size={22} /> : <Play size={22} />}
        </button>
      </div>

      <div className="workout-screen__stats">
        <div className="workout-stat">
          <span className="workout-stat__value">{exercise.sets}</span>
          <span className="workout-stat__label">Series</span>
        </div>
        <div className="workout-stat">
          <span className="workout-stat__value">{exercise.reps}</span>
          <span className="workout-stat__label">Repeticiones</span>
        </div>
        <div className="workout-stat">
          <span className="workout-stat__value">{exercise.restSeconds}s</span>
          <span className="workout-stat__label">Descanso</span>
        </div>
      </div>

      <div className="workout-screen__details">
        <p className="workout-screen__description">{exercise.description}</p>
        <ol className="workout-screen__steps">
          {exercise.steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
        {exercise.tips && <p className="workout-screen__tip">💡 {exercise.tips}</p>}
      </div>

      <div className="workout-screen__nav">
        <button
          className="workout-nav-btn"
          onClick={goPrev}
          disabled={index === 0 && phase === 'trabajo'}
          aria-label="Anterior"
        >
          <ChevronLeft size={20} />
          Anterior
        </button>
        <button className="workout-nav-btn workout-nav-btn--skip" onClick={goNext} aria-label="Saltar">
          <SkipForward size={16} />
        </button>
        <button className="workout-nav-btn workout-nav-btn--primary" onClick={goNext} aria-label="Siguiente">
          {phase === 'trabajo' ? 'Descanso' : isLast ? 'Terminar' : 'Siguiente'}
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
