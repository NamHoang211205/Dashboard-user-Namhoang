<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const subMenuOpen = ref(false)

const activeClass =
  'bg-gray-600 bg-opacity-25 text-gray-100 border-gray-100'
const inactiveClass =
  'border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100'

// Class for Menu 1 (main menu)
const menuClass = computed(() => {
  const routeName = router.currentRoute.value.name
  return typeof routeName === 'string' && routeName.startsWith('Menu')
    ? activeClass
    : inactiveClass
})

// Class for submenu items (Menu 2–Menu 10)
const getSubMenuClass = (n: number) => {
  return computed(() => {
    return router.currentRoute.value.name === `Menu ${n}`
      ? activeClass
      : inactiveClass
  })
}

// When clicking Menu 1
const handleMenu1Click = () => {
  subMenuOpen.value = !subMenuOpen.value
  router.push('/menu 1') // navigate to menu 1
}
</script>

<template>
  <!-- Main Menu -->
  <div class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4 cursor-pointer" :class="menuClass"
    @click="handleMenu1Click">
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_36_1181)">
        <path
          d="M1.83333 17.4167L11.9167 17.4167M15.5833 17.4167L20.1667 17.4167M1.83333 11L6.41667 11M10.0833 11L20.1667 11M1.83333 4.58333L11.9167 4.58333M15.5833 4.58333L20.1667 4.58333M11.9167 2.75L11.9167 6.41667M11.9167 15.5833L11.9167 19.25M10.0833 9.16667L10.0833 12.8333"
          stroke="#858C95" stroke-width="1.8" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_36_1181">
          <rect width="22" height="22" fill="white" transform="translate(22) rotate(90)" />
        </clipPath>
      </defs>
    </svg>

    <span class="mx-4">Configuration</span>
    <svg class="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path :d="subMenuOpen
        ? 'M6 18L18 6M6 6l12 12'
        : 'M19 9l-7 7-7-7'
        " stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </div>

  <!-- Submenu Items -->
  <div v-show="subMenuOpen" class="mt-2 space-y-1">
    <router-link v-for="n in 9" :key="n" :to="`/menu ${n + 1}`" class="flex items-center px-6 py-2 duration-200 border-l-4 cursor-pointer" :class="router.currentRoute.value.name === `Menu ${n}`
      ? 'bg-gray-600 bg-opacity-25 text-gray-100 border-gray-100'
      : 'border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100'">
      <span class="mx-4">Menu {{ n + 1 }}</span>
    </router-link>

  </div>
</template>
