import { useMemo, useState } from 'react';
import { HomeScreen } from './screens/HomeScreen';
import { LevelScreen } from './screens/LevelScreen';
import { DurationScreen } from './screens/DurationScreen';
import { RoutinePreviewScreen } from './screens/RoutinePreviewScreen';
import { WorkoutScreen } from './screens/WorkoutScreen';
import { CompletionScreen } from './screens/CompletionScreen';
import { FavoritesScreen } from './screens/FavoritesScreen';
import { generateRoutine } from './data/generateRoutine';
import type { DurationMinutes, Level, MuscleGroup, RoutineExercise } from './types/exercise';

type Step = 'home' | 'level' | 'duration' | 'preview' | 'workout' | 'done' | 'favorites';

const ACCENT_SOFT: Record<MuscleGroup, string> = {
  pecho: 'var(--color-pecho-soft)',
  hombros: 'var(--color-hombros-soft)',
  abdominales: 'var(--color-abdominales-soft)',
  piernas: 'var(--color-piernas-soft)',
  gluteos: 'var(--color-gluteos-soft)',
};

function App() {
  const [step, setStep] = useState<Step>('home');
  const [muscleGroup, setMuscleGroup] = useState<MuscleGroup | null>(null);
  const [level, setLevel] = useState<Level | null>(null);
  const [duration, setDuration] = useState<DurationMinutes | null>(null);
  const [routine, setRoutine] = useState<RoutineExercise[]>([]);

  const backdropStyle = useMemo(() => {
    if (!muscleGroup) return undefined;
    return { '--accent-soft': ACCENT_SOFT[muscleGroup] } as React.CSSProperties;
  }, [muscleGroup]);

  const handleSelectMuscleGroup = (group: MuscleGroup) => {
    setMuscleGroup(group);
    setStep('level');
  };

  const handleSelectLevel = (l: Level) => {
    setLevel(l);
    setStep('duration');
  };

  const handleSelectDuration = (d: DurationMinutes) => {
    if (!muscleGroup || !level) return;
    setDuration(d);
    const generated = generateRoutine({ muscleGroup, level, duration: d });
    setRoutine(generated);
    setStep('preview');
  };

  const handleRestart = () => {
    setMuscleGroup(null);
    setLevel(null);
    setDuration(null);
    setRoutine([]);
    setStep('home');
  };

  return (
    <div className="app-shell">
      <div className="glow-backdrop" style={backdropStyle} />

      {step === 'home' && (
        <HomeScreen onSelectMuscleGroup={handleSelectMuscleGroup} onOpenFavorites={() => setStep('favorites')} />
      )}

      {step === 'favorites' && <FavoritesScreen onBack={() => setStep('home')} />}

      {step === 'level' && muscleGroup && (
        <LevelScreen muscleGroup={muscleGroup} onSelect={handleSelectLevel} onBack={() => setStep('home')} />
      )}

      {step === 'duration' && (
        <DurationScreen onSelect={handleSelectDuration} onBack={() => setStep('level')} />
      )}

      {step === 'preview' && muscleGroup && level && duration && (
        <RoutinePreviewScreen
          muscleGroup={muscleGroup}
          level={level}
          duration={duration}
          routine={routine}
          onStart={() => setStep('workout')}
          onBack={() => setStep('duration')}
        />
      )}

      {step === 'workout' && muscleGroup && routine.length > 0 && (
        <WorkoutScreen
          routine={routine}
          muscleGroup={muscleGroup}
          onExit={() => setStep('preview')}
          onFinish={() => setStep('done')}
        />
      )}

      {step === 'done' && muscleGroup && level && duration && (
        <CompletionScreen
          muscleGroup={muscleGroup}
          level={level}
          duration={duration}
          exerciseCount={routine.length}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

export default App;
