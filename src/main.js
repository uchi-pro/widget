/* eslint-disable no-console */
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Helpers from './mixins/helpers'

Vue.config.productionTip = false

Vue.use(VueRouter)

const container = document.getElementById('uchi-widget');

console.log(45646456);

if (container != null) {

  const baseUrl = window.uchiWidget.baseUrl
  const token = window.uchiWidget.token

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

    const routes = [
      { name: 'subject_list', path: '/', component: require('./components/Subjects').default },
      { name: 'subject_view', path: '/subjects/:id', component: require('./components/Subject').default },
      { name: 'course_view', path: '/courses/:id', component: require('./components/Course').default },
      { name: 'cart', path: '/cart', component: require('./components/Cart').default },
    ]

    const router = new VueRouter({
      routes
    })

    new Vue({
      el: container,
      router,
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
            return fetch(`${this.baseUrl}/orders-widget/courses?token-api=${this.token}`,
              {
                // method: 'post',
                headers: { 'Accept': 'application/json' },
                // body: `token-api=${this.token}`
              })
              .then(response => {
                resolve(response.json())
              })

            // return resolve(require('./fake-courses'))
          })
        },
        fetchCourses () {
          return this.fetchWidgetData()
            .then(data => {
              this.response = JSON.parse(JSON.stringify(data))
              console.log(JSON.parse(JSON.stringify(data)));
              return data
            })
            .then(data => data.courses || [])
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
  console.error('Uchi.pro widget: контейнер не найден.');
}