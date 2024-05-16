<template>
  <nav class="text-font-Raleway">
    <div class="drawer drawer-end">
      <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col">
        <!-- Navbar -->
        <div class="navbar h-[100px] w-full bg-[#0f171d]">
          <div class="container mx-auto px-4">
            <div class="mx-2 flex-1 text-3xl font-bold">
              <router-link to="/" class="font-Raleway tracking-wide text-white"
                >Foto X Skjelstadås
              </router-link>
            </div>
            <div class="hidden flex-none lg:block">
              <ul class="font-Raleway menu menu-horizontal font-bold">
                <!-- Navbar menu content here -->
                <li class="nav-link text-gray-500 hover:text-white">
                  <router-link to="/">FORSIDE</router-link>
                </li>
                <li class="nav-link text-gray-500 hover:text-white">
                  <router-link to="/">OM FOTO X</router-link>
                </li>

                <li class="text-gray-500 hover:text-white">
                  <details>
                    <summary>PRODUKTER</summary>
                    <ul class="rounded-t-none bg-base-100 p-2">
                      <li class="text-gray-500 hover:text-white">
                        <router-link>Kunst prosjekter</router-link>
                      </li>
                      <li class="text-gray-500 hover:text-white">
                        <router-link>Foto sjangere</router-link>
                      </li>
                    </ul>
                  </details>
                </li>

                <!-- <li class="nav-link text-gray-500 hover:text-white">
                  <div class="dropdown">
                    <div tabindex="0" role="button">PRODUKTER</div>
                    <ul
                      tabindex="0"
                      class="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
                    >
                      <li><a>Item 1</a></li>
                      <li><a>Item 2</a></li>
                    </ul>
                  </div>
                </li> -->
                <!-- <div class="relative mt-2 inline-block text-left">
                  <div>
                    <button
                      type="button"
                      class="nav-link mt-4 inline-flex w-full items-center text-white md:mt-0 md:gap-x-1.5 md:px-3"
                      id="menu-button-mobile"
                      aria-expanded="true"
                      aria-haspopup="true"
                    >
                      PRODUKTER
                      <svg
                        class="-mr-1 h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                  <div
                    class="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none md:left-auto md:right-0"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabindex="-1"
                    id="dropdown-menu-mobile"
                  >
                    <div class="py-1" role="none">
                      <a
                        href="#"
                        class="block px-4 py-2 text-sm text-gray-400 hover:text-black"
                        role="menuitem"
                        tabindex="-1"
                        id="menu-item-0"
                        >Kunst prosjekter</a
                      >
                      <a
                        href="#"
                        class="block px-4 py-2 text-sm text-gray-400 hover:text-black"
                        role="menuitem"
                        tabindex="-1"
                        id="menu-item-1"
                        >Foto sjangere</a
                      >
                    </div>
                  </div>
                </div> -->
              </ul>
            </div>
            <div class="flex-none lg:hidden">
              <label for="my-drawer-3" aria-label="open sidebar" class="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
          </div>
        </div>
        <!-- Page content here -->
        <RouterView />
      </div>
      <div class="drawer-side">
        <label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
        <ul class="menu min-h-full w-80 bg-base-200 p-4">
          <!-- Sidebar content here -->
          <li><router-link to="/">FORSIDE</router-link></li>
          <li><router-link to="/">OM FOTO X</router-link></li>
          <div class="dropdown">
            <div tabindex="0" role="button" class="btn m-1">Click</div>
            <ul
              tabindex="0"
              class="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
            >
              <li><a>Item 1</a></li>
              <li><a>Item 2</a></li>
            </ul>
          </div>
          <div class="relative ml-4 mt-[-0.5rem] inline-block text-left">
            <div>
              <button
                type="button"
                class="group mt-4 inline-flex w-full items-center text-gray-400 hover:text-black md:mt-0 md:gap-x-1.5 md:px-3"
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true"
              >
                PRODUKTER
                <svg
                  class="-mr-1 h-5 w-5 text-gray-400 group-hover:text-black"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div
              class="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none md:left-auto md:right-0"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabindex="-1"
              id="dropdown-menu"
            >
              <div class="py-1" role="none">
                <router-link
                  class="block px-4 py-2 text-sm text-gray-400 hover:text-black"
                  role="menuitem"
                  tabindex="-1"
                  id="menu-item-0"
                  >Kunst prosjekter</router-link
                >
                <router-link
                  class="block px-4 py-2 text-sm text-gray-400 hover:text-black"
                  role="menuitem"
                  tabindex="-1"
                  id="menu-item-1"
                  >Foto sjangere</router-link
                >
              </div>
            </div>
          </div>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script setup>
  import { RouterLink, RouterView } from 'vue-router';
</script>
