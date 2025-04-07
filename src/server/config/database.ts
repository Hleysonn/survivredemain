import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      throw new Error('MONGODB_URI non définie dans les variables d\'environnement');
    }

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);

    console.log('✅ Connecté à MongoDB avec succès');

    // Gestion des erreurs de connexion
    mongoose.connection.on('error', (err) => {
      console.error('❌ Erreur de connexion MongoDB:', err);
    });

    // Gestion de la déconnexion
    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ Déconnecté de MongoDB');
    });

    // Gestion de la reconnexion
    mongoose.connection.on('reconnected', () => {
      console.log('🔄 Reconnexion à MongoDB réussie');
    });

  } catch (error) {
    console.error('❌ Erreur de connexion à MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB; 