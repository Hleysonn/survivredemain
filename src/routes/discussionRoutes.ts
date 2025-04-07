import express from 'express';
import { authenticateToken } from '../middleware/auth';
import {
  getDiscussions,
  getDiscussionById,
  createDiscussion,
  addReply,
  searchDiscussions,
  getDiscussionsByCategory
} from '../controllers/discussionController';

const router = express.Router();

// Routes publiques
router.get('/', getDiscussions);
router.get('/search', searchDiscussions);
router.get('/category/:category', getDiscussionsByCategory);
router.get('/:id', getDiscussionById);

// Routes protégées (nécessitent une authentification)
router.post('/', authenticateToken, createDiscussion);
router.post('/:id/replies', authenticateToken, addReply);

export default router; 