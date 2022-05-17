<script setup lang="ts">
import { ref } from "vue";
const props = defineProps({
  remove: null,
});

const total = ref(1);

function incInputs() {
  total.value++;
}

function decInputs() {
  props.remove(
    "prizes",
    ["amount", "description", "asset", "sponsor"],
    total.value,
  );
  total.value--;
}
</script>
<template>
  <h3>Prizes</h3>
  <div :key="_" v-for="_ in total" class="timeline-container">
    <FormKit :name="'prizes_' + 'amount_' + _" label="Amount" />

    <FormKit
      :name="'prizes_' + 'description_' + _"
      label="Description"
      type="textarea"
    />

    <FormKit
      type="file"
      :name="`pz_${_}_ImageUpload`"
      label="Asset Image"
      accept=".png,.jpg,.jpeg"
    />
    <FormKit :name="'prizes_' + 'sponsor_' + _" label="Sponsor" />
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
      >Remove Prizes</FormKit
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
      >Add Prizes</FormKit
    >
  </div>
</template>

<style scoped>
h3 {
  margin-top: 1rem;
}
</style>
