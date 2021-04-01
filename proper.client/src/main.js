// @ts-ignore
import Datepicker from 'vue3-datepicker'
import App from './App.vue'
import { createApp } from 'vue'
import { registerGlobalComponents } from './registerGlobalComponents'
import router from './router'
import bootstrap from 'bootstrap'
import jquery from 'jquery'
import popper from 'popper.js'
import VueMq from 'vue3-mq'

const root = createApp(App)
registerGlobalComponents(root)

root.use(VueMq, {
  breakpoints: { // default breakpoints - customize this
    mobile: 450,
    tablet: 1250,
    desktop: Infinity
  }
})

root.component('Datepicker', Datepicker)
root
  .use(router, bootstrap, jquery, popper)
  .mount('#app')
