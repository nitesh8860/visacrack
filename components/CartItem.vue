<template>
  <div class="flex justify-start my-2">
    <img class="rounded-xl object-cover h-48 w-48" :src="product.url" />

    <div class="overflow-hidden pl-2 w-full">
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center justify-between truncate">
          <!-- Shipping Address
 -->
          <div
            class="mb-2 font-basier text-2xl font-bold font-semibold md:text-4xl">
            {{ product.title }}
          </div>
        </div>
        <button
          @click="removeFromCart()"
          class="mx-3 sm:block hidden -mt-0.5 hover:text-red-500">
          <Icon name="material-symbols:delete-outline" size="20" />
        </button>
      </div>

      <div class="text-xl font-semibold">
        &#x20B9; <span class="font-bold">{{ product.price }}</span>
      </div>

      <!-- <p class="text-[#009A66] text-xs font-semibold pt-1">
        Free 11-day delivery over ￡8.28
      </p> -->

      <p class="text-[#009A66] text-xs font-semibold pt-1">Free Shipping</p>

      <div class="flex items-center justify-end">
        <button
          @click="removeFromCart()"
          class="sm:hidden block -mt-0.5 hover:text-red-500">
          <Icon name="material-symbols:delete-outline" size="20" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "~/stores/user";
const userStore = useUserStore();

const props = defineProps(["product"]);
const { product } = toRefs(props);

const removeFromCart = () => {
  userStore.cart.forEach((prod, index) => {
    if (prod.id === product.value.id) {
      userStore.cart.splice(index, 1);
    }
  });
};
</script>
