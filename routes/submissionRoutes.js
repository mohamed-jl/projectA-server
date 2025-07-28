import express from 'express';
import { createSubmission, getSubmissions, getSubmissionById } from '../controllers/submissionController.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', createSubmission);
router.get('/', authenticateToken, getSubmissions);
router.get('/:id', authenticateToken, getSubmissionById);

export default router;