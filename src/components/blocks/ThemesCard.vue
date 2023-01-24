<script setup>
import { computed, defineProps } from 'vue'
import ThemeCard from '@/components/blocks/ThemeCard.vue'

const props = defineProps({ themes: Array })
const themes = computed(() => props.themes)
</script>

<template>
  <div v-if="themes.length > 0" class="uchi-themes">
    <template v-for="theme in themes" :key="theme.id">
      <theme-card :theme="theme"/>
    </template>
  </div>
</template>

<style lang="scss">
.uchi-themes {
  display: flex;
  margin-left: -30px;
  margin-right: -30px;
  flex-wrap: wrap;
}
</style>
