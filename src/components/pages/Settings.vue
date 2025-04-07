<template>
  <div class="settings-page">
    <div class="hero-section">
      <h1>Paramètres</h1>
      <p class="subtitle">Personnalisez votre expérience sur Survivre Demain</p>
    </div>

    <div class="settings-container">
      <div class="settings-sidebar">
        <ul class="settings-nav">
          <li class="active">
            <span class="nav-icon">🔔</span>
            <span>Notifications</span>
          </li>
          <li>
            <span class="nav-icon">🔒</span>
            <span>Confidentialité</span>
          </li>
          <li>
            <span class="nav-icon">🔑</span>
            <span>Mot de passe</span>
          </li>
          <li>
            <span class="nav-icon">💻</span>
            <span>Apparence</span>
          </li>
          <li>
            <span class="nav-icon">🌐</span>
            <span>Langue</span>
          </li>
          <li>
            <span class="nav-icon">📱</span>
            <span>Applications connectées</span>
          </li>
          <li class="danger">
            <span class="nav-icon">⚠️</span>
            <span>Supprimer mon compte</span>
          </li>
        </ul>
      </div>
      
      <div class="settings-content">
        <section class="settings-section">
          <h2>Notifications</h2>
          <p class="section-description">Gérez comment et quand vous souhaitez être notifié</p>
          
          <div class="settings-group">
            <h3>Email</h3>
            
            <div class="setting-item">
              <div class="setting-info">
                <div class="setting-title">Newsletter mensuelle</div>
                <div class="setting-description">Recevez notre résumé mensuel des meilleurs articles et conseils</div>
              </div>
              <label class="toggle">
                <input type="checkbox" v-model="settings.newsletters.monthly">
                <span class="toggle-slider"></span>
              </label>
            </div>
            
            <div class="setting-item">
              <div class="setting-info">
                <div class="setting-title">Alertes importantes</div>
                <div class="setting-description">Soyez informé des alertes de sécurité et des informations critiques</div>
              </div>
              <label class="toggle">
                <input type="checkbox" v-model="settings.newsletters.alerts">
                <span class="toggle-slider"></span>
              </label>
            </div>
            
            <div class="setting-item">
              <div class="setting-info">
                <div class="setting-title">Offres promotionnelles</div>
                <div class="setting-description">Recevez des offres exclusives et des réductions sur notre boutique</div>
              </div>
              <label class="toggle">
                <input type="checkbox" v-model="settings.newsletters.promotions">
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
          
          <div class="settings-group">
            <h3>Notifications du site</h3>
            
            <div class="setting-item">
              <div class="setting-info">
                <div class="setting-title">Réponses aux commentaires</div>
                <div class="setting-description">Soyez notifié lorsque quelqu'un répond à vos commentaires</div>
              </div>
              <label class="toggle">
                <input type="checkbox" v-model="settings.siteNotifications.comments">
                <span class="toggle-slider"></span>
              </label>
            </div>
            
            <div class="setting-item">
              <div class="setting-info">
                <div class="setting-title">Nouveaux articles</div>
                <div class="setting-description">Recevez une notification lorsqu'un nouvel article est publié dans vos catégories favorites</div>
              </div>
              <label class="toggle">
                <input type="checkbox" v-model="settings.siteNotifications.newArticles">
                <span class="toggle-slider"></span>
              </label>
            </div>
            
            <div class="setting-item">
              <div class="setting-info">
                <div class="setting-title">Mises à jour de guides</div>
                <div class="setting-description">Soyez informé des mises à jour des guides que vous avez consultés</div>
              </div>
              <label class="toggle">
                <input type="checkbox" v-model="settings.siteNotifications.guideUpdates">
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
          
          <div class="settings-group">
            <h3>Méthodes de notification</h3>
            
            <div class="setting-item">
              <div class="setting-info">
                <div class="setting-title">Email</div>
                <div class="setting-description">Recevez les notifications par email</div>
              </div>
              <label class="toggle">
                <input type="checkbox" v-model="settings.notificationMethods.email">
                <span class="toggle-slider"></span>
              </label>
            </div>
            
            <div class="setting-item">
              <div class="setting-info">
                <div class="setting-title">Notifications sur le navigateur</div>
                <div class="setting-description">Recevez des notifications via votre navigateur</div>
              </div>
              <label class="toggle">
                <input type="checkbox" v-model="settings.notificationMethods.browser">
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
          
          <div class="settings-actions">
            <button class="btn-save" @click="saveSettings">Enregistrer les modifications</button>
            <button class="btn-reset" @click="resetSettings">Réinitialiser</button>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const settings = ref({
  newsletters: {
    monthly: true,
    alerts: true,
    promotions: false
  },
  siteNotifications: {
    comments: true,
    newArticles: true,
    guideUpdates: true
  },
  notificationMethods: {
    email: true,
    browser: false
  }
});

