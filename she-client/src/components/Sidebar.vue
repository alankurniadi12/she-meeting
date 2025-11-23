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
            <RouterLink to="/" v-slot="{ isActive }">
                <div class="group flex items-center gap-3 py-2 relative cursor-pointer">

                    <!-- Left highlight bar -->
                    <div class="w-1.5 h-10 rounded-r-lg bg-grey-custom transition-all duration-300"
                        :class="isActive ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'">
                    </div>

                    <div class="w-1.5 h-10 rounded-r-lg bg-green-strong-custom transition-all duration-300 absolute left-0"
                        :class="isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'">
                    </div>

                    <!-- Icon -->
                    <img :src="isActive ? icHomeSelected : icHome" class="pl-5">

                    <!-- Text -->
                    <span class="text-lg font-semibold font-inter transition-colors duration-300"
                        :class="isActive ? 'text-green-strong-custom' : 'text-black-custom group-hover:text-green-strong-custom'">
                        Beranda
                    </span>

                </div>
            </RouterLink>


            <!-- Temuan -->
            <RouterLink to="/finding" v-slot="{ isActive }">
                <div class="group flex items-center gap-3 py-2 relative cursor-pointer">

                    <div class="w-1.5 h-10 rounded-r-lg bg-grey-custom transition-all duration-300"
                        :class="isActive ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'">
                    </div>

                    <div class="w-1.5 h-10 rounded-r-lg bg-green-strong-custom transition-all duration-300 absolute left-0"
                        :class="isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'">
                    </div>

                    <img :src="isActive ? icListSelected : icList" class="pl-5">

                    <span class="text-lg font-semibold font-inter transition-colors duration-300"
                        :class="isActive ? 'text-green-strong-custom' : 'text-black-custom group-hover:text-green-strong-custom'">
                        Temuan
                    </span>

                </div>
            </RouterLink>


            <!-- Personel -->
            <RouterLink to="/personel" v-slot="{ isActive }">
                <div class="group flex items-center gap-3 py-2 relative cursor-pointer">

                    <div class="w-1.5 h-10 rounded-r-lg bg-grey-custom transition-all duration-300"
                        :class="isActive ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'">
                    </div>

                    <div class="w-1.5 h-10 rounded-r-lg bg-green-strong-custom transition-all duration-300 absolute left-0"
                        :class="isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'">
                    </div>

                    <img :src="isActive ? icPersonSelected : icPerson" class="pl-5">

                    <span class="text-lg font-semibold font-inter transition-colors duration-300"
                        :class="isActive ? 'text-green-strong-custom' : 'text-black-custom group-hover:text-green-strong-custom'">
                        Personil
                    </span>

                </div>
            </RouterLink>


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
