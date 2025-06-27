import express from 'express';
import { 
  createLink, 
  getAllLinks, 
  getLinkById, 
  updateLink, 
  deleteLink, 
} from '../controllers/linkController.js';

import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateToken, createLink); 
router.get('/', getAllLinks); 
router.get('/:id', getLinkById); 
router.put('/:id',authenticateToken, updateLink); 
router.delete('/:id',authenticateToken, deleteLink);

export default router;