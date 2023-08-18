import { createRouter, createWebHashHistory } from 'vue-router'

import SearchPage from '@/components/pages/SearchPage.vue'
import ThemesPage from '@/components/pages/ThemesPage.vue'
import ThemePage from '@/components/pages/ThemePage.vue'
import CoursePage from '@/components/pages/CoursePage.vue'
import CartPage from '@/components/pages/CartPage.vue'

const routes = [
  { name: 'search', path: '/search', component: SearchPage },
  { name: 'theme_list', path: '/', component: ThemesPage },
  { name: 'theme_view', path: '/themes/:id', component: ThemePage },
  { name: 'course_view', path: '/courses/:id', component: CoursePage },
  { name: 'cart', path: '/cart', component: CartPage },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from) {
    if (!from.name && to.fullPath === '/') {
      return;
    }
    return {
      el: '#uchi-widget',
      top: 40,
    }
  },
})

export default router
