<script setup lang="ts">
defineProps<{ label: string; placeholder?: string }>()
const model = defineModel<string>({ default: '' })
</script>

<template>
  <input v-model="model" type="search" :aria-label="label" :placeholder="placeholder"
    class="h-9 max-w-full rounded-md border border-input bg-background px-3 py-1 text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
</template>
