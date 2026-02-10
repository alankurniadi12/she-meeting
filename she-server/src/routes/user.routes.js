import express from 'express';
import { getUsersController, getUserByIdController, updateUserController } from '../controllers/user.controller.js';

const router = express.Router();

// GET /users - list users (supports query filters)
router.get('/', getUsersController);

// GET /users/:id - get user by ID
router.get('/detail/:id', getUserByIdController);

// PUT /users/update/:id - update user by ID
router.put('/update/:id', updateUserController);

export default router;
