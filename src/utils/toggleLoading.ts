import { ref } from "vue";

export const loading = ref(false);

export function updateLoading(value: boolean) {
  console.log("loading", loading.value);
  loading.value = value;
}
