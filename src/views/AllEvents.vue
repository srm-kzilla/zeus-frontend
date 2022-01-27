<script setup lang="ts">
import { reactive } from "vue";
import { EventCard } from "../components";
import { fetchEvents } from "@/utils/api";

let data = reactive({ events: null });

(async () => {
  data.events = (await fetchEvents()) as any;
})();
</script>

<template>
  <div>
    <EventCard v-for="event in data.events" :key="event._id" :event="event" />
  </div>
</template>
