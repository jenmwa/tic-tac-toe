<script setup lang="ts">

const emits = defineEmits<{
  (e: 'close') : void,
}>();

const closeHighscoreBtn = () => {
  emits('close');
};

</script>

<template>
  <div class="highscore-container">
    HIGHSCORE
    <button @click="closeHighscoreBtn">CLOSE</button>
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

button {
  width: 175px;
  height: 35px;
  border: 2px solid darkslategrey;
  border-radius: 4px;
  margin-bottom: 1rem;
}


</style>