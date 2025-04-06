<template>
  <nav class="navbar">
    <div class="navbar-container">
      <router-link to="/" class="logo">
        <span class="logo-icon">🧭</span>
        <h1>SURVIVRE DEMAIN</h1>
      </router-link>
      
      <div class="menu-toggle" @click="toggleMobileMenu">
        <div class="hamburger" :class="{ 'active': mobileMenuActive }">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      
      <ul class="nav-links" :class="{ 'active': mobileMenuActive }">
        <router-link 
          to="/" 
          v-slot="{ isActive }"
          custom
        >
          <li 
            :class="{ 'active': isActive }"
            @click="handleNavigate('home')"
            class="nav-item"
          >
            <span class="nav-icon">🏠</span>
            <span class="nav-text">Accueil</span>
          </li>
        </router-link>
        
        <router-link 
          to="/crise-electrique" 
          v-slot="{ isActive }"
          custom
        >
          <li 
            :class="{ 'active': isActive }"
            @click="handleNavigate('crise-electrique')"
            class="nav-item"
          >
            <span class="nav-icon">⚡</span>
            <span class="nav-text">Panne électrique</span>
          </li>
        </router-link>
        
        <router-link 
          to="/guerre" 
          v-slot="{ isActive }"
          custom
        >
          <li 
            :class="{ 'active': isActive }"
            @click="handleNavigate('guerre')"
            class="nav-item"
          >
            <span class="nav-icon">⚔️</span>
            <span class="nav-text">Guerre / Conflit</span>
          </li>
        </router-link>
        
        <router-link 
          to="/pandemie" 
          v-slot="{ isActive }"
          custom
        >
          <li 
            :class="{ 'active': isActive }"
            @click="handleNavigate('pandemie')"
            class="nav-item"
          >
            <span class="nav-icon">🦠</span>
            <span class="nav-text">Pandémie</span>
          </li>
        </router-link>
        
        <li 
          :class="{ 
            'active': currentPage === 'catastrophes' || 
            catastropheSubPages.some(page => page.id === currentPage),
            'submenu-open': showCatastropheSubMenu
          }"
          class="has-submenu"
        >
          <div class="menu-item" @click="toggleCatastropheSubMenu">
            <span class="nav-icon">🌪️</span>
            <span class="nav-text">Catastrophes naturelles</span>
            <span class="dropdown-icon">
              <svg class="chevron-icon" :class="{ 'rotate': showCatastropheSubMenu }" viewBox="0 0 24 24" width="14" height="14">
                <path fill="currentColor" d="M7 10l5 5 5-5z"/>
              </svg>
            </span>
          </div>
          
          <transition name="submenu-fade">
            <ul class="submenu" v-show="showCatastropheSubMenu">
              <router-link 
                v-for="page in catastropheSubPages" 
                :key="page.id"
                :to="'/' + page.id"
                v-slot="{ isActive }"
                custom
              >
                <li 
                  :class="{ 'active': isActive }"
                  @click="handleNavigate(page.id)"
                  class="submenu-item"
                >
                  <span class="nav-icon">{{ getIconForPage(page.id) }}</span>
                  <span class="nav-text">{{ page.name }}</span>
                </li>
              </router-link>
            </ul>
          </transition>
        </li>
        
        <router-link 
          to="/crise-economique" 
          v-slot="{ isActive }"
          custom
        >
          <li 
            :class="{ 'active': isActive }"
            @click="handleNavigate('crise-economique')"
            class="nav-item"
          >
            <span class="nav-icon">💸</span>
            <span class="nav-text">Crise économique</span>
          </li>
        </router-link>
        
        <router-link 
          to="/survie-urbaine" 
          v-slot="{ isActive }"
          custom
        >
          <li 
            :class="{ 'active': isActive }"
            @click="handleNavigate('survie-urbaine')"
            class="nav-item"
          >
            <span class="nav-icon">🏙️</span>
            <span class="nav-text">Survie urbaine</span>
          </li>
        </router-link>
        
        <router-link 
          to="/survie-sauvage" 
          v-slot="{ isActive }"
          custom
        >
          <li 
            :class="{ 'active': isActive }"
            @click="handleNavigate('survie-sauvage')"
            class="nav-item"
          >
            <span class="nav-icon">🌲</span>
            <span class="nav-text">Survie sauvage</span>
          </li>
        </router-link>
        
        <li 
          :class="{ 
            'active': currentPage === 'equipement' || 
            equipementSubPages.some(page => page.id === currentPage),
            'submenu-open': showEquipementSubMenu
          }"
          class="has-submenu"
        >
          <div class="menu-item" @click="toggleEquipementSubMenu">
            <span class="nav-icon">🎒</span>
            <span class="nav-text">Équipement</span>
            <span class="dropdown-icon">
              <svg class="chevron-icon" :class="{ 'rotate': showEquipementSubMenu }" viewBox="0 0 24 24" width="14" height="14">
                <path fill="currentColor" d="M7 10l5 5 5-5z"/>
              </svg>
            </span>
          </div>
          
          <transition name="submenu-fade">
            <ul class="submenu" v-show="showEquipementSubMenu">
              <router-link 
                v-for="page in equipementSubPages" 
                :key="page.id"
                :to="'/' + page.id"
                v-slot="{ isActive }"
                custom
              >
                <li 
                  :class="{ 'active': isActive }"
                  @click="handleNavigate(page.id)"
                  class="submenu-item"
                >
                  <span class="nav-icon">{{ getIconForEquipement(page.id) }}</span>
                  <span class="nav-text">{{ page.name }}</span>
                </li>
              </router-link>
            </ul>
          </transition>
        </li>
        
        <router-link 
          to="/forum" 
          v-slot="{ isActive }"
          custom
        >
          <li 
            :class="{ 'active': isActive }"
            @click="handleNavigate('forum')"
            class="nav-item"
          >
            <span class="nav-icon">💬</span>
            <span class="nav-text">Forum</span>
          </li>
        </router-link>

        <router-link 
          to="/boutique" 
          v-slot="{ isActive }"
          custom
        >
          <li 
            :class="{ 'active': isActive }"
            @click="handleNavigate('boutique')"
            class="nav-item boutique-item"
          >
            <span class="nav-icon">🛒</span>
            <span class="nav-text">Boutique</span>
          </li>
        </router-link>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps({
  currentPage: {
    type: String,
    required: true
  },
  showCatastropheSubMenu: {
    type: Boolean,
    required: true
  },
  showEquipementSubMenu: {
    type: Boolean,
    required: true
  },
  catastropheSubPages: {
    type: Array,
    required: true
  },
  equipementSubPages: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['set-page', 'toggle-catastrophe-menu', 'toggle-equipement-menu']);

const mobileMenuActive = ref(false);
const localCatastropheMenu = ref(props.showCatastropheSubMenu);
const localEquipementMenu = ref(props.showEquipementSubMenu);

// Ajout de la classe menu-active au navbar quand le menu mobile est actif
watch(mobileMenuActive, (isActive) => {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    if (isActive) {
      navbar.classList.add('menu-active');
    } else {
      navbar.classList.remove('menu-active');
    }
  }
});

