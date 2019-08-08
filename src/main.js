'use strict'

import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Helpers from './mixins/helpers'

Vue.config.productionTip = false

Vue.use(VueRouter)

const container = document.getElementById('uchi-widget')

if (container != null) {
  const baseUrl = window.uchiWidget.baseUrl
  const token = window.uchiWidget.token

  if (token != null) {
    const link = document.createElement('link')
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('type', 'text/css')
    link.setAttribute('href', window.uchiWidget.cdnBaseUrl + '/uchi-widget.css')
    document.getElementsByTagName('head')[0].appendChild(link)

    Vue.mixin({
      data: function () {
        return {
          baseUrl: baseUrl,
          rootId: '00000000-0000-0000-0000-000000000000',
        }
      },
      methods: Helpers
    })

    const routes = [
      { name: 'theme_list', path: '/', component: require('./components/Themes').default },
      { name: 'theme_view', path: '/themes/:id', component: require('./components/Theme').default },
      { name: 'course_view', path: '/courses/:id', component: require('./components/Course').default },
      { name: 'cart', path: '/cart', component: require('./components/Cart').default },
    ]

    const router = new VueRouter({
      routes
    })

    // eslint-disable-next-line no-new
    new Vue({
      el: container,
      router,
      data: {
        coursesFetched: false,
        token: token,
        storageKey: 'uchi-widget:cart',
        courses: [],
        cart: [],
        isCartOpened: false,
      },
      created () {
        this
          .fetchCourses()
          .then(() => {
            this.coursesFetched = true

            this.restoreCartFromStorage()
          })
      },
      methods: {
        fetchWidgetData () {
          return new Promise((resolve) => {
            return fetch(`${this.baseUrl}/orders-widget/courses?token-api=${this.token}`,
              {
                headers: { 'Accept': 'application/json' },
              })
              .then(response => {
                resolve(response.json())
              })
              .catch(error => {
                container.innerText = 'Не удалось получить список курсов. Попробуйте зайти позже.'
                console.error('Uchi.pro widget: не удалось получить список курсов:', error)
              })
          })
        },
        fetchCourses () {
          return this.fetchWidgetData()
            .then(data => {
              return data
            })
            .then(data => data.courses || [])
            .then(fetchedCourses => {
              const coursesPlainList = fetchedCourses.map(fetchedCourse => {
                return {
                  id: fetchedCourse.uuid,
                  title: fetchedCourse.title,
                  imageUrl: fetchedCourse.img_url,
                  description: fetchedCourse.description,
                  parentId: fetchedCourse.parent_uuid,
                  price: fetchedCourse.price,
                }
              })

              this.courses = coursesPlainList.map(course => {
                course.children = coursesPlainList.filter(c => c.parentId === course.id)
                return course
              })
            })
            .catch(error => {
              console.error('Uchi.pro widget: не удалось получить данные курсов:', error)
            })
        },
        addToCart (course, quantity) {
          if (!this.inCart(course)) {
            this.cart.push({
              quantity: quantity || 1,
              course: course
            })
          }

          this.saveCartToStorage()

          this.isCartOpened = true
        },
        removeFromCart (course) {
          const itemIndex = this.cart.findIndex(item => item.course === course)
          if (itemIndex !== -1) {
            this.cart.splice(itemIndex, 1)
          }

          this.saveCartToStorage()
        },
        inCart (course) {
          return this.cart.findIndex(item => item.course.id === course.id) !== -1
        },
        clearCart () {
          this.cart = []

          this.saveCartToStorage()
        },
        saveCartToStorage () {
          const stamp = this.cart.map(
            item => {
              return {
                quantity: item.quantity,
                id: item.course.id,
              }
            })

          localStorage.setItem(this.storageKey, JSON.stringify(stamp))
        },
        restoreCartFromStorage () {
          const json = localStorage.getItem(this.storageKey)

          if (json) {
            try {
              const stamp = JSON.parse(json)

              stamp.forEach(value => {
                const course = this.courses.find(
                  course => course.id === value.id)

                if (course) {
                  this.addToCart(course, value.quantity)
                }
              })
            } catch (error) {
              console.error('Uchi.pro widget:', error)
            }
          }
        },
        openCart () {
          this.isCartOpened = true
        },
        closeCart () {
          this.isCartOpened = false
        }
      },
      render: function (createElement) {
        return createElement(App)
      }
    })
  } else {
    console.error('Uchi.pro widget: токен не указан.')
  }
} else {
  console.error('Uchi.pro widget: контейнер не найден.')
}
