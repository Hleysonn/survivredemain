<template>
  <div class="eau-page">
    <div class="hero-section">
      <h1>Eau & Filtration</h1>
      <p class="subtitle">Gestion et purification de l'eau en situation de survie</p>
    </div>

    <div class="content-section">
      <div class="card">
        <h2>💧 Sources d'eau</h2>
        <ul>
          <li>Rivières et lacs</li>
          <li>Eau de pluie</li>
          <li>Sources naturelles</li>
          <li>Eau souterraine</li>
        </ul>
      </div>

      <div class="card">
        <h2>🔍 Filtration</h2>
        <ul>
          <li>Filtres portables</li>
          <li>Filtres à gravité</li>
          <li>Filtres à sable</li>
          <li>Filtres à charbon</li>
        </ul>
      </div>

      <div class="card">
        <h2>⚗️ Purification</h2>
        <ul>
          <li>Tablettes de purification</li>
          <li>Chlore et iode</li>
          <li>Ébullition</li>
          <li>Rayons UV</li>
        </ul>
      </div>

      <div class="card">
        <h2>📦 Stockage</h2>
        <ul>
          <li>Conteneurs adaptés</li>
          <li>Conservation à long terme</li>
          <li>Rotation des stocks</li>
          <li>Protection contre la contamination</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Composant pour la page d'eau et filtration
</script>

<style scoped>
.eau-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.hero-section {
  text-align: center;
  margin-bottom: 3rem;
  padding: 3rem 1rem;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/eau-bg.jpg');
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
  .eau-page {
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