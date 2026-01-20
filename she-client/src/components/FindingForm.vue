<template>
    <div class="mb-4">
        <h2 class="text-lg font-semibold text-slate-800">
            Tambah Temuan SHE
        </h2>
        <p class="text-sm text-slate-500">
            Laporkan temuan keselamatan, fasilitas, atau lingkungan kerja
        </p>
    </div>

    <div>
        <div v-if="isSubmitting" class="absolute inset-0 z-50 bg-white/60 flex items-center justify-center rounded-2xl">
            <svg class="w-10 h-10 text-green-600 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
        </div>
        <label class="text-sm font-medium text-slate-700">
            Deskripsi Temuan
        </label>
        <textarea v-model="form.description" rows="4" @blur="touched.description = true"
            placeholder="Contoh: Kabel listrik belakang commshop belum terisolasi dengan baik dan berpotensi korsleting saat hujan."
            class="w-full border rounded-lg p-3 mt-1"
            :class="touched.description && errors.description ? 'border-red-400' : ''" />
        <p v-if="touched.description && errors.description" class="text-xs text-red-500 mt-1">
            {{ errors.description }}
        </p>

    </div>

    <div>
        <label class="text-sm font-medium text-slate-700">
            Lokasi Temuan
        </label>
        <input v-model="form.lokasi" placeholder="Contoh: Belakang commshop, dekat panel listrik"
            class="w-full border rounded-lg p-3 mt-1" />
    </div>

    <div>
        <label class="text-sm font-medium text-slate-700">
            Pelapor
        </label>

        <div class="flex gap-4 mt-2">
            <label class="flex items-center gap-2 text-sm">
                <input type="radio" value="internal" v-model="form.reporterType" />
                Pekerja terdaftar
            </label>

            <label class="flex items-center gap-2 text-sm">
                <input type="radio" value="external" v-model="form.reporterType" />
                Bukan pekerja
            </label>
        </div>
    </div>

    <div v-if="form.reporterType === 'internal'">
        <label class="text-sm font-medium text-slate-700">
            Nama Pelapor
        </label>
        <input v-model="form.reporterName" @blur="touched.reporterName = true" placeholder="Pilih / ketik nama pekerja"
            class="w-full border rounded-lg p-3 mt-1"
            :class="touched.reporterName && errors.reporterName ? 'border-red-400' : ''" />
        <p class="text-xs text-slate-400 mt-1">
            Jika bukan pekerja, pilih opsi “Bukan pekerja”
        </p>
        <p v-if="touched.reporterName && errors.reporterName" class="text-xs text-red-500 mt-1">
            {{ errors.reporterName }}
        </p>
    </div>

    <div v-if="form.reporterType === 'external'">
        <label class="text-sm font-medium text-slate-700">
            Nama Pelapor (Non-Pekerja)
        </label>
        <input v-model="form.reporterName" placeholder="Nama Pelapor - Magang" class="w-full border rounded-lg p-3 mt-1"
            :class="touched.reporterName && errors.reporterName ? 'border-red-400' : ''" />
        <p v-if="touched.reporterName && errors.reporterName" class="text-xs text-red-500 mt-1">
            {{ errors.reporterName }}
        </p>
    </div>

    <div>
        <label class="text-sm font-medium text-slate-700">
            Divisi Tujuan
        </label>
        <select v-model="form.to_division" @blur="touched.to_division = true" class="w-full border rounded-lg p-3 mt-1"
            :class="touched.to_division && errors.to_division ? 'border-red-400' : ''">
            <option value="">Pilih divisi</option>
            <option>ICT</option>
            <option>Electric</option>
            <option>Facility</option>
            <option>Camp</option>
        </select>

        <p v-if="touched.to_division && errors.to_division" class="text-xs text-red-500 mt-1">
            {{ errors.to_division }}
        </p>
    </div>

    <div>
        <label class="text-sm font-medium text-slate-700">
            Catatan Tambahan
        </label>
        <textarea v-model="form.catatan" rows="2" placeholder="Opsional" class="w-full border rounded-lg p-3 mt-1" />
    </div>

    <div v-if="isSuccess" class="text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg p-3">
        ✔ Temuan berhasil ditambahkan
    </div>


    <div class="flex justify-end gap-3 pt-4 border-t">
        <button type="button" class="px-4 py-2 border rounded-lg disabled:opacity-50" @click="$emit('cancel')" :disabled="isSubmitting">
            Batal
        </button>

        <button class="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2 disabled:opacity-50"
            :disabled="isSubmitting || !form.description" @click="submit">
            <svg v-if="isSubmitting" class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" class="opacity-25"></circle>
                <path d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" fill="currentColor" class="opacity-75"></path>
            </svg>
            <span v-if="isSubmitting">Menyimpan...</span>
            <span v-else>Simpan Temuan</span>
        </button>

    </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '@/utils/api'

