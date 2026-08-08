import { useState } from 'react';
import { TopBar } from '../components/TopBar';
import './SelectionScreen.css';
import './CircuitScreen.css';

interface CircuitScreenProps {
  onConfirm: (exerciseCount: number, rounds: number) => void;
  onBack: () => void;
}

const EXERCISE_OPTIONS = [4, 6, 8, 10, 12];
const ROUND_OPTIONS = [2, 3, 4, 6, 8];

export function CircuitScreen({ onConfirm, onBack }: CircuitScreenProps) {
  const [exerciseCount, setExerciseCount] = useState<number | null>(null);
  const [rounds, setRounds] = useState<number | null>(null);

  const canConfirm = exerciseCount !== null && rounds !== null;

  return (
    <div>
      <TopBar onBack={onBack} title="Circuito" step={{ current: 3, total: 4 }} />
      <div className="screen" style={{ paddingBottom: 110 }}>
        <h1 className="selection-screen__title">Configura tu circuito</h1>
        <p className="selection-screen__caption">
          Elegimos ejercicios distintos de tus grupos musculares seleccionados y los repites por rondas.
        </p>

        <p className="circuit-screen__label">¿Cuántos ejercicios diferentes?</p>
        <div className="circuit-screen__chips">
          {EXERCISE_OPTIONS.map((n) => (
            <button
              key={n}
              className={`circuit-chip ${exerciseCount === n ? 'is-selected' : ''}`}
              onClick={() => setExerciseCount(n)}
            >
              {n}
            </button>
          ))}
        </div>

        <p className="circuit-screen__label" style={{ marginTop: 28 }}>¿Cuántas rondas quieres hacer?</p>
        <div className="circuit-screen__chips">
          {ROUND_OPTIONS.map((n) => (
            <button
              key={n}
              className={`circuit-chip ${rounds === n ? 'is-selected' : ''}`}
              onClick={() => setRounds(n)}
            >
              {n}
            </button>
          ))}
        </div>

        {canConfirm && (
          <p className="circuit-screen__summary">
            {exerciseCount} ejercicios × {rounds} rondas = {exerciseCount! * rounds!} ejercicios en total
          </p>
        )}
      </div>

      {canConfirm && (
        <div className="preview-screen__cta">
          <button className="start-button" onClick={() => onConfirm(exerciseCount!, rounds!)}>
            Generar circuito
          </button>
        </div>
      )}
    </div>
  );
}
