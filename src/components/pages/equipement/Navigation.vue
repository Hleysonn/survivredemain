<template>
  <div class="navigation-page">
    <div class="hero-section">
      <h1>Navigation & Orientation</h1>
      <p class="subtitle">Maîtrisez les techniques essentielles pour vous orienter en toute situation</p>
    </div>

    <div class="content-section">
      <div class="card">
        <h2>🧭 Outils de Navigation</h2>
        <ul>
          <li>Boussole et lecture de carte</li>
          <li>GPS et appareils électroniques</li>
          <li>Navigation avec les étoiles</li>
          <li>Repères naturels</li>
        </ul>
      </div>

      <div class="card">
        <h2>🌟 Navigation Nocturne</h2>
        <ul>
          <li>Repérer l'étoile polaire</li>
          <li>Utiliser la Lune</li>
          <li>Techniques de vision nocturne</li>
        </ul>
      </div>

      <div class="card">
        <h2>🌳 Repères Naturels</h2>
        <ul>
          <li>Position du soleil</li>
          <li>Croissance de la végétation</li>
          <li>Formation des reliefs</li>
          <li>Comportement animal</li>
        </ul>
      </div>

      <div class="card">
        <h2>🗺️ Lecture de Carte</h2>
        <ul>
          <li>Comprendre les symboles</li>
          <li>Calcul des distances</li>
          <li>Lecture du relief</li>
          <li>Planification d'itinéraire</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Composant pour la page de navigation et orientation
</script>

<style scoped>
.navigation-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.hero-section {
  text-align: center;
  margin-bottom: 3rem;
  padding: 3rem 1rem;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/navigation-bg.jpg');
  background-size: cover;
  background-position: center;
  border-radius: 8px;
}

.hero-section h1 {
  font-size: 2.5rem;
  color: var(--color-accent);
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.2rem;
  color: var(--color-text);
  opacity: 0.9;
}

.content-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.card {
  background-color: var(--color-secondary);
  padding: 2rem;
  border-radius: 8px;
  border-left: 4px solid var(--color-accent);
}

.card h2 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-accent);
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.card ul {
  list-style: none;
  padding: 0;
}

.card ul li {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
  position: relative;
}

.card ul li::before {
  content: "→";
  position: absolute;
  left: 0;
  color: var(--color-accent);
}

@media (max-width: 768px) {
  .navigation-page {
    padding: 1rem;
  }

  .hero-section {
    padding: 2rem 1rem;
  }

  .hero-section h1 {
    font-size: 2rem;
  }

  .content-section {
    grid-template-columns: 1fr;
  }
}
</style> 