<script setup lang="ts">
import { ref } from 'vue'

interface TreeNode {
  label: string
  children?: TreeNode[]
}

const props = defineProps<{
  items: TreeNode[]
  selected: string
}>()

const emit = defineEmits<{
  (e: 'update:selected', value: string): void
}>()

const expanded = ref<Set<string>>(new Set())

function toggle(node: TreeNode) {
  const key = node.label
  if (expanded.value.has(key)) {
    expanded.value.delete(key)
  } else {
    expanded.value.add(key)
  }
}

function handleClick(node: TreeNode) {
  if (node.children && node.children.length > 0) {
    toggle(node)
  } else {
    emit('update:selected', node.label)
  }
}
</script>

<template>
  <ul class="pl-2">
    <li v-for="node in items" :key="node.label" class="mb-1">
      <div
        class="flex items-center gap-1 cursor-pointer"
        @click="handleClick(node)"
      >
        <span v-if="node.children">
          <svg
            width="12"
            height="7"
            viewBox="0 0 12 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              v-if="!expanded.has(node.label)"
              d="M11 1.33301L6.58926 5.74375C6.26382 6.06919 5.73618 6.06919 5.41074 5.74375L1 1.33301"
              stroke="#C1C3C7"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              v-else
              d="M1 5.66654L5.41074 1.2558C5.73618 0.93036 6.26382 0.93036 6.58926 1.2558L11 5.66654"
              stroke="#C1C3C7"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </span>

        <span
          :class="[
            'px-2 py-1 rounded',
            selected === node.label
              ? 'bg-blue-100 text-blue-700 font-medium'
              : 'hover:bg-gray-100'
          ]"
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
