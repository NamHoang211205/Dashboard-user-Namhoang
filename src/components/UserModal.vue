<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import {
  validateFirstName,
  validateLastName,
  validateUsername,
  validateStatus,
  validateEmail
} from '../utils/Validation'

const props = defineProps<{
  showModal: boolean
  form: {
    id?: string
    firstName: string
    lastName: string
    username: string
    email: string 
    updatedAt: string
  }
  selectStatus: string
  closeCreateModal: () => void
}>()

const emit = defineEmits(['update:selectStatus', 'submit'])

const localForm = reactive({
  id: '', 
  firstName: '',
  lastName: '',
  username: '',
  email: '',
})

const showUpdatedAt = ref(false)
const updatedAtText = ref('')


const firstNameError = ref("")
const lastNameError = ref("")
const usernameError = ref("")
const statusError = ref("")
const emailError = ref("")

watch(
  () => props.showModal,
  (visible) => {
    if (visible) {
      localForm.id = props.form.id || '' 
      localForm.firstName = props.form.firstName
      localForm.lastName = props.form.lastName
      localForm.username = props.form.username
      localForm.email = props.form.email || '' 

      updatedAtText.value = props.form.updatedAt || ''
      showUpdatedAt.value = !!props.form.updatedAt


      firstNameError.value = ''
      lastNameError.value = ''
      usernameError.value = ''
      emailError.value = ''
      statusError.value = ''
    }
  },
  { immediate: true }
)

function formatDate(date: Date): string {
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  const hh = String(date.getHours()).padStart(2, '0')
  const min = String(date.getMinutes()).padStart(2, '0')
  const ss = String(date.getSeconds()).padStart(2, '0')
  return `${yyyy}/${mm}/${dd} ${hh}:${min}:${ss}`
}

function handleLocalSave() {
  const isFirstNameValid = validateFirstName(localForm.firstName, firstNameError)
  const isLastNameValid = validateLastName(localForm.lastName, lastNameError)
  const isUsernameValid = validateUsername(localForm.username, usernameError)
  const isStatusValid = validateStatus(props.selectStatus, statusError)
  const isEmailValid = validateEmail(localForm.email, emailError)

  if (!isFirstNameValid || !isLastNameValid || !isUsernameValid || !isEmailValid || !isStatusValid) return

  emit('submit', {
    ...localForm,
    id: localForm.id || crypto.randomUUID(),
    status: props.selectStatus,
    updatedAt: formatDate(new Date()),
  })
}
</script>

<template>
  <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white p-6 rounded shadow w-[600px]">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">
          {{ localForm.id ? 'Update User' : 'Create User' }}
        </h2>
        <button @click="props.closeCreateModal" class="text-gray-500 text-xl">✕</button>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1">Last Name <span class="text-red-500">*</span></label>
          <input v-model="localForm.lastName" class="w-full border rounded px-3 py-2" />
          <p class="text-red-500 text-sm">{{ lastNameError }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">First Name <span class="text-red-500">*</span></label>
          <input v-model="localForm.firstName" class="w-full border rounded px-3 py-2" />
          <p class="text-red-500 text-sm">{{ firstNameError }}</p>
        </div>
        <div class="col-span-2">
          <label class="block text-sm font-medium mb-1">Username <span class="text-red-500">*</span></label>
          <input v-model="localForm.username" class="w-full border rounded px-3 py-2" />
          <p class="text-red-500 text-sm">{{ usernameError }}</p>
        </div>
        <div class="col-span-2">
          <label class="block text-sm font-medium mb-1">Email <span class="text-red-500">*</span></label>
          <input v-model="localForm.email" type="email" class="w-full border rounded px-3 py-2" />
          <p class="text-red-500 text-sm">{{ emailError }}</p>

        </div>
        <div class="col-span-2">
          <label class="block text-sm font-medium mb-1">Status <span class="text-red-500">*</span></label>
          <select
            :value="props.selectStatus"
            @change="emit('update:selectStatus', ($event.target as HTMLSelectElement).value)"
            class="w-full border rounded px-3 py-2"
          >
            <option disabled>Choose status</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Activation expired</option>
          </select>
          <p class="text-red-500 text-sm">{{ statusError }}</p>
        </div>

        <div class="col-span-2" v-if="showUpdatedAt">
          <label class="block text-sm font-medium mb-1">Updated At</label>
          <input
            type="text"
            :value="updatedAtText"
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
