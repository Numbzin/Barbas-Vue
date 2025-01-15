<template>
  <div class="wrapper">
    <div class="login-box">
      <div class="login-header">
        <span>Cadastro</span>
      </div>
      <form id="formPersonAdd" enctype="multipart/form-data">
        <div v-if="currentStep === 1" class="form-step">
          <InputValue
            v-model="person.name"
            label="Nome"
            id="nameInput"
            icon="user"
            :error-message="nameMessage"
            @input="validateName"
          />

          <InputValue
            v-model="person.telephone"
            type="tel"
            label="Telefone"
            id="telInput"
            icon="phone"
            :error-message="telMessage"
            @input="validateTel"
          />

          <InputValue
            v-model="person.email"
            type="email"
            label="E-mail"
            id="emailInput"
            icon="email"
            :error-message="emailMessage"
            @input="validateEmail"
          />

          <div class="submit-form">
            <button type="reset" @click="resetForm" class="input-submit">
              Cancelar
            </button>
            <button type="button" @click="nextStep" class="input-submit">
              Próximo
            </button>
          </div>
        </div>

        <div v-if="currentStep === 2" class="form-step">
          <InputValue
            v-model="person.password"
            type="password"
            label="Senha"
            id="passwordInput"
            icon="password"
            :error-message="passwordMessage"
            @input="validatePassword"
          />

          <InputValue
            v-model="confPassword"
            type="password"
            label="Confirme a senha"
            id="confPasswordInput"
            icon="password"
            :error-message="confPasswordMessage"
            @input="validatePasswordMatch"
          />

          <div class="input-box">
            <div class="file-input-wrapper">
              <input
                type="file"
                class="input-field file-input"
                id="photoInput"
                accept="image/*"
                @change="handleFileChange"
              />
              <label for="photoInput" class="file-label">
                <i class="fa-solid fa-camera icon"></i>
                <span class="file-text">Escolher arquivo</span>
              </label>
              <span class="file-name" v-if="selectedFile">
                {{ selectedFile.name }}
              </span>
            </div>
          </div>

          <div class="submit-form">
            <button type="button" @click="previousStep" class="input-submit">
              Voltar
            </button>
            <button type="button" @click="handleSubmit" class="input-submit">
              Enviar
            </button>
          </div>
        </div>

        <div class="step-indicator">
          <div class="step" :class="{ active: currentStep === 1 }"></div>
          <div class="step" :class="{ active: currentStep === 2 }"></div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Person } from "@/core/domain/Person";
import { addPerson } from "@/core/services/personRepository";
import InputValue from "../components/InputValue.vue";
import {
  validateName as validateNameUtil,
  validateTelephone,
  validateEmail as validateEmailUtil,
  validatePassword as validatePasswordUtil,
  validatePasswordMatch as validatePasswordMatchUtil,
} from "../core/utils/validator";

const currentStep = ref(1);
const person = ref(new Person());
const confPassword = ref("");
const selectedFile = ref<File | null>(null);

const nameMessage = ref("");
const telMessage = ref("");
const emailMessage = ref("");
const passwordMessage = ref("");
const confPasswordMessage = ref("");

const validateName = () => {
  nameMessage.value = validateNameUtil(person.value.name);
};

const validateTel = () => {
  const { formattedValue, error } = validateTelephone(person.value.telephone);
  person.value.telephone = formattedValue;
  telMessage.value = error;
};

const validateEmail = () => {
  emailMessage.value = validateEmailUtil(person.value.email);
};

const validatePassword = () => {
  passwordMessage.value = validatePasswordUtil(person.value.password);
};

const validatePasswordMatch = () => {
  confPasswordMessage.value = validatePasswordMatchUtil(
    person.value.password,
    confPassword.value
  );
};

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    selectedFile.value = input.files[0];
  }
};

const nextStep = () => {
  validateName();
  validateTel();
  validateEmail();

  if (!nameMessage.value && !telMessage.value && !emailMessage.value) {
    currentStep.value = 2;
  }
};

const previousStep = () => {
  currentStep.value = 1;
};

const resetForm = () => {
  person.value = new Person();
  confPassword.value = "";
  selectedFile.value = null;
  currentStep.value = 1;

  nameMessage.value = "";
  telMessage.value = "";
  emailMessage.value = "";
  passwordMessage.value = "";
  confPasswordMessage.value = "";
};

