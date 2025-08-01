<script setup lang="ts">
import { ref } from 'vue'

interface TreeNode {
  label: string
  children?: TreeNode[]
}

// Props
const props = defineProps<{
  items: TreeNode[]
  selected: string
}>()

const emit = defineEmits<{
  (e: 'update:selected', value: string): void
}>()

// Local state
const expanded = ref<Set<string>>(new Set())

function toggle(node: TreeNode) {
  const key = node.label
  if (expanded.value.has(key)) {
    expanded.value.delete(key)
  } else {
    expanded.value.add(key)
  }
}

function selectItem(label: string) {
  emit('update:selected', label)
}
</script>

<template>
  <ul class="pl-2">
    <li v-for="node in items" :key="node.label" class="mb-1">
      <div class="flex items-center gap-1 cursor-pointer" @click="node.children ? toggle(node) : selectItem(node.label)">
        <span v-if="node.children">
          <span v-if="expanded.has(node.label)">▼</span>
          <span v-else>▶</span>
        </span>
        <span
          :class="[
            'px-2 py-1 rounded',
            selected === node.label ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-gray-100'
          ]"
          @click.stop="selectItem(node.label)"
        >
          {{ node.label }}
        </span>
      </div>
      <DepartmentTree
        v-if="node.children && expanded.has(node.label)"
        :items="node.children"
        :selected="selected"
        @update:selected="emit('update:selected', $event)"
      />
    </li>
  </ul>
</template>
