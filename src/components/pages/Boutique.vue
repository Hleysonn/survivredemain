<template>
  <div class="boutique-page">
    <div class="hero-section">
      <h1>Boutique</h1>
      <p class="subtitle">Tout l'équipement nécessaire pour votre survie</p>
    </div>

    <div class="content-section">
      <div class="filters">
        <div class="search-bar">
          <input type="text" placeholder="Rechercher un produit..." v-model="searchQuery">
        </div>
        <div class="categories">
          <button 
            v-for="category in categories" 
            :key="category.id"
            :class="{ active: selectedCategory === category.id }"
            @click="selectCategory(category.id)"
          >
            {{ category.name }}
          </button>
        </div>
      </div>

      <div class="products-grid">
        <div class="product-card" v-for="product in filteredProducts" :key="product.id">
          <div class="product-image">
            <img :src="product.image" :alt="product.name">
          </div>
          <div class="product-info">
            <h3>{{ product.name }}</h3>
            <p class="price">{{ product.price }}€</p>
            <p class="description">{{ product.description }}</p>
            <button class="add-to-cart" @click="addToCart(product)">
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    </div>

    <button class="cart-toggle" @click="toggleCart">
      <span class="cart-icon">🛒</span>
      <span class="cart-count" v-if="cartItems.length > 0">{{ cartItems.length }}</span>
    </button>

    <Panier 
      :isOpen="isCartOpen"
      :items="cartItems"
      @close="toggleCart"
      @update-quantity="updateQuantity"
      @remove-item="removeFromCart"
      @checkout="checkout"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import Panier from '../Panier.vue';

const router = useRouter();

const searchQuery = ref('');
const selectedCategory = ref('all');
const isCartOpen = ref(false);
const cartItems = ref<Array<any>>([]);

const categories = [
  { id: 'all', name: 'Tous' },
  { id: 'survie', name: 'Survie' },
  { id: 'outils', name: 'Outils' },
  { id: 'alimentation', name: 'Alimentation' },
  { id: 'protection', name: 'Protection' },
  { id: 'communication', name: 'Communication' }
];

const products = [
  {
    id: 1,
    name: 'Kit de survie complet',
    price: 99.99,
    description: 'Kit de survie essentiel contenant tous les outils de base',
    image: '/images/products/kit-survie.jpg',
    category: 'survie'
  },
  {
    id: 2,
    name: 'Lampe torche tactique',
    price: 29.99,
    description: 'Lampe torche puissante avec mode SOS',
    image: '/images/products/lampe-torche.jpg',
    category: 'survie'
  },
  {
    id: 3,
    name: 'Filtre à eau portable',
    price: 49.99,
    description: 'Filtre à eau compact pour situations d\'urgence',
    image: '/images/products/filtre-eau.jpg',
    category: 'alimentation'
  }
];

const filteredProducts = computed(() => {
  return products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategory = selectedCategory.value === 'all' || product.category === selectedCategory.value;
    return matchesSearch && matchesCategory;
  });
});

const selectCategory = (categoryId: string) => {
  selectedCategory.value = categoryId;
};

const toggleCart = () => {
  isCartOpen.value = !isCartOpen.value;
};

const addToCart = (product: any) => {
  const existingItem = cartItems.value.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.value.push({
      ...product,
      quantity: 1
    });
  }
};

const updateQuantity = ({ id, quantity }: { id: number, quantity: number }) => {
  const item = cartItems.value.find(item => item.id === id);
  if (item) {
    item.quantity = quantity;
  }
};

const removeFromCart = (id: number) => {
  cartItems.value = cartItems.value.filter(item => item.id !== id);
};

const checkout = () => {
  isCartOpen.value = false;
  // Stocker les articles du panier dans le localStorage
  localStorage.setItem('cartItems', JSON.stringify(cartItems.value));
  // Rediriger vers la page de commande
  router.push('/commande');
};
</script>

<style scoped>
.boutique-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.hero-section {
  text-align: center;
  margin-bottom: 3rem;
  padding: 3rem 1rem;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/boutique-bg.jpg');
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

.filters {
  margin-bottom: 2rem;
}

.search-bar {
  margin-bottom: 1rem;
}

.search-bar input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid var(--color-kaki);
  border-radius: 4px;
  background-color: var(--color-secondary);
  color: var(--color-text);
}

.categories {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.categories button {
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-kaki);
  border-radius: 4px;
  background-color: var(--color-secondary);
  color: var(--color-text);
  cursor: pointer;
  transition: all 0.3s ease;
}

.categories button.active {
  background-color: var(--color-accent);
  border-color: var(--color-accent);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}

.product-card {
  background-color: var(--color-secondary);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image {
  height: 200px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  padding: 1.5rem;
}

.product-info h3 {
  color: var(--color-accent);
  margin-bottom: 0.5rem;
}

.price {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.description {
  color: var(--color-text);
  opacity: 0.8;
  margin-bottom: 1rem;
}

.add-to-cart {
  width: 100%;
  padding: 0.8rem;
  background-color: var(--color-primary);
  color: var(--color-text);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-to-cart:hover {
  background-color: var(--color-accent);
}

.cart-toggle {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--color-primary);
  border: none;
  color: var(--color-text);
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  z-index: 999;
}

.cart-toggle:hover {
  background-color: var(--color-accent);
  transform: scale(1.1);
}

.cart-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: var(--color-accent);
  color: var(--color-text);
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: bold;
}

@media (max-width: 768px) {
  .boutique-page {
    padding: 1rem;
  }

  .hero-section {
    padding: 2rem 1rem;
  }

  .hero-section h1 {
    font-size: 2rem;
  }

  .products-grid {
    grid-template-columns: 1fr;
  }

  .cart-toggle {
    bottom: 1rem;
    right: 1rem;
  }
}
</style> 