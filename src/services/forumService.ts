import axios from 'axios';
import { useAuthStore } from '../stores/auth';

const API_URL = 'http://localhost:3000/api';

// Configuration d'Axios avec les headers par défaut
axios.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    console.log('Intercepteur Axios - État auth:', {
      isLoggedIn: authStore.isLoggedIn,
      hasToken: !!authStore.token,
      token: authStore.token ? 'présent' : 'absent',
      user: authStore.user
    });

    if (authStore.isLoggedIn && authStore.token) {
      const token = authStore.token;
      console.log('Format du token:', {
        token: token,
        length: token.length,
        startsWith: token.substring(0, 10) + '...',
        endsWith: '...' + token.substring(token.length - 10)
      });
      
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Headers de la requête:', {
        Authorization: config.headers.Authorization,
        'Content-Type': config.headers['Content-Type']
      });
    } else {
      console.warn('Token manquant ou utilisateur non connecté');
    }
    return config;
  },
  (error) => {
    console.error('Erreur dans l\'intercepteur:', error);
    return Promise.reject(error);
  }
);

export interface Discussion {
  _id: string;
  title: string;
  content: string;
  preview: string;
  category: string;
  author: {
    _id: string;
    username: string;
  };
  createdAt: Date;
  replies: Reply[];
}

export interface Reply {
  _id: string;
  content: string;
  author: {
    _id: string;
    username: string;
  };
  createdAt: Date;
}

export interface NewDiscussion {
  titre: string;
  categorie: string;  // ID MongoDB de la catégorie
  sousCategorie: string;
  contenu: string;
  tags?: string[];
}

export interface NewReply {
  content: string;
  discussionId: string;
}

class ForumService {
  // Récupérer toutes les discussions
  async getDiscussions(): Promise<Discussion[]> {
    try {
      const response = await axios.get(`${API_URL}/forum`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des discussions:', error);
      throw error;
    }
  }

  // Récupérer une discussion par son ID
  async getDiscussionById(id: string): Promise<Discussion> {
    try {
      const response = await axios.get(`${API_URL}/forum/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de la discussion ${id}:`, error);
      throw error;
    }
  }

  // Créer une nouvelle discussion
  async createDiscussion(discussion: NewDiscussion): Promise<Discussion> {
    try {
      const authStore = useAuthStore();
      
      console.log('=== DÉBUT CRÉATION DISCUSSION ===');
      console.log('1. État de l\'authentification:', {
        isLoggedIn: authStore.isLoggedIn,
        user: authStore.user,
        token: authStore.token ? 'présent' : 'absent'
      });
      
      // Log détaillé de l'objet user
      console.log('Détails de l\'utilisateur:', {
        user: authStore.user,
        userId: authStore.user?._id,
        userRaw: JSON.stringify(authStore.user, null, 2)
      });
      
      console.log('2. Données du formulaire reçues:', {
        titre: discussion.titre,
        categorie: discussion.categorie,
        sousCategorie: discussion.sousCategorie,
        contenu: discussion.contenu,
        tags: discussion.tags
      });
      
      // Vérification des champs requis
      if (!authStore.user?._id) {
        console.error('❌ Erreur: Utilisateur non connecté ou ID manquant', {
          user: authStore.user,
          userId: authStore.user?._id
        });
        throw new Error('Utilisateur non connecté');
      }
      
      if (!discussion.categorie || !discussion.sousCategorie) {
        console.error('❌ Erreur: Catégorie ou sous-catégorie manquante');
        throw new Error('Catégorie et sous-catégorie sont requis');
      }
      
      // Structure exactement comme attendue par le serveur
      const payload = {
        titre: discussion.titre,
        categorie: discussion.categorie,
        sousCategorie: discussion.sousCategorie,
        createur: authStore.user._id,
        messages: [{
          utilisateur: authStore.user._id,
          contenu: discussion.contenu,
          date: new Date(),
          likes: []
        }],
        tags: discussion.tags || [],
        statut: 'ouvert',
        vues: 0
      };
      
      console.log('3. Payload envoyé au serveur:', payload);
      
      const response = await axios.post(`${API_URL}/forum`, payload);
      console.log('4. Réponse du serveur:', response.data);
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('❌ Erreur lors de la création de la discussion:', error);
        console.error('Détails de l\'erreur Axios:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          message: error.response?.data?.message,
          data: error.response?.data,
          config: {
            url: error.config?.url,
            method: error.config?.method,
            headers: error.config?.headers
          }
        });
      }
      throw error;
    }
  }

  // Ajouter une réponse à une discussion
  async addReply(reply: NewReply): Promise<Reply> {
    try {
      const authStore = useAuthStore();
      if (!authStore.isLoggedIn) {
        throw new Error('Non authentifié');
      }

      const response = await axios.post(
        `${API_URL}/forum/${reply.discussionId}/messages`,
        { 
          contenu: reply.content,
          auteur: authStore.user?._id
        }
      );
      return response.data;
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la réponse:', error);
      throw error;
    }
  }

  // Rechercher des discussions
  async searchDiscussions(query: string): Promise<Discussion[]> {
    try {
      const response = await axios.get(`${API_URL}/forum/recherche`, {
        params: { q: query }
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
      throw error;
    }
  }

  // Filtrer les discussions par catégorie
  async getDiscussionsByCategory(category: string): Promise<Discussion[]> {
    try {
      const response = await axios.get(`${API_URL}/forum`, {
        params: { categorie: category }
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors du filtrage par catégorie:', error);
      throw error;
    }
  }
}

export const forumService = new ForumService(); 