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
  const [muscleGroups, setMuscleGroups] = useState<MuscleGroup[]>([]);
  const [level, setLevel] = useState<Level | null>(null);
  const [duration, setDuration] = useState<DurationMinutes | null>(null);
  const [routine, setRoutine] = useState<RoutineExercise[]>([]);

  const backdropStyle = useMemo(() => {
    if (muscleGroups.length === 0) return undefined;
    return { '--accent-soft': ACCENT_SOFT[muscleGroups[0]] } as React.CSSProperties;
  }, [muscleGroups]);

  const handleToggleMuscleGroup = (group: MuscleGroup) => {
    setMuscleGroups((prev) =>
      prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group]
    );
  };

  const handleContinueFromHome = () => {
    if (muscleGroups.length === 0) return;
    setStep('level');
  };

  const handleSelectLevel = (l: Level) => {
    setLevel(l);
    setStep('duration');
  };

  const handleSelectDuration = (d: DurationMinutes) => {
    if (muscleGroups.length === 0 || !level) return;
    setDuration(d);
    const generated = generateRoutine({ muscleGroups, level, duration: d });
    setRoutine(generated);
    setStep('preview');
  };

  const handleRestart = () => {
    setMuscleGroups([]);
    setLevel(null);
    setDuration(null);
    setRoutine([]);
    setStep('home');
  };

  return (
    <div className="app-shell">
      <div className="glow-backdrop" style={backdropStyle} />

      {step === 'home' && (
        <HomeScreen
          selectedMuscleGroups={muscleGroups}
          onToggleMuscleGroup={handleToggleMuscleGroup}
          onContinue={handleContinueFromHome}
          onOpenFavorites={() => setStep('favorites')}
        />
      )}

      {step === 'favorites' && <FavoritesScreen onBack={() => setStep('home')} />}

      {step === 'level' && muscleGroups.length > 0 && (
        <LevelScreen muscleGroups={muscleGroups} onSelect={handleSelectLevel} onBack={() => setStep('home')} />
      )}

      {step === 'duration' && (
        <DurationScreen onSelect={handleSelectDuration} onBack={() => setStep('level')} />
      )}

      {step === 'preview' && muscleGroups.length > 0 && level && duration && (
        <RoutinePreviewScreen
          muscleGroups={muscleGroups}
          level={level}
          duration={duration}
          routine={routine}
          onStart={() => setStep('workout')}
          onBack={() => setStep('duration')}
        />
      )}

      {step === 'workout' && muscleGroups.length > 0 && routine.length > 0 && (
        <WorkoutScreen routine={routine} onExit={() => setStep('preview')} onFinish={() => setStep('done')} />
      )}

      {step === 'done' && muscleGroups.length > 0 && level && duration && (
        <CompletionScreen
          muscleGroups={muscleGroups}
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
