import express from 'express';
import multer from 'multer';
import {
  uploadFile,
  listFiles,
  downloadFile,
  deleteFile,
} from '../controllers/fileController.js';

import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();
const upload = multer();


router.get('/', listFiles);
router.get('/:id/download', downloadFile);
router.post('/upload', authenticateToken, upload.single('file'), uploadFile);
router.delete('/:id', authenticateToken, deleteFile);


export default router;
