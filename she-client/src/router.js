import { createWebHistory, createRouter } from "vue-router";

import Finding from "./views/Finding.vue";
import Personel from "./views/Personel.vue";
import Home from "./views/Home.vue";

const routes = [
    {
        path: '/',
        component: () => import('./views/Home.vue')
    },
    {
        path: '/finding',
        component: () => import('./views/Finding.vue')
    },
    {
        path: '/personel',
        component: () => import('./views/Personel.vue')
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})