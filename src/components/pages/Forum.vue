<template>
  <div class="page-container">
    <!-- En-tête -->
    <section class="section-container">
      <h1 class="page-title">FORUM</h1>
      <p class="page-subtitle">Échangez avec la communauté des survivalistes</p>
    </section>

    <!-- Barre de recherche -->
    <section class="section-container dark-section">
      <div class="search-container">
        <input 
          type="text" 
          placeholder="Rechercher dans le forum..." 
          class="search-input"
          v-model="searchQuery"
          :disabled="isSearching"
        >
        <button 
          class="search-button" 
          @click="performSearch"
          :disabled="isSearching || !searchQuery.trim()"
        >
          <span v-if="!isSearching">Rechercher</span>
          <span v-else>Recherche en cours...</span>
        </button>
      </div>
    </section>

    <!-- Catégories -->
    <section class="section-container">
      <h2 class="section-title">CATÉGORIES</h2>
      
      <div class="categories-grid">
        <div 
          class="category-card" 
          v-for="category in categories" 
          :key="category.name"
          @click="filterByCategory(category.name)"
        >
          <h3>{{ category.name }}</h3>
          <ul>
            <li v-for="topic in category.topics" :key="topic">{{ topic }}</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Discussions récentes -->
    <section class="section-container dark-section">
      <h2 class="section-title">
        {{ currentCategory ? currentCategory : 'DISCUSSIONS RÉCENTES' }}
        <button 
          v-if="currentCategory" 
          class="reset-filter-button"
          @click="filterByCategory('')"
        >
          Voir tout
        </button>
      </h2>
      
      <div v-if="isLoadingDiscussions" class="loading-container">
        <div class="loading-spinner"></div>
        <p>Chargement des discussions...</p>
      </div>
      
      <div v-else-if="recentDiscussions.length === 0" class="empty-state">
        <p>Aucune discussion trouvée.</p>
        <button 
          v-if="currentCategory" 
          class="reset-filter-button"
          @click="filterByCategory('')"
        >
          Voir toutes les discussions
        </button>
      </div>
      
      <div v-else class="discussions-list">
        <div 
          class="discussion-card" 
          v-for="discussion in recentDiscussions" 
          :key="discussion.id"
          @click="openDiscussion(discussion)"
        >
          <div class="discussion-header">
            <h3>{{ discussion.title }}</h3>
            <span class="discussion-date">{{ formatDate(discussion.createdAt) }}</span>
          </div>
          <p class="discussion-preview">{{ discussion.preview }}</p>
          <div class="discussion-meta">
            <span class="author">Par {{ discussion.author }}</span>
            <span class="replies">{{ (discussion.replies || []).length }} réponses</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Discussion sélectionnée -->
    <section v-if="selectedDiscussion" class="section-container">
      <div class="selected-discussion">
        <div class="discussion-header">
          <h2>{{ selectedDiscussion.title }}</h2>
          <button class="close-button" @click="closeDiscussion">×</button>
        </div>
        
        <div class="discussion-content">
          <p>{{ selectedDiscussion.content }}</p>
          <div class="discussion-meta">
            <span class="author">Par {{ selectedDiscussion.author }}</span>
            <span class="date">{{ formatDate(selectedDiscussion.createdAt) }}</span>
          </div>
        </div>

        <div class="replies-section">
          <h3>Réponses</h3>
          <div v-if="selectedDiscussion.replies.length === 0" class="empty-state">
            <p>Aucune réponse pour le moment. Soyez le premier à répondre !</p>
          </div>
          <div v-else class="reply-card" v-for="reply in selectedDiscussion.replies" :key="reply.id">
            <p>{{ reply.content }}</p>
            <div class="reply-meta">
              <span class="author">Par {{ reply.author }}</span>
              <span class="date">{{ formatDate(reply.createdAt) }}</span>
            </div>
          </div>
        </div>

        <div v-if="authStore.isLoggedIn" class="reply-form">
          <h3>Répondre</h3>
          <textarea 
            v-model="newReply" 
            placeholder="Votre réponse..."
            rows="4"
            class="form-input"
            :disabled="isLoadingReply"
          ></textarea>
          <button 
            class="submit-button" 
            @click="submitReply"
            :disabled="!newReply.trim() || isLoadingReply"
          >
            <span v-if="!isLoadingReply">Envoyer</span>
            <span v-else>Envoi en cours...</span>
          </button>
        </div>
        <div v-else class="auth-message">
          <p>Vous devez être connecté pour répondre à cette discussion.</p>
          <router-link to="/connexion" class="auth-link">Se connecter</router-link>
        </div>
      </div>
    </section>

    <!-- Nouvelle discussion -->
    <section v-if="authStore.isLoggedIn" class="section-container">
      <h2 class="section-title">CRÉER UNE NOUVELLE DISCUSSION</h2>
      <div class="welcome-message">
        <p>Bonjour {{ currentUser }}</p>
        <p class="welcome-subtext">Prêt à partager vos connaissances avec la communauté ?</p>
      </div>
      
      <form class="new-discussion-form" @submit.prevent="createDiscussion">
        <div class="form-group">
          <label for="titre">Titre</label>
          <input 
            type="text" 
            id="titre" 
            class="form-input" 
            v-model="newDiscussion.titre"
            required
            :disabled="isCreatingDiscussion"
          >
        </div>
        
        <div class="form-group">
          <label for="categorie">Catégorie</label>
          <select 
            id="categorie" 
            class="form-input" 
            v-model="newDiscussion.categorie"
            required
            :disabled="isCreatingDiscussion"
          >
            <option value="">Sélectionner une catégorie</option>
            <option 
              v-for="category in categories" 
              :key="category.name" 
              :value="category.name"
            >
              {{ category.name }}
            </option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="sousCategorie">Sous-catégorie</label>
          <select 
            id="sousCategorie" 
            class="form-input" 
            v-model="newDiscussion.sousCategorie"
            required
            :disabled="isCreatingDiscussion || !newDiscussion.categorie"
          >
            <option value="">Sélectionner une sous-catégorie</option>
            <option 
              v-for="subCategory in availableSubCategories" 
              :key="subCategory" 
              :value="subCategory"
            >
              {{ subCategory }}
            </option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="contenu">Message</label>
          <textarea 
            id="contenu" 
            class="form-input" 
            rows="5" 
            v-model="newDiscussion.contenu"
            required
            :disabled="isCreatingDiscussion"
          ></textarea>
        </div>
        
        <button 
          type="submit" 
          class="submit-button"
          :disabled="!isFormValid || isCreatingDiscussion"
        >
          <span v-if="!isCreatingDiscussion">Publier</span>
          <span v-else>Publication en cours...</span>
        </button>
      </form>
    </section>

    <section v-else class="section-container auth-required">
      <h2 class="section-title">CRÉER UNE DISCUSSION</h2>
      <div class="auth-message">
        <p>Vous devez être connecté pour créer une nouvelle discussion.</p>
        <router-link to="/connexion" class="auth-link">Se connecter</router-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { useRouter } from 'vue-router';
