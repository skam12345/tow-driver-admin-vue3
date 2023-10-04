<template>
  <div id="app">
    <headerVue v-if="$route.name !== 'Login'" />
    <router-view />
    <!-- <leftMenu v-if="$route.name !== 'Login'" /> -->
  </div>
</template>

<script>
// import leftMenu from "@/components/leftMenu.vue";
// import leftMenu2 from "@/components/leftMenu2.vue";
import headerVue from "@/components/header.vue";
export default {
  components: {
    // leftMenu,
    headerVue,
  },
  setup() {
    return {};
  },
};
</script>

<style></style>
