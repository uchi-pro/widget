<script setup>
import { computed, defineProps, ref } from 'vue'
import ThemeCard from '@/components/blocks/ThemeCard.vue'

const props = defineProps({ themes: Array })
const themes = computed(() => props.themes)

const themeCardWidth = ref(330)

const updateWidth = () => {
  const container = document.body.querySelector('#uchi-widget')
  const fitCount = Math.floor(container.clientWidth / 300)
  themeCardWidth.value = (container.clientWidth + 60) / fitCount
}
updateWidth()

addEventListener("resize", () => {
  updateWidth()
});

</script>

<template>
  <div v-if="themes.length > 0" class="uchi-themes">
    <template v-for="theme in themes" :key="theme.id">
      <theme-card :theme="theme" :width="themeCardWidth"/>
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
