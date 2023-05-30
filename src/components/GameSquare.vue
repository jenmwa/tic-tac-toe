<script setup lang="ts">

</script>

<template>
  <button class="square-btn"></button>
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