import { forumService, type Discussion } from '../../services/forumService';

const router = useRouter();
const authStore = useAuthStore();

// État pour les discussions
const recentDiscussions = ref<Discussion[]>([]);
const isLoadingDiscussions = ref(false);
const currentCategory = ref('');

// État pour la recherche
const searchQuery = ref('');
const searchResults = ref<Discussion[]>([]);
const isSearching = ref(false);

// État pour la discussion sélectionnée
const selectedDiscussion = ref<Discussion | null>(null);
const newReply = ref('');
const isLoadingReply = ref(false);

// État pour le formulaire de nouvelle discussion
const newDiscussion = ref({
  titre: '',
  categorie: '',
  sousCategorie: '',
  contenu: ''
});
const isCreatingDiscussion = ref(false);

// Computed properties
const currentUser = computed(() => {
  const user = authStore.user;
  if (!user) return 'utilisateur';
  return `${user.prenom || ''} ${user.nom || ''}`.trim() || 'utilisateur';
});

const isFormValid = computed(() => {
  return newDiscussion.value.titre.trim() &&
         newDiscussion.value.categorie &&
         newDiscussion.value.sousCategorie &&
         newDiscussion.value.contenu.trim();
});

// Catégories du forum
const categories = [
  {
    name: 'CATACLYSMES',
    type: 'cataclysmes',
    sousCategories: [
      'Feux de forêt',
      'Tempêtes et ouragans',
      'Inondations',
      'Séismes',
      'Éruptions volcaniques'
    ]
  },
  {
    name: 'CRISES',
    type: 'crises',
    sousCategories: [
      'Crise électrique',
      'Crise économique',
      'Pandémies',
      'Conflits',
      'Pénuries'
    ]
  },
  {
    name: 'SURVIE',
    type: 'survie',
    sousCategories: [
      'Survie urbaine',
      'Survie sauvage',
      'Équipement',
      'Technique',
      'Formations'
    ]
  }
];

