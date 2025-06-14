import express from 'express';
import { getPlayerStats, getFullRosterWithStats, getYankeesGame  } from '../controllers/mlbController';



const router = express.Router();

router.get('/player', getPlayerStats);
router.get('/yankees-game', getYankeesGame);
router.get("/roster", getFullRosterWithStats);

export default router;
