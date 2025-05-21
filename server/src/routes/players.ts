import express from 'express';
import { getAllPlayers } from '../controllers/playersController';

const router = express.Router();

router.get('/', getAllPlayers); // Handles GET /players

export default router;
