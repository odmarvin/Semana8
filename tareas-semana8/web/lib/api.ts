//lib/api.ts
import type { Tarea } from '@/lib/tareas.schema';

export const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

export async function traerTareas(): Promise<Tarea[]> {
  const respuesta = await fetch(`${API}/tareas`, { cache: 'no-store' });
  
  if (!respuesta.ok) throw new Error('La API no respondió. ¿Está corriendo en el 4000?');
  
  return respuesta.json();
}

/** Lo que la API devuelve cuando algo sale mal. */
export type ErrorApi = {
  mensaje: string;
  errores: Record<string, string>;
};