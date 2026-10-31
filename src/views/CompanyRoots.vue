<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref } from 'vue'
import BaseSelect from '@/components/BaseSelect.vue'
import SearchInput from '@/components/SearchInput.vue'
import DataTable, { type TableColumn } from '@/components/DataTable.vue'
import StatusBadge from '@/components/StatusBadge.vue'
import { companyRoots } from '@/data/companyRoots'

const company = ref('')
const rootStatus = ref('')
const pendingStatus = ref('')
const query = ref('')
const companyOptions = [{ label: 'All companies', value: '' }, ...companyRoots.map(row => ({ label: row.company, value: row.company }))]
const rootOptions = [{ label: 'All root statuses', value: '' }, ...['Multiple roots', 'No roots'].map(value => ({ label: value, value }))]
const pendingOptions = [{ label: 'All pending statuses', value: '' }, { label: 'Has pending roles', value: 'pending' }, { label: 'No pending roles', value: 'none' }]
const filteredRows = computed(() => {
	const search = query.value.trim().toLocaleLowerCase()
	return companyRoots.filter(row => (!company.value || row.company === company.value) &&
		(!rootStatus.value || row.status === rootStatus.value) &&
		(!pendingStatus.value || (pendingStatus.value === 'pending' ? row.pendingRoles > 0 : row.pendingRoles === 0)) &&
		(!search || [row.company, ...row.roots].some(value => value.toLocaleLowerCase().includes(search))))
})
const columns: TableColumn[] = [
	{ key: 'id', label: '#', headerClass: 'w-10', cellClass: 'text-xs text-muted-foreground' },
	{ key: 'company', label: 'Company', sortable: true, cellClass: 'font-medium' },
	{ key: 'status', label: 'Root status', sortable: true },
	{ key: 'currentRoots', label: 'Current roots' },
	{ key: 'rootCount', label: 'Root count', sortable: true, cellClass: 'text-muted-foreground' },
	{ key: 'pendingRoles', label: 'Pending roles', sortable: true, cellClass: 'text-muted-foreground' },
	{ key: 'view', label: 'View', align: 'right' },
	{ key: 'details', label: 'Details', align: 'right', headerClass: 'w-20' },
]
const selected = ref<(typeof companyRoots)[number]>()
const drawer = ref<HTMLDialogElement>()
let opener: HTMLElement | null = null
let previousOverflow = ''
async function openDrawer(row: (typeof companyRoots)[number], event: MouseEvent) {
	opener = event.currentTarget as HTMLElement
	selected.value = row
	await nextTick()
	previousOverflow = document.body.style.overflow
	document.body.style.overflow = 'hidden'
	drawer.value?.showModal()
}
function restoreFocus() {
	document.body.style.overflow = previousOverflow
	selected.value = undefined
	opener?.focus()
}
function closeDrawer() { drawer.value?.close() }
function backdrop(event: MouseEvent) {
	const rect = drawer.value?.getBoundingClientRect()
	if (event.target === drawer.value && rect && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) closeDrawer()
}
onBeforeUnmount(() => { if (selected.value) document.body.style.overflow = previousOverflow })
</script>

