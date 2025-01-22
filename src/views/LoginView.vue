<template>
  <body>
    <div class="navbar-component" id="navbar-component"></div>
    <header></header>
    <div class="wrapper">
      <div class="login-box">
        <div class="login-header">
          <span>Login</span>
        </div>
        <div class="input-box">
          <input
            v-model="email"
            type="text"
            id="user"
            class="input-field"
            required
          />
          <label for="user" class="label">Usuário</label>
          <i class="fa-solid fa-user icon"></i>
        </div>
        <div class="input-box">
          <input
            v-model="senha"
            type="password"
            id="pass"
            class="input-field"
            required
          />
          <label for="pass" class="label">Senha</label>
          <i class="fa-solid fa-lock icon"></i>
        </div>
        <div class="remember-forgot">
          <div class="remember-me">
            <input type="checkbox" id="remember" />
            <label for="remember">Lembre de mim</label>
          </div>
          <div class="forgot">
            <a href="#">Esqueceu a senha?</a>
          </div>
        </div>
        <div class="input-box">
          <button type="submit" class="input-submit" @click="sendLoginEmail">
            Entrar
          </button>
        </div>
        <div class="register">
          <span
            >Não tem uma conta?
            <a class="register-link" href="/register">Registre-se</a></span
          >
        </div>
      </div>
    </div>
  </body>
</template>

<script setup lang="ts">
import { authService } from "@/core/services/auth.service";
import { ref } from "vue";

const email = ref("");
const senha = ref("");

function sendLoginEmail() {
  authService.loginEmail(email.value, senha.value);
}
authService;
</script>

<style scoped>
@import "../assets/styles/login.css";
</style>
