import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from './views/Dashboard.vue'
import Employee from './views/Employee.vue'
import Userpage from './views/Userpage.vue'
import Login from './views/Login.vue'
// import Modal from './views/Modal.vue'
// import SidebarMenu from './components/SidebarMenu.vue'
import EditCompany from './views/EditCompany.vue'
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
    path: '/editcompany',
    name: 'EditCompany',
    component: EditCompany,
  },
  {
    path: '/employee',
    name: 'Employee',
    component: Employee,
  },
  {
    path: '/employee/createemployee',
    name: 'CreateEmployee',
    component: () => import('./components/CreateEmployee.vue'),
  },
  {
    path: '/userpage',
    name: 'Userpage',
    component: Userpage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
