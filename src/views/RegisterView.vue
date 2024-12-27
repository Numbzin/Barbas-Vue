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
              <form id="formPersonAdd" enctype="multipart/form-data">
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
                      @input="validateName"
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
                      @input="validateEmail"
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
                      @input="validatePassword"
                      placeholder="Digite sua senha"
                      required
                    />
                  </div>
                  <div class="form-text text-danger">{{ passwordMessage }}</div>
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
                      @input="validatePasswordMatch"
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
                    @click="handleSubmit"
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
import { addPerson } from "@/core/services/personRepository";
import { Person } from "@/core/domain/Person";

const person = ref(new Person());
const confPassword = ref("");

const nameMessage = ref("");
const telMessage = ref("");
const emailMessage = ref("");
const passwordMessage = ref("");
const confPasswordMessage = ref("");

const validateName = () => {
  const nameValue = person.value.name;
  const numberCount = (nameValue.match(/\d/g) || []).length;
  const onlyNumbers = /^\d+$/.test(nameValue);

  if (nameValue.trim() === "") {
    nameMessage.value = "Nome é obrigatório";
  } else if (nameValue.length < 4) {
    nameMessage.value = "O nome deve ter pelo menos 4 caracteres";
  } else if (onlyNumbers) {
    nameMessage.value = "O nome não pode conter apenas números";
  } else if (numberCount > 4) {
    nameMessage.value = "O nome não pode ter mais de 4 números";
  } else {
    nameMessage.value = "";
  }
};

const validateTel = () => {
  let value = person.value.telephone.replace(/\D/g, "");
  if (value.length <= 11) {
    if (value.length > 2) value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    if (value.length > 9) value = value.slice(0, 10) + "-" + value.slice(10);
    person.value.telephone = value;
  }
  const telPattern = /^\(\d{2}\)\s\d{5}-\d{4}$/;
  telMessage.value = telPattern.test(value)
    ? ""
    : "Formato de telefone inválido";
};

const validateEmail = () => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  emailMessage.value = emailPattern.test(person.value.email)
    ? ""
    : "Formato de email inválido";
};

const validatePassword = () => {
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  passwordMessage.value = passwordPattern.test(person.value.password)
    ? ""
    : "A senha deve conter ao menos 8 caracteres, maiúsculas, números e caracteres especiais";
};

const validatePasswordMatch = () => {
  confPasswordMessage.value =
    confPassword.value === person.value.password
      ? ""
      : "As senhas não coincidem";
};

const handleSubmit = async () => {
  validateName();
  validateTel();
  validateEmail();
  validatePassword();
  validatePasswordMatch();

  if (
    !nameMessage.value &&
    !telMessage.value &&
    !emailMessage.value &&
    !passwordMessage.value &&
    !confPasswordMessage.value
  ) {
    try {
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
      person.value = new Person();
      confPassword.value = "";
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
