<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  toggleCreate: null,
});
</script>

<template>
  <div class="form-container">
    <div class="form">
      <div class="heading">
        <h1>Create Event</h1>
        <div class="close" @click="props.toggleCreate">X</div>
      </div>
      <div class="main">
        <FormKit
          label="Username"
          type="text"
          help="Pick a new username"
          validation="required|matches:/^@[a-zA-Z]+$/|length:5"
          value="@useFormKit"
        />
      </div>
    </div>
  </div>
  <div class="background" @click="props.toggleCreate"></div>
</template>
<style scoped>
.background {
  z-index: 10;
  position: fixed;

  inset: 0;

  background-color: rgba(0, 0, 0, 0.5);
}
.form-container {
  pointer-events: none;
  position: fixed;
  top: 0;

  height: 100vh;
  width: 100vw;

  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 15;
}

.form {
  pointer-events: all;
  background: var(--bg-color);
  min-width: 576px;
  padding: 3rem;
  border-radius: 3rem;
}

.heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.heading > .close {
  cursor: pointer;
}
</style>
