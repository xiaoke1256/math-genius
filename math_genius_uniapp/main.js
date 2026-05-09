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
import UPopup from 'uview-plus/components/u-popup/u-popup.vue'
import UOverlay from 'uview-plus/components/u-overlay/u-overlay.vue'
import UTransition from 'uview-plus/components/u-transition/u-transition.vue'
import ULine from 'uview-plus/components/u-line/u-line.vue'
import UGap from 'uview-plus/components/u-gap/u-gap.vue'
import USafeBottom from 'uview-plus/components/u-safe-bottom/u-safe-bottom.vue'
import UStatusBar from 'uview-plus/components/u-status-bar/u-status-bar.vue'

/** u-action-sheet 等组件内部的 u-popup / u-overlay 等在部分环境下 easycom 扫不到，手动注册以保证遮罩与显隐正常 */
function registerUviewOverlayKit(app) {
	const kit = [UPopup, UOverlay, UTransition, ULine, UGap, USafeBottom, UStatusBar]
	kit.forEach((comp) => {
		const n = comp?.name
		if (!n) return
		app.component(n, comp)
		const alt = n.replace(/^u-/, 'up-')
		if (alt !== n) app.component(alt, comp)
	})
}

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
  registerUviewOverlayKit(app)
  return {
    app
  }
}
// #endif