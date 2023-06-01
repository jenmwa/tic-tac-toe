<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  clicked: Boolean,
  userSymbol: String,
  isClicked: {
    type: Boolean,
    default: false,
  },
  squareClicked: Function,
})
// console.log(props.newGame, 'newGame?')
let isClicked = ref(false);

const handleClick = () => {
  if(!isClicked.value) {
    isClicked.value = true;
  }
}

</script>

<template>
  <button 
  class="square-btn" 
  @click="handleClick" 
  :disabled="props.isClicked" 
  :class="{ 'clicked' :props.isClicked }"
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

</style>