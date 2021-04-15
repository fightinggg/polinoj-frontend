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
        ],
      },
    ],
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
    icon: "smile",
    component: "./ProblemList"
  },
  {
    path: "/problemPull",
    name: "problemPull",
    icon: "smile",
    component: "./ProblemPull"
  },
  {
    path: '/problem/:problemId',
    hideInMenu:true,
    name: 'problem',
    component: './Problem',
  },
  {
    path: "/status",
    name: "status",
    icon: "smile",
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
  // {
  //   name: 'list.table-list',
  //   icon: 'table',
  //   path: '/list',
  //   component: './TableList',
  // },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
