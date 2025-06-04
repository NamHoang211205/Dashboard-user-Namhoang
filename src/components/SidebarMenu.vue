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
    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path
        d="M3 5h18c.6 0 1 .4 1 1s-.4 1-1 1H3C2.4 7 2 6.6 2 6s.4-1 1-1zm0 6h18c.6 0 1 .4 1 1s-.4 1-1 1H3c-.6 0-1-.4-1-1s.4-1 1-1zm0 6h18c.6 0 1 .4 1 1s-.4 1-1 1H3c-.6 0-1-.4-1-1s.4-1 1-1z" />
    </svg>
    <span class="mx-4">Menu 1</span>
    <svg class="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path :d="subMenuOpen
          ? 'M6 18L18 6M6 6l12 12'
          : 'M19 9l-7 7-7-7'
        " stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </div>

  <!-- Submenu Items -->
  <div v-show="subMenuOpen" class="mt-2 space-y-1">
    <router-link v-for="n in 9" 
    :key="n" :to="
    `/menu ${n + 1}`"
      class="flex items-center px-6 py-2 duration-200 border-l-4 cursor-pointer" :class="router.currentRoute.value.name === `Menu ${n}`
        ? 'bg-gray-600 bg-opacity-25 text-gray-100 border-gray-100'
        : 'border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100'">
      <span class="mx-4">Menu {{ n + 1}}</span>
    </router-link>

  </div>
</template>
