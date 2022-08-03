<script setup lang="ts">
import { Event as EventType } from "../../types/global";

interface Props {
  speakers: EventType["speakers"];
}

const { speakers: prizes } = defineProps<Props>();
</script>
<template>
  <h1>Speaker</h1>
  <div v-for="speaker in speakers" :key="speaker.name">
    <h3 v-if="speaker.name">
      {{ speaker.name }}
    </h3>
    <p v-if="speaker.about">
      {{ speaker.about }}
    </p>

    <img
      class="asset-image"
      v-if="speaker.image"
      :src="speaker.image"
      alt="asset image"
    />
  </div>
</template>
