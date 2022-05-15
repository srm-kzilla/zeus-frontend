<script setup lang="ts">
import { ref } from "vue";
const total = ref(1);

function incInputs() {
  total.value++;
}
</script>
<template>
  <h3>Timeline</h3>
  <div :key="_" v-for="_ in total" class="timeline-container">
    <FormKit
      type="datetime-local"
      :name="'timeline_' + 'date_' + _"
      label="Date"
      validation="required"
    />
    <FormKit
      :name="'timeline_' + 'title_' + _"
      label="Title"
      validation="required"
    />

    <FormKit
      :name="'timeline_' + 'description_' + _"
      label="Description"
      validation="required"
      type="textarea"
    />
  </div>
  <button @click="incInputs">add</button>
</template>

<style scoped>
h3 {
  margin-top: 1rem;
}
.timeline-container {
  border: 3px solid var(--accent-color);
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  flex-direction: column;
}
</style>