const availableSubCategories = computed(() => {
  const selectedCategory = categories.find(cat => cat.name === newDiscussion.value.categorie);
  return selectedCategory ? selectedCategory.sousCategories : [];
});

// Méthodes
const loadDiscussions = async () => {
  isLoadingDiscussions.value = true;
  try {
    recentDiscussions.value = await forumService.getDiscussions();
  } catch (error) {
    console.error('Erreur lors du chargement des discussions:', error);
  } finally {
    isLoadingDiscussions.value = false;
  }
};

const formatDate = (date: string | Date) => {
  if (!date) return '';
  const dateObj = new Date(date);
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(dateObj);
};

const performSearch = async () => {
  if (!searchQuery.value.trim()) return;
  isSearching.value = true;
  try {
    searchResults.value = await forumService.searchDiscussions(searchQuery.value);
    recentDiscussions.value = searchResults.value;
  } catch (error) {
    console.error('Erreur lors de la recherche:', error);
  } finally {
    isSearching.value = false;
  }
};

const filterByCategory = async (category: string) => {
  currentCategory.value = category;
  isLoadingDiscussions.value = true;
  try {
    if (category) {
      recentDiscussions.value = await forumService.getDiscussionsByCategory(category);
    } else {
      await loadDiscussions();
    }
  } catch (error) {
    console.error('Erreur lors du filtrage par catégorie:', error);
  } finally {
    isLoadingDiscussions.value = false;
  }
};

const createDiscussion = async () => {
  if (!isFormValid.value) return;
  isCreatingDiscussion.value = true;
  try {
    await forumService.createDiscussion({
      titre: newDiscussion.value.titre,
      categorie: newDiscussion.value.categorie,
      sousCategorie: newDiscussion.value.sousCategorie,
      contenu: newDiscussion.value.contenu
    });
    
    // Réinitialiser le formulaire
    newDiscussion.value = {
      titre: '',
      categorie: '',
      sousCategorie: '',
      contenu: ''
    };
    
    // Recharger les discussions
    await loadDiscussions();
  } catch (error) {
    console.error('Erreur lors de la création de la discussion:', error);
    alert('Erreur lors de la création de la discussion. Veuillez réessayer.');
  } finally {
    isCreatingDiscussion.value = false;
  }
};

// Initialisation
onMounted(async () => {
  authStore.checkAuth();
  await loadDiscussions();
});

// Fonction pour ouvrir une discussion
const openDiscussion = async (discussion: Discussion) => {
  try {
    const fullDiscussion = await forumService.getDiscussionById(discussion.id);
    selectedDiscussion.value = fullDiscussion;
  } catch (error) {
    console.error('Erreur lors de l\'ouverture de la discussion:', error);
  }
};

// Fonction pour fermer une discussion
const closeDiscussion = () => {
  selectedDiscussion.value = null;
  newReply.value = '';
};

// Fonction pour soumettre une réponse
const submitReply = async () => {
  if (!authStore.isLoggedIn || !selectedDiscussion.value) return;
  if (!newReply.value.trim()) return;

  isLoadingReply.value = true;
  try {
    const reply = await forumService.addReply({
      content: newReply.value,
      discussionId: selectedDiscussion.value.id
    });
    
    // Ajouter la réponse à la discussion courante
    selectedDiscussion.value.replies.push(reply);
    
    // Réinitialiser le champ de réponse
    newReply.value = '';
  } catch (error) {
    console.error('Erreur lors de l\'envoi de la réponse:', error);
  } finally {
    isLoadingReply.value = false;
  }
};
</script>

<style scoped>
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.page-title {
  font-size: 2.5rem;
  color: var(--color-accent);
  text-align: center;
  margin-bottom: 1rem;
}

.page-subtitle {
  font-size: 1.2rem;
  text-align: center;
  color: var(--color-text);
  margin-bottom: 2rem;
}

.section-container {
  margin-bottom: 3rem;
  padding: 2rem;
  background-color: rgba(33, 49, 28, 0.3);
  border-radius: 3px;
}

.dark-section {
  background-color: rgba(33, 49, 28, 0.6);
}

.section-title {
  font-size: 1.8rem;
  color: var(--color-accent);
  margin-bottom: 1.5rem;
  text-align: center;
}

/* Barre de recherche */
.search-container {
  display: flex;
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
}

.search-input {
  flex: 1;
  padding: 0.8rem;
  border: none;
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0.2);
  color: var(--color-text);
}

