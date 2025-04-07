<template>
  <div class="inscription-page">
    <div class="hero-section">
      <h1>Créer un compte</h1>
      <p class="subtitle">Rejoignez notre communauté pour accéder à du contenu exclusif</p>
    </div>

    <div class="form-container">
      <div class="form-section">
        <h2>Informations personnelles</h2>
        <form @submit.prevent="handleSubmit">
          <div class="form-row">
            <div class="form-group">
              <label for="prenom">Prénom</label>
              <input 
                type="text" 
                id="prenom" 
                v-model="formData.prenom" 
                required
                placeholder="Votre prénom"
              >
            </div>
            <div class="form-group">
              <label for="nom">Nom</label>
              <input 
                type="text" 
                id="nom" 
                v-model="formData.nom" 
                required
                placeholder="Votre nom"
              >
            </div>
          </div>

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

          <div class="form-row">
            <div class="form-group">
              <label for="ville">Ville</label>
              <input 
                type="text" 
                id="ville" 
                v-model="formData.ville" 
                required
                placeholder="Votre ville"
              >
            </div>
            <div class="form-group">
              <label for="pays">Pays</label>
              <select 
                id="pays" 
                v-model="formData.pays" 
                required
              >
                <option value="">Sélectionnez votre pays</option>
                <option value="FR">France</option>
                <option value="BE">Belgique</option>
                <option value="CH">Suisse</option>
                <option value="CA">Canada</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label for="password">Mot de passe</label>
            <div class="password-field">
              <input 
                :type="showPassword ? 'text' : 'password'" 
                id="password" 
                v-model="formData.password" 
                required
                placeholder="Créez un mot de passe sécurisé"
              >
              <span class="password-toggle" @click="togglePassword">
                {{ showPassword ? '👁️' : '👁️‍🗨️' }}
              </span>
            </div>
            <div class="password-strength" v-if="formData.password">
              <div class="strength-bar">
                <div class="strength-progress" :style="{ width: passwordStrength + '%', backgroundColor: strengthColor }"></div>
              </div>
              <span class="strength-text">{{ strengthText }}</span>
            </div>
          </div>

          <div class="form-group">
            <label for="confirmPassword">Confirmer le mot de passe</label>
            <div class="password-field">
              <input 
                :type="showConfirmPassword ? 'text' : 'password'" 
                id="confirmPassword" 
                v-model="formData.confirmPassword" 
                required
                placeholder="Confirmez votre mot de passe"
              >
              <span class="password-toggle" @click="toggleConfirmPassword">
                {{ showConfirmPassword ? '👁️' : '👁️‍🗨️' }}
              </span>
            </div>
            <p class="validation-message" v-if="passwordsMismatch">
              Les mots de passe ne correspondent pas
            </p>
          </div>

          <div class="form-group">
            <label class="checkbox-label">
              <input 
                type="checkbox" 
                v-model="formData.newsletter"
              >
              Recevoir notre newsletter et conseils de survie
            </label>
          </div>

          <div class="form-group">
            <label class="checkbox-label">
              <input 
                type="checkbox" 
                v-model="formData.terms" 
                required
              >
              J'accepte les <a href="#" class="terms-link">conditions générales d'utilisation</a>
            </label>
          </div>

          <button type="submit" class="submit-btn" :disabled="!isFormValid">
            Créer mon compte
          </button>
        </form>

        <div class="account-links">
          <p>Vous avez déjà un compte ? <router-link to="/connexion" class="link">Se connecter</router-link></p>
        </div>
      </div>

      <div class="benefits-section">
        <h2>Avantages membres</h2>
        
        <div class="benefit-card">
          <div class="benefit-icon">🔒</div>
          <div class="benefit-content">
            <h3>Contenu exclusif</h3>
            <p>Accédez à des guides, vidéos et fiches pratiques réservés aux membres.</p>
          </div>
        </div>
        
        <div class="benefit-card">
          <div class="benefit-icon">💬</div>
          <div class="benefit-content">
            <h3>Communauté</h3>
            <p>Échangez avec d'autres passionnés de survie et partagez vos expériences.</p>
          </div>
        </div>
        
        <div class="benefit-card">
          <div class="benefit-icon">🔔</div>
          <div class="benefit-content">
            <h3>Alertes personnalisées</h3>
            <p>Recevez des notifications sur les sujets qui vous intéressent.</p>
          </div>
        </div>
        
        <div class="benefit-card">
          <div class="benefit-icon">🏆</div>
          <div class="benefit-content">
            <h3>Formations certifiées</h3>
            <p>Suivez des parcours d'apprentissage et obtenez des certifications.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const formData = ref({
  prenom: '',
  nom: '',
  email: '',
  password: '',
  confirmPassword: '',
  ville: '',
  pays: '',
  newsletter: false,
  terms: false
});

