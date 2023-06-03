
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
const gameOver = ref(false);
let isDisabled = ref(false);
const isClicked = ref(false);
let winnerMessage = ref('');


onMounted(() => {
  for (let i = 0; i <= 8; i++) {
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

  const gameSquare = gameSquares.value[id];

  if (activePlayer && !gameSquare.clicked) {
    gameSquare.clicked = true;
    gameSquare.userSymbol = activePlayer.userSymbol;
    gameSquare.isDisabled = true; 

    props.players.forEach((player) => {
      player.active = !player.active;
    });

    const winner = calculateWinner();

    if (winner) {
      console.log('game is over!');
      gameOver.value = true;
      gameSquares.value.forEach((square) => {
        square.isDisabled = true;
      });
      winnerMessage.value = `${winner} is the winner of this game!`;
      console.log('Winner:', winner);

      calculateHighscores();
    } 
  }
}

console.log(gameSquares)

const activePlayerInfo = computed(() => {
  const isGameComplete = gameSquares.value.every((square) => square.clicked);
  if (isGameComplete) {
    console.log('game is over!');
    return 'Pretty tied up? Try again!';
  }

  const activePlayer = props.players.find((player) => player.active);
  if (activePlayer) {
    return `It's ${activePlayer.name} (${activePlayer.userSymbol}) turn!`;
  }
  return winnerMessage.value;
});

const calculateWinner = (): string | null => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
    
  for (const line of lines) {
    const [a, b, c] = line;
    const squareA = gameSquares.value[a];
    const squareB = gameSquares.value[b];
    const squareC = gameSquares.value[c];

    if (
      squareA.clicked &&
      squareA.userSymbol === squareB.userSymbol &&
      squareA.userSymbol === squareC.userSymbol
    ) {
      console.log(squareA.userSymbol, 'is the winner!')
      const winnerSymbol = squareA.userSymbol;
      return winnerSymbol;
    }
  }
  return null; 
};

const calculateHighscores = () => {
  const winnerSymbol = calculateWinner();

  if(winnerSymbol) {
    const winningPlayer = players.value.find((player) => player.userSymbol === winnerSymbol);
    console.log('hej från highscore')

    if(winningPlayer) {
      winningPlayer.points +=1;
      console.log(winningPlayer.name, winningPlayer.points)
      console.log(players)
    }
  }
}

const emit = defineEmits(['reset']);

const resetGame = () => {
  emit('reset');
};

const newGame = () => {
  console.log('click start new Game from Gameboard-comp')
    gameSquares.value.forEach((square) => {
    square.clicked = false;
    square.userSymbol = '';
    isClicked.value = false;
    square.isDisabled = false;
  });
  console.log('isclicked is: ', isClicked.value)
  gameSquares.value = [...gameSquares.value];
  isDisabled.value = false;
  isClicked.value = false;
  winnerMessage.value = '';
};

</script>

<template>
  <section class="game">
    <h3 v-if="players.length !== 0"> {{ players[0].name }} <span class="vs">vs</span> {{ players[1].name }}</h3>
    <p class="player-info">
      <span class="bold">{{players[0].name}}</span> is symbol  <span class="bold">{{players[0].userSymbol}}</span> and have  <span class="bold">{{players[0].points}} points</span>.<br>
      <span class="bold">{{players[1].name}}</span> is symbol  <span class="bold">{{players[1].userSymbol}}</span> and have  <span class="bold">{{players[1].points}} points</span>.</p>
    <p v-if="!winnerMessage" v-html="activePlayerInfo"></p>
    <p v-else class="winner-tag">{{ winnerMessage }}</p>
    <div class="game-board">
      <GameSquare 
        v-for="gameSquare in gameSquares" 
        :id="gameSquare.id" 
        :key="gameSquare.id"
        :clicked="gameSquare.clicked"
        :userSymbol="gameSquare.userSymbol"
        @click="squareClicked(gameSquare.id)"
        :class="{ clicked: gameSquare.clicked, winner: calculateWinner() === gameSquare.userSymbol }"
        :disabled="gameSquare.isDisabled"
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
    margin-bottom: 1rem;
  }

  .player-info {
    /** */
  }

  .bold {
    font-weight: bold;
  }
  .clicked {
    background-color: lightgreen;
    color: #1b1b1b;
    font-size: 4rem;
  }
  .vs {
    font-size: 1.5rem;
  }


</style>