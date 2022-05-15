import "@formkit/themes/genesis";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./styles/global.css";
import { plugin, defaultConfig } from "@formkit/vue";

createApp(App).use(plugin, defaultConfig).use(router).mount("#app");
