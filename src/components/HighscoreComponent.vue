<script setup lang="ts">
import { computed, ref } from 'vue';
import { Player } from '../models/Player';

const props = defineProps({
  players: {
    type: Array as () => Player[],
  },
});

const players = ref(props.players);
console.log(players.value);

const emits = defineEmits<{
  (e: 'close') : void,
}>();

const closeHighscoreBtn = () => {
  emits('close');
};

const sortedPlayers = computed(() => {
  return [...players.value!].sort((a,b) => b.points - a.points);
})

</script>

<template>
  <div class="highscore-container">
    <div class="highscore-wrapper">
      <h3>HIGHSCORE</h3>
      <div v-for="player in sortedPlayers" key="player.name">
        <span>{{ player.name }} {{ player.points }}p</span>
      </div>
      <button @click="closeHighscoreBtn">CLOSE</button>
    </div>
  </div>
</template>

<style scoped lang="scss">

.highscore-container {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(103, 103, 103, 0.5);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.highscore-wrapper {
  background-color: whitesmoke;
  width: 300px;

  span {
    font-weight: bold;
    color: darkslategray}
}

button {
  width: 175px;
  height: 35px;
  border: 2px solid darkslategrey;
  border-radius: 4px;
  margin-block: 1rem;
}

</style>