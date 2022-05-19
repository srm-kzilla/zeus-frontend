<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { fetchSingleEvent } from "../utils/api";
import { Event } from "../types/global";
import { useRoute } from "vue-router";
import { Prizes, Speakers, Timeline, Details } from "../components/Event";
import { Form } from "../components/Create";
import { unFormatData } from "../utils/formatData";

let data = reactive<{ event: Event | null }>({ event: null });

const route = useRoute();
const slug = ref(route.params.slug);
let create = ref(false);
function toggleCreate() {
  localStorage.removeItem("data");
  localStorage.setItem("oldslug", data.event?.slug!);

  const newData: any = data;
  newData.event.eventCoverUpload = [];

  Object.keys(newData).map((key) => {
    if (key.includes("Upload")) newData[key] = [];
  });

  localStorage.setItem("data", JSON.stringify(unFormatData(newData.event)));
  create.value = !create.value;
}

const getEvent = async () => {
  data.event = (await fetchSingleEvent(slug.value.toString()))![0];
};
getEvent();

watch(slug, () => {
  getEvent();
});
</script>

<template>
  <Form v-if="create" :toggleCreate="toggleCreate" :update="true" />
  <div class="event" v-if="data.event != null">
    <button @click="toggleCreate" class="button">Update Event</button>
    <Details :data="data.event" />
    <div class="event-section">
      <Prizes :prizes="data.event.prizes" />
    </div>
    <div class="event-section">
      <Speakers :speakers="data.event.speakers" />
    </div>
    <div class="event-section">
      <Timeline :timeline="data.event.timeline" />
    </div>
  </div>
</template>

<style scoped>
.button {
  margin-right: auto;
}
</style>
