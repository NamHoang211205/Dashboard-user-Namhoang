<script setup lang="ts">
import { computed, reactive, watch } from 'vue'

const props = defineProps<{
  showModal: boolean
  form: {
    firstName: string
    lastName: string
    username: string
    updatedAt: string
  }
  selectStatus: string
  firstNameError: string
  lastNameError: string
  usernameError: string
  closeCreateModal: () => void
}>()

const emit = defineEmits(['update:selectStatus', 'submit'])

const localForm = reactive({
  firstName: '',
  lastName: '',
  username: '',
})

watch(
  () => props.showModal,
  (visible) => {
    if (visible) {
      localForm.firstName = props.form.firstName
      localForm.lastName = props.form.lastName
      localForm.username = props.form.username
    }
  },
  { immediate: true }
)

const isFormValid = computed(() => {
  return (
    localForm.firstName.trim() !== '' &&
    localForm.lastName.trim() !== '' &&
    localForm.username.trim() !== ''
  )
})

function formatDate(date: Date): string {
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  const hh = String(date.getHours()).padStart(2, '0')
  const min = String(date.getMinutes()).padStart(2, '0')
  const ss = String(date.getSeconds()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`
}

function handleLocalSave() {
  emit('submit', {
    ...localForm,
    status: props.selectStatus,
  })
}
</script>

<template>
  <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white p-6 rounded shadow w-[600px]">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">Update User</h2>
        <button @click="props.closeCreateModal" class="text-gray-500 text-xl">✕</button>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1">Last Name <span class="text-red-500">*</span></label>
          <input v-model="localForm.lastName" class="w-full border rounded px-3 py-2" />
          <p class="text-red-500 text-sm">{{ props.lastNameError }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">First Name <span class="text-red-500">*</span></label>
          <input v-model="localForm.firstName" class="w-full border rounded px-3 py-2" />
          <p class="text-red-500 text-sm">{{ props.firstNameError }}</p>
        </div>

        <div class="col-span-2">
          <label class="block text-sm font-medium mb-1">Username <span class="text-red-500">*</span></label>
          <input v-model="localForm.username" class="w-full border rounded px-3 py-2" />
          <p class="text-red-500 text-sm">{{ props.usernameError }}</p>
        </div>

        <div class="col-span-2">
          <label class="block text-sm font-medium mb-1">Status <span class="text-red-500">*</span></label>
          <select
            :value="props.selectStatus"
            @input="emit('update:selectStatus', ($event.target as HTMLSelectElement).value)"
            class="w-full border rounded px-3 py-2"
          >
            <option disabled>Choose status</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Activation expired</option>
          </select>
        </div>

        <div class="col-span-2">
          <label class="block text-sm font-medium mb-1">Updated At</label>
          <input
            type="text"
            :value="formatDate(new Date())"
            readonly
            class="w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
          />
        </div>
      </div>

      <div class="flex justify-end gap-2 mt-6">
        <button @click="props.closeCreateModal" class="px-4 py-2 border text-gray-600 rounded hover:bg-gray-50">
          Back
        </button>
        <button @click="handleLocalSave" class="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
          Save
        </button>
      </div>
    </div>
  </div>
</template>
