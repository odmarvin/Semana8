'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { traerTareas } from '../lib/api';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

type Tarea = {
  id: string;
  titulo: string;
  hecha: boolean;
};

export function ListaViva({ iniciales }: { iniciales: Tarea[] }) {
  const cache = useQueryClient();

  const { data: tareas } = useQuery({
    queryKey: ['tareas'],
    queryFn: traerTareas,
    initialData: iniciales,
  });

  const marcar = useMutation({
    mutationFn: async (id: string) => {
      const r = await fetch(`${API}/tareas/${id}`, {
        method: 'PATCH',
      });
      if (!r.ok) throw new Error('No pude actualizar');
      return r.json();
    },
    onSuccess: () => {
      cache.invalidateQueries({ queryKey: ['tareas'] });
    },
  });

  return (
    <ul>
      {tareas?.map((tarea) => (
        <li key={tarea.id} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={tarea.hecha}
            onChange={() => marcar.mutate(tarea.id)}
          />
          <span>{tarea.titulo}</span>
        </li>
      ))}
    </ul>
  );
}