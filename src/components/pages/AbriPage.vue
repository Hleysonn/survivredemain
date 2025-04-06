<template>
  <div class="abri-page">
    <div class="hero-section">
      <h1>Abri & Protection</h1>
      <p class="subtitle">Construire et aménager un abri de survie</p>
    </div>

    <div class="content-section">
      <div class="card">
        <h2>🏠 Types d'abris</h2>
        <ul>
          <li>Abris naturels</li>
          <li>Abris temporaires</li>
          <li>Abris semi-permanents</li>
          <li>Abris souterrains</li>
        </ul>
      </div>

      <div class="card">
        <h2>🛠️ Construction</h2>
        <ul>
          <li>Matériaux disponibles</li>
          <li>Techniques de base</li>
          <li>Outils nécessaires</li>
          <li>Sécurité structurelle</li>
        </ul>
      </div>

      <div class="card">
        <h2>🛡️ Protection</h2>
        <ul>
          <li>Isolation thermique</li>
          <li>Protection contre les intempéries</li>
          <li>Sécurité et défense</li>
          <li>Camouflage</li>
        </ul>
      </div>

      <div class="card">
        <h2>🏕️ Aménagement</h2>
        <ul>
          <li>Organisation de l'espace</li>
          <li>Stockage des provisions</li>
          <li>Installation du couchage</li>
          <li>Zone de cuisine</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Composant pour la page d'abri et protection
</script>

<style scoped>
.abri-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.hero-section {
  text-align: center;
  margin-bottom: 3rem;
  padding: 3rem 1rem;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/abri-bg.jpg');
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
  .abri-page {
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