<script setup>
import { ref } from "vue";

const message = ref("Добро пожаловать на главную страницу!");
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
  </div>
</template>

<style scoped>
.home {
  font-family: Arial, sans-serif;
  text-align: center;
  margin-top: 2rem;
}
</style>
