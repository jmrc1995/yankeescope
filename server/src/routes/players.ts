import express from 'express';
import { getAllPlayers, comparePlayers } from '../controllers/playersController';

const router = express.Router();

router.get('/', getAllPlayers);       
router.get('/compare', comparePlayers);    


export default router;
