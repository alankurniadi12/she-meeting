<template>
  <LoginModal @close="onCancel" />
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { watch } from 'vue'
import LoginModal from './LoginModal.vue'
import { useAuth } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const auth = useAuth()

const onCancel = () => {
  const redirect = route.query.redirect || '/'

  try {
    const resolved = router.resolve(redirect)
    const requiresAuth = resolved.matched && resolved.matched.some(r => r.meta && r.meta.requiresAuth)

    // if redirect target requires auth, don't navigate there (would redirect back to /login)
    if (requiresAuth) {
      router.replace('/').catch(() => { })
      return
    }

    // avoid pushing to the same route (no-op)
    const current = router.currentRoute.value && router.currentRoute.value.fullPath
    if (redirect === current) {
      router.replace('/').catch(() => { })
      return
    }

    router.push(redirect).catch(() => {
      router.replace('/').catch(() => { })
    })
  } catch (e) {
    router.replace('/').catch(() => { })
  }
}

watch(() => auth.isAuthenticated, (val) => {
  if (val) {
    const redirect = route.query.redirect || '/'
    router.push(redirect)
  }
})
</script>
