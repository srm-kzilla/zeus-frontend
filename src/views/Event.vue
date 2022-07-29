<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { fetchSingleEvent } from "../utils/api";
import { Event } from "../types/global";
import { useRoute } from "vue-router";
import {
  Prizes,
  Speakers,
  Timeline,
  Details,
  Users,
} from "../components/Event";
import { Form } from "../components/Create";
import { unFormatData } from "../utils/formatData";

let data = reactive<{ event: Event | null }>({ event: null });

const route = useRoute();
const slug = ref(route.params.slug);
let create = ref(false);
function toggleCreate() {
  localStorage.removeItem("update-data");
  localStorage.setItem("oldslug", data.event?.slug!);

  const newData: any = data;
  newData.event.eventCoverUpload = [];

  Object.keys(newData).map((key) => {
    if (key.includes("Upload")) newData[key] = [];
  });

  localStorage.setItem(
    "update-data",
    JSON.stringify(unFormatData(newData.event)),
  );
  create.value = !create.value;
}

const getEvent = async () => {
  data.event = ((await fetchSingleEvent(slug.value.toString())) as Event[])![0];
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
    <div class="row">
      <div class="details event-section">
        <Details :data="data.event" />
      </div>
      <div class="event-section prizes">
        <Prizes :prizes="data.event.prizes" />
      </div>
    </div>
    <div class="row">
      <div class="event-section speakers">
        <Speakers :speakers="data.event.speakers" class="event-section" />
      </div>

      <div class="event-section timeline">
        <Timeline :timeline="data.event.timeline" />
      </div>
    </div>

    <div class="event-section users">
      <Users :eventSlug="data.event.slug" />
    </div>
  </div>
</template>

<style scoped>
.button {
  display: block;
  margin-left: auto;
}
.row {
  display: grid;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  grid-template-columns: repeat(2, 1fr);
}

.details {
  background-color: #dbd8f0aa;
}
.prizes {
  background-color: #cbf3f0aa;
}

.speakers {
  background-color: #ffe5d9aa;
}
.timeline {
  background-color: #fcf3c5aa;
}
.users {
  background-color: #b1ff9e2e;
}

@media screen and (max-width: 864px) {
  .row {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
