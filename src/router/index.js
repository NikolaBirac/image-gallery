import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layout/MainLayout'
import { projectAuth } from '@/firebase/config'

const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser

  if (!user) {
    next({ name: 'login' })
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: MainLayout,
    beforeEnter: requireAuth,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/HomeView.vue'),
      },
      {
        path: '/upload',
        name: 'upload',
        component: () => import('../views/UploadView.vue'),
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: "/:notFound(.*)",
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
