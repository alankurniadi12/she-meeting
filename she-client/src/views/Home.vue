<template>
    <div class="mt-2">
        <Chart />
    </div>
    <div class="grid grid-cols-3 gap-4 mt-6 pb-10">
        <div class="col-span-2">
            <div class="flex items-center justify-between mb-3 mx-6">
                <h2 class="text-xl font-semibold text-gray-700">Temuan Terbaru</h2>
                <div class="flex items-center space-x-4">
                    <button class="text-green-600 font-medium underline hover:cursor-pointer">
                        Lihat Semua
                    </button>
                    <button class="px-4 py-2 bg-green-600 text-white rounded-xl shadow hover:cursor-pointer">
                        Tambah
                    </button>
                </div>
            </div>

            <ItemList />
        </div>
        <div>
            <div class="mb-3 mt-2 mr-8 flex items-center justify-between">
                <h2 class="text-xl font-semibold text-gray-700">Personil</h2>
                <button class="text-green-600 font-medium underline hover:cursor-pointer">
                    Lihat Semua
                </button>
            </div>
            <PersonelList />
        </div>
    </div>
</template>

<script setup>
import Chart from '../components/Chart.vue';
import ItemList from '../components/ItemList.vue';
import PersonelList from '../components/PersonelList.vue';
</script>