
<script setup lang='ts'>
import GameSquare from './GameSquare.vue';
import UserOption from './UserOption.vue';
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

const activePlayerInfo = computed(() => {
  const isGameComplete = gameSquares.value.every((square) => square.clicked);
  if (isGameComplete) {
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
  gameSquares.value.forEach((square) => {
    square.clicked = false;
    square.userSymbol = '';
    isClicked.value = false;
    square.isDisabled = false;
  });
  gameSquares.value = [...gameSquares.value];
  isDisabled.value = false;
  isClicked.value = false;
  winnerMessage.value = '';
};

</script>

<template>
  <section class="game">
    <h3 v-if="players.length !== 0"> {{ players[0].name }} <span class="vs">vs</span> {{ players[1].name }}</h3>
    <p class="player-info" v-for="player in players" key="player.name">
      <p class="players"><span class="bold">{{player.name}}</span> is symbol  <span class="bold">{{player.userSymbol}}</span> and have  <span class="bold">{{player.points}} points</span>.</p>
    </p>
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
  <UserOption @reset="resetGame" @newGame="newGame" :players="players"></UserOption>
</template>
  
<style scoped>
  .game-board {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    max-width: 360px;
    margin: 0 auto;
  }

  h3 {
    font-size: 3rem;
    margin-bottom: 1rem;
    margin-top: 0;
  }

  p {
    margin-bottom: 2rem;
  }

  .players {
   margin: 0;
   line-height: 0.2;
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