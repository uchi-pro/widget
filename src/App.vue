<script setup>
import { ref } from 'vue'
import { fetchCourses } from '@/use/courses.js'
import { plural, formatPrice } from '@/use/formatters.js'
import { restoreCartFromStorage } from '@/use/cart.js'
import { isCartOpened, closeCart, toggleCart, inCartCoursesCount, inCartCoursesTotal } from '@/use/cart.js'

const coursesFetched = ref(false)
const errorMessage = ref('')

fetchCourses()
  .then(() => {
    coursesFetched.value = true
    restoreCartFromStorage()
  })
  .catch(error => {
    console.error('Uchi.pro widget: Не удалось получить список курсов: ', error)
    errorMessage.value = 'Не удалось получить список курсов.'
  })
</script>

<template>
  <p v-if="errorMessage">
    {{ errorMessage }}
  </p>
  <template v-else>
    <div v-if="!coursesFetched">Загрузка курсов...</div>
    <div v-else class="uchi">
      <div class="uchi__body">
        <router-view></router-view>
      </div>

      <div class="uchi-cart" :class="{ 'uchi-cart_opened' : isCartOpened }">
        <a @click="toggleCart()" class="uchi-cart__toggle"
           :title=" isCartOpened ? 'Закрыть корзину' : 'Открыть корзину' ">
          <span>Корзина</span>
        </a>
        <span @click="closeCart()" class="uchi-cart__close" title="Закрыть корзину">&times;</span>
        <div class="uchi-cart__content">

          <div v-if="inCartCoursesCount > 0">
            В Вашей корзине:<br>
            {{ inCartCoursesCount }} {{ plural(inCartCoursesCount, 'курс', 'курса', 'курсов')}}
            на сумму {{ formatPrice(inCartCoursesTotal) }}

            <ul>
              <li>
                <router-link :to="{ name: 'cart' }">Перейти в корзину</router-link>
              </li>
            </ul>
          </div>
          <div v-else>
            Корзина пуста
          </div>

        </div>
      </div>
    </div>
  </template>
</template>

<style lang="scss">

$cart_width: 300px;
$cart_height: 150px;
$cart_label_width: 30px;

.uchi {
  * {
    box-sizing: border-box;
  }

  img {
    padding: 0;
    margin: 0;
  }

  &__header {
    background: #fff;
  }

  &-cart {
    position: fixed;
    top: calc(50% - #{$cart_height} / 2);
    height: $cart_height;
    width: $cart_width;
    right: 0 - $cart_width + $cart_label_width;
    background-color: #072e7b;
    transition: 0.5s;
    z-index: 9999;

    &_opened {
      right: 0 !important;
    }

    &__toggle {
      position: absolute;
      transform: rotate(90deg);
      transform-origin: 0 0;
      height: $cart_label_width;
      width: $cart_height;
      left: $cart_label_width;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background-color: currentColor;

      span {
        color: #fff;
      }
    }

    &__close {
      position: absolute;
      top: 5px;
      right: 5px;
      color: #000;
      font-weight: bold;
      font-size: 24px;
      cursor: pointer;
    }

    &__content {
      height: 100%;
      background-color: #fff;
      margin-left: $cart_label_width;
      padding: 24px;

      ul {
        margin-top: 10px;
        margin-left: 0;
        padding: 0 0 0 20px;
      }
    }
  }

  &-cart-button {
    padding: 5px 15px;
    margin-top: -5px;
  }

  &__back {
    margin-bottom: 10px;
  }

  &__search-form {
    width: 100%;
    max-width: 600px;
    display: flex;

    input[type=text] {
      min-height: 30px;
      margin: 0;
      flex: 1;
    }

    button {
      min-height: 30px;
      margin: 0;
    }
  }
}
</style>