.search-button {
  padding: 0.8rem 1.5rem;
  background-color: var(--color-primary);
  color: var(--color-text);
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.search-button:hover {
  background-color: var(--color-accent);
}

/* Catégories */
.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.category-card {
  background-color: rgba(0, 0, 0, 0.2);
  padding: 1.5rem;
  border-radius: 3px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.2s ease;
}

.category-card:hover {
  transform: translateX(5px);
}

.category-card h3 {
  color: var(--color-accent);
  margin-bottom: 1rem;
}

.category-card ul {
  list-style: none;
  padding: 0;
}

.category-card li {
  margin-bottom: 0.5rem;
  padding-left: 1.2rem;
  position: relative;
}

.category-card li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: var(--color-accent);
}

/* Discussions */
.discussions-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.discussion-card {
  background-color: rgba(0, 0, 0, 0.2);
  padding: 1.5rem;
  border-radius: 3px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.2s ease;
}

.discussion-card:hover {
  transform: translateX(5px);
}

.discussion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.discussion-header h3 {
  color: var(--color-accent);
  margin: 0;
}

.discussion-date {
  color: var(--color-text);
  opacity: 0.7;
  font-size: 0.9rem;
}

.discussion-preview {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.discussion-meta {
  display: flex;
  justify-content: space-between;
  color: var(--color-text);
  opacity: 0.7;
  font-size: 0.9rem;
}

/* Nouveaux styles pour la discussion sélectionnée */
.selected-discussion {
  background-color: rgba(0, 0, 0, 0.2);
  padding: 2rem;
  border-radius: 3px;
  margin-bottom: 2rem;
}

.close-button {
  background: none;
  border: none;
  color: var(--color-text);
  font-size: 2rem;
  cursor: pointer;
  padding: 0.5rem;
  line-height: 1;
}

.close-button:hover {
  color: var(--color-accent);
}

.discussion-content {
  margin-bottom: 2rem;
  line-height: 1.6;
}

.replies-section {
  margin-top: 2rem;
}

.reply-card {
  background-color: rgba(0, 0, 0, 0.2);
  padding: 1rem;
  border-radius: 3px;
  margin-bottom: 1rem;
}

.reply-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: var(--color-text);
  opacity: 0.7;
  margin-top: 0.5rem;
}

.reply-form {
  margin-top: 2rem;
}

.auth-message {
  text-align: center;
  padding: 2rem;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.auth-link {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.8rem 1.5rem;
  background-color: var(--color-accent);
  color: var(--color-text);
  text-decoration: none;
  border-radius: 3px;
  transition: background-color 0.3s ease;
}

.auth-link:hover {
  background-color: var(--color-primary);
}

/* Formulaire */
.new-discussion-form {
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--color-text);
}

.form-input {
  width: 100%;
  padding: 0.8rem;
  border: none;
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0.2);
  color: var(--color-text);
}

.submit-button {
  width: 100%;
  padding: 1rem;
  background-color: var(--color-primary);
  color: var(--color-text);
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: var(--color-accent);
}

/* Style pour les boutons désactivés */
.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Responsive */
@media (max-width: 768px) {
  .page-container {
    padding: 1rem;
  }
  
  .selected-discussion {
    padding: 1rem;
  }
  
  .discussion-header {
    flex-direction: column;
    text-align: center;
  }
  
  .close-button {
    position: absolute;
    right: 1rem;
    top: 1rem;
  }
}

/* Nouveaux styles pour les états de chargement */
.loading-container {
  text-align: center;
  padding: 2rem;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(230, 126, 34, 0.1);
  border-left-color: var(--color-accent);
  border-radius: 50%;
  margin: 0 auto 1rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.empty-state {
  text-align: center;
  padding: 2rem;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.reset-filter-button {
  background: none;
  border: none;
  color: var(--color-accent);
  cursor: pointer;
  font-size: 0.9rem;
  margin-left: 1rem;
  text-decoration: underline;
}

.reset-filter-button:hover {
  color: var(--color-text);
}

/* Style pour les boutons désactivés */
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form-input:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.welcome-message {
  text-align: center;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: rgba(230, 126, 34, 0.1);
  border-radius: 8px;
  border-left: 3px solid var(--color-accent);
}

.welcome-message p {
  margin: 0;
  color: var(--color-accent);
  font-weight: 500;
  font-size: 1.1rem;
}

.welcome-subtext {
  margin-top: 0.5rem !important;
  font-size: 0.9rem !important;
  opacity: 0.8;
}

.debug-info {
  font-size: 0.8rem !important;
  color: #666 !important;
  margin-top: 0.5rem !important;
  font-style: italic;
}
</style> 