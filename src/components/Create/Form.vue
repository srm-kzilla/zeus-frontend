<script setup lang="ts">
import { defineProps, onMounted, onUnmounted } from "vue";
import { Step1, Step2, Step3, Step4, Step5 } from "./Steps";
import { ref, watch } from "vue";
import uploadFile from "../../utils/fileUpload";
import formatData from "../../utils/formatData";
import { postEvent } from "../../utils/api";
import { Event } from "../../types/global";

const props = defineProps({
  toggleCreate: null,
});

const stepnumber = ref(1);
const data = ref<any>({
  ...JSON.parse(localStorage.getItem("data")!),
  eventCoverUpload: [],
});
const imageSource = ref();
const imageAlt = ref("Event cover");

onMounted(() => {
  console.log(
    JSON.parse(localStorage.getItem("data")!).eventCoverUpload.length,
  );

  if (JSON.parse(localStorage.getItem("data")!).eventCoverUpload.length >= 1) {
    alert("You will need to upload the image again");
  }
});

async function saveToLocal() {
  let storedData = data.value;
  localStorage.setItem("data", JSON.stringify({ ...storedData }));
}

async function submitForm() {
  let formattedData: any = formatData(data.value);
  const ids: any[] = [];
  Object.keys(formattedData).map((key) => {
    if (key.includes("pz") || key.includes("spk")) {
      ids.push({ key, id: parseInt(key.split("_")[1]) - 1 });
    }
  });

  for (let i = 0; i < ids.length; i++) {
    const url = await uploadFile(formattedData.slug, data.value[ids[i].key]);

    console.log("ids sel", ids[i]);

    if (ids[i].key.includes("pz")) formattedData.prizes[ids[i].id].asset = url;
    else if (ids[i].key.includes("spk"))
      formattedData.speaker[ids[i].id].image = url;
  }

  const url = await uploadFile(formattedData.slug, data.value.eventCoverUpload);
  formattedData.eventCover = url;

  postEvent(formattedData);
}

function incStep() {
  if (stepnumber.value < 5) stepnumber.value++;
}

function decStep() {
  if (stepnumber.value > 1) stepnumber.value--;
}

const resetForm = () => {
  if (confirm("Are you sure you want to reset the Form?")) {
    localStorage.setItem("data", "");
    data.value = { eventCoverUpload: [] };
  }
};

const removeInput = (toDel: string, fields: string[], id: number) => {
  fields.map((field) => {
    delete data.value[`${toDel}_${field}_${id}`];
  });
};

const saveInterval = window.setInterval(saveToLocal, 1000);

watch(
  data,
  (currentValue, _oldValue) => {
    try {
      if (
        currentValue.eventCoverUpload !== undefined &&
        currentValue.eventCoverUpload.length > 0
      ) {
        const reader = new FileReader();
        reader.readAsDataURL(currentValue.eventCoverUpload[0].file);

        reader.onload = function (e) {
          imageSource.value = reader.result;
        };
      } else {
        imageSource.value = "";
        imageAlt.value = "";
      }
    } catch (err) {
      console.log(err);
      imageAlt.value =
        "Error loading the image (image may get uploaded successfully)";
    }
  },
  { deep: true },
);

onUnmounted(() => {
  window.clearInterval(saveInterval);
});
</script>

<template>
  <div class="form-container">
    <div class="form">
      <div class="heading">
        <h1>Create Event</h1>
        <div class="close" @click="props.toggleCreate">X</div>
      </div>
      <FormKit type="form" v-model="data" :actions="false" @submit="submitForm">
        <section v-show="stepnumber == 1">
          <Step1 />
          <img id="test" :src="imageSource" :alt="imageAlt" />
        </section>
        <section v-show="stepnumber == 2">
          <Step2 />
        </section>

        <section v-show="stepnumber == 3">
          <Step3 :remove="removeInput" />
        </section>
        <section v-show="stepnumber == 4">
          <Step4 :remove="removeInput" />
        </section>
        <section v-show="stepnumber == 5">
          <Step5 :remove="removeInput" />
        </section>

        <div class="actions">
          <FormKit
            type="button"
            @click="decStep"
            v-if="stepnumber != 1"
            :classes="{
              wrapper: { $reset: true },
              outer: { $reset: true },
              inner: { $reset: true },
              input: { $reset: true },
            }"
            wrapper-class="form-button"
            input-class="button"
          >
            Previous
          </FormKit>
          <FormKit
            type="button"
            @click="incStep"
            v-if="stepnumber < 5"
            :classes="{
              wrapper: { $reset: true },
              outer: { $reset: true },
              inner: { $reset: true },
              input: { $reset: true },
            }"
            outer-class="next-button"
            input-class="button"
          >
            Next
          </FormKit>
          <FormKit
            type="submit"
            label="Submit"
            v-if="stepnumber === 5"
            :classes="{
              wrapper: { $reset: true },
              outer: { $reset: true },
              inner: { $reset: true },
              input: { $reset: true },
            }"
            input-class="button"
          />
        </div>

        <FormKit
          type="button"
          @click="resetForm"
          label="Reset Form"
          :classes="{
            wrapper: { $reset: true },
            outer: { $reset: true },
            inner: { $reset: true },
            input: { $reset: true },
          }"
          :style="{ margin: 'auto' }"
          input-class="button"
        />
      </FormKit>

      <pre wrap>{{ data }}</pre>
    </div>
  </div>
  <div class="background" @click="props.toggleCreate"></div>
</template>
<style scoped>
.background {
  z-index: 10;
  position: fixed;

  inset: 0;

  background-color: rgba(0, 0, 0, 0.5);
}
.form-container {
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;

  height: 100vh;
  width: 100vw;

  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 15;
}

.form {
  pointer-events: all;
  width: clamp(576px, 30%, 90vw);
  background: var(--bg-color);
  padding: 3rem;
  border-radius: 3rem;
  max-height: 80vh;
  overflow-y: auto;
}

@media only screen and (max-width: 768px) {
  .form {
    padding: 1rem;
    border-radius: 1rem;
    margin: 0.5rem;
  }
}

section {
  margin-top: 2rem;
}

.heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.heading > .close {
  cursor: pointer;
}

.actions {
  /* width: 100%; */
  display: flex;
  align-items: center;
  justify-content: space-between;
}

img {
  max-width: 30vw;
  object-fit: contain;
}
</style>
