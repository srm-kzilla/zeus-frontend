<script setup lang="ts">
import { ref } from "vue";
import { sandesh_login } from "../utils/api";
import Close from "./shared/Close.vue";

const data = ref<any>({});
interface Props {
  toggleModal: () => void;
}

const { toggleModal } = defineProps<Props>();
const loginUser = () => {
  sandesh_login(data.value);
};
</script>
<template>
  <div class="form-container">
    <div class="form">
      <div class="heading">
        <h1>Login to Sandesh</h1>
        <div class="close" @click="toggleModal">
          <Close />
        </div>
      </div>
      <div class="login">
        <FormKit type="group" v-model="data">
          <FormKit
            type="email"
            label="Email address"
            name="email"
            validation="required"
            validation-visibility="live"
            placeholder="vikas@school.edu"
          />
          <FormKit
            type="password"
            name="password"
            label="Password"
            validation="required"
            validation-visibility="live"
          />
          <FormKit
            type="button"
            @click="loginUser"
            label="Submit"
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
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  border-radius: 1rem;
  max-height: 80vh;
  overflow-y: auto;
  /* background-color: #fff; */
  box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.3);
}
.heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.heading > .close {
  cursor: pointer;
  transition: all 150ms ease-out;
}
.close:hover {
  transform: scale(1.1);
}
.login {
  border-radius: 2rem;
  padding: 2rem;
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 0;
  justify-content: center;

  border: 4px solid var(--accent-color);

  max-width: 576px;
}
@media only screen and (max-width: 768px) {
  .form {
    padding: 1rem;
    border-radius: 1rem;
    margin: 0.5rem;
  }
}
</style>
