import { createApp } from 'vue'
import App from './App.vue'
// import { configureStore } from '@reduxjs/toolkit';
import router from "./router/index";
import PrimeVue from 'primevue/config';
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-default.css";
import "primevue/resources/themes/lara-light-indigo/theme.css";     
import "primevue/resources/primevue.min.css";
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
// import rootReducer from './reducers';

// const store = configureStore({
//     reducer: rootReducer
//   });

  
createApp(App).use(router)
.use(ToastPlugin, { position: "top" }).use(PrimeVue, {ripple: true}).mount('#app')
