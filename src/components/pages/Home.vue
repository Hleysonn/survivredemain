<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title">PRÉPAREZ-VOUS À SURVIVRE</h1>
        <h2 class="hero-subtitle">QUAND TOUT S'EFFONDRE, SOYEZ PRÊT</h2>
        <p class="hero-description">
          Guides experts, stratégies éprouvées, et ressources essentielles pour traverser les pires scénarios.
        </p>
        <div class="hero-buttons">
          <button class="btn btn-large btn-accent" @click="goToGuide">GUIDE DE DÉMARRAGE</button>
          <button class="btn btn-large btn-outline">MENACES ACTUELLES</button>
        </div>
      </div>
    </section>
    
    <!-- Urgences actuelles - Bandeau -->
    <section class="alert-banner">
      <div class="alert-icon">⚠️</div>
      <div class="alert-content">
        <h3>ALERTES ACTIVES</h3>
        <p>Tensions géopolitiques élevées - Risques de cyberattaques sur les infrastructures critiques - Préparez vos réserves</p>
      </div>
      <button class="btn btn-small">DÉTAILS</button>
    </section>
    
    <!-- Menaces principales -->
    <section class="threats-section">
      <div class="section-header">
        <h2 class="section-title">PRINCIPALES MENACES</h2>
        <p class="section-subtitle">Informez-vous sur les risques les plus probables et préparez-vous en conséquence</p>
      </div>
      
      <div class="threats-grid">
        <div class="threat-card">
          <div class="threat-icon">🔌</div>
          <h3>Panne électrique massive</h3>
          <p>Blackout prolongé, effondrement des communications et des services essentiels.</p>
          <a href="#" class="card-link">SE PRÉPARER →</a>
        </div>
        
        <div class="threat-card">
          <div class="threat-icon">⚔️</div>
          <h3>Guerre / Conflit armé</h3>
          <p>Bombardements, lois martiales, pillages, déplacements de population.</p>
          <a href="#" class="card-link">SE PRÉPARER →</a>
        </div>
        
        <div class="threat-card">
          <div class="threat-icon">🦠</div>
          <h3>Pandémie mondiale</h3>
          <p>Confinements, ruptures d'approvisionnement, systèmes de santé débordés.</p>
          <a href="#" class="card-link">SE PRÉPARER →</a>
        </div>
        
        <div class="threat-card">
          <div class="threat-icon">🔥</div>
          <h3>Catastrophes naturelles</h3>
          <p>Feux de forêt, inondations, séismes, tempêtes et autres désastres.</p>
          <a href="#" class="card-link">SE PRÉPARER →</a>
        </div>
        
        <div class="threat-card">
          <div class="threat-icon">💵</div>
          <h3>Crise économique</h3>
          <p>Effondrement monétaire, hyperinflation, pénuries, chaos social.</p>
          <a href="#" class="card-link">SE PRÉPARER →</a>
        </div>
        
        <div class="threat-card">
          <div class="threat-icon">🏙️</div>
          <h3>Survie urbaine</h3>
          <p>Stratégies de survie dans les environnements urbains densément peuplés.</p>
          <a href="#" class="card-link">SE PRÉPARER →</a>
        </div>
      </div>
    </section>
    
    <!-- Kit de survie essentiel -->
    <section class="kit-section">
      <div class="section-header">
        <h2 class="section-title">KIT DE SURVIE ESSENTIEL</h2>
        <p class="section-subtitle">Les bases indispensables que tout survivaliste doit posséder</p>
      </div>
      
      <div class="kit-content">
        <div class="kit-image">
          <!-- Image placeholder avec un fond gris et une icône -->
          <div class="image-placeholder">
            <span class="placeholder-icon">🎒</span>
          </div>
        </div>
        
        <div class="kit-items">
          <ul class="kit-list">
            <li class="kit-item">
              <span class="item-name">Réserve d'eau</span>
              <span class="item-desc">4L par personne/jour pour 7 jours minimum</span>
            </li>
            <li class="kit-item">
              <span class="item-name">Nourriture non périssable</span>
              <span class="item-desc">14 jours de calories par personne</span>
            </li>
            <li class="kit-item">
              <span class="item-name">Radio à manivelle</span>
              <span class="item-desc">Pour suivre les informations sans électricité</span>
            </li>
            <li class="kit-item">
              <span class="item-name">Kit de premiers secours</span>
              <span class="item-desc">Complet avec médicaments d'urgence</span>
            </li>
            <li class="kit-item">
              <span class="item-name">Lampe torche + batteries</span>
              <span class="item-desc">Ou modèle à manivelle/solaire</span>
            </li>
            <li class="kit-item">
              <span class="item-name">Couteau multifonction</span>
              <span class="item-desc">Outil de survie polyvalent</span>
            </li>
            <li class="kit-item">
              <span class="item-name">Sac d'évacuation prêt</span>
              <span class="item-desc">"Bug out bag" avec essentiels de 72h</span>
            </li>
          </ul>
          <button class="btn btn-accent">GUIDE COMPLET D'ÉQUIPEMENT</button>
        </div>
      </div>
    </section>
    
    <!-- Témoignages -->
    <section class="testimonials-section">
      <div class="section-header">
        <h2 class="section-title">ILS ONT SURVÉCU</h2>
        <p class="section-subtitle">Témoignages de personnes qui ont vécu des situations critiques</p>
      </div>
      
      <div class="testimonials-container">
        <div class="testimonial-card">
          <div class="testimonial-quote">"Lors de la tempête qui a coupé l'électricité pendant 12 jours, notre préparation nous a permis de rester en sécurité et autonomes quand d'autres évacuaient."</div>
          <div class="testimonial-author">
            <div class="author-avatar">
              <!-- Avatar placeholder -->
              <div class="avatar-placeholder">JD</div>
            </div>
            <div class="author-info">
              <div class="author-name">Jean Dupont</div>
              <div class="author-event">Tempête de verglas, Québec 2023</div>
            </div>
          </div>
        </div>
        
        <div class="testimonial-card">
          <div class="testimonial-quote">"Sans notre plan d'évacuation et notre sac d'urgence prêt, nous n'aurions jamais pu quitter la zone avant que les feux ne bloquent toutes les routes."</div>
          <div class="testimonial-author">
            <div class="author-avatar">
              <!-- Avatar placeholder -->
              <div class="avatar-placeholder">ML</div>
            </div>
            <div class="author-info">
              <div class="author-name">Marie Laurent</div>
              <div class="author-event">Incendies de forêt, Sud de la France 2022</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Call to Action -->
    <section class="cta-section">
      <div class="cta-overlay"></div>
      <div class="cta-content">
        <h2>REJOIGNEZ LA COMMUNAUTÉ DES SURVIVALISTES</h2>
        <p>Partagez vos connaissances, apprenez des experts et préparez-vous ensemble aux défis de demain.</p>
        <div class="cta-buttons">
          <button class="btn btn-large btn-accent">CRÉER UN COMPTE</button>
          <button class="btn btn-large btn-outline">EXPLORER LE FORUM</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  currentPage: string;
}>();

