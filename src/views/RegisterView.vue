<template>
  <div
    class="d-flex align-items-center justify-content-center"
    style="min-height: 100vh"
  >
    <div class="navbar-component" id="navbar-component"></div>

    <div class="container-form">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-5">
          <div class="card-add shadow-lg border-0">
            <div class="card-header bg-black text-center text-white">
              <h3 class="mb-0">Cadastro</h3>
            </div>
            <div class="card-body p-4 bg-main">
              <form action="#" id="formPersonAdd" enctype="multipart/form-data">
                <div class="mb-3">
                  <label for="nameInput" class="form-label">Nome</label>
                  <div class="input-group">
                    <span class="input-group-text bg-black text-white">
                      <i class="fas fa-user"></i>
                    </span>
                    <input
                      v-model="person.name"
                      type="text"
                      class="form-control"
                      id="nameInput"
                      @blur="validateName"
                      placeholder="Digite seu nome"
                      required
                    />
                  </div>
                  <div id="nameHelp" class="form-text text-danger">
                    {{ nameMessage }}
                  </div>
                </div>

                <div class="mb-3">
                  <label for="telInput" class="form-label">Telefone</label>
                  <div class="input-group">
                    <span class="input-group-text bg-black text-white">
                      <i class="fas fa-phone"></i>
                    </span>
                    <input
                      v-model="person.telephone"
                      type="tel"
                      class="form-control"
                      id="telInput"
                      @input="validateTel"
                      placeholder="Digite seu telefone"
                      required
                    />
                  </div>
                  <div id="telHelp" class="form-text text-danger">
                    {{ telMessage }}
                  </div>
                </div>

                <div class="mb-3">
                  <label for="emailInput" class="form-label">E-mail</label>
                  <div class="input-group">
                    <span class="input-group-text bg-black text-white">
                      <i class="fas fa-envelope"></i>
                    </span>
                    <input
                      v-model="person.email"
                      type="email"
                      class="form-control"
                      id="emailInput"
                      @keyup="validateEmail"
                      placeholder="Digite seu email"
                      required
                    />
                  </div>
                  <div id="emailHelp" class="form-text text-danger">
                    {{ emailMessage }}
                  </div>
                </div>

                <div class="mb-3">
                  <label for="passwordInput" class="form-label">Senha</label>
                  <div class="input-group">
                    <span class="input-group-text bg-black text-white">
                      <i class="fas fa-lock"></i>
                    </span>
                    <input
                      v-model="person.password"
                      type="password"
                      class="form-control"
                      id="passwordInput"
                      @keyup="validatePassword"
                      placeholder="Digite sua senha"
                      required
                    />
                  </div>
                  <div class="form-text text-danger">
                    {{ passwordMessage }}
                  </div>
                </div>

                <div class="mb-3">
                  <label for="confPasswordInput" class="form-label">
                    Confirme a senha
                  </label>
                  <div class="input-group">
                    <span class="input-group-text bg-black text-white">
                      <i class="fas fa-lock"></i>
                    </span>
                    <input
                      v-model="confPassword"
                      type="password"
                      class="form-control"
                      id="confPasswordInput"
                      @keyup="validatePasswordMatch"
                      placeholder="Confirme sua senha"
                      required
                    />
                  </div>
                  <div class="form-text text-danger">
                    {{ confPasswordMessage }}
                  </div>
                </div>

                <div class="mb-3">
                  <label for="photoInput" class="form-label">
                    Foto de perfil
                  </label>
                  <div class="input-group">
                    <span class="input-group-text bg-black text-white">
                      <i class="fas fa-camera"></i>
                    </span>
                    <input
                      type="file"
                      class="form-control"
                      id="photoInput"
                      accept="image/*"
                    />
                  </div>
                </div>

                <div class="d-flex gap-2">
                  <button type="reset" class="btn btn-custom w-50">
                    Cancelar
                  </button>
                  <button
                    type="button"
                    id="submitForm"
                    class="btn btn-custom w-50"
                  >
                    Enviar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Person } from "@/core/domain/Person";

const person = ref(new Person());
const name = ref("");
const nameMessage = ref("");
const email = ref("");
const emailMessage = ref("");
const tel = ref("");
const telMessage = ref("");
const password = ref("");
const passwordMessage = ref("");
const confPassword = ref("");
const confPasswordMessage = ref("");

// Funções de validação
const validateName = () => {
  const numberCount = (name.value.match(/\d/g) || []).length;
  const onlyNumbers = /^\d+$/.test(name.value);

  if (name.value.trim() === "") {
    nameMessage.value = "Nome é obrigatório";
  } else if (name.value.length < 3) {
    nameMessage.value = "O nome deve ter pelo menos 3 caracteres";
  } else if (onlyNumbers) {
    nameMessage.value = "O nome não pode conter apenas números";
  } else if (numberCount > 4) {
    nameMessage.value = "O nome não pode ter mais de 4 números";
  } else {
    nameMessage.value = "";
  }
};

const validateEmail = () => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (email.value.trim() === "") {
    emailMessage.value = "Email é obrigatório";
  } else if (!emailPattern.test(email.value)) {
    emailMessage.value = "Formato de email inválido";
  } else {
    emailMessage.value = "";
  }
};

const validateTel = () => {
  let value = tel.value.replace(/\D/g, "");

  if (value.length <= 11) {
    if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    }
    if (value.length > 9) {
      value = value.slice(0, 10) + "-" + value.slice(10);
    }
    tel.value = value;
  }

  const telPattern = /^\(\d{2}\)\s\d{5}-\d{4}$/;
  if (value.replace(/\D/g, "").length === 0) {
    telMessage.value = "Telefone é obrigatório";
  } else if (!telPattern.test(tel.value)) {
    telMessage.value = "Formato de telefone inválido";
  } else {
    telMessage.value = "";
  }
};

const validatePassword = () => {
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (password.value === "") {
    passwordMessage.value = "Senha é obrigatória";
  } else if (!passwordPattern.test(password.value)) {
    passwordMessage.value =
      "A senha deve conter pelo menos 8 caracteres, incluindo maiúsculas, minúsculas, números e caracteres especiais";
  } else {
    passwordMessage.value = "";
  }
};

const validatePasswordMatch = () => {
  if (confPassword.value === "") {
    confPasswordMessage.value = "Confirmação de senha é obrigatória";
  } else if (confPassword.value !== password.value) {
    confPasswordMessage.value = "As senhas não coincidem";
  } else {
    confPasswordMessage.value = "";
  }
};
</script>

<style scoped>
.box-form {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 85px;
  padding: 25px;
}

.container-form {
  width: 55vw;
}

form input {
  margin-bottom: 0;
}
@import "../assets/styles/person-add.css";
</style>
