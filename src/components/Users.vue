<script setup lang="ts">
import { fetchUserByEvent, sendMails } from "@/utils/api";
import { defineProps, onMounted, reactive, ref } from "vue";
import { User as UserType } from "../types/global";
const data: { users: UserType[] | null; selectedUsers: string[] | null } =
  reactive({ users: null, selectedUsers: [] });

const props = defineProps({
  eventSlug: String,
});

const selectAll = () => {
  if (
    data.selectedUsers &&
    data.users &&
    data.selectedUsers?.length < data.users?.length
  ) {
    data.users?.forEach((user) => {
      data.selectedUsers?.push(user.name);
    });
    data.selectedUsers = [...new Set(data.selectedUsers)];
  } else data.selectedUsers = [];
};

const sendAllMails = () => {
  sendMails([...(data.selectedUsers as string[])]);
  data.selectedUsers = [];
};

onMounted(async () => {
  data.users = await fetchUserByEvent(props.eventSlug as string);
});
</script>

<template v-if="data.users">
  <div>
    <button @click="selectAll">Select all</button>
  </div>
  <div class="users" v-for="user in data.users" :key="user.phoneNumber">
    <input
      type="checkbox"
      :id="user.name"
      :value="user.name"
      v-model="data.selectedUsers"
    />
    <label :for="user.name">
      {{ user.name }}
    </label>
  </div>
  <button @click="sendAllMails">send mails</button>
</template>

<style scoped>
.users {
  display: flex;
  align-items: center;
}

.users > * {
  margin: 0.5rem 1rem;
}
</style>
