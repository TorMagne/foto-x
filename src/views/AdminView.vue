<template>
  <div class="m-4">
    <p class="mb-4">
      {{ loggedInUser ? `Logged in as ${loggedInUser.name}` : 'Not logged in' }}
    </p>
    <pre>{{ loggedInUser }}</pre>

    <form class="flex w-[200px] flex-col gap-4">
      <input type="email" placeholder="Email" v-model="email" />
      <input type="password" placeholder="Password" v-model="password" />
      <!-- <input type="text" placeholder="Name" v-model="name" /> -->
      <button type="button" @click="login()">Login</button>
      <!-- <button type="button" @click="register">Register</button> -->
      <button type="button" @click="logout">Logout</button>
    </form>
    <!-- <button type="button">Push meh</button> -->
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { account, ID } from '@/lib/appwrite.js';

  const loggedInUser = ref(null);
  const email = ref('');
  const password = ref('');
  // const name = ref('');

  const login = async () => {
    console.log(email.value, password.value);
    try {
      await account.createEmailPasswordSession(email.value, password.value);
      loggedInUser.value = await account.get();
      console.log(loggedInUser.value);
    } catch (error) {
      console.log(error);
    }
  };

  //   const register = async () => {
  //     await account.create(ID.unique(), email.value, password.value, name.value);
  //     login(email.value, password.value);
  //   };

  const logout = async () => {
    await account.deleteSession('current');
    loggedInUser.value = null;
  };
</script>
