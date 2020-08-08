import path from 'path';
import mongoose from 'mongoose';
import { app } from '../config/express';
import * as config from '../config';
import { recipeRouter } from '../routes';

app.use('/recipes', recipeRouter);

mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', true);

const runApp = (): void => {
  mongoose.connect(config.db, (error: mongoose.Error) => {
    if (error) {
      console.log('error')
    }
    else {
      console.log('mongo db connection established');
      try {
        app.listen(config.port, '0.0.0.0', (): void => {
          console.log(`listening on port: ${config.port}`)
        })
      } catch (err) {
        console.log('app crashed');
        runApp();
      }
    }
  })
}

runApp()