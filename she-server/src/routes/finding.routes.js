import express from 'express';
import { createFinding } from '../controllers/finding.controller.js';
import protect from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post("/", protect, createFinding);

export default router;