import express from 'express';
import { getUsersController } from '../controllers/user.controller.js';

const router = express.Router();

// GET /users - list users (supports query filters)
router.get('/', getUsersController);

export default router;
