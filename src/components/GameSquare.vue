<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  squareClicked: {
    type: Function
  }
})

let isClicked = ref(false);

const handleClick = () => {
  console.log('user clicked, this log is from the GameSquareComponent')
  if(!isClicked.value) {
    isClicked.value = true;
  }
}

</script>

<template>
  <button class="square-btn" @click="handleClick" :disabled="isClicked" :class="{ 'clicked' : isClicked}"></button>
</template>

<style scoped lang="scss">
.square-btn {
border: 2px solid darkslategrey;
width: 10rem;
height: 10rem;
background: none;
font-weight: 700;

  &:hover {
      cursor: pointer;
    }

  &:focus {
    outline: none;
    background-color: lightgrey;
  }

}

</style>