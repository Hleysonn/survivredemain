<template>
  <div class="connexion-page">
    <div class="hero-section">
      <h1>Connexion</h1>
      <p class="subtitle">Accédez à votre espace personnel</p>
    </div>

    <div class="form-container">
      <div class="form-section">
        <h2>Se connecter</h2>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email" 
              v-model="formData.email" 
              required
              placeholder="Votre adresse email"
            >
          </div>

          <div class="form-group">
            <label for="password">Mot de passe</label>
            <div class="password-field">
              <input 
                :type="showPassword ? 'text' : 'password'" 
                id="password" 
                v-model="formData.motDePasse" 
                required
                placeholder="Votre mot de passe"
              >
              <span class="password-toggle" @click="togglePassword">
                {{ showPassword ? '👁️' : '👁️‍🗨️' }}
              </span>
            </div>
          </div>

          <div class="form-options">
            <label class="checkbox-label">
              <input 
                type="checkbox" 
                v-model="formData.remember"
              >
              Se souvenir de moi
            </label>
            <a href="#" class="forgot-link">Mot de passe oublié ?</a>
          </div>

          <button type="submit" class="submit-btn" :disabled="!isFormValid">
            Se connecter
          </button>

          <div class="divider">
            <span>ou</span>
          </div>

          <button type="button" class="social-btn google-btn">
            <span class="social-icon">🌐</span>
            Continuer avec Google
          </button>

          <button type="button" class="social-btn facebook-btn">
            <span class="social-icon">👤</span>
            Continuer avec Facebook
          </button>
        </form>

        <div class="account-links">
          <p>Pas encore de compte ? <router-link to="/inscription" class="link">S'inscrire</router-link></p>
        </div>
      </div>

      <div class="info-section">
        <h2>Pourquoi se connecter ?</h2>
        
        <div class="info-card">
          <div class="info-header">
            <div class="info-icon">📝</div>
            <h3>Sauvegardez vos guides</h3>
          </div>
          <p>Marquez vos guides préférés et retrouvez-les facilement dans votre espace personnel.</p>
        </div>

        <div class="info-card">
          <div class="info-header">
            <div class="info-icon">🔔</div>
            <h3>Recevez des alertes</h3>
          </div>
          <p>Soyez informé des dernières actualités et mises à jour de nos guides de survie.</p>
        </div>

        <div class="info-card">
          <div class="info-header">
            <div class="info-icon">💬</div>
            <h3>Participez à la communauté</h3>
          </div>
          <p>Commentez et partagez vos expériences avec d'autres membres passionnés.</p>
        </div>

        <div class="security-note">
          <div class="security-icon">🔒</div>
          <p>Toutes vos données sont cryptées et sécurisées. Nous ne partageons jamais vos informations personnelles.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import { authService } from '../../services/authService';

const router = useRouter();
const authStore = useAuthStore();

const formData = ref({
  email: '',
  motDePasse: '',
  remember: false
});

const showPassword = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const isFormValid = computed(() => {
  return formData.value.email && formData.value.motDePasse;
});

const handleLogin = async () => {
  try {
    const data = await authService.login(formData.value.email, formData.value.motDePasse);
    
    console.log('Réponse complète du serveur:', JSON.stringify(data, null, 2));
    
    if (!data.user || !data.token) {
      throw new Error('Données de connexion invalides');
    }
    
    // Mettre à jour le store avec le token et les informations utilisateur
    const userData = {
      _id: data.user.id,
      nom: data.user.nom,
      prenom: data.user.prenom,
      email: data.user.email
    };
    
    console.log('Données utilisateur à stocker:', userData);
    
    authStore.login(data.token, userData);
    
    console.log('État du store après connexion:', {
      user: authStore.user,
      isLoggedIn: authStore.isLoggedIn,
      isAuthenticated: authStore.isAuthenticated,
      token: authStore.token
    });
    
    router.push('/profile');
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    alert('Email ou mot de passe incorrect');
  }
};
</script>

