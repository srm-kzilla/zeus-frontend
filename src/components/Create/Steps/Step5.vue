<script setup lang="ts">
import { ref } from "vue";
const total = ref(1);

function incInputs() {
  total.value++;
}
</script>
<template>
  <h3>Prizes</h3>
  <div :key="_" v-for="_ in total" class="timeline-container">
    <FormKit
      :name="'prizes_' + 'amount_' + _"
      label="Amount"
      validation="required"
    />

    <FormKit
      :name="'prizes_' + 'description_' + _"
      label="Description"
      validation="required"
      type="textarea"
    />

    <FormKit
      :name="'prizes_' + 'asset_' + _"
      label="Asset"
      validation="required"
    />
    <FormKit
      :name="'prizes_' + 'sponsor_' + _"
      label="Sponsor"
      validation="required"
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
