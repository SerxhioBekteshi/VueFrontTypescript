import { createApp } from 'vue'
import App from './App.vue'
// import { configureStore } from '@reduxjs/toolkit';
import router from "./router/index";
import PrimeVue from 'primevue/config';
import ToastPlugin, {useToast} from "vue-toast-notification";
import "vue-toast-notification/dist/theme-default.css";
import "primevue/resources/themes/lara-light-indigo/theme.css";     
import "primevue/resources/primevue.min.css";
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '@/assets/styles.scss';
import axiosInit from './initializers/axios';
import Tooltip from 'primevue/tooltip';

// import BootstrapVue3 from 'bootstrap-vue-3'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
// import rootReducer from './reducers';

// const store = configureStore({
//     reducer: rootReducer
//   });

  
createApp(App).use(router)
.use(ToastPlugin, { position: "top" })
.use(PrimeVue, {ripple: true})
.directive('tooltip', Tooltip)
.mount('#app')
await axiosInit(useToast)
