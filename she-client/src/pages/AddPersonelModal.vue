<template>
    <Teleport to="body">
        <div v-if="open" class="fixed inset-0 z-50">
            <!-- Overlay -->
            <div class="absolute inset-0 bg-black/40" @click="$emit('close')"></div>

            <!-- Modal -->
            <div class="relative max-w-4xl mx-auto mt-8 bg-white rounded-2xl shadow-xl p-8 max-h-[90vh] overflow-y-auto">
                <!-- Header -->
                <div class="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                    <h2 class="text-2xl font-bold text-gray-800">Tambah Personel Baru</h2>
                    <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
                </div>

                <!-- Form -->
                <form @submit.prevent="onSubmit" class="space-y-6">
                    <!-- Section 1: Data Diri Utama -->
                    <div class="bg-gray-50 rounded-lg p-6">
                        <h3 class="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                            <span class="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">1</span>
                            Data Diri Utama
                        </h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <!-- Nama -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap <span class="text-red-500">*</span></label>
                                <input v-model="form.name" type="text" placeholder="Masukkan nama lengkap"
                                    class="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    required />
                            </div>

                            <!-- Email -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Email <span class="text-red-500">*</span></label>
                                <input v-model="form.email" type="email" placeholder="nama@email.com"
                                    class="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    required />
                            </div>

                            <!-- Tempat Lahir -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Tempat Lahir <span class="text-red-500">*</span></label>
                                <input v-model="form.placeOfBirth" type="text" placeholder="Kota/Kabupaten"
                                    class="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    required />
                            </div>

                            <!-- Tanggal Lahir -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Tanggal Lahir <span class="text-red-500">*</span></label>
                                <input v-model="form.dateOfBirth" type="date"
                                    class="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    required />
                            </div>

                            <!-- Telepon -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon <span class="text-red-500">*</span></label>
                                <input v-model="form.phone" type="tel" placeholder="08xxxxxxxxxx"
                                    class="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    required />
                            </div>

                            <!-- Password -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Password <span class="text-red-500">*</span></label>
                                <div class="relative">
                                    <input v-model="form.password" :type="showPassword ? 'text' : 'password'" placeholder="Minimal 8 karakter"
                                        class="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        required />
                                    <button type="button" @click="showPassword = !showPassword"
                                        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        title="Toggle password visibility">
                                        <span v-if="showPassword">👁️</span>
                                        <span v-else>👁️‍🗨️</span>
                                    </button>
                                </div>
                            </div>

                            <!-- Alamat -->
                            <div class="md:col-span-2">
                                <label class="block text-sm font-medium text-gray-700 mb-2">Alamat</label>
                                <textarea v-model="form.address" placeholder="Jalan, No, RT/RW, Kelurahan, Kecamatan"
                                    class="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                                    rows="2"></textarea>
                            </div>
                        </div>
                    </div>

                    <!-- Section 2: Data Kepegawaian -->
                    <div class="bg-gray-50 rounded-lg p-6">
                        <h3 class="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                            <span class="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">2</span>
                            Data Kepegawaian
                        </h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <!-- Nomor ID -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">ID Karyawan</label>
                                <input v-model="form.employId" type="text" placeholder="Contoh: ICT-001"
                                    class="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500" />
                            </div>

                            <!-- Posisi/Jabatan -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Posisi/Jabatan <span class="text-red-500">*</span></label>
                                <input v-model="form.position" type="text" placeholder="Contoh: ICT Tech, Manager"
                                    class="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    required />
                            </div>

                            <!-- Divisi -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Divisi <span class="text-red-500">*</span></label>
                                <select v-model="form.division"
                                    class="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    required>
                                    <option value="" disabled>Pilih Divisi</option>
                                    <option value="ICT">ICT</option>
                                    <option value="Facility">Facility</option>
                                    <option value="Camp">Camp</option>
                                    <option value="Produksi">Produksi</option>
                                    <option value="Security">Security</option>
                                    <option value="CSR">CSR</option>
                                    <option value="RAR">RAR</option>
                                    <option value="BEP">BEP</option>
                                </select>
                            </div>

                            <!-- Status Kepegawaian -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Status Kepegawaian <span class="text-red-500">*</span></label>
                                <select v-model="form.employmentStatus"
                                    class="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    required>
                                    <option value="" disabled>Pilih Status</option>
                                    <option value="Permanent">Permanent</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Internship">Internship</option>
                                </select>
                            </div>

                            <!-- Perusahaan -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Perusahaan <span class="text-red-500">*</span></label>
                                <input v-model="form.company" type="text" placeholder="PT Wira Cipta Perkasa"
                                    class="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    required />
                            </div>

                            <!-- Tahun Bergabung -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Tahun Bergabung <span class="text-red-500">*</span></label>
                                <input v-model="form.yearJoined" type="number" placeholder="2023"
                                    class="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    required />
                            </div>

                            <!-- Usia Pensiun -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Usia Pensiun <span class="text-red-500">*</span></label>
                                <input v-model="form.retirementAge" type="number" placeholder="53"
                                    class="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    required />
                            </div>
                        </div>
                    </div>

                    <!-- Section 3: Status dan Role -->
                    <div class="bg-gray-50 rounded-lg p-6">
                        <h3 class="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                            <span class="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">3</span>
                            Status dan Akses
                        </h3>

                        <!-- Status Aktif -->
                        <div class="mb-6">
                            <label class="block text-sm font-medium text-gray-700 mb-3">Status Aktif <span class="text-red-500">*</span></label>
                            <div class="flex gap-6">
                                <div class="flex items-center">
                                    <input v-model="form.isActive" type="radio" value="true" id="active-yes"
                                        class="w-4 h-4 text-green-600 cursor-pointer" />
                                    <label for="active-yes" class="ml-2 cursor-pointer text-gray-700 font-medium">Aktif</label>
                                </div>
                                <div class="flex items-center">
                                    <input v-model="form.isActive" type="radio" value="false" id="active-no"
                                        class="w-4 h-4 text-red-600 cursor-pointer" />
                                    <label for="active-no" class="ml-2 cursor-pointer text-gray-700 font-medium">Non-Aktif</label>
                                </div>
                            </div>
                        </div>

                        <!-- Role -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-3">Role/Peran <span class="text-red-500">*</span></label>
                            <div class="flex gap-6">
                                <div class="flex items-center">
                                    <input v-model="form.role" type="radio" value="user" id="role-user"
                                        class="w-4 h-4 text-green-600 cursor-pointer" />
                                    <label for="role-user" class="ml-2 cursor-pointer text-gray-700 font-medium">User</label>
                                </div>
                                <div class="flex items-center">
                                    <input v-model="form.role" type="radio" value="admin" id="role-admin"
                                        class="w-4 h-4 text-blue-600 cursor-pointer" />
                                    <label for="role-admin" class="ml-2 cursor-pointer text-gray-700 font-medium">Admin</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Alert Error -->
                    <div v-if="errors && Object.keys(errors).length > 0" class="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p class="text-red-700 font-medium mb-2">Terjadi Kesalahan:</p>
                        <ul class="list-disc list-inside text-red-600 text-sm space-y-1">
                            <li v-for="(message, field) in errors" :key="field">{{ message }}</li>
                        </ul>
                    </div>

                    <!-- Buttons -->
                    <div class="flex justify-end gap-3 pt-6 border-t border-gray-200">
                        <button type="button" @click="$emit('close')"
                            class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition font-medium">
                            Batal
                        </button>
                        <button type="submit" :disabled="loading"
                            class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                            <span v-if="loading" class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            {{ loading ? 'Menyimpan...' : 'Simpan Personel' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useUsersStore } from '@/stores/usersStore.js'

const props = defineProps({
    open: Boolean
})

const emit = defineEmits(['close', 'submitted', 'error'])

const usersStore = useUsersStore()
const loading = ref(false)
const errors = ref({})
const showPassword = ref(false)

// Reset loading jika modal ditutup secara paksa
watch(() => props.open, (newVal) => {
    if (!newVal) {
        loading.value = false
        errors.value = {}
        showPassword.value = false
    }
})

const form = ref({
    name: '',
    email: '',
    placeOfBirth: '',
    dateOfBirth: '',
    address: '',
    phone: '',
    employId: '',
    password: '',
    position: '',
    division: '',
    company: '',
    employmentStatus: '',
    yearJoined: new Date().getFullYear().toString(),
    retirementAge: '',
    isActive: 'true',
    role: 'user'
})

const validateForm = () => {
    errors.value = {}

    if (!form.value.name.trim()) {
        errors.value.name = 'Nama lengkap harus diisi'
    }
    if (!form.value.email.trim()) {
        errors.value.email = 'Email harus diisi'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
        errors.value.email = 'Format email tidak valid'
    }
    if (!form.value.placeOfBirth.trim()) {
        errors.value.placeOfBirth = 'Tempat lahir harus diisi'
    }
    if (!form.value.dateOfBirth) {
        errors.value.dateOfBirth = 'Tanggal lahir harus diisi'
    }
    if (!form.value.phone.trim()) {
        errors.value.phone = 'Nomor telepon harus diisi'
    }
    if (!form.value.password.trim()) {
        errors.value.password = 'Password harus diisi'
    } else if (form.value.password.length < 8) {
        errors.value.password = 'Password minimal 8 karakter'
    }
    if (!form.value.position.trim()) {
        errors.value.position = 'Posisi/Jabatan harus diisi'
    }
    if (!form.value.division) {
        errors.value.division = 'Divisi harus dipilih'
    }
    if (!form.value.employmentStatus) {
        errors.value.employmentStatus = 'Status Kepegawaian harus dipilih'
    }
    if (!form.value.company.trim()) {
        errors.value.company = 'Perusahaan harus diisi'
    }
    if (!form.value.yearJoined) {
        errors.value.yearJoined = 'Tahun Bergabung harus diisi'
    }
    if (!form.value.retirementAge) {
        errors.value.retirementAge = 'Usia Pensiun harus diisi'
    }

    return Object.keys(errors.value).length === 0
}

const onSubmit = async () => {
    if (!validateForm()) {
        return
    }

    loading.value = true
    errors.value = {}
    
    try {
        const payload = {
            ...form.value,
            isActive: form.value.isActive === 'true' || form.value.isActive === true
        }

        const created = await usersStore.addUser(payload)
        console.log('User created successfully:', created)
        
        // Reset form terlebih dahulu
        form.value = {
            name: '',
            email: '',
            placeOfBirth: '',
            dateOfBirth: '',
            address: '',
            phone: '',
            employId: '',
            password: '',
            position: '',
            division: '',
            company: '',
            employmentStatus: '',
            yearJoined: new Date().getFullYear().toString(),
            retirementAge: '',
            isActive: 'true',
            role: 'user'
        }
        showPassword.value = false
        
        // Emit submitted dan close
        emit('submitted', created)
        emit('close')
    } catch (err) {
        console.error('Error creating user:', err)
        emit('error', err.message || 'Gagal menyimpan personel')
    } finally {
        loading.value = false
    }
}
</script>
