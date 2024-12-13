<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4" v-for="service in services" :key="service.titulo">
        <div class="card">
          <img :src="service.imgSrc" alt="" class="card-image" />
          <div class="card-content">
            <h3 class="card-title">{{ service.titulo }}</h3>
            <p class="card-description">{{ service.descricao }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import serviceData from "@/core/mocks/service.json";
import { ref } from "vue";
const services = ref(serviceData);
</script>

<style scoped>
.container {
  max-width: 950px;
}

.card {
  width: 250px;
  height: 300px;
  margin: 15px;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  border: 2px solid black;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.card:hover {
  transform: scale(1);
  opacity: 1;
}

.card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: filter 0.3s ease;
}

.card:hover img {
  filter: blur(3px);
}

.card-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  color: var(--text-color);
  padding: 20px;
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.card:hover .card-content {
  opacity: 1;
}

.card-title {
  font-size: 1.5em;
  margin-bottom: 10px;
  color: var(--main-color);
}

.card-description {
  font-size: 0.9em;
}
</style>
