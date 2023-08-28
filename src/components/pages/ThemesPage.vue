<script setup>
import { getThemeCourses, getTopLevelThemes } from '@/use/courses.js'
import ThemesCard from '@/components/blocks/ThemesCard.vue'
import CourseTeaser from '@/components/blocks/CourseTeaser.vue'
import { useRouter } from 'vue-router'
import { inject } from 'vue'

const topLevelThemes = getTopLevelThemes()
const courses = getThemeCourses('00000000-0000-0000-0000-000000000000')

const noCourses = topLevelThemes.length === 0 && courses.length === 0

const router = useRouter()

const searchEnabled = inject('searchEnabled')

const onSearchFormSubmit = function (e) {
  const newQ = e.target.querySelector('input').value

  router.push({
    name: 'search',
    query: {
      q: newQ
    },
  })
}
</script>

<template>
  <div v-if="searchEnabled">
    <form @submit.prevent="onSearchFormSubmit" class="uchi__search-form">
      <input type="text" placeholder="Введите название курса">
      <button type="submit" class="uchi-cart-button btn btn-primary button">Поиск</button>
    </form>
  </div>
  <themes-card v-if="topLevelThemes.length > 0" :themes="topLevelThemes" />
  <div v-for="course in courses" :key="course.id" class="uchi-courses">
    <course-teaser :course="course"></course-teaser>
  </div>
  <p v-if="noCourses">
    Нет доступных курсов.
  </p>
</template>
