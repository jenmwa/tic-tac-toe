
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

  // props.players.forEach((player, index) => {
  // console.log(player.name);
// }
// )
;
  props.players.forEach((player) => {
    player.active = !player.active;
    console.log(player.name ,'(', player.userSymbol,') is active:', player.active)
  })
  //trigga class clicked
  //player.active toggla
}


// const toggleActiveUser = () => {
  // props.players.forEach((player) => {
  //   player.active = !player.active;
  //   console.log(player.name ,'(', player.userSymbol,') is active:', player.active)
  // })
// }

const activePlayerInfo = computed(() => {
  const activePlayer = props.players.find((player) => player.active);
  if (activePlayer) {
    return `It's ${activePlayer.name} (${activePlayer.userSymbol}) turn!`;
  }
  return '';
});
// const activePlayer = computed(() => {
//   return props.players.find(player => player.active) || null;
// });
const emit = defineEmits(['reset']);
//OM useractive
const resetGame = () => {
  console.log('remove player-list')
  // players.value = [];
  // console.log(players.value)
  emit('reset');
  // sessionStorage.removeItem('movies');
};

</script>

<template>
  <section class="game">
  <h3 v-if="players.length !== 0"> {{ players[0].name }} vs {{ players[1].name }}</h3>
  <p v-html="activePlayerInfo"></p>
  <!-- <p v-if="activePlayer">It's {{ activePlayerSymbol }} ( {{ activePlayerName }} ) turn:</p> -->
  <div class="game-board">
    <GameSquare v-for="index in 9" :id="index" :key="index" @click="squareClicked(index)" ></GameSquare>
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