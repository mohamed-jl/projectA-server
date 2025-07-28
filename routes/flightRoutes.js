import express from 'express';
import {
    createFlight,
    getAllFlights,
    getFlightById,
    deleteFlight
} from '../controllers/flightController.js';

import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateToken, createFlight);
router.get('/', authenticateToken, getAllFlights);
router.get('/:id', authenticateToken, getFlightById);
router.delete('/:id', authenticateToken, deleteFlight);

export default router;