<template>
	<section class="space-y-4" aria-labelledby="roots-heading">
		<div>
			<h2 id="roots-heading" class="text-sm font-semibold tracking-tight text-foreground">Company roots</h2>
			<p class="text-xs text-muted-foreground">Current top roles for each company. Roots define what appears at the top of the org chart.</p>
		</div>
		<div class="flex flex-wrap items-center gap-2">
			<BaseSelect v-model="company" :options="companyOptions" label="Filter by company" class="w-[190px]" />
			<BaseSelect v-model="rootStatus" :options="rootOptions" label="Filter by root status" class="w-[180px]" />
			<BaseSelect v-model="pendingStatus" :options="pendingOptions" label="Filter by pending status" class="w-[190px]" />
			<SearchInput v-model="query" label="Search company, root, or role" placeholder="Search company, root, or role..." class="w-[240px]" />
		</div>
		<p class="sr-only" role="status">{{ filteredRows.length }} companies found.</p>
		<DataTable :columns="columns" :rows="filteredRows" row-key="id" caption="Company roots" empty-message="No companies match your search or filters.">
			<template #cell-status="{ row }"><StatusBadge :label="row.status" :filled="row.rootCount > 1" /></template>
			<template #cell-view="{ row }">
				<a :href="row.viewUrl" target="_blank" rel="noopener noreferrer" :aria-label="`View ${row.company} (opens in a new tab)`" class="inline-flex items-center gap-1 text-xs font-medium underline-offset-4 hover:underline">
					View <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></svg>
				</a>
			</template>
			<template #cell-details="{ row }">
				<button type="button" :aria-label="`Show company roots details for ${row.company}`" aria-haspopup="dialog" class="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-muted-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" @click="openDrawer(row, $event)">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
				</button>
			</template>
		</DataTable>
	</section>
	<Teleport to="body">
		<dialog ref="drawer" aria-labelledby="company-roots-title" aria-describedby="company-roots-description" class="roots-drawer fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-none w-full max-w-md overflow-y-auto border-l bg-background p-6 text-foreground shadow-lg" @close="restoreFocus" @click="backdrop">
			<div v-if="selected" :key="selected.id">
				<button
					type="button"
					@click="closeDrawer"
					class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="lucide lucide-x h-4 w-4"
						aria-hidden="true">
						<path d="M18 6 6 18"></path>
						<path d="m6 6 12 12"></path>
					</svg>
					<span class="sr-only">Close</span>
				</button>
				<div class="space-y-6">
					<div class="flex flex-col space-y-2 sm:text-left text-left">
						<h2 id="company-roots-title" class="text-lg font-semibold text-foreground">Company roots</h2>
						<p id="company-roots-description" class="text-sm text-muted-foreground">{{ selected.company }}</p>
					</div>
					<p class="text-sm text-foreground">
						{{ selected.rootCount ? `${selected.company} has multiple company roots. That is allowed. Roles connected to any root appear in the org chart.` : `${selected.company} has no company roots. Roles that do not connect to a root appear in Pending Placement.` }}
					</p>
					<div>
						<p class="text-xs font-semibold uppercase tracking-wide text-muted-foreground/70">Current roots</p>
						<p v-if="!selected.rootCount" class="mt-1 text-sm text-muted-foreground">None</p>
						<ul v-else class="mt-1 space-y-1">
							<li class="text-sm text-foreground">Jane Carter — CEO · CEO</li>
							<li class="text-sm text-foreground">Kibi — CO · Co-CEO</li>
						</ul>
					</div>
					<div>
						<p class="text-xs font-semibold uppercase tracking-wide text-muted-foreground/70">Pending roles</p>
						<p class="mt-1 text-sm text-foreground">{{ selected.pendingRoles }} pending roles</p>
					</div>
					<div>
						<p class="text-xs font-semibold uppercase tracking-wide text-muted-foreground/70">How to manage roots</p>
						<p class="mt-1 text-sm text-muted-foreground">
							Roots are managed from the company page. Open the company page and use the Company roots button.
						</p>
						<a
							:href="selected.viewUrl"
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs mt-3">Open company page
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="lucide lucide-external-link ml-1 h-3 w-3"
								aria-hidden="true">
								<path d="M15 3h6v6"></path>
								<path d="M10 14 21 3"></path>
								<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
							</svg>
						</a>
					</div>
					<details class="rounded-md border px-3 py-2" :open="selected.rootCount > 1">
						<summary class="cursor-pointer text-xs font-medium text-muted-foreground">Technical details</summary>
						<ul class="mt-2 space-y-1 text-xs text-muted-foreground">
							<li>Root count: {{ selected.rootCount }}</li>
							<li>Pending role count: {{ selected.pendingRoles }}</li>
							<li>Active role count: {{ selected.activeRoles }}</li>
						</ul>
					</details>
				</div>
			</div>
		</dialog>
	</Teleport>
</template>

<style scoped>
.roots-drawer::backdrop { background: rgb(0 0 0 / 80%); }
.roots-drawer[open] { animation: drawer-enter 180ms ease-out; }
@keyframes drawer-enter { from { transform: translateX(100%); } to { transform: translateX(0); } }
@media (prefers-reduced-motion: reduce) { .roots-drawer[open] { animation: none; } }
</style>
