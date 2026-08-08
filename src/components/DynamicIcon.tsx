import * as icons from 'lucide-react';
import { Dumbbell } from 'lucide-react';
import type { LucideProps } from 'lucide-react';

interface DynamicIconProps extends LucideProps {
  name: string;
}

/**
 * Renderiza un icono de lucide-react a partir de su nombre en formato kebab-case
 * (el mismo que usas en el campo `icon` de cada ejercicio).
 * Si el nombre no existe, cae de vuelta a un icono genérico (Dumbbell).
 */
export function DynamicIcon({ name, ...props }: DynamicIconProps) {
  const pascalName = name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (icons as any)[pascalName] ?? Dumbbell;
  return <IconComponent {...props} />;
}
