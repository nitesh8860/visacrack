<template>
  <MainLayout>
    <div id="IndexPage" class="mt-4 max-w-[1200px] mx-auto px-2">
      <div>
        <section class="w-full px-1 md:mb-0">
          <div
            class="flex flex-col gap-2 rounded-t-2xl bg-primary px-3 pt-3 md:gap-4 md:bg-white md:px-0 md:py-0 md:pt-6">
            <p
              class="font-basier text-2xl font-semibold text-black text-center text-[42px] text-primary">
              India's Own Visa<br class="sm:hidden" />
              Platform
            </p>
            <p class="text-black text-center">
              <span class="font-medium text-red-600">99.9%</span>
              visas on time.
            </p>
          </div>
        </section>
      </div>

      <div class="flex max-w-[700px] mx-auto w-full justify-center py-4">
        <div class="relative">
          <div
            class="flex items-center border-2 border-black rounded-md w-full">
            <input
              class="w-full placeholder-gray-400 text-sm pl-3 focus:outline-none"
              placeholder="Enter Destination"
              type="text"
              v-model="searchItem" />
            <button class="flex items-center h-[100%] p-1.5 px-2 bg-[#FF4646]">
              <Icon name="ph:magnifying-glass" size="20" color="#ffffff" />
            </button>
          </div>

          <div class="absolute bg-white max-w-[700px] h-auto w-full">
            <div
              v-if="items && items.data"
              v-for="item in items.data"
              class="p-1">
              <NuxtLink
                :to="`/item/${item.id}`"
                class="flex items-center justify-between w-full cursor-pointer hover:bg-gray-100">
                <div class="flex items-center">
                  <img class="rounded-md" width="40" :src="item.url" />
                  <div class="truncate ml-2">{{ item.title }}</div>
                </div>
                <div class="truncate">&#x20B9;{{ item.price }}</div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
      <div
        class="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 p-10">
        <div v-if="products" v-for="product in products.data" :key="product">
          <ProductComponent :product="product" />
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from "~/layouts/MainLayout.vue";
import { useUserStore } from "~/stores/user";
const userStore = useUserStore();

let products = ref(null);
onBeforeMount(async () => {
  products.value = await useFetch("/api/prisma/get-all-products");
  setTimeout(() => (userStore.isLoading = false), 1000);
});

let isSearching = ref(false);
let searchItem = ref("");
let items = ref(null);

const searchByName = useDebounce(async () => {
  isSearching.value = true;
  items.value = await useFetch(
    `/api/prisma/search-by-name/${searchItem.value}`
  );
  isSearching.value = false;
}, 100);

watch(
  () => searchItem.value,
  async () => {
    if (!searchItem.value) {
      setTimeout(() => {
        items.value = "";
        isSearching.value = false;
        return;
      }, 500);
    }
    searchByName();
  }
);
</script>
