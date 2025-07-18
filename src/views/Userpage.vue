<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
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

const showModal = ref(false)
const form = ref({ id: '', firstName: '', lastName: '', username: '', email:'', updatedAt: '' })
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
const filterDateRange = ref('')
const filterStatus = ref('Choose status')
const filteredUsers = computed(() => {
  return users.value.filter(user => {
    // Filtering email
    const emailMatch = filterEmail.value.trim() === '' || user.username.includes(filterEmail.value.trim())

    // Filtering full name
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase()
    const fullNameMatch = filterFullName.value.trim() === '' || fullName.includes(filterFullName.value.trim().toLowerCase())

    // Filtering status
    const statusMatch = filterStatus.value === 'Choose status' || user.status === filterStatus.value

    // Filter Date
    let dateMatch = true
    if (filterDateRange.value.includes('-')) {
      const [from, to] = filterDateRange.value.split('-').map(s => s.trim())
      const updatedAt = user.updatedAt.split(' ')[0] // only take the date part
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

// Save users to localStorage whenever they change
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
})
</script>

<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">User List</h1>
      <div class="flex gap-2">
        <button @click="toggleFilters"
          class="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          <span class="flex items-center gap-1">
            <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13.4881 1.6665H2.51176C1.76934 1.6665 1.39754 2.56412 1.92251 3.08909L6.08917 7.25576C6.24545 7.41204 6.33325 7.624 6.33325 7.84502V11.2498C6.33325 11.5121 6.45675 11.7591 6.66658 11.9165L8.99992 13.6665C9.2746 13.8725 9.66658 13.6765 9.66658 13.3332V7.84502C9.66658 7.624 9.75438 7.41204 9.91066 7.25576L14.0773 3.08909C14.6023 2.56412 14.2305 1.6665 13.4881 1.6665Z"
                stroke="white" stroke-width="1.6" stroke-linecap="round" />
            </svg>
            Filters
          </span>
        </button>

        <button @click="openCreateModal"
          class="px-3 py-1 border text-sm text-blue-600 border-blue-600 rounded hover:bg-blue-50">
          + Create New
        </button>
      </div>
    </div>

    <div v-if="showFilters" class="grid grid-cols-4 gap-4 mb-6">
      <input v-model="filterEmail" type="text" placeholder="Enter email address" class="border px-3 py-2 rounded w-full" />
      <input v-model="filterFullName" type="text" placeholder="Enter full name" class="border px-3 py-2 rounded w-full" />
      <input v-model="filterDateRange" type="text" placeholder="From date - To date" class="border px-3 py-2 rounded w-full" />
      <select v-model="filterStatus" class="border px-3 py-2 rounded w-full">
        <option>Choose status</option>
        <option>Active</option>
        <option>Pending</option>
        <option>Activation expired</option>
      </select>
    </div>

    <UserTable :users="filteredUsers" @edit="handleEdit" @deleteAccount="handleDeleteRequest" @active="handleActive"
      @lock="handleLock" />

    <UserModal
      :showModal="showModal"
      :form="form"
      :selectStatus="selectStatus"
      :closeCreateModal="closeCreateModal"
      :firstNameError="firstNameError"
      :lastNameError="lastNameError"
      :usernameError="usernameError"
      :emailError="emailError"
      :statusError="statusError"
      @submit="handleSubmit"
      @update:selectStatus="handleSelectStatus"
    />

    <!-- Confirm Delete Modal -->
    <ConfirmModal :visible="showConfirmModal" @confirm="confirmDelete" @cancel="showConfirmModal = false" />

    <!-- Confirm Activate Modal -->
    <ConfirmModal :visible="confirmActiveVisible" @confirm="confirmActive" @cancel="cancelActive" />
  </div>
</template>
