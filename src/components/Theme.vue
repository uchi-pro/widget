<template>
    <div>

        <h1>{{ theme.title }}</h1>

        <div v-for="course in theme.children" :key="course.id" class="uchi-courses">
            <div class="uchi-course-teaser">
                <div class="uchi-course-teaser__title"><router-link :to="{ name: 'course_view', params: { id: course.id } }">{{ course.title }}</router-link></div>
                <div class="uchi-course-teaser__price">{{ formatPrice(course.price) }}</div>
                <div class="uchi-course-teaser__cart">
                    <button v-if="inCart(course)"
                            @click="removeFromCart(course)"
                            class="uchi-cart-button uchi-cart-button_in-cart">
                        в корзине
                    </button>
                    <button v-else
                            @click="addToCart(course)"
                            class="uchi-cart-button">
                        в корзину
                    </button>
                </div>
            </div>
        </div>

        <div class="uchi__back">
            <p>
                <router-link :to="{ name: 'theme_list' }">&larr; Вернуться к списку всех направлений</router-link>
            </p>
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
    theme () {
      return this.$root.$data.courses.filter(course => course.id === this.id)[0] || null
    }
  }
}
</script>


<style lang="scss">
    .uchi-course-teaser {
        display: flex;
        padding: 15px 0;
        border-bottom: 1px solid #cccccc;

        &__title {
            flex: 1;
        }

        &__price {
            width: 150px;
            text-align: center;
        }

        &__cart {
            width: 150px;
            text-align: center;
        }
    }
</style>
