<template>
    <!-- Toast -->
    <div v-if="toast.show" class="fixed top-6 right-6 z-50 px-4 py-3 rounded-xl shadow-lg text-sm transition-all"
        :class="toast.type === 'success'
            ? 'bg-green-600 text-white'
            : 'bg-red-600 text-white'">
        {{ toast.message }}
    </div>

    <div class="mb-4">
        <h2 class="text-lg font-semibold text-slate-800">
            Tambah Temuan SHE
        </h2>
        <p class="text-sm text-slate-500">
            Laporkan temuan keselamatan, fasilitas, atau lingkungan kerja
        </p>
    </div>

    <div>
        <label class="text-sm font-medium text-slate-700">
            Deskripsi Temuan
        </label>
        <textarea v-model="form.description" rows="4" @blur="touched.description = true"
            placeholder="Contoh: Kabel listrik belakang commshop belum terisolasi dengan baik dan berpotensi korsleting saat hujan."
            class="w-full border rounded-lg p-3 mt-1"
            :class="touched.description && errors.description ? 'border-red-400' : ''" />
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
        <input v-model="form.reporterName" placeholder="Pilih / ketik nama pekerja"
            class="w-full border rounded-lg p-3 mt-1" />
        <p class="text-xs text-slate-400 mt-1">
            Jika bukan pekerja, pilih opsi “Bukan pekerja”
        </p>
    </div>

    <div v-if="form.reporterType === 'external'">
        <label class="text-sm font-medium text-slate-700">
            Nama Pelapor (Non-Pekerja)
        </label>
        <input v-model="form.reporterName" placeholder="Contoh: Tamu vendor / Mahasiswa magang"
            class="w-full border rounded-lg p-3 mt-1" />
    </div>

    <div>
        <label class="text-sm font-medium text-slate-700">
            Divisi Tujuan
        </label>
        <select v-model="form.to_division" class="w-full border rounded-lg p-3 mt-1">
            <option value="">Pilih divisi</option>
            <option>ICT</option>
            <option>Electric</option>
            <option>Facility</option>
            <option>Camp</option>
        </select>
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
        <button type="button" class="px-4 py-2 border rounded-lg" @click="$emit('cancel')">
            Batal
        </button>

        <button class="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2 disabled:opacity-50"
            :disabled="isSubmitting || !form.description || !form.to_division" @click="submit">
            <span v-if="isSubmitting">Menyimpan...</span>
            <span v-else>Simpan Temuan</span>
        </button>

    </div>
</template>

<script setup>
import { ref } from 'vue'

const isSubmitting = ref(false)
const isSuccess = ref(false)
const errors = ref({})
const touched = ref({})



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

    // simulasi request backend
    await new Promise((resolve) => setTimeout(resolve, 800))

    const newFinding = {
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

const handleSubmitted = (newFinding) => {
    allTemuan.value.unshift(newFinding)
    showToast('Temuan berhasil ditambahkan')
}


const toast = ref({
    show: false,
    message: '',
    type: 'success' // success | error
})

const showToast = (message, type = 'success') => {
    toast.value = {
        show: true,
        message,
        type
    }

    setTimeout(() => {
        toast.value.show = false
    }, 3000)
}


</script>
