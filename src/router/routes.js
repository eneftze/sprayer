
const routes = [
  {
    path: '/',
    component: () => import('layouts/LandingLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/identify',
    component: () => import('layouts/LandingLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Identify.vue') }
    ]
  },
  {
    path: '/locate',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      title: 'Nearby'
    },
    children: [
      { path: '', component: () => import('pages/LocateView.vue') }
    ]
  },
  {
    path: '/gyms/:id',
    props: true,
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      title: 'Gym :id'
    },
    children: [
      { path: '', component: () => import('pages/GymView.vue') }
    ]
  },
  {
    path: '/routes',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/RoutesList.vue') }
    ]
  },
  {
    path: '/route',
    props: route => ({
      id: route.query.id,
      wall_ids: route.query.wall_ids
    }),
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      title: 'Test'
    },
    children: [
      { path: '', component: () => import('pages/RouteView.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('layouts/LandingLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  })
}

export default routes
