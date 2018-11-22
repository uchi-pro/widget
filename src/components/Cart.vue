<template>
    <div>
        <h1>Корзина</h1>

        <div v-if="inCartCoursesCount > 0">

            <div class="uchi-cart-table">
                <div v-for="item in cart" :key="item.course.id" class="uchi-cart-item">
                    <div class="uchi-cart-item__title">
                        {{ item.course.title }}
                    </div>
                    <div class="uchi-cart-item__price">
                        {{ formatPrice(item.course.price) }}
                    </div>
                    <div class="uchi-cart-item__remove">
                        <span @click="removeFromCart(item.course)" title="Убрать из корзины">&times;</span>
                    </div>
                </div>
            </div>

            <div class="uchi-cart-checkout">

                <div class="uchi-cart-checkout__total">
                    Общая стоимость: {{ formatPrice(cartTotal) }}
                </div>

                <form :action="baseUrl + '/orders-widget'" method="post" target="_blank">

                    <div v-for="item in cart" :key="item.course.id">
                        <input type="hidden" name="courses-uuids" :value="item.course.id">
                    </div>

                    <input type="hidden" name="token-api" :value="this.$root.$data.token">

                    <button type="submit" class="button_buy" @click="clearCart">Оформить заказ</button>
                </form>
            </div>
        </div>
        <div v-else>
            Корзина пуста.
        </div>

        <div class="uchi__back">
            <router-link :to="{ name: 'theme_list' }">&larr;&nbsp;Вернуться ко всем курсам</router-link>
        </div>

    </div>
</template>

<script>
export default {
  data () {
    const data = {}

    return data
  },
  methods: {
    removeFromCart (course) {
      this.$root.removeFromCart(course)
    },
    clearCart() {
      this.$root.clearCart()
    },
  },
  computed: {
    cart () {
      return this.$root.$data.cart
    },
    inCartCourses () {
      return this.$root.$data.cart
        .map(cartItem => cartItem.course)
    },
    inCartCoursesCount () {
      return this.inCartCourses.length
    },
    cartTotal () {
      return this.inCartCourses
        .reduce((total, course) => total + parseInt(course.price || 0), 0)
    },
  }
}
</script>

<style lang="scss">
    .uchi-cart-item {
        display: flex;
        padding: 10px 0;
        border-bottom: 1px solid #cccccc;

        &__title {
            flex: 1;
        }

        &__price {
            width: 100px;
            text-align: center;
        }

        &__remove {
            width: 50px;
            text-align: center;

            span {
                font-size: 24px;
                font-weight: bold;
                display: inline-block;
                margin-top: -4px;
                cursor: pointer;

                &:hover {
                    color: red;
                }
            }
        }
    }

    .uchi-cart-checkout {
        margin-top: 15px;
        text-align: right;

        &__total {
            margin: 20px 0 20px 0;
        }
    }
</style>
