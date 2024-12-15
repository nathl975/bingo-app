<script setup>
import {onMounted, ref} from 'vue';
import bingoStore from "../store/bingoStore.js";

const currentDisplayNumber = ref(null);
const isLocked = ref(false);

onMounted(() => {
  if (currentDisplayNumber?.value === null && !bingoStore.getters.hasNumbersDrawn) {
    generateBingoNumber();
  }
});

function generateBingoNumber() {
  if (isLocked.value) {
    return;
  }

  if (bingoStore.state.numbersDrawn.length >= 75) {
    alert('Tous les numéros ont été tirés!');
    return;
  }

  isLocked.value = true;

  const duration = Math.round((1 + Math.random()) * 500);
  const intervalTime = 50;

  let animationInterval = setInterval(() => {
    currentDisplayNumber.value = Math.floor(Math.random() * 75) + 1;
  }, intervalTime);

  setTimeout(() => {
    clearInterval(animationInterval);
    bingoStore.dispatch('drawNumber');
    currentDisplayNumber.value = bingoStore.getters.currentNumberWithLetter;
    isLocked.value = false;
  }, duration);
}
</script>

<template>
  <a id="bingo-number" @click="generateBingoNumber()">{{ currentDisplayNumber ?? bingoStore.getters.currentNumberWithLetter }}</a>
</template>

<style scoped>

</style>
