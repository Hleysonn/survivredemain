import express from 'express';
import Categorie from '../models/Categorie';

const router = express.Router();

// Récupérer toutes les catégories
router.get('/', async (req, res) => {
  try {
    const categories = await Categorie.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des catégories' });
  }
});

// Récupérer les catégories par type
router.get('/type/:type', async (req, res) => {
  try {
    const categories = await Categorie.find({ type: req.params.type });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des catégories' });
  }
});

// Créer une catégorie
router.post('/', async (req, res) => {
  try {
    const { type, nom, description, sousCategories, icon } = req.body;
    const categorie = new Categorie({ type, nom, description, sousCategories, icon });
    await categorie.save();
    res.status(201).json(categorie);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création de la catégorie' });
  }
});

// Mettre à jour une catégorie
router.put('/:id', async (req, res) => {
  try {
    const { type, nom, description, sousCategories, icon } = req.body;
    const categorie = await Categorie.findByIdAndUpdate(
      req.params.id,
      { type, nom, description, sousCategories, icon },
      { new: true }
    );
    if (!categorie) {
      return res.status(404).json({ message: 'Catégorie non trouvée' });
    }
    res.json(categorie);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour de la catégorie' });
  }
});

// Supprimer une catégorie
router.delete('/:id', async (req, res) => {
  try {
    const categorie = await Categorie.findByIdAndDelete(req.params.id);
    if (!categorie) {
      return res.status(404).json({ message: 'Catégorie non trouvée' });
    }
    res.json({ message: 'Catégorie supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la catégorie' });
  }
});

export default router; 