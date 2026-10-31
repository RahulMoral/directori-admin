<template>
    <nav aria-label="Admin sections" class="w-full shrink-0 border-b px-3 py-4 sm:w-60 sm:border-b-0 sm:border-r">
        <RouterLink :to="{ name: 'home' }" class="w-full flex rounded-md px-2 py-1.5 text-left text-sm transition-colors text-muted-foreground hover:bg-muted/60 cursor-pointer" exact-active-class="bg-muted !text-foreground font-medium">
            People Listing
        </RouterLink>
        <div class="mt-4 space-y-4">
            <div>
                <p class="px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground/70">People</p>
                <ul class="mt-1 space-y-0.5">
                    <li>
                        <RouterLink :to="{ name: 'person-added' }" class="w-full flex rounded-md px-2 py-1.5 text-left text-sm transition-colors text-muted-foreground hover:bg-muted/60 cursor-pointer" exact-active-class="bg-muted !text-foreground font-medium">
                            Person added
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="{ name: 'name-changed' }" class="w-full flex rounded-md px-2 py-1.5 text-left text-sm transition-colors text-muted-foreground hover:bg-muted/60 cursor-pointer" exact-active-class="bg-muted !text-foreground font-medium">
                            Name changed
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="{ name: 'left-company' }" class="w-full flex rounded-md px-2 py-1.5 text-left text-sm transition-colors text-muted-foreground hover:bg-muted/60 cursor-pointer" exact-active-class="bg-muted !text-foreground font-medium">
                            Left company
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="{ name: 'duplicate' }" class="w-full flex rounded-md px-2 py-1.5 text-left text-sm transition-colors text-muted-foreground hover:bg-muted/60 cursor-pointer" exact-active-class="bg-muted !text-foreground font-medium">
                            Duplicate / possible match
                        </RouterLink>
                    </li>
                </ul>
            </div>
            <div>
                <p class="px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground/70">Roles / org chart</p>
                <ul class="mt-1 space-y-0.5">
                    <li>
                        <RouterLink :to="{ name: 'company roots' }" class="w-full flex rounded-md px-2 py-1.5 text-left text-sm transition-colors text-muted-foreground hover:bg-muted/60 cursor-pointer" exact-active-class="bg-muted !text-foreground font-medium">
                            Company roots
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="{ name: 'root-added' }" class="w-full flex rounded-md px-2 py-1.5 text-left text-sm transition-colors text-muted-foreground hover:bg-muted/60 cursor-pointer" exact-active-class="bg-muted !text-foreground font-medium">
                            Root added
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="{ name: 'root-removed' }" class="w-full flex rounded-md px-2 py-1.5 text-left text-sm transition-colors text-muted-foreground hover:bg-muted/60 cursor-pointer" exact-active-class="bg-muted !text-foreground font-medium">
                            Root removed
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="{ name: 'role-added' }" class="w-full flex rounded-md px-2 py-1.5 text-left text-sm transition-colors text-muted-foreground hover:bg-muted/60 cursor-pointer" exact-active-class="bg-muted !text-foreground font-medium">
                            Role added
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="{ name: 'role-title-changed' }" class="w-full flex rounded-md px-2 py-1.5 text-left text-sm transition-colors text-muted-foreground hover:bg-muted/60 cursor-pointer" exact-active-class="bg-muted !text-foreground font-medium">
                            Role title changed
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="{ name: 'role-marked-previous' }" class="w-full flex rounded-md px-2 py-1.5 text-left text-sm transition-colors text-muted-foreground hover:bg-muted/60 cursor-pointer" exact-active-class="bg-muted !text-foreground font-medium">
                            Role marked previous
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="{ name: 'moved-to-another-role' }" class="w-full flex rounded-md px-2 py-1.5 text-left text-sm transition-colors text-muted-foreground hover:bg-muted/60 cursor-pointer" exact-active-class="bg-muted !text-foreground font-medium">
                            Moved to another role
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="{ name: 'vacant-role-filled' }" class="w-full flex rounded-md px-2 py-1.5 text-left text-sm transition-colors text-muted-foreground hover:bg-muted/60 cursor-pointer" exact-active-class="bg-muted !text-foreground font-medium">
                            Vacant role filled
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="{ name: 'previous-person-added' }" class="w-full flex rounded-md px-2 py-1.5 text-left text-sm transition-colors text-muted-foreground hover:bg-muted/60 cursor-pointer" exact-active-class="bg-muted !text-foreground font-medium">
                            Previous person added
                        </RouterLink>
                    </li>
                </ul>
            </div>
            <div>
                <p class="px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground/70">Relationships</p>
                <ul class="mt-1 space-y-0.5">
                    <li>
                        <RouterLink :to="{ name: 'current-manager-changes' }" class="w-full flex rounded-md px-2 py-1.5 text-left text-sm transition-colors text-muted-foreground hover:bg-muted/60 cursor-pointer" exact-active-class="bg-muted !text-foreground font-medium">
                            Current manager changes
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="{ name: 'current-peer-changes' }" class="w-full flex rounded-md px-2 py-1.5 text-left text-sm transition-colors text-muted-foreground hover:bg-muted/60 cursor-pointer" exact-active-class="bg-muted !text-foreground font-medium">
                            Current peer changes
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="{ name: 'current-direct-report-changes' }" class="w-full flex rounded-md px-2 py-1.5 text-left text-sm transition-colors text-muted-foreground hover:bg-muted/60 cursor-pointer" exact-active-class="bg-muted !text-foreground font-medium">
                            Current direct report changes
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="{ name: 'previous-manager-changes' }" class="w-full flex rounded-md px-2 py-1.5 text-left text-sm transition-colors text-muted-foreground hover:bg-muted/60 cursor-pointer" exact-active-class="bg-muted !text-foreground font-medium">
                            Previous manager changes
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="{ name: 'previous-peer-changes' }" class="w-full flex rounded-md px-2 py-1.5 text-left text-sm transition-colors text-muted-foreground hover:bg-muted/60 cursor-pointer" exact-active-class="bg-muted !text-foreground font-medium">
                            Previous peer changes
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="{ name: 'previous-direct-report-changes' }" class="w-full flex rounded-md px-2 py-1.5 text-left text-sm transition-colors text-muted-foreground hover:bg-muted/60 cursor-pointer" exact-active-class="bg-muted !text-foreground font-medium">
                            Previous direct report changes
                        </RouterLink>
                    </li>
                </ul>
            </div>
            <div>
                <p class="px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground/70">Requests</p>
                <ul class="mt-1 space-y-0.5">
                    <li>
                        <RouterLink :to="{ name: 'top-role-change-requests' }" class="w-full flex rounded-md px-2 py-1.5 text-left text-sm transition-colors text-muted-foreground hover:bg-muted/60 cursor-pointer" exact-active-class="bg-muted !text-foreground font-medium">
                            Top role change requests
                        </RouterLink>
                    </li>
                    <li aria-disabled="true" class="cursor-default rounded-md px-2 py-1 text-sm text-muted-foreground/50">
                        Company requests
                    </li>
                </ul>
            </div>
            <div>
                <p class="px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground/70">Other</p>
                <ul class="mt-1 space-y-0.5">
                    <li aria-disabled="true" class="cursor-default rounded-md px-2 py-1 text-sm text-muted-foreground/50">
                        Other / legacy activity
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>