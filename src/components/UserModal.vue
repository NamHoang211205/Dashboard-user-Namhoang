<script setup lang="ts">
import { ref, onMounted } from 'vue'
import UserTable from '../components/UserTable.vue'
import UserModal from '../components/UserModal.vue'

// State
const showFilters = ref(true)
const showModal = ref(false)
const showStatusSelect = ref(false)
const formStep = ref(1) // 1 for form, 2 for status selection

const form = ref({
  firstName: '',
  lastName: '',
  username: '',
})

const selectStatus = ref('Choose status')
const firstNameError = ref('')
const lastNameError = ref('')
const usernameError = ref('')

interface User {
  username: string;
  fullName: string;
  status: string;
  updatedAt: string;
}

const users = ref<User[]>([])

// Load from localStorage on mount
onMounted(() => {
  const saved = localStorage.getItem('users')
  if (saved) {
    users.value = JSON.parse(saved)
  }
})

function openCreateModal() {
  showModal.value = true
}

function closeCreateModal() {
  showModal.value = false
  showStatusSelect.value = false
  formStep.value = 1
  selectStatus.value = 'Choose status'
  firstNameError.value = ''
  lastNameError.value = ''
  usernameError.value = ''
  form.value = {
    firstName: '',
    lastName: '',
    username: '',
  }
}

function validateForm() {
  let valid = true
  if (!form.value.firstName.trim()) {
    firstNameError.value = 'This field can not be blank'
    valid = false
  } else firstNameError.value = ''

  if (!form.value.lastName.trim()) {
    lastNameError.value = 'This field can not be blank'
    valid = false
  } else lastNameError.value = ''

  if (!form.value.username.trim()) {
    usernameError.value = 'This field can not be blank'
    valid = false
  } else usernameError.value = ''

  return valid
}

function handleSave() {
  if (formStep.value === 1) {
    if (validateForm()) {
      showStatusSelect.value = true
      formStep.value = 2
    }
  } else if (formStep.value === 2) {
    if (selectStatus.value !== 'Choose status') {
      const newUser = {
        username: form.value.username,
        fullName: `${form.value.firstName} ${form.value.lastName}`,
        status: selectStatus.value,
        updatedAt: new Date().toISOString(),
      }

      users.value.push(newUser)
      localStorage.setItem('users', JSON.stringify(users.value))
      closeCreateModal()
    } else {
      alert('Please select a status')
    }
  }
}
</script>

<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <!-- Header -->
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">User List</h1>
      <div class="flex gap-2">
        <button @click="showFilters = !showFilters"
          class="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700">
          Filters
        </button>
        <button @click="openCreateModal"
          class="px-4 py-2 text-sm border border-blue-600 text-blue-600 rounded hover:bg-blue-50">
          + Create New
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div v-if="showFilters" class="grid grid-cols-4 gap-4 bg-white p-4 rounded shadow mb-4">
      <div>
        <label class="block text-sm text-gray-600 mb-1">Email Address</label>
        <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded" placeholder="Enter email address" />
      </div>
      <div>
        <label class="block text-sm text-gray-600 mb-1">Full Name</label>
        <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded" placeholder="Enter full name" />
      </div>
      <div>
        <label class="block text-sm text-gray-600 mb-1">Updated Date</label>
        <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded" placeholder="From - To date" />
      </div>
      <div>
        <label class="block text-sm text-gray-600 mb-1">Status</label>
        <select class="w-full px-3 py-2 border border-gray-300 rounded">
          <option>Choose status</option>
          <option>Active</option>
          <option>Pending</option>
          <option>Activation expired</option>
        </select>
      </div>
    </div>

    <!-- User Table -->
    <UserTable :users="users" />

    <!-- User Modal -->
    <UserModal
      v-model:selectStatus="selectStatus"
      :showModal="showModal"
      :form="form"
      :showStatusSelect="showStatusSelect"
      :firstNameError="firstNameError"
      :lastNameError="lastNameError"
      :usernameError="usernameError"
      :closeCreateModal="closeCreateModal"
      :handleSave="handleSave"
    />
  </div>
</template>
