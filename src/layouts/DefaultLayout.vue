<script setup lang="ts">
import Header from "../components/Header.vue";
import LeftSidebar from "../components/LeftSidebar.vue";
</script>
<template>
    <div class="min-h-screen bg-background">
        <Header />
        <div class="flex flex-col sm:flex-row pt-[73px]">
            <LeftSidebar />
            <div class="min-w-0 flex-1 space-y-4 px-4 py-8 sm:px-6">
                <RouterView />
            </div>
        </div>
    </div>
</template>
