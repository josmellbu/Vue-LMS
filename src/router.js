import Vue from 'vue';
import Router from 'vue-router';
import CoursesPost from './components/CoursesPost.vue';
import Students from './components/Students.vue';
import Courses from './components/Courses.vue';
import StudentsPost from './components/StudentsPost.vue';
import Login from './components/Login.vue';
import Logout from './components/Logout.vue';

import HelloWorld from './components/HelloWorld.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/courses',
      name: 'Courses',
      component: Courses,
    },
    {
      path: '/courses/new',
      name: 'CoursesPost',
      component: CoursesPost,
    },
    {
      path: '/courses/new/:id',
      name: 'CoursesPost',
      component: CoursesPost,
    },
    {
      path: '/students',
      name: 'Students',
      component: Students,
    },
    {
      path: '/students/new',
      name: 'StudentsPost',
      component: StudentsPost,
    },
    {
      path: '/students/new/:id',
      name: 'StudentsPost',
      component: StudentsPost,
    },
    {
      path: '/login',
      name: 'LoginForm',
      component: Login
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
  ],
});

let whiteRoutes = [
  "LoginForm",
  "HelloWorld"
]

router.beforeEach((to, from, next) => {
  console.log(`${from.path} to ${to.path}`);
  let isAuthenticated = false;
  if (localStorage.getItem('user') != null) {
    isAuthenticated = true;
  }
  // if (to.name !== 'LoginForm' && to.name !== 'HelloWorld' && to.name !== 'Ping' && !isAuthenticated) {
  if (!whiteRoutes.includes(to.name) && !isAuthenticated) {
    next({ name: 'LoginForm' });
  } else {
    next();
  }
});
//https://www.digitalocean.com/community/tutorials/vuejs-advanced-vue-routing
export default router