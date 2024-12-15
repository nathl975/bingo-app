<script setup>
import { computed } from 'vue';
import bingoStore from "../store/bingoStore.js";

const recentNumbers = computed(() => bingoStore.state.numbersDrawn.slice(-10).reverse());
</script>

<template>
  <div>
    <h2>Derniers numéros tirés</h2>
    <div class="numbers">
      <span v-for="number in recentNumbers" :key="number" class="number">
        {{ number }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.numbers {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.number {
  padding: 0.5rem;
  border: 2px solid white;
  background-color: white;
  color: #780000;
  border-radius: 50%;
  height: 24px;
  width: 24px;
  text-align: center;
  align-content: center;
}
</style>
