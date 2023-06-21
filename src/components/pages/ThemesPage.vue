<script setup>
import { getThemeCourses, getTopLevelThemes } from '@/use/courses.js'
import ThemesCard from '@/components/blocks/ThemesCard.vue'
import CourseTeaser from '@/components/blocks/CourseTeaser.vue'

const topLevelThemes = getTopLevelThemes()
const courses = getThemeCourses('00000000-0000-0000-0000-000000000000')

const noCourses = topLevelThemes.length === 0 && courses.length === 0
</script>

<template>
  <themes-card v-if="topLevelThemes.length > 0" :themes="topLevelThemes" />
  <div v-for="course in courses" :key="course.id" class="uchi-courses">
    <course-teaser :course="course"></course-teaser>
  </div>
  <p v-if="noCourses">
    Нет доступных курсов.
  </p>
</template>
