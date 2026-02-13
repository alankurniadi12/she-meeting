<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUsersStore } from '@/stores/usersStore.js'
import { formatShortDate } from '@/utils/dateHelpers.js'

const route = useRoute()
const router = useRouter()
const usersStore = useUsersStore()

const idUser = route.params.id
console.log('PersonelDetailView: route param id =', idUser)

const showSensitiveInfo = ref({
    birthDate: false,
    age: false,
    phoneNumber: false
});

const maskedText = (length = 6) => '*'.repeat(length);

onMounted(async () => {
    await usersStore.fetchUserById(idUser)
})

const person = computed(() =>
    usersStore.selectedUser
)

console.log('PersonelDetailView: person name =', person.value?.name)

const page = ref(1)
const pageSize = 10

const findingsList = computed(() =>
    person.value?.findings || person.value?.temuan || []
)
const totalCountFindings = computed(() => findingsList.value.length)
const totalPages = computed(() =>
    Math.max(1, Math.ceil(totalCountFindings.value / pageSize))
)

const pagedCountFindings = computed(() => {
    if (!findingsList.value.length) return []
    const start = (page.value - 1) * pageSize
    return findingsList.value.slice(start, start + pageSize)
})

// umur
const hitungUmur = (tanggalLahir) => {
    if (!tanggalLahir) return '-'
    const today = new Date()
    const birth = new Date(tanggalLahir)

    let years = today.getFullYear() - birth.getFullYear()
    let months = today.getMonth() - birth.getMonth()
    let days = today.getDate() - birth.getDate()

    if (days < 0) {
        months--
        const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0)
        days += prevMonth.getDate()
    }

    if (months < 0) {
        years--
        months += 12
    }

    if (years <= 0) {
        return `${months} bulan ${days} hari`
    }

    return `${years} tahun ${months} bulan`
}

const hitungMasaKerja = (tahunBergabung) => {
    if (!tahunBergabung) return '-'
    const nowYear = new Date().getFullYear()
    const years = nowYear - tahunBergabung
    return `${years} tahun`
}

// tanggal pensiun = lahir + usia pensiun
const getTanggalPensiun = (tanggalLahir, usiaPensiun = 53) => {
    console.log('getTanggalPensiun: tanggalLahir =', tanggalLahir, 'usiaPensiun =', usiaPensiun)
    if (!tanggalLahir) return null
    const t = new Date(tanggalLahir)
    t.setFullYear(t.getFullYear() + usiaPensiun)
    return t
}

const hitungSisaMasaKerja = (tanggalLahir, usiaPensiun = 53) => {
    const tPensiun = getTanggalPensiun(tanggalLahir, usiaPensiun)
    if (!tPensiun) return '-'

    const today = new Date()
    if (tPensiun <= today) return 'Sudah melewati masa pensiun'

    let years = tPensiun.getFullYear() - today.getFullYear()
    let months = tPensiun.getMonth() - today.getMonth()
    let days = tPensiun.getDate() - today.getDate()

    if (days < 0) {
        months--
        const prevMonth = new Date(tPensiun.getFullYear(), tPensiun.getMonth(), 0)
        days += prevMonth.getDate()
    }

    if (months < 0) {
        years--
        months += 12
    }

    return `${years} tahun ${months} bulan ${days} hari`
}

const goBack = () => {
    router.back()
}
</script>

