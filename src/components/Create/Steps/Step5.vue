<script setup lang="ts">
import { ref } from "vue";
interface Props {
  remove: any;
  update: any;
}
const { remove, update } = defineProps<Props>();

const currentTotal = ref(0);

const data = JSON.parse(localStorage.getItem(update ? "update-data" : "data")!);
Object.keys(data).map((key: string) => {
  if (key.includes("prizes")) {
    const num = parseInt(key.split("_")[2]);
    if (num > currentTotal.value) currentTotal.value = num;
  }
});

function incInputs() {
  currentTotal.value++;
}

function decInputs() {
  remove(
    "prizes",
    ["amount", "description", "asset", "sponsor"],
    currentTotal.value,
  );
  currentTotal.value--;
}
</script>
<template>
  <h3>Prizes</h3>
  <div>
    <div :key="_" v-for="_ in currentTotal" class="timeline-container">
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
