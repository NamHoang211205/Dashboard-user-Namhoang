<script setup lang="ts">
import { ref } from 'vue'
import { useSidebar } from '../composables/useSidebar'

const languageOpen = ref(false)
const dropdownOpen = ref(false)
const { isOpen } = useSidebar()
</script>

<template>
  <header class="flex items-center justify-between px-6 py-4">
    <!-- Company name -->
    <div>
      <h3 class="text-2xl font-bold text-gray-800">Company</h3>
    </div>

    <!-- Hamburger for small screen -->
    <div class="flex items-center">
      <button class="text-gray-500 focus:outline-none lg:hidden" @click="isOpen = true">
        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6H20M4 12H20M4 18H11" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
      </button>
    </div>

    <!-- Right side group -->
    <div class="flex items-center gap-x-4">
      <!-- Group: Go to Homepage + English -->
      <div class="flex items-center gap-x-4">
        <!-- Go to Homepage -->
        <div
          class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-white rounded hover:bg-blue-50 ">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_36_5221)">
              <path
                d="M8.00004 11.9934V9.99336M6.01337 1.89336L2.42004 4.69336C1.82004 5.16003 1.33337 6.15336 1.33337 6.90669V11.8467C1.33337 13.3934 2.59337 14.66 4.14004 14.66H11.86C13.4067 14.66 14.6667 13.3934 14.6667 11.8534V7.00003C14.6667 6.19336 14.1267 5.16003 13.4667 4.70003L9.34671 1.81336C8.41337 1.16003 6.91337 1.19336 6.01337 1.89336Z"
                stroke="#3559F2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </g>
            <defs>
              <clipPath id="clip0_36_5221">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
          Go to Homepage
        </div>

        <!-- English Dropdown -->
        <div class="relative">
          <button
            class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white rounded-md shadow focus:outline-none"
            @click="languageOpen = !languageOpen">
            English
            <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 1.33337L6.58926 5.74412C6.26382 6.06956 5.73618 6.06956 5.41074 5.74412L1 1.33337"
                stroke="#858C95" stroke-width="1.67" stroke-linecap="round" />
            </svg>
          </button>

          <transition enter-active-class="transition duration-150 ease-out transform"
            enter-from-class="scale-95 opacity-0" enter-to-class="scale-100 opacity-100"
            leave-active-class="transition duration-150 ease-in transform" leave-from-class="scale-100 opacity-100"
            leave-to-class="scale-95 opacity-0">
            <div v-show="languageOpen" class="absolute right-0 z-20 w-32 py-2 mt-2 bg-white rounded-md shadow-xl">
              <button
                class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-indigo-500 hover:text-white">
                Vietnamese
              </button>
            </div>
          </transition>
        </div>
      </div>

      <!-- Bell Icon -->
      <button class="flex text-gray-600 focus:outline-none" 
      @click="dropdownOpen = !dropdownOpen">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 10.521C11.59 10.521 11.25 10.181 11.25 9.77104V6.44104C11.25 6.03104 11.59 5.69104 12 5.69104C12.41 5.69104 12.75 6.03104 12.75 6.44104V9.77104C12.75 10.191 12.41 10.521 12 10.521Z"
            fill="#979AA0" />
          <path
            d="M12.02 20.348C9.43999 20.348 6.86999 19.938 4.41999 19.118C3.50999 18.818 2.81999 18.168 2.51999 17.348C2.21999 16.528 2.31999 15.588 2.80999 14.768L4.07999 12.648C4.35999 12.178 4.60999 11.298 4.60999 10.748V8.64804C4.60999 4.55804 7.92999 1.23804 12.02 1.23804C16.11 1.23804 19.43 4.55804 19.43 8.64804V10.748C19.43 11.288 19.68 12.178 19.96 12.648L21.23 14.768C21.7 15.548 21.78 16.478 21.47 17.328C21.16 18.178 20.48 18.828 19.62 19.118C17.17 19.948 14.6 20.348 12.02 20.348ZM12.02 2.74804C8.75999 2.74804 6.10999 5.39804 6.10999 8.65804V10.758C6.10999 11.568 5.78999 12.738 5.36999 13.428L4.09999 15.558C3.83999 15.988 3.77999 16.448 3.92999 16.848C4.07999 17.248 4.41999 17.548 4.89999 17.708C9.49999 19.238 14.56 19.238 19.16 17.708C19.59 17.568 19.92 17.248 20.07 16.828C20.23 16.408 20.18 15.948 19.95 15.558L18.68 13.438C18.26 12.748 17.94 11.578 17.94 10.768V8.66804C17.93 5.39804 15.28 2.74804 12.02 2.74804Z"
            fill="#979AA0" />
          <path
            d="M12 22.8999C10.93 22.8999 9.88004 22.4599 9.12004 21.6999C8.36004 20.9399 7.92004 19.8899 7.92004 18.8199H9.42004C9.42004 19.4999 9.70004 20.1599 10.18 20.6399C10.66 21.1199 11.32 21.3999 12 21.3999C13.42 21.3999 14.58 20.2399 14.58 18.8199H16.08C16.08 21.0699 14.25 22.8999 12 22.8999Z"
            fill="#979AA0" />
        </svg>

      </button>

      <!-- Avatar Dropdown -->
      <div class="relative">
        <button class="relative z-10 block w-8 h-8 overflow-hidden rounded-full shadow focus:outline-none"
          @click="dropdownOpen = !dropdownOpen">
          <img class="object-cover w-full h-full"
            src="https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=296&q=80"
            alt="Your avatar">
        </button>

        <div v-show="dropdownOpen" class="fixed inset-0 z-10 w-full h-full" @click="dropdownOpen = false" />

        <transition enter-active-class="transition duration-150 ease-out transform"
          enter-from-class="scale-95 opacity-0" enter-to-class="scale-100 opacity-100"
          leave-active-class="transition duration-150 ease-in transform" leave-from-class="scale-100 opacity-100"
          leave-to-class="scale-95 opacity-0">
          <div v-show="dropdownOpen" class="absolute right-0 z-20 w-48 py-2 mt-2 bg-white rounded-md shadow-xl">
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">Profile</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">Products</a>
            <router-link to="/" class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">
              Log out
            </router-link>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>
