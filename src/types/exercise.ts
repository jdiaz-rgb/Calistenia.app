// ─────────────────────────────────────────────────────────────
// MODELO DE DATOS
// Este archivo define la "forma" que debe tener cada ejercicio.
// Cuando exportes tu base de datos de NotebookLM, solo tienes que
// convertirla a este formato dentro de src/data/exercises.ts
// ─────────────────────────────────────────────────────────────

export type MuscleGroup =
  | 'pecho'
  | 'hombros'
  | 'abdominales'
  | 'piernas'
  | 'gluteos';

export type Level = 'principiante' | 'intermedio' | 'avanzado';

export type DurationMinutes = 10 | 20 | 30 | 45;

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  level: Level;
  description: string;
  /** Instrucciones cortas, paso a paso (se muestran como lista) */
  steps: string[];
  /** Nombre de icono de lucide-react a usar como placeholder visual.
   *  Cuando tengas tus propias imágenes/GIFs, sustituye este campo
   *  por `imageUrl` o `videoUrl` (ver ExerciseMedia más abajo). */
  icon: string;
  sets: number;
  reps: string; // string porque puede ser "12" o "30 segundos"
  restSeconds: number;
  /** Segundos que dura cada repetición/serie si el ejercicio es "por tiempo" */
  workSeconds?: number;
  equipment?: 'colchoneta' | 'ninguno';
  tips?: string;
}

export interface RoutineExercise extends Exercise {
  order: number;
}

export interface RoutineConfig {
  muscleGroups: MuscleGroup[];
  level: Level;
  duration: DurationMinutes;
}

export const MUSCLE_GROUP_LABELS: Record<MuscleGroup, string> = {
  pecho: 'Pecho',
  hombros: 'Hombros',
  abdominales: 'Abdominales',
  piernas: 'Piernas',
  gluteos: 'Glúteos',
};

export const LEVEL_LABELS: Record<Level, string> = {
  principiante: 'Principiante',
  intermedio: 'Intermedio',
  avanzado: 'Avanzado',
};
