<template>
    <Teleport to="body">
        <div v-if="open" class="fixed inset-0 z-50">
            <!-- overlay -->
            <div class="absolute inset-0 bg-black/40" @click="$emit('close')"></div>

            <!-- modal -->
            <div class="relative max-w-2xl mx-auto mt-20 bg-white rounded-2xl shadow-lg p-6">
                <FindingForm @cancel="$emit('close')" @submit="$emit('submitted', $event)" />
            </div>
        </div>
    </Teleport>
</template>

<script setup>
import FindingForm from '../components/FindingForm.vue'

const props = defineProps({
    open: Boolean
})

const emit = defineEmits(['close', 'submitted'])
</script>
