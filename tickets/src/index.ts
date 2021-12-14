import { app } from './app';
import mongoose from 'mongoose';
import { natsWrapper } from './nats-wrappert';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    await natsWrapper.connect('ticketing', 'ghghk', 'http://nats-srv:4222');
    await mongoose.connect(process.env.MONGO_URI);
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
