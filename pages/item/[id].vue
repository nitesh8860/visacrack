<template>
  <MainLayout>
    <div id="ItemPage" class="mt-4 max-w-[1200px] mx-auto px-2">
      <div class="md:flex gap-4 justify-between mx-auto w-full px-6">
        <div class="md:w-[40%]">
          <img
            v-if="currentImage"
            class="rounded-xl object-cover h-96 w-96"
            :src="currentImage" />
          <div
            v-if="images[0] !== ''"
            class="flex items-center justify-center mt-2">
            <div v-for="image in images">
              <img
                @mouseover="currentImage = image"
                @click="currentImage = image"
                width="70"
                class="rounded-md object-cover h-16 w-16 border-[3px] cursor-pointer hidden"
                :class="currentImage === image ? 'border-[#FF5353]' : ''"
                :src="image" />
            </div>
          </div>
        </div>
        <div class="md:w-[60%] bg-white p-3 rounded-lg">
          <div v-if="product && product.data">
            <p
              class="mb-2 font-basier text-2xl font-bold font-semibold md:text-4xl">
              {{ product.data.title }}
            </p>
            <p class="text-[16px] mb-2 mt-5 pb-4 font-normal">
              {{ product.data.description }}
            </p>
          </div>

          <div class="border-b" />

          <div class="flex items-center justify-start gap-2 my-2">
            <div class="text-xl font-bold">
              {{ product.data.days }} days | &#x20B9; {{ priceComputed }}
            </div>
            <span
              class="bg-[#F5F5F5] border text-[#C08562] text-[9px] font-semibold px-1.5 rounded-sm"
              >5% off</span
            >
          </div>

          <div class="py-2" />

          <NuxtLink to="/shoppingcart">
            <button
              @click="addToCart()"
              :disabled="isInCart"
              class="px-6 py-2 rounded-lg text-white text-lg font-semibold bg-gradient-to-r from-[#FF851A] to-[#FFAC2C]">
              <div v-if="isInCart">Go to Cart</div>
              <div v-else>Add Visa to Cart</div>
            </button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from "~/layouts/MainLayout.vue";
import { useUserStore } from "~/stores/user";
const userStore = useUserStore();

const route = useRoute();

let product = ref(null);
let currentImage = ref(null);

onBeforeMount(async () => {
  product.value = await useFetch(
    `/api/prisma/get-product-by-id/${route.params.id}`
  );
});

watchEffect(() => {
  if (product.value && product.value.data) {
    currentImage.value = product.value.data.url;
    images.value[0] = product.value.data.url;
    userStore.isLoading = false;
  }
});

const isInCart = computed(() => {
  let res = false;
  userStore.cart.forEach((prod) => {
    if (route.params.id == prod.id) {
      res = true;
    }
  });
  return res;
});

const priceComputed = computed(() => {
  if (product.value && product.value.data) {
    return product.value.data.price;
  }
  return "0";
});

const images = ref([
  "",
  // "https://picsum.photos/id/212/800/800",
  // "https://picsum.photos/id/233/800/800",
  // "https://picsum.photos/id/165/800/800",
  // "https://picsum.photos/id/99/800/800",
  // "https://picsum.photos/id/144/800/800",
]);

const addToCart = () => {
  userStore.cart.push(product.value.data);
};
</script>
