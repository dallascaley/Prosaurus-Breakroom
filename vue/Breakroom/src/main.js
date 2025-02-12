import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

console.log('anything');
// Application-Level HTTPS Enforcement
if (window.location.protocol === 'http:') {
  console.log('Redirecting to https');
  //window.location.href = window.location.href.replace('http://', 'https://');
  window.location.href = 'https://' + window.location.hostname + window.location.pathname + window.location.search + window.location.hash;
} else {
  console.log('Corret https url');
}

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
