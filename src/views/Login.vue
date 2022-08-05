<script setup lang="ts">
import { ref } from "vue";
import { login } from "../utils/api";

const data = ref<any>({});
const loginUser = () => {
  login(data.value);
};
</script>
<template>
  <div class="login">
    <FormKit type="group" v-model="data">
      <h2>Login</h2>
      <FormKit
        type="email"
        label="Email address"
        name="email"
        validation="required"
        placeholder="technical@srmkzilla.net"
      />
      <FormKit
        type="password"
        name="password"
        label="Password"
        validation="required"
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
</template>
<style scoped>
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
</style>
