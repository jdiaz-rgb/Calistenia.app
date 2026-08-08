# Calistenia App 💪

App web de rutinas de calistenia (solo colchoneta), estilo Apple Fitness, optimizada para iPhone.

## Cómo ejecutarla en tu ordenador

```bash
npm install
npm run dev
```

Abre la URL que aparece en la terminal (normalmente http://localhost:5173).

Para verla en tu iPhone en la misma red Wi-Fi, ejecuta en su lugar:

```bash
npm run dev -- --host
```

y abre en Safari la URL tipo http://TU_IP_LOCAL:5173 que aparecerá en la terminal.

## Cómo instalarla en la pantalla de inicio del iPhone (como una app)

1. Sube la app a un hosting (Vercel, Netlify, GitHub Pages...) o accede a ella en tu red local.
2. Ábrela en Safari en el iPhone.
3. Toca el botón de compartir (el cuadrado con la flecha hacia arriba).
4. Elige "Añadir a pantalla de inicio".

Se instalará con icono propio y sin barra de Safari, como una app nativa (PWA).

## Cómo reemplazar la base de datos de ejercicios (NotebookLM)

Edita src/data/exercises.ts. Cada ejercicio debe seguir esta forma (definida en src/types/exercise.ts):

```ts
{
  id: 'pecho-01',
  name: 'Flexiones de rodillas',
  muscleGroup: 'pecho', // 'pecho' | 'hombros' | 'abdominales' | 'piernas' | 'gluteos'
  level: 'principiante', // 'principiante' | 'intermedio' | 'avanzado'
  description: 'Explicación general del ejercicio.',
  steps: ['Paso 1...', 'Paso 2...'],
  icon: 'heart-pulse', // nombre de icono de https://lucide.dev/icons
  sets: 3,
  reps: '10', // o '30 segundos'
  restSeconds: 45,
  workSeconds: 30, // opcional, solo si el ejercicio se hace "por tiempo"
  equipment: 'colchoneta',
  tips: 'Consejo opcional',
}
```

Exporta tu base de datos de NotebookLM a esta estructura (puedes pedirle a Claude que te ayude a convertir tu lista/CSV a este formato exacto).

## Cómo añadir imágenes o vídeos reales de cada ejercicio

Ahora mismo cada ejercicio usa un icono (icon) como marcador visual. Para usar tus propias fotos/GIFs:

1. Coloca tus archivos en src/assets/exercises/.
2. En src/types/exercise.ts, añade un campo imageUrl?: string o videoUrl?: string a la interfaz Exercise.
3. En src/screens/WorkoutScreen.tsx, sustituye el bloque <DynamicIcon ... /> dentro de workout-screen__media por una etiqueta <img> o <video> que use ese campo.

## Estructura del proyecto

```
src/
  types/exercise.ts        -> modelo de datos
  data/exercises.ts        -> base de datos de ejercicios (¡edítala!)
  data/generateRoutine.ts  -> lógica que genera la rutina automática
  hooks/useCountdown.ts    -> temporizador
  components/              -> piezas reutilizables (tarjetas, anillo de progreso, iconos)
  screens/                 -> las pantallas: inicio, nivel, duración, resumen, entrenamiento, fin
  assets/cover.jpeg        -> tu foto de portada
```

## Publicar la app (para poder abrirla desde el iPhone)

La forma más simple y gratuita es Vercel:

```bash
npm install -g vercel
vercel
```

Sigue las instrucciones en pantalla; al terminar te dará una URL pública para abrir desde Safari en tu iPhone.
