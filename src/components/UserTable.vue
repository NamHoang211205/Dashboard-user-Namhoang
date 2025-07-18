<script setup lang="ts">
import ActionButton from './ActionButton.vue'

type User = {
  firstName: string
  lastName: string
  username: string
  email: string
  status: string
  updatedAt: string
}

const props = defineProps<{
  users: User[]
}>()

const emit = defineEmits<{
  (e: 'edit', user: User): void
  (e: 'deleteAccount', user: User): void
  (e: 'activeAccount', user: User): void
}>()

function handleEdit(user: User) {
  emit('edit', user)
}
function handleDelete(user: User) {
  emit('deleteAccount', user)
}
function handleActive(user: User) {
  emit('activeAccount', user)
}
</script>

<template>
  <div class="bg-white rounded-xl border shadow overflow-hidden">
    <table class="min-w-full text-sm text-center table-fixed">
      <thead class="bg-gray-50 text-gray-600 text-sm border-b">
        <tr>
          <th class="py-3 px-4 w-12">No.</th>
          <th class="py-3 px-4">Username</th>
          <th class="py-3 px-4">Full Name</th>
          <th class="py-3 px-4">Status</th>
          <th class="py-3 px-4">Updated Date</th>
          <th class="py-3 px-4">Action</th>
        </tr>
      </thead>
      <tbody class="divide-y text-gray-700">
        <tr v-if="users.length === 0">
          <td colspan="6" class="py-4 text-center text-gray-400">No users found</td>
        </tr>
        <tr v-for="(user, id) in users" :key="user.username">
          <td class="py-3 px-4">{{ id + 1 }}</td>
          <td class="py-3 px-4 truncate">{{ user.username }}</td>
          <td class="py-3 px-4 truncate">{{ user.firstName }} {{ user.lastName }}</td>
          <td class="py-3 px-4">
            <span class="text-xs font-semibold px-3 py-1 rounded-full border inline-block"
              :class="{
                'text-green-600 border-green-600 bg-green-50': user.status === 'Active',
                'text-orange-600 border-orange-600 bg-orange-50': user.status === 'Pending',
                'text-red-600 border-red-600 bg-red-50': user.status === 'Inactive',
                'text-blue-600 border-blue-600 bg-blue-50': user.status === 'Activation expired'
              }">
              {{ user.status }}
            </span>
          </td>
          <td class="py-3 px-4">{{ user.updatedAt }}</td>
          <td class="py-3 px-4">
            <ActionButton
              :isLockedDisabled="user.status === 'Active'"
              @edit="() => handleEdit(user)"
              @deleteAccount="() => handleDelete(user)"
              @activeAccount="() => handleActive(user)"
              @lock="() => console.log('Locking')"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
