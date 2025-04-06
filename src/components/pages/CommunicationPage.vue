<template>
  <div class="communication-page">
    <div class="hero-section">
      <h1>Communication</h1>
      <p class="subtitle">Restez connecté en situation de crise</p>
    </div>

    <div class="content-section">
      <div class="card">
        <h2>📡 Communication Radio</h2>
        <ul>
          <li>Radio à manivelle</li>
          <li>Talkie-walkie</li>
          <li>Radio CB</li>
          <li>Radio amateur (HAM)</li>
        </ul>
      </div>

      <div class="card">
        <h2>📱 Communication Mobile</h2>
        <ul>
          <li>Téléphone satellite</li>
          <li>Téléphone portable de secours</li>
          <li>Batteries externes</li>
          <li>Cartes SIM internationales</li>
        </ul>
      </div>

      <div class="card">
        <h2>🔊 Signalisation</h2>
        <ul>
          <li>Sifflet de détresse</li>
          <li>Miroir de signalisation</li>
          <li>Fusées de détresse</li>
          <li>Lampes de signalisation</li>
        </ul>
      </div>

      <div class="card">
        <h2>📝 Documentation</h2>
        <ul>
          <li>Codes et fréquences</li>
          <li>Cartes de communication</li>
          <li>Protocoles d'urgence</li>
          <li>Contacts importants</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Composant pour la page de communication
</script>

<style scoped>
.communication-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.hero-section {
  text-align: center;
  margin-bottom: 3rem;
  padding: 3rem 1rem;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/communication-bg.jpg');
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
  .communication-page {
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