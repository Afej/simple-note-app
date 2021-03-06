import Vue from 'vue'
import App from './App.vue'

import wysiwyg from "vue-wysiwyg";
import CKEditor from '@ckeditor/ckeditor5-vue';

import '@/assets/css/tailwind.css'

Vue.use(wysiwyg, {});
Vue.use(CKEditor);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
