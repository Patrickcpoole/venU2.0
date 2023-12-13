const routes = [
  {
    path: '/',

    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '', component: () => import('pages/Login.vue'),
        name: 'Login'
      }
    ]
  },
  {
    path: '/signup',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'Signup',
        path: '', component: () => import('pages/SignUp.vue')
      }

    ]
  },
  {
    path: '/venues',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Venues',
        meta: {
          requiresAuth: true,
        },
        component: () => import('pages/Venues.vue')
      }
    ]
  },
  {
    path: '/concerts',

    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '', component: () => import('pages/Concerts.vue'),
        name: 'Concerts',
        meta: {requiresAuth: true}
      }
    ]
  },
  {
    path: '/underground',

    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '', component: () => import('pages/Underground.vue'),
        name: 'Underground',
         meta: {
          requiresAuth: true,
        },
      }
    ]
  },
  {
    path: '/maps',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '', component: () => import('pages/Maps.vue'),
        name: 'Maps',
         meta: {
          requiresAuth: true,
        },
      }
    ]
  },
  {
    path: '/profile',

    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '', component: () => import('pages/Profile.vue'),
        name: 'Profile',
        props: true,
         meta: {
          requiresAuth: true,
        },
      }
    ]
  },
  // {
  //   path: '/my-shows',
  //
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [
  //     {
  //       path: '', component: () => import('components/MyShows.vue'),
  //       name: 'My Shows',
  //       props: true
  //     }
  //   ]
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
