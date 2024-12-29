<template>
  <div>
    <header id="inicio" class="header">
      <div class="overlay"></div>
      <div class="header-content container">
        <div class="text-section">
          <h1>Barber's <span>Cut's</span></h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div class="image-placeholder">
          <img src="images/nmb.jpeg" alt="" />
        </div>
      </div>
    </header>

    <!-- TODO: Adicionar os cards (JSON) -->

    <section id="cortes" class="cortes">
      <h2 class="heading">Cor<span class="heading-cortes">tes</span></h2>
      <div id="container-cards" class="container-cards">
        <CardService />
      </div>
    </section>

    <section id="agendamento" class="agendamento-section">
      <div class="agendamento-content">
        <h1>Agende Seu Corte</h1>
        <p>
          Preencha o formulário abaixo para agendar seu corte de cabelo. Estamos
          aqui para atender você da melhor maneira possível!
        </p>
        <button class="agendar-btn" @click="openModal">Agendar Agora</button>
      </div>
      <div class="agendamento-image">
        <img src="images/nmb.jpeg" alt="Agendamento" class="agendamento-img" />
      </div>
    </section>

    <ModalComponent :visible="showModal" @close="closeModal">
      <form @submit.prevent="submitForm">
        <h2>Formulário de Agendamento</h2>
        <label for="nome">Nome:</label>
        <input type="text" id="nome" v-model="form.nome" required />
        <label for="telefone">Telefone:</label>
        <input
          type="tel"
          id="telefone"
          v-model="form.telefone"
          placeholder="(XX) XXXXX-XXXX"
          required
        />
        <label for="data">Data:</label>
        <input type="date" id="data" v-model="form.data" required />
        <label for="hora">Hora:</label>
        <input type="time" id="hora" v-model="form.hora" required />
        <button type="submit" class="submit-btn">Enviar</button>
      </form>
    </ModalComponent>
  </div>

  <section id="contato" class="contact-section container">
    <h2 class="heading-custom heading">
      Nos <span class="heading-map">Contate</span>
    </h2>
    <div class="contact">
      <div class="contact-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14700.966763688606!2d-43.551622949999995!3d-22.9044546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sbr!4v1727395062625!5m2!1spt-BR!2sbr"
          width="98%"
          height="300"
          style="border: 0"
          allowfullscreen="false"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
        <div>
          <p>
            <b>Rua Barbas Cortadas, 789, Campo Grande</b>
          </p>
          <p>Tel: <span class="bold numberPhone">21 5555-55555</span></p>
        </div>
      </div>

      <div class="contact-form">
        <form>
          <div class="form-group">
            <input
              type="text"
              name="nome"
              id="nome"
              placeholder="Nome"
              required
            />
          </div>

          <div class="form-group">
            <input
              type="text"
              name="email"
              id="email"
              placeholder="E-mail ou telefone"
              required
            />
          </div>

          <div class="form-group">
            <select name="assunto" aria-placeholder="Assunto">
              <option disabled selected>Assunto</option>
              <option value="contato">Contato</option>
              <option value="reclame">Reclamação</option>
              <option value="sugent">Sugestão</option>
            </select>
          </div>

          <div class="form-group">
            <textarea
              name="mensagem"
              id="mensagem"
              rows="5"
              placeholder="Mensagem"
              required
            ></textarea>
          </div>

          <div class="form-group right">
            <button class="formButton">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  </section>

  <footer class="footer">
    <div class="social">
      <a href="#" target="_blank" aria-label="#"
        ><i class="fa-brands fa-x-twitter"></i
      ></a>
      <a href="#" target="_blank" aria-label="#"
        ><i class="fa-brands fa-instagram"></i
      ></a>
    </div>
    <ul class="list">
      <li class=""><a href="#cortes">Cortes</a></li>
      <li class=""><a href="#agendamento">Agendamento</a></li>
      <li class=""><a href="#contato">Contato</a></li>
      <li class=""><a href="/login.html">Login</a></li>
    </ul>
    <p class="copy">&copy; Barber's Cut's | All Rights Reserved.</p>
  </footer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CardService from "@/components/CardService.vue";
import ModalComponent from "@/components/ModalComponent.vue";

const showModal = ref(false);
const form = ref({
  nome: "",
  telefone: "",
  data: "",
  hora: "",
});

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const submitForm = () => {
  console.log("Dados do formulário:", form.value);
  closeModal();
};
</script>

<style scoped>
@import "@/assets/styles/home.css";
</style>
