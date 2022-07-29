<script setup lang="ts">
import { PropType } from "vue";
import { useRouter } from "vue-router";
import { Event as EventType } from "../types/global";

const router = useRouter();

const props = defineProps({
  event: { type: Object as PropType<EventType> },
});

function redirect() {
  const id = props.event!.slug;

  router.push({ path: `/event/${id}` });
}
</script>

<template>
  <div class="card event-section" @click="redirect">
    <h1>
      {{ props.event?.title }}
    </h1>
    <div class="time">
      {{ event?.startDate }}
    </div>
    <span>{{ props.event?.description }}</span>
  </div>
</template>

<style scoped>
.card {
  margin: 1rem 0;
  padding: 2rem;
  cursor: pointer;
  transition: all 200ms ease-in-out;
}

.card > .time {
  color: var(--txt-secondary);
  font-weight: 500;
}

.card:hover {
  transform: translateY(1rem);
  transform: scale(1.02);
  box-shadow: 5px 7px 10px rgba(0, 0, 0, 0.45);
}
</style>
