import express from 'express';
import { getUsersController, updateUserController } from '../controllers/user.controller.js';

const router = express.Router();

// GET /users - list users (supports query filters)
router.get('/', getUsersController);

// PUT /users/update/:id - update user by ID
router.put('/update/:id', updateUserController);

export default router;
