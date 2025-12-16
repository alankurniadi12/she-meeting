<template>
    <div class="pl-2 pt-8 pr-2 w-full">
        <div class="overflow-x-auto">
            <div class="flex space-x-8 w-max">
                <!-- Total -->
                <div class="w-55 h-35 bg-green-custom rounded-3xl overflow-hidden hover:cursor-pointer"
                    @click="handleSeeAll">
                    <div class="p-4 w-full">
                        <div class="flex items-center justify-between ">
                            <h1 class="text-white font-semibold text-lg flex-1 break-words">Total</h1>
                            <img class="w-8 h-8 shrink-0" :src="icArrowWhite" alt="icon arrow white">
                        </div>
                        <div class="pt-3 flex items-center">
                            <img class="w-8 h-8 shrink-0" :src="icListRounded" alt="icon list total" />
                            <h1 class="text-white font-semibold text-5xl pl-4 break-words">15000</h1>
                        </div>
                    </div>
                </div>

                <!-- Selesai  -->
                <div class="w-55 h-35 bg-grey-custom rounded-3xl overflow-hidden hover:cursor-pointer"
                    @click="goToFinding('Selesai')">
                    <div class="p-4 w-full">
                        <div class="flex items-center justify-between ">
                            <h1 class="text-green-strong-custom font-semibold text-lg flex-1 break-words">Selesai</h1>
                            <img class="w-8 h-8 shrink-0" :src="icArrowGrey" alt="icon arrow white">
                        </div>
                        <div class="pt-3 flex items-center">
                            <img class="w-8 h-8 shrink-0" :src="icDone" alt="icon list total" />
                            <h1 class="text-black-custom font-semibold text-5xl pl-4 break-words">150</h1>
                        </div>
                    </div>
                </div>

                <!-- Proses  -->
                <div class="w-55 h-35 bg-grey-custom rounded-3xl overflow-hidden hover:cursor-pointer"
                    @click="goToFinding('Proses')">
                    <div class=" p-4 w-full">
                        <div class="flex items-center justify-between ">
                            <h1 class="text-orange-custom font-semibold text-lg flex-1 break-words">Proses</h1>
                            <img class="w-8 h-8 shrink-0" :src="icArrowGrey" alt="icon arrow white">
                        </div>
                        <div class="pt-3 flex items-center">
                            <img class="w-8 h-8 shrink-0" :src="icTimer" alt="icon list total" />
                            <h1 class="text-black-custom font-semibold text-5xl pl-4 break-words">90</h1>
                        </div>
                    </div>
                </div>

                <!-- Tunda  -->
                <div class="w-55 h-35 bg-grey-custom rounded-3xl overflow-hidden hover:cursor-pointer"
                    @click="goToFinding('Tunda')">
                    <div class=" p-4 w-full">
                        <div class="flex items-center justify-between ">
                            <h1 class="text-red-custom font-semibold text-lg flex-1 break-words">Tunda</h1>
                            <img class="w-8 h-8 shrink-0" :src="icArrowGrey" alt="icon arrow white">
                        </div>
                        <div class="pt-3 flex items-center">
                            <img class="w-8 h-8 shrink-0" :src="icPause" alt="icon list total" />
                            <h1 class="text-black-custom font-semibold text-5xl pl-4 break-words">8</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import icListRounded from '../assets/ic-list-rounded.png'
import icArrowWhite from '../assets/ic-arrow-white.png'
import icArrowGrey from '../assets/ic-arrow-grey.png'
import icDone from '../assets/ic-done.png'
import icTimer from '../assets/ic-timer.png'
import icPause from '../assets/ic-pause.png'
import { useRouter } from 'vue-router'

const router = useRouter();

const handleSeeAll = () => {
    // Logic for "Lihat Semua" button
    router.push({ name: 'Finding' })
};

const goToFinding = (status) => {
    router.push({
        name: 'Finding',
        query: { status }
    });
};
</script>