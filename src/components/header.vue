<template>
  <div>
    <header>
      <div class="header_wrap">
        <h1 class="logo">
          <a href="javascript:void(0)"><span>주차 견인 시스템</span></a>
        </h1>
        <div class="user">
          <p class="name">{{ name }}</p>
          <button type="button" class="btn_logout">
            <a @click="logout">로그아웃</a>
          </button>
        </div>
      </div>
    </header>
  </div>
</template>
<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "headerVue",
  setup() {
    const router = useRouter();
    const name = ref(localStorage.getItem("adminId") || "");
    const logout = () => {
      alert("로그아웃 되었습니다.");
      localStorage.clear();
      // localStorage.removeItem("adminId");
      // localStorage.removeItem("adminName");
      router.push({ name: "Login" });
    };
    return {
      name,
      logout,
    };
  },
};
</script>
