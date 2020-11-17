import Vue from 'vue';
import Router from 'vue-router';
import Courses from './components/Courses.vue';
import Students from './components/Students.vue';

import HelloWorld from './components/HelloWorld.vue';

Vue.use(Router);

export default new Router({
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
      path: '/students',
      name: 'Students',
      component: Students,
    }
  ],
});
