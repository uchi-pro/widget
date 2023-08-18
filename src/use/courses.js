import { fetchWidgetData } from '@/use/api.js'

const rootId = '00000000-0000-0000-0000-000000000000'

let themes = []
let courses = []

const prepareCourse = function (fetchedItem) {
  return {
    id: fetchedItem.uuid,
    parentId: fetchedItem.parent_uuid,
    coursesCount: null,
    isTheme: null,
    isCourse: null,
    title: fetchedItem.title,
    description: fetchedItem.description,
    image: fetchedItem.image,
    hours: fetchedItem.hours,
    price: fetchedItem.price,
    createLead: fetchedItem.shop_settings?.create_leads ?? false,
    lessonsCount: fetchedItem.lessons_count,
    academicPlan: fetchedItem.academic_plan,
  }
}

const calculateCourses = function (items, parentId) {
  if (!parentId) {
    parentId = rootId
  }

  return items.filter(item => item.parentId === parentId).map(item => {
    const children = calculateCourses(items, item.id)
    const childrenCount = children.length

    item.isTheme = item.lessonsCount === 0 && childrenCount > 0
    item.isCourse = item.lessonsCount > 0 && childrenCount === 0

    if (item.isTheme) {
      item.coursesCount = children.reduce((total, item) => {
        return total + (item.isTheme ? item.coursesCount : 0) + (item.isCourse ? 1 : 0)
      }, 0)
      item.isTopLevel = item.parentId === rootId
    }

    return item
  })
}

export function fetchCourses () {
  return fetchWidgetData()
    .then(fetchedItems => {
      let preparedItems = fetchedItems.map(prepareCourse)
      calculateCourses(preparedItems)

      themes = preparedItems.filter(theme => theme.isTheme && theme.coursesCount > 0)
      courses = preparedItems.filter(course => course.isCourse)
    })
}

export function getThemeById (themeId) {
  return themes.filter(course => course.id === themeId)[0] ?? null
}

export function getCourseById (courseId) {
  return courses.filter(course => course.id === courseId)[0] ?? null
}

export function getThemeSubthemes (themeId) {
  return themes.filter(course => course.parentId === themeId)
}

export function getThemeCourses (themeId) {
  return courses.filter(course => course.parentId === themeId)
}

export function getTopLevelThemes () {
  return themes.filter(theme => theme.parentId === rootId)
}

export function searchCourses (q) {
  let preparedQ = q.toLowerCase().trim()
  return courses.filter(course => course.title.toLowerCase().includes(preparedQ))
}
