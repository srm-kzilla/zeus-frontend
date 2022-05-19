import { ref } from "vue";

export const isAuth = ref(!!localStorage.getItem("token"));

export function updateAuth(value: boolean) {
  isAuth.value = value;
}
