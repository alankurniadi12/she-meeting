<template>
    <Teleport to="body">
        <div v-if="open" class="fixed inset-0 z-50">
            <!-- overlay -->
            <div class="absolute inset-0 bg-black/40" @click="$emit('close')"></div>

            <!-- modal -->
                            <div class="relative max-w-2xl mx-auto mt-20 bg-white rounded-2xl shadow-lg p-6">
                                    <FindingForm @cancel="$emit('close')" @submit="onSubmit" @error="$emit('error', $event)" />
                            </div>
        </div>
    </Teleport>
</template>

<script setup>
    import FindingForm from '../components/FindingForm.vue'
    import { useFindingStore } from '@/stores/findingStore'
    import { getCurrentInstance } from 'vue'

    const props = defineProps({
            open: Boolean
    })

    const emit = defineEmits(['close', 'submitted', 'error'])

    const findingStore = useFindingStore()

    const onSubmit = async (payloadWrapper) => {
        // payloadWrapper: { payload, presentation }
        const { payload, presentation } = payloadWrapper || {}
        try {
            // call store to persist; store will insert created item into items
            const created = await findingStore.addFinding(payload)
            // if API returned created, use it; otherwise fallback to presentation
            emit('submitted', created || presentation)
            emit('close')
        } catch (err) {
            emit('error', err.message || 'Gagal menyimpan temuan')
        }
    }
</script>
