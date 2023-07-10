import { createRouter, createWebHistory } from 'vue-router';

import HomePage from './components/pages/HomePage.vue'
import CollectionPage from './components/pages/CollectionPage.vue'
import GenerateRecipePage from './components/pages/GenerateRecipePage.vue'

const router=createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/', redirect: '/home'
        },
        {
            path: '/home',
            components: { default : HomePage}
        },
        {
            path: '/generate', component: GenerateRecipePage
        },
        {
            path: '/collection', component: CollectionPage
        },
        {
            path: '/:notFound(.*)', component: HomePage
        },
    ]
})
export default router;