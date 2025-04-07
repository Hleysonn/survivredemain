<template>
  <div class="risk-map-container">
    <div class="map-controls">
      <div class="filters">
        <h3>Filtres</h3>
        <div class="filter-group">
          <label v-for="(layer, index) in riskLayers" :key="index">
            <input 
              type="checkbox" 
              v-model="layer.visible"
              @change="toggleLayer(layer)"
            >
            <span class="filter-icon">{{ layer.icon }}</span>
            {{ layer.name }}
          </label>
        </div>
      </div>
    </div>
    <div id="map" class="map"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Types pour les couches de risque
interface RiskLayer {
  name: string;
  icon: string;
  visible: boolean;
  layer: L.LayerGroup;
}

// Référence pour la carte
let map: L.Map | null = null;

// Couches de risque
const riskLayers = ref<RiskLayer[]>([
  {
    name: 'Zones sismiques',
    icon: '🌍',
    visible: true,
    layer: L.layerGroup()
  },
  {
    name: 'Zones d\'inondation',
    icon: '🌊',
    visible: true,
    layer: L.layerGroup()
  },
  {
    name: 'Zones de feux de forêt',
    icon: '🔥',
    visible: true,
    layer: L.layerGroup()
  },
  {
    name: 'Zones volcaniques',
    icon: '🌋',
    visible: true,
    layer: L.layerGroup()
  },
  {
    name: 'Zones de tempêtes',
    icon: '🌪️',
    visible: true,
    layer: L.layerGroup()
  }
]);

// Initialisation de la carte
onMounted(() => {
  // Création de la carte
  map = L.map('map').setView([46.603354, 1.888334], 6); // Centré sur la France

  // Ajout du fond de carte
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Ajout des couches de risque
  riskLayers.value.forEach(layer => {
    layer.layer.addTo(map!);
  });

  // Exemple de données (à remplacer par des données réelles)
  addSampleData();
});

// Fonction pour basculer la visibilité des couches
const toggleLayer = (layer: RiskLayer) => {
  if (layer.visible) {
    layer.layer.addTo(map!);
  } else {
    layer.layer.remove();
  }
};

// Fonction pour ajouter des données d'exemple
const addSampleData = () => {
  // Exemple de zones sismiques
  const seismicZones = [
    { lat: 44.8378, lng: -0.5792, name: 'Bordeaux' },
    { lat: 43.2965, lng: 5.3698, name: 'Marseille' },
    { lat: 48.8566, lng: 2.3522, name: 'Paris' }
  ];

  seismicZones.forEach(zone => {
    L.circle([zone.lat, zone.lng], {
      color: '#ff0000',
      fillColor: '#ff0000',
      fillOpacity: 0.2,
      radius: 50000
    })
    .bindPopup(`Zone sismique: ${zone.name}`)
    .addTo(riskLayers.value[0].layer);
  });

  // Exemple de zones d'inondation
  const floodZones = [
    { lat: 45.7640, lng: 4.8357, name: 'Lyon' },
    { lat: 43.6047, lng: 1.4442, name: 'Toulouse' },
    { lat: 48.1173, lng: -1.6778, name: 'Rennes' }
  ];

  floodZones.forEach(zone => {
    L.circle([zone.lat, zone.lng], {
      color: '#0000ff',
      fillColor: '#0000ff',
      fillOpacity: 0.2,
      radius: 40000
    })
    .bindPopup(`Zone d'inondation: ${zone.name}`)
    .addTo(riskLayers.value[1].layer);
  });
};
</script>

<style scoped>
.risk-map-container {
  display: flex;
  height: calc(100vh - 60px);
  width: 100%;
}

.map-controls {
  width: 280px;
  background-color: var(--color-black);
  padding: 1rem;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.filters {
  color: var(--color-text);
}

.filters h3 {
  margin-bottom: 1rem;
  color: var(--color-accent);
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-group label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.filter-group label:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.filter-icon {
  font-size: 1.2rem;
}

.map {
  flex: 1;
  height: 100%;
}

/* Style pour les marqueurs de la carte */
:deep(.leaflet-popup-content) {
  color: var(--color-text);
  font-family: 'Barlow Condensed', sans-serif;
}

:deep(.leaflet-popup-content-wrapper) {
  background-color: var(--color-black);
  border-radius: 4px;
}

:deep(.leaflet-popup-tip) {
  background-color: var(--color-black);
}

/* Version mobile */
@media screen and (max-width: 768px) {
  .risk-map-container {
    flex-direction: column;
  }

  .map-controls {
    width: 100%;
    height: auto;
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .map {
    height: calc(100vh - 200px);
  }
}
</style> 