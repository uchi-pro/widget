<template>
  <div v-if="coursesFetched" class="uchi">
    <div class="uchi__body">
      <router-view></router-view>
    </div>

    <div class="uchi-cart" :class="{ 'uchi-cart_opened' : isCartOpened() }">
      <a @click="toggleCart()" class="uchi-cart__toggle"
         :title=" isCartOpened() ? 'Закрыть корзину' : 'Открыть корзину' ">
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

<script>

  export default {
    methods: {
      isCartOpened () {
        return this.$root.$data.isCartOpened
      },
      openCart () {
        this.$root.openCart()
      },
      closeCart () {
        this.$root.closeCart()
      },
      toggleCart () {
        if (this.isCartOpened()) {
          this.closeCart()
        } else {
          this.openCart()
        }
      }
    },
    computed: {
      response () {
        return this.$root.$data.response
      },
      coursesFetched () {
        return this.$root.$data.coursesFetched
      },
      inCartCourses () {
        return this.$root.$data.cart
          .map(cartItem => cartItem.course)
      },
      inCartCoursesCount () {
        return this.inCartCourses.length
      },
      inCartCoursesTotal () {
        return this.inCartCourses.reduce((total, course) => total + parseInt(course.price || 0), 0)
      },
    },
  }
</script>

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
      margin-top: 20px;
    }
  }
</style>
