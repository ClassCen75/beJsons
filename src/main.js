import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import storage from './utils/storage';
import store from './store';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { createI18n } from 'vue-i18n';
import { message } from './utils/i18n/index.js';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/src/dark/css-vars.scss';
import './assets/style/global.scss';

library.add(fas);

const i18n = createI18n({
  legacy: false,
  locale: 'en', // 设置初始语言
  messages: message
});

// console.log(import.meta.env);
const app = createApp(App);
app.config.globalProperties.$storage = storage;
app.component('fa-icon', FontAwesomeIcon);
app.use(store).use(ElementPlus).use(i18n).use(router).mount('#oEasyData');
