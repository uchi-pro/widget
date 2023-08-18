<script setup>
import { defineProps } from 'vue'
import { formatPrice } from '@/use/formatters.js'
import { addToCart, inCart, removeFromCart } from '@/use/cart.js'
import { getThemeById } from '@/use/courses.js'

const props = defineProps({
  course: {
    type: Object,
  },
  showTheme: {
    type: Boolean,
    default: () => { return false }
  }
})

const theme = getThemeById(props.course.parentId)
</script>

<template>
  <div class="uchi-course-teaser">
    <div class="uchi-course-teaser__title">
      <router-link :to="{ name: 'course_view', params: { id: course.id } }">{{ course.title }}</router-link>
    </div>
    <div class="uchi-course-teaser__price">
      {{ !course.createLead ? formatPrice(course.price) : 'Стоимость по&nbsp;запросу' }}
    </div>
    <div v-if="showTheme" class="uchi-course-teaser__theme">
      <template v-if="theme">
        {{ theme.title }}
      </template>
    </div>
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
</template>

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

  &__theme {
    width: 250px;
    text-align: center;
  }

  &__cart {
    width: 150px;
    text-align: center;
  }
}
</style>
