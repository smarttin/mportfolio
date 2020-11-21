import mongoose from 'mongoose';

import './models/portfolio';
import './models/user';

mongoose
  .connect(process.env.DB_URI_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Database Connection Successful');
  })
  .catch((error) => console.log(error.message));
