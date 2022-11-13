import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import { ProjectLink } from './types/project/ProjectLink'

import About from './views/About/About.vue'
import Home from './views/Home/Home.vue'
import Hobbies from './views/Hobbies/Hobbies.vue'
import Project from './views/Project/Project.vue'
import Projects from './views/Projects/Projects.vue'

export const SiteRoutes: ProjectLink[] & RouteRecordRaw[] = [
  {
    path: '/',
    component: Home,
    title: 'Home',
  },
  {
    path: '/about',
    component: About,
    title: 'About & Contact',
  },
  {
    path: '/hobbies',
    component: Hobbies,
    title: 'Fun Stuff',
  },
  {
    path: '/portfolio',
    component: Projects,
    title: 'Portfolio',
  },
  {
    path: '/portfolio/:id',
    component: Project,
    title: 'Project',
  },
]

export default createRouter({
  history: createWebHashHistory(),
  routes: SiteRoutes as RouteRecordRaw[],
})