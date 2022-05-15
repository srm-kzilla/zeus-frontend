<script setup lang="ts">
import { defineProps, reactive } from "vue";
import { Step1, Step2, Step3, Step4, Step5 } from "./Steps";
import { ref } from "vue";
import uploadFile from "../../utils/fileUpload";
import formatData from "../../utils/formatData";
import { postEvent } from "../../utils/api";
import { setErrors } from "@formkit/vue";

const props = defineProps({
  toggleCreate: null,
});

const data = ref<any>({});
const complete = ref(false);

const stepnumber = ref(1);
const submitForm = () => {
  const url = uploadFile(data.value.eventCover);
  const formattedData = formatData(data.value);
  postEvent(formattedData);
};

function incStep() {
  stepnumber.value++;
}

function decStep() {
  stepnumber.value--;
}
</script>

<template>
  <div class="form-container">
    <div class="form">
      <div class="heading">
        <h1>Create Event</h1>
        <div class="close" @click="props.toggleCreate">X</div>
      </div>
      {{ stepnumber }}
      <FormKit type="form" v-model="data" :actions="false" @submit="submitForm">
        <section v-show="stepnumber == 1">
          <Step1 />
        </section>
        <section v-show="stepnumber == 2">
          <Step2 />
        </section>
        <section v-show="stepnumber == 3">
          <Step3 />
        </section>
        <section v-show="stepnumber == 4">
          <Step4 />
        </section>
        <section v-show="stepnumber == 5">
          <Step5 />
        </section>

        <FormKit type="submit" label="Submit" v-if="stepnumber === 5" />
      </FormKit>
      <div class="actions">
        <button @click="decStep" v-if="stepnumber !== 1">Back</button>

        <button @click="incStep" v-if="stepnumber !== 5">Next</button>
      </div>
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

  height: 100vh;
  width: 100vw;

  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 15;
}

.form {
  pointer-events: all;
  background: var(--bg-color);
  min-width: 576px;
  padding: 3rem;
  border-radius: 3rem;
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
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
