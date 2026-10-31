<script setup lang="ts" generic="T extends Record<string, unknown>">
import { computed, ref } from 'vue'

export interface TableColumn {
  key: string
  label: string
  sortable?: boolean
  align?: 'left' | 'right'
  cellClass?: string
  headerClass?: string
}
const props = withDefaults(defineProps<{
  columns: TableColumn[]
  rows: T[]
  rowKey: string
  caption: string
  minWidth?: string
  emptyMessage?: string
}>(), { minWidth: '860px', emptyMessage: 'No results found.' })
const sortKey = ref('')
const direction = ref<'asc' | 'desc'>('asc')
function sort(key: string) {
  if (sortKey.value === key) direction.value = direction.value === 'asc' ? 'desc' : 'asc'
  else { sortKey.value = key; direction.value = 'asc' }
}
const sortedRows = computed(() => {
  if (!sortKey.value) return props.rows
  return [...props.rows].sort((a, b) => {
    const left = a[sortKey.value]
    const right = b[sortKey.value]
    const result = typeof left === 'number' && typeof right === 'number'
      ? left - right : String(left ?? '').localeCompare(String(right ?? ''), undefined, { numeric: true, sensitivity: 'base' })
    return direction.value === 'asc' ? result : -result
  })
})
</script>

<template>
  <div class="overflow-x-auto rounded-lg border">
    <table class="w-full text-sm" :style="{ minWidth }">
      <caption class="sr-only">{{ caption }}</caption>
      <thead>
        <tr class="border-b bg-muted/40 text-left text-xs text-muted-foreground">
          <th v-for="column in columns" :key="column.key" scope="col" class="px-3 py-2 font-medium"
            :class="[column.headerClass, column.align === 'right' ? 'text-right' : '']"
            :aria-sort="column.sortable ? (sortKey === column.key ? (direction === 'asc' ? 'ascending' : 'descending') : 'none') : undefined">
            <button v-if="column.sortable" type="button" class="inline-flex cursor-pointer items-center gap-1 rounded-sm text-inherit focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" @click="sort(column.key)">
              {{ column.label }}
              <span aria-hidden="true" class="text-[10px]" :class="sortKey === column.key ? 'opacity-100' : 'opacity-40'">{{ sortKey === column.key ? (direction === 'asc' ? '↑' : '↓') : '↕' }}</span>
            </button>
            <template v-else>{{ column.label }}</template>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in sortedRows" :key="String(row[rowKey])" class="border-b last:border-0">
          <td v-for="column in columns" :key="column.key" class="px-3 py-2" :class="[column.cellClass, column.align === 'right' ? 'text-right' : '']">
            <slot :name="`cell-${column.key}`" :row="row" :value="row[column.key]" :index="index">{{ row[column.key] ?? '—' }}</slot>
          </td>
        </tr>
        <tr v-if="!sortedRows.length"><td :colspan="columns.length" class="px-3 py-10 text-center text-sm text-muted-foreground" role="status">{{ emptyMessage }}</td></tr>
      </tbody>
    </table>
  </div>
</template>
