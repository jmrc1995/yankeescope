import express from 'express';
import { getPlayerStats, getYankeesRoster } from '../controllers/mlbController';

const router = express.Router();

router.get('/player', getPlayerStats);
router.get('/roster', getYankeesRoster);

export default router;
