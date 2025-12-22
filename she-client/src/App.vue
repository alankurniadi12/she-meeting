<script setup>
import { ref } from 'vue';
const showLogin = ref(false)
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
import LoginModal from './views/LoginModal.vue';
</script>

<template>
  <div class="flex h-screen bg-white overflow-hidden">
    <Sidebar />
    <div class="flex-1 flex flex-col overflow-y-auto">
      <div class="sticky top-0 z-50 bg-white shadow-sm">
        <Header @open-login="showLogin = true" />
        <LoginModal v-if="showLogin" @close="showLogin = false" />
      </div>

      <main class="w-full pl-4">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped></style>
