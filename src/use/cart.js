import { computed, ref } from 'vue'
import { getCourseById } from '@/use/courses.js'

const storageKey = 'uchi-widget:cart'

export const cart = ref([])
export const isCartOpened = ref(false)

export function addToCart (course, quantity) {
  if (!inCart(course)) {
    cart.value.push({
      quantity: quantity ?? 1,
      course: course
    })
  }

  saveCartToStorage()
  openCart()
}

export function removeFromCart (course) {
  const itemIndex = cart.value.findIndex(item => item.course.id === course.id)
  if (itemIndex !== -1) {
    cart.value.splice(itemIndex, 1)
  }

  saveCartToStorage()
}

export function inCart (course) {
  return cart.value.findIndex(item => item.course.id === course.id) !== -1
}

export function clearCart () {
  setTimeout(() => {
    cart.value = []
    saveCartToStorage()
  }, 0)
}

export function saveCartToStorage () {
  const stamp = cart.value.map(
    item => {
      return {
        quantity: item.quantity,
        id: item.course.id,
      }
    })

  localStorage.setItem(storageKey, JSON.stringify(stamp))
}

export function restoreCartFromStorage () {
  const json = localStorage.getItem(storageKey)

  if (json) {
    try {
      const stamp = JSON.parse(json)

      stamp.forEach(value => {
        const course = getCourseById(value.id)

        if (course) {
          addToCart(course, value.quantity)
        }
      })
    } catch (error) {
      console.error('Uchi.pro widget: не удалось восстановить содержимое корзины: ', error)
    }
  }
}

export function openCart () {
  isCartOpened.value = true
}

export function closeCart () {
  isCartOpened.value = false
}

export function toggleCart () {
  if (isCartOpened.value) {
    closeCart()
  } else {
    openCart()
  }
}

export const inCartCourses = computed(() => {
  return cart.value.map(cartItem => cartItem.course)
})

export const inCartCoursesCount = computed(() => {
  return inCartCourses.value.length
})

export const inCartCoursesTotal = computed(() => {
  return inCartCourses.value.reduce((total, course) => total + parseInt(course.price ?? 0), 0)
})
