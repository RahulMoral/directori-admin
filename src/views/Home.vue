<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseSelect from '@/components/BaseSelect.vue'
import SearchInput from '@/components/SearchInput.vue'
import DataTable, { type TableColumn } from '@/components/DataTable.vue'
import StatusBadge from '@/components/StatusBadge.vue'
import { people } from '@/data/people'

const selectedCompany = ref('')
const selectedStatus = ref('')
const searchQuery = ref('')
const companyOptions = [
	{ label: 'All companies', value: '' },
	...[...new Set(people.map(person => person.company))].sort().map(company => ({ label: company, value: company })),
]
const statusOptions = [
	{ label: 'All statuses', value: '' },
	...['Current', 'No current role', 'Former'].map(status => ({ label: status, value: status })),
]
const columns: TableColumn[] = [
	{ key: 'id', label: '#', sortable: true, headerClass: 'w-10', cellClass: 'text-xs text-muted-foreground' },
	{ key: 'company', label: 'Company', sortable: true },
	{ key: 'person', label: 'Person', sortable: true, cellClass: 'font-medium' },
	{ key: 'role', label: 'Current role', sortable: true },
	{ key: 'status', label: 'Status', sortable: true },
	{ key: 'previousRoles', label: 'Previous roles', sortable: true, cellClass: 'text-muted-foreground' },
	{ key: 'addedOn', label: 'Added on', sortable: true, cellClass: 'whitespace-nowrap text-muted-foreground' },
	{ key: 'view', label: 'View', align: 'right' },
]
const filteredPeople = computed(() => {
	const query = searchQuery.value.trim().toLocaleLowerCase()
	return people.filter(person =>
		(!selectedCompany.value || person.company === selectedCompany.value) &&
		(!selectedStatus.value || person.status === selectedStatus.value) &&
		(!query || [person.person, person.role, person.company].some(value => value.toLocaleLowerCase().includes(query))),
	)
})
const dateFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
</script>

<template>
	<section class="space-y-4" aria-labelledby="people-heading">
		<div>
			<h2 id="people-heading" class="text-sm font-semibold tracking-tight text-foreground">People Listing</h2>
			<p class="text-xs text-muted-foreground">Every person profile in the system. Read-only.</p>
		</div>

		<div class="flex flex-wrap items-center gap-2">
			<BaseSelect v-model="selectedCompany" :options="companyOptions" label="Filter by company" class="w-[190px]" />
			<BaseSelect v-model="selectedStatus" :options="statusOptions" label="Filter by status" class="w-[160px]" />
			<SearchInput v-model="searchQuery" label="Search person, role or company" placeholder="Search person, role or company…" class="w-[240px]" />
		</div>

		<p class="sr-only" role="status" aria-live="polite">{{ filteredPeople.length }} people found.</p>
		<DataTable :columns="columns" :rows="filteredPeople" row-key="id" caption="People Listing" empty-message="No people match your search or filters.">
			<template #cell-role="{ row }">
				<span :class="!row.role ? 'text-muted-foreground' : ''">{{ row.role || '—' }}</span>
			</template>
			<template #cell-status="{ row }">
				<StatusBadge :label="row.status" :filled="row.status === 'Current'" />
			</template>
			<template #cell-addedOn="{ row }">{{ dateFormatter.format(new Date(row.addedOn)) }}</template>
			<template #cell-view="{ row }">
				<a :href="row.viewUrl" target="_blank" rel="noopener noreferrer"
				   :aria-label="`View ${row.person} at ${row.company} (opens in a new tab)`"
				   class="inline-flex items-center gap-1 text-xs font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
					View
					<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<path d="M15 3h6v6M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
					</svg>
				</a>
			</template>
		</DataTable>
	</section>
</template>
