import { app } from './app';
import mongoose from 'mongoose';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

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
