<template>
  <div class="guide-page">
    <section class="hero-section">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title">GUIDE DE DÉMARRAGE</h1>
        <h2 class="hero-subtitle">LES PREMIERS PAS POUR VOTRE PRÉPARATION</h2>
      </div>
    </section>

    <section class="steps-section">
      <div class="section-header">
        <h2 class="section-title">ÉTAPES ESSENTIELLES</h2>
        <p class="section-subtitle">Commencez votre préparation en suivant ces étapes fondamentales</p>
      </div>

      <div class="steps-container">
        <div class="step-card">
          <div class="step-number">1</div>
          <h3>Évaluation des risques</h3>
          <p>Identifiez les menaces les plus probables dans votre région et votre situation personnelle.</p>
          <ul class="step-list">
            <li>Analyse de votre environnement</li>
            <li>Identification des vulnérabilités</li>
            <li>Priorisation des risques</li>
          </ul>
        </div>

        <div class="step-card">
          <div class="step-number">2</div>
          <h3>Plan d'action</h3>
          <p>Élaborez un plan détaillé pour chaque type de situation d'urgence.</p>
          <ul class="step-list">
            <li>Plan d'évacuation</li>
            <li>Points de rendez-vous</li>
            <li>Contacts d'urgence</li>
          </ul>
        </div>

        <div class="step-card">
          <div class="step-number">3</div>
          <h3>Réserves essentielles</h3>
          <p>Constituez progressivement vos réserves de survie.</p>
          <ul class="step-list">
            <li>Eau et nourriture</li>
            <li>Médicaments et premiers secours</li>
            <li>Équipement de base</li>
          </ul>
        </div>

        <div class="step-card">
          <div class="step-number">4</div>
          <h3>Formation et compétences</h3>
          <p>Acquérez les compétences de base pour la survie.</p>
          <ul class="step-list">
            <li>Premiers secours</li>
            <li>Navigation et orientation</li>
            <li>Gestion du stress</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="resources-section">
      <div class="section-header">
        <h2 class="section-title">RESSOURCES UTILES</h2>
        <p class="section-subtitle">Documents et guides pour approfondir votre préparation</p>
      </div>

      <div class="resources-grid">
        <div class="resource-card">
          <div class="resource-icon">📋</div>
          <h3>Liste de vérification</h3>
          <p>Checklist complète pour votre préparation</p>
          <button class="btn btn-small">TÉLÉCHARGER</button>
        </div>

        <div class="resource-card">
          <div class="resource-icon">🗺️</div>
          <h3>Plan d'évacuation</h3>
          <p>Modèle à personnaliser pour votre situation</p>
          <button class="btn btn-small">TÉLÉCHARGER</button>
        </div>

        <div class="resource-card">
          <div class="resource-icon">📚</div>
          <h3>Guide de survie</h3>
          <p>Manuel complet des techniques de base</p>
          <button class="btn btn-small">TÉLÉCHARGER</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Logique spécifique au guide de démarrage
</script>

<style scoped>
.guide-page {
  min-height: 100vh;
}

.hero-section {
  position: relative;
  min-height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  background-color: var(--color-secondary);
  color: var(--color-text);
  overflow: hidden;
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
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 800;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: var(--color-accent);
}

.steps-section {
  padding: 4rem 2rem;
  background-color: var(--color-black);
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--color-accent);
}

.section-subtitle {
  font-size: 1.1rem;
  color: var(--color-text);
  opacity: 0.8;
}

.steps-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.step-card {
  background-color: var(--color-secondary);
  padding: 2rem;
  border-radius: 4px;
  position: relative;
}

.step-number {
  position: absolute;
  top: -1.5rem;
  left: 1.5rem;
  width: 3rem;
  height: 3rem;
  background-color: var(--color-accent);
  color: var(--color-text);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
}

.step-card h3 {
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: var(--color-accent);
}

.step-list {
  list-style: none;
  padding: 0;
  margin-top: 1rem;
}

.step-list li {
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;
}

.step-list li:before {
  content: "•";
  position: absolute;
  left: 0;
  color: var(--color-accent);
}

.resources-section {
  padding: 4rem 2rem;
  background-color: var(--color-secondary);
}

.resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.resource-card {
  background-color: var(--color-black);
  padding: 2rem;
  border-radius: 4px;
  text-align: center;
}

.resource-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.resource-card h3 {
  margin-bottom: 1rem;
  color: var(--color-accent);
}

.resource-card p {
  margin-bottom: 1.5rem;
  opacity: 0.8;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .steps-container,
  .resources-grid {
    grid-template-columns: 1fr;
  }
}
</style> 