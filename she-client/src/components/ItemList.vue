<template>
    <div class="mt-6 ml-6 mr-6">
        <div class="flex items-center justify-between mb-3">
            <h2 class="text-xl font-semibold text-gray-700">Temuan Terbaru</h2>
            <div class="flex items-center space-x-4">
                <button class="text-green-600 font-medium hover:underline">
                    Lihat Semua →
                </button>
                <button class="px-4 py-2 bg-green-600 text-white rounded-xl shadow">
                    Tambah
                </button>
            </div>
        </div>

        <div class="space-y-4 pr-2">
            <div v-for="item in temuan" :key="item.id"
                class="bg-white shadow rounded-2xl p-4 border flex flex-col space-y-1">
                <!-- Judul -->
                <h3 class="font-semibold text-gray-800 leading-tight line-clamp-2">
                    {{ item.judul }}
                </h3>

                <!-- Informasi Baris -->
                <div class="flex items-center text-sm text-gray-500 space-x-4 mt-1">
                    <span class="flex items-center">
                        <img :src="icCalendar" class="w-4 h-4 mr-1" />
                        {{ item.tanggal }}
                    </span>

                    <span class="flex items-center">
                        <img :src="icPersonSelected" class="w-4 h-4 mr-1" />

                        {{ item.nama }}
                    </span>

                    <span class="flex items-center">
                        {{ item.divisi }}
                    </span>
                </div>

                <!-- Status badge -->
                <div class="mt-2">
                    <span class="px-3 py-1 text-sm rounded-full font-medium" :class="statusClass(item.status)">
                        {{ item.status }}
                    </span>
                </div>
            </div>
        </div>

        <div class="flex justify-end mt-6">
            <button class="text-green-600 font-medium hover:underline">
                Lihat Semua →
            </button>
        </div>
    </div>
</template>


<script setup>
import icCalendar from '../assets/ic-calendar.png'
import icPersonSelected from '../assets/ic-person-selected.png'
const temuan = [
    {
        id: 1,
        judul: "Kabel listrik belakang commshop belum terisolasi dengan baik terlihat inti dari kabel, kabel masih ada yang belum ditanam, khawatir terkena setrum mengingat kegiatan aktif didaerah itu",
        tanggal: "Ahad, 02 Nov 2025",
        nama: "Firdaus",
        divisi: "ICT to Electric",
        status: "Proses"
    },
    {
        id: 2,
        judul: "Rumput panjang di depan main office",
        tanggal: "Ahad, 02 Nov 2025",
        nama: "Firdaus",
        divisi: "ICT to Electric",
        status: "Selesai"
    },
    {
        id: 3,
        judul: "Kabel listrik belakang commshop belum terisolasi...",
        tanggal: "Ahad, 02 Nov 2025",
        nama: "Firdaus",
        divisi: "ICT to Electric",
        status: "Draf"
    },
    {
        id: 4,
        judul: "Rumput panjang di depan main office",
        tanggal: "Ahad, 02 Nov 2025",
        nama: "Firdaus",
        divisi: "ICT to Electric",
        status: "Tunda"
    },
    {
        id: 5,
        judul: "Kabel listrik belakang commshop belum terisolasi...",
        tanggal: "Ahad, 02 Nov 2025",
        nama: "Firdaus",
        divisi: "ICT to Electric",
        status: "Proses"
    },
    {
        id: 6,
        judul: "Rumput panjang di depan main office",
        tanggal: "Ahad, 02 Nov 2025",
        nama: "Firdaus",
        divisi: "ICT to Electric",
        status: "Selesai"
    },
    {
        id: 7,
        judul: "Kabel listrik belakang commshop belum terisolasi...",
        tanggal: "Ahad, 02 Nov 2025",
        nama: "Firdaus",
        divisi: "ICT to Electric",
        status: "Proses"
    },
    {
        id: 8,
        judul: "Rumput panjang di depan main office",
        tanggal: "Ahad, 02 Nov 2025",
        nama: "Firdaus",
        divisi: "ICT to Electric",
        status: "Selesai"
    },
    {
        id: 9,
        judul: "Kabel listrik belakang commshop belum terisolasi...",
        tanggal: "Ahad, 02 Nov 2025",
        nama: "Firdaus",
        divisi: "ICT to Electric",
        status: "Proses"
    },
    {
        id: 10,
        judul: "Rumput panjang di depan main office",
        tanggal: "Ahad, 02 Nov 2025",
        nama: "Firdaus",
        divisi: "ICT to Electric",
        status: "Selesai"
    }
    // isi dengan data lainnya...
]

const statusClass = (status) => {
    switch (status) {
        case "Selesai":
            return "bg-green-100 text-green-700 border border-green-300"
        case "Proses":
            return "bg-yellow-100 text-yellow-700 border border-yellow-300"
        case "Tunda":
            return "bg-red-100 text-red-700 border border-red-300"
        case "Draft":
            return "bg-gray-200 text-gray-700 border border-gray-300"
        default:
            return ""
    }
}
</script>

<style scoped>
/* optional */
</style>
