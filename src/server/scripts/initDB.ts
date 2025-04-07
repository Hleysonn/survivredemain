import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import CentreInteret from '../models/CentreInteret';
import Categorie from '../models/Categorie';
import Discussion from '../models/Forum';

dotenv.config();

const initDB = async () => {
  try {
    // Connexion à MongoDB
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('✅ Connecté à MongoDB');

    // Nettoyage de la base de données
    await mongoose.connection.dropDatabase();
    console.log('🗑️ Base de données nettoyée');

    // Création des centres d'intérêt
    const centresInteret = [
      { nom: 'Survie sauvage', description: 'Techniques de survie en milieu naturel', icon: '🌲' },
      { nom: 'Survie urbaine', description: 'Techniques de survie en milieu urbain', icon: '🏙️' },
      { nom: 'Catastrophes naturelles', description: 'Préparation et gestion des catastrophes naturelles', icon: '🌪️' },
      { nom: 'Premiers soins', description: 'Techniques de premiers secours', icon: '🩹' },
      { nom: 'Equipement', description: 'Gestion et choix du matériel de survie', icon: '🎒' },
      { nom: 'Alimentation', description: 'Techniques de conservation et préparation de nourriture', icon: '🍖' }
    ];

    const centresInteretDocs = await CentreInteret.insertMany(centresInteret);
    console.log('✅ Centres d\'intérêt créés');

    // Création des catégories
    const categories = [
      {
        type: 'cataclysmes',
        nom: 'Tremblements de terre',
        description: 'Préparation et gestion des séismes',
        icon: '🌍',
        sousCategories: [
          { nom: 'Préparation', description: 'Préparation aux séismes', icon: '📋' },
          { nom: 'Pendant', description: 'Que faire pendant un séisme', icon: '⚠️' },
          { nom: 'Après', description: 'Que faire après un séisme', icon: '🆘' }
        ]
      },
      {
        type: 'crises',
        nom: 'Crise économique',
        description: 'Gestion des crises économiques',
        icon: '💸',
        sousCategories: [
          { nom: 'Préparation', description: 'Préparation aux crises économiques', icon: '📋' },
          { nom: 'Gestion', description: 'Gestion des ressources', icon: '💰' },
          { nom: 'Investissement', description: 'Investissements sûrs', icon: '📈' }
        ]
      }
    ];

    const categoriesDocs = await Categorie.insertMany(categories);
    console.log('✅ Catégories créées');

    // Création d'un utilisateur admin
    const admin = new User({
      nom: 'Admin',
      prenom: 'System',
      email: 'admin@survivredemain.com',
      password: 'admin123', // À changer en production
      ville: 'Paris',
      pays: 'France',
      centresInteret: centresInteretDocs.map(ci => ci._id),
      categories: categoriesDocs.map(c => c._id)
    });

    await admin.save();
    console.log('✅ Utilisateur admin créé');

    // Création d'une discussion de test
    const discussion = new Discussion({
      titre: 'Bienvenue sur le forum',
      categorie: categoriesDocs[0]._id,
      sousCategorie: 'Préparation',
      createur: admin._id,
      messages: [{
        utilisateur: admin._id,
        contenu: 'Bienvenue sur le forum de Survive Demain ! N\'hésitez pas à poser vos questions et partager vos expériences.'
      }],
      tags: ['bienvenue', 'forum', 'introduction']
    });

    await discussion.save();
    console.log('✅ Discussion de test créée');

    console.log('✨ Base de données initialisée avec succès');
    process.exit(0);

  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation de la base de données:', error);
    process.exit(1);
  }
};

initDB(); 