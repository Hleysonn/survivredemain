import { Request, Response } from 'express';
import { Discussion } from '../models/Discussion';

// Récupérer toutes les discussions
export const getDiscussions = async (req: Request, res: Response) => {
  try {
    const discussions = await Discussion.find()
      .populate('author', 'username')
      .populate('replies.author', 'username')
      .sort({ createdAt: -1 });
    
    res.json(discussions);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des discussions' });
  }
};

// Récupérer une discussion par son ID
export const getDiscussionById = async (req: Request, res: Response) => {
  try {
    const discussion = await Discussion.findById(req.params.id)
      .populate('author', 'username')
      .populate('replies.author', 'username');
    
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion non trouvée' });
    }
    
    res.json(discussion);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la discussion' });
  }
};

// Créer une nouvelle discussion
export const createDiscussion = async (req: Request, res: Response) => {
  try {
    const { title, content, category } = req.body;
    
    if (!req.user) {
      return res.status(401).json({ message: 'Vous devez être connecté pour créer une discussion' });
    }
    
    const discussion = new Discussion({
      title,
      content,
      category,
      author: req.user._id
    });
    
    await discussion.save();
    await discussion.populate('author', 'username');
    
    res.status(201).json(discussion);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de la discussion' });
  }
};

// Ajouter une réponse à une discussion
export const addReply = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    
    if (!req.user) {
      return res.status(401).json({ message: 'Vous devez être connecté pour répondre' });
    }
    
    const discussion = await Discussion.findById(req.params.id);
    
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion non trouvée' });
    }
    
    const reply = {
      content,
      author: req.user._id,
      createdAt: new Date()
    };
    
    discussion.replies.push(reply);
    await discussion.save();
    await discussion.populate('replies.author', 'username');
    
    res.status(201).json(discussion.replies[discussion.replies.length - 1]);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'ajout de la réponse' });
  }
};

// Rechercher des discussions
export const searchDiscussions = async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;
    
    if (!query) {
      return res.status(400).json({ message: 'Le terme de recherche est requis' });
    }
    
    const discussions = await Discussion.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } }
      ]
    })
      .populate('author', 'username')
      .populate('replies.author', 'username')
      .sort({ createdAt: -1 });
    
    res.json(discussions);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la recherche' });
  }
};

// Filtrer les discussions par catégorie
export const getDiscussionsByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    
    const discussions = await Discussion.find({ category })
      .populate('author', 'username')
      .populate('replies.author', 'username')
      .sort({ createdAt: -1 });
    
    res.json(discussions);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors du filtrage par catégorie' });
  }
}; 