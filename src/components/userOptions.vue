<script setup lang="ts">
  import { ref } from "vue";
  import { Player } from "../models/Player";
  import HighscoreComponent from "./HighscoreComponent.vue";

  defineProps({
    players: {
      type: Array as () => Player[],
    },
  });

  const emits = defineEmits<{
    (e: "reset"): void;
    (e: "newGame"): void;
  }>();

  const newgameBtn = () => {
    emits("newGame");
  };

  const showHighscore = ref(false);

  const highscoreBtn = () => {
    showHighscore.value = true;
  };

  const closeHighscore = () => {
    showHighscore.value = false;
  };

  const resetBtn = () => {
    emits("reset");
  };
</script>

<template>
  <div>
    <button @click="newgameBtn">NEW GAME</button>
    <button @click="highscoreBtn">HIGHSCORE</button>
    <button @click="resetBtn">RESET</button>
  </div>
  <HighscoreComponent
    v-if="showHighscore"
    @close="closeHighscore"
    :players="players"
  ></HighscoreComponent>
</template>

<style scoped lang="scss">
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-block: 1rem;
    margin-bottom: 7rem;
  }

  button {
    width: 175px;
    height: 35px;
    border: 2px solid darkslategrey;
    border-radius: 4px;
    margin-bottom: 1rem;
    cursor: pointer;
  }
</style>
