import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
// import passport from 'passport';
// import passportConfig from './config/passport.js';
import session from 'express-session';
import authRoutes from './routes/auth.routes.js';
import path from 'path';
import {fileURLToPath} from 'url';
import bodyParser from 'body-parser';
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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicc = path.join(__dirname, 'public');

// passportConfig(passport);

// middlewares
app.use(express.static(publicc));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(passport.initialize());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
// app.use(passport.session());
app.use(cors());
app.use(morgan('dev'));


app.use('/api', authRoutes);
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
