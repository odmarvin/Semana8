//lib/tareas.schema.ts
import { z } from 'zod';

export const crearTarea = z.object({
  titulo: z
    .string()
    .trim()
    .min(3, 'Escribe al menos 3 caracteres')
    .max(80, 'Máximo 80 caracteres'),
    materia: z.enum(['Programación IV', 'Base de Datos', 'Redes'], {
    invalid_type_error: 'Elige una materia de la lista',
    required_error: 'La materia es obligatoria',
  }),
});

export type CrearTarea = z.infer<typeof crearTarea>;
export type Tarea = CrearTarea & { id: string; hecha: boolean };

export const MATERIAS = ['Programación IV', 'Base de Datos', 'Redes'] as const;