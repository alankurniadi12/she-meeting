import express from 'express';
import { 
    createFinding,
    getAllFindings,
    getFindingById,
    updateFinding,
    deleteFinding,
 } from '../controllers/finding.controller.js';
import protect from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post("/", protect, createFinding);
router.get('/list', getAllFindings);
router.get('/:id', protect, getFindingById);
router.put('/:id', protect, updateFinding);
router.delete('/:id', deleteFinding);

export default router;