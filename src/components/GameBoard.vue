
<script setup lang="ts">
import GameSquare from './GameSquare.vue';
import UserOptions from './UserOptions.vue';
import { Player } from '../models/Player';
import { ref,computed } from 'vue';


const activePlayerName = ref('');
const activePlayerSymbol = ref('');

const props = defineProps({
  players: {
    type: Array as () => Player[],
    default: () => [], 
  }
});

const players = ref(props.players);
console.log(players.value);

const squareClicked = (index: number) => {
  console.log('clicked on square', index );
;
  props.players.forEach((player) => {
    player.active = !player.active;
    console.log(player.name ,'(', player.userSymbol,') is active:', player.active)
  })
}

const activePlayerInfo = computed(() => {
  const activePlayer = props.players.find((player) => player.active);
  if (activePlayer) {
    return `It's ${activePlayer.name} (${activePlayer.userSymbol}) turn!`;
  }
  return '';
});

const emit = defineEmits(['reset']);

const resetGame = () => {
  console.log('remove player-list')
  emit('reset');
};

</script>

<template>
  <section class="game">
  <h3 v-if="players.length !== 0"> {{ players[0].name }} vs {{ players[1].name }}</h3>
  <p v-html="activePlayerInfo"></p>
  <!-- <p v-if="activePlayer">It's {{ activePlayerSymbol }} ( {{ activePlayerName }} ) turn:</p> -->
  <div class="game-board">
    <GameSquare v-for="index in 9" :id="index" :key="index" @click="squareClicked(index)" :squareClicked="squareClicked" ></GameSquare>
  </div>
</section>
  <UserOptions @reset="resetGame" :players="players"></UserOptions>
</template>
  
<style scoped>
  .game-board {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }

  h3 {
    font-size: 3rem;
  }

  .clicked {
    background-color: lightgreen;
  }
</style>