<script setup>
import {ref, watch} from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['update:modelValue']);
const isVisible = ref(props.modelValue);

watch(props, (newProps) => {
  isVisible.value = newProps.modelValue;
});

watch(isVisible, (newValue) => {
  emit('update:modelValue', newValue);
});

function close() {
  isVisible.value = false;
}
</script>

<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="close">
    <div class="modal-container">
      <header class="modal-header container">
        <slot name="header">
          <h3>Default Title</h3>
        </slot>
        <button class="close-button" @click="close">&times;</button>
      </header>
      <section class="modal-body container">
        <slot name="body">
          Default body content.
        </slot>
      </section>
      <footer class="modal-footer container">
        <slot name="footer">
          <button @click="close">Close</button>
        </slot>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-container {
  background: #fff;
  margin: 1rem;
  border-radius: 0.75rem;
  width: 90%;
  max-width: 500px;
  position: relative;
}

.modal-header {
  background-color: var(--background-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.75rem 0.75rem 0 0;
  padding-bottom: 10px;
}

.close-button {
  background: transparent;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: white;
}

.modal-body {
  color: black;
}

.modal-footer {
  text-align: right;
}
</style>