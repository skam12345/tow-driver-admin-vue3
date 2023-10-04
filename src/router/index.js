import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/login/Login.vue";
import Home from "../pages/home/home.vue";
import Company01 from "../pages/company/Company01.vue";
import Driver01 from "../pages/driver/Driver01.vue";
import Sale01 from "../pages/sale/Sale01.vue";
import Allot01 from "../pages/allot/Allot01.vue";
import Notice01 from "../pages/notice/Notice01.vue";
import Report01 from "../pages/report/Report01.vue";
import Admin01 from "../pages/admin/Admin01.vue";
import Violation01 from "../pages/violation/Violation01.vue";
import AutoAllot01 from "../pages/setting/AutoAllot01.vue";

const requireAuth = () => (to, from, next) => {
  if (localStorage.getItem("aiaAdminType") === "AAT001") {
    return next();
  } else {
    alert("잘못된 접근입니다. 권한을 확인 해주세요");
    next(history.go(-1));
  }
};

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login,
    },
    {
      path: "/home",
      name: "Home",
      component: Home,
      beforeEnter: requireAuth(),
    },
    {
      path: "/driver",
      name: "Driver",
      component: Driver01,
      beforeEnter: requireAuth(),
    },
    {
      path: "/company",
      name: "Company",
      component: Company01,
      beforeEnter: requireAuth(),
    },
    {
      path: "/sale",
      name: "Sale",
      component: Sale01,
      beforeEnter: requireAuth(),
    },
    {
      path: "/allot",
      name: "Allot",
      component: Allot01,
      beforeEnter: requireAuth(),
    },
    {
      path: "/notice",
      name: "Notice",
      component: Notice01,
      beforeEnter: requireAuth(),
    },
    {
      path: "/report",
      name: "Report",
      component: Report01,
      beforeEnter: requireAuth(),
    },
    {
      path: "/admin",
      name: "Admin",
      component: Admin01,
      beforeEnter: requireAuth(),
    },
    {
      path: "/violation",
      name: "Violation",
      component: Violation01,
    },
    {
      path: "/setting",
      name: "AutoAllot01",
      component: AutoAllot01,
    },
  ],
});

export default router;
