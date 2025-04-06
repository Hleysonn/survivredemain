<template>
  <div class="alimentation-page">
    <div class="hero-section">
      <h1>Alimentation</h1>
      <p class="subtitle">Gérer ses ressources alimentaires en situation de crise</p>
    </div>

    <div class="content-section">
      <div class="card">
        <h2>🥫 Stockage</h2>
        <ul>
          <li>Aliments déshydratés</li>
          <li>Conserves longue durée</li>
          <li>Rations de survie</li>
          <li>Rotation des stocks</li>
        </ul>
      </div>

      <div class="card">
        <h2>🌾 Autonomie</h2>
        <ul>
          <li>Culture d'urgence</li>
          <li>Graines et semences</li>
          <li>Outils de jardinage</li>
          <li>Techniques de conservation</li>
        </ul>
      </div>

      <div class="card">
        <h2>🍖 Chasse et Pêche</h2>
        <ul>
          <li>Matériel de pêche</li>
          <li>Pièges et collets</li>
          <li>Conservation du gibier</li>
          <li>Identification des espèces</li>
        </ul>
      </div>

      <div class="card">
        <h2>🌿 Cueillette</h2>
        <ul>
          <li>Plantes comestibles</li>
          <li>Plantes médicinales</li>
          <li>Guide d'identification</li>
          <li>Zones de cueillette</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Composant pour la page d'alimentation
</script>

<style scoped>
.alimentation-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.hero-section {
  text-align: center;
  margin-bottom: 3rem;
  padding: 3rem 1rem;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/alimentation-bg.jpg');
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
  .alimentation-page {
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