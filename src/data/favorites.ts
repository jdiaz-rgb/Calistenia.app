import { supabase } from '../lib/supabase';
import type { Exercise, MuscleGroup } from '../types/exercise';

export interface FavoriteRow {
  id: string;
  exercise_id: string;
  name: string;
  muscle_group: MuscleGroup;
  icon: string;
  created_at: string;
}

export async function getFavorites(): Promise<FavoriteRow[]> {
  const { data, error } = await supabase
    .from('favorites')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[favorites] Error al obtener favoritos:', error.message);
    return [];
  }
  return data ?? [];
}

export async function isFavorite(exerciseId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('favorites')
    .select('id')
    .eq('exercise_id', exerciseId)
    .maybeSingle();

  if (error) {
    console.error('[favorites] Error al comprobar favorito:', error.message);
    return false;
  }
  return Boolean(data);
}

export async function addFavorite(exercise: Exercise): Promise<void> {
  const { error } = await supabase.from('favorites').insert({
    exercise_id: exercise.id,
    name: exercise.name,
    muscle_group: exercise.muscleGroup,
    icon: exercise.icon,
  });

  if (error) {
    console.error('[favorites] Error al añadir favorito:', error.message);
  }
}

export async function removeFavorite(exerciseId: string): Promise<void> {
  const { error } = await supabase.from('favorites').delete().eq('exercise_id', exerciseId);

  if (error) {
    console.error('[favorites] Error al quitar favorito:', error.message);
  }
}
