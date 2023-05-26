
<script setup lang="ts">
import GameSquare from './GameSquare.vue';

const squareClicked = (index: number) => {
    console.log('clicked on square', index )
}

</script>

<template>
  <div class="game-board">
    <GameSquare v-for="index in 9" :id="index" :key="index" @click="squareClicked(index)"/>
  </div>
</template>
  
<style scoped>
  .game-board {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }

  .clicked {
    background-color: lightgreen;
  }
</style>