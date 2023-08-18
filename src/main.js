import { setBaseUrl } from '@/use/api.js'
import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router.js'

const container = document.getElementById('uchi-widget')

if (container != null) {
  const baseUrl = window.uchiWidget.baseUrl
  setBaseUrl(baseUrl)

  const link = document.createElement('link')
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('type', 'text/css')
  link.setAttribute('href', window.uchiWidget.cdnBaseUrl + '/uchi-widget.css')
  document.getElementsByTagName('head')[0].appendChild(link)

  const app = createApp(App)

  app.provide('searchEnabled', window.uchiWidget.searchEnabled ?? false);

  app.use(router)
  app.mount(container)

} else {
  console.error('Uchi.pro widget: контейнер не найден.')
}
