import { Client, Databases, Account, Storage } from 'appwrite';

const client = new Client();
client.setEndpoint('https://cloud.appwrite.io/v1').setProject(import.meta.env.VITE_PROJECT_ID); // Replace with your project ID

export const account = new Account(client);
export const storage = new Storage(client);
export const database = new Databases(client);

export const dbId = '';
export const artProjectCollectionId = '';
export const bucketId = '';

export { ID, ImageGravity } from 'appwrite';
