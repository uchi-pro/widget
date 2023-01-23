import { computed, ref } from 'vue'
import { fetchWidgetData } from '@/use/api.js'

function prepareCourse (fetchedCourse) {
  return {
    id: fetchedCourse.uuid,
    parentId: fetchedCourse.parent_uuid,
    title: fetchedCourse.title,
    description: fetchedCourse.description,
    image: fetchedCourse.image,
    hours: fetchedCourse.hours,
    price: fetchedCourse.price,
    lessonsCount: fetchedCourse.lessons_count,
    academicPlan: fetchedCourse.academic_plan,
  }
}

export function fetchCourses () {
  return fetchWidgetData()
    .then(data => data.courses ?? [])
    .then(fetchedCourses => {
      const coursesPlainList = fetchedCourses.map(prepareCourse)

      courses.value = coursesPlainList.map(course => {
        course.children = coursesPlainList.filter(c => c.parentId === course.id)
        return course
      })
    })
    .catch(error => {
      console.error('Uchi.pro widget: не удалось получить данные курсов:', error)
    })
}

export const courses = ref([])

export function getThemeById (id) {
  return courses.value.filter(course => course.id === id)[0] ?? null
}

export function getCourseById (id) {
  return courses.value.filter(course => course.id === id)[0] ?? null
}

const rootId = '00000000-0000-0000-0000-000000000000'

export const topLevelThemes = computed(() => {
  return courses.value
    .filter(course => (course.parentId === rootId) && course.children.length > 0)
})
