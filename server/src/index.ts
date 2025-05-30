import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import playersRoute from './routes/players';


dotenv.config(); 

const app = express();
app.use(cors());
app.use('/players', playersRoute); 
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('YankeeScope API is live ⚾');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
