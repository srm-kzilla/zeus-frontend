<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { fetchSingleEvent } from "../utils/api";
import { Event } from "../types/global";
import { useRoute } from "vue-router";
import { Prizes, Speakers, Timeline, Details } from "../components/Event";

let data = reactive<{ event: Event | null }>({ event: null });

const route = useRoute();
const slug = ref(route.params.slug);

const getEvent = async () => {
  data.event = (await fetchSingleEvent(slug.value.toString()))![0];
};
getEvent();

watch(slug, () => {
  getEvent();
});
</script>

<template>
  <div class="event" v-if="data.event != null">
    <Details :data="data.event" />
    <Prizes :prizes="data.event.prizes" />
    <Speakers :speakers="data.event.speakers" />
    <Timeline :timeline="data.event.timeline" />
  </div>
</template>

<style scoped>
.event {
  margin: 2rem 0;
  padding: 2rem;
  border: 2px solid var(--accent-color);
  border-radius: 2rem;
}

@media screen and (max-width: 768px) {
  .event {
    padding: 0.5rem;
  }
}

.event > .details {
  margin: 1rem 0;
}
</style>
