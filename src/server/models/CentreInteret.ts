import mongoose from 'mongoose';

const centreInteretSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    unique: true,
    enum: [
      'Survie sauvage',
      'Survie urbaine',
      'Catastrophes naturelles',
      'Premiers soins',
      'Equipement',
      'Alimentation'
    ]
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('CentreInteret', centreInteretSchema); 