<script setup lang="ts">
import { ref } from 'vue'
import UserTable from '../components/UserTable.vue'
import UserModal from '../components/UserModal.vue' 

// State
const showFilters = ref(true)
const showModal = ref(false)
const showStatusSelect = ref(false)

const form = ref({
  firstName: '',
  lastName: '',
  username: '',
})

const selectStatus = ref('Choose status')
const firstNameError = ref('')
const lastNameError = ref('')
const usernameError = ref('')

const users = ref([
  {
    username: 'anhnv2@lotte.vn',
    fullName: 'Theodore T.C. Calvin',
    status: 'Pending',
    updatedAt: '2023/12/12 12:00',
  },
  {
    username: 'anhnv2@lotte.vn',
    fullName: 'Theodore T.C. Calvin',
    status: 'Active',
    updatedAt: '2023/12/12 12:00',
  },
  {
    username: 'anhnv2@lotte.vn',
    fullName: 'Theodore T.C. Calvin',
    status: 'Activation expired',
    updatedAt: '2023/12/12 12:00',
  },
])

function openCreateModal() {
  showModal.value = true
}

function closeCreateModal() {
  showModal.value = false
  showStatusSelect.value = false
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
  if (validateForm()) {
    showStatusSelect.value = true
  }
}
</script>

<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <!-- Header -->
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">User List</h1>
      <div class="flex gap-2">
        <button @click="showFilters = !showFilters" class="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700">
          Filters
        </button>
        <button @click="openCreateModal" class="px-4 py-2 text-sm border border-blue-600 text-blue-600 rounded hover:bg-blue-50">
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

    <!-- User Modal (with correct v-model usage) -->
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
