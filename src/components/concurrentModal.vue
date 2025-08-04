<script setup lang="ts">
import {reactive, onMounted} from 'vue'
import type {ConcurrentForm} from '../utils/types'

const props = defineProps<{
    editingdata?: ConcurrentForm | null
}>()

const emit = defineEmits<{
    (e: 'save', value: ConcurrentForm): void
    (e: 'close'): void
}>()

const tempForm = reactive<ConcurrentForm>({
  departmentLevel: '',
  departmentName: '',
  jobTitle: '',
  position: '',
  responsibility: ''
})

onMounted(() => {
  if (props.editingdata) {
    Object.assign(tempForm, props.editingdata)
  }
})

function handleSave() {
  emit('save', { ...tempForm })
}
</script>
<template>
    <div class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl shadow-lg p-6 w-[650px] relative">
        <!-- Close button -->
        <button
          @click="$emit('close')"
          class="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
        >×</button>
  
        <!-- Title -->
        <h2 class="text-xl font-semibold mb-6">
          {{ editingdata ? 'Edit Concurrent Employment' : 'Add Concurrent Employment' }}
        </h2>
  
        <!-- Form fields -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">Department Level</label>
            <select v-model="tempForm.departmentLevel" class="input-field">
              <option disabled value="">Choose level</option>
              <option>Division</option>
              <option>Branch</option>
            </select>
          </div>
  
          <div>
            <label class="block text-sm font-medium mb-1">Department Name</label>
            <select v-model="tempForm.departmentName" class="input-field">
              <option disabled value="">Choose department</option>
              <option>Platform Dev.</option>
              <option>Sales</option>
              <option>PM Department</option>
            </select>
          </div>
  
          <div>
            <label class="block text-sm font-medium mb-1">Job Title</label>
            <select v-model="tempForm.jobTitle" class="input-field">
              <option disabled value="">Choose job title</option>
              <option>Business Analyst</option>
              <option>Developer</option>
            </select>
          </div>
  
          <div>
            <label class="block text-sm font-medium mb-1">Position</label>
            <select v-model="tempForm.position" class="input-field">
              <option disabled value="">Choose position</option>
              <option>Manager</option>
              <option>Staff</option>
            </select>
          </div>
  
          <div class="col-span-2">
            <label class="block text-sm font-medium mb-1">Responsibility</label>
            <input
              v-model="tempForm.responsibility"
              type="text"
              class="input-field"
              placeholder="Enter responsibility"
            />
          </div>
        </div>
  
        <!-- Action buttons -->
        <div class="mt-6 flex justify-end gap-3">
          <button
            @click="$emit('close')"
            class="px-4 py-2 border rounded text-blue-600 border-blue-600 hover:bg-blue-50"
          >
            Back
          </button>
          <button
            @click="handleSave"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .input-field {
    @apply border px-3 py-2 rounded text-sm w-full outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500;
  }
  </style>