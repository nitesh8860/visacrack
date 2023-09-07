<template>
  <MainLayout>
    <div id="AddressPage" class="mt-4 max-w-[500px] mx-auto px-2">
      <div class="mx-auto bg-white rounded-lg p-3">
        <form
          @submit.prevent="submit()"
          method="post"
          enctype="multipart/form-data">
          <div class="text-xl text-bold mb-2 py-4">
            Upload documents - your Indian Passport
          </div>
          <div v-if="fileDisplay" class="text-m text-bold mb-2 py-4">
            Your passport is uploaded and renamed to : {{ fileDisplay }}
          </div>
          <label for="picture">
            <input
              class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              accept=".jpg,.jpeg,.png,.heic, .pdf"
              type="file"
              ref="picture"
              id="picture"
              @input="onChange" />
            <button
              :disabled="isWorking"
              type="submit"
              class="mt-6 bg-gradient-to-r from-[#FE630C] to-[#FF3200] w-full text-white text-[21px] font-semibold p-1.5 rounded-full">
              <div v-if="!isWorking">Apply Visa</div>
              <Icon v-else name="eos-icons:loading" size="25" class="mr-2" />
            </button>
          </label>
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

let picture = ref(null);
let currentApplication = ref(null);
let isUpdate = ref(false);
let isWorking = ref(false);
let isLoading = ref(false);
let fileDisplay = ref(null);
let pictureData = ref(null);

const onChange = () => {
  pictureData.value = picture.value.files[0];
};

watchEffect(async () => {
  currentApplication.value = await useFetch(
    `/api/prisma/get-document-by-user/${user.value.id}`
  );

  if (
    currentApplication.value.data &&
    currentApplication.value.data.type == "picture"
  ) {
    fileDisplay.value = "picture.jpg";
    isUpdate.value = true;
    console.log("image exists");
  }
  userStore.isLoading = ref(false);
});

const submit = async () => {
  isWorking.value = true;
  isLoading.value = true;
  const formData = new FormData();
  formData.append("file", pictureData.value, `${user.value.id}/picture.jpg`);
  // for (var pair of formData.entries()) {
  //   console.log("key: " + pair[0] + ", value: " + pair[1].name);
  // }

  const result = await useFetch("/api/storage/upload", {
    method: "post",
    body: formData,
  });
  console.log(result.data.value);

  if (!isUpdate.value) {
    console.log("adding document if not present");
    await useFetch("/api/prisma/add-document", {
      method: "POST",
      body: {
        userId: user.value.id,
        type: "picture",
      },
    });
  }

  isWorking.value = false;
  isLoading.value = false;
  return navigateTo("/checkout");
};
</script>
