<template>
    <div class="mt-7 mr-6">
        <div class="space-y-3 max-h-[75vh] pr-2">
            <div v-for="p in personil" :key="p.id"
                class="bg-gray-100 rounded-2xl px-4 py-3 flex items-center justify-between shadow-sm border">
                <div class="flex items-center space-x-3">
                    <!-- Avatar -->
                    <div class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <img :src="icPersonSelected" class="w-6 h-6 opacity-50" />
                    </div>

                    <!-- Name & job -->
                    <div class="-space-y-1">
                        <h3 class="font-semibold text-gray-800 text-sm leading-tight">
                            {{ p.nama }}
                        </h3>
                        <p class="text-xs text-gray-500">{{ p.divisi }}</p>
                    </div>
                </div>

                <!-- Score -->
                <div class="px-4 py-1 bg-white rounded-xl font-bold text-gray-700 shadow text-sm">
                    {{ p.skor }}
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import icPersonSelected from '../assets/ic-person-selected.png'

const personil = [
    { id: 1, nama: "Firman", divisi: "ICT", skor: 100 },
    { id: 2, nama: "Isharyanto", divisi: "ICT", skor: 97 },
    { id: 3, nama: "Firdaus", divisi: "ICT", skor: 91 },
    { id: 4, nama: "Arif Saputra", divisi: "Facility", skor: 88 },
    { id: 5, nama: "Firman", divisi: "ICT", skor: 85 },
    { id: 6, nama: "Isharyanto", divisi: "ICT", skor: 63 },
    { id: 7, nama: "Firdaus", divisi: "ICT", skor: 60 },
    { id: 8, nama: "Arif Saputra", divisi: "Facility", skor: 37 },
    { id: 9, nama: "Firman", divisi: "ICT", skor: 32 },
    { id: 10, nama: "Isharyanto", divisi: "ICT", skor: 20 }


    // tambah data sesuai screenshot...
]
</script>
