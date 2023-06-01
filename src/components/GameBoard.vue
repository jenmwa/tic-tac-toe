
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
  },
});

const players = ref(props.players);
console.log(players.value);

const gameSquares = ref<IGame[]>([]);

onMounted(() => {
  for (let i = 1; i <= 9; i++) {
    gameSquares.value.push({
      id: i,
      clicked: false,
      userSymbol: '',
      isDisabled: false,
    });
  }
});

const squareClicked = (id: number) => {
  const activePlayer = props.players.find((player) => player.active);
  console.log(activePlayer?.name, 'clicked on square', id );

  const gameSquare = gameSquares.value[id - 1];

  if (activePlayer && !gameSquare.clicked) {
    gameSquare.clicked = true;
    gameSquare.userSymbol = activePlayer.userSymbol;
    gameSquare.isDisabled = true; 

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
    //if there is a winner
    return 'GAME IS OVER, namn (symbol) won!';
    //else if there is oavgjort?
    //return 'PRETTY TIED UP? go again?';
  }

  const activePlayer = props.players.find((player) => player.active);
  if (activePlayer) {
    return `It's ${activePlayer.name} (${activePlayer.userSymbol}) turn!`;
  }
  return '';
});

const emit = defineEmits(['reset', 'newGame']);

const resetGame = () => {
  emit('reset');
};

const isDisabled = ref(false);
const isClicked = ref(false);

const newGame = () => {
  console.log('click start new Game from Gameboard-comp')
    gameSquares.value.forEach((square) => {
    square.clicked = false;
    square.userSymbol = '';
    isClicked.value = false;
  });
  console.log('isclicked is: ', isClicked.value)
  gameSquares.value = [...gameSquares.value];
  isDisabled.value = false;
  isClicked.value = false;
}

// from react
//facit är rutans id
// const calculateWinner = (gameSquare) => {
//   const lines = [
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, 9],
//     [1, 4, 7],
//     [2, 5, 8],
//     [3, 6, 9],
//     [1, 5, 9],
//     [3, 5, 7],
//   ];
//   for (let i = 0; i < lines.length; i++) {
//     const [a, b, c] = lines[i];
//     if (gameSquare[a] && gameSquare[a] === gameSquare[b] && gameSquare[a] === gameSquare[c]) {
//       return gameSquare[a];
//     }
//   }
//   return null;
// }


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
        :class="{ clicked: gameSquare.clicked }"
      ></GameSquare>
    </div>
  </section>
  <UserOptions  @reset="resetGame" @newGame="newGame" :players="players"></UserOptions>
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
    color: #1b1b1b;
    font-size: 4rem;
  }


</style>