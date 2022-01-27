<script setup lang="ts">
import { defineProps, PropType } from "vue";
import { useRouter } from "vue-router";
import { Event as EventType } from "../types/global";

const router = useRouter();

const props = defineProps({
  event: { type: Object as PropType<EventType> },
});

function redirect() {
  const id = props.event!._id;

  router.push({ path: `/event/${id}` });
}
</script>

<template>
  <div class="card" @click="redirect">
    <div>
      <h1>
        {{ props.event.title }}
      </h1>
      <span>{{ props.event.description }}</span>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 0.1rem var(--accent-color) solid;
  margin: 2rem 0;
  padding: 2rem;
  cursor: pointer;
  border-radius: 1rem;
  transition: all 200ms ease-in-out;

  box-shadow: 5px 7px 10px rgba(0, 0, 0, 0.25);
}

.card:hover {
  transform: translateY(1rem);
  transform: scale(1.02);
  box-shadow: 5px 7px 10px rgba(0, 0, 0, 0.45);
}
</style>
