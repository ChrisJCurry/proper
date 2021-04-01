import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard } from '@bcwdev/auth0provider-client'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: loadPage('LandingPage')
  },
  {
    path: '/rentals',
    name: 'RentalsPage',
    component: loadPage('RentalsPage'),
    beforeEnter: authGuard
  },
  {
    path: '/task',
    name: 'TasksPage',
    component: loadPage('TasksPage'),
    beforeEnter: authGuard
  },
  {
    path: '/newrental',
    name: 'NewRentalPage',
    component: loadPage('NewRentalPage'),
    beforeEnter: authGuard
  },
  {
    path: '/rentals/:id',
    name: 'RentalDetailsPage',
    component: loadPage('RentalDetailsPage'),
    beforeEnter: authGuard
  },
  {
    path: '/about',
    name: 'About',
    component: loadPage('AboutPage'),
    beforeEnter: authGuard
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  },
  {
    path: '/notes',
    name: 'Notes',
    component: loadPage('RentalDetailsPage')
  },
  {
    path: '/messages',
    name: 'MessagesPage',
    component: loadPage('MessagesPage'),
    beforeEnter: authGuard
  }
]

const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})

export default router
