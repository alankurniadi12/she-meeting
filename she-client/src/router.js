import { createWebHistory, createRouter } from "vue-router";
import { useAuth } from "./composables/auth";
const Home = () => import('./pages/Home.vue')
const Finding = () => import('./pages/Finding.vue')
const PersonelView = () => import('./pages/PersonelView.vue')
const PersonelDetailView = () => import('./pages/PersonelDetailView.vue')
const FindingDetail = () => import('./pages/FindingDetail.vue')
const Login = () => import('./pages/Login.vue')

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/login', name: 'Login', component: Login },
    { path: '/finding', name: 'Finding', component: Finding, meta: { requiresAuth: true } },
    { path: '/finding/:id', name: 'FindingDetail', component: FindingDetail, props: true, meta: { requiresAuth: true } },
    { path: '/personel', name: 'Personel', component: PersonelView, meta: { requiresAuth: true } },
    { path: '/personel/:id', name: 'PersonelDetail', component: PersonelDetailView, props: true, meta: { requiresAuth: true } },
    { path: '/:pathMatch(.*)*', redirect: '/' }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const auth = useAuth()

    if (to.meta && to.meta.requiresAuth && !auth.isAuthenticated) {
        next({ name: 'Login', query: { redirect: to.fullPath } })
        return
    }

    next()
})

export default router