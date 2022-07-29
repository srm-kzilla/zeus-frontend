<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { Event as EventType } from "../../types/global";

interface Props {
  data: EventType;
}

const { data } = defineProps<Props>();
</script>

<template>
  <h1>
    {{ data.title }}
  </h1>
  <h3>{{ data.tagline }}</h3>
  <p>
    {{ data.description }}
  </p>
  <img class="asset-image" :src="data.eventCover" alt="hello" />
</template>
