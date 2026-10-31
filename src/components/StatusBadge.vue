<script setup lang="ts">
defineProps<{ label: string; filled?: boolean }>()
</script>

<template>
  <span class="inline-flex whitespace-nowrap items-center rounded-md border px-2.5 py-0.5 text-xs font-normal"
    :class="filled ? 'border-transparent bg-secondary text-secondary-foreground' : 'border-border text-foreground'">{{ label }}</span>
</template>
