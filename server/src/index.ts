import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import playersRoute from './routes/players';
import mlbRoutes from './routes/mlb';

dotenv.config(); 

const app = express();
app.use(cors());
app.use(express.json());

app.use('/players', playersRoute); 
app.use('/mlb', mlbRoutes);


app.get('/', (_req, res) => {
  res.send('YankeeScope API is live ⚾');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
