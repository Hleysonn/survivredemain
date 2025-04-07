import express from 'express';
import CentreInteret from '../models/CentreInteret';

const router = express.Router();

// Récupérer tous les centres d'intérêt
router.get('/', async (req, res) => {
  try {
    const centresInteret = await CentreInteret.find();
    res.json(centresInteret);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des centres d\'intérêt' });
  }
});

// Créer un centre d'intérêt
router.post('/', async (req, res) => {
  try {
    const { nom, description, icon } = req.body;
    const centreInteret = new CentreInteret({ nom, description, icon });
    await centreInteret.save();
    res.status(201).json(centreInteret);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création du centre d\'intérêt' });
  }
});

// Mettre à jour un centre d'intérêt
router.put('/:id', async (req, res) => {
  try {
    const { nom, description, icon } = req.body;
    const centreInteret = await CentreInteret.findByIdAndUpdate(
      req.params.id,
      { nom, description, icon },
      { new: true }
    );
    if (!centreInteret) {
      return res.status(404).json({ message: 'Centre d\'intérêt non trouvé' });
    }
    res.json(centreInteret);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour du centre d\'intérêt' });
  }
});

// Supprimer un centre d'intérêt
router.delete('/:id', async (req, res) => {
  try {
    const centreInteret = await CentreInteret.findByIdAndDelete(req.params.id);
    if (!centreInteret) {
      return res.status(404).json({ message: 'Centre d\'intérêt non trouvé' });
    }
    res.json({ message: 'Centre d\'intérêt supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du centre d\'intérêt' });
  }
});

export default router; 