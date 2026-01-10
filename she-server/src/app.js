import express from 'express';
import findingRoutes from './routes/finding.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

app.use(express.json());
app.use("/auth", authRoutes);
app.use(findingRoutes)


export default app;