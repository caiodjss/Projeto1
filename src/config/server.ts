import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import docenteRoutes from '../routes/docente.routes';
import pdfRoutes from '../routes/pdf.routes';
import coordenadorRoutes from '../routes/coordenador.routes';
import horarioRoutes from '../routes/horario.routes';
import turmaRoutes from '../routes/turma.routes';
import usuarioRoutes from '../routes/usuario.routes';
import setupSwagger from './swagger';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../../public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

app.use('/api/docentes', docenteRoutes);
app.use('/api/coordenadores', coordenadorRoutes);
app.use('/api/turmas', turmaRoutes);
app.use('/api/horarios', horarioRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/pdf', pdfRoutes);

const PORT = process.env.PORT ?? 3000;

setupSwagger(app);

export default app;