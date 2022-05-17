<script setup lang="ts">
import { ref } from "vue";
const props = defineProps({
  remove: null,
});

let currentTotal = ref(0);
// Optimize this
const data = JSON.parse(localStorage.getItem("data")!);
Object.keys(data).map((key: string) => {
  console.log(key);

  if (key.includes("timeline")) {
    const num = parseInt(key.split("_")[2]);
    if (num > currentTotal.value) currentTotal.value = num;
  }
});

const total = ref(currentTotal.value);

function incInputs() {
  total.value++;
}

function decInputs() {
  props.remove("timeline", ["date", "title", "description"], total.value);
  total.value--;
}
</script>
<template>
  <h3>Timeline</h3>
  <div>
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
        type="textarea"
      />
    </div>
  </div>
  <div class="actions">
    <FormKit
      type="button"
      :classes="{
        wrapper: { $reset: true },
        outer: { $reset: true },
        inner: { $reset: true },
        input: { $reset: true },
      }"
      @click="decInputs"
      input-class="secondary-button"
      >Remove Timeline</FormKit
    >
    <FormKit
      type="button"
      :classes="{
        wrapper: { $reset: true },
        outer: { $reset: true },
        inner: { $reset: true },
        input: { $reset: true },
      }"
      @click="incInputs"
      input-class="secondary-button"
      >Add Timeline
    </FormKit>
  </div>
</template>

<style scoped>
h3 {
  margin-top: 1rem;
}
</style>
