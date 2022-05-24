<script setup lang="ts">
import { fetchUserByEvent, sendMails } from "../../utils/api";
import { onMounted, reactive, ref } from "vue";
import { User as UserType } from "../../types/global";

const data: { users: { users: UserType[] | null } } = reactive({
  users: { users: null },
});

const props = defineProps({
  eventSlug: String,
});

onMounted(async () => {
  data.users = (await fetchUserByEvent(props.eventSlug!)) as any;
  console.log(data.users);
});
</script>

<template v-if="data.users">
  <ol>
    <li class="users" v-for="user in data.users.users" :key="user.email">
      {{ user.name }}
      {{ user.email }}
      {{ user.phoneNumber }}
    </li>
  </ol>
</template>

<style scoped>
ol,
li {
  list-style: decimal;
  padding-left: 0.5rem;
}
ol {
  padding-left: 1.5rem;
}
</style>
