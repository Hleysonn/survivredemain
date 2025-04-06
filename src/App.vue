<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import Home from './components/pages/Home.vue';
import CriseElectrique from './components/pages/CriseElectrique.vue';
import Guerre from './components/pages/Guerre.vue';
import Pandemie from './components/pages/Pandemie.vue';
import FeuxForet from './components/pages/catastrophes/FeuxForet.vue';
import Tempetes from './components/pages/catastrophes/Tempetes.vue';
import Inondations from './components/pages/catastrophes/Inondations.vue';
import Seismes from './components/pages/catastrophes/Seismes.vue';
import Volcans from './components/pages/catastrophes/Volcans.vue';
import CriseEconomique from './components/pages/CriseEconomique.vue';
import SurvieUrbaine from './components/pages/SurvieUrbaine.vue';
import SurvieSauvage from './components/pages/SurvieSauvage.vue';
import Navigation from './components/pages/Navigation.vue';
import PremierssoinsPage from './components/pages/PremierssoinsPage.vue';
import OutilsPage from './components/pages/OutilsPage.vue';
import CommunicationPage from './components/pages/CommunicationPage.vue';
import AlimentationPage from './components/pages/AlimentationPage.vue';
import EauPage from './components/pages/EauPage.vue';
import AbriPage from './components/pages/AbriPage.vue';
import Forum from './components/pages/Forum.vue';
import GuideDemarrage from './components/pages/GuideDemarrage.vue';
import Boutique from './components/pages/Boutique.vue';
import Commande from './components/pages/Commande.vue';

const route = useRoute();
const currentPage = ref('home');
const showCatastropheSubMenu = ref(false);
const showEquipementSubMenu = ref(false);

const catastropheSubPages = [
  { id: 'feux-foret', component: FeuxForet, name: 'Feux de forêt' },
  { id: 'tempetes', component: Tempetes, name: 'Tempêtes & ouragans' },
  { id: 'inondations', component: Inondations, name: 'Inondations' },
  { id: 'seismes', component: Seismes, name: 'Séismes' },
  { id: 'volcans', component: Volcans, name: 'Éruptions volcaniques' }
];

const equipementSubPages = [
  { id: 'survie-sauvage', name: 'Équipement de survie' },
  { id: 'navigation', name: 'Navigation & Orientation' },
  { id: 'premiers-soins', name: 'Premiers soins' },
  { id: 'outils', name: 'Outils essentiels' },
  { id: 'communication', name: 'Communication' },
  { id: 'alimentation', name: 'Alimentation' },
  { id: 'eau', name: 'Eau & Filtration' },
  { id: 'abri', name: 'Abri & Protection' }
];

const setPage = (page: string) => {
  currentPage.value = page;
  if (page !== 'catastrophes') {
    showCatastropheSubMenu.value = false;
  }
  if (page !== 'equipement') {
    showEquipementSubMenu.value = false;
  }
};

const toggleCatastropheMenu = () => {
  showCatastropheSubMenu.value = !showCatastropheSubMenu.value;
};

const toggleEquipementMenu = () => {
  showEquipementSubMenu.value = !showEquipementSubMenu.value;
};

// Mettre à jour currentPage en fonction de la route
watch(() => route.name, (newName) => {
  if (newName) {
    currentPage.value = newName.toString();
  }
}, { immediate: true });
</script>

<template>
  <div class="app-container">
    <Navbar 
      :currentPage="currentPage" 
      :showCatastropheSubMenu="showCatastropheSubMenu"
      :showEquipementSubMenu="showEquipementSubMenu"
      :catastropheSubPages="catastropheSubPages"
      :equipementSubPages="equipementSubPages"
      @set-page="setPage"
      @toggle-catastrophe-menu="toggleCatastropheMenu"
      @toggle-equipement-menu="toggleEquipementMenu"
    />
    
    <main class="main-content">
      <router-view></router-view>
    </main>
    
    <Footer />
  </div>
</template>

<style>
@import './style.css';

:root {
  --color-background: #121212;
  --color-text: #e0e0e0;
  --color-primary: #4a5d23; /* Vert forêt */
  --color-secondary: #21311c; /* Vert forêt foncé */
  --color-accent: #e67e22; /* Orange d'alerte */
  --color-kaki: #6b7c45;
  --color-black: #0a0a0a;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Roboto Condensed', 'Roboto', sans-serif;
  background-color: var(--color-background);
  color: var(--color-text);
  line-height: 1.6;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin-left: 280px;
  transition: margin-left 0.3s ease;
}

.main-content {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  width: calc(100% - 280px);
  margin: 0 auto;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Barlow Condensed', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
}

a {
  color: var(--color-accent);
  text-decoration: none;
  transition: all 0.3s ease;
}

a:hover {
  color: var(--color-text);
}

.btn {
  display: inline-block;
  background-color: var(--color-primary);
  color: var(--color-text);
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 2px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn:hover {
  background-color: var(--color-accent);
}

.card {
  background-color: rgba(33, 49, 28, 0.6);
  border-left: 3px solid var(--color-accent);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

/* Media Queries pour le responsive */
@media (max-width: 1200px) {
  .main-content {
    max-width: 100%;
    padding: 1.5rem;
  }
}

@media (max-width: 992px) {
  .app-container {
    margin-left: 0;
  }
  
  .main-content {
    width: 100%;
    padding: 1rem;
  }
}

@media (max-width: 768px) {
  .main-content {
    padding: 0.5rem;
  }
  
  h1 {
    font-size: 1.8rem;
  }
  
  h2 {
    font-size: 1.5rem;
  }
}

@media (max-width: 576px) {
  .main-content {
    padding: 0.25rem;
  }
  
  h1 {
    font-size: 1.5rem;
  }
  
  h2 {
    font-size: 1.2rem;
  }
}
</style>


