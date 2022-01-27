<script setup lang="ts">
import { postEvent } from "@/utils/api";
import { reactive } from "vue";

const data = reactive({
  title: "" as string,
  slug: "" as string,
  description: "" as string,
  eventCover: "" as string,
  completed: false as boolean,
});
</script>

<template>
  <div class="form">
    <input type="text" placeholder="name" v-model="data.title" />
    <input type="text" placeholder="slug" v-model="data.slug" />
    <input type="text" placeholder="description" v-model="data.description" />
    <input type="text" placeholder="cover" v-model="data.eventCover" />
    <div class="completed">
      <input type="checkbox" placeholder="completed" v-model="data.completed" />
      Completed
    </div>
    <button class="submit-button" @click="postEvent({ ...data })">
      submit
    </button>
  </div>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 0 auto;
}

.form > input,
.form > div {
  margin: 1rem 0;
  padding: 1rem;
  border: var(--txt-color) 2px solid;
  border-radius: 1rem;
}

input[type="text"] {
  background-color: var(--bg-color);
  color: var(--txt-color);
}

input[type="text"]:focus {
  border: var(--accent-color) 3px solid;
  /* outline: none; */
}

.completed {
  display: flex;
  align-items: center;
}
.completed > * {
  margin: 0 0.5rem;
}

.submit-button {
  width: clamp(120px, 50%, 268px);
  margin: auto;
  cursor: pointer;
  transition: all 300ms ease;
  padding: 1rem;
}

@media (max-width: 768px) {
  .form {
    width: 100%;
  }
}
</style>
