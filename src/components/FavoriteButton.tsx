import { Heart } from 'lucide-react';
import './FavoriteButton.css';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
  loading?: boolean;
}

export function FavoriteButton({ isFavorite, onToggle, loading }: FavoriteButtonProps) {
  return (
    <button
      className={`favorite-button ${isFavorite ? 'is-active' : ''}`}
      onClick={onToggle}
      disabled={loading}
      aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
    >
      <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
    </button>
  );
}
