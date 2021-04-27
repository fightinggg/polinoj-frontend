export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
          {
            name: 'register',
            path: '/user/register',
            component: './user/Register',
          },
        ],
      }
    ],
  },
  {
    hideInMenu: true,
    path: '/account/center',
    name: 'center',
    component: './user/Center'
  },
  {
    hideInMenu: true,
    path: '/account/settings',
    name: 'settings',
    component: './user/Settings'
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './OJWelcome',
  },
  {
    path: "/problemList",
    name: "problemList",
    icon: "icon-book",
    component: "./ProblemList"
  },
  {
    path: '/problem/:problemId',
    hideInMenu: true,
    name: 'problem',
    component: './Problem',
  },
  {
    path: "/contextList",
    name: "contextList",
    icon: "icon-competition",
    component: "./ContextList"
  },
  {
    path: '/context/:contextId',
    hideInMenu: true,
    name: 'context',
    component: './Context',
  },
  {
    path: "/problemPull",
    name: "problemPull",
    icon: "icon-add",
    component: "./ProblemPull"
  },

  {
    path: "/status",
    name: "status",
    icon: "icon-statement",
    component: "./Status"
  },
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   icon: 'crown',
  //   access: 'canAdmin',
  //   component: './Admin',
  //   routes: [
  //     {
  //       path: '/admin/sub-page',
  //       name: 'sub-page',
  //       icon: 'smile',
  //       component: './Welcome',
  //     },
  //   ],
  // },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
