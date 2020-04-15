import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const mode = 'history';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/charts',
    name: 'Charts',
    component: () => import(/* webpackChunkName: "charts" */ '../views/Charts.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "admin" */ '../views/Admin.vue'),
    meta: {
      requiresAuth: true,
      isAdmin: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: {
      guest: true,
    },
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import(/* webpackChunkName: "logout" */ '../views/Logout.vue'),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  routes,
  mode,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem('jwt') == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath },
      });
    } else {
      const user = JSON.parse(localStorage.getItem('user'));
      if (to.matched.some((record) => record.meta.isAdmin)) {
        if (user.role === 'admin') {
          next();
        } else {
          next({ name: 'Home' });
        }
      } else {
        next();
      }
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (localStorage.getItem('jwt') == null) {
      next();
    } else {
      next({ name: 'Home' });
    }
  } else {
    next();
  }
});

export default router;
