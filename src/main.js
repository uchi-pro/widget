/* eslint-disable no-console */
import Vue from 'vue'
import App from './App.vue'
import Helpers from './mixins/helpers'

Vue.config.productionTip = false

const container = document.getElementById('uchi-widget');

if (container != null) {

  const baseUrl = 'http://uchi.local'
  const token = container.dataset.token || null

  if (token != null) {
    Vue.mixin({
      data: function () {
        return {
          baseUrl: baseUrl,
          rootId: '00000000-0000-0000-0000-000000000000',
        }
      },
      methods: Helpers
    })

    new Vue({
      el: container,
      data: {
        coursesFetched: false,
        token: token,
        storageKey: 'uchi-widget:cart',
        courses: [],
        response: null,
        cart: [],
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
            // return fetch(`${this.baseUrl}/orders-widget/courses?token=${this.token}`, { headers: { 'Accept': 'application/json' } })
            //   .then(response => response.json())

            return resolve(require('./fake-courses'))
          })
        },
        fetchCourses () {
          return this.fetchWidgetData()
            .then(data => {
              this.response = JSON.parse(JSON.stringify(data))
              return data
            })
            .then(data => data.Courses || [])
            .then(fetchedCourses => {

              const coursesPlainList = fetchedCourses.map(fetchedCourse => {
                return {
                  id: fetchedCourse.uuid,
                  title: fetchedCourse.title,
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
            .catch(e => {
              console.error('Uchi.pro widget: не удалось получить данные курсов.');
              console.error(e)
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
        },
        removeFromCart (course) {
          const itemIndex = this.cart.findIndex(item => item.course === course)
          if (itemIndex !== -1) {
            this.cart.splice(itemIndex, 1);
          }

          this.saveCartToStorage()
        },
        inCart (course) {
          return this.cart.findIndex(item => item.course.id == course.id) !== -1
        },
        clearCart() {
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
            } catch (e) {
              console.error(e)
            }
          }
        },
      },
      render: function (createElement) {
        return createElement(App)
      }
    })

  } else {
    console.error('Uchi.pro widget: токен не указан.');
  }
} else {
  console.error('Uchi.pro widget: конейнер не найден.');
}