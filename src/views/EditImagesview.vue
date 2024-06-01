<template>
  <main class="container mx-auto px-4">
    <section class="my-16 flex flex-wrap gap-8">
      <h1 class="mb-4 font-Raleway text-2xl font-bold" v-if="imageUrls.length === 0">
        Ingen bilder enda
      </h1>
      <div v-for="image in imageUrls" :key="image.id">
        <div class="card w-96 bg-zinc-700">
          <figure><img :src="image.url" alt="Art Project Image" /></figure>

          <div class="card-actions justify-start">
            <button
              class="item btn btn-error mr-4 mt-0 w-full rounded-none"
              type="submit"
              @click="deleteImage(image.id)"
            >
              Slett bilde
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script setup>
  import { onMounted, ref, reactive } from 'vue';
  import { useRoute } from 'vue-router';
  import {
    storage,
    database,
    dbId,
    artProjectCollectionId,
    ID,
    bucketId,
    ImageGravity,
  } from '@/lib/appwrite.js';
  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css';

  const route = useRoute();
  const id = ref(route.params.id);
  const collectionId = ref(route.params.collectionId);
  const imagesArray = ref([]);
  const imageUrls = ref([]);

  const getArtProject = async () => {
    imagesArray.value = []; // Clear imagesArray
    const response = await database.getDocument(dbId, collectionId.value, id.value);

    imagesArray.value.push(...response.images);
    console.log('imagesArray', imagesArray.value);

    imageUrls.value = await Promise.all(imagesArray.value.map(getBucketImages));

    console.log('imageUrls', imageUrls.value);
  };

  const getBucketImages = async (imageId) => {
    try {
      const response = await storage.getFilePreview(
        bucketId,
        imageId,
        400, // width
        400, // height
        ImageGravity.Center, // gravity
        100 // quality
      );
      return { id: imageId, url: response.href };
    } catch (error) {
      console.log(error);
    }
  };

  const deleteImage = async (imageId) => {
    try {
      await storage.deleteFile(bucketId, imageId);
      await database.updateDocument(dbId, collectionId.value, id.value, {
        images: imagesArray.value.filter((image) => image !== imageId),
      });
      toast.success('Bilde slettet');
      getArtProject();
    } catch (error) {
      console.log(error);
    }
  };

  onMounted(async () => {
    getArtProject();
  });
</script>
