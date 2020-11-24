import mongoose from 'mongoose';
import config from './config';

import './models/portfolio';
import './models/user';
import './models/forumCategory';
import './models/topic';
import './models/post';

mongoose
  .connect(config.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Database Connection Successful');
  })
  .catch((error) => console.log(error.message));
