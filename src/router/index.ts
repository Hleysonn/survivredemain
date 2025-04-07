import { createRouter, createWebHistory } from 'vue-router';
import RiskMap from '../components/RiskMap.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../components/pages/Home.vue')
  },
  {
    path: '/crise-electrique',
    name: 'crise-electrique',
    component: () => import('../components/pages/CriseElectrique.vue')
  },
  {
    path: '/guerre',
    name: 'guerre',
    component: () => import('../components/pages/Guerre.vue')
  },
  {
    path: '/pandemie',
    name: 'pandemie',
    component: () => import('../components/pages/Pandemie.vue')
  },
  {
    path: '/catastrophes',
    redirect: '/feux-foret'
  },
  {
    path: '/feux-foret',
    name: 'feux-foret',
    component: () => import('../components/pages/catastrophes/FeuxForet.vue')
  },
  {
    path: '/tempetes',
    name: 'tempetes',
    component: () => import('../components/pages/catastrophes/Tempetes.vue')
  },
  {
    path: '/inondations',
    name: 'inondations',
    component: () => import('../components/pages/catastrophes/Inondations.vue')
  },
  {
    path: '/seismes',
    name: 'seismes',
    component: () => import('../components/pages/catastrophes/Seismes.vue')
  },
  {
    path: '/volcans',
    name: 'volcans',
    component: () => import('../components/pages/catastrophes/Volcans.vue')
  },
  {
    path: '/crise-economique',
    name: 'crise-economique',
    component: () => import('../components/pages/CriseEconomique.vue')
  },
  {
    path: '/survie-urbaine',
    name: 'survie-urbaine',
    component: () => import('../components/pages/SurvieUrbaine.vue')
  },
  {
    path: '/survie-sauvage',
    name: 'survie-sauvage',
    component: () => import('../components/pages/SurvieSauvage.vue')
  },
  {
    path: '/equipement',
    name: 'equipement',
    component: () => import('../components/pages/Equipement.vue')
  },
  {
    path: '/navigation',
    name: 'navigation',
    component: () => import('../components/pages/Navigation.vue')
  },
  {
    path: '/premiers-soins',
    name: 'premiers-soins',
    component: () => import('../components/pages/PremierssoinsPage.vue')
  },
  {
    path: '/outils',
    name: 'outils',
    component: () => import('../components/pages/OutilsPage.vue')
  },
  {
    path: '/communication',
    name: 'communication',
    component: () => import('../components/pages/CommunicationPage.vue')
  },
  {
    path: '/alimentation',
    name: 'alimentation',
    component: () => import('../components/pages/AlimentationPage.vue')
  },
  {
    path: '/eau',
    name: 'eau',
    component: () => import('../components/pages/EauPage.vue')
  },
  {
    path: '/abri',
    name: 'abri',
    component: () => import('../components/pages/AbriPage.vue')
  },
  {
    path: '/forum',
    name: 'forum',
    component: () => import('../components/pages/Forum.vue')
  },
  {
    path: '/boutique',
    name: 'boutique',
    component: () => import('../components/pages/Boutique.vue')
  },
  {
    path: '/commande',
    name: 'commande',
    component: () => import('../components/pages/Commande.vue')
  },
  {
    path: '/inscription',
    name: 'inscription',
    component: () => import('../components/pages/Inscription.vue')
  },
  {
    path: '/connexion',
    name: 'connexion',
    component: () => import('../components/pages/Connexion.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../components/pages/Profile.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('../components/pages/Settings.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/carte-risques',
    name: 'carte-risques',
    component: RiskMap
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

export default router; 