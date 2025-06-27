import express from 'express';
import { getAllUsers, getUserById, updateUser , deleteUser, updateUserPassword } from '../controllers/userController.js';

import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all users
router.get('/', authenticateToken, getAllUsers);

// Get user by ID
router.get('/:id', authenticateToken, getUserById);

// Update user by ID
router.put('/:id', authenticateToken, updateUser);

// Update user password by ID
router.put('/:id/password', authenticateToken, updateUserPassword);

// Delete user by ID
router.delete('/:id', authenticateToken, deleteUser);

export default router;