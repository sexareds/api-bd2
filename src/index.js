import express from 'express';
import usersRoutes from './routes/users.routes.js';
import eventsRoutes from './routes/events.routes.js';
import teamsRoutes from './routes/teams.routes.js';
import playersRoutes from './routes/players.routes.js';
import { initialPage } from './middleware/initialPage.js';
import { notFound } from './middleware/notFound.js';

const app = express(); 

app.use(express.json());

app.use('/api', usersRoutes);
app.use('/api', eventsRoutes);
app.use('/api', teamsRoutes);
app.use('/api', playersRoutes);

app.get('/', initialPage);
app.use(notFound);

app.listen(3000);
console.log('Server running on port 3000');
