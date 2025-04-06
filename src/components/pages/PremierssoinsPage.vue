<template>
  <div class="premiers-soins-page">
    <div class="hero-section">
      <h1>Premiers Soins</h1>
      <p class="subtitle">Les gestes essentiels pour faire face aux urgences médicales</p>
    </div>

    <div class="content-section">
      <div class="card">
        <h2>🩹 Kit de Premiers Secours</h2>
        <ul>
          <li>Contenu essentiel</li>
          <li>Organisation du kit</li>
          <li>Maintenance et renouvellement</li>
          <li>Adaptations selon les situations</li>
        </ul>
      </div>

      <div class="card">
        <h2>🚨 Urgences Vitales</h2>
        <ul>
          <li>Position latérale de sécurité</li>
          <li>Réanimation cardio-pulmonaire</li>
          <li>Hémorragies graves</li>
          <li>Étouffement</li>
        </ul>
      </div>

      <div class="card">
        <h2>🦴 Traumatismes</h2>
        <ul>
          <li>Fractures et entorses</li>
          <li>Plaies et coupures</li>
          <li>Brûlures</li>
          <li>Traumatismes crâniens</li>
        </ul>
      </div>

      <div class="card">
        <h2>🌡️ Autres Situations</h2>
        <ul>
          <li>Hypothermie et hyperthermie</li>
          <li>Morsures et piqûres</li>
          <li>Intoxications</li>
          <li>Allergies graves</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Composant pour la page de premiers soins
</script>

<style scoped>
.premiers-soins-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.hero-section {
  text-align: center;
  margin-bottom: 3rem;
  padding: 3rem 1rem;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/premiers-soins-bg.jpg');
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
  .premiers-soins-page {
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