<template>
    <div class="w-full bg-slate-50 min-h-full">
        <div class="max-w-6xl mx-auto pl-4 pr-4 pb-8">
            <!-- Header kecil -->
            <div class="flex items-center justify-between mt-4 mb-4">
                <div class="flex items-center gap-3">
                    <button class="px-3 py-1 text-sm border rounded-lg hover:bg-gray-100 active:scale-95 transition"
                        @click="goBack">
                        ← Kembali
                    </button>
                    <div>
                        <h1 class="text-2xl font-semibold text-gray-800">
                            Detail Personil
                        </h1>
                    </div>
                </div>
            </div>

            <div v-if="!person" class="text-center text-gray-500 py-10">
                Data personil tidak ditemukan.
            </div>

            <div v-else class="space-y-6">
                <!-- Hero card -->
                <section
                    class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-lime-400 shadow-lg px-6 py-6 flex flex-col md:flex-row md:items-center gap-6">
                    <!-- background dekor -->
                    <div class="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-20">
                        <div class="w-40 h-40 rounded-full bg-white/40 blur-2xl absolute -top-10 right-4"></div>
                        <div class="w-32 h-32 rounded-full bg-emerald-900/30 blur-2xl absolute bottom-0 right-10"></div>
                    </div>

                    <!-- Foto -->
                    <div
                        class="relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white/20 border border-white/40 flex items-center justify-center overflow-hidden shadow-md">
                        <img v-if="person?.foto" :src="person?.foto" alt="Foto personil"
                            class="w-full h-full object-cover" />
                        <span v-else class="text-2xl font-bold text-white">
                            {{ person?.name?.slice(0, 2).toUpperCase() }}
                        </span>
                    </div>

                    <!-- Info utama -->
                    <div class="relative z-10 flex-1 text-white">
                        <div class="flex flex-wrap items-center gap-3">
                            <h2 class="text-xl md:text-2xl font-semibold tracking-tight">
                                {{ person?.name }}
                            </h2>
                        </div>

                        <p class="text-sm opacity-95 mt-1">
                            {{ person?.position }} · {{ person?.division }}
                        </p>
                        <p class="text-xs opacity-90 mt-1">
                            {{ person?.company }}
                        </p>

                        <!-- mini stats di hero -->
                        <div class="flex flex-wrap gap-3 mt-4 text-xs">
                            <div
                                class="inline-flex items-center gap-2 bg-white/12 rounded-2xl px-3 py-2 backdrop-blur-sm">
                                <div
                                    class="w-6 h-6 rounded-full bg-emerald-900/30 flex items-center justify-center text-[11px]">
                                    ⏱
                                </div>
                                <div>
                                    <p class="text-[10px] uppercase tracking-wide opacity-80">
                                        PENGABDIAN
                                    </p>
                                    <p class="font-semibold text-[12px]">
                                        {{ hitungMasaKerja(person?.yearJoined) }}
                                    </p>
                                </div>
                            </div>

                            <div
                                class="inline-flex items-center gap-2 bg-white/12 rounded-2xl px-3 py-2 backdrop-blur-sm">
                                <div
                                    class="w-6 h-6 rounded-full bg-emerald-900/30 flex items-center justify-center text-[11px]">
                                    📌
                                </div>
                                <div>
                                    <p class="text-[10px] uppercase tracking-wide opacity-80">
                                        PENSIUN PADA
                                    </p>
                                    <p class="font-semibold text-[12px]">
                                        {{
                                            formatShortDate(
                                                getTanggalPensiun(person?.dateOfBirth, person?.retirementAge)?.toISOString()
                                            )
                                        }}
                                    </p>
                                </div>
                            </div>

                            <div
                                class="inline-flex items-center gap-2 bg-white/12 rounded-2xl px-3 py-2 backdrop-blur-sm">
                                <div
                                    class="w-6 h-6 rounded-full bg-emerald-900/30 flex items-center justify-center text-[11px]">
                                    📅
                                </div>
                                <div>
                                    <p class="text-[10px] uppercase tracking-wide opacity-80">
                                        Temuan terbaru
                                    </p>
                                    <p class="font-semibold text-[12px]">
                                        {{ formatShortDate(person?.latestContribution) }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Tiga kartu info utama -->
                <section class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <!-- Data pribadi -->
                    <article class="bg-white shadow-sm rounded-2xl p-4 border border-slate-100">
                        <h3 class="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                            <span
                                class="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs">👤</span>
                            Data Pribadi
                        </h3>
                        <div class="space-y-3 text-sm text-slate-700">
                            <div>
                                <p class="text-[11px] uppercase tracking-wide text-slate-400">
                                    Tempat & tanggal lahir
                                </p>
                                <div class="flex items-center justify-between gap-2">
                                    <p class="text-[13px] font-medium text-slate-800">
                                        <span v-if="showSensitiveInfo.birthDate">
                                            {{ person?.placeOfBirth }}, {{ formatShortDate(person?.dateOfBirth) }}
                                        </span>
                                        <span v-else class="text-slate-400">
                                            {{ maskedText(10) }}
                                        </span>
                                    </p>

                                    <button @click="showSensitiveInfo.birthDate = !showSensitiveInfo.birthDate"
                                        class="text-slate-400 hover:text-slate-600 transition">
                                        {{ showSensitiveInfo.birthDate ? '🙈' : '👁️' }}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <p class="text-[11px] uppercase tracking-wide text-slate-400">
                                    Umur
                                </p>
                                <div class="flex items-center justify-between gap-2">
                                    <p class="text-[13px] font-medium  text-slate-800">
                                        <span v-if="showSensitiveInfo.age">
                                            {{ hitungUmur(person?.dateOfBirth) }}
                                        </span>
                                        <span v-else class="text-slate-400">
                                            {{ maskedText(10) }}
                                        </span>
                                    </p>

                                    <button @click="showSensitiveInfo.age = !showSensitiveInfo.age"
                                        class="text-slate-400 hover:text-slate-600 transition">
                                        {{ showSensitiveInfo.age ? '🙈' : '👁️' }}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <p class="text-[11px] uppercase tracking-wide text-slate-400">
                                    Alamat
                                </p>
                                <p class="text-[13px]">
                                    {{ person?.address }}
                                </p>
                            </div>
                            <div>
                                <p class="text-[11px] uppercase tracking-wide text-slate-400">
                                    No HP
                                </p>
                                <div class="flex items-center justify-between">
                                    <p class="text-[13px]">
                                        <span v-if="showSensitiveInfo.phone">
                                            {{ person?.phone }}
                                        </span>
                                        <span v-else class="text-slate-400">
                                            {{ maskedText(10) }}
                                        </span>
                                    </p>

                                    <button @click="showSensitiveInfo.phone = !showSensitiveInfo.phone"
                                        class="text-slate-400 hover:text-slate-600">
                                        {{ showSensitiveInfo.phone ? '🙈' : '👁️' }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </article>

                    <!-- Data pekerjaan -->
                    <article class="bg-white shadow-sm rounded-2xl p-4 border border-slate-100">
                        <h3 class="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                            <span
                                class="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs">💼</span>
                            Data Pekerjaan
                        </h3>
                        <div class="space-y-3 text-sm text-slate-700">
                            <div>
                                <p class="text-[11px] uppercase tracking-wide text-slate-400">
                                    ID Pekerja
                                </p>
                                <p class="text-[13px] font-medium">
                                    {{ person?.employId }}
                                </p>
                            </div>
                            <div>
                                <p class="text-[11px] uppercase tracking-wide text-slate-400">
                                    Status Pekerja
                                </p>
                                <p class="text-[13px]">
                                    {{ person?.employmentStatus }}
                                </p>
                            </div>
                            <div>
                                <p class="text-[11px] uppercase tracking-wide text-slate-400">
                                    Bergabung
                                </p>
                                <p class="text-[13px]">
                                    {{ person?.yearJoined }}
                                </p>
                            </div>
                            <div>
                                <p class="text-[11px] uppercase tracking-wide text-slate-400">
                                    Mengabdi
                                </p>
                                <p class="text-[13px]">
                                    {{ hitungMasaKerja(person?.yearJoined) }}
                                </p>
                            </div>
                        </div>
                    </article>

                    <!-- Data pensiun -->
                    <article class="bg-white shadow-sm rounded-2xl p-4 border border-emerald-100">
                        <h3 class="text-sm font-semibold text-emerald-700 mb-3 flex items-center gap-2">
                            <span
                                class="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs">🏁</span>
                            Masa Pensiun
                        </h3>
                        <div class="space-y-3 text-sm">
                            <div>
                                <p class="text-[11px] uppercase tracking-wide text-slate-400">
                                    Usia pensiun
                                </p>
                                <p class="text-[13px] font-medium text-emerald-700">
                                    {{ person?.retirementAge }} tahun
                                </p>
                            </div>

                            <div>
                                <p class="text-[11px] uppercase tracking-wide text-slate-400">
                                    Sisa masa kerja
                                </p>
                                <p class="text-[13px] font-medium text-emerald-700">
                                    {{ hitungSisaMasaKerja(person?.dateOfBirth, person?.retirementAge) }}
                                </p>
                            </div>

                            <div>
                                <p class="text-[11px] uppercase tracking-wide text-slate-400">
                                    Pensiun pada
                                </p>
                                <p class="text-[13px] font-medium">
                                    {{
                                        formatShortDate(
                                            getTanggalPensiun(person?.dateOfBirth, person?.retirementAge)?.toISOString()
                                        )
                                    }}
                                </p>
                            </div>



                            <p class="text-[11px] text-slate-500 mt-1">
                                {{ person?.retirementAge }} Tahun adalah masa pensiun yang ditetapkan oleh perusahaan.
                            </p>
                        </div>
                    </article>
                </section>

                <!-- Statistik temuan kecil-kecil -->
                <section class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <article
                        class="bg-white shadow-sm rounded-2xl p-4 border border-slate-100 flex items-center justify-between">
                        <div>
                            <p class="text-[11px] uppercase tracking-wide text-slate-400">
                                Total Temuan
                            </p>
                            <p class="text-xl font-semibold text-slate-800">
                                {{ person?.countFindings || 0 }}
                            </p>
                        </div>
                        <div
                            class="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg">
                            📌
                        </div>
                    </article>

                    <article
                        class="bg-white shadow-sm rounded-2xl p-4 border border-slate-100 flex items-center justify-between">
                        <div>
                            <p class="text-[11px] uppercase tracking-wide text-slate-400">
                                Temuan Terbaru
                            </p>
                            <p class="text-sm font-medium text-slate-800">
                                {{ formatShortDate(person?.latestContribution) }}
                            </p>
                        </div>
                        <div
                            class="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg">
                            📅
                        </div>
                    </article>

                    <article
                        class="bg-white shadow-sm rounded-2xl p-4 border border-slate-100 flex items-center justify-between">
                        <div>
                            <p class="text-[11px] uppercase tracking-wide text-slate-400">
                                Rata-rata per tahun
                            </p>
                            <p class="text-sm font-medium text-slate-800">
                                {{
                                    person?.countFindings && person?.yearJoined
                                        ? (person?.countFindings / (new Date().getFullYear() - person?.yearJoined ||
                                            1)).toFixed(1) +
                                        ' temuan/tahun'
                                        : '-'
                                }}
                            </p>
                        </div>
                        <div
                            class="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg">
                            📈
                        </div>
                    </article>
                </section>

                <!-- Riwayat temuan -->
                <section class="bg-white shadow-sm rounded-2xl p-4 border border-slate-100">
                    <div class="flex items-center justify-between mb-3">
                        <div>
                            <h3 class="text-sm font-semibold text-slate-700">
                                Riwayat Temuan
                            </h3>

                        </div>
                        <p class="text-xs text-slate-500">
                            Total: {{ totalCountFindings }} temuan
                        </p>
                    </div>

                    <div v-if="!pagedCountFindings.length" class="text-sm text-gray-400 py-4">
                        Belum ada temuan tercatat untuk personil ini.
                    </div>

                    <div v-else class="space-y-2">
                        <div v-for="t in pagedCountFindings" :key="t.id"
                            class="border rounded-xl px-3 py-2 flex justify-between items-start text-sm hover:bg-slate-50 transition">
                            <div class="pr-4">
                                <p class="font-medium text-slate-800">
                                    {{ t.judul }}
                                </p>
                                <p class="text-xs text-slate-500 mt-1">
                                    {{ formatShortDate(t.date) }}
                                </p>
                            </div>
                            <span class="px-3 py-1 text-xs rounded-full font-medium whitespace-nowrap" :class="{
                                'bg-green-100 text-green-700 border border-green-300': t.status === 'Selesai',
                                'bg-yellow-100 text-yellow-700 border border-yellow-300': t.status === 'Proses',
                                'bg-red-100 text-red-700 border border-red-300': t.status === 'Tunda',
                                'bg-gray-200 text-gray-700 border border-gray-300': t.status === 'Draft'
                            }">
                                {{ t.status }}
                            </span>
                        </div>
                    </div>

                    <!-- Pagination -->
                    <div v-if="totalPages > 1" class="flex justify-end items-center gap-2 mt-4 text-xs">
                        <button
                            class="px-3 py-1 border rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white"
                            :disabled="page <= 1" @click="page--">
                            Sebelumnya
                        </button>
                        <span class="text-slate-600">
                            Halaman {{ page }} / {{ totalPages }}
                        </span>
                        <button
                            class="px-3 py-1 border rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white"
                            :disabled="page >= totalPages" @click="page++">
                            Selanjutnya
                        </button>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>
