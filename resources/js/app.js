import './bootstrap';

import { createApp } from "vue";
import App from "../src/App.vue";

const app = createApp({
    components: {
        App
    }
})

createApp(App).mount("#app");
