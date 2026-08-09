import { DynamicIcon } from './DynamicIcon';
import { Check } from 'lucide-react';
import './CategoryCard.css';

interface CategoryCardProps {
  label: string;
  icon: string;
  color: string;
  colorSoft: string;
  selected?: boolean;
  onClick: () => void;
}

export function CategoryCard({ label, icon, color, colorSoft, selected, onClick }: CategoryCardProps) {
  return (
    <button
      className={`category-card ${selected ? 'is-selected' : ''}`}
      style={{ '--accent': color, '--accent-soft': colorSoft } as React.CSSProperties}
      onClick={onClick}
    >
      <span className="category-card__icon">
        <DynamicIcon name={icon} size={26} strokeWidth={2} />
      </span>
      <span className="category-card__label">{label}</span>
      <span className={`category-card__checkbox ${selected ? 'is-checked' : ''}`}>
        {selected && <Check size={14} strokeWidth={3} />}
      </span>
    </button>
  );
}
