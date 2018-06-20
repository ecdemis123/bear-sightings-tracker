import express from 'express';
import controller from './controller';

const router = express.Router();

router.get('/', (req, res) => {
  res.json('Hello');
});

router.post('/sighting', (req, res) => {

});

router.get('/sighting/search', (req, res) => {

});

router.get('/sighting/:id', (req, res) =>{

});

export default router;
