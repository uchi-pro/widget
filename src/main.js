/* eslint-disable no-console */
import Vue from 'vue'
import App from './App.vue'

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
          token: token,
          courses: [],
          tree: false,
          response: null,
          cart: [],
        }
      },
      created () {
        this.fetchCourses()
      },
      methods: {
        fetchCourses () {
          return fetch(`${this.baseUrl}/orders-widget/courses?token=${this.token}`, { headers: { 'Accept': 'application/json' } })
            .then(response => response.json())
            .then(data => {
              this.response = JSON.parse(JSON.stringify(data))
              return data
            })
            .then(data => data.Courses)
            .then(fetchedCourses => {

              this.courses = fetchedCourses.map(course => {
                if (course.parent_uuid !== '00000000-0000-0000-0000-000000000000') {
                  this.tree = true
                }
                course.children = fetchedCourses.filter(c => c.parent_uuid === course.uuid)

                return course
              })

              this.restoreCartFromStorage()
            })
            .catch(e => {
              console.error('Uchi.pro widget: не удалось получить данные курсов.');
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
        clearCart() {
          this.cart = []

          this.saveCartToStorage()
        },
        inCart (course) {
          return ~this.cart.findIndex(item => item.course === course)
        },
        saveCartToStorage () {

          const stamp = this.cart.map(
            item => {
              return {
                quantity: item.quantity,
                uuid: item.course.uuid,
              }
            })

          localStorage.setItem('uchi-widget:cart', JSON.stringify(stamp))
        },
        restoreCartFromStorage () {
          const json = localStorage.getItem('uchi-widget:cart')

          try {
            const stamp = JSON.parse(json)

            stamp.forEach(value => {
              const course = this.courses.find(course => course.uuid === value.uuid)

              if (course) {
                this.addToCart(course, value.quantity)
              }
            })
          } catch (e) {

          }
        },
        formatPrice (value) {
          value = value || 0

          let val = (value/1).toFixed(0).replace(' ')
          return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' руб.'
        },
        plural (number, one, two, five) {
          let n = Math.abs(number);
          n %= 100;
          if (n >= 5 && n <= 20) {
            return five;
          }
          n %= 10;
          if (n === 1) {
            return one;
          }
          if (n >= 2 && n <= 4) {
            return two;
          }
          return five;
        },
      }
    })

    new Vue({
      el: container,
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