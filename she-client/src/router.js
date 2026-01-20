import { createWebHistory, createRouter } from "vue-router";
import { useAuth } from "./stores/auth";
const Home = () => import('./views/Home.vue')
const Finding = () => import('./views/Finding.vue')
const PersonelView = () => import('./views/PersonelView.vue')
const PersonelDetailView = () => import('./views/PersonelDetailView.vue')
const FindingDetail = () => import('./views/FindingDetail.vue')
const Login = () => import('./views/Login.vue')

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