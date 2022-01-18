<script setup lang="ts">
import { postEvent } from "@/utils/api";
import { reactive } from "vue";

const data = reactive({
  title: "" as string,
  slug: "" as string,
  description: "" as string,
  eventCover: "" as string,
  completed: false as boolean,
});
</script>

<template>
  <div class="form">
    <input type="text" placeholder="name" v-model="data.title" />
    <input type="text" placeholder="slug" v-model="data.slug" />
    <input type="text" placeholder="description" v-model="data.description" />
    <!-- <input type="text" placeholder="speaker" v-model="data.speaker" />
    <input type="text" placeholder="user" v-model="data.user" /> -->
    <input type="text" placeholder="cover" v-model="data.eventCover" />
    <div class="flex">
      <input type="checkbox" placeholder="completed" v-model="data.completed" />
      Completed
    </div>
    <button @click="postEvent({ ...data })">submit</button>
  </div>
</template>
