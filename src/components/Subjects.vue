<template>
    <div>
        <div v-for="subject in topLevelCourses" :key="subject.id">
            <router-link :to="{ name: 'subject_view', params: { id: subject.id }}">{{ subject.title }}</router-link>
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
    topLevelCourses () {
      return this.$root.$data.courses
        .filter(course => (course.parentId === this.rootId) && course.children.length > 0)
    },
  }
}
</script>