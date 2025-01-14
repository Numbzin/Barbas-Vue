<template>
  <div class="input-box">
    <input
      :value="modelValue"
      :type="type"
      class="input-field"
      :id="id"
      @input="handleInput"
      required
    />
    <label :for="id" class="label">{{ label }}</label>
    <i :class="['fa-solid', iconClass, 'icon']"></i>
    <div v-if="errorMessage" class="form-text text-danger">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
  },
  id: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  errorMessage: {
    type: String,
    default: "",
  },
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "input", value: string): void;
}>();

const iconClass = computed(() => {
  const iconMap: Record<string, string> = {
    user: "fa-user",
    phone: "fa-phone",
    email: "fa-envelope",
    password: "fa-lock",
    camera: "fa-camera",
  };
  return iconMap[props.icon] || props.icon;
});

const handleInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  emit("update:modelValue", value);
  emit("input", value);
};
</script>

<style scoped>
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
  border-color: (var(--bg-color));
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

.form-text.text-danger {
  font-size: 14px;
  color: #dc3545;
  margin-top: 5px;
  margin-left: 20px;
}
</style>
