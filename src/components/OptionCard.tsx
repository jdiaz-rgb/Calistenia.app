import './OptionCard.css';

interface OptionCardProps {
  title: string;
  subtitle?: string;
  accent?: string;
  onClick: () => void;
}

export function OptionCard({ title, subtitle, accent, onClick }: OptionCardProps) {
  return (
    <button
      className="option-card"
      style={accent ? ({ '--accent': accent } as React.CSSProperties) : undefined}
      onClick={onClick}
    >
      <span className="option-card__title">{title}</span>
      {subtitle && <span className="option-card__subtitle">{subtitle}</span>}
    </button>
  );
}
