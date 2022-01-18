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
        <!-- <span> {{ new Date(event.startDate.$date.$numberLong) }} </span> -->
      </h1>
      <span>{{ props.event.description }}</span>
    </div>
  </div>
</template>
