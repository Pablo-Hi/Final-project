import { createRouter, createWebHistory } from "vue-router";
import Auth from "../views/Auth.vue";
import Home from "../views/Home.vue";
import Account from "../views/Account.vue"
import SignIn from "../components/SignIn.vue";
import SignUp from "../components/SignUp.vue";
import EditProfile from "../views/EditProfile.vue";
import Mystery from "../views/Mystery.vue"

const routes = [
  {
    path: "/auth",
    component: Auth,
    children: [
      { path: "login", component: SignIn },
      { path: "signup", component: SignUp },
    ],
  },
  { path: "/", component: Home },
  { path: "/mystery", component: Mystery },
  { path: "/account", component: Account },
  { path: "/edit", component: EditProfile }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
