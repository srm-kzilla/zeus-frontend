<script lang="ts">
import { defineComponent } from "vue";
import { CreateEvent } from "../components";

const Component = defineComponent({
  components: {
    CreateEvent,
  },
});
export default Component;
</script>

<template>
  <CreateEvent />
</template>
