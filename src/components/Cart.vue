<template>
    <div>
        <router-link :to="{ name: 'subject_list' }">Все курсы</router-link>

        <div v-if="inCartCoursesCount > 0">

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

                    <input type="hidden" name="token-api" :value="this.$root.$data.token">

                    <button type="submit" class="button_buy" @click="clearCart">Заказать!</button>
                </form>
            </div>
        </div>
        <div v-else>
            Корзина пуста. <router-link :to="{ name: 'subject_list' }">Перейти ко всем курсам</router-link>
        </div>

    </div>
</template>

<script>
export default {
  data () {
    const data = {}

    return data
  },
  methods: {
    removeFromCart (course) {
      this.$root.removeFromCart(course)
    },
    clearCart() {
      this.$root.clearCart()
    },
  },
  computed: {
    cart () {
      return this.$root.$data.cart
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
  }
}
</script>