
<script setup lang="ts">
import GameSquare from './GameSquare.vue';
import UserOptions from './UserOptions.vue';
import { Player } from '../models/Player';
import { IGame } from '../models/IGame';
import { ref,computed, onMounted } from 'vue';

const props = defineProps({
  players: {
    type: Array as () => Player[],
    default: () => [], 
  }
});

const gameSquares = ref<IGame[]>([]);

onMounted(() => {
  for (let i = 1; i <= 9; i++) {
    gameSquares.value.push({
      id: i,
      clicked: false,
      userSymbol: '',
    });
  }
});

const players = ref(props.players);
console.log(players.value);

const squareClicked = (id: number) => {
  const activePlayer = props.players.find((player) => player.active);
  console.log(activePlayer?.name, 'clicked on square', id );

  if (activePlayer) {
    gameSquares.value[id - 1].clicked = true;
    gameSquares.value[id - 1].userSymbol = activePlayer.userSymbol;

    props.players.forEach((player) => {
      player.active = !player.active;
    });
  }
}

console.log(gameSquares)

const activePlayerInfo = computed(() => {
  const isGameComplete = gameSquares.value.every((square) => square.clicked);
  if (isGameComplete) {
    console.log('game is over!');
    return 'GAME IS OVER, namn (symbol) won!';
  }
  const activePlayer = props.players.find((player) => player.active);
  if (activePlayer) {
    return `It's ${activePlayer.name} (${activePlayer.userSymbol}) turn!`;
  }
  return '';
});

const emit = defineEmits(['reset']);

const resetGame = () => {
  emit('reset');
};



</script>

<template>
  <section class="game">
    <h3 v-if="players.length !== 0"> {{ players[0].name }} vs {{ players[1].name }}</h3>
    <p v-html="activePlayerInfo"></p>
    <p class="winner-tag"></p>
    <div class="game-board">
      <GameSquare 
        v-for="gameSquare in gameSquares" 
        :id="gameSquare.id" 
        :key="gameSquare.id"
        :clicked="gameSquare.clicked"
        :userSymbol="gameSquare.userSymbol"
        @click="squareClicked(gameSquare.id)" 
      ></GameSquare>
    </div>
  </section>
  <UserOptions @reset="resetGame"  :players="players"></UserOptions>
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


</style>