const saveSettings = () => {
  // Ici, vous pourriez appeler votre API pour sauvegarder les paramètres
  console.log('Sauvegarde des paramètres:', settings.value);
  
  // Simulation d'une sauvegarde réussie
  alert('Paramètres enregistrés avec succès!');
};

const resetSettings = () => {
  settings.value = {
    newsletters: {
      monthly: true,
      alerts: true,
      promotions: false
    },
    siteNotifications: {
      comments: true,
      newArticles: true,
      guideUpdates: true
    },
    notificationMethods: {
      email: true,
      browser: false
    }
  };
};
</script>

<style scoped>
.settings-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.hero-section {
  text-align: center;
  margin-bottom: 3rem;
  padding: 3rem 1rem;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.hero-section h1 {
  font-size: 2.5rem;
  color: var(--color-accent);
  margin-bottom: 1rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.subtitle {
  font-size: 1.2rem;
  color: var(--color-text);
  opacity: 0.9;
}

.settings-container {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 2rem;
}

.settings-sidebar, .settings-content {
  background-color: var(--color-secondary);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.settings-nav {
  list-style: none;
  padding: 0;
  margin: 0;
}

.settings-nav li {
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
}

.settings-nav li:hover {
  background-color: rgba(255, 255, 255, 0.05);
  transform: translateX(5px);
}

.settings-nav li.active {
  background-color: var(--color-primary);
  font-weight: 500;
}

.settings-nav .nav-icon {
  margin-right: 1rem;
  font-size: 1.2rem;
}

.settings-nav li.danger {
  color: #e74c3c;
}

.settings-nav li.danger:hover {
  background-color: rgba(231, 76, 60, 0.1);
}

h2 {
  color: var(--color-accent);
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  border-bottom: 1px solid rgba(230, 126, 34, 0.3);
  padding-bottom: 0.5rem;
}

.section-description {
  color: var(--color-text);
  opacity: 0.8;
  margin-bottom: 2rem;
}

.settings-group {
  margin-bottom: 2.5rem;
}

h3 {
  color: var(--color-text);
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-weight: 500;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.setting-item:last-child {
  border-bottom: none;
}

.setting-info {
  flex: 1;
}

.setting-title {
  font-weight: 500;
  color: var(--color-text);
  margin-bottom: 0.3rem;
}

.setting-description {
  font-size: 0.9rem;
  color: var(--color-text);
  opacity: 0.7;
}

/* Toggle switch */
.toggle {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
  margin-left: 1rem;
}

.toggle input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.2);
  transition: .4s;
  border-radius: 24px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .toggle-slider {
  background-color: var(--color-accent);
}

input:checked + .toggle-slider:before {
  transform: translateX(26px);
}

.settings-actions {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
}

.btn-save, .btn-reset {
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-save {
  background-color: var(--color-accent);
  color: white;
  border: none;
}

.btn-save:hover {
  background-color: #d35400;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.btn-reset {
  background-color: transparent;
  color: var(--color-text);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn-reset:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Media Queries pour le responsive */
@media (max-width: 1024px) {
  .settings-page {
    padding: 1.5rem;
  }
  
  .settings-container {
    grid-template-columns: 1fr;
  }
  
  .settings-sidebar {
    margin-bottom: 2rem;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 2rem 1rem;
  }
  
  .hero-section h1 {
    font-size: 2rem;
  }
  
  .setting-item {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .toggle {
    margin-left: 0;
    margin-top: 1rem;
  }
}

@media (max-width: 576px) {
  .settings-page {
    padding: 1rem;
  }
  
  .settings-sidebar, .settings-content {
    padding: 1.5rem;
  }
  
  .hero-section h1 {
    font-size: 1.8rem;
  }
  
  .settings-actions {
    flex-direction: column;
  }
  
  .btn-save, .btn-reset {
    width: 100%;
  }
}
</style> 