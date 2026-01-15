console.log('Loading app module...');
import dotenv from 'dotenv';
import express from 'express';
import findingRoutes from './routes/finding.routes.js';
import authRoutes from './routes/auth.routes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/findings", findingRoutes);


export default app;
console.log('App module loaded.');

    // belum test