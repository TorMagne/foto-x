<template>
  <main class="container mx-auto my-16 px-4">
    <!-- Open the modal using ID.showModal() method -->
    <button class="btn btn-primary mb-8" onclick="my_modal_test.showModal()">
      Opprett kunstprosjekt
    </button>
    <dialog id="my_modal_test" class="modal">
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
              v-model="artPojectName"
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

    <h1 class="mb-4 font-Raleway text-2xl font-bold" v-if="artProjects && artProjects.length != 0">
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
      <template v-for="(project, index) in artProjects" :key="project.name">
        <div
          class="card w-96 bg-zinc-700"
          :class="artProjects && artProjects.length > 2 ? '' : 'mr-4'"
        >
          <figure><img :src="project.imageUrl" alt="Art Project Image" /></figure>
          <div class="card-body">
            <h2 class="card-title mb-4">Kunstprosjek: {{ project.name }}</h2>
            <div class="card-actions justify-start">
              <button class="btn btn-success" @click="showModal(index)">Legg til bilder</button>
              <button class="btn btn-error" type="button" @click="deleteArtProject(project)">
                Slett Kunstprosjek
              </button>
              <button
                class="btn"
                v-if="artProjects[index].images.length > 0"
                @click="goToEditImagesView(project, index)"
              >
                Rediger bilder
              </button>
              <dialog :id="`my_modal_${index}`" class="modal">
                <div class="modal-box">
                  <form
                    @submit.prevent="uploadImagesToArtProject(project, index)"
                    class="flex flex-col items-start"
                  >
                    <!-- add file input -->
                    <input
                      type="file"
                      multiple
                      class="file-input file-input-bordered file-input-primary w-full max-w-xs"
                      :id="`uploaders_${index}`"
                    />
                    <div>
                      <button class="item btn btn-success mr-4 mt-4" type="submit">Lagre</button>
                      <button class="btn btn-warning" type="button" @click="closeDialog2(index)">
                        Avbryt
                      </button>
                    </div>
                  </form>
                </div>
              </dialog>
            </div>
          </div>
        </div>
      </template>
    </div>
  </main>
</template>

<script setup>
  import { onMounted } from 'vue';
  import { storeToRefs } from 'pinia';

  // store imports
  import { useArtProjectStore } from '@/stores/ArtProjectStore';

  // store actions
  const {
    handleMakeArtProject,
    getArtProjects,
    deleteArtProject,
    uploadImagesToArtProject,
    goToEditImagesView,
  } = useArtProjectStore();

  // store state
  const { artPojectName, artProjects } = storeToRefs(useArtProjectStore());

  const closeDialog = () => {
    const modal = document.getElementById('my_modal_test');
    modal.close();
  };

  const closeDialog2 = (index) => {
    const modal = document.getElementById(`my_modal_${index}`);
    modal.close();
  };

  const showModal = (index) => {
    const modal = document.getElementById(`my_modal_${index}`);
    if (modal) modal.showModal();
  };

  onMounted(() => {
    // get all art projects
    getArtProjects();
  });
</script>

<style>
  .progress {
    width: 100%;
    background-color: #f3f3f3;
  }

  .progress-bar {
    height: 20px;
    background-color: #4caf50;
  }
</style>
