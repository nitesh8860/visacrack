<template>
  <div class="flex justify-start my-2">
    <img
      class="rounded-xl shadow-lg md:w-[150px] w-[90px]"
      :src="product.url" />

    <div class="overflow-hidden pl-2">
      <div class="flex items-center">
        <div
          class="mb-2 font-basier text-2xl font-bold font-semibold md:text-4xl">
          {{ product.title }}
        </div>
      </div>

      <div class="text-lg font-semibold mt-2">
        &#x20B9; <span class="font-bold">{{ product.price }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["product"]);
const { product } = toRefs(props);
</script>
