<template>
    <aside class="w-64 bg-grey-custom text-white min-h-screen flex flex-col items-center py-6">

        <!-- Logo -->
        <div class="flex flex-col w-35 pt-px ">
            <img :src="imgLogo">
            <p class="text-xs text-center text-black-custom">empowering people</p>
        </div>

        <!-- Menu -->
        <nav class="w-full space-y-3 pt-10">

            <!-- Beranda -->
            <a href="#" class="group flex items-center gap-3  py-2">
                <div
                    class="w-1.5 h-10 rounded-r-lg bg-grey-custom opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                </div>
                <div
                    class="w-1.5 h-10  rounded-r-lg bg-green-strong-custom opacity-0 group-hover:opacity-100 absolute transition-opacity duration-300">
                </div>
                <!-- Icon -->
                <img :src="icHome" class="pl-5 group-hover:hidden">
                <img :src="icHomeSelected" class="pl-5 group-hover:block hidden">

                <span
                    class="text-lg font-semibold text-black-custom font-inter group-hover:text-green-strong-custom">Beranda</span>

            </a>

            <!-- Temuan -->
            <a href="#" class="group flex items-center gap-3 py-2">
                <div
                    class="w-1.5 h-10 rounded-r-lg bg-grey-custom opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                </div>
                <div
                    class="w-1.5 h-10  rounded-r-lg bg-green-strong-custom opacity-0 group-hover:opacity-100 absolute transition-opacity duration-300">
                </div>
                <!-- Icon -->
                <img :src="icList" class="pl-5 group-hover:hidden">
                <img :src="icListSelected" class="pl-5 group-hover:block hidden">

                <span
                    class="text-lg font-semibold text-black-custom font-inter group-hover:text-green-strong-custom">Temuan</span>
            </a>

            <!-- Personel -->
            <a href="#" class="group flex items-center gap-3 py-2">
                <div
                    class="w-1.5 h-10 rounded-r-lg bg-grey-custom opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                </div>
                <div
                    class="w-1.5 h-10  rounded-r-lg bg-green-strong-custom opacity-0 group-hover:opacity-100 absolute transition-opacity duration-300">
                </div>
                <!-- Icon -->
                <img :src="icPerson" class="pl-5 group-hover:hidden">
                <img :src="icPersonSelected" class="pl-5 group-hover:block hidden">

                <span
                    class="text-lg font-semibold text-black-custom font-inter group-hover:text-green-strong-custom">Personil</span>
            </a>

        </nav>

    </aside>
</template>

<script setup>
import imgLogo from '../assets/logo.png'
import icHome from '../assets/ic-home.png'
import icHomeSelected from '../assets/ic-home-selected.png'
import icList from '../assets/ic-list.png'
import icListSelected from '../assets/ic-list-selected.png'
import icPerson from '../assets/ic-person.png'
import icPersonSelected from '../assets/ic-person-selected.png'
</script>
