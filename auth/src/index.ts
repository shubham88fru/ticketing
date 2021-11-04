import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handlers';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.set('trust proxy', true); // Trust https connection being proxies from ingress

// Middlewares
app.use(json());
app.use(cookieSession({ signed: false, secure: true }));
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// Fallback for all non existent errors
app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('Connected to mongo db');
  } catch (err) {
    console.log(err);
  }

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log('Listening on port 3000');
  });
};

start();
