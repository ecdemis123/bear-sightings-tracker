import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes';
import db from './db/db';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/', router);

const port = process.env.PORT || 3000;

db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    db.sync().then(() => {
      app.listen(port, () => {
        console.log(`http://localhost:${port}`);
      });
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
