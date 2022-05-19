<script setup lang="ts">
import { Navbar } from "./components";
import { loading } from "./utils/toggleLoading";
</script>

<template>
  <div class="center" v-if="loading">
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="wave"></div>
  </div>

  <div class="container">
    <Navbar />
    <router-view />
  </div>
</template>

<style scoped>
.center {
  background-color: rgba(0, 0, 0, 0.9);
  position: fixed;
  inset: 0;
  pointer-events: all;
  z-index: 1000;
}
.container {
  padding: 2rem;
}
@media screen and (max-width: 768px) {
  .container {
    padding: 0.5rem;
  }
}
</style>
