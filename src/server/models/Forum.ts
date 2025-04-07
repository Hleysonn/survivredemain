import mongoose from 'mongoose';

const reponseSchema = new mongoose.Schema({
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  contenu: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

const messageSchema = new mongoose.Schema({
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  contenu: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  reponses: [reponseSchema]
}, {
  timestamps: true
});

const discussionSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
    trim: true
  },
  categorie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categorie',
    required: true
  },
  sousCategorie: {
    type: String,
    required: true
  },
  createur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  dateCreation: {
    type: Date,
    default: Date.now
  },
  messages: [messageSchema],
  tags: [{
    type: String,
    trim: true
  }],
  statut: {
    type: String,
    enum: ['ouvert', 'fermé', 'résolu'],
    default: 'ouvert'
  },
  vues: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index pour la recherche
discussionSchema.index({ titre: 'text', 'messages.contenu': 'text' });

const Discussion = mongoose.model('Discussion', discussionSchema);

export default Discussion; 