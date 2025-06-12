<script setup lang="ts">
const props = defineProps<{
    users: {
        username: string
        fullName: string
        status: string
        updatedAt: string
    }[]
}>()
</script>

<template>
    <div class="bg-white rounded shadow overflow-x-auto">
        <table class="min-w-full text-sm text-left">
            <thead class="bg-gray-100 text-gray-600 font-medium">
                <tr>
                    <th class="px-6 py-3">No.</th>
                    <th class="px-6 py-3">Username</th>
                    <th class="px-6 py-3">Full Name</th>
                    <th class="px-6 py-3">Status</th>
                    <th class="px-6 py-3">Updated Date</th>
                    <th class="px-6 py-3">Action</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 text-gray-700">
                <!-- Check if there's user found -->
                <template v-if="users.length > 0">
                    <tr v-for="(user, id) in users" :key="user.username">
                        <td class="px-6 py-3">{{ id + 1 }}</td>
                        <td class="px-6 py-3">{{ user.username }}</td>
                        <td class="px-6 py-3">{{ user.fullName }}</td>
                        <td class="px-6 py-3">
                            <span :class="[
                                'px-2 py-1 text-xs font-medium rounded border',
                                user.status === 'Active' ? 'text-green-600 border-green-600 bg-green-50' :
                                    user.status === 'Pending' ? 'text-orange-600 border-orange-600 bg-orange-50' :
                                        'text-blue-600 border-blue-600 bg-blue-50'
                            ]">
                                {{ user.status }}
                            </span>
                        </td>
                        <td class="px-6 py-3">{{ user.updatedAt }}</td>
                        <td class="px-6 py-3 text-sm text-gray-500">[...]</td>
                    </tr>
                </template>
                <!-- When no users found -->
                <tr v-else>
                    <td colspan="6" class="px-6 py-3 text-center text-gray-500">No users found</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>