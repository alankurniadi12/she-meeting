import express from 'express';
import findingRoutes from './routes/finding.routes.js';

const app = express();

app.use(express.json());
app.use(findingRoutes)


export default app;