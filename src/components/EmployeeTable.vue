<script setup lang="ts">
import type { PropType } from 'vue'

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

const props = defineProps({
  employees: {
    type: Array as PropType<Employee[]>,
    required: true
  }
})

const emit = defineEmits<{
  (e: 'delete', employee: Employee): void
}>()
</script>

<template>
  <div class="bg-white rounded shadow overflow-x-auto">
    <table class="min-w-full text-sm text-left">
      <thead class="bg-gray-100 text-gray-600 font-medium">
        <tr>
          <th class="px-6 py-3">No.</th>
          <th class="px-6 py-3">Employee Code</th>
          <th class="px-6 py-3">Full Name</th>
          <th class="px-6 py-3">Email Address</th>
          <th class="px-6 py-3">Working Department</th>
          <th class="px-6 py-3">Job Title</th>
          <th class="px-6 py-3">Position</th>
          <th class="px-6 py-3">Concurrent Employment</th>
          <th class="px-6 py-3">Status</th>
          <th class="px-6 py-3">Probation Date</th>
          <th class="px-6 py-3">Action</th>
        </tr>
      </thead>
      <tbody class="text-gray-700">
        <tr v-for="(emp, index) in employees" :key="index" class="border-t">
          <td class="px-6 py-3">{{ index + 1 }}</td>
          <td class="px-6 py-3">{{ emp.employeeCode }}</td>
          <td class="px-6 py-3">{{ emp.fullName }}</td>
          <td class="px-6 py-3">{{ emp.email }}</td>
          <td class="px-6 py-3">{{ emp.department }}</td>
          <td class="px-6 py-3">{{ emp.jobTitle }}</td>
          <td class="px-6 py-3">{{ emp.position }}</td>
          <td class="px-6 py-3">{{ emp.concurrentEmployment || '-' }}</td>
          <td class="px-6 py-3">
            <span
              :class="[
                'px-2 py-1 rounded text-xs font-semibold',
                emp.status === 'Working'
                  ? 'bg-green-100 text-green-600'
                  : 'bg-red-100 text-red-600'
              ]"
            >
              {{ emp.status }}
            </span>
          </td>
          <td class="px-6 py-3">{{ emp.probationDate }}</td>
          <td class="px-6 py-3">
            <div class="flex items-center gap-2 text-gray-500">
              <button
                title="Delete"
                @click="$emit('delete', emp)"
                class="hover:text-red-600"
                :disabled="emp.status === 'Resigned'"
              >
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M3 6h18" />
                  <path d="M8 6v14h8V6M10 6V4h4v2" />
                </svg>
              </button>
              <button
                title="Lock/Unlock"
                class="hover:text-orange-500"
                :disabled="emp.status === 'Resigned'"
              >
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M12 17a1 1 0 001-1V9a1 1 0 10-2 0v7a1 1 0 001 1z" />
                  <path d="M17 9V7a5 5 0 00-10 0v2" />
                  <rect x="5" y="9" width="14" height="11" rx="2" />
                </svg>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