const emit = defineEmits<{
  (e: 'set-page', page: string): void;
}>();

const goToGuide = () => {
  emit('set-page', 'guide-demarrage');
};
</script>

<style scoped>
/* Hero Section */
.hero-section {
  position: relative;
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  background-image: url('/images/hero-bg.jpg');
  background-size: cover;
  background-position: center;
  color: var(--color-text);
  overflow: hidden;
}

/* Placeholder pour l'image de fond */
.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-black);
  background-image: 
    linear-gradient(
      rgba(10, 10, 10, 0.8), 
      rgba(33, 49, 28, 0.7)
    ),
    repeating-linear-gradient(
      45deg,
      rgba(0, 0, 0, 0.1),
      rgba(0, 0, 0, 0.1) 1px,
      transparent 1px,
      transparent 6px
    );
  z-index: -1;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
}

.hero-title {
  font-size: 3.5rem;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
  margin-bottom: 1rem;
  font-weight: 800;
}

.hero-subtitle {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: var(--color-accent);
  font-weight: 600;
}

.hero-description {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0.9;
}

.hero-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-large {
  padding: 0.8rem 2rem;
  font-size: 1rem;
}

.btn-accent {
  background-color: var(--color-accent);
  color: white;
}

.btn-outline {
  background-color: transparent;
  border: 2px solid var(--color-accent);
  color: var(--color-text);
}

.btn-outline:hover {
  background-color: var(--color-accent);
  color: white;
}

