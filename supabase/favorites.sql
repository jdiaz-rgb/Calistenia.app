-- Ejecuta esto en Supabase: Panel del proyecto → SQL Editor → New query → pega y "Run"

create table if not exists favorites (
  id uuid primary key default gen_random_uuid(),
  exercise_id text not null unique,
  name text not null,
  muscle_group text not null,
  icon text not null,
  created_at timestamptz default now()
);

-- Activamos seguridad a nivel de fila (obligatorio en Supabase)
alter table favorites enable row level security;

-- Política simple: como es una app personal sin login, permitimos
-- leer/escribir a cualquiera que use la "anon key" (la clave pública
-- de tu proyecto, la misma que pondrás en las variables de entorno).
-- Si en el futuro añades login de usuarios, sustituye esto por políticas
-- que filtren por auth.uid().
create policy "Acceso anónimo total a favoritos"
  on favorites
  for all
  using (true)
  with check (true);
