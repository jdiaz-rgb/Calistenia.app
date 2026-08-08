import { TopBar } from '../components/TopBar';
import { OptionCard } from '../components/OptionCard';
import './SelectionScreen.css';

interface ModeScreenProps {
  onSelect: (mode: 'time' | 'circuit') => void;
  onBack: () => void;
}

export function ModeScreen({ onSelect, onBack }: ModeScreenProps) {
  return (
    <div>
      <TopBar onBack={onBack} title="Modo de entreno" step={{ current: 2, total: 4 }} />
      <div className="screen">
        <h1 className="selection-screen__title">¿Cómo quieres entrenar?</h1>
        <p className="selection-screen__caption">
          Elige si prefieres una sesión con un tiempo total, o un circuito de ejercicios que repites por rondas.
        </p>
        <div className="selection-screen__list">
          <OptionCard
            title="Por tiempo"
            subtitle="Eliges cuántos minutos quieres entrenar"
            onClick={() => onSelect('time')}
          />
          <OptionCard
            title="Por circuito"
            subtitle="Eliges cuántos ejercicios distintos y cuántas rondas repites"
            onClick={() => onSelect('circuit')}
          />
        </div>
      </div>
    </div>
  );
}
