<script setup lang="ts">
import { reactive, ref } from "vue";
import { EventCard } from "../components";
import { fetchEvents } from "../utils/api";
import { Form } from "../components/Create";
import { Event } from "../types/global";

let data = reactive<{ events: Event[] | null }>({ events: null });
let create = ref(false);

function preventScroll(e: any) {
  e.preventDefault();
  e.stopPropagation();
}

function toggleCreate() {
  create.value = !create.value;
}

(async () => {
  data.events = (await fetchEvents()) as any;
})();
</script>

<template>
  <div class="all-events">
    <h1>All events</h1>
    <button @click="toggleCreate" class="button">Create Event</button>
    <EventCard v-for="event in data.events" :key="event._id" :event="event" />
  </div>
  <Form v-if="create" :toggleCreate="toggleCreate" />
</template>

<style scoped>
.all-events {
  border-radius: 2rem;
  padding: 2rem;
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 0;
  justify-content: center;

  border: 4px solid var(--accent-color);
}
.all-events > h1 {
  position: absolute;
  top: -1.75rem;
  background-color: var(--bg-color);
  padding: 0 2rem;
}

.all-events > button {
  align-self: flex-end;
}
</style>
