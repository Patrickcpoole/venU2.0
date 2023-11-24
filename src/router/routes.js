const routes = [
  {
    path: '/',

    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '', component: () => import('pages/Login.vue'),
        name: 'login'
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
    path: '/artists',

    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '', component: () => import('pages/Artists.vue'),
        name: 'Artists',
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
        name: 'Underground'
      }
    ]
  },
  {
    path: '/maps',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '', component: () => import('pages/Maps.vue'),
        name: 'Maps'
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
        props: true
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
