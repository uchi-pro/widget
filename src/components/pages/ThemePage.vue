<script setup>
import { useRoute } from 'vue-router'
import { getThemeById, getThemeSubthemes, getThemeCourses } from '@/use/courses.js'
import ThemesCard from '@/components/blocks/ThemesCard.vue'
import CourseTeaser from '@/components/blocks/CourseTeaser.vue'
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
      <course-teaser :course="course"></course-teaser>
    </div>
  </template>
  <p v-else>Направление не найдено.</p>
</template>
