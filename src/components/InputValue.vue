<template>
  <div class="input-box">
    <input
      v-model="value"
      type="text"
      class="input-field"
      id="nameInput"
      @input="validateName"
      required
    />
    <label for="nameInput" class="label">Nome</label>
    <i class="fa-solid fa-user icon"></i>
    <div id="nameHelp" class="form-text text-danger">
      {{ nameMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
</script>

<style scoped></style>
