<template>
    <div class="mt-2">
        <Chart />
    </div>
    <div class="grid grid-cols-3 gap-4 mt-6 pb-10">
        <div class="col-span-2">
            <div class="flex items-center justify-between mb-3 mx-6">
                <h2 class="text-xl font-semibold text-gray-700">10 Temuan Terbaru</h2>
                <div class="flex items-center space-x-4">
                    <button class="text-green-600 font-medium underline hover:cursor-pointer" @click="handleSeeAll">
                        Lihat Semua
                    </button>
                    <button class="px-4 py-2 bg-green-600 text-white rounded-xl shadow hover:cursor-pointer">
                        + Tambah Temuan
                    </button>
                </div>
            </div>

            <ItemList :items="latestTemuan" :showSeeAll="true" @seeAll="handleSeeAll" />
        </div>
        <div>
            <div class="mb-3 mt-2 mr-8 flex items-center justify-between">
                <h2 class="text-xl font-semibold text-gray-700">10 Top Personil</h2>
                <button class="text-green-600 font-medium underline hover:cursor-pointer" @click="handleSeeAllPersonil">
                    Lihat Semua
                </button>
            </div>
            <PersonelList :items="latestPersonil" @select="handleSelectPersonel" />
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router'

import Chart from '../components/Chart.vue';
import ItemList from '../components/ItemList.vue';
import PersonelList from '../components/PersonelList.vue';

import { dummyTemuan } from '@/dataDummy';
import { dummyPersonil } from '@/dataDummy';

const router = useRouter();
const route = useRoute();

const allTemuan = ref(dummyTemuan);
const allPersonil = ref(dummyPersonil);

const latestTemuan = computed(() => {
    return allTemuan.value
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 10);
});

const handleSeeAll = () => {
    router.push({ name: 'Finding' })
}

const latestPersonil = computed(() => {
    return allPersonil.value
        .sort((a, b) => b.jumlahTemuan - a.jumlahTemuan)
        .slice(0, 10);
});

const handleSeeAllPersonil = () => {
    router.push({ name: 'Personel' })
}

const handleSelectPersonel = (person) => {
    router.push({
        name: 'PersonelDetail',
        params: { id: person.id }
    })
}

</script>