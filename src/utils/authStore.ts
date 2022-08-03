import { ref } from "vue";

export const isAuth = ref(!!localStorage.getItem("token"));

export function updateAuth(value: boolean) {
  isAuth.value = value;
}
export const isSandeshAuth = ref(!!localStorage.getItem("sandesh-token"));

export function updateSandeshAuth(value: boolean) {
  isSandeshAuth.value = value;
}
