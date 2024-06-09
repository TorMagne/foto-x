import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
// import axios from 'axios';
import router from '../router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import {
  storage,
  database,
  dbId,
  artProjectCollectionId,
  ID,
  bucketId,
  ImageGravity,
} from '@/lib/appwrite.js';

export const useArtProjectStore = defineStore('artProjectStore', {
  state: () => ({
    artPojectName: '',
    artProjects: [],
  }),

  getters: {},

  actions: {
    async goToEditImagesView(project) {
      console.log('goToEditImagesView', project);
      router.push({
        name: 'editimages',
        params: { id: project.$id, collectionId: project.$collectionId },
      });
    },

    async handleMakeArtProject() {
      console.log('handleMakeArtProjectasdsa');
      const imageId = await this.uploadImage();
      this.createArtProject(imageId);
    },

    async uploadImage() {
      const fileResponse = await storage.createFile(
        bucketId, // bucketId
        ID.unique(), // fileId
        document.getElementById('uploader').files[0] // file
      );

      console.log('uploadImage', fileResponse.$id);

      return fileResponse.$id; // Return the ID of the uploaded image
    },

    async createArtProject(imageId) {
      const response = await database.createDocument(dbId, artProjectCollectionId, ID.unique(), {
        name: this.artPojectName,
        image: imageId,
        images: [],
      });

      console.log('createArtProject', response);

      // Close the modal
      const modal = document.getElementById('my_modal_test');
      modal.close();

      // Clear the input field
      this.artPojectName = '';

      // Clear the file input
      document.getElementById('uploader').value = '';

      this.getArtProjects();
      // Show a success message
      toast.success('Kunstprosjektet ble opprettet');
    },

    async getArtProjects() {
      const response = await database.listDocuments(dbId, artProjectCollectionId);
      this.artProjects = response.documents;
      console.log('artProjects', this.artProjects);
      await this.getBucketFiles(); // Ensure this is awaited so the URLs are fetched before proceeding
    },

    async getBucketFiles() {
      const response = await storage.listFiles(bucketId);
      console.log('bucketFiles', response.files);

      // Use Promise.all to wait for all getImageUrl promises to resolve
      const projectsWithImages = await Promise.all(
        this.artProjects.map(async (project) => {
          const imageUrl = await this.getImageUrl(project.image); // Get the URL
          return { ...project, imageUrl }; // Return a new object with all project properties and the imageUrl
        })
      );

      this.artProjects = projectsWithImages; // Update artProjects with the new objects that include imageUrl
    },

    async getImageUrl(imageId) {
      try {
        const response = await storage.getFilePreview(
          bucketId,
          imageId,
          400, // width
          400, // height
          ImageGravity.Center, // gravity
          100 // quality
        );
        console.log('getImageUrl', response);
        return response; // Return the URL
      } catch (error) {
        console.log(error);
        console.log(error); // Return an empty string or some default URL in case of error
      }
    },

    async deleteArtProject(project) {
      console.log('asdasd', project.$collectionId, project.$id, project.image);

      await this.deleteArtProjectImages(project);

      await database.deleteDocument(dbId, artProjectCollectionId, project.$id);

      await this.deleteArtProjectImage(project.image);

      this.getArtProjects();

      toast.error('Kunstprosjektet ble slettet');
    },

    async deleteArtProjectImage(imageId) {
      console.log('Deleting image with id:', imageId);
      await storage.deleteFile(bucketId, imageId);
    },

    async deleteArtProjectImages(project) {
      console.log('Deleting images for project:', project.$collectionId, project.$id);
      const documentImages = await database.getDocument(dbId, project.$collectionId, project.$id);

      if (documentImages.images && documentImages.images.length > 0) {
        for (const imageId of documentImages.images) {
          console.log('Deleting image with id:', imageId);
          await storage.deleteFile(bucketId, imageId);
        }
      }
    },

    async uploadImagesToArtProject(project, index) {
      const closeDialog2 = (index) => {
        const modal = document.getElementById(`my_modal_${index}`);
        modal.close();
      };

      const inputId = `uploaders_${index}`;
      const files = Array.from(document.getElementById(inputId).files);
      // const totalFiles = files.length;
      const uploadPromises = files.map((file, i) =>
        storage
          .createFile(
            bucketId, // bucketId
            ID.unique(), // fileId
            file // file
          )
          .then((response) => {
            return response;
          })
      );
      const fileResponses = await Promise.all(uploadPromises);
      const fileIds = fileResponses.map((response) => response.$id);
      console.log('uploadImagesToArtProject', index, project.$collectionId, project.$id);
      const documentImages = await database.getDocument(dbId, project.$collectionId, project.$id);
      console.log('hi1');
      const updatedImages = [...documentImages.images, ...fileIds];
      // Updtae the document with the new images array
      const result = await database.updateDocument(
        dbId,
        project.$collectionId,
        project.$id,
        { images: updatedImages } // data
      );
      closeDialog2(index);
      toast.success('Bildene ble lagt til');
      // Clear the file input
      document.getElementById(inputId).value = '';
      this.getArtProjects();
    },
  },
});
