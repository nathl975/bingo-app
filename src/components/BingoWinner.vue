<script setup>
import UIModal from "./UIModal.vue";
import {computed, ref} from "vue";
import bingoStore from "../store/bingoStore.js";

function verifyWin() {
  bingoStore.dispatch('resetGame')
  showModal.value = false
}

const letters = ref(["B", "I", "N", "G", "O"]);

// Définit les plages de chaque lettre
const range = {
  B: [1, 15],
  I: [16, 30],
  N: [31, 45],
  G: [46, 60],
  O: [61, 75],
};

const rows = computed(() => Array.from({ length: 15 }, (_, i) => i + 1));

const getNumber = (letter, row) => {
  const [min, max] = range[letter];
  const number = min + row - 1;
  if (bingoStore.getters.isNumberDrawn(number) && number <= max) {
    return number;
  }

  return "";
};

const showModal = ref(false);
</script>

<template>
  <button class="btn btn-outline" @click="showModal = true" :disabled="bingoStore.state.numbersDrawn.length < 24">Bingo !</button>
  <Transition>
    <UIModal v-model="showModal">
      <template #header>
        <h3>Vérification du vainqueur</h3>
      </template>

      <template #body>
        <h4>Numéros tirés :</h4>
        <table id="bingo-table">
          <thead>
          <tr>
            <th v-for="letter in letters" :key="letter">{{ letter }}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="row in rows" :key="row">
            <td v-for="(letter, index) in letters" :key="index">
              {{ getNumber(letter, row) }}
            </td>
          </tr>
          </tbody>
        </table>
      </template>

      <template #footer>
        <button class="btn" @click="verifyWin">C'est gagné !</button>
      </template>
    </UIModal>
  </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

#bingo-table {
  margin: auto;
  width: 90%;
  border-collapse: collapse;
  text-align: center;
  line-height: 2;
}
</style>
