<script setup lang="ts">
import { fetchUserByEvent, sendMails } from "../../utils/api";
import { onMounted, reactive, ref } from "vue";
import { User as UserType } from "../../types/global";

const data: { users: { users?: UserType[] } } = reactive({
  users: {},
});
const toSelect = ref<any[]>([]);

const props = defineProps({
  eventSlug: String,
});

function myFunction() {
  /* Get the text field */
  console.log(data.users.users);

  let copyText: any = data.users.users?.map(function (item) {
    return `
    ${
      toSelect.value.includes("email") ? item.email + "$#*" : ""
    } ${toSelect.value.includes("_id") ? item._id + "$#*" : ""} ${toSelect.value.includes("name") ? item.name + "$#*" : ""} ${toSelect.value.includes("phoneNumber") ? item.phoneNumber + "$#*" : ""}`;
  });
  console.log(copyText);

  /* Copy the text inside the text field */
  copyText = copyText!.toString().replaceAll(",", "\n").replaceAll("$#*", ",");
  navigator.clipboard.writeText(copyText);

  /* Alert the copied text */
  alert("Copied the text: " + copyText);
}

onMounted(async () => {
  data.users = (await fetchUserByEvent(props.eventSlug!)) as any;
  console.log(data.users);
});
</script>

<template v-if="data.users">
  <FormKit
    v-model="toSelect"
    type="checkbox"
    label="to select"
    :options="['_id', 'name', 'email', 'phoneNumber']"
  />

  <button @click="myFunction" class="button">
    Copy All of the selected fields
  </button>

  <ol>
    <li class="users" v-for="user in data.users.users" :key="user.email">
      <div>
        <span :class="!toSelect.includes('_id') && 'no-select'">
          {{ user._id }}
        </span>
        <span :class="!toSelect.includes('name') && 'no-select'">
          {{ user.name }}
        </span>
        <span :class="!toSelect.includes('email') && 'no-select'">
          {{ user.email }}
        </span>
        <span :class="!toSelect.includes('phoneNumber') && 'no-select'">
          {{ user.phoneNumber }}
        </span>
      </div>
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
li > div {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(4, 1fr);
}
.no-select {
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}

@media screen and (max-width: 768px) {
  li > div {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}

@media screen and (max-width: 420px) {
  li > div {
    grid-template-columns: repeat(1, 1fr);
    gap: 1rem;
  }
}
</style>
