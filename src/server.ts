import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import discussionRoutes from './routes/discussionRoutes';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/survivredemain')
  .then(() => {
    console.log('Connecté à MongoDB');
  })
  .catch((error) => {
    console.error('Erreur de connexion à MongoDB:', error);
  });

// Routes
app.use('/api/users', userRoutes);
app.use('/api/discussions', discussionRoutes);

// Route de test
app.get('/api/test', (req, res) => {
  res.json({ message: 'API fonctionnelle !' });
});

// Gestion des erreurs
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Une erreur est survenue sur le serveur' });
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
}); 