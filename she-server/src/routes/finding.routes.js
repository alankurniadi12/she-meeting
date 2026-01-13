import express from 'express';
import { createFinding } from '../controllers/finding.controller';
import protect from '../middlewares/auth.middleware';

const router = express.Router();


// Sample route
router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.post("/", protect, createFinding);

export default router;