import { ChevronLeft } from 'lucide-react';
import './TopBar.css';

interface TopBarProps {
  title?: string;
  onBack?: () => void;
  step?: { current: number; total: number };
}

export function TopBar({ title, onBack, step }: TopBarProps) {
  return (
    <div className="top-bar">
      <div className="top-bar__left">
        {onBack && (
          <button className="top-bar__back" onClick={onBack} aria-label="Volver">
            <ChevronLeft size={22} />
          </button>
        )}
      </div>
      {title && <h2 className="top-bar__title">{title}</h2>}
      <div className="top-bar__right">
        {step && (
          <div className="top-bar__steps" aria-label={`Paso ${step.current} de ${step.total}`}>
            {Array.from({ length: step.total }).map((_, i) => (
              <span key={i} className={`top-bar__dot ${i < step.current ? 'is-active' : ''}`} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
