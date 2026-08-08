import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const PLACEHOLDER_URL = 'https://placeholder.supabase.co';
const PLACEHOLDER_KEY = 'placeholder';

function isValidUrl(value: string | undefined): value is string {
  if (!value) return false;
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

function buildClient() {
  if (isValidUrl(supabaseUrl) && supabaseAnonKey) {
    try {
      return createClient(supabaseUrl, supabaseAnonKey);
    } catch (error) {
      console.error('[Supabase] No se pudo crear el cliente con las variables proporcionadas:', error);
      return createClient(PLACEHOLDER_URL, PLACEHOLDER_KEY);
    }
  }
  console.warn(
    '[Supabase] VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY no están configuradas correctamente. Los favoritos no funcionarán hasta que las revises en Netlify/Vercel.'
  );
  return createClient(PLACEHOLDER_URL, PLACEHOLDER_KEY);
}

export const supabase = buildClient();
