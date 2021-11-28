import dotenv from 'dotenv';
import express from 'express';
import personRouter from './src/resources/person/person.router.mjs';
import createHttpError from './src/utils/createHttpError.mjs';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/', async (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/person', personRouter);

app.use((req, res, next) => {
  next(createHttpError(404, 'Page not found'));
});

app.use((err, req, res, _next) => {
  res.status(err.status);
  res.json({ message: err.message });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`App is running on http://localhost:${PORT}`));
