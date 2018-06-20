import express from 'express';
import controller from './controller';

const router = express.Router();

router.get('/', (req, res) => {
  res.json('Hello');
});

export default router;
