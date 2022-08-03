<script setup lang="ts">
import { fetchUserByEvent, postMailingList, sendMails } from "../../utils/api";
import { onMounted, reactive, ref, watch } from "vue";
import { User as UserType } from "../../types/global";
import { isSandeshAuth } from "../../utils/authStore";

const data: { users: { users?: UserType[] } } = reactive({
  users: {},
});
const toSelect = ref<any[]>([]);

const props = defineProps({
  eventSlug: String,
  isOpen: Boolean,
  toggleModal: Function,
});

function selectFields() {
  /* Get the text field */

  let copyText: any = data.users.users?.map(function (item) {
    return `
    ${
      toSelect.value.includes("email") ? item.email + "$#*" : ""
    } ${toSelect.value.includes("_id") ? item._id + "$#*" : ""} ${toSelect.value.includes("name") ? item.name + "$#*" : ""} ${toSelect.value.includes("phoneNumber") ? item.phoneNumber + "$#*" : ""}`;
  });
  /* Copy the text inside the text field */
  copyText = copyText!.toString().replaceAll(",", "").replaceAll("$#*", ",");
  navigator.clipboard.writeText(copyText);

  /* Alert the copied text */
  alert("Copied the text: " + copyText);
}

function saveCSV() {
  let saveText: any = data.users.users?.map(function (item) {
    const arr = [];

    if (toSelect.value.includes("_id")) arr.push(item._id);
    if (toSelect.value.includes("email")) arr.push(item.email);
    if (toSelect.value.includes("name")) arr.push(item.name);
    if (toSelect.value.includes("phoneNumber")) arr.push(item.phoneNumber);

    return arr;
  });

  let csvContent = "data:text/csv;charset=utf-8,",
    dataString;

  const heading = [];

  if (toSelect.value.includes("_id")) heading.push("_id");
  if (toSelect.value.includes("email")) heading.push("email");
  if (toSelect.value.includes("name")) heading.push("name");
  if (toSelect.value.includes("phoneNumber")) heading.push("phoneNumber");

  csvContent += heading.join(",");
  csvContent += "\n";

  saveText.forEach(function (infoArray: any, index: number) {
    dataString = infoArray.join(",");
    csvContent += dataString + "\n";
  });

  var encodedUri = encodeURI(csvContent);

  const downloadLink = document.createElement("a");
  downloadLink.href = encodedUri;
  downloadLink.download = props.eventSlug!;

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

async function createMailingList() {
  if (!localStorage.getItem((import.meta as any).env.VITE_SANDESH_KEY)) {
    props.toggleModal!();
  } else {
    const mails = data.users.users?.map((user) => user.email);
    const final = {
      name: props.eventSlug,
      description: "Mailing list for " + props.eventSlug + " from zeus",
      emails: mails,
    };
    await postMailingList(final);
    props.isOpen && props.toggleModal!();
  }
}

onMounted(async () => {
  data.users = (await fetchUserByEvent(props.eventSlug!)) as any;
});
watch(isSandeshAuth, () => {
  setTimeout(() => {
    createMailingList();
  }, 200);
});
</script>

<template v-if="data.users">
  <h1>Users Registered</h1>
  <FormKit
    v-model="toSelect"
    type="checkbox"
    label="to select"
    :options="['_id', 'name', 'email', 'phoneNumber']"
  />

  <button @click="selectFields" class="button">
    Copy all of the selected fields
  </button>

  <button @click="saveCSV" class="button">Save CSV of selclted fields</button>

  <button @click="createMailingList" class="button">
    Create a <strong>Sandesh</strong> Mailing list
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
