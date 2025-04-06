<template>
  <div class="panier-container" :class="{ 'active': isOpen }">
    <div class="panier-header">
      <h2>Panier</h2>
      <button class="close-btn" @click="$emit('close')">×</button>
    </div>
    
    <div class="panier-content">
      <div v-if="items.length === 0" class="empty-cart">
        <p>Votre panier est vide</p>
      </div>
      
      <div v-else class="cart-items">
        <div v-for="item in items" :key="item.id" class="cart-item">
          <div class="item-image">
            <img :src="item.image" :alt="item.name">
          </div>
          <div class="item-details">
            <h3>{{ item.name }}</h3>
            <p class="price">{{ item.price }}€</p>
            <div class="quantity-controls">
              <button @click="decreaseQuantity(item)">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="increaseQuantity(item)">+</button>
            </div>
          </div>
          <button class="remove-item" @click="removeItem(item)">×</button>
        </div>
      </div>
    </div>
    
    <div class="panier-footer" v-if="items.length > 0">
      <div class="total">
        <span>Total :</span>
        <span class="total-price">{{ total }}€</span>
      </div>
      <button class="checkout-btn" @click="checkout">
        Passer la commande
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  items: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['close', 'update-quantity', 'remove-item', 'checkout']);

const total = computed(() => {
  return props.items.reduce((sum, item: any) => sum + (item.price * item.quantity), 0);
});

const increaseQuantity = (item: any) => {
  emit('update-quantity', { id: item.id, quantity: item.quantity + 1 });
};

const decreaseQuantity = (item: any) => {
  if (item.quantity > 1) {
    emit('update-quantity', { id: item.id, quantity: item.quantity - 1 });
  }
};

const removeItem = (item: any) => {
  emit('remove-item', item.id);
};

const checkout = () => {
  emit('checkout');
};
</script>

<style scoped>
.panier-container {
  position: fixed;
  top: 0;
  right: 0;
  width: 350px;
  height: 100vh;
  background-color: var(--color-secondary);
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.3);
  transform: translateX(100%);
  transition: transform 0.3s ease;
  z-index: 1000;
}

.panier-container.active {
  transform: translateX(0);
}

.panier-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.panier-header h2 {
  color: var(--color-accent);
  font-size: 1.5rem;
}

.close-btn {
  background: none;
  border: none;
  color: var(--color-text);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
}

.panier-content {
  height: calc(100vh - 150px);
  overflow-y: auto;
  padding: 1rem;
}

.empty-cart {
  text-align: center;
  padding: 2rem;
  color: var(--color-text);
  opacity: 0.7;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
}

.item-image {
  width: 60px;
  height: 60px;
  border-radius: 4px;
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  flex: 1;
}

.item-details h3 {
  color: var(--color-text);
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.price {
  color: var(--color-accent);
  font-weight: bold;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.quantity-controls button {
  background-color: var(--color-primary);
  border: none;
  color: var(--color-text);
  width: 24px;
  height: 24px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-controls button:hover {
  background-color: var(--color-accent);
}

.remove-item {
  background: none;
  border: none;
  color: var(--color-text);
  font-size: 1.2rem;
  cursor: pointer;
  opacity: 0.7;
  padding: 0.5rem;
}

.remove-item:hover {
  opacity: 1;
}

.panier-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background-color: var(--color-secondary);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.total {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: var(--color-text);
}

.total-price {
  color: var(--color-accent);
  font-weight: bold;
}

.checkout-btn {
  width: 100%;
  padding: 1rem;
  background-color: var(--color-primary);
  color: var(--color-text);
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.checkout-btn:hover {
  background-color: var(--color-accent);
}

@media (max-width: 768px) {
  .panier-container {
    width: 100%;
  }
}
</style> 