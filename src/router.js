import Vue from 'vue';
import Router from 'vue-router';
import Ping from './components/Ping.vue';
//mport Predict from './components/Predict.vue';
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
      path: '/students',
      name: 'Students',
      component: Ping,
    }
  ],
});