/* Alert Banner */
.alert-banner {
  background-color: rgba(230, 126, 34, 0.2);
  border-left: 4px solid var(--color-accent);
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
}

.alert-icon {
  font-size: 1.8rem;
  margin-right: 1rem;
}

.alert-content {
  flex: 1;
}

.alert-content h3 {
  color: var(--color-accent);
  margin-bottom: 0.3rem;
  font-size: 1rem;
}

.alert-content p {
  margin: 0;
}

.btn-small {
  padding: 0.3rem 1rem;
  font-size: 0.8rem;
}

/* Sections communes */
section {
  padding: 4rem 2rem;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--color-accent);
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: '';
  position: absolute;
  width: 60px;
  height: 3px;
  background-color: var(--color-primary);
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
}

.section-subtitle {
  max-width: 700px;
  margin: 0 auto;
  opacity: 0.8;
}

/* Menaces principales */
.threats-section {
  background-color: rgba(10, 10, 10, 0.3);
}

.threats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.threat-card {
  background-color: var(--color-secondary);
  padding: 2rem;
  border-radius: 3px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.threat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.threat-icon {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.threat-card h3 {
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.threat-card p {
  margin-bottom: 1.5rem;
  opacity: 0.8;
  font-size: 0.95rem;
}

.card-link {
  display: inline-block;
  font-weight: bold;
  font-size: 0.9rem;
}

/* Kit section */
.kit-section {
  background-color: transparent;
}

.kit-content {
  display: flex;
  gap: 3rem;
  align-items: center;
}

.kit-image {
  flex: 1;
  min-width: 300px;
}

.image-placeholder {
  background-color: var(--color-secondary);
  border-radius: 3px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-icon {
  font-size: 5rem;
  opacity: 0.6;
}

.kit-items {
  flex: 1;
}

.kit-list {
  list-style: none;
  margin-bottom: 2rem;
}

.kit-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 1rem;
}

.item-name {
  font-weight: bold;
  color: var(--color-accent);
  margin-bottom: 0.3rem;
}

.item-desc {
  font-size: 0.9rem;
  opacity: 0.8;
}

/* Testimonials */
.testimonials-section {
  background-color: rgba(10, 10, 10, 0.3);
}

.testimonials-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: a.5rem;
}

.testimonial-card {
  background-color: var(--color-secondary);
  padding: 2rem;
  border-radius: 3px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.testimonial-quote {
  font-style: italic;
  margin-bottom: 1.5rem;
  position: relative;
  padding-left: 1.5rem;
  line-height: 1.7;
}

.testimonial-quote::before {
  content: '"';
  position: absolute;
  left: 0;
  top: 0;
  font-size: 2rem;
  color: var(--color-accent);
  line-height: 1;
}

.testimonial-author {
  display: flex;
  align-items: center;
}

.author-avatar {
  margin-right: 1rem;
}

.avatar-placeholder {
  width: 50px;
  height: 50px;
  background-color: var(--color-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.author-name {
  font-weight: bold;
  margin-bottom: 0.3rem;
}

.author-event {
  font-size: 0.85rem;
  opacity: 0.8;
}

/* Call to Action */
.cta-section {
  position: relative;
  padding: 5rem 2rem;
  text-align: center;
  background-image: url('/images/cta-bg.jpg');
  background-size: cover;
  background-position: center;
  overflow: hidden;
}

/* Placeholder pour l'image de fond */
.cta-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-black);
  background-image: 
    linear-gradient(
      rgba(10, 10, 10, 0.8), 
      rgba(33, 49, 28, 0.7)
    ),
    repeating-linear-gradient(
      45deg,
      rgba(0, 0, 0, 0.1),
      rgba(0, 0, 0, 0.1) 1px,
      transparent 1px,
      transparent 6px
    );
  z-index: -1;
}

.cta-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1;
}

.cta-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
}

.cta-content h2 {
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
  color: var(--color-accent);
}

.cta-content p {
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.4rem;
  }
  
  .kit-content {
    flex-direction: column;
  }
  
  .kit-image {
    width: 100%;
    margin-bottom: 2rem;
  }
  
  .testimonials-container {
    grid-template-columns: 1fr;
  }
  
  .cta-content h2 {
    font-size: 1.8rem;
  }
}
</style> 