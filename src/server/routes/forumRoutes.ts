import express from 'express';
import Discussion from '../models/Forum';
import { auth } from '../middleware/auth';
import mongoose from 'mongoose';

const router = express.Router();

// Récupérer toutes les discussions
router.get('/', async (req, res) => {
  try {
    const { categorie, sousCategorie, statut, page = 1, limit = 10 } = req.query;
    
    const query: any = {};
    if (categorie) query.categorie = categorie;
    if (sousCategorie) query.sousCategorie = sousCategorie;
    if (statut) query.statut = statut;

    const discussions = await Discussion.find(query)
      .populate('createur', 'nom prenom')
      .populate('categorie', 'nom type')
      .sort({ dateCreation: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const total = await Discussion.countDocuments(query);

    res.json({
      discussions,
      total,
      pages: Math.ceil(total / Number(limit)),
      page: Number(page)
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des discussions' });
  }
});

// Créer une nouvelle discussion
router.post('/', auth, async (req: any, res) => {
  try {
    const { titre, categorie, sousCategorie, contenu, tags } = req.body;
    
    const discussion = new Discussion({
      titre,
      categorie,
      sousCategorie,
      createur: req.user._id,
      messages: [{
        utilisateur: req.user._id,
        contenu,
        date: new Date(),
        likes: []
      }],
      tags
    });

    await discussion.save();
    
    const discussionPopulee = await Discussion.findById(discussion._id)
      .populate('createur', 'nom prenom')
      .populate('categorie', 'nom type');

    res.status(201).json(discussionPopulee);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création de la discussion' });
  }
});

// Ajouter un message à une discussion
router.post('/:id/messages', auth, async (req: any, res) => {
  try {
    const { contenu } = req.body;
    
    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion non trouvée' });
    }

    discussion.messages.push({
      utilisateur: req.user._id,
      contenu,
      date: new Date(),
      likes: []
    });

    await discussion.save();
    
    const message = discussion.messages[discussion.messages.length - 1];
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de l\'ajout du message' });
  }
});

// Répondre à un message
router.post('/:id/messages/:messageId/reponses', auth, async (req: any, res) => {
  try {
    const { contenu } = req.body;
    
    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion non trouvée' });
    }

    const message = discussion.messages.id(req.params.messageId);
    if (!message) {
      return res.status(404).json({ message: 'Message non trouvé' });
    }

    message.reponses.push({
      utilisateur: req.user._id,
      contenu,
      date: new Date(),
      likes: []
    });

    await discussion.save();
    
    const reponse = message.reponses[message.reponses.length - 1];
    res.status(201).json(reponse);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de l\'ajout de la réponse' });
  }
});

// Mettre à jour le statut d'une discussion
router.put('/:id/statut', auth, async (req: any, res) => {
  try {
    const { statut } = req.body;
    
    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion non trouvée' });
    }

    // Vérifier si l'utilisateur est le créateur ou un modérateur
    if (discussion.createur.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Non autorisé' });
    }

    discussion.statut = statut;
    await discussion.save();

    res.json(discussion);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour du statut' });
  }
});

// Rechercher des discussions
router.get('/recherche', async (req, res) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;
    
    const discussions = await Discussion.find(
      { $text: { $search: q as string } },
      { score: { $meta: "textScore" } }
    )
    .sort({ score: { $meta: "textScore" } })
    .skip((Number(page) - 1) * Number(limit))
    .limit(Number(limit))
    .populate('createur', 'nom prenom')
    .populate('categorie', 'nom type');

    const total = await Discussion.countDocuments({ $text: { $search: q as string } });

    res.json({
      discussions,
      total,
      pages: Math.ceil(total / Number(limit)),
      page: Number(page)
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la recherche' });
  }
});

export default router; 