const isSubmitting = ref(false)
const isSuccess = ref(false)
const errors = ref({})
const apiError = ref('')
const touched = ref({
    description: false,
    reporterName: false,
    to_division: false
})



const form = ref({
    description: '',
    lokasi: '',

    reporterType: 'internal', // internal | external
    reporterId: '',           // nanti kalau pakai dropdown pekerja
    reporterName: '',         // untuk external

    to_division: '',
    status: 'Draft',
    catatan: ''
})

const validate = () => {
    const e = {}

    if (form.value.description.length < 10) {
        e.description = 'Deskripsi terlalu singkat'
    }

    if (!form.value.to_division) {
        e.to_division = 'Divisi tujuan wajib dipilih'
    }

    if (!form.value.reporterName) {
        e.reporterName = 'Nama pelapor wajib diisi'
    }

    errors.value = e
    return Object.keys(e).length === 0
}


const submit = async () => {
    touched.value = {
        description: true,
        reporterName: true,
        to_division: true
    }
    if (!validate()) return

    if (!form.value.description || !form.value.to_division) return

    isSubmitting.value = true

    // attempt to post to API
    let created = null
    try {
        apiError.value = ''
        const payload = {
            description: form.value.description,
            lokasi: form.value.lokasi,
            reporterType: form.value.reporterType,
            reporterName: form.value.reporterName,
            to_division: form.value.to_division,
            status: 'Draf',
            catatan: form.value.catatan
        }

        const res = await api.apiPost('/findings', payload)
        // assume API returns created resource or { data: created }
        created = Array.isArray(res) ? res[0] : (res.data || res.created || res || null)
    } catch (err) {
        apiError.value = err.message || 'Gagal menyimpan ke server.'
        created = null
        emit('error', apiError.value)
    }

    const newFinding = created || {
        id: Date.now(),
        description: form.value.description,
        lokasi: form.value.lokasi,
        name: form.value.reporterName || 'Anonim',
        division: form.value.reporterType === 'internal' ? 'Internal' : 'External',
        to_division: form.value.to_division,
        status: 'Draf',
        date: new Date().toISOString().slice(0, 10),
        catatan: form.value.catatan,
        images: [],
        logs: [
            {
                date: new Date().toISOString(),
                action: 'Temuan dibuat',
                status: 'Draf'
            }
        ]
    }

    emit('submit', newFinding)

    // show success or fallback warning
    if (apiError.value) {
        // already emitted error to parent; also show local error area
    }

    isSubmitting.value = false
    isSuccess.value = true

    // reset form
    form.value = {
        description: '',
        lokasi: '',
        reporterType: 'internal',
        reporterId: '',
        reporterName: '',
        to_division: '',
        status: 'Draf',
        catatan: ''
    }

    // auto close setelah success
    setTimeout(() => {
        emit('cancel')
        isSuccess.value = false
    }, 1200)
}

</script>