const showPassword = ref(false);
const showConfirmPassword = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

const passwordsMismatch = computed(() => {
  return formData.value.password !== '' && 
         formData.value.confirmPassword !== '' && 
         formData.value.password !== formData.value.confirmPassword;
});

const passwordStrength = computed(() => {
  const password = formData.value.password;
  if (!password) return 0;
  
  let strength = 0;
  
  // Longueur minimum
  if (password.length >= 8) strength += 25;
  
  // Présence de lettres majuscules et minuscules
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
  
  // Présence de chiffres
  if (/\d/.test(password)) strength += 25;
  
  // Présence de caractères spéciaux
  if (/[^a-zA-Z0-9]/.test(password)) strength += 25;
  
  return strength;
});

const strengthColor = computed(() => {
  const strength = passwordStrength.value;
  if (strength < 25) return '#ff4d4d';  // Rouge
  if (strength < 50) return '#ffa64d';  // Orange
  if (strength < 75) return '#ffff4d';  // Jaune
  return '#4CAF50';                     // Vert
});

const strengthText = computed(() => {
  const strength = passwordStrength.value;
  if (strength < 25) return 'Très faible';
  if (strength < 50) return 'Faible';
  if (strength < 75) return 'Moyen';
  return 'Fort';
});

const isFormValid = computed(() => {
  return formData.value.prenom && 
         formData.value.nom && 
         formData.value.email && 
         formData.value.password &&
         formData.value.confirmPassword &&
         formData.value.ville &&
         formData.value.pays &&
         !passwordsMismatch.value &&
         formData.value.terms;
});

const handleSubmit = async () => {
  try {
    const userData = {
      nom: formData.value.nom,
      prenom: formData.value.prenom,
      email: formData.value.email,
      motDePasse: formData.value.password,
      ville: formData.value.ville,
      pays: formData.value.pays,
      centresInteret: [],
      categories: []
    };

    const response = await fetch('http://localhost:3000/api/users/inscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erreur lors de l\'inscription');
    }

    // Stocker le token et rediriger
    localStorage.setItem('token', data.token);
    localStorage.setItem('isLoggedIn', 'true');
    router.push('/profile');
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    // Ici, vous pouvez ajouter un message d'erreur à l'utilisateur
  }
};
</script>

<style scoped>
.inscription-page {
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
  grid-template-columns: 3fr 2fr;
  gap: 2rem;
}

.form-section, .benefits-section {
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

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
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

.password-strength {
  margin-top: 0.5rem;
}

.strength-bar {
  height: 5px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 5px;
}

.strength-progress {
  height: 100%;
  transition: width 0.3s ease, background-color 0.3s ease;
}

.strength-text {
  font-size: 0.8rem;
  color: var(--color-text);
  opacity: 0.8;
}

.validation-message {
  color: #ff4d4d;
  font-size: 0.9rem;
  margin-top: 0.5rem;
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

.terms-link {
  color: var(--color-accent);
  text-decoration: underline;
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
  margin-top: 1rem;
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

/* Styles pour la section des avantages */
.benefits-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.benefit-card {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 1.2rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.benefit-card:hover {
  background-color: rgba(74, 93, 35, 0.3);
  transform: translateY(-3px);
}

.benefit-icon {
  font-size: 2rem;
  color: var(--color-accent);
}

.benefit-content h3 {
  color: var(--color-text);
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.benefit-content p {
  color: var(--color-text);
  opacity: 0.8;
  font-size: 0.95rem;
  line-height: 1.4;
}

/* Media Queries pour le responsive */
@media (max-width: 1200px) {
  .inscription-page {
    padding: 1.5rem;
  }
}

@media (max-width: 992px) {
  .inscription-page {
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
  
  .benefits-section {
    margin-top: 2rem;
  }
}

@media (max-width: 768px) {
  .inscription-page {
    padding: 0.5rem;
  }
  
  .form-section, .benefits-section {
    padding: 1.5rem;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .hero-section h1 {
    font-size: 1.8rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
}

@media (max-width: 576px) {
  .inscription-page {
    padding: 0.25rem;
  }
  
  .form-section, .benefits-section {
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
  
  .benefit-card {
    padding: 1rem;
  }
}
</style> 