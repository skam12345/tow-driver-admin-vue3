<template>
  <nav>
    <ul v-if="!isAdmin" class="main_menu">
      <li
        class="product is-unselected"
        :class="{ is_current: selectedViolation }"
        @click="selected('violation')"
      >
        <router-link to="/violation">단속 대상 차량 관리</router-link>
      </li>
    </ul>
    <ul v-else class="main_menu">
      <li
        class="home is-unselected"
        :class="{ is_current: selectedHome }"
        @click="selected('home')"
      >
        <router-link to="/Home">HOME</router-link>
      </li>
      <li
        class="customer is-unselected"
        :class="{ is_current: selectedDriver }"
        @click="selected('driver')"
      >
        <router-link to="/driver">견인 기사 관리</router-link>
      </li>
      <li
        class="promotion is-unselected"
        :class="{ is_current: selectedCompany }"
        @click="selected('company')"
      >
        <router-link to="/company">견인 업체 관리</router-link>
      </li>
      <li
        class="sales is-unselected"
        :class="{ is_current: selectedSale }"
        @click="selected('sale')"
      >
        <router-link to="/sale">견인 수수료 정산</router-link>
      </li>
      <li
        class="product is-unselected"
        :class="{ is_current: selectedViolation }"
        @click="selected('violation')"
      >
        <router-link to="/violation">단속 대상 차량 관리</router-link>
      </li>
      <li
        class="equipment is-unselected"
        :class="{ is_current: selectedAllot }"
        @click="selected('allot')"
      >
        <router-link to="/allot">견인 차량 관리</router-link>
      </li>
      <li
        class="home is-unselected"
        :class="{ is_current: selectedNotice }"
        @click="selected('notice')"
      >
        <router-link to="/notice">공지 사항</router-link>
      </li>
      <li
        class="customer is-unselected"
        :class="{ is_current: selectedAdmin }"
        @click="selected('admin')"
      >
        <router-link to="/admin">관리자 관리</router-link>
      </li>
      <li
        class="basics is-unselected"
        :class="{ is_current: selectedSetting }"
        @click="selected('setting')"
      >
        <router-link to="/setting">자동배정 관리</router-link>
      </li>
    </ul>
    <!-- <div class="info" style="bottom: 2%; position: absolute">
      <p>(주)바이에너지</p>
      사업자등록번호 : 695-81-02203 <br />
      대표이사 : 이자현<br />서울특별시 강남구 강남대로 345, 11층 브이아이피호
    </div> -->
  </nav>
</template>

<script>
import { ref } from "vue";

