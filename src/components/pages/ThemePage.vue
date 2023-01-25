<script setup>
import { formatPrice } from '@/use/formatters.js'
import { useRoute } from 'vue-router'
import { getThemeById, getThemeSubthemes, getThemeCourses } from '@/use/courses.js'
import ThemesCard from '@/components/blocks/ThemesCard.vue'
import { addToCart, inCart, removeFromCart } from '@/use/cart.js'
import { ref, watch } from 'vue'

const theme = ref({})
const subthemes = ref([])
const courses = ref([])

const prepareData = function (themeId) {
  theme.value = getThemeById(themeId)
  subthemes.value = getThemeSubthemes(themeId)
  courses.value = getThemeCourses(themeId)
}

const route = useRoute()
prepareData(route.params.id)

watch(
  () => route.params.id,
  async newThemeId => {
    prepareData(newThemeId)
  }
)
</script>

<template>
  <template v-if="theme">
    <div class="uchi__back">
      <router-link v-if="theme.isTopLevel" :to="{ name: 'theme_list' }">&larr; Вернуться к списку всех направлений</router-link>
      <router-link v-else :to="{ name: 'theme_view', params: { id: theme.parentId } }">&larr; Вернуться к направлению</router-link>
    </div>

    <h1>{{ theme.title }}</h1>

    <themes-card :themes="subthemes"/>

    <div v-for="course in courses" :key="course.id" class="uchi-courses">
      <div class="uchi-course-teaser">
        <div class="uchi-course-teaser__title">
          <router-link :to="{ name: 'course_view', params: { id: course.id } }">{{ course.title }}</router-link>
        </div>
        <div class="uchi-course-teaser__price">
          {{ !course.createLead ? formatPrice(course.price) : 'Стоимость по&nbsp;запросу' }}
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
    </div>
  </template>
  <p v-else>Направление не найдено.</p>
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

  &__cart {
    width: 150px;
    text-align: center;
  }
}
</style>
