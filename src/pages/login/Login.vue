<template>
  <div>
    <div id="layer-opens">
      <div id="wrapper">
        <div style="width: 100%" class="login"></div>
      </div>
      <div class="layer layer_login is-open" id="layer">
        <form>
          <div class="inner">
            <div class="top">
              <!-- 로고 -->
              <!-- <h1 class="login_logo">logo</h1> -->
              <p class="title">관리자 로그인</p>
            </div>
            <div class="contents">
              <div class="input_box id MB35">
                <label for="id">아이디</label>
                <input
                  type="text"
                  id="id"
                  v-model="adminId"
                  placeholder="아이디"
                />
                <!-- <span class="MT-25">*잘못된 아이디입니다.</span> -->
              </div>
              <div class="input_box password">
                <label for="password">비밀번호</label>
                <input
                  type="password"
                  autocomplete="on"
                  id="password"
                  v-model="adminPw"
                  placeholder="비밀번호"
                  v-on:keydown.enter.prevent="loginMethod"
                />
                <!-- <span class="MT-25">*잘못된 비밀번호입니다.</span> -->
              </div>
              <div class="btns PDT20">
                <a
                  @click="loginMethod"
                  class="Btn-blue-Large"
                  style="cursor: pointer"
                  >로그인</a
                >
              </div>
              <div class="btns PDT20"></div>
              <!-- <div class="contents_bottom">
                <div class="check_box" style="">
                  <input type="checkbox" id="auto_login" v-model="auto_login" />
                  <label for="auto_login">자동로그인</label>
                </div>
              </div> -->
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "@/axios";

export default {
  components: {},
  setup() {
    const adminId = ref("");
    const adminPw = ref("");
    const auto_login = ref(false);
    const router = useRouter();

    if (localStorage.getItem("auto_admin_no")) {
      localStorage.setItem("admin_no", localStorage.getItem("auto_admin_no"));
      localStorage.setItem("adminId", localStorage.getItem("auto_adminId"));
      router.push("/home");
    }
    const loginMethod = async () => {
      try {
        axios
          .post("https://bie.autogram.co.kr/api/v1/admin/login", {
            aiaAdminId: adminId.value,
            aiaAdminPwd: adminPw.value,
          })
          .then((res) => {
            console.log(res.data);
            if (res.data.result === "SUCCESS") {
              localStorage.setItem("adminName", res.data.content.aiaAdminName);
              localStorage.setItem("adminId", adminId.value);
              localStorage.setItem(
                "aiaAdminStatus",
                res.data.content.aiaAdminStatus
              );
              localStorage.setItem(
                "aiaAdminType",
                res.data.content.aiaAdminType
              );
              localStorage.setItem(
                "aiaRegionCode",
                res.data.content.aiaRegionCode
              );
              localStorage.setItem("aiaTelNo", res.data.content.aiaTelNo);
            } else {
              alert(
                "아이디(로그인 전용 아이디) 또는 비밀번호를 확인 해 주세요"
              );
            }
            if (res.data.content.aiaAdminType === "AAT001") {
              router.push("/home");
            } else if (res.data.content.aiaAdminType === "AAT002") {
              router.push("/violation");
            }
          });
      } catch (err) {
        console.log(err);
      }
    };
    return {
      adminId,
      adminPw,
      auto_login,
      loginMethod,
    };
  },
};
</script>
