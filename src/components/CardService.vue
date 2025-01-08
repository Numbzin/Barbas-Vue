<template>
  <div class="container">
    <div class="cards-grid">
      <div
        class="card-wrapper"
        v-for="service in services"
        :key="service.titulo"
      >
        <div class="card">
          <div class="card-inner">
            <div class="card-front">
              <img :src="service.imgSrc" alt="" class="card-image" />
            </div>
            <div class="card-content">
              <div class="card-border">
                <h3 class="card-title">{{ service.titulo }}</h3>
                <div class="divider">
                  <span class="razor"></span>
                </div>
                <p class="card-description">{{ service.descricao }}</p>
              </div>
            </div>
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
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  justify-items: center;
}

.card-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}

.card {
  width: 280px;
  height: 350px;
  perspective: 1000px;
  background: transparent;
  border: none;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  cursor: pointer;
}

.card:hover .card-inner {
  transform: rotateY(180deg);
}

.card-front,
.card-content {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 8px;
  overflow: hidden;
}

.card-front {
  background: #1a1a1a;
  border: 3px solid #c59d5f;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-content {
  background: #1a1a1a;
  transform: rotateY(180deg);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border: 3px solid #c59d5f;
}

.card-border {
  border: 2px solid #c59d5f;
  padding: 15px;
  margin: 10px;
  height: calc(100% - 20px);
  width: calc(100% - 20px);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card-title {
  color: #c59d5f;
  font-family: "Times New Roman", serif;
  font-size: 1.4em;
  text-transform: uppercase;
  margin-bottom: 15px;
  letter-spacing: 2px;
}

.divider {
  position: relative;
  height: 30px;
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.razor {
  position: relative;
  width: 40px;
  height: 2px;
  background: #c59d5f;
  display: inline-block;
}

.razor::before,
.razor::after {
  content: "";
  position: absolute;
  width: 8px;
  height: 8px;
  background: #c59d5f;
  border-radius: 50%;
  top: 50%;
  transform: translateY(-50%);
}

.razor::before {
  left: -10px;
}

.razor::after {
  right: -10px;
}

.card-description {
  color: #ffffff;
  font-size: 1em;
  line-height: 1.6;
  margin-top: 15px;
}

@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
  }

  .card {
    width: 250px;
    height: 320px;
  }
}
</style>
