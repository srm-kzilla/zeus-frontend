<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted, reactive, ref, watch } from "vue";
import { fetchSingleEvent } from "@/utils/api";
import { Event } from "@/types/global";
import { Users } from "../components";

const route = useRoute();
const id = ref(route.params.id);

const data: { EventDetail: Event | null } = reactive({
  EventDetail: null,
});

onMounted(async () => {
  data.EventDetail = await fetchSingleEvent(id.value as string);
});

watch(
  () => route.params.id,
  async (newId) => {
    id.value = newId;
    data.EventDetail = await fetchSingleEvent(id.value as string);
  },
);

function createImage(file: any) {
  var image = new Image();
  var reader = new FileReader();

  reader.readAsDataURL(file);
}

function onFileChange(e: any) {
  var files = e.target.files || e.dataTransfer.files;
  if (!files.length) return;
  createImage(files[0]);
}
</script>

<template>
  <div class="event" v-if="data.EventDetail != null">
    <div class="details">
      <h1>
        {{ data.EventDetail.title }}
      </h1>
      <p>
        {{ data.EventDetail.description }}
      </p>
    </div>
    <div class="send-mail-box">
      <div class="file-upload">
        <p>Upload the template file</p>
        <input
          type="file"
          id="template"
          name="template"
          @change="onFileChange"
        />
      </div>
      <Users :eventSlug="data.EventDetail.slug" />
    </div>
  </div>
</template>

<style scoped>
.event {
  margin: 2rem 0;
  padding: 0.5rem 2rem;
}

.event > .details {
  margin: 1rem 0;
}

.file-upload {
  position: relative;
  background-color: var(--bg-color);
  border-radius: 1rem;
  width: max-content;
  transition: all 200ms ease-in-out;
  border: 2px solid var(--accent-color);
  cursor: pointer;
}

.file-upload > * {
  padding: 0.5rem;
}

.file-upload:hover {
  background-color: var(--accent-color);
  color: var(--bg-color);
  cursor: pointer;
}

.file-upload > p {
  z-index: 0;
  position: absolute;
  width: 100%;
  text-align: center;
}

.file-upload > input {
  z-index: 1;
  opacity: 0%;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
</style>
