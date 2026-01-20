import dotenv from 'dotenv';
import express from 'express';
import findingRoutes from './routes/finding.routes.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import errorMiddleware from './middlewares/error.middleware.js';

dotenv.config();
const app = express();

app.use(express.json());
// CORS middleware
const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', clientOrigin);
	res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	if (req.method === 'OPTIONS') return res.sendStatus(204);
	next();
});
app.use('/auth', authRoutes);
app.use('/findings', findingRoutes);
app.use('/users', userRoutes);
app.use(errorMiddleware);

export default app;