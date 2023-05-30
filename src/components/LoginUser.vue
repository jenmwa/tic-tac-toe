<script setup lang="ts">
import { ref } from 'vue';
import { Player } from '../models/Player'

const playerName = ref('');

let currentUserSymbol = 'X';

const players = ref<Player[]>([]);

const userListFull = ref(false);

const createUser = () => {
  if(players.value.length === 0) {
    console.log('create user X:', playerName.value);
    players.value = [
      new Player(playerName.value, 'X', true, false, 0)
    ]
    currentUserSymbol = 'O';
    console.log(players)
  } else {
    console.log('create user O:', playerName.value);
    players.value.push(
      new Player(playerName.value, '0', true, false, 0)
    )
    console.log(players);

    if(players.value.length ===2) {
      console.log('userlist full, lets play!');
      localStorage.setItem('players', JSON.stringify(players));
      userListFull.value = true;
    }
  } 
  playerName.value = '';
}

console.log('userlist full, lets play!')
</script>

<template>

<section v-if="!userListFull" class="login">
  <label for="user">
    name for user <span>{{ currentUserSymbol }}</span>:<br>
    <input type="text" id="user" placeholder='Type your name here' v-model="playerName" @keydown.enter="createUser">
  </label>
  <button @click="createUser">Let's play</button>
</section>

</template>

<style scoped lang="scss">
.login {
text-align: left;
display: flex;
justify-content: space-between;
align-items: end;
margin-bottom: 2rem;
}

input {
  padding: 0.5rem;
  border: 2px solid darkslategrey;
}

button {
  width: 175px;
  height: 35px;
  border: 2px solid darkslategrey;
  border-radius: 4px;
}

</style>