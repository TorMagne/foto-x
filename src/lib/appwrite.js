import { Client, Databases, Account, Storage } from 'appwrite';

const client = new Client();
client.setEndpoint('https://cloud.appwrite.io/v1').setProject(import.meta.env.VITE_PROJECT_ID); // Replace with your project ID

export const account = new Account(client);
export const storage = new Storage(client);
export const database = new Databases(client);

export const dbId = import.meta.env.VITE_dbId;
export const artProjectCollectionId = import.meta.env.VITE_artProjectCollectionId;
export const bucketId = import.meta.env.VITE_bucketId;

export { ID, ImageGravity } from 'appwrite';
