import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUserMethods {
  verifierMotDePasse(motDePasse: string): Promise<boolean>;
  toJSON(): any;
}

interface IUser extends mongoose.Document {
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  ville: string;
  pays: string;
  centresInteret: mongoose.Types.ObjectId[];
  categories: mongoose.Types.ObjectId[];
  verifierMotDePasse(motDePasse: string): Promise<boolean>;
  toJSON(): any;
}

const userSchema = new mongoose.Schema<IUser>({
  nom: {
    type: String,
    required: true,
    trim: true
  },
  prenom: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  motDePasse: {
    type: String,
    required: true,
    minlength: 6
  },
  ville: {
    type: String,
    required: true,
    trim: true
  },
  pays: {
    type: String,
    required: true,
    trim: true
  },
  centresInteret: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CentreInteret'
  }],
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categorie'
  }]
}, {
  timestamps: true
});

// Méthode pour hacher le mot de passe avant de sauvegarder
userSchema.pre('save', async function(next) {
  if (!this.isModified('motDePasse')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.motDePasse = await bcrypt.hash(this.motDePasse, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Méthode pour vérifier le mot de passe
userSchema.methods.verifierMotDePasse = async function(motDePasse: string): Promise<boolean> {
  try {
    return await bcrypt.compare(motDePasse, this.motDePasse);
  } catch (error) {
    throw error;
  }
};

// Méthode pour obtenir un utilisateur sans le mot de passe
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.motDePasse;
  return user;
};

const User = mongoose.model<IUser>('User', userSchema);

export default User; 