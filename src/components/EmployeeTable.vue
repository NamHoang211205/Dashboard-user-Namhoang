<script setup lang="ts">
import type { PropType } from 'vue'
import type { EmployeeForm } from '../utils/types'
import ActionButton from './ActionButton.vue'

const props = defineProps({
  employees: {
    type: Array as PropType<EmployeeForm[]>,
    required: true
  }
})

const emit = defineEmits<{
  (e: 'edit', employee: EmployeeForm): void
  (e: 'deleteAccount', employee: EmployeeForm): void
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
          <th class="px-6 py-3">Status</th>
          <th class="px-6 py-3">Probation Date</th>
          <th class="px-6 py-3">Action</th>
        </tr>
      </thead>
      <tbody class="text-gray-700">
        <tr v-for="(emp, index) in employees" :key="index" class="border-t">
          <td class="px-6 py-3">{{ index + 1 }}</td>
          <td class="px-6 py-3">{{ emp.employeeCode }}</td>
          <td class="px-6 py-3">{{ emp.firstName }} {{ emp.lastName }}</td>
          <td class="px-6 py-3">{{ emp.email }}</td>
          <td class="px-6 py-3">{{ emp.department }}</td>
          <td class="px-6 py-3">{{ emp.jobTitle }}</td>
          <td class="px-6 py-3">{{ emp.position }}</td>
          <td class="px-6 py-3">
            <span :class="[
              'px-2 py-1 rounded text-xs font-semibold',
              emp.status === 'Working'
                ? 'bg-green-100 text-green-600'
                : 'bg-red-100 text-red-600'
            ]">
              {{ emp.status }}
            </span>
          </td>
          <td class="px-6 py-3">{{ emp.probationDate }}</td>

          <td class="px-6 py-3">
            <ActionButton
              :isLockedDisabled="emp.status === 'Resigned'"
              @edit="$emit('edit', emp)"
              @deleteAccount="$emit('deleteAccount', emp)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