const toggleMobileMenu = () => {
  mobileMenuActive.value = !mobileMenuActive.value;
};

const toggleCatastropheSubMenu = () => {
  localCatastropheMenu.value = !localCatastropheMenu.value;
  emit('toggle-catastrophe-menu');
};

const toggleEquipementSubMenu = () => {
  localEquipementMenu.value = !localEquipementMenu.value;
  emit('toggle-equipement-menu');
};

const handleNavigate = (page: string) => {
  if (mobileMenuActive.value) {
    mobileMenuActive.value = false;
  }
  
  // Cas spécial pour la page d'accueil
  if (page === 'home') {
    router.push('/');
  } else {
    // Navigation directe
    router.push({ path: `/${page}` });
  }
  
  // Émettre l'événement pour maintenir la compatibilité
  emit('set-page', page);
};

const getIconForPage = (pageId: string) => {
  const icons: { [key: string]: string } = {
    'feux-foret': '🔥',
    'tempetes': '🌪️',
    'inondations': '🌊',
    'seismes': '🌍',
    'volcans': '🌋'
  };
  return icons[pageId] || '📌';
};

const getIconForEquipement = (pageId: string) => {
  const icons: { [key: string]: string } = {
    'survie-sauvage': '🌲',
    'navigation': '🧭',
    'premiers-soins': '🩹',
    'outils': '🔧',
    'communication': '📡',
    'alimentation': '🍖',
    'eau': '💧',
    'abri': '⛺'
  };
  return icons[pageId] || '📦';
};
</script>

<style scoped>
.navbar {
  width: 280px;
  height: 100vh;
  background-color: var(--color-black);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  font-family: 'Barlow Condensed', sans-serif;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 3px 0 20px rgba(0, 0, 0, 0.3);
}

.navbar-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1.5rem 0;
}

.logo {
  display: flex;
  align-items: center;
  padding: 0.5rem 1.5rem;
  margin-bottom: 1.5rem;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.logo:hover {
  transform: translateX(5px);
}

.logo-icon {
  font-size: 1.8rem;
  margin-right: 0.8rem;
}

.logo h1 {
  font-size: 1.4rem;
  color: var(--color-accent);
  font-weight: 700;
  letter-spacing: 0.5px;
  text-shadow: 0 0 10px rgba(230, 126, 34, 0.5);
}

.menu-toggle {
  display: none;
  cursor: pointer;
  padding: 1rem;
  z-index: 1001;
}

.hamburger {
  position: relative;
  width: 24px;
  height: 18px;
}

.hamburger span {
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--color-text);
  transition: all 0.3s ease;
}

.hamburger span:nth-child(1) {
  top: 0;
}

.hamburger span:nth-child(2) {
  top: 8px;
}

.hamburger span:nth-child(3) {
  bottom: 0;
}

.hamburger.active span:nth-child(1) {
  transform: rotate(45deg);
  top: 8px;
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
}

.hamburger.active span:nth-child(3) {
  transform: rotate(-45deg);
  bottom: 8px;
}

