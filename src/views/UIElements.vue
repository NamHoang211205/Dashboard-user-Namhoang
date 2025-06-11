<script setup lang="ts">
import { ref } from 'vue'

// Toggle filters and modal
const showFilters = ref(true)
const showModal = ref(false)
const showStatusSelect = ref(false)

// Form data and selected status
const form = ref({
  firstName: '',
  lastName: '',
  username: '',
})
const selectStatus = ref('Choose status')

// Validation error messages
const firstNameError = ref('')
const lastNameError = ref('')
const usernameError = ref('')

// Sample user list (will display in table)
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

// Open modal
function openCreateModal() {
  showModal.value = true
}

// Close modal and reset form + errors
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

// Validate all input fields
function validateForm() {
  let valid = true

  if (!form.value.firstName.trim()) {
    firstNameError.value = 'This field can not be blank'
    valid = false
  } else {
    firstNameError.value = ''
  }

  if (!form.value.lastName.trim()) {
    lastNameError.value = 'This field can not be blank'
    valid = false
  } else {
    lastNameError.value = ''
  }

  if (!form.value.username.trim()) {
    usernameError.value = 'This field can not be blank'
    valid = false
  } else {
    usernameError.value = ''
  }

  return valid
}

// Handle Save: show status select if valid
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
        <button @click="showFilters = !showFilters"
          class="flex items-center gap-2 px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700">
          Filters
        </button>
        <button @click="openCreateModal"
          class="px-4 py-2 text-sm border border-blue-600 text-blue-600 rounded hover:bg-blue-50">
          + Create New
        </button>
      </div>
    </div>

    <!-- Filter Inputs -->
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
    <div class="bg-white rounded shadow overflow-x-auto">
      <table class="min-w-full text-sm text-left">
        <thead class="bg-gray-100 text-gray-600 font-medium">
          <tr>
            <th class="px-6 py-3">No.</th>
            <th class="px-6 py-3">Username</th>
            <th class="px-6 py-3">Full Name</th>
            <th class="px-6 py-3">Status</th>
            <th class="px-6 py-3">Updated Date</th>
            <th class="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 text-gray-700">
          <tr v-for="(user, index) in users" :key="index">
            <td class="px-6 py-3">{{ index + 1 }}</td>
            <td class="px-6 py-3">{{ user.username }}</td>
            <td class="px-6 py-3">{{ user.fullName }}</td>
            <td class="px-6 py-3">
              <span :class="[
                'px-2 py-1 text-xs font-medium rounded border',
                user.status === 'Active' ? 'text-green-600 border-green-600 bg-green-50' :
                user.status === 'Pending' ? 'text-orange-600 border-orange-600 bg-orange-50' :
                'text-blue-600 border-blue-600 bg-blue-50'
              ]">
                {{ user.status }}
              </span>
            </td>
            <td class="px-6 py-3">{{ user.updatedAt }}</td>
            <td class="px-6 py-3 text-sm text-gray-500">[...]</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div class="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 relative">
          <!-- Close Button -->
          <button @click="closeCreateModal"
                  class="absolute top-4 right-4 text-xl font-bold text-gray-400 hover:text-black">
            &times;
          </button>

          <h2 class="text-lg font-semibold mb-6">Create New User</h2>

          <!-- Form -->
          <div class="grid grid-cols-2 gap-4">
            <!-- Last Name -->
            <div>
              <label class="block mb-1 text-sm font-medium">Last Name<span class="text-red-500">*</span></label>
              <input v-model="form.lastName"
                     :class="['w-full border rounded px-3 py-2', lastNameError ? 'border-red-500' : 'border-gray-300']"
                     placeholder="Enter last name" />
              <p v-if="lastNameError" class="text-red-500 text-sm mt-1">{{ lastNameError }}</p>
            </div>

            <!-- First Name -->
            <div>
              <label class="block mb-1 text-sm font-medium">First Name<span class="text-red-500">*</span></label>
              <input v-model="form.firstName"
                     :class="['w-full border rounded px-3 py-2', firstNameError ? 'border-red-500' : 'border-gray-300']"
                     placeholder="Enter first name" />
              <p v-if="firstNameError" class="text-red-500 text-sm mt-1">{{ firstNameError }}</p>
            </div>

            <!-- Username -->
            <div class="col-span-2">
              <label class="block mb-1 text-sm font-medium">Username<span class="text-red-500">*</span></label>
              <div class="flex">
                <input v-model="form.username"
                       :class="['flex-1 border rounded-l px-3 py-2', usernameError ? 'border-red-500' : 'border-gray-300']"
                       placeholder="Enter username" />
                <span class="px-3 py-2 bg-gray-100 border border-l-0 rounded-r text-gray-500">lotte.vn</span>
              </div>
              <p v-if="usernameError" class="text-red-500 text-sm mt-1">{{ usernameError }}</p>
            </div>

            <!-- Status Select -->
            <div class="col-span-2" v-if="showStatusSelect">
              <label class="block mb-1 text-sm font-medium">Status<span class="text-red-500">*</span></label>
              <select v-model="selectStatus" class="w-full border rounded px-3 py-2">
                <option disabled>Choose status</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Activation expired">Activation expired</option>
              </select>
            </div>
          </div>

          <!-- Footer Buttons -->
          <div class="flex justify-end gap-2 mt-6">
            <button @click="closeCreateModal"
                    class="px-4 py-2 border border-gray-400 text-gray-600 rounded hover:bg-gray-100">
              Back
            </button>
            <button @click="handleSave"
                    class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Save
            </button>
            <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Save and create employee
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
