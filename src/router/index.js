import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import BoardView from "../views/BoardView.vue";
import BoardPostView from "../views/BoardFormView.vue";
import BoardDetailView from "../views/BoardDetailView.vue";
import CustomView from "../views/CustomView.vue";
import UserView from "../views/UserView.vue";
import AlbumView from "../views/AlbumView.vue";
import AboutView from "../views/AboutView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/about",
  },
  {
    path: "/",
    name: "home",
    component: HomeView,
  },

  {
    path: "/board",
    name: "board",
    component: BoardView,
  },

  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
  {
    path: "/board/post",
    name: "boardPost",
    component: BoardPostView,
  },
  {
    path: "/board/post/:id",
    name: "boardPostId",
    component: BoardPostView,
  },
  {
    path: "/album",
    name: "album",
    component: AlbumView,
  },
  {
    path: "/board/:id",
    name: "boardDetail",
    component: BoardDetailView,
  },
  {
    path: "/user",
    name: "user",
    component: UserView,
  },
  {
    path: "/custom",
    name: "custom",
    component: CustomView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
