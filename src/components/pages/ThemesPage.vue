<script setup>
import { getTopLevelThemes } from '@/use/courses.js'
import ThemesCard from '@/components/blocks/ThemesCard.vue'
const topLevelThemes = getTopLevelThemes()
</script>

<template>
  <themes-card  v-if="topLevelThemes.length > 0" :themes="topLevelThemes" />
  <p v-else>
    Нет доступных курсов.
  </p>
</template>
