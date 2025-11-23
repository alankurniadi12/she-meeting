<script setup>
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
</script>

<template>
  <div class="flex h-screen bg-white overflow-hidden">
    <Sidebar />
    <div class="flex-1 flex flex-col overflow-y-auto">
      <div class="sticky top-0 z-50 bg-white shadow-sm">
        <Header />
      </div>

      <main class="w-full pl-4">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped></style>
