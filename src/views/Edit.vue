<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

const route = useRouter()
const companyNameError = ref('')
const abbrevNameError = ref('')
const showEmailTip = ref(false)
const emailDomainError = ref('')
const form = ref({
    companyName: '',
    abbrevName: '',
    taxCode: '',
    address: '',
    adminUsername: '',
    emailDomain: '',
    contactPoint: '',
    updateDate: '',
})
// save form data to localStorage when the save button is clicked
// Using JSON.oarse to convert the string from localStorage back to an object
// Load saved company information from localStorage when the component is mounted
onMounted(() => {
    const saved = localStorage.getItem('companyInfo')
    if (saved) {
        form.value = JSON.parse(saved)
    }
})
// click save button to save form data and navigate to dashboard
// Using JSON.stringly to convert the form data to a string before saving it to localStorage
function goTopage() {
    let hasError = false

// Company Name validation 
if (!form.value.companyName.trim()) {
    companyNameError.value = 'Please enter Company Name before saving.'
    hasError = true
}

// Abbreviated Name validation 
if (!form.value.abbrevName.trim()) {
    abbrevNameError.value = 'Please enter Abbreviated Name before saving.'
    hasError = true
}

// check Email Domain
const emailDomain = form.value.emailDomain.trim()
const isValidEmailDomain = /^@[\w-]+\.\w{2}$/.test(emailDomain)

if (!isValidEmailDomain) {
    emailDomainError.value = 'Email domain must start with @ and have 2 characters after the dot.'
    hasError = true
}
// Clear error messages if validation passes
if (hasError) return

// Clear error messages if validation passes
const now = new Date()
form.value.updateDate = now.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
})

localStorage.setItem('companyInfo', JSON.stringify(form.value))
route.push('/dashboard')
console.log('Successful ✅', form.value)
}

// Automically save form data to localStorage when it changes
// watch(form, (newForm) => {
//     localStorage.setItem('companyInfo', JSON.stringify(newForm))
//     console.log('Successful ✅', newForm)
// }, { deep: true })

function backTopage() {
    route.push('/dashboard')
    console.log('Back to dashboard')
}

function onTaxCodeInput(event: Event) {
    const input = event.target as HTMLInputElement;
    // Remove any non-numeric characters
    input.value = input.value.replace(/\D/g, '');
    // Limit the input to 13 characters
    if (input.value.length > 13) {
        input.value = input.value.slice(0, 13);
    }
}
// function onEmailDomainInput(event: Event) {
//     let input = event.target as HTMLInputElement;
//     let value = '@' + input.value.replace(/^@+/, '')
//     // Remove invalid characters
//     value = value.replace(/(\.[^.]*)$/, m => m.slice(0, 3))
//     input.value = value
//     form.value.emailDomain = value// Remove invalid characters
//     // Ensure the input starts with '@' and contains no spaces
//     // Allow letters, numbers, '@', '.', and '-'
// }
</script>

<template>
    <div class="relative">
        <div class="p-8 bg-white shadow rounded-lg">
            <div class="flex items-center justify-between mb-6">
                <h2 class="text-xl font-semibold text-gray-900">Company Information</h2>
                <div class="flex items-center gap-x-4">
                    <button @click="backTopage"
                        class="px-6 py-2 text-sm font-semibold text-blue-600 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 shadow-sm">
                        Back
                    </button>
                    <button @click="goTopage"
                        class="px-6 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm">
                        Save
                    </button>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Company Name -->
                <div>
                    <label class="text-sm font-semibold text-gray-600">Company Name<span
                            class="text-red-500">*</span></label>
                    <input v-model="form.companyName" type="text"
                        class="w-full mt-1 p-2 border rounded-md text-sm text-gray-800"
                        placeholder="Enter company name" />
                    <p v-if="companyNameError" class="text-red-500 text-sm mt-1">{{ companyNameError }}</p>
                </div>

                <!-- Abbreviated Name -->
                <div>
                    <label class="text-sm font-semibold text-gray-600">Abbreviated Name<span
                            class="text-red-500">*</span></label>
                    <input v-model="form.abbrevName" type="text"
                        class="w-full mt-1 p-2 border rounded-md text-sm text-gray-800"
                        placeholder="Enter abbreviation" />
                    <p v-if="abbrevNameError" class="text-red-500 text-sm mt-1">{{ abbrevNameError }}</p>
                </div>

                <!-- Tax Code -->
                <div>
                    <label class="text-sm font-semibold text-gray-600">Tax Code</label>
                    <input v-model="form.taxCode" type="text" maxlength="13" inputmode="numeric" pattern="[0-9]*"
                        @input="onTaxCodeInput" class="w-full mt-1 p-2 border rounded-md text-sm text-gray-800"
                        placeholder="Enter tax code" />
                </div>

                <!-- Address -->
                <div class="md:col-span-2 lg:col-span-2">
                    <label class="text-sm font-semibold text-gray-600">Address</label>
                    <input v-model="form.address" type="text"
                        class="w-full mt-1 p-2 border rounded-md text-sm text-gray-800" placeholder="Enter address" />
                </div>

                <!-- Contact Point -->
                <div>
                    <label class="text-sm font-semibold text-gray-600">Contact Point</label>
                    <input v-model="form.contactPoint" type="text"
                        class="w-full mt-1 p-2 border rounded-md text-sm text-gray-800"
                        placeholder="Enter contact name" />
                </div>

                <!-- Super Admin -->
                <div>
                    <label class="text-sm font-semibold text-gray-600">Super Admin’s Username</label>
                    <input v-model="form.adminUsername" type="text"
                        class="w-full mt-1 p-2 border rounded-md text-sm text-gray-800" placeholder="Enter username" />
                </div>

                <!-- Email Domain -->
                <div class="relative">
                    <label class="text-sm font-semibold text-gray-600 flex items-center gap-1">
                        Email Domain
                        <button @click="showEmailTip = !showEmailTip" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400 hover:text-blue-500"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M12 18.5A6.5 6.5 0 1118.5 12 6.51 6.51 0 0112 18.5z" />
                            </svg>
                        </button>
                    </label>
                    <input v-model="form.emailDomain" type="text"
                        class="w-full mt-1 p-2 border rounded-md text-sm text-gray-800" placeholder="e.g. @lotte.vn" />
                    <p v-if="emailDomainError" class="text-red-500 text-sm mt-1">
                        {{ emailDomainError }}
                    </p>

                    <div v-if="showEmailTip"
                        class="absolute top-0 left-full ml-2 w-64 p-2 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded shadow z-10">
                        Requirements: <br>
                        <span class="font-semibold">@lotte.vn for example</span><br>
                        - Must start with <code>@</code><br>
                        - After <code>.</code> can only be 2 characters<br>
                        - No spaces allowed<br>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>