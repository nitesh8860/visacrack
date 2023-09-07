<template>
  <div
    :id="`ProductComponent${product.id}`"
    class="bg-white inline-block rounded-xl hover:shadow-[0_0_10px_3px_rgba(0,0,0,0.15)] cursor-pointer duration-200 hover:scale-105 shadow-lg">
    <NuxtLink :to="`/item/${product.id}`">
      <img
        :src="product.url"
        width="492.7"
        height="323.3"
        decoding="async"
        data-nimg="future"
        class="object-cover h-48 w-96 rounded-t-xl"
        style="color: transparent" />

      <div id="ProductDetails">
        <span
          class="flex items-center justify-start gap-3 px-3 py-5 float-right text-center text-base font-medium text-black">
          {{ product.days }} days | &#x20B9;{{ priceComputed }}
        </span>

        <p class="px-3 py-5 font-basier text-lg font-semibold text-black">
          {{ product.title.substring(0, 60) }}
        </p>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps(["product"]);
const { product } = toRefs(props);

const priceComputed = computed(() => {
  return product.value.price;
});
</script>
