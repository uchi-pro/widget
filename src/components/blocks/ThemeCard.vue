<script setup>
import { plural } from '@/use/formatters.js'
import { defineProps, ref } from 'vue'

const props = defineProps({ theme: Object, width: Number })
const theme = ref(props.theme)
</script>

<template>
  <div class="uchi-theme" :style="{width: props.width + 'px'}">
    <div class="uchi-theme__image">
      <router-link :to="{ name: 'theme_view', params: { id: theme.id }}">
          <span class="uchi-theme__count">
            {{ theme.coursesCount }}
            <span>
              {{ plural(theme.coursesCount, 'курс', 'курса', 'курсов') }}
            </span>
          </span>

        <img v-if="theme.image" :src="theme.image" :alt="theme.title">
      </router-link>
    </div>

    <div class="uchi-theme__title">
      <router-link :to="{ name: 'theme_view', params: { id: theme.id }}">{{ theme.title }}</router-link>
    </div>
  </div>
</template>

<style lang="scss">
.uchi-theme {
  display: flex;
  flex-direction: column;
  padding: 30px;
  width: 330px;

  &__image {
    position: relative;
    overflow: hidden;
    aspect-ratio: 3 / 2;
    background-color: #eeeeee;

    a {
      display: block;
      height: 100%;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__count {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: #fff;
    position: absolute;
    top: -16px;
    right: -10px;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    font-weight: 900;
    line-height: 1;
    flex-direction: column;

    span {
      display: block;
      font-size: 11px;
      font-weight: 900;
    }
  }

  &__title {
    margin-left: 8px;
    margin-top: 25px;
    margin-bottom: 10px;

    a {
      font-weight: 700;
      font-size: 21px;
      line-height: 1.2;
      text-decoration: none;
    }
  }
}
</style>
