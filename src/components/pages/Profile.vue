<template>
  <div class="profile-page">
    <div class="hero-section">
      <h1>Mon Profil</h1>
      <p class="subtitle">Gérez vos informations personnelles</p>
    </div>

    <div class="profile-container">
      <div class="profile-sidebar">
        <div class="profile-picture">
          <div class="avatar">👤</div>
          <button class="change-picture">Modifier</button>
        </div>
        
        <div class="member-info">
          <p class="member-since">Membre depuis: <span>{{ memberSince }}</span></p>
          <p class="status">Statut: <span :class="{ 'status-premium': status === 'Premium' }">{{ status }}</span></p>
        </div>
        
        <ul class="profile-nav">
          <li class="active">
            <span class="nav-icon">👤</span>
            <span>Informations personnelles</span>
          </li>
          <li>
            <span class="nav-icon">🔔</span>
            <span class="text-red-500">Notifications</span>
          </li>
          <li>
            <span class="nav-icon">📚</span>
            <span>Guides sauvegardés</span>
          </li>
          <li>
            <span class="nav-icon">💬</span>
            <span>Messages</span>
          </li>
          <li>
            <span class="nav-icon">🔑</span>
            <span>Sécurité</span>
          </li>
        </ul>
      </div>
      
      <div class="profile-content">
        <h2>Informations personnelles</h2>
        
        <form @submit.prevent="updateProfile">
          <div class="form-row">
            <div class="form-group">
              <label for="firstname">Prénom</label>
              <input 
                type="text" 
                id="firstname" 
                v-model="profileData.prenom" 
                placeholder="Votre prénom"
              >
            </div>
            <div class="form-group">
              <label for="lastname">Nom</label>
              <input 
                type="text" 
                id="lastname" 
                v-model="profileData.nom" 
                placeholder="Votre nom"
              >
            </div>
          </div>
          
          <div class="form-group">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email" 
              v-model="profileData.email" 
              placeholder="Votre adresse email"
              disabled
            >
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="country">Pays</label>
              <select id="country" v-model="profileData.pays">
                <option value="">Sélectionnez votre pays</option>
                <option value="FR">France</option>
                <option value="BE">Belgique</option>
                <option value="CH">Suisse</option>
                <option value="CA">Canada</option>
              </select>
            </div>
            <div class="form-group">
              <label for="city">Ville</label>
              <input 
                type="text" 
                id="city" 
                v-model="profileData.ville" 
                placeholder="Votre ville"
              >
            </div>
          </div>
          
          <div class="form-group">
            <label>Centres d'intérêt</label>
            <div class="interests-grid">
              <label class="interest-checkbox">
                <input type="checkbox" value="survie-sauvage" v-model="profileData.centresInteret">
                <span>Survie sauvage</span>
              </label>
              <label class="interest-checkbox">
                <input type="checkbox" value="survie-urbaine" v-model="profileData.centresInteret">
                <span>Survie urbaine</span>
              </label>
              <label class="interest-checkbox">
                <input type="checkbox" value="catastrophes" v-model="profileData.centresInteret">
                <span>Catastrophes naturelles</span>
              </label>
              <label class="interest-checkbox">
                <input type="checkbox" value="premiers-soins" v-model="profileData.centresInteret">
                <span>Premiers soins</span>
              </label>
              <label class="interest-checkbox">
                <input type="checkbox" value="equipement" v-model="profileData.centresInteret">
                <span>Équipement</span>
              </label>
              <label class="interest-checkbox">
                <input type="checkbox" value="alimentation" v-model="profileData.centresInteret">
                <span>Alimentation</span>
              </label>
            </div>
          </div>
          
          <div class="form-group bio-group">
            <label for="bio">Biographie</label>
            <textarea 
              id="bio" 
              v-model="profileData.bio" 
              placeholder="Parlez-nous de vous..."
              rows="4"
            ></textarea>
          </div>
          
          <div class="form-actions">
            <button type="submit" class="btn-save">Sauvegarder les modifications</button>
            <button type="button" class="btn-cancel">Annuler</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const profileData = ref({
  prenom: '',
  nom: '',
  email: '',
  pays: '',
  ville: '',
  centresInteret: [],
  bio: ''
});

const memberSince = ref('');
const status = ref('');

