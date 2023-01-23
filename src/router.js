import { createRouter, createWebHashHistory } from 'vue-router'

import ThemesPage from '@/components/ThemesPage.vue'
import ThemePage from '@/components/ThemePage.vue'
import CoursePage from '@/components/CoursePage.vue'
import CartPage from '@/components/CartPage.vue'

const routes = [
  { name: 'theme_list', path: '/', component: ThemesPage },
  { name: 'theme_view', path: '/themes/:id', component: ThemePage },
  { name: 'course_view', path: '/courses/:id', component: CoursePage },
  { name: 'cart', path: '/cart', component: CartPage },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
