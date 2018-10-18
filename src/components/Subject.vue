<template>
    <div>

        <router-link :to="{ name: 'subject_list' }">Все курсы</router-link>

        <h1>{{ subject.title }}</h1>

        <div v-for="course in subject.children" :key="course.id">
            <div class="table">
                <div class="table__title"><router-link :to="{ name: 'course_view', params: { id: course.id } }">{{ course.title }}</router-link></div>
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
</template>

<script>
export default {
  data () {
    const data = {}

    data.id = this.$route.params.id

    return data;
  },
  methods: {
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
    subject () {
      return this.$root.$data.courses.filter(course => course.id === this.id)[0] || null
    }
  }
}
</script>