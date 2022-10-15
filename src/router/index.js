import { createRouter, createWebHashHistory } from 'vue-router';

const Home = () => import('@/views/Home.vue');
const JobResults = () =>
  import(/* webpackChuckName: "jobs"*/ '@/views/JobResults.vue');
const Job = () => import(/* webpackChuckName: "jobs"*/ '@/views/Job.vue');
const Teams = () => import('@/views/Teams.vue');

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/jobs',
    name: 'JobResults',
    component: JobResults,
  },
  {
    path: '/jobs/:id',
    name: 'Job',
    component: Job,
  },
  {
    path: '/teams',
    name: 'Teams',
    component: Teams,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return {
      top: 0,
      left: 0,
      behavior: 'smooth',
    };
  },
});

export default router;
