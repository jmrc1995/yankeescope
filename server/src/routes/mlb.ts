import express from 'express';
import { getPlayerStats } from '../controllers/mlbController';

const router = express.Router();

router.get('/player', getPlayerStats);

export default router;