<style scoped>
.connexion-page {
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

.form-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.form-section, .info-section {
  background-color: var(--color-secondary);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

h2 {
  color: var(--color-accent);
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  border-bottom: 1px solid rgba(230, 126, 34, 0.3);
  padding-bottom: 0.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--color-text);
  font-weight: 500;
}

input {
  width: 100%;
  padding: 0.8rem;
  background-color: var(--color-background);
  border: 1px solid var(--color-kaki);
  border-radius: 4px;
  color: var(--color-text);
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: var(--color-accent);
  outline: none;
  box-shadow: 0 0 0 3px rgba(230, 126, 34, 0.2);
}

.password-field {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  user-select: none;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.checkbox-label input {
  width: auto;
}

.forgot-link {
  color: var(--color-accent);
  text-decoration: underline;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.forgot-link:hover {
  color: #f39c12;
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background-color: var(--color-primary);
  color: var(--color-text);
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.1rem;
  letter-spacing: 0.5px;
}

.submit-btn:hover:not(:disabled) {
  background-color: var(--color-accent);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.divider {
  position: relative;
  text-align: center;
  margin: 2rem 0;
}

.divider::before, .divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 45%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.1);
}

.divider::before {
  left: 0;
}

.divider::after {
  right: 0;
}

.divider span {
  background-color: var(--color-secondary);
  padding: 0 1rem;
  font-size: 0.9rem;
  color: var(--color-text);
  opacity: 0.7;
}

.social-btn {
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  color: var(--color-text);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.google-btn {
  background-color: rgba(255, 255, 255, 0.1);
}

.facebook-btn {
  background-color: #1877f2;
}

.social-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.social-icon {
  font-size: 1.3rem;
}

.account-links {
  text-align: center;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.link {
  color: var(--color-accent);
  text-decoration: underline;
  transition: color 0.3s ease;
}

.link:hover {
  color: #f39c12;
}

/* Styles pour la section d'information */
.info-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-card {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 1.2rem;
  transition: transform 0.3s ease;
}

.info-card:hover {
  transform: translateY(-3px);
  background-color: rgba(74, 93, 35, 0.2);
}

.info-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.8rem;
}

.info-icon {
  font-size: 1.5rem;
  color: var(--color-accent);
}

.info-header h3 {
  color: var(--color-text);
  font-size: 1.1rem;
  margin: 0;
}

.info-card p {
  color: var(--color-text);
  opacity: 0.8;
  font-size: 0.95rem;
  line-height: 1.4;
}

.security-note {
  margin-top: auto;
  background-color: rgba(74, 93, 35, 0.1);
  border-radius: 8px;
  padding: 1.2rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.security-icon {
  font-size: 1.5rem;
  color: var(--color-accent);
}

.security-note p {
  color: var(--color-text);
  opacity: 0.9;
  font-size: 0.9rem;
  line-height: 1.4;
  margin: 0;
}

/* Media Queries pour le responsive */
@media (max-width: 1200px) {
  .connexion-page {
    padding: 1.5rem;
  }
}

@media (max-width: 992px) {
  .connexion-page {
    padding: 1rem;
  }
  
  .form-container {
    grid-template-columns: 1fr;
  }
  
  .hero-section {
    padding: 2rem 1rem;
  }
  
  .hero-section h1 {
    font-size: 2rem;
  }
  
  .info-section {
    margin-top: 2rem;
  }
}

@media (max-width: 768px) {
  .connexion-page {
    padding: 0.5rem;
  }
  
  .form-section, .info-section {
    padding: 1.5rem;
  }
  
  .hero-section h1 {
    font-size: 1.8rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
  
  .form-options {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
  }
  
  .forgot-link {
    align-self: flex-end;
  }
}

@media (max-width: 576px) {
  .connexion-page {
    padding: 0.25rem;
  }
  
  .form-section, .info-section {
    padding: 1rem;
  }
  
  .hero-section {
    padding: 1.5rem 0.5rem;
  }
  
  .hero-section h1 {
    font-size: 1.5rem;
  }
  
  input {
    padding: 0.6rem;
  }
  
  .submit-btn {
    padding: 0.8rem;
  }
}
</style> 