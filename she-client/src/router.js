import { createWebHistory, createRouter } from "vue-router";

import Finding from "./views/Finding.vue";
import PersonelView from "./views/PersonelView.vue";
import Home from "./views/Home.vue";
import PersoneDetaillView from "./views/PersonelDetailView.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/finding',
        name: 'Finding',
        component: Finding
    },
    {
        path: '/personel',
        name: 'Personel',
        component: PersonelView
    },
    {
        path: '/personel/:id',
        name: 'PersonelDetail',
        component: PersoneDetaillView,
        props: true
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;