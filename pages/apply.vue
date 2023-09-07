<template>
  <MainLayout>
    <div id="AddressPage" class="mt-4 max-w-[500px] mx-auto px-2">
      <div class="mx-auto bg-white rounded-lg p-3">
        <form @submit.prevent="submit()">
          <div class="text-xl text-bold mb-2 py-4">
            Select your departure date from India
          </div>
          <div v-if="currentTravelDate" class="text-m text-bold mb-2 py-4">
            Your current travel date is : {{ currentTravelDate }}
          </div>

          <VueDatePicker
            :model-value="travelDate"
            @update:model-value="handleDate"
            :error="
              error && error.type == 'travelDate' ? error.message : ''
            "></VueDatePicker>

          <button
            :disabled="isWorking"
            type="submit"
            class="mt-6 bg-gradient-to-r from-[#FE630C] to-[#FF3200] w-full text-white text-[21px] font-semibold p-1.5 rounded-full">
            <div v-if="!isWorking">Set travel date</div>
            <Icon v-else name="eos-icons:loading" size="25" class="mr-2" />
          </button>

          <NuxtLink to="/documents">
            <button
              :disabled="isWorking"
              class="mt-6 bg-black w-full text-white text-[21px] font-semibold p-1.5 rounded-full">
              <div v-if="!isWorking">Go to Upload documents page</div>
              <Icon v-else name="eos-icons:loading" size="25" class="mr-2" />
            </button>
          </NuxtLink>
        </form>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from "~/layouts/MainLayout.vue";
import { useUserStore } from "~/stores/user";
const userStore = useUserStore();
const user = useSupabaseUser();

import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

let travelDate = ref();

let currentApplication = ref(null);
let currentTravelDate = ref();
let isUpdate = ref(false);
let isWorking = ref(false);
let error = ref(null);

const handleDate = (modelData) => {
  travelDate.value = modelData;
};

watchEffect(async () => {
  // if (!user.value) {
  //   return navigateTo("/auth");
  // }
  currentApplication.value = await useFetch(
    `/api/prisma/get-application-by-user/${user.value.id}`
  );
  console.log(currentApplication.value.data);

  if (currentApplication.value.data) {
    currentTravelDate = currentApplication.value.data.travelDate;
    console.log("there is a travel date: " + currentTravelDate);
    isUpdate.value = true;
  }
  userStore.isLoading = ref(false);
});

const submit = async () => {
  isWorking.value = true;
  error.value = null;

  if (!travelDate.value) {
    error.value = {
      type: "travelDate",
      message: "A travel date is required",
    };
  }

  if (error.value) {
    isWorking.value = false;
    return;
  }

  if (isUpdate.value) {
    await useFetch(
      `/api/prisma/update-application/${currentApplication.value.data.id}`,
      {
        method: "PATCH",
        body: {
          userId: user.value.id,
          travelDate: travelDate.value,
        },
      }
    );
    isWorking.value = false;
    return navigateTo("/apply");
  }

  await useFetch(`/api/prisma/add-application/`, {
    method: "POST",
    body: {
      userId: user.value.id,
      travelDate: travelDate.value,
    },
  });

  isWorking.value = false;
  return navigateTo("/apply");
};
</script>
