import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '~s'
import vuetify from './plugins/vuetify'
import VueLodash from 'vue-lodash'
import lodash from 'lodash'

Vue.config.productionTip = false
Vue.use(VueLodash, {lodash: lodash})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
