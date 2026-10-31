import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// 1. Tailwind CSS first
import "./assets/css/tailwind.css";

// 2. Custom SCSS second
import "./assets/scss/main.scss";

const app = createApp(App);
app.use(router);
app.mount("#app");
