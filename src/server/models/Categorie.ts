import mongoose from 'mongoose';

const sousCategorieSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
});

const categorieSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['cataclysmes', 'crises', 'survie']
  },
  nom: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  sousCategories: [sousCategorieSchema],
  icon: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Ajout des validateurs pour les sous-catégories selon le type
categorieSchema.pre('save', function(next) {
  const sousCategoriesValides = {
    cataclysmes: [
      'Feux de forêt',
      'Tempêtes et ouragans',
      'Inondations',
      'Séismes',
      'Éruptions volcaniques'
    ],
    crises: [
      'Crise électrique',
      'Crise économique',
      'Pandémies',
      'Conflits',
      'Pénuries'
    ],
    survie: [
      'Survie urbaine',
      'Survie sauvage',
      'Équipement',
      'Technique',
      'Formations'
    ]
  };

  const sousCategoriesValidesPourType = sousCategoriesValides[this.type as keyof typeof sousCategoriesValides];
  
  if (this.sousCategories.some(sc => !sousCategoriesValidesPourType.includes(sc.nom))) {
    return next(new Error(`Sous-catégorie invalide pour le type ${this.type}`));
  }

  next();
});

export default mongoose.model('Categorie', categorieSchema); 