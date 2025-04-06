<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-section">
        <h3>SURVIVRE DEMAIN</h3>
        <p>Le site de référence pour la préparation aux catastrophes et la survie en situation d'urgence.</p>
      </div>
      
      <div class="footer-section">
        <h3>SUIVEZ-NOUS</h3>
        <div class="social-links">
          <a href="#" class="social-link">
            <span class="social-icon">📺</span> YouTube
          </a>
          <a href="#" class="social-link">
            <span class="social-icon">📱</span> Telegram
          </a>
          <a href="#" class="social-link">
            <span class="social-icon">💬</span> Discord
          </a>
        </div>
      </div>
      
      <div class="footer-section">
        <h3>NEWSLETTER</h3>
        <p>Recevez nos alertes, conseils et guides directement dans votre boîte mail.</p>
        <div class="newsletter-form">
          <input type="email" placeholder="Votre email" class="newsletter-input" />
          <button class="btn newsletter-btn">S'abonner</button>
        </div>
      </div>
      
      <div class="footer-section">
        <h3>RESSOURCES</h3>
        <ul class="footer-links">
          <li><a href="#" class="footer-link">Guide complet (PDF)</a></li>
          <li><a href="#" class="footer-link">Checklists d'urgence</a></li>
          <li><a href="#" class="footer-link">Fiches techniques</a></li>
        </ul>
      </div>
    </div>
    
    <div class="footer-bottom">
      <div class="footer-bottom-container">
        <div class="copyright">
          &copy; {{ new Date().getFullYear() }} Survivre Demain. Tous droits réservés.
        </div>
        <div class="legal-links">
          <a href="#" class="legal-link">Mentions légales</a>
          <a href="#" class="legal-link">Politique de confidentialité</a>
          <a href="#" class="legal-link">Contact</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Pas de logique supplémentaire nécessaire pour le footer
</script>

<style scoped>
.footer {
  background-color: var(--color-black);
  color: var(--color-text);
  font-family: 'Barlow Condensed', 'Roboto Condensed', sans-serif;
  border-top: 1px solid var(--color-secondary);
}

.footer-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.footer-section {
  flex: 1;
  min-width: 250px;
  margin-bottom: 2rem;
  padding: 0 1rem;
}

.footer-section h3 {
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
  color: var(--color-accent);
  position: relative;
}

.footer-section h3:after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -10px;
  width: 50px;
  height: 2px;
  background-color: var(--color-primary);
}

.footer-section p {
  font-size: 0.9rem;
  margin-bottom: 1rem;
  opacity: 0.8;
}

.social-links {
  display: flex;
  flex-direction: column;
}

.social-link {
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
  color: var(--color-text);
  transition: color 0.3s ease;
}

.social-link:hover {
  color: var(--color-accent);
}

.social-icon {
  margin-right: 0.5rem;
  font-size: 1.2rem;
}

.newsletter-form {
  display: flex;
  flex-direction: column;
}

.newsletter-input {
  padding: 0.75rem 1rem;
  background-color: rgba(0, 0, 0, 0.3);
  border: 1px solid var(--color-primary);
  color: var(--color-text);
  margin-bottom: 0.8rem;
  font-family: inherit;
}

.newsletter-btn {
  align-self: flex-start;
}

.footer-links {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin-bottom: 0.8rem;
}

.footer-link {
  color: var(--color-text);
  transition: color 0.3s ease;
  position: relative;
  padding-left: 1.2rem;
}

.footer-link:before {
  content: '→';
  position: absolute;
  left: 0;
  color: var(--color-accent);
}

.footer-link:hover {
  color: var(--color-accent);
}

.footer-bottom {
  background-color: rgba(0, 0, 0, 0.4);
  padding: 1.5rem 0;
  font-size: 0.85rem;
}

.footer-bottom-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.copyright {
  margin-bottom: 1rem;
  opacity: 0.7;
}

.legal-links {
  display: flex;
  gap: 1.5rem;
}

.legal-link {
  color: var(--color-text);
  opacity: 0.7;
  transition: all 0.3s ease;
}

.legal-link:hover {
  color: var(--color-accent);
  opacity: 1;
}

@media screen and (max-width: 768px) {
  .footer-container {
    flex-direction: column;
  }
  
  .footer-section {
    margin-bottom: 2.5rem;
  }
  
  .footer-bottom-container {
    flex-direction: column;
    text-align: center;
  }
  
  .legal-links {
    justify-content: center;
  }
}
</style> 