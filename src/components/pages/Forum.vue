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
        >
        <button class="search-button" @click="performSearch">Rechercher</button>
      </div>
    </section>

    <!-- Catégories -->
    <section class="section-container">
      <h2 class="section-title">CATÉGORIES</h2>
      
      <div class="categories-grid">
        <div class="category-card" v-for="category in categories" :key="category.name">
          <h3>{{ category.name }}</h3>
          <ul>
            <li v-for="topic in category.topics" :key="topic">{{ topic }}</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Discussions récentes -->
    <section class="section-container dark-section">
      <h2 class="section-title">DISCUSSIONS RÉCENTES</h2>
      
      <div class="discussions-list">
        <div class="discussion-card" v-for="discussion in recentDiscussions" :key="discussion.title">
          <div class="discussion-header">
            <h3>{{ discussion.title }}</h3>
            <span class="discussion-date">{{ discussion.date }}</span>
          </div>
          <p class="discussion-preview">{{ discussion.preview }}</p>
          <div class="discussion-meta">
            <span class="author">Par {{ discussion.author }}</span>
            <span class="replies">{{ discussion.replies }} réponses</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Nouvelle discussion -->
    <section class="section-container">
      <h2 class="section-title">CRÉER UNE NOUVELLE DISCUSSION</h2>
      
      <form class="new-discussion-form">
        <div class="form-group">
          <label for="title">Titre</label>
          <input type="text" id="title" class="form-input" v-model="newDiscussion.title">
        </div>
        
        <div class="form-group">
          <label for="category">Catégorie</label>
          <select id="category" class="form-input" v-model="newDiscussion.category">
            <option value="">Sélectionner une catégorie</option>
            <option value="cataclysmes">Cataclysmes</option>
            <option value="crises">Crises</option>
            <option value="survie">Survie</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="content">Message</label>
          <textarea id="content" class="form-input" rows="5" v-model="newDiscussion.content"></textarea>
        </div>
        
        <button type="submit" class="submit-button" @click="createDiscussion">Publier</button>
      </form>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// État pour la recherche
const searchQuery = ref('');
const searchResults = ref([]);

// État pour le formulaire de nouvelle discussion
const newDiscussion = ref({
  title: '',
  category: '',
  content: ''
});

// Catégories du forum
const categories = ref([
  {
    name: 'CATACLYSMES',
    topics: ['Feux de forêt', 'Tempêtes & ouragans', 'Inondations', 'Séismes', 'Éruptions volcaniques']
  },
  {
    name: 'CRISES',
    topics: ['Crise électrique', 'Crise économique', 'Pandémies', 'Conflits', 'Pénuries']
  },
  {
    name: 'SURVIE',
    topics: ['Survie urbaine', 'Survie sauvage', 'Équipement', 'Techniques', 'Formations']
  }
]);

// Discussions récentes
const recentDiscussions = ref([
  {
    title: 'Préparation pour l\'hiver',
    date: '12/12/2023',
    preview: 'Quels sont vos conseils pour se préparer à un hiver rigoureux ?',
    author: 'Jean D.',
    replies: 15
  },
  {
    title: 'Meilleur couteau de survie',
    date: '10/12/2023',
    preview: 'Quel couteau recommandez-vous pour la survie en milieu sauvage ?',
    author: 'Marie L.',
    replies: 23
  },
  {
    title: 'Stockage de nourriture',
    date: '08/12/2023',
    preview: 'Comment conserver efficacement les aliments sur le long terme ?',
    author: 'Pierre M.',
    replies: 8
  }
]);

// Fonction pour effectuer une recherche
const performSearch = () => {
  // Logique de recherche à implémenter
  console.log('Recherche effectuée:', searchQuery.value);
};

// Fonction pour créer une nouvelle discussion
const createDiscussion = () => {
  // Logique de création à implémenter
  console.log('Nouvelle discussion:', newDiscussion.value);
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

@media (max-width: 768px) {
  .page-container {
    padding: 1rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .section-container {
    padding: 1.5rem;
  }
  
  .search-container {
    flex-direction: column;
  }
  
  .categories-grid {
    grid-template-columns: 1fr;
  }
}
</style> 