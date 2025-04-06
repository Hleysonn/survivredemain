<template>
  <div class="outils-page">
    <div class="hero-section">
      <h1>Outils Essentiels</h1>
      <p class="subtitle">Les équipements indispensables pour la survie</p>
    </div>

    <div class="content-section">
      <div class="card">
        <h2>🔪 Outils de Base</h2>
        <ul>
          <li>Couteau multifonction</li>
          <li>Hache de survie</li>
          <li>Pelle pliable</li>
          <li>Scie de poche</li>
        </ul>
      </div>

      <div class="card">
        <h2>🔧 Outils Techniques</h2>
        <ul>
          <li>Kit de réparation</li>
          <li>Outils multifonctions</li>
          <li>Cordage et sangles</li>
          <li>Matériel de fixation</li>
        </ul>
      </div>

      <div class="card">
        <h2>🔦 Éclairage</h2>
        <ul>
          <li>Lampe frontale</li>
          <li>Lampe torche</li>
          <li>Batteries de rechange</li>
          <li>Éclairage solaire</li>
        </ul>
      </div>

      <div class="card">
        <h2>⚡ Énergie</h2>
        <ul>
          <li>Batteries portables</li>
          <li>Panneaux solaires</li>
          <li>Chargeurs manuels</li>
          <li>Piles et accumulateurs</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Composant pour la page des outils
</script>

<style scoped>
.outils-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.hero-section {
  text-align: center;
  margin-bottom: 3rem;
  padding: 3rem 1rem;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/outils-bg.jpg');
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
  .outils-page {
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