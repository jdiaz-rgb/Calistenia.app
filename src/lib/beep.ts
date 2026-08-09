// ─────────────────────────────────────────────────────────────
// SONIDOS DE ENTRENAMIENTO
// Generamos los pitidos con Web Audio API (osciladores), así no
// necesitamos ningún archivo de audio externo.
//
// - playBeep('ready')  → pitido antes de EMPEZAR un ejercicio
// - playBeep('finish') → pitido antes de TERMINAR un ejercicio
//
// iOS/Safari bloquea el audio hasta que el usuario interactúa con
// la página, por eso exponemos `unlockAudio()` para llamarla dentro
// de un onClick (por ejemplo, el botón "Empezar rutina").
// ─────────────────────────────────────────────────────────────

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AudioContextClass =
    window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return null;

  if (!audioCtx) {
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    void audioCtx.resume();
  }
  return audioCtx;
}

/** Llamar dentro de un gesto del usuario (click/tap) para desbloquear el audio en iOS/Safari. */
export function unlockAudio() {
  getAudioContext();
}

type BeepKind = 'ready' | 'finish';

/**
 * Reproduce un pitido corto y sintetizado.
 * - 'ready'  → tono más grave, avisa que un ejercicio está a punto de empezar
 * - 'finish' → tono más agudo, avisa que un ejercicio está a punto de terminar
 */
export function playBeep(kind: BeepKind = 'ready') {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const frequency = kind === 'finish' ? 880 : 660;

  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  oscillator.type = 'sine';
  oscillator.frequency.value = frequency;

  // Envolvente rápida para que suene como un "beep" limpio, sin clics.
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.35, now + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

  oscillator.connect(gain);
  gain.connect(ctx.destination);

  oscillator.start(now);
  oscillator.stop(now + 0.25);
}
