<template>
  <div v-if="visible" class="modal" @click.self="closeModal">
    <div class="modal-content">
      <span class="close-btn" @click="closeModal">&times;</span>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ModalComponent",
  emits: ["close"],
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  setup(_, { emit }) {
    const closeModal = () => {
      emit("close");
    };

    return {
      closeModal,
    };
  },
});
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
}
</style>
