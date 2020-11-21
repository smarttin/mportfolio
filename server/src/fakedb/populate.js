import mongoose from 'mongoose';
import config from '../config/dev';
import fakeDb from './FakeDb';

mongoose.connect(
  config.DB_URI_LOCAL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  async () => {
    console.log('Starting populating DB...');
    await fakeDb.populate();
    await mongoose.connection.close();
    console.log('DB has been populated...');
  }
);
