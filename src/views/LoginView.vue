<template>
  <main
    class="container mx-auto grid h-[calc(100vh-192px)] place-content-center px-4 md:h-[calc(100vh-152px)]"
  >
    <form @submit.prevent="handleLogin" class="grid gap-4">
      <label class="input input-bordered flex w-full max-w-xs items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          class="h-4 w-4 opacity-70"
        >
          <path
            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"
          />
          <path
            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"
          />
        </svg>
        <input type="text" class="grow" placeholder="Email" v-model="email" />
      </label>
      <label class="input input-bordered flex w-full max-w-xs items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          class="h-4 w-4 opacity-70"
        >
          <path
            fill-rule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clip-rule="evenodd"
          />
        </svg>
        <input type="password" class="grow" value="password" v-model="password" />
      </label>
      <button class="btn btn-primary" type="submit">Login</button>
    </form>
    <!-- <button class="btn btn-secondary" @click="logout">Logout</button> -->
  </main>
</template>

<script setup>
  import { ref } from 'vue';
  import { account, ID } from '@/lib/appwrite.js';

  const loggedInUser = ref(null);
  const email = ref('');
  const password = ref('');
  // const name = ref('');

  const handleLogin = async () => {
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
