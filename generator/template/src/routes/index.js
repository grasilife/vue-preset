export const routes = [
  {
    component: () => import("@/views/hello/index.vue"),
    name: "hello",
    path: "/hello"
  },
  {
    path: "/",
    redirect: "/hello"
  }
];
