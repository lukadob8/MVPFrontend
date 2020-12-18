import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import SignupPage from "../views/Signup.vue";
import LoginPage from "../views/Login.vue";
import DiscoverPage from "../views/Discover.vue";
import ProfilePage from "../views/Profile.vue";
import EditPage from "../views/EditProfile.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "/",
    name: "signup-page",
    component: SignupPage
  },
  {
    path: "/login",
    name: "login-page",
    component: LoginPage
  },
  {
    path: "/discover",
    name: "discover-page",
    component: DiscoverPage
  },
  {
    path: "/profile",
    name: "profile-page",
    component: ProfilePage
  },
  {
    path: "/edit",
    name: "profile-edit",
    component: EditPage
  }
];

const router = new VueRouter({
  routes
});

export default router;
