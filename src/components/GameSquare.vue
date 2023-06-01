<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  // activePlayerInfo: {
  //   type: Object,
  // },
  // newGame: {
  //   type: Function,
  // },
  squareClicked: {
    type: Function,
  },
  // clicked: Boolean,
  userSymbol: String
})
// console.log(props.newGame, 'newGame?')
let isClicked = ref(false);

const handleClick = () => {
  if(!isClicked.value) {
    isClicked.value = true;
    console.log('handleclick in gamesquare')
  }
}

</script>

<template>
  <button class="square-btn" 
  @click="handleClick" 
  :disabled="isClicked" 
  :class="{ 'clicked' : isClicked}"
  > {{ userSymbol }} </button>
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
.clicked {
    background-color: lightgreen;
    color: #1b1b1b;
    font-size: 4rem;
  }
</style>