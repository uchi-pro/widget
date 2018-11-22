<template>
    <div class="uchi-themes">
        <div v-for="theme in topLevelThemes" :key="theme.id" class="uchi-theme">
            <div class="uchi-theme__image">
                <router-link :to="{ name: 'theme_view', params: { id: theme.id }}">

                    <span class="uchi-theme__count">
                        {{ theme.children.length }}
                        <span>
                            {{ plural(theme.children.length, 'курс', 'курса', 'курсов') }}
                        </span>
                    </span>

                    <img v-if="theme.imageUrl" :src="theme.imageUrl" :alt="theme.title">

                </router-link>
            </div>
            <div class="uchi-theme__title">
                <router-link :to="{ name: 'theme_view', params: { id: theme.id }}">{{ theme.title }}</router-link>
            </div>

            <div v-if="theme.description" class="uchi-theme__description" v-html="theme.description"></div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    const data = {}

    data.expanded = {}

    return data;
  },
  computed: {
    topLevelThemes () {
      return this.$root.$data.courses
        .filter(course => (course.parentId === this.rootId) && course.children.length > 0)
    },
  }
}
</script>

<style lang="scss">
    .uchi-themes {
        display: flex;
        margin-left: -30px;
        margin-right: -30px;
        flex-wrap: wrap;
    }
    .uchi-theme {
        display: flex;
        flex-direction: column;
        padding: 30px;
        width: 330px;

        &__image {
            position: relative;
            overflow: hidden;
            height: 160px;
            background-color: #fff;

            a {
                display: block;
                height: 100%;
            }

            img {
                width: 100%;
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

        &__description {

        }
    }
</style>
