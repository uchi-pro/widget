<script setup>
import { formatPrice } from '@/use/formatters.js'
import { useRoute } from 'vue-router'
import { getCourseById, getThemeById } from '@/use/courses.js'
import { addToCart, removeFromCart, inCart } from '@/use/cart.js'
import { inject } from 'vue'

const route = useRoute()
const id = route.params.id
const course = getCourseById(id)
const theme = getThemeById(course.parentId)

const academicPlanEnabled = inject('academicPlanEnabled')
</script>

<template>
  <template v-if="course">
    <div class="uchi__back">
      <router-link v-if="theme" :to="{ name: 'theme_view', params: { id: theme.id } }">&larr; Вернуться к списку курсов направления</router-link>
      <router-link v-else :to="{ name: 'theme_list' }">&larr; Вернуться к списку всех направлений</router-link>
    </div>

    <h1 v-if="theme">Учебный курс по направлению «{{ theme.title }}»</h1>
    <h1 v-else>Учебный курс</h1>

    <div class="uchi-course__title-wrapper">
      <div class="uchi-course__title-label">Название курса:</div>
      <div class="uchi-course__title">
        {{ course.title }}
      </div>
    </div>

    <div class="uchi-course__price">
      Стоимость: {{ !course.createLead ? formatPrice(course.price) : 'по&nbsp;запросу' }}
    </div>

    <div v-html="course.description" class="uchi-course__description"></div>

    <div>
      <button v-if="inCart(course)"
              @click="removeFromCart(course)"
              class="uchi-cart-button uchi-cart-button_in-cart btn btn-primary button">
        в корзине
      </button>
      <button v-else
              @click="addToCart(course)"
              class="uchi-cart-button btn btn-primary button">
        в корзину
      </button>

      &nbsp;<router-link v-if="inCart(course)" :to="{ name: 'cart' }">Перейти в корзину</router-link>
    </div>

    <div v-if="academicPlanEnabled && course.academicPlan && course.academicPlan.length" class="uchi-course__academic-plan-wrapper">
      <h3>Учебный план</h3>

      <table class="uchi-course__academic-plan">
        <thead>
          <tr>
            <th>Название</th>
            <th>Часы</th>
            <th>Вид занятий</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in course.academicPlan" :key="item.id">
            <td>{{ item.title }}</td>
            <td>{{ item.hours > 0 ? item.hours : '—' }}</td>
            <td>{{ item.type }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  <p v-else>Курс не найден.</p>
</template>

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

  &__academic-plan-wrapper {
    margin-top: 1rem;
  }

  &__academic-plan {
    border-collapse: collapse;

    table, th, td {
      border: 1px solid black;
    }

    th {
      text-align: left;
    }

    th, td {
      padding: 0.5rem 1rem;
    }
  }
}
</style>
