import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layout/MainLayout'
import UploadView from '../views/UploadView'
import HomeView from '../views/HomeView'
import LoginView from '../views/LoginView'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '/home',
        name: 'home',
        component: HomeView
      },
      {
        path: '/upload',
        name: 'upload',
        component: UploadView
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
