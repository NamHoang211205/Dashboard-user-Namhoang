<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from 'vue'
import UserTable from '../components/UserTable.vue'
import UserModal from '../components/UserModal.vue'
import ConfirmModal from '../components/ConfirmModal.vue'

import {
  openCreateModalFn,
  closeCreateModalFn,
  handleEditFn,
  handleSubmitFn,
  toggleFiltersFn,
  handleDeleteRequestFn,
  confirmDeleteFn,
  handleActiveFn,
  confirmActiveFn,
  cancelActiveFn,
  handleLockFn
} from '../utils/Function'

import type { User } from '../utils/Function'
import { formatDateToMMDDYYYY } from '../utils/Format'

const showModal = ref(false)
const form = ref({ id: '', firstName: '', lastName: '', username: '', email: '', updatedAt: '', status: 'Choose status' })
const selectStatus = ref('Choose status')

const firstNameError = ref('')
const lastNameError = ref('')
const usernameError = ref('')
const emailError = ref('')
const statusError = ref('')

const showFilters = ref(true)
const confirmActiveVisible = ref(false)
const selectedUserForActive = ref<User | null>(null)
const users = ref<User[]>([])
const showConfirmModal = ref(false)
const selectedUser = ref<User | null>(null)
const lockedUser = ref<User | null>(null)

const filterEmail = ref('')
const filterFullName = ref('')
const filterStatus = ref('Choose status')

const showDateDropdown = ref(false)
const fromDate = ref('')
const toDate = ref('')

const formattedRange = computed(() => {
  const from = fromDate.value ? formatDateToMMDDYYYY(fromDate.value) : ''
  const to = toDate.value ? formatDateToMMDDYYYY(toDate.value) : ''
  return from && to ? `${from} - ${to}` : from ? `${from} - ` : ''
})

function handleClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement
  if (!target.closest('.date-range-container')) {
    showDateDropdown.value = false
  }
}

onMounted(() => {
  const saved = localStorage.getItem('users')
  if (saved) {
    try {
      users.value = JSON.parse(saved)
    } catch (e) {
      users.value = []
      console.error('❌ Failing in parsing the data', e)
    }
  }
  window.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside)
})

const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const emailMatch = filterEmail.value.trim() === '' || user.email.includes(filterEmail.value.trim())
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase()
    const fullNameMatch = filterFullName.value.trim() === '' || fullName.includes(filterFullName.value.trim().toLowerCase())
    const statusMatch = filterStatus.value === 'Choose status' || user.status === filterStatus.value

    let dateMatch = true
    if (fromDate.value || toDate.value) {
      const updatedAt = new Date(user.updatedAt)
      const from = fromDate.value ? new Date(fromDate.value) : null
      const to = toDate.value ? new Date(toDate.value) : null
      dateMatch = (!from || updatedAt >= from) && (!to || updatedAt <= to)
    }

    return emailMatch && fullNameMatch && statusMatch && dateMatch
  })
})

function openCreateModal() {
  openCreateModalFn(showModal, form, selectStatus)
}

function closeCreateModal() {
  closeCreateModalFn(showModal, firstNameError, lastNameError, usernameError, statusError)
}

function handleEdit(user: User) {
  handleEditFn(user, form, selectStatus, showModal)
}

function handleSubmit(newUser: any) {
  handleSubmitFn(
    newUser,
    users,
    firstNameError,
    lastNameError,
    usernameError,
    emailError,
    statusError,
    closeCreateModal
  )
}

function toggleFilters() {
  toggleFiltersFn(showFilters)
}

function handleDeleteRequest(user: User) {
  handleDeleteRequestFn(user, selectedUser, showConfirmModal)
}

function confirmDelete() {
  confirmDeleteFn(users, selectedUser, showConfirmModal)
}

function handleActive(user: User) {
  handleActiveFn(user, selectedUserForActive, confirmActiveVisible)
}

function confirmActive() {
  confirmActiveFn(users, selectedUserForActive, confirmActiveVisible)
}

function cancelActive() {
  cancelActiveFn(confirmActiveVisible, selectedUserForActive)
}

function handleLock(user: User) {
  handleLockFn(user, lockedUser, showConfirmModal)
}

function handleSelectStatus(newStatus: string) {
  selectStatus.value = newStatus
}

// function goToEmployeepage () {
//     console.log('Navigating to Employee page')
//     router.push ('/employee')
// }
</script>

<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">User List</h1>
      <div class="flex gap-2">
        <button @click="toggleFilters" class="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          <span class="flex items-center gap-1">
            <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.4881 1.6665H2.51176C1.76934 1.6665 1.39754 2.56412 1.92251 3.08909L6.08917 7.25576C6.24545 7.41204 6.33325 7.624 6.33325 7.84502V11.2498C6.33325 11.5121 6.45675 11.7591 6.66658 11.9165L8.99992 13.6665C9.2746 13.8725 9.66658 13.6765 9.66658 13.3332V7.84502C9.66658 7.624 9.75438 7.41204 9.91066 7.25576L14.0773 3.08909C14.6023 2.56412 14.2305 1.6665 13.4881 1.6665Z" stroke="white" stroke-width="1.6" stroke-linecap="round" />
            </svg>
            Filters
          </span>
        </button>
        <button @click="openCreateModal" class="px-3 py-1 border text-sm text-blue-600 border-blue-600 rounded hover:bg-blue-50">
          + Create New
        </button>
      </div>
    </div>

    <div v-if="showFilters" class="grid grid-cols-4 gap-4 mb-6">
      <input v-model="filterEmail" type="text" placeholder="Enter email address" class="border px-3 py-2 rounded w-full text-sm" />
      <input v-model="filterFullName" type="text" placeholder="Enter full name" class="border px-3 py-2 rounded w-full text-sm" />
      <div class="relative w-full date-range-container">
        <input type="text" :value="formattedRange || ''" readonly placeholder="From date - To date" class="border px-3 py-2 rounded w-full text-sm bg-white" />
        <button type="button" class="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700" @click.stop="showDateDropdown = !showDateDropdown">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 4h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2z" />
          </svg>
        </button>
        <div v-if="showDateDropdown" class="absolute z-10 bg-white shadow-md rounded p-3 mt-2 flex flex-col gap-2 w-full">
          <label class="text-xs text-gray-500">From date</label>
          <input type="date" v-model="fromDate" class="border px-2 py-1 rounded text-sm" />
          <label class="text-xs text-gray-500">To date</label>
          <input type="date" v-model="toDate" class="border px-2 py-1 rounded text-sm" />
        </div>
      </div>
      <select v-model="filterStatus" class="border px-3 py-2 rounded w-full text-sm text-gray-500">
        <option>Choose status</option>
        <option>Active</option>
        <option>Pending</option>
        <option>Activation expired</option>
      </select>
    </div>

    <UserTable :users="filteredUsers" @edit="handleEdit" @deleteAccount="handleDeleteRequest" @active="handleActive" @lock="handleLock" />

    <UserModal :showModal="showModal" :form="form" :selectStatus="selectStatus" :closeCreateModal="closeCreateModal" :firstNameError="firstNameError" :lastNameError="lastNameError" :usernameError="usernameError" :emailError="emailError" :statusError="statusError" @submit="handleSubmit" @update:selectStatus="handleSelectStatus" />

    <ConfirmModal :visible="showConfirmModal" @confirm="confirmDelete" @cancel="showConfirmModal = false" />
    <ConfirmModal :visible="confirmActiveVisible" @confirm="confirmActive" @cancel="cancelActive" />
  </div>
</template>
