<script setup lang="ts">

defineProps({
  userSymbol: String
})

</script>

<template>
  <button class="square-btn" 

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
    outline: 2px solid rgb(95, 201, 201);
  }
}
</style>