<script setup lang="ts">
import { ref, onMounted } from 'vue'
import UserTable from '../components/UserTable.vue'
import UserModal from '../components/UserModal.vue'

const showModal = ref(false)
const form = ref({ firstName: '', lastName: '', username: '', updatedAt: '' })
const selectStatus = ref('Choose status')
const firstNameError = ref('')
const lastNameError = ref('')
const usernameError = ref('')

interface User {
  username: string
  fullName: string
  status: string
  updatedAt: string
}

const users = ref<User[]>([])

onMounted(() => {
  const saved = localStorage.getItem('users')
  if (saved) users.value = JSON.parse(saved)
})

function openCreateModal() {
  showModal.value = true
  form.value = { firstName: '', lastName: '', username: '', updatedAt: '' }
  selectStatus.value = 'Choose status'
}

function closeCreateModal() {
  showModal.value = false
  selectStatus.value = 'Choose status'
  firstNameError.value = ''
  lastNameError.value = ''
  usernameError.value = ''
}

function formatDate(date: Date): string {
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  const hh = String(date.getHours()).padStart(2, '0')
  const min = String(date.getMinutes()).padStart(2, '0')
  const ss = String(date.getSeconds()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`
}

function handleSubmit(newUser: any) {
  if (newUser.status === 'Choose status') {
    alert('Please select a status')
    return
  }

  users.value.push({
    username: newUser.username,
    fullName: `${newUser.firstName} ${newUser.lastName}`,
    status: newUser.status,
    updatedAt: formatDate(new Date()),
  })

  localStorage.setItem('users', JSON.stringify(users.value))
  closeCreateModal()
}
</script>

<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">User List</h1>
      <button @click="openCreateModal" class="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50">
        + Create New
      </button>
    </div>

    <UserTable :users="users" />

    <UserModal
      :showModal="showModal"
      :form="form"
      :selectStatus="selectStatus"
      :firstNameError="firstNameError"
      :lastNameError="lastNameError"
      :usernameError="usernameError"
      :closeCreateModal="closeCreateModal"
      @submit="handleSubmit"
      @update:selectStatus="val => selectStatus.valueOf = val"
    />
  </div>
</template>