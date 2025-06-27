import express from 'express';
import { 
syncDocuments, 
listDocuments, 
downloadDocument 
} from '../controllers/documentController.js';

const router = express.Router();

router.get('/sync', syncDocuments);
router.get('/', listDocuments);
router.get('/:id/download', downloadDocument);

export default router;
