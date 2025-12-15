<template>
  <transition name="fade" mode="out-in">
    <div :key="finding.id">
      <div class="flex items-center justify-between mt-4 mb-4">
        <div class="flex items-center gap-3">
          <button class="px-3 py-1 text-sm border rounded-lg hover:bg-gray-100 active:scale-95 transition"
            @click="goBack">
            ← Kembali
          </button>
          <div>
            <h1 class="text-2xl font-semibold text-gray-800">
              Detail temuan SHE
            </h1>
          </div>
        </div>
      </div>
      <div class="w-full px-6 pb-10">
        <!-- Header -->
        <div class="mb-6 pt-4">
          <h1 class="text-xl font-semibold text-slate-800 leading-snug">
            {{ finding.description }}
          </h1>
          <div class="mt-4 border-b border-slate-200"></div>
        </div>

        <!-- Main content -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- LEFT -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Informasi utama -->
            <div class="bg-white rounded-2xl border border-slate-100 p-5">
              <h2 class="text-sm font-semibold text-slate-700 mb-4">
                Informasi Temuan
              </h2>

              <div class="grid grid-cols-2 gap-y-3 text-sm">
                <div class="text-slate-500">Status</div>
                <div>
                  <span class="px-3 py-1 rounded-full text-xs font-medium" :class="statusClass(finding.status)">
                    {{ finding.status }}
                  </span>
                </div>

                <div class="text-slate-500">Tanggal</div>
                <div class="text-slate-700">
                  {{ formatDate(finding.date) }}
                </div>

                <div class="text-slate-500">Pelapor</div>
                <div class="text-slate-700">
                  {{ finding.name }}, {{ finding.division }}
                </div>

                <div class="text-slate-500">Kepada</div>
                <div class="text-slate-700">
                  {{ finding.to_division }}
                </div>

                <div class="text-slate-500">Lokasi</div>
                <div class="text-slate-700">
                  {{ finding.lokasi || '-' }}
                </div>
              </div>
            </div>

            <!-- Log Riwayat -->
            <div class="bg-white rounded-2xl border border-slate-100 p-5">
              <h2 class="text-sm font-semibold text-slate-700 mb-4">
                Riwayat Perubahan
              </h2>

              <div v-if="finding.logs && finding.logs.length" class="space-y-4">
                <div v-for="(log, i) in finding.logs" :key="i" class="flex gap-3">
                  <!-- Bullet -->
                  <div class="mt-1 w-2 h-2 rounded-full bg-slate-400"></div>

                  <!-- Content -->
                  <div class="text-sm">
                    <p class="text-slate-700">
                      {{ log.action }}
                    </p>
                    <p class="text-xs text-slate-500">
                      {{ formatDateTime(log.date) }}
                      <span v-if="log.status"> • Status: {{ log.status }}</span>
                    </p>
                  </div>
                </div>
              </div>

              <p v-else class="text-sm text-slate-400 italic">
                Belum ada riwayat perubahan.
              </p>
            </div>

          </div>

          <!-- RIGHT -->
          <div class="space-y-6">
            <!-- Foto -->
            <div class="bg-white rounded-2xl border border-slate-100 p-5">
              <h2 class="text-sm font-semibold text-slate-700 mb-3">
                Foto Temuan
              </h2>

              <div v-if="finding.images && finding.images.length" class="grid grid-cols-2 gap-3">
                <img v-for="(img, i) in finding.images" :key="i" :src="img"
                  class="w-full h-32 object-cover rounded-xl border" />
              </div>

              <div v-else
                class="h-32 flex items-center justify-center rounded-xl border border-dashed text-sm text-slate-400">
                Tidak ada foto
              </div>
            </div>
          </div>
        </div>
        <div class="mt-4 border-b border-slate-200 pt-6"></div>
        <ItemList :items="latestTemuan" :showSeeAll="true" @seeAll="handleSeeAll" />
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ItemList from '../components/ItemList.vue';

// sementara dummy (nanti ganti service)
import { dummyTemuan } from '@/dataDummy';

const allTemuan = ref(dummyTemuan)

const route = useRoute()
const router = useRouter()
const finding = ref({})


const loadFinding = (id) => {
  finding.value = {}
  finding.value = allTemuan.value.find((t) => t.id == id) || {}
}

watch(
  () => route.params.id,
  (newId) => {
    loadFinding(newId)
  }
)

onMounted(() => {
  loadFinding(route.params.id)
})

const latestTemuan = computed(() => {
  return allTemuan.value
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10);
});

const handleSeeAll = () => {
  router.push({ name: 'Finding' })
}

const formatDate = (iso) => {
  if (!iso) return '-'
  return new Date(iso).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

const statusClass = (status) => {
  switch (status) {
    case 'Selesai':
      return 'bg-green-100 text-green-700'
    case 'Proses':
      return 'bg-yellow-100 text-yellow-700'
    case 'Tunda':
      return 'bg-red-100 text-red-700'
    case 'Draf':
      return 'bg-slate-100 text-slate-600'
    default:
      return ''
  }
}

const formatDateTime = (iso) => {
  if (!iso) return '-'
  return new Date(iso).toLocaleString('id-ID', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}


const goBack = () => {
  router.back()
}
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
