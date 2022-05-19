import { ref } from "vue";

export const loading = ref(false);

export function updateLoading(value: boolean) {
  loading.value = value;
}
