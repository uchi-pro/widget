<template>
  <div>

    <div class="uchi__back">
      <router-link :to="{ name: 'theme_view', params: { id: theme.id } }">&larr; Вернуться к списку курсов направления</router-link>
    </div>

    <h1>Учебный курс по направлению «{{ theme.title }}»</h1>

    <div class="uchi-course__title-wrapper">
      <div class="uchi-course__title-label">Название курса:</div>
      <div class="uchi-course__title">
        {{ course.title }}
      </div>
    </div>

    <div class="uchi-course__price">
      Стоимость: {{ formatPrice(course.price) }}
    </div>

    <div v-html="course.description" class="uchi-course__description"></div>

    <div>
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

      &nbsp;<router-link v-if="inCart(course)" :to="{ name: 'cart' }">Перейти в корзину</router-link>
    </div>

  </div>
</template>

<script>
  export default {
    data () {
      const data = {}

      data.id = this.$route.params.id

      return data
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
      theme () {
        return this.course ? this.$root.$data.courses.filter(course => course.id === this.course.parentId)[0] || null : null
      }
    }
  }
</script>

<style lang="scss">

  .uchi-course {
    &__title-wrapper {
      margin-bottom: 20px;
    }

    &__price {
      margin-bottom: 20px;
    }

    &__description {
      margin-bottom: 20px;
    }
  }

</style>
