<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from 'vue'
import EmployeeTable from '../components/EmployeeTable.vue'
import ConfirmModal from '../components/ConfirmModal.vue'
import { formatDateToMMDDYYYY } from '../utils/Format'
import { openCreateModalFn } from '../utils/Function'

export interface Employee {
  employeeCode: string
  fullName: string
  email: string
  department: string
  jobTitle: string
  position: string
  concurrentEmployment: string
  status: 'Working' | 'Resigned'
  probationDate: string
}

const employees = ref<Employee[]>([])
const filterEmail = ref('')
const filterFullName = ref('')
const filterStatus = ref('Choose status')
const showFilters = ref(true)

const showDateDropdown = ref(false)
const fromDate = ref('')
const toDate = ref('')

const showConfirmModal = ref(false)
const selectedEmployee = ref<Employee | null>(null)

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

function toggleFilters() {
  showFilters.value = !showFilters.value
}

function handleDelete(employee: Employee) {
  selectedEmployee.value = employee
  showConfirmModal.value = true
}

function confirmDelete() {
  if (selectedEmployee.value) {
    employees.value = employees.value.filter(emp => emp !== selectedEmployee.value)
    showConfirmModal.value = false
    selectedEmployee.value = null
  }
}

const filteredEmployees = computed(() => {
  return employees.value.filter(emp => {
    const emailMatch = filterEmail.value.trim() === '' || emp.email.includes(filterEmail.value.trim())
    const fullNameMatch = filterFullName.value.trim() === '' || emp.fullName.toLowerCase().includes(filterFullName.value.trim().toLowerCase())
    const statusMatch = filterStatus.value === 'Choose status' || emp.status === filterStatus.value

    let dateMatch = true
    if (fromDate.value || toDate.value) {
      const probation = new Date(emp.probationDate)
      const from = fromDate.value ? new Date(fromDate.value) : null
      const to = toDate.value ? new Date(toDate.value) : null
      dateMatch = (!from || probation >= from) && (!to || probation <= to)
    }

    return emailMatch && fullNameMatch && statusMatch && dateMatch
  })
})

onMounted(() => {
  const saved = localStorage.getItem('employees')
  if (saved) {
    try {
      employees.value = JSON.parse(saved)
    } catch (e) {
      console.error('❌ Failed to parse employees from localStorage', e)
      employees.value = []
    }
  }

  window.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside)
})

function openCreateModal() {
  openCreateModalFn(showConfirmModal)
}
</script>

<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Employee List</h1>
      <div>
        <button @click="toggleFilters"
          class="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Filters
        </button>
        <button @click="openCreateModal" class="px-3 py-1 border text-sm text-blue-600 border-blue-600 rounded hover:bg-blue-50">
          + Create New
        </button>
      </div>
    </div>

    <div v-if="showFilters" class="grid grid-cols-4 gap-4 mb-6">
      <input v-model="filterEmail" type="text" placeholder="Enter email address"
        class="border px-3 py-2 rounded w-full text-sm" />
      <input v-model="filterFullName" type="text" placeholder="Enter full name"
        class="border px-3 py-2 rounded w-full text-sm" />
      <div class="relative w-full date-range-container">
        <input type="text" :value="formattedRange || ''" readonly placeholder="Probation date range"
          class="border px-3 py-2 rounded w-full text-sm bg-white" />
        <button type="button" class="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
          @click.stop="showDateDropdown = !showDateDropdown">
          📅
        </button>
        <div v-if="showDateDropdown"
          class="absolute z-10 bg-white shadow-md rounded p-3 mt-2 flex flex-col gap-2 w-full">
          <label class="text-xs text-gray-500">From date</label>
          <input type="date" v-model="fromDate" class="border px-2 py-1 rounded text-sm" />
          <label class="text-xs text-gray-500">To date</label>
          <input type="date" v-model="toDate" class="border px-2 py-1 rounded text-sm" />
        </div>
      </div>
      <select v-model="filterStatus" class="border px-3 py-2 rounded w-full text-sm text-gray-500">
        <option>Choose status</option>
        <option>Working</option>
        <option>Resigned</option>
      </select>
    </div>

    <EmployeeTable :employees="filteredEmployees" @delete="handleDelete" />

    <ConfirmModal :visible="showConfirmModal" @confirm="confirmDelete" @cancel="showConfirmModal = false" />
  </div>
</template>
