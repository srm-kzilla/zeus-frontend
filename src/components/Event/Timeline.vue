<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { Event as EventType } from "../../types/global";

interface Props {
  timeline: EventType["timeline"];
}

const { timeline } = defineProps<Props>();
</script>
<template>
  <h1>Timeline</h1>
  <div v-for="event in timeline" :key="event.date">
    <h3 v-if="event.title">
      {{ event.title }}
    </h3>
    <p v-if="event.description">
      {{ event.description }}
    </p>
  </div>
</template>
