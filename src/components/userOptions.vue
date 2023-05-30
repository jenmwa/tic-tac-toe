<script setup lang="ts">

const newgameBtn = () => {
    console.log('staaaaaart over please!')
}

const highscoreBtn = () => {
    console.log('lets do a modal with all of them highscore!')
}

const resetBtn = () => {
    console.log('reset all!!!!!!');
    localStorage.removeItem('players')
}

</script>

<template>
    <div>
        <button @click="newgameBtn">NEW GAME</button>
        <button @click="highscoreBtn">HIGHSCORE</button>
        <button @click="resetBtn">RESET</button>
    </div>

</template>

<style scoped lang="scss">

div {
    display:flex;
    flex-direction: column;
    align-items: center;
    margin-block: 1rem;
}

button {
  width: 175px;
  height: 35px;
  border: 2px solid darkslategrey;
  border-radius: 4px;
  margin-bottom: 1rem;
}

</style>