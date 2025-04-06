<template>
  <div class="commande-page">
    <div class="header">
      <button class="back-btn" @click="goBack">
        ← Retour à la boutique
      </button>
    </div>

    <div class="hero-section">
      <h1>Finaliser votre commande</h1>
      <p class="subtitle">Complétez vos informations pour finaliser l'achat</p>
    </div>

    <div class="commande-content">
      <div class="checkout-container">
        <div class="form-section">
          <h2>Informations de livraison</h2>
          <form @submit.prevent="submitOrder">
            <div class="form-group">
              <label for="nom">Nom complet</label>
              <input 
                type="text" 
                id="nom" 
                v-model="formData.nom" 
                required
                placeholder="Votre nom complet"
              >
            </div>

            <div class="form-group">
              <label for="email">Email</label>
              <input 
                type="email" 
                id="email" 
                v-model="formData.email" 
                required
                placeholder="Votre email"
              >
            </div>

            <div class="form-group">
              <label for="adresse">Adresse</label>
              <input 
                type="text" 
                id="adresse" 
                v-model="formData.adresse" 
                required
                placeholder="Votre adresse"
              >
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="codePostal">Code postal</label>
                <input 
                  type="text" 
                  id="codePostal" 
                  v-model="formData.codePostal" 
                  required
                  placeholder="Code postal"
                >
              </div>

              <div class="form-group">
                <label for="ville">Ville</label>
                <input 
                  type="text" 
                  id="ville" 
                  v-model="formData.ville" 
                  required
                  placeholder="Ville"
                >
              </div>
            </div>

            <div class="form-group">
              <label for="telephone">Téléphone</label>
              <input 
                type="tel" 
                id="telephone" 
                v-model="formData.telephone" 
                required
                placeholder="Votre numéro de téléphone"
              >
            </div>

            <div class="form-group">
              <label for="methodeLivraison">Mode de livraison</label>
              <div class="radio-options">
                <div v-for="option in livraisonOptions" :key="option.id" class="radio-option">
                  <input 
                    type="radio" 
                    :id="option.id" 
                    :value="option.id" 
                    v-model="formData.methodeLivraison"
                    name="methodeLivraison"
                  >
                  <label :for="option.id" class="radio-label">
                    <div>{{ option.label }}</div>
                    <div class="option-price">{{ option.prix }}</div>
                  </label>
                </div>
              </div>
            </div>

            <h2 class="section-title">Mode de paiement</h2>
            <div class="form-group">
              <div class="payment-options">
                <div v-for="option in paiementOptions" :key="option.id" class="payment-option" :class="{ 'selected': formData.methodePaiement === option.id }">
                  <input 
                    type="radio" 
                    :id="'payment-' + option.id" 
                    :value="option.id" 
                    v-model="formData.methodePaiement"
                    name="methodePaiement"
                  >
                  <label :for="'payment-' + option.id" class="payment-label">
                    <span class="payment-icon">{{ option.icon }}</span>
                    <span>{{ option.label }}</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div class="form-group">
              <label for="commentaires">Commentaires (optionnel)</label>
              <textarea 
                id="commentaires" 
                v-model="formData.commentaires" 
                placeholder="Ajoutez des instructions spéciales pour la livraison"
              ></textarea>
            </div>

            <div class="form-group">
              <label class="checkbox-label">
                <input 
                  type="checkbox" 
                  v-model="formData.conditions" 
                  required
                >
                J'accepte les conditions générales de vente
              </label>
            </div>

            <button type="submit" class="submit-btn" :disabled="!isFormValid">
              Confirmer et payer {{ total.toFixed(2) }}€
            </button>
          </form>
        </div>

        <div class="recap-section">
          <h2>Récapitulatif de la commande</h2>
          <div class="recap-items">
            <div v-for="item in cartItems" :key="item.id" class="recap-item">
              <div class="item-info">
                <h3>{{ item.name }}</h3>
                <p>{{ item.quantity }} x {{ item.price }}€</p>
              </div>
              <p class="item-total">{{ (item.price * item.quantity).toFixed(2) }}€</p>
            </div>
          </div>

          <div class="recap-total">
            <div class="total-row">
              <span>Sous-total</span>
              <span>{{ sousTotal.toFixed(2) }}€</span>
            </div>
            <div class="total-row">
              <span>Frais de livraison</span>
              <span>{{ fraisLivraison.toFixed(2) }}€</span>
            </div>
            <div class="total-row grand-total">
              <span>Total</span>
              <span>{{ total.toFixed(2) }}€</span>
            </div>
          </div>
          
          <div class="secure-payment">
            <div class="secure-icons">
              <span class="secure-icon">🔒</span>
              <span class="secure-icon">🛡️</span>
            </div>
            <p>Paiement 100% sécurisé</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const cartItems = ref<Array<any>>([]);

onMounted(() => {
  // Récupérer les articles du panier depuis le localStorage
  const storedItems = localStorage.getItem('cartItems');
  if (storedItems) {
    cartItems.value = JSON.parse(storedItems);
  }
});

const formData = ref({
  nom: '',
  email: '',
  adresse: '',
  codePostal: '',
  ville: '',
  telephone: '',
  commentaires: '',
  conditions: false,
  methodeLivraison: 'standard',
  methodePaiement: 'cb'
});

const isFormValid = computed(() => {
  return formData.value.nom &&
         formData.value.email &&
         formData.value.adresse &&
         formData.value.codePostal &&
         formData.value.ville &&
         formData.value.telephone &&
         formData.value.conditions;
});

const sousTotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0);
});

