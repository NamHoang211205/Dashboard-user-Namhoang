<script setup lang="ts">
const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

function handleConfirm() {
  emit('confirm')
}
function handleCancel() {
  emit('cancel')
}
</script>

<template>
  <div v-if="visible" class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
      <h2 class="text-lg font-semibold mb-4">Deleting Confirmation</h2>
      <p class="text-sm mb-6">Are you sure of deleting this account?</p>
      <div class="flex justify-center gap-4">
        <button @click="handleCancel" class="px-4 py-2 rounded border hover:bg-gray-100">No</button>
        <button @click="handleConfirm" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Yes</button>
      </div>
    </div>
  </div>
</template>
