import { exercises } from './exercises';
import type { Exercise, Level, RoutineConfig, RoutineExercise } from '../types/exercise';
// (MuscleGroup no se usa directamente aquí; viene incluido en RoutineConfig)

const LEVEL_ORDER: Level[] = ['principiante', 'intermedio', 'avanzado'];

/** Tiempo estimado (en segundos) que ocupa un ejercicio completo, incluyendo descansos entre series. */
function estimateExerciseSeconds(exercise: Exercise): number {
  const workPerSet = exercise.workSeconds ?? 40; // estimación si el ejercicio es por repeticiones
  return exercise.sets * workPerSet + (exercise.sets - 1) * exercise.restSeconds + exercise.restSeconds;
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Genera una rutina automática combinando ejercicios del grupo muscular elegido.
 * Prioriza el nivel exacto y, si no hay suficientes ejercicios, recurre a
 * niveles adyacentes para completar el tiempo solicitado.
 */
export function generateRoutine(config: RoutineConfig): RoutineExercise[] {
  const targetSeconds = config.duration * 60;
  const levelIndex = LEVEL_ORDER.indexOf(config.level);

  // Prioridad de niveles: el elegido primero, luego los más cercanos
  const levelPriority = [...LEVEL_ORDER].sort(
    (a, b) => Math.abs(LEVEL_ORDER.indexOf(a) - levelIndex) - Math.abs(LEVEL_ORDER.indexOf(b) - levelIndex)
  );

  const pool = shuffle(
    exercises
      .filter((e) => e.muscleGroup === config.muscleGroup)
      .sort((a, b) => levelPriority.indexOf(a.level) - levelPriority.indexOf(b.level))
  );

  if (pool.length === 0) return [];

  const selected: Exercise[] = [];
  let total = 0;
  let i = 0;

  // Vamos añadiendo ejercicios (repitiendo el ciclo si es necesario) hasta cubrir la duración
  while (total < targetSeconds) {
    const exercise = pool[i % pool.length];
    selected.push(exercise);
    total += estimateExerciseSeconds(exercise);
    i++;
    // Salvaguarda para evitar bucles infinitos con datos muy pequeños
    if (i > pool.length * 6) break;
  }

  return selected.map((exercise, index) => ({
    ...exercise,
    order: index + 1,
  }));
}
