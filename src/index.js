import express from 'express';
import usersRoutes from './routes/users.routes.js';
import eventsRoutes from './routes/events.routes.js';

const app = express(); 

app.use(express.json());

app.use('/api', usersRoutes);
app.use('/api', eventsRoutes);

app.listen(3000);
console.log('Server running on port 3000');
