<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { searchCourses } from '@/use/courses.js'
import CourseTeaser from '@/components/blocks/CourseTeaser.vue'

const router = useRouter()
const route = useRoute()

const q = ref(route.query['q'] ?? '')

const foundCourses = ref([])

const doSearch = () => {
  if (q.value) {
    foundCourses.value = searchCourses(q.value)
  } else {
    foundCourses.value = null
  }
}
doSearch()

watch(
  () => route.query.q,
  () => {
    q.value = route.query.q ?? ''
    doSearch()
  }
)

const onSearchFormSubmit = (e) => {
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
  <div class="uchi__back">
    <router-link :to="{ name: 'theme_list' }">&larr; Вернуться к списку всех направлений</router-link>
  </div>

  <h1>Поиск</h1>
  <form @submit.prevent="onSearchFormSubmit" class="uchi__search-form">
    <input type="text" :value="q">
    <button type="submit">Найти</button>
  </form>

  <div class="uchi__search-results">
    <template v-if="foundCourses">
      <template v-if="foundCourses.length > 0">
        <div v-for="course in foundCourses" :key="course.id" class="uchi-courses">
          <course-teaser :course="course" :show-theme="true"></course-teaser>
        </div>
      </template>
      <p v-else>По запросу «{{ q }}» курсы не найдены.</p>
    </template>
    <p v-else>Введите запрос.</p>
  </div>
</template>