.nav-links {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0 1rem;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--color-accent) transparent;
}

.nav-links::-webkit-scrollbar {
  width: 4px;
}

.nav-links::-webkit-scrollbar-track {
  background: transparent;
}

.nav-links::-webkit-scrollbar-thumb {
  background-color: var(--color-accent);
  border-radius: 4px;
}

.nav-item, 
.nav-links li:not(.has-submenu) {
  position: relative;
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  margin: 0.2rem 0;
  transition: all 0.3s ease;
  cursor: pointer;
}

.nav-item:after, 
.nav-links li:not(.has-submenu):hover:after,
.nav-item.active:after, 
.nav-links li.active:not(.has-submenu):after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 2px;
  background-color: var(--color-accent);
  transition: width 0.3s ease;
}

.nav-item:hover:after, 
.nav-links li:not(.has-submenu):hover:after,
.nav-item.active:after, 
.nav-links li.active:not(.has-submenu):after {
  width: 30%;
}

.menu-item {
  padding: 0.8rem 1.2rem;
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.nav-icon {
  font-size: 1.3rem;
  margin-right: 1rem;
  width: 24px;
  text-align: center;
  transition: transform 0.3s ease;
}

.nav-links li:hover .nav-icon {
  transform: scale(1.2);
}

.nav-text {
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.dropdown-icon {
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chevron-icon {
  transition: transform 0.3s ease;
}

.chevron-icon.rotate {
  transform: rotate(180deg);
}

/* Style des éléments actifs et hover */
.nav-links li:hover:not(.has-submenu),
.menu-item:hover {
  background-color: rgba(255, 255, 255, 0.08);
  transform: translateX(4px);
}

.nav-links li.active:not(.has-submenu) {
  background-color: var(--color-primary);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

/* Sous-menu */
.submenu {
  margin: 0.5rem 0 0.5rem 1rem;
  padding-left: 1rem;
  border-left: 2px solid var(--color-accent);
  border-radius: 0 0 8px 8px;
  overflow: hidden;
}

.submenu-item {
  padding: 0.7rem 1rem !important;
  font-size: 0.95rem;
  opacity: 0.85;
  transition: all 0.25s ease;
  border-radius: 6px;
}

.submenu-item:hover {
  opacity: 1;
  background-color: rgba(230, 126, 34, 0.1);
  transform: translateX(4px);
}

.submenu-item.active {
  background-color: rgba(230, 126, 34, 0.2);
  color: var(--color-accent);
  font-weight: 500;
}

/* Animation du sous-menu */
.submenu-fade-enter-active, 
.submenu-fade-leave-active {
  transition: all 0.3s ease;
  max-height: 500px;
}

.submenu-fade-enter-from, 
.submenu-fade-leave-to {
  opacity: 0;
  max-height: 0;
}

/* Classe pour l'item boutique */
.boutique-item {
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.9));
  margin-top: 0.8rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.boutique-item:hover {
  transform: scale(1.03) translateX(4px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

.boutique-item.active {
  background: linear-gradient(135deg, var(--color-primary), rgba(30, 41, 59, 0.9));
}

/* Version Mobile */
@media screen and (max-width: 1024px) {
  .navbar {
    width: 100%;
    height: 60px;
    position: fixed;
    overflow: visible;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }

  .navbar-container {
    flex-direction: row;
    align-items: center;
    padding: 0;
    height: 60px;
  }

  .logo {
    margin: 0;
    padding: 0 1rem;
  }

  .logo:hover {
    transform: none;
  }

  .logo h1 {
    font-size: 1.1rem;
  }

  .menu-toggle {
    display: block;
    margin-left: auto;
    padding: 1rem;
  }

  .nav-links {
    position: fixed;
    top: 60px;
    left: -100%;
    width: 280px;
    height: calc(100vh - 60px);
    background-color: var(--color-black);
    transition: all 0.3s ease;
    padding: 1rem;
    box-shadow: 2px 0 15px rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }

  .nav-links.active {
    left: 0;
  }

  .submenu {
    margin: 0.5rem 0;
    padding-left: 2rem;
    background-color: rgba(74, 93, 35, 0.1);
    border-radius: 6px;
  }
  
  .submenu-item {
    padding: 0.7rem 0.8rem !important;
  }
  
  /* Animation au slide pour mobile */
  .nav-links.active {
    animation: slideIn 0.3s forwards;
  }
  
  @keyframes slideIn {
    from { left: -280px; }
    to { left: 0; }
  }
  
  /* Overlay pour le menu mobile */
  .navbar::after {
    content: '';
    position: fixed;
    top: 60px;
    left: 0;
    width: 100%;
    height: calc(100vh - 60px);
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    pointer-events: none;
  }
  
  .navbar.menu-active::after {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  }
}

@media screen and (max-width: 768px) {
  .nav-links {
    width: 100%;
  }
  
  .submenu {
    padding-left: 1.5rem;
  }
}

/* Autres ajustements pour les très petits écrans */
@media screen and (max-width: 400px) {
  .logo h1 {
    font-size: 1rem;
  }
  
  .logo-icon {
    font-size: 1.5rem;
  }
}
</style> 