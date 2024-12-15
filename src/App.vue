<script setup>
import BingoNumber from "./components/BingoNumber.vue";
import BingoHistory from "./components/BingoHistory.vue";
import BingoWinner from "./components/BingoWinner.vue";
import bingoStore from "./store/bingoStore.js";

</script>

<template>
  <div id="app-container">
    <div class="justify-center">
      <template v-if="bingoStore.getters.isGameStarted">
        <BingoNumber/>
      </template>
      <template v-else>
        <a id="bingo-number" @click="bingoStore.dispatch('startGame')">Go !</a>
      </template>
    </div>
    <div id="test">
      <div class="justify-between">
        <BingoHistory/>
        <div class="mt-4">
          <BingoWinner/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
