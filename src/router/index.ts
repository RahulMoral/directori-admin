import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('@/layouts/DefaultLayout.vue'),
        children: [
            { path: '', name: 'home', component: () => import('@/views/Home.vue') },
            { path: 'company-roots', name: 'company roots', component: () => import('@/views/CompanyRoots.vue') },
            { path: 'person-added', name: 'person-added', component: () => import('@/views/PersonAdded.vue') },
            { path: 'name-changed', name: 'name-changed', component: () => import('@/views/NameChanged.vue') },
            { path: 'left-company', name: 'left-company', component: () => import('@/views/LeftCompany.vue') },
            { path: 'duplicate', name: 'duplicate', component: () => import('@/views/Duplicate.vue') },
            { path: 'root-added', name: 'root-added', component: () => import('@/views/RootAdded.vue') },
            { path: 'root-removed', name: 'root-removed', component: () => import('@/views/RootRemoved.vue') },
            { path: 'role-added', name: 'role-added', component: () => import('@/views/RoleAdded.vue') },
            { path: 'role-title-changed', name: 'role-title-changed', component: () => import('@/views/RoleTitleChanged.vue') },
            { path: 'role-marked-previous', name: 'role-marked-previous', component: () => import('@/views/RoleMarkedPrevious.vue') },
            { path: 'moved-to-another-role', name: 'moved-to-another-role', component: () => import('@/views/MovedToAnotherRole.vue') },
            { path: 'vacant-role-filled', name: 'vacant-role-filled', component: () => import('@/views/VacantRoleFilled.vue') },
            { path: 'previous-person-added', name: 'previous-person-added', component: () => import('@/views/PreviousPersonAdded.vue') },
            { path: 'current-manager-changes', name: 'current-manager-changes', component: () => import('@/views/CurrentManagerChanges.vue') },
            { path: 'current-peer-changes', name: 'current-peer-changes', component: () => import('@/views/CurrentPeerChanges.vue') },
            { path: 'current-direct-report-changes', name: 'current-direct-report-changes', component: () => import('@/views/CurrentDirectReportChanges.vue') },
            { path: 'previous-manager-changes', name: 'previous-manager-changes', component: () => import('@/views/PreviousManagerChanges.vue') },
            { path: 'previous-peer-changes', name: 'previous-peer-changes', component: () => import('@/views/PreviousPeerChanges.vue') },
            { path: 'previous-direct-report-changes', name: 'previous-direct-report-changes', component: () => import('@/views/PreviousDirectReportChanges.vue') },
            { path: 'top-role-change-requests', name: 'top-role-change-requests', component: () => import('@/views/TopRoleChangeRequests.vue') },
        ],
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('@/views/NotFoundView.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 }
    },
})

export default router
