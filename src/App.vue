<template>
  <div v-if="coursesFetched">

    <div class="row">
      <div class="col">

        <div v-if="tree">
          <div v-for="topCourse in topLevelCourses" :key="topCourse.id">
            <h3 @click="toggle(topCourse)">
              <span v-text="expanded[topCourse.id] ? '-' : '+'"></span>
              {{ topCourse.title }} ({{ topCourse.children.length }} {{ plural(topCourse.children.length, 'курс', 'курса', 'курсов') }})
            </h3>
            <div v-if="expanded[topCourse.id]" v-for="course in topCourse.children" :key="course.id">
              <div class="table">
                <div class="table__title">{{ course.title }}</div>
                <div class="table__price">{{ formatPrice(course.price) }}</div>
                <div class="table__add">
                  <button v-if="inCart(course)"
                          @click="removeFromCart(course)"
                          class="button button_in-сart">
                    из корзины
                  </button>
                  <button v-else
                          @click="addToCart(course)"
                          class="button">
                    в корзину
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div v-for="course in courses" :key="course.id">
            <div class="table">
              <div class="table__title">{{ course.title }}</div>
              <div class="table__price">{{ formatPrice(course.price) }}</div>
              <div class="table__add">
                <button v-if="inCart(course)"
                        @click="removeFromCart(course)"
                        class="button button_in-сart">
                  из корзины
                </button>
                <button v-else
                        @click="addToCart(course)"
                        class="button">
                  в корзину
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="inCartCoursesCount > 0">
          <h3>Корзина ({{ inCartCoursesCount }})</h3>

          <div v-for="item in cart" :key="item.course.id">
            <div>
              {{ item.course.title }}: {{ formatPrice(item.course.price) }} <span @click="removeFromCart(item.course)">X</span>
            </div>
          </div>

          <div>
            Итого: {{ formatPrice(cartTotal) }}
          </div>

          <div>
            <form :action="baseUrl + '/orders-widget'" method="post" target="_blank">

              <div v-for="item in cart" :key="item.course.id">
                <input type="hidden" name="courses-uuids" :value="item.course.id">
              </div>

              <button type="submit" class="button_buy" @click="clearCart">Заказать!</button>
            </form>
          </div>
        </div>
      </div>

      <div class="col">
        <pre>{{ JSON.stringify(response, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    const data = {}

    data.expanded = {}

    data.tree = false

    return data;
  },
  created () {
    this.courses.forEach(course => {
      if (course.children.length > 0) {
        this.tree = true
      }
    })
  },
  methods: {
    toggle (course) {
      this.$set(this.expanded, course.id, !this.expanded[course.id])
    },
    addToCart (course, quantity) {
      this.$root.addToCart(course, quantity)
    },
    removeFromCart (course) {
      this.$root.removeFromCart(course)
    },
    inCart (course) {
      return this.$root.inCart(course)
    },
    clearCart() {
      this.$root.clearCart()
    },
  },
  computed: {
    response () {
      return this.$root.$data.response
    },
    coursesFetched () {
      return this.$root.$data.coursesFetched
    },
    courses () {
      return this.$root.$data.courses
    },
    cart () {
      return this.$root.$data.cart
    },
    topLevelCourses () {
      return this.$root.$data.courses
        .filter(course => (course.parentId === this.rootId) && course.children.length > 0)
    },
    inCartCourses () {
      return this.$root.$data.cart
        .map(cartItem => cartItem.course)
    },
    inCartCoursesCount () {
      return this.inCartCourses.length
    },
    cartTotal () {
      return this.inCartCourses
        .reduce((total, course) => total + parseInt(course.price || 0), 0)
    },
  },
}
</script>

<style scoped>
  .row {
    display: flex;
  }
  .col {
    width: 50%;
  }

  .table {
    display: flex;
    padding: 10px;
    border-top: 1px solid gray;
  }
  .table__title {
    width: 50%;
  }
  .table__price {
    width: 25%;
    text-align: right;
    padding-right: 30px;
  }
  .table__add {
    width: 25%;
  }

  .button_in-сart{
    opacity: 0.5;
  }

  .button_buy {
    background: #47ff69;
    padding: 10px;
    margin-top: 10px;
  }
</style>