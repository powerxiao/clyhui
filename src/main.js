// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import listFilterTest from './listFilterTest'
import clbet from './index.js';
Vue.config.productionTip = false
Vue.use(clbet);
/* eslint-disable no-new */
const NotFound = { template: '<p>Page not found</p>' }
const routes = {
  '/index': listFilterTest
}
new Vue({
  el: '#app',
  computed: {
    ViewComponent () {
      return routes['/index'] || NotFound
    }
  },
  render (h) { return h(this.ViewComponent) }
})