const handleSubmit = async () => {
  validatePassword();
  validatePasswordMatch();

  if (!passwordMessage.value && !confPasswordMessage.value) {
    try {
      const formData = new FormData();
      if (selectedFile.value) {
        formData.append("photo", selectedFile.value);
      }

      await addPerson({
        name: person.value.name,
        telephone: person.value.telephone,
        email: person.value.email,
        password: person.value.password,
        typePerson: "Pessoa Física",
        typeAccess: "Usuário",
        isActive: true,
      });

      alert("Cadastro realizado com sucesso!");
      resetForm();
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert("Erro ao cadastrar: " + error.message);
      } else {
        alert("Erro desconhecido ao cadastrar.");
      }
    }
  }
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
  background-color: rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
}

.login-box {
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 0 20px;
  backdrop-filter: blur(25px);
  border: 2px solid var(--bg-color);
  border-radius: 15px;
  padding: 7.5em 2.5em 4em 2.5em;
  color: var(--text-color);
  box-shadow: 0px 0px 10px var(--bg-color);
}

.login-header {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-color);
  width: 140px;
  height: 70px;
  border-radius: 0 0 20px 20px;
}

.login-header span {
  font-size: 30px;
  color: var(--text-color);
}

.login-header::before,
.login-header::after {
  content: "";
  position: absolute;
  top: 0;
  width: 30px;
  z-index: -1;
  height: 30px;
  background: transparent;
}

.login-header::before {
  left: -30px;
  z-index: -1;
  border-top-right-radius: 50%;
  box-shadow: 15px 0 0 0 var(--bg-color);
}

.login-header::after {
  right: -30px;
  border-top-left-radius: 50%;
  box-shadow: -15px 0 0 0 var(--bg-color);
}

.input-box {
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 20px 0;
}

.input-field {
  width: 100%;
  height: 55px;
  font-size: 16px;
  background: transparent;
  color: var(--bg-color);
  padding: 0 20px;
  border: 2px solid var(--bg-color);
  border-radius: 30px;
  outline: none;
  transition: border-color 0.3s, transform 0.2s;
}

.input-field:focus {
  border-color: var(--text-color);
  transform: scale(1.02);
}

.label {
  position: absolute;
  top: 15px;
  left: 20px;
  transition: 0.2s;
  color: var(--bg-color);
}

.input-field:focus ~ .label,
.input-field:valid ~ .label {
  top: -10px;
  left: 20px;
  font-size: 14px;
  background-color: var(--bg-color);
  color: var(--text-color);
  padding: 0 10px;
  border-radius: 30px;
}

.icon {
  position: absolute;
  top: 18px;
  right: 25px;
  font-size: 20px;
  color: var(--bg-color);
}

.file-input-wrapper {
  position: relative;
  width: 100%;
}

.file-input {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  z-index: 2;
}

.file-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 55px;
  padding: 0 20px;
  background: transparent;
  border: 2px solid var(--bg-color);
  border-radius: 30px;
  color: var(--bg-color);
  cursor: pointer;
  transition: all 0.3s ease;
}

.file-label:hover {
  border-color: var(--text-color);
  transform: scale(1.02);
}

.file-label .icon {
  position: static;
  margin-right: 0;
}

.file-text {
  font-size: 16px;
  order: 1;
  color: #000;
}

.file-label .icon {
  order: 2;
}

.file-name {
  display: block;
  margin-top: 8px;
  margin-left: 20px;
  font-size: 14px;
  color: var(--bg-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(100% - 40px);
}

.input-submit {
  background: var(--bg-color);
  color: var(--text-color);
  border: none;
  border-radius: 30px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.input-submit:hover {
  background: var(--text-color);
  color: var(--bg-color);
}

.form-text.text-danger {
  font-size: 14px;
  color: #dc3545;
  margin-top: 5px;
  margin-left: 20px;
}

.submit-form {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 20px;
}

.step-indicator {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.step {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid black;
  background-color: rgba(var(--bg-color-rgb), 0.3);
  transition: background-color 0.3s ease;
}

.step.active {
  background-color: var(--bg-color);
}

.form-step {
  animation: fadeIn 0.3s ease-in-out;
}

body {
  background: linear-gradient(135deg, var(--main-color), var(--bg-color));
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(100px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 480px) {
  .login-box {
    margin: 0 25px;
    padding: 4.5em 2.5em 4em 1.5em;
  }

  .input-submit {
    width: 100%;
  }
}
</style>
