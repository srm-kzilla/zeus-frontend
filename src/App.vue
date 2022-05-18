<script setup lang="ts">
import { Navbar } from "./components";
</script>

<template>
  <div class="container">
    <Navbar />
    <router-view />
  </div>
</template>

<style scoped>
.container {
  padding: 2rem;
}
@media screen and (max-width: 768px) {
  .container {
    padding: 0.5rem;
  }
}
</style>
