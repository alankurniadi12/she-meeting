<script setup>
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
import Chart from './components/Chart.vue';
import ItemList from './components/ItemList.vue';
import PersonelList from './components/PersonelList.vue';
</script>

<template>
  <div class="flex h-screen bg-white overflow-hidden">
    <Sidebar />
    <div class="flex-1 flex flex-col overflow-y-auto">
      <div class="sticky top-0 z-50 bg-white shadow-sm">
        <Header />
      </div>

      <main class="w-full pl-4">
        <div class="mt-2">
          <Chart />
        </div>
        <div class="grid grid-cols-3 gap-4 mt-6 pb-10">
          <div class="col-span-2">
            <ItemList />
          </div>
          <div>
            <PersonelList />
          </div>
        </div>

      </main>
    </div>
  </div>
</template>

<style scoped></style>
