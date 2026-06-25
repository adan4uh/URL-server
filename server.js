import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import db from './database/db.js';
import urlRoutes from './routes/urlRoutes.js';

const app = express();
dotenv.config().

app.use(helmet())
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 5000;

app.use('/', urlRoutes)

db();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});