import { traerTareas } from '../lib/api';
import { ListaViva } from './lista-viva';

export default async function Home() {
  const tareas = await traerTareas();

  return (
    <main>
      <h1>Tareas</h1>
      <ListaViva iniciales={tareas} />
    </main>
  );
}