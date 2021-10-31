import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handlers';
import { NotFoundError } from './errors/not-found-error';

const app = express();

// Middlewares
app.use(json());
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// Fallback for all non existent errors
app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
  console.log('Listening on port 3000');
});
