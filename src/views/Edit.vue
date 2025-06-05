<script setup lang="ts">
import { ref } from 'vue'

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
</script>

<template>
    <div class="relative">
        <div class="p-8 bg-white shadow rounded-lg">
            <div class="flex items-center justify-between mb-6">
                <h2 class="text-xl font-semibold text-gray-900">Company Information</h2>
                <div class="flex items-center gap-x-4">
                    <button class="px-6 py-2 text-sm font-semibold text-blue-600 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 shadow-sm">
                        Back
                    </button>
                    <button class="px-6 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm">
                        Save
                    </button>
                </div>
            </div>

            <!-- Grid Form -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Company Name -->
                <div>
                    <label class="text-sm font-semibold text-gray-600">Company Name:</label>
                    <input v-model="form.companyName" type="text"
                        class="w-full mt-1 p-2 border rounded-md text-sm text-gray-800"
                        placeholder="Enter company name" />
                </div>

                <!-- Abbreviated Name -->
                <div>
                    <label class="text-sm font-semibold text-gray-600">Abbreviated Name:</label>
                    <input v-model="form.abbrevName" type="text"
                        class="w-full mt-1 p-2 border rounded-md text-sm text-gray-800"
                        placeholder="Enter abbreviation" />
                </div>

                <!-- Tax Code -->
                <div>
                    <label class="text-sm font-semibold text-gray-600">Tax Code:</label>
                    <input v-model="form.taxCode" type="text"
                        class="w-full mt-1 p-2 border rounded-md text-sm text-gray-800" placeholder="Enter tax code" />
                </div>

                <!-- Address -->
                <div class="md:col-span-2 lg:col-span-2">
                    <label class="text-sm font-semibold text-gray-600">Address:</label>
                    <input v-model="form.address" type="text"
                        class="w-full mt-1 p-2 border rounded-md text-sm text-gray-800" placeholder="Enter address" />
                </div>

                <!-- Contact Point -->
                <div>
                    <label class="text-sm font-semibold text-gray-600">Contact Point:</label>
                    <input v-model="form.contactPoint" type="text"
                        class="w-full mt-1 p-2 border rounded-md text-sm text-gray-800"
                        placeholder="Enter contact name" />
                </div>

                <!-- Super Admin -->
                <div>
                    <label class="text-sm font-semibold text-gray-600">Super Admin’s Username:</label>
                    <input v-model="form.adminUsername" type="text"
                        class="w-full mt-1 p-2 border rounded-md text-sm text-gray-800" placeholder="Enter username" />
                </div>

                <!-- Email Domain -->
                <div>
                    <label class="text-sm font-semibold text-gray-600">Email Domain:</label>
                    <input v-model="form.emailDomain" type="text"
                        class="w-full mt-1 p-2 border rounded-md text-sm text-gray-800" placeholder="e.g. @lotte.vn" />
                </div>

                <!-- Update Date -->
                <div>
                    <label class="text-sm font-semibold text-gray-600">Update Date:</label>
                    <input v-model="form.updateDate" type="datetime-local"
                        class="w-full mt-1 p-2 border rounded-md text-sm text-gray-800" />
                </div>
            </div>
        </div>
    </div>
</template>
