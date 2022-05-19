import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

export default function makeToast(text: string, options?: any) {
  createToast(text, {
    ...options,
    showCloseButton: false,
    // hideProgressBar: true,
    duration: 30000,
  });
}
