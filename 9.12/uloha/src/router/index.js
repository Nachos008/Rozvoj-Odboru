import { createRouter, createWebHistory } from 'vue-router'
import AllNotes from '../views/AllNotes.vue'
import AddNotes from '../views/AddNotes.vue'
import SubjectsView from '../views/SubjectsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AllNotes
    },
    {
      path: '/add',
      name: 'add',
      component: AddNotes
    },
    {
      path: '/subjects',
      name: 'subjects',
      component: SubjectsView
    }
  ],
})

export default router