const fraisLivraison = computed(() => {
  switch(formData.value.methodeLivraison) {
    case 'express':
      return 9.99;
    case 'pointrelais':
      return 3.49;
    default: // standard
      return 4.99;
  }
});

const total = computed(() => {
  return sousTotal.value + fraisLivraison.value;
});

const goBack = () => {
  router.push('/boutique');
};

const livraisonOptions = [
  { id: 'standard', label: 'Livraison standard (3-5 jours ouvrés)', prix: '4.99€' },
  { id: 'express', label: 'Livraison express (1-2 jours ouvrés)', prix: '9.99€' },
  { id: 'pointrelais', label: 'Point relais (3-5 jours ouvrés)', prix: '3.49€' }
];

const paiementOptions = [
  { id: 'cb', label: 'Carte bancaire', icon: '💳' },
  { id: 'paypal', label: 'PayPal', icon: '🔄' },
  { id: 'virement', label: 'Virement bancaire', icon: '🏦' },
  { id: 'crypto', label: 'Cryptomonnaie', icon: '₿' }
];

const submitOrder = () => {
  // Ici, vous pourriez envoyer la commande à votre backend
  console.log('Commande soumise:', {
    ...formData.value,
    items: cartItems.value,
    total: total.value
  });
  
  // Vider le panier
  localStorage.removeItem('cartItems');
  // Rediriger vers la page de confirmation
  router.push('/confirmation');
};
</script>

<style scoped>
.commande-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.header {
  margin-bottom: 2rem;
}

.back-btn {
  background: none;
  border: none;
  color: var(--color-accent);
  font-size: 1.1rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background-color: rgba(230, 126, 34, 0.1);
}

.hero-section {
  text-align: center;
  margin-bottom: 3rem;
  padding: 3rem 1rem;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/commande-bg.jpg');
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

.checkout-container {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 2rem;
}

.form-section, .recap-section {
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

.section-title {
  margin-top: 2rem;
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

input, textarea {
  width: 100%;
  padding: 0.8rem;
  background-color: var(--color-background);
  border: 1px solid var(--color-kaki);
  border-radius: 4px;
  color: var(--color-text);
  transition: border-color 0.3s ease;
}

input:focus, textarea:focus {
  border-color: var(--color-accent);
  outline: none;
  box-shadow: 0 0 0 3px rgba(230, 126, 34, 0.2);
}

textarea {
  height: 100px;
  resize: vertical;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
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

.radio-options {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.radio-option {
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.radio-option:hover {
  background-color: rgba(0, 0, 0, 0.3);
}

.radio-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-left: 0.5rem;
  cursor: pointer;
}

.option-price {
  font-weight: bold;
  color: var(--color-accent);
}

.payment-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.payment-option {
  position: relative;
  background-color: rgba(0, 0, 0, 0.2);
  border: 2px solid transparent;
  padding: 1rem;
  border-radius: 6px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.payment-option.selected {
  border-color: var(--color-accent);
  background-color: rgba(230, 126, 34, 0.1);
}

.payment-option:hover {
  background-color: rgba(0, 0, 0, 0.3);
}

.payment-option input {
  position: absolute;
  opacity: 0;
}

.payment-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  width: 100%;
  text-align: center;
}

.payment-icon {
  font-size: 1.5rem;
  margin-bottom: 0.3rem;
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
  margin-top: 1.5rem;
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

.recap-section {
  height: fit-content;
  position: sticky;
  top: 2rem;
}

.recap-items {
  margin-bottom: 2rem;
  max-height: 300px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--color-accent) transparent;
}

.recap-items::-webkit-scrollbar {
  width: 4px;
}

.recap-items::-webkit-scrollbar-track {
  background: transparent;
}

.recap-items::-webkit-scrollbar-thumb {
  background-color: var(--color-accent);
  border-radius: 4px;
}

.recap-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.item-info h3 {
  color: var(--color-text);
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.item-info p {
  color: var(--color-text);
  opacity: 0.7;
  font-size: 0.9rem;
}

.item-total {
  color: var(--color-accent);
  font-weight: bold;
}

.recap-total {
  margin-top: 2rem;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 1rem;
  border-radius: 6px;
}

.total-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  color: var(--color-text);
}

.grand-total {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--color-accent);
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.secure-payment {
  margin-top: 2rem;
  text-align: center;
  padding: 1rem;
  border: 1px dashed rgba(255, 255, 255, 0.2);
  border-radius: 6px;
}

.secure-icons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.secure-icon {
  font-size: 1.5rem;
}

.secure-payment p {
  font-size: 0.9rem;
  color: var(--color-text);
  opacity: 0.8;
}

/* Media Queries pour le responsive */
@media (max-width: 1200px) {
  .commande-page {
    padding: 1.5rem;
  }
}

@media (max-width: 992px) {
  .commande-page {
    padding: 1rem;
  }
  
  .checkout-container {
    grid-template-columns: 1fr;
  }
  
  .hero-section {
    padding: 2rem 1rem;
  }
  
  .hero-section h1 {
    font-size: 2rem;
  }
  
  .recap-section {
    position: static;
    margin-top: 2rem;
  }
}

@media (max-width: 768px) {
  .commande-page {
    padding: 0.5rem;
  }
  
  .form-section, .recap-section {
    padding: 1.5rem;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .payment-options {
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
  .commande-page {
    padding: 0.25rem;
  }
  
  .form-section, .recap-section {
    padding: 1rem;
  }
  
  .hero-section {
    padding: 1.5rem 0.5rem;
  }
  
  .hero-section h1 {
    font-size: 1.5rem;
  }
  
  input, textarea {
    padding: 0.6rem;
  }
  
  .submit-btn {
    padding: 0.8rem;
  }
}
</style> 