// Récupérer les données du profil
const fetchProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/connexion');
      return;
    }

    const response = await fetch('http://localhost:3000/api/users/profil', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération du profil');
    }

    const data = await response.json();
    profileData.value = {
      prenom: data.user.prenom,
      nom: data.user.nom,
      email: data.user.email,
      pays: data.user.pays,
      ville: data.user.ville,
      centresInteret: data.user.centresInteret || [],
      bio: data.user.bio || ''
    };

    // Calculer la date d'inscription
    const dateInscription = new Date(data.user.dateInscription);
    memberSince.value = dateInscription.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
    
    // Déterminer le statut
    status.value = data.user.isPremium ? 'Premium' : 'Standard';
  } catch (error) {
    console.error('Erreur:', error);
    // Rediriger vers la page de connexion en cas d'erreur
    router.push('/connexion');
  }
};

// Mettre à jour le profil
const updateProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/connexion');
      return;
    }

    const response = await fetch('http://localhost:3000/api/users/profil', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prenom: profileData.value.prenom,
        nom: profileData.value.nom,
        email: profileData.value.email,
        pays: profileData.value.pays,
        ville: profileData.value.ville,
        centresInteret: profileData.value.centresInteret,
        bio: profileData.value.bio
      })
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour du profil');
    }

    const data = await response.json();
    alert('Profil mis à jour avec succès!');
  } catch (error) {
    console.error('Erreur:', error);
    alert('Une erreur est survenue lors de la mise à jour du profil');
  }
};

// Charger les données du profil au montage du composant
onMounted(() => {
  fetchProfile();
});
</script>

<style scoped>
.profile-page {
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

.profile-container {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 2rem;
}

.profile-sidebar, .profile-content {
  background-color: var(--color-secondary);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.profile-picture {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
}

.avatar {
  width: 120px;
  height: 120px;
  background-color: var(--color-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  margin-bottom: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.change-picture {
  background-color: transparent;
  border: 1px solid var(--color-accent);
  color: var(--color-accent);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.change-picture:hover {
  background-color: var(--color-accent);
  color: var(--color-text);
}

.member-info {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.member-info p {
  margin: 0.5rem 0;
  font-size: 0.95rem;
}

.member-info span {
  font-weight: 500;
  color: var(--color-text);
}

.status-premium {
  color: var(--color-accent) !important;
  font-weight: 600 !important;
}

.profile-nav {
  list-style: none;
  padding: 0;
  margin: 0;
}

.profile-nav li {
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
}

.profile-nav li:hover {
  background-color: rgba(255, 255, 255, 0.05);
  transform: translateX(5px);
}

.profile-nav li.active {
  background-color: var(--color-primary);
  font-weight: 500;
}

.profile-nav .nav-icon {
  margin-right: 1rem;
  font-size: 1.2rem;
}

h2 {
  color: var(--color-accent);
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  border-bottom: 1px solid rgba(230, 126, 34, 0.3);
  padding-bottom: 0.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
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

input, select, textarea {
  width: 100%;
  padding: 0.8rem;
  background-color: var(--color-background);
  border: 1px solid var(--color-kaki);
  border-radius: 4px;
  color: var(--color-text);
  transition: border-color 0.3s ease;
}

input:focus, select:focus, textarea:focus {
  border-color: var(--color-accent);
  outline: none;
  box-shadow: 0 0 0 3px rgba(230, 126, 34, 0.2);
}

.interests-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
}

.interest-checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.interest-checkbox input {
  width: auto;
  margin-right: 0.5rem;
}

.bio-group {
  margin-bottom: 2rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
}

.btn-save, .btn-cancel {
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

.btn-cancel {
  background-color: transparent;
  color: var(--color-text);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn-cancel:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Media Queries pour le responsive */
@media (max-width: 1024px) {
  .profile-page {
    padding: 1.5rem;
  }
  
  .profile-container {
    grid-template-columns: 1fr;
  }
  
  .profile-sidebar {
    margin-bottom: 2rem;
  }
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
    gap: 0;
  }
  
  .hero-section {
    padding: 2rem 1rem;
  }
  
  .hero-section h1 {
    font-size: 2rem;
  }
}

@media (max-width: 576px) {
  .profile-page {
    padding: 1rem;
  }
  
  .profile-sidebar, .profile-content {
    padding: 1.5rem;
  }
  
  .hero-section h1 {
    font-size: 1.8rem;
  }
  
  .interests-grid {
    grid-template-columns: 1fr;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .btn-save, .btn-cancel {
    width: 100%;
  }
}
</style> 