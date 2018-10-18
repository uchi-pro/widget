<template>
  <div v-if="coursesFetched">

    <div class="row">
      <div class="col">

        <p>
          <router-link :to="{ name: 'cart' }" v-text="cartTitle"></router-link>
        </p>

        <router-view></router-view>
      </div>
      <div class="col">
        <pre>{{ JSON.stringify(response, null, 2) }}</pre>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  computed: {
    response () {
      return this.$root.$data.response
    },
    coursesFetched () {
      return this.$root.$data.coursesFetched
    },
    inCartCourses () {
      return this.$root.$data.cart
        .map(cartItem => cartItem.course)
    },
    inCartCoursesCount () {
      return this.inCartCourses.length
    },
    cartTitle () {
      return this.inCartCoursesCount > 0
        ? `Корзина (${this.inCartCoursesCount})`
        : 'Корзина пуста'
    }
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
</style>