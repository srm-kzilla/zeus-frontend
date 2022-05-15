<script setup lang="ts">
import { ref } from "vue";
const total = ref(1);

function incInputs() {
  total.value++;
}
</script>
<template>
  <FormKit
    :key="_"
    type="datetime-local"
    :name="'timeline' + _"
    label="Timeline"
    validation="required"
    v-for="_ in total"
  />
  <button @click="incInputs">add</button>
</template>
