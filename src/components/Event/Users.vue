<script setup lang="ts">
import { fetchUserByEvent, postMailingList, sendMails } from "../../utils/api";
import { onMounted, reactive, ref } from "vue";
import { User as UserType } from "../../types/global";

const data: { users: { users?: UserType[] } } = reactive({
  users: {},
});
const toSelect = ref<any[]>([]);

const props = defineProps({
  eventSlug: String,
  toggleModal: Function,
});

function selectFields() {
  /* Get the text field */
  console.log(data.users.users);

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
    return [
      toSelect.value.includes("_id") ? item._id : "",
      toSelect.value.includes("email") ? item.email : "",
      toSelect.value.includes("name") ? item.name : "",
      toSelect.value.includes("phoneNumber") ? item.phoneNumber : "",
    ];
  });
  let csvContent = "data:text/csv;charset=utf-8,",
    dataString;
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
  const res = await props.toggleModal!();
  if (res.data.success) {
    const mails = data.users.users?.map((user) => user.email);
    const final = {
      name: props.eventSlug,
      description: "Mailing list from zeus for " + props.eventSlug,
      emails: mails,
    };
    postMailingList(final);
  }
}

onMounted(async () => {
  data.users = (await fetchUserByEvent(props.eventSlug!)) as any;
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
