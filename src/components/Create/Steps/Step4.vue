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
  if (key.includes("speaker")) {
    const num = parseInt(key.split("_")[2]);
    if (num > currentTotal.value) currentTotal.value = num;
  }
});

function incInputs() {
  currentTotal.value++;
}

function decInputs() {
  remove("speaker", ["name", "image", "about", "email"], currentTotal.value);
  currentTotal.value--;
}
</script>
<template>
  <h3>Speaker info</h3>
  <div>
    <div :key="_" v-for="_ in currentTotal" class="timeline-container">
      <FormKit
        :name="'speaker_' + 'name_' + _"
        label="Name"
        validation="required"
      />

      <!-- <FormKit :name="'speaker_' + 'image_' + _" label="Image" /> -->
      <FormKit
        type="file"
        :name="`spk_${_}_ImageUpload`"
        label="Speaker Image"
        accept=".png,.jpg,.jpeg"
      />
      <FormKit
        :name="'speaker_' + 'email_' + _"
        label="Email"
        validation="required|email"
      />

      <FormKit
        :name="'speaker_' + 'about_' + _"
        label="About"
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
      >Remove Speaker</FormKit
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
      >Add Speaker</FormKit
    >
  </div>
</template>

<style scoped>
h3 {
  margin-top: 1rem;
}
</style>
