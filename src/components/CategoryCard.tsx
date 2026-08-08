import { DynamicIcon } from './DynamicIcon';
import './CategoryCard.css';

interface CategoryCardProps {
  label: string;
  icon: string;
  color: string;
  colorSoft: string;
  onClick: () => void;
}

export function CategoryCard({ label, icon, color, colorSoft, onClick }: CategoryCardProps) {
  return (
    <button
      className="category-card"
      style={{ '--accent': color, '--accent-soft': colorSoft } as React.CSSProperties}
      onClick={onClick}
    >
      <span className="category-card__icon">
        <DynamicIcon name={icon} size={26} strokeWidth={2} />
      </span>
      <span className="category-card__label">{label}</span>
      <DynamicIcon name="chevron-right" size={18} className="category-card__chevron" />
    </button>
  );
}
