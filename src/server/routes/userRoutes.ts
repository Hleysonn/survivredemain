import express from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Inscription
router.post('/inscription', async (req, res) => {
  try {
    const { nom, prenom, email, motDePasse, ville, pays, centresInteret, categories } = req.body;

    // Vérification si l'utilisateur existe déjà
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }

    // Création du nouvel utilisateur
    const user = new User({
      nom,
      prenom,
      email,
      motDePasse,
      ville,
      pays,
      centresInteret,
      categories
    });

    await user.save();

    // Génération du token JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'votre_secret_jwt',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Utilisateur créé avec succès',
      token,
      user: {
        id: user._id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        ville: user.ville,
        pays: user.pays,
        centresInteret: user.centresInteret,
        categories: user.categories
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'inscription' });
  }
});

// Connexion
router.post('/connexion', async (req, res) => {
  try {
    const { email, motDePasse } = req.body;

    // Recherche de l'utilisateur
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Vérification du mot de passe
    const isMatch = await user.verifierMotDePasse(motDePasse);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Génération du token JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'votre_secret_jwt',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        ville: user.ville,
        pays: user.pays,
        centresInteret: user.centresInteret,
        categories: user.categories
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la connexion' });
  }
});

// Middleware d'authentification
const auth = async (req: any, res: express.Response, next: express.NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Non authentifié' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'votre_secret_jwt');
    const user = await User.findById((decoded as any).userId);

    if (!user) {
      return res.status(401).json({ message: 'Non authentifié' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Non authentifié' });
  }
};

// Récupération du profil
router.get('/profil', auth, async (req: any, res) => {
  try {
    res.json({
      user: {
        id: req.user._id,
        nom: req.user.nom,
        prenom: req.user.prenom,
        email: req.user.email,
        ville: req.user.ville,
        pays: req.user.pays,
        centresInteret: req.user.centresInteret,
        categories: req.user.categories
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du profil' });
  }
});

// Mise à jour du profil
router.put('/profil', auth, async (req: any, res) => {
  try {
    const { nom, prenom, ville, pays, centresInteret, categories } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    user.nom = nom || user.nom;
    user.prenom = prenom || user.prenom;
    user.ville = ville || user.ville;
    user.pays = pays || user.pays;
    user.centresInteret = centresInteret || user.centresInteret;
    user.categories = categories || user.categories;

    await user.save();

    res.json({
      message: 'Profil mis à jour avec succès',
      user: {
        id: user._id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        ville: user.ville,
        pays: user.pays,
        centresInteret: user.centresInteret,
        categories: user.categories
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du profil' });
  }
});

export default router; 