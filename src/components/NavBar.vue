<template>
  <nav
    ref="navbar"
    class="navbar img-nav navbar-expand-lg fixed-top"
    :class="{ opacity: isScrolled }"
  >
    <img
      class="navbar-toggler"
      src="../../public/images/nmb.jpeg"
      height="45"
      alt=""
    />
    <button
      class="navbar-toggler bg-yellow ms-auto"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse mx-auto" id="navbarNav">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <a class="nav-link" href="/#inicio">Inicio</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/#cortes">Cortes</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/#agendamento">Agendamento</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/#contato">Contato</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/#about">Sobre Nós</a>
        </li>
      </ul>
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="/login">Entrar</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const isScrolled = ref(false);

const navbar = ref<HTMLElement | null>(null);

const handleScroll = () => {
  if (navbar.value) {
    console.log("ScrollY:", window.scrollY);
    isScrolled.value = window.scrollY > 0;
    console.log("isScrolled:", isScrolled.value);
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: var(--bg-color);
}

.navbar.opacity {
  background: rgba(0, 0, 0, 0.767);
  backdrop-filter: blur(10px);
  transition: backdrop-filter 0.3s ease;
}

.navbar-nav {
  list-style: none;
  display: flex;
  gap: 10px;
}

.navbar-nav li {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.navbar-nav li::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: 6px;
  width: 100%;
  height: 2px;
  background-color: var(--main-color);
  border-radius: 4px;
  scale: 0 1;
  transform-origin: left;
  transition: scale 0.35s;
}

.navbar-nav li:hover::before {
  scale: 1;
}

.navbar-nav li a {
  color: var(--main-color);
}

.nav-item a {
  display: flex;
  justify-content: center;
  align-items: center;
}

.navbar-toggler {
  border-style: none;
}

.nav-link:hover {
  transition: 0.46s;
  color: var(--text-color);
}

.nav-item a:active {
  color: #fff;
}

.navbar-expand-lg {
  padding: 9px;
}

.mx-auto {
  max-width: 1350px;
}
</style>
