import dotenv from 'dotenv';
import express from 'express';
import findingRoutes from './routes/finding.routes.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import errorMiddleware from './middlewares/error.middleware.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/findings', findingRoutes);
app.use('/users', userRoutes);
app.use(errorMiddleware);

export default app;