<script setup lang="ts">

</script>

<template>
  <button class="square-btn">X or O</button>
</template>

<style scoped lang="scss">
.square-btn {
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
.clicked {
  background-color: green;
}
}

</style>