import { useEffect, useState } from 'react';
import { HeartOff } from 'lucide-react';
import { TopBar } from '../components/TopBar';
import { DynamicIcon } from '../components/DynamicIcon';
import { getFavorites, removeFavorite, type FavoriteRow } from '../data/favorites';
import { MUSCLE_GROUP_LABELS } from '../types/exercise';
import './FavoritesScreen.css';

interface FavoritesScreenProps {
  onBack: () => void;
}

export function FavoritesScreen({ onBack }: FavoritesScreenProps) {
  const [favorites, setFavorites] = useState<FavoriteRow[] | null>(null);

  useEffect(() => {
    getFavorites().then(setFavorites);
  }, []);

  const handleRemove = async (exerciseId: string) => {
    setFavorites((prev) => prev?.filter((f) => f.exercise_id !== exerciseId) ?? prev);
    await removeFavorite(exerciseId);
  };

  return (
    <div>
      <TopBar onBack={onBack} title="Favoritos" />
      <div className="screen favorites-screen">
        <h1 className="favorites-screen__title">Tus favoritos</h1>

        {favorites === null && <p className="favorites-screen__caption">Cargando...</p>}

        {favorites?.length === 0 && (
          <div className="favorites-screen__empty">
            <HeartOff size={32} />
            <p>Aún no has guardado ningún ejercicio.</p>
            <p className="favorites-screen__empty-hint">
              Toca el corazón durante un entrenamiento para guardarlo aquí.
            </p>
          </div>
        )}

        <div className="favorites-screen__list">
          {favorites?.map((fav) => (
            <div key={fav.id} className="favorite-item">
              <span className="favorite-item__icon">
                <DynamicIcon name={fav.icon} size={20} />
              </span>
              <div className="favorite-item__info">
                <p className="favorite-item__name">{fav.name}</p>
                <p className="favorite-item__meta">{MUSCLE_GROUP_LABELS[fav.muscle_group]}</p>
              </div>
              <button className="favorite-item__remove" onClick={() => handleRemove(fav.exercise_id)}>
                Quitar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
