import express from 'express';
import controller from './controller';

const router = express.Router();

router.post('/sighting', controller.createSighting);

router.get('/sighting/search', controller.searchSighting);

router.get('/sighting/:id', controller.getSighting);

export default router;
