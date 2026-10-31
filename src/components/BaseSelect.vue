<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId } from 'vue'

const props = defineProps<{ label: string; options: { label: string; value: string }[]; disabled?: boolean }>()
const model = defineModel<string>({ default: '' })
const id = useId()
const root = ref<HTMLElement>()
const trigger = ref<HTMLButtonElement>()
const list = ref<HTMLElement>()
const open = ref(false)
const active = ref(0)
const selectedLabel = computed(() => props.options.find(option => option.value === model.value)?.label ?? props.label)

async function show(last = false) {
  if (props.disabled) return
  active.value = last ? props.options.length - 1 : Math.max(0, props.options.findIndex(option => option.value === model.value))
  open.value = true
  await nextTick()
  list.value?.focus()
  scrollActive()
}
function close(restore = false) {
  open.value = false
  if (restore) trigger.value?.focus()
}
function select(index: number) {
  const option = props.options[index]
  if (option) model.value = option.value
  close(true)
}
function scrollActive() {
  nextTick(() => list.value?.querySelector('[data-active="true"]')?.scrollIntoView({ block: 'nearest' }))
}
let typed = ''
let timer: ReturnType<typeof setTimeout> | undefined
function keydown(event: KeyboardEvent) {
  if (event.key === 'Tab') { close(); return }
  if (event.key === 'Escape') { event.preventDefault(); close(true); return }
  if (['Enter', ' '].includes(event.key)) { event.preventDefault(); select(active.value); return }
  if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
    event.preventDefault()
    if (event.key === 'Home') active.value = 0
    else if (event.key === 'End') active.value = props.options.length - 1
    else active.value = (active.value + (event.key === 'ArrowDown' ? 1 : -1) + props.options.length) % props.options.length
    scrollActive()
  } else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
    event.preventDefault()
    typed += event.key.toLowerCase()
    clearTimeout(timer)
    timer = setTimeout(() => { typed = '' }, 600)
    const index = props.options.findIndex(option => option.label.toLowerCase().startsWith(typed))
    if (index >= 0) { active.value = index; scrollActive() }
  }
}
function outside(event: PointerEvent) {
  if (!root.value?.contains(event.target as Node)) close()
}
onMounted(() => document.addEventListener('pointerdown', outside))
onBeforeUnmount(() => { document.removeEventListener('pointerdown', outside); clearTimeout(timer) })
</script>

<template>
  <div ref="root" class="relative max-w-full" @focusout="event => { if (!root?.contains(event.relatedTarget as Node)) close() }">
    <button ref="trigger" type="button" role="combobox" aria-haspopup="listbox" :aria-label="label"
      :aria-controls="id" :aria-expanded="open" :disabled="disabled"
      class="flex h-9 w-full cursor-pointer items-center justify-between gap-3 whitespace-nowrap rounded-md border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      @click="open ? close() : show()" @keydown.down.prevent="show()" @keydown.up.prevent="show(true)">
      <span class="truncate">{{ selectedLabel }}</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="shrink-0 opacity-50" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
    </button>
    <ul v-if="open" :id="id" ref="list" role="listbox" tabindex="-1" :aria-label="label" :aria-activedescendant="`${id}-${active}`"
      class="absolute left-0 top-full z-30 mt-1 max-h-64 w-full overflow-y-auto rounded-md border border-input bg-popover p-1 text-sm text-popover-foreground shadow-md outline-none" @keydown="keydown">
      <li v-for="(option, index) in options" :id="`${id}-${index}`" :key="option.value" role="option"
        :aria-selected="option.value === model" :data-active="index === active"
        class="flex cursor-pointer items-center justify-between gap-2 rounded-sm px-2 py-1.5"
        :class="index === active || option.value === model ? 'bg-accent text-accent-foreground' : ''"
        @pointermove="active = index" @mousedown.prevent @click="select(index)">
        <span>{{ option.label }}</span>
        <svg v-if="option.value === model" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="shrink-0" aria-hidden="true"><path d="m5 12 4 4L19 6" /></svg>
      </li>
    </ul>
  </div>
</template>