export default {
  name: "leftMenu",
  components: {},
  props: {
    data: {
      type: String,
    },
  },
  setup(props) {
    const selectedHome = ref(false);
    const selectedDriver = ref(false);
    const selectedCompany = ref(false);
    const selectedSale = ref(false);
    const selectedAllot = ref(false);
    const selectedNotice = ref(false);
    const selectedReport = ref(false);
    const selectedAdmin = ref(false);
    const selectedViolation = ref(false);
    const selectedSetting = ref(false);
    const loginAllow = ref(false);
    const isAdmin = ref(false);
    const userStatus = localStorage.getItem("aiaAdminStatus");
    const userType = localStorage.getItem("aiaAdminType");
    const page = ref(props.data);
    // console.log(page.value);

    const selected = (data) => {
      // console.log(data);
      switch (data) {
        case "home":
          selectedHome.value = true;
          selectedDriver.value = false;
          selectedCompany.value = false;
          selectedSale.value = false;
          selectedAllot.value = false;
          selectedNotice.value = false;
          selectedReport.value = false;
          selectedAdmin.value = false;
          selectedViolation.value = false;
          selectedSetting.value = false;
          break;
        case "driver":
          selectedHome.value = false;
          selectedDriver.value = true;
          selectedCompany.value = false;
          selectedSale.value = false;
          selectedAllot.value = false;
          selectedNotice.value = false;
          selectedReport.value = false;
          selectedAdmin.value = false;
          selectedViolation.value = false;
          selectedSetting.value = false;
          break;
        case "company":
          selectedHome.value = false;
          selectedDriver.value = false;
          selectedCompany.value = true;
          selectedSale.value = false;
          selectedAllot.value = false;
          selectedNotice.value = false;
          selectedReport.value = false;
          selectedAdmin.value = false;
          selectedViolation.value = false;
          selectedSetting.value = false;
          break;
        case "sale":
          selectedHome.value = false;
          selectedDriver.value = false;
          selectedCompany.value = false;
          selectedSale.value = true;
          selectedAllot.value = false;
          selectedNotice.value = false;
          selectedReport.value = false;
          selectedAdmin.value = false;
          selectedViolation.value = false;
          selectedSetting.value = false;
          break;
        case "allot":
          selectedHome.value = false;
          selectedDriver.value = false;
          selectedCompany.value = false;
          selectedSale.value = false;
          selectedAllot.value = true;
          selectedNotice.value = false;
          selectedReport.value = false;
          selectedAdmin.value = false;
          selectedViolation.value = false;
          selectedSetting.value = false;
          break;
        case "notice":
          selectedHome.value = false;
          selectedDriver.value = false;
          selectedCompany.value = false;
          selectedSale.value = false;
          selectedAllot.value = false;
          selectedNotice.value = true;
          selectedReport.value = false;
          selectedAdmin.value = false;
          selectedViolation.value = false;
          selectedSetting.value = false;
          break;
        case "report":
          selectedHome.value = false;
          selectedDriver.value = false;
          selectedCompany.value = false;
          selectedSale.value = false;
          selectedAllot.value = false;
          selectedNotice.value = false;
          selectedReport.value = true;
          selectedAdmin.value = false;
          selectedViolation.value = false;
          selectedSetting.value = false;
          break;
        case "admin":
          selectedHome.value = false;
          selectedDriver.value = false;
          selectedCompany.value = false;
          selectedSale.value = false;
          selectedAllot.value = false;
          selectedNotice.value = false;
          selectedReport.value = false;
          selectedAdmin.value = true;
          selectedViolation.value = false;
          selectedSetting.value = false;
          break;
        case "violation":
          selectedHome.value = false;
          selectedDriver.value = false;
          selectedCompany.value = false;
          selectedSale.value = false;
          selectedAllot.value = false;
          selectedNotice.value = false;
          selectedReport.value = false;
          selectedAdmin.value = false;
          selectedViolation.value = true;
          selectedSetting.value = false;
          break;
        case "setting":
          selectedHome.value = false;
          selectedDriver.value = false;
          selectedCompany.value = false;
          selectedSale.value = false;
          selectedAllot.value = false;
          selectedNotice.value = false;
          selectedReport.value = false;
          selectedAdmin.value = false;
          selectedViolation.value = false;
          selectedSetting.value = true;
          break;
      }
    };

    const userTypeStatus = () => {
      // console.log(userType);
      if (userStatus === "AAS001") {
        loginAllow.value = true;
      }
      switch (userType) {
        case "AAT001":
          isAdmin.value = true;
          break;
        case "AAT002":
          isAdmin.value = false;
          selectedHome.value = false;
          selectedViolation.value = true;
          break;
        case "AAT003":
          isAdmin.value = false;
          break;
      }
      // console.log(isAdmin.value);
    };

    userTypeStatus();
    selected(page.value);
    return {
      selectedHome,
      selectedDriver,
      selectedCompany,
      selectedSale,
      selectedAllot,
      selectedNotice,
      selectedReport,
      selectedAdmin,
      selectedViolation,
      selectedSetting,
      userStatus,
      userType,
      loginAllow,
      isAdmin,
      selected,
      userTypeStatus,
      page,
    };
  },
};
</script>
<style scoped>
.is_current a {
  color: #fff !important;
}
.li.is-unselected a {
  color: #bebebe;
}
</style>
