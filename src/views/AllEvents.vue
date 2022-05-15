<script setup lang="ts">
import { reactive, ref } from "vue";
import { EventCard } from "../components";
import { fetchEvents } from "../utils/api";
import { Form } from "../components/Create";
import { Event } from "../types/global";

let data = reactive<{ events: Event[] | null }>({ events: null });
let create = ref(true);

function preventScroll(e: any) {
  e.preventDefault();
  e.stopPropagation();
}

function toggleCreate() {
  create.value = !create.value;

  if (create.value) {
    document
      .querySelector("body")!
      .addEventListener("wheel", preventScroll, { passive: false });
  } else {
    document.querySelector("body")!.removeEventListener("wheel", preventScroll);
  }
}

(async () => {
  data.events = (await fetchEvents()) as any;
})();
</script>

<template>
  <div>
    <EventCard v-for="event in data.events" :key="event._id" :event="event" />
  </div>
</template>
