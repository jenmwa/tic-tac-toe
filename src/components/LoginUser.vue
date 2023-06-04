<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Player } from '../models/Player'
import GameBoard from './GameBoard.vue';
import gameImg from '/public/game.svg';


const playerName = ref('');

let currentUserSymbol = 'X';

const players = ref<Player[]>([]);

const userListFull = ref(false);

const createUser = () => {
  if(playerName.value === '') {
    return;
  }
  if(players.value.length === 0) {
    console.log('create user X:', playerName.value);
    players.value = [
      ...players.value,
      new Player(playerName.value, 'X')
    ];
    currentUserSymbol = 'O';
    console.log(players)
  } else {
    console.log('create user O:', playerName.value);
    players.value.push(
      new Player(playerName.value, '0')
    )
    console.log(players);

    if (players.value.length ===2) {
      console.log('userlist full, lets play!');
      // localStorage.setItem('players', JSON.stringify(players));
      userListFull.value = true;
      assignActiveUser();
    }
  } 
  playerName.value = '';
}

const assignActiveUser = () => {
  const randomPlayer = Math.floor(Math.random() * players.value.length);
  players.value.forEach((player, index) => {
    player.active = index === randomPlayer;
    console.log( player.name ,'is active: ', player.active)
  })
}

const resetGame = () => {
  console.log('reset game');
  players.value = [];
  userListFull.value = false;
  currentUserSymbol = 'X';
  // localStorage.removeItem('players')
};

</script>

<template>
<section v-if="!userListFull" class="login">
  <img v-bind:src="gameImg"/>
  <h2>Let's Play!</h2>
<div class="login-wrapper">
  <label for="user">
    name for user <span>{{ currentUserSymbol }}</span>:<br>
    <input type="text" id="user" placeholder='Type your name here' v-model="playerName" @keydown.enter="createUser">
  </label>
  <button @click="createUser" :disabled="playerName === ''">Let's play</button>
</div>
</section>
<GameBoard v-else :players="players" @reset="resetGame"></GameBoard>
</template>

<style scoped lang="scss">
.login {
text-align: left;
display: flex;
flex-direction: column;
justify-content: center;
// justify-content: space-between;
// align-items: end;
margin-top: 0;
margin-bottom: 5rem;

  img {
    margin-bottom: 2rem;
  }
}

.input-wrapper {
  padding-top: 2rem;
}
input {
  padding: 0.5rem;
  border: 2px solid darkslategrey;
  width: 175px;
}

button {
  width: 175px;
  height: 36px;
  border: 2px solid darkslategrey;
  border-radius: 4px;
  margin-left: 1rem;
  border-radius: 0;
  cursor: pointer;

  &:hover {
    font-weight: bold;
    color: #1b1b1b
  }
}

</style>