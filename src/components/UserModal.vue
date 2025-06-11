<script setup lang="ts">
const props = defineProps<{
  showModal: boolean
  form: {
    firstName: string
    lastName: string
    username: string
  }
  selectStatus: string
  showStatusSelect: boolean
  firstNameError: string
  lastNameError: string
  usernameError: string
  closeCreateModal: () => void
  handleSave: () => void
}>()

const emit = defineEmits<{
  (e: 'update:selectStatus', value: string): void
}>()
</script>

<template>
  <Teleport to="body">
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div class="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 relative">
        <!-- Close Button -->
        <button @click="closeCreateModal" class="absolute top-4 right-4 text-xl font-bold text-gray-400 hover:text-black">
          &times;
        </button>

        <h2 class="text-lg font-semibold mb-6">Create New User</h2>

        <!-- Form Fields -->
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
            <select
              :value="selectStatus"
              @change="emit('update:selectStatus', ($event.target as HTMLSelectElement).value)"
              class="w-full border rounded px-3 py-2"
            >
              <option disabled>Choose status</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Activation expired">Activation expired</option>
            </select>
          </div>
        </div>

        <!-- Footer Buttons -->
        <div class="flex justify-end gap-2 mt-6">
          <button @click="closeCreateModal" class="px-4 py-2 border border-gray-400 text-gray-600 rounded hover:bg-gray-100">
            Back
          </button>
          <button @click="handleSave" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Save
          </button>
          <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Save and create employee
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

