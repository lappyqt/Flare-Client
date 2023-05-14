import { createRouter, createWebHistory } from 'vue-router';

import Posts from './pages/Posts.vue';
import CreatePost from './pages/CreatePost.vue';
import Post from './pages/Post.vue';
import SignIn from './pages/SignIn.vue';
import SignUp from './pages/SignUp.vue';
import Confirm from './pages/Confirm.vue';

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        { 
            path: '/',
            component: Posts,
            children: [
                {
                    path: 'create',
                    component: CreatePost
                }
            ]
        },
        { 
            path: '/signin', 
            component: SignIn,
            meta: {
                hideNavbar: true
            }
        },
        {
            path: '/post/:id',
            component: Post
        },
        { 
            path: '/signup', 
            component: SignUp,
            meta: {
                hideNavbar: true
            }
        },
        { 
            path: '/confirm', 
            component: Confirm,
            meta: {
                hideNavbar: true
            }
        },
    ]
});