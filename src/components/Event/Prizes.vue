<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { Event as EventType } from "../../types/global";

interface Props {
  prizes: EventType["prizes"];
}

const { prizes } = defineProps<Props>();
</script>
<template>
  <h1>Prizes</h1>
  <ul>
    <li v-for="prize in prizes" :key="prize.asset">
      <h3 v-if="prize.amount">
        {{ prize.amount }}
      </h3>
      <p v-if="prize.description">
        {{ prize.description }}
      </p>
      <p v-if="prize.sponsor">
        {{ prize.sponsor }}
      </p>
      <img
        class="asset-image"
        v-if="prize.asset"
        :src="prize.asset"
        alt="asset image"
      />
    </li>
  </ul>
</template>

<style scoped></style>
