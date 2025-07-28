<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const subMenuOpen = ref(false)

// Props to reuse for many menu
const props = defineProps<{
  mainTitle: string
  routePrefix: string
  subMenus: { title: string; path: string }[]
}>()

// Class for main menu
const activeClass = 'bg-gray-600 bg-opacity-25 text-gray-100 border-gray-100'
const inactiveClass =
  'border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100'

const menuClass = computed(() => {
  const routeName = router.currentRoute.value.name
  return typeof routeName === 'string' &&
    routeName.toLowerCase().includes(props.routePrefix.toLowerCase())
    ? activeClass
    : inactiveClass
})
</script>

<template>
  <!-- Main Menu -->
  <div
    class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4 cursor-pointer"
    :class="menuClass"
    @click="subMenuOpen = !subMenuOpen"
  >
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.83333 17.4167H20.1667M1.83333 11H20.1667M1.83333 4.58333H20.1667"
        stroke="#858C95"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>

    <span class="mx-4">{{ props.mainTitle }}</span>

    <svg class="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        :d="subMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M19 9l-7 7-7-7'"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>

  <!-- Submenu Items -->
  <div v-show="subMenuOpen" class="mt-2 space-y-1">
    <router-link
      v-for="item in props.subMenus"
      :key="item.path"
      :to="item.path"
      class="flex items-center px-6 py-2 duration-200 border-l-4 cursor-pointer"
      :class="router.currentRoute.value.path === item.path ? activeClass : inactiveClass"
    >
      <span class="mx-4">{{ item.title }}</span>
    </router-link>
  </div>
</template>
