<template>
  <main class="container mx-auto my-16 px-4">
    <section>
      <!-- Open the modal using ID.showModal() method -->
      <button class="btn btn-primary mb-8" onclick="my_modal_1.showModal()">
        Opprett kunstprosjekt
      </button>
      <dialog id="my_modal_1" class="modal">
        <div class="modal-box">
          <form @submit.prevent="handleMakeArtProject" class="flex flex-col items-start">
            <label class="form-control w-full max-w-xs">
              <div class="label">
                <span class="label-text">kunstprosjek navn</span>
              </div>
              <input
                type="text"
                placeholder="kunstprosjek navn"
                class="input input-bordered input-primary mb-4 w-full max-w-xs"
                v-model="artProjectName"
              />
            </label>
            <!-- add file inpup -->
            <input
              type="file"
              class="file-input file-input-bordered file-input-primary w-full max-w-xs"
              id="uploader"
            />
            <div>
              <button class="item btn btn-success mr-4 mt-4" type="submit">Lagre</button>
              <button class="btn btn-warning" type="button" @click="closeDialog">Avbryt</button>
            </div>
          </form>
        </div>
      </dialog>

      <h1
        class="mb-4 font-Raleway text-2xl font-bold"
        v-if="artProjects && artProjects.length != 0"
      >
        Kunstprosjeker
      </h1>

      <h1
        class="mb-4 font-Raleway text-2xl font-bold"
        v-if="!artProjects || artProjects.length === 0"
      >
        Ingen Kunstprosjeker laget enda
      </h1>

      <div
        class="flex flex-wrap justify-center"
        :class="artProjects && artProjects.length > 2 ? 'gap-8 md:justify-start' : ''"
      >
        <template v-for="project in artProjects" :key="project.name">
          <div
            class="card w-96 bg-zinc-700"
            :class="artProjects && artProjects.length > 2 ? '' : 'mr-4'"
          >
            <figure><img :src="project.imageUrl" alt="Art Project Image" /></figure>
            <div class="card-body">
              <h2 class="card-title mb-4">Kunstprosjek: {{ project.name }}</h2>
              <div class="card-actions justify-start">
                <button class="btn btn-success mr-4">Legg til bilder</button>
                <button
                  class="btn btn-error"
                  type="button"
                  @click="deleteArtProject(project.id, project.imageId)"
                >
                  Slett Kunstprosjek
                </button>
              </div>
            </div>
          </div>
        </template>
      </div>
    </section>
  </main>
</template>

<script setup>
  import { onMounted, ref, reactive } from 'vue';
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

  // Refs
  const artProjectName = ref('');
  const artProjects = ref(null);
  const artProjectIds = ref(null);
  const imageUrls = reactive({});

  const closeDialog = () => {
    const modal = document.getElementById('my_modal_1');
    modal.close();
  };

  const uploadImage = async () => {
    const fileResponse = await storage.createFile(
      bucketId, // bucketId
      ID.unique(), // fileId
      document.getElementById('uploader').files[0] // file
    );

    console.log('uploadImage', fileResponse.$id);

    return fileResponse.$id; // Return the ID of the uploaded image
  };

  const createArtProject = async (imageId) => {
    const response = await database.createDocument(dbId, artProjectCollectionId, ID.unique(), {
      name: artProjectName.value,
      image: imageId,
      images: [],
    });

    console.log('createArtProject', response);

    // Close the modal
    const modal = document.getElementById('my_modal_1');
    modal.close();

    // Clear the input field
    artProjectName.value = '';

    // Clear the file input
    document.getElementById('uploader').value = '';

    // Update the artProjects array
    artProjects.value.push({
      name: response.name,
      imageUrl: await getImageUrl(response.image),
      id: response.$id,
    });

    console.log('artProjects1111', artProjects.value);

    // Show a success message
    toast.success('Kunstprosjektet ble opprettet');
  };

  const handleMakeArtProject = async () => {
    const imageId = await uploadImage();
    createArtProject(imageId);
  };

  const getArtProjects = async () => {
    const response = await database.listDocuments(dbId, artProjectCollectionId);

    artProjects.value = response.documents;

    console.log('artProjects', artProjects.value);

    getBucketFiles();
  };

  const getBucketFiles = async () => {
    const response = await storage.listFiles(bucketId);
    artProjectIds.value = response.files;
  };

  const getImageUrl = async (imageId) => {
    try {
      const response = await storage.getFilePreview(
        bucketId,
        imageId,
        400, // width
        400, // height
        ImageGravity.Center, // gravity
        100 // quality
      );
      return response.href;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteArtProject = async (id, imageId) => {
    console.log('Deleting project with id:', id);

    await database.deleteDocument(dbId, artProjectCollectionId, id);

    artProjects.value = artProjects.value.filter((project) => {
      const keep = project.id !== id;
      if (!keep) {
        console.log('Removing project with id:', project.id);
      }
      return keep;
    });

    deleteArtProjectImage(imageId);

    toast.error('Kunstprosjektet ble slettet');
  };

  const deleteArtProjectImage = async (imageId) => {
    await storage.deleteFile(bucketId, imageId);
  };

  onMounted(async () => {
    await getArtProjects();
    for (const project of artProjects.value) {
      if (project.image) {
        // Fetch the image URL and store it in imageUrls
        imageUrls[project.image] = await getImageUrl(project.image);
      }
    }

    // Create a new array that includes the art project names and image URLs
    const artProjectsWithImages = artProjects.value.map((project) => ({
      name: project.name,
      imageUrl: imageUrls[project.image],
      id: project.$id,
      imageId: project.image,
    }));

    // Update artProjects.value to be the new array
    artProjects.value = artProjectsWithImages;

    console.log('artProjectsxxxx', artProjects.value);
  });
</script>
