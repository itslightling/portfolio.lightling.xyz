import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import { ProjectLink } from './types/project/ProjectLink'

import Home from './views/Home/Home.vue'

export const SiteRoutes: ProjectLink[] & RouteRecordRaw[] = [
  {
    path: '/',
    component: Home,
    title: 'Home',
  },
  {
    path: '/about',
    component: Home,
    title: 'About & Contact',
  },
  {
    path: '/hobbies',
    component: Home,
    title: 'Fun Stuff',
  },
  {
    path: '/portfolio',
    component: Home,
    title: 'Portfolio',
  },
  {
    path: '/portfolio/:id',
    component: Home,
    title: 'Project',
  },
]

export default createRouter({
  history: createWebHashHistory(),
  routes: SiteRoutes as RouteRecordRaw[],
})