import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from './views/Dashboard.vue'
import Forms from './views/Forms.vue'
import Tables from './views/Tables.vue'
import Userpage from './views/Userpage.vue'
import Login from './views/Login.vue'
// import Modal from './views/Modal.vue'
import Card from './views/Card.vue'
import Blank from './views/Blank.vue'
// import SidebarMenu from './components/SidebarMenu.vue'
import Edit from './views/Edit.vue'
// import UserModal from './components/UserModal.vue'


const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { layout: 'EmptyLayout' },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/edit',
    name: 'Edit',
    component: Edit,
  },
  {
    path: '/forms',
    name: 'Forms',
    component: Forms,
  },
  {
    path: '/cards',
    name: 'Cards',
    component: Card,
  },
  {
    path: '/tables',
    name: 'Tables',
    component: Tables,
  },
  {
    path: '/userpage',
    name: 'Userpage',
    component: Userpage,
  },
  // {
  //   path: '/user-modal',
  //   name: 'UserModal',
  //   component: UserModal,
  // },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
