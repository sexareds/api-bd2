import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import usersRoutes from './routes/users.routes.js';
import eventsRoutes from './routes/events.routes.js';
import teamsRoutes from './routes/teams.routes.js';
import playersRoutes from './routes/players.routes.js';
import stickersRoutes from './routes/stickers.routes.js';
import gamesRoutes from './routes/games.routes.js';
import promotionsRoutes from './routes/promotions.routes.js';
import { initialPage } from './middleware/initialPage.js';
import { notFound } from './middleware/notFound.js';

const PORT = 3000;

const app = express(); 

// middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/api', usersRoutes);
app.use('/api', eventsRoutes);
app.use('/api', teamsRoutes);
app.use('/api', playersRoutes);
app.use('/api', stickersRoutes);
app.use('/api', gamesRoutes);
app.use('/api', promotionsRoutes);

app.use('/', initialPage);
app.use(notFound);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
