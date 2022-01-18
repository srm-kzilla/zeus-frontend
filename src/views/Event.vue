<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted, reactive, ref, watch } from "vue";
import { fetchSingleEvent } from "@/utils/api";
import { Event } from "@/types/global";
import { Users } from "../components";

const route = useRoute();
const id = ref(route.params.id);

const data: { EventDetail: Event | null } = reactive({
  EventDetail: null,
});

onMounted(async () => {
  data.EventDetail = await fetchSingleEvent(id.value as string);
});

watch(
  () => route.params.id,
  async (newId) => {
    id.value = newId;
    data.EventDetail = await fetchSingleEvent(id.value as string);
  },
);

function createImage(file: any) {
  var image = new Image();
  var reader = new FileReader();

  reader.readAsDataURL(file);
}

function onFileChange(e: any) {
  var files = e.target.files || e.dataTransfer.files;
  if (!files.length) return;
  createImage(files[0]);
}
</script>

<template>
  <div v-if="data.EventDetail != null">
    <h1>
      {{ data.EventDetail.title }}
    </h1>
    <p>
      {{ data.EventDetail.description }}
    </p>

    <input type="file" id="template" name="template" @change="onFileChange" />
    <Users :eventSlug="data.EventDetail.slug" />
  </div>
</template>
