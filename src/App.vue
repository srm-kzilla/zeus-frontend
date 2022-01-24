<script setup lang="ts">
import { Navbar } from "./components";
</script>

<template>
  <div class="container">
    <navbar />
    <router-view />
  </div>
</template>

<style scoped>
.container {
  padding: 2rem;
}
</style>
