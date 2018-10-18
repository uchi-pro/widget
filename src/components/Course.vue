<template>
    <div>

        <router-link :to="{ name: 'subject_list' }">Все курсы</router-link>

        <h1>{{ course.title }}</h1>

        <div>
            {{ subject.title }}
        </div>

        <div>
            {{ formatPrice(course.price) }} руб.
        </div>

        <div v-html="course.description"></div>

        <div>
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
  },
  computed: {
    course () {
      return this.$root.$data.courses.filter(course => course.id === this.id)[0] || null
    },
    subject () {
      return this.course ? this.$root.$data.courses.filter(course => course.id === this.course.parentId)[0] || null : null
    }
  }
}
</script>