import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import bingoStore from "./store/bingoStore.js";

const app = createApp(App)
    .use(bingoStore);

app.mount('#app');

const html = document.querySelector('html');
html.style.visibility = 'visible';