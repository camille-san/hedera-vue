import {createApp} from 'vue'
import App from './App.vue'
import Toast, {POSITION} from "vue-toastification";
import Datepicker from '@vuepic/vue-datepicker';

import './style.css'
import 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js'
import "vue-toastification/dist/index.css";
import '@vuepic/vue-datepicker/dist/main.css'

const options = {
    position: POSITION.TOP_CENTER,
    timeout: 2000
};

createApp(App)
    .use(Toast, options)
    .component('Datepicker', Datepicker)
    .mount('#app')
