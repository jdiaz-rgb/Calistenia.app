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
 * Genera una rutina automática combinando ejercicios de uno o varios grupos
 * musculares. Prioriza el nivel exacto y, si no hay suficientes ejercicios,
 * recurre a niveles adyacentes para completar el tiempo solicitado.
 *
 * Si se eligen varios grupos musculares, los ejercicios se intercalan
 * (round-robin) para que la rutina quede mezclada en lugar de hacer
 * primero todo un grupo y luego el siguiente.
 */
export function generateRoutine(config: RoutineConfig): RoutineExercise[] {
  const targetSeconds = config.duration * 60;
  const levelIndex = LEVEL_ORDER.indexOf(config.level);

  // Prioridad de niveles: el elegido primero, luego los más cercanos
  const levelPriority = [...LEVEL_ORDER].sort(
    (a, b) => Math.abs(LEVEL_ORDER.indexOf(a) - levelIndex) - Math.abs(LEVEL_ORDER.indexOf(b) - levelIndex)
  );

  // Un "pool" (mazo de cartas) por cada grupo muscular elegido, ya barajado
  // y ordenado por cercanía al nivel elegido.
  const pools = config.muscleGroups
    .map((group) =>
      shuffle(
        exercises
          .filter((e) => e.muscleGroup === group)
          .sort((a, b) => levelPriority.indexOf(a.level) - levelPriority.indexOf(b.level))
      )
    )
    .filter((pool) => pool.length > 0);

  if (pools.length === 0) return [];

  const selected: Exercise[] = [];
  let total = 0;
  const cursors = pools.map(() => 0);
  let groupTurn = 0;
  let safety = 0;
  const maxIterations = pools.reduce((sum, pool) => sum + pool.length, 0) * 6;

  // Vamos añadiendo ejercicios turnándonos entre grupos (round-robin) hasta
  // cubrir la duración solicitada, repitiendo el ciclo de cada grupo si es necesario.
  while (total < targetSeconds && safety < maxIterations) {
    const pool = pools[groupTurn % pools.length];
    const cursorIndex = groupTurn % pools.length;
    const exercise = pool[cursors[cursorIndex] % pool.length];

    selected.push(exercise);
    total += estimateExerciseSeconds(exercise);
    cursors[cursorIndex]++;
    groupTurn++;
    safety++;
  }

  return selected.map((exercise, index) => ({
    ...exercise,
    order: index + 1,
  }));
}
