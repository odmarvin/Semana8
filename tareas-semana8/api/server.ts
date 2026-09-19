import cors from 'cors';
import express from 'express';
import { randomUUID } from 'node:crypto';

type Tarea = {
  id: string; titulo: string;
  materia: string; hecha: boolean;
};

const tareas: Tarea[] = [
    {
        id: randomUUID(),
        titulo: 'repaso examen',
        materia: 'Matematica',
        hecha: false
    },
    {
        id: randomUUID(),
        titulo: 'ejercicios integrales',
        materia: 'Matematica',
        hecha: false
    },
    {
        id: randomUUID(),
        titulo: 'Ejercicios Campo Electrico',
        materia: 'Fisica',
        hecha: false
    },
        {
        id: randomUUID(),
        titulo: 'Tarea semana 8',
        materia: 'Programacion',
        hecha: false
    }
 ];

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.get('/tareas', async (_req, res) => {
  await new Promise((r) => setTimeout(r, 600));
  res.json(tareas);
});

app.patch('/tareas/:id', async (req, res) => {
  const tarea = tareas.find((t) => t.id === req.params.id);

  if (!tarea) {
    return res.status(404).json({ mensaje: 'Tarea no encontrada' });
  }

  tarea.hecha = !tarea.hecha;
  res.json(tarea);
});

app.listen(4000, () => {console.log('API lista en http://localhost:4000/tareas');
 
});