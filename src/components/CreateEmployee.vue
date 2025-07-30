<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { EmployeeForm } from '../utils/types'
import {
  validateFirstName,
  validateLastName,
  validateUsername,
  validateEmail,
  validatePhone,
  validateDate,
  validateDropdown
} from '../utils/Validation'

const router = useRouter()
const firstNameError = ref('')
const lastNameError = ref('')
const usernameError = ref('')
const emailError = ref('')
const telError = ref('')
const mobileError = ref('')
const dobError = ref('')
const genderError = ref('')
const departmentError = ref('')
const jobTitleError = ref('')
const positionError = ref('')
const gradeError = ref('')
const probationDateError = ref('')
const officialDateError = ref('')


const form = reactive<EmployeeForm>({
  id: '',
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  tel: '',
  mobile: '',
  dob: '',
  gender: '',
  department: '',
  jobTitle: '',
  position: '',
  grade: '',
  probationDate: '',
  officialDate: '',
  avatar: ''
})

function handleBack() {
  router.push('/employee')
}

function handleSave() {
  const isValid =
    validateFirstName(form.firstName, firstNameError) &&
    validateLastName(form.lastName, lastNameError) &&
    validateUsername(form.username, usernameError) &&
    validateEmail(form.email, emailError) &&
    validatePhone(form.tel, telError) &&
    validatePhone(form.mobile, mobileError) &&
    validateDate(form.dob, dobError, 'Date of Birth ') &&
    validateDropdown(form.gender, genderError, 'Gender') &&
    validateDropdown(form.department, departmentError, 'Department') &&
    validateDropdown(form.jobTitle, jobTitleError, 'Job Title') &&
    validateDropdown(form.position, positionError, 'Position') &&
    validateDropdown(form.grade, gradeError, 'Grade') &&
    validateDate(form.probationDate, probationDateError, 'Probation Date') &&
    validateDate(form.officialDate, officialDateError, 'Official Date')

  if (!isValid) return
  const saved = localStorage.getItem('employees')
  const employees = saved ? JSON.parse(saved) : []

  // Create a new employee object
  const newEmployee = {
    ...form,
    id: form.id || crypto.randomUUID()
  }

  employees.push(newEmployee)
  localStorage.setItem('employees', JSON.stringify(employees))
  router.push('/employee')


}

function handleAvatarChange(event: Event) {
  const input = event.target as HTMLInputElement
  if (input.files?.length) {
    form.avatar = URL.createObjectURL(input.files[0])
  }
}
</script>

<template>
  <div class="p-6 bg-white min-h-screen">
    <!-- Breadcrumb -->
    <div class="text-sm text-gray-500 mb-2">
      <router-link to="/employee" class="hover:underline text-gray-400">Employee List</router-link>
      <span class="mx-2">→</span>
      <span class="text-blue-600 font-medium">Create new employee</span>
    </div>

    <!-- Title -->
    <h1 class="text-2xl font-bold mb-6">Create New Employee</h1>

    <!-- General Info -->
    <h2 class="text-lg font-semibold mb-2">General Information</h2>
    <div class="flex items-center gap-4 mb-6">
      <div class="w-24 h-24 rounded-full bg-gray-100 relative">
        <img v-if="form.avatar" :src="form.avatar" class="w-full h-full object-cover rounded-full" />
        <input type="file" class="hidden" id="avatarInput" accept="image/*" @change="handleAvatarChange" />
        <label for="avatarInput"
          class="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full cursor-pointer">
          ✎
        </label>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-4 mb-6">
      <div>
        <label class="block text-sm font-medium mb-1">Email Address <span class="text-red-500">*</span></label>
        <input v-model="form.email" type="email" placeholder="Enter email address" class="input-field" />
        <p class="text-red-500 text-sm">{{ emailError }}</p>
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">Last Name</label>
        <input v-model="form.lastName" class="input-field" />
        <p class="text-red-500 text-sm">{{ lastNameError }}</p>
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">First Name</label>
        <input v-model="form.firstName" class="input-field" />
        <p class="text-red-500 text-sm">{{ firstNameError }}</p>
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">Tel</label>
        <input v-model="form.tel" placeholder="Enter tel" class="input-field" />
        <p class="text-red-500 text-sm">{{ telError }}</p>
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">Mobile</label>
        <input v-model="form.mobile" placeholder="Enter mobile" class="input-field" />
        <p class="text-red-500 text-sm">{{ mobileError }}</p>
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">Date of Birth</label>
        <input v-model="form.dob" type="date" class="input-field" />
        <p class="text-red-500 text-sm">{{ dobError }}</p>
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">Gender</label>
        <select v-model="form.gender" class="input-field">
          <option disabled value="">Choose gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <p class="text-red-500 text-sm">{{ genderError }}</p>
      </div>
    </div>

    <!-- Work Info -->
    <h2 class="text-lg font-semibold mb-2 mt-8">Work Information</h2>
    <div class="grid grid-cols-3 gap-4 mb-6">
      <div>
        <label class="block text-sm font-medium mb-1">Working Department</label>
        <select v-model="form.department" class="input-field">
          <option disabled value="">Choose working department</option>
          <option>Platform DEV</option>
          <option>HR</option>
        </select>
        <p class="text-red-500 text-sm">{{ departmentError }}</p>
      </div>

      <!-- Job Info -->
      <div>
        <label class="block text-sm font-medium mb-1">Job Title</label>
        <select v-model="form.jobTitle" class="input-field">
          <option disabled value="">Choose job title</option>
          <option>BA</option>
          <option>Developer</option>
        </select>
        <p class="text-red-500 text-sm">{{ jobTitleError }}</p>
      </div>

      <!-- Working position -->
      <div>
        <label class="block text-sm font-medium mb-1">Position</label>
        <select v-model="form.position" class="input-field">
          <option disabled value="">Choose position</option>
          <option>Staff</option>
          <option>Manager</option>
        </select>
        <p class="text-red-500 text-sm">{{ positionError }}</p>
      </div>

      <!-- Grade Info -->
      <div>
        <label class="block text-sm font-medium mb-1">Grade</label>
        <select v-model="form.grade" class="input-field">
          <option disabled value="">Choose grade</option>
          <option>G1</option>
          <option>G2</option>
        </select>
        <p class="text-red-500 text-sm">{{ gradeError }}</p>
      </div>


      <div>
        <label class="block text-sm font-medium mb-1">Probation Date</label>
        <input v-model="form.probationDate" type="date" class="input-field" />
        <p class="text-red-500 text-sm">{{ probationDateError }}</p>
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Official Date</label>
        <input v-model="form.officialDate" type="date" class="input-field" />
      </div>
      <p class="text-red-500 text-sm">{{ officialDateError }}</p>
    </div>

    <!-- Concurrent Employment -->
    <button class="text-blue-600 text-sm border border-blue-600 px-3 py-1 rounded hover:bg-blue-50 mb-6">
      + Concurrent employment
    </button>

    <!-- Actions -->
    <div class="mt-6 flex justify-between">
      <button @click="handleBack" class="px-4 py-2 rounded border text-gray-700 hover:bg-gray-100">Back</button>
      <button @click="handleSave" class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Save</button>
    </div>
  </div>
</template>

<style scoped>
.input-field {
  @apply border px-3 py-2 rounded text-sm w-full;
}
</style>