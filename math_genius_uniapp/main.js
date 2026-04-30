import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import uviewPlus from 'uview-plus'

// uview-plus theme runtime may call setTabBarStyle on non-tabBar pages.
// Swallow this specific rejected promise to avoid noisy uncaught errors.
const rawSetTabBarStyle = uni.setTabBarStyle
if (typeof rawSetTabBarStyle === 'function') {
  uni.setTabBarStyle = function(options) {
    try {
      const result = rawSetTabBarStyle.call(uni, options)
      if (result && typeof result.catch === 'function') {
        return result.catch(() => {})
      }
      return result
    } catch (e) {
      return Promise.resolve()
    }
  }
}

export function createApp() {
  const app = createSSRApp(App)
  app.use(uviewPlus)
  return {
    app
  }
}
// #endif