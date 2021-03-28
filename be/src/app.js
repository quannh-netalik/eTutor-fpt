import './env.js';
import './mongoose.js';

import express from 'express';
import morgan from 'morgan';

import route from './routes/index.js';
import { allowCors, notFound, errorHandler } from './middlewares/index.js';

const app = express();
app.set('port', process.env.PORT);

app.all('*', allowCors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routing API
route(app);

// error handler
app.use(notFound);
app.use(errorHandler);

export default app;
