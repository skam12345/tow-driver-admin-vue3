<template>
  <div class="popup_cont">
    <div class="popup_contents_cont">
      <div class="close_btn" @click="close()"></div>
      <div style="width: 100%; height: 100%">
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
// import { ref } from "vue";
// import axios from "@/axios";

export default {
  props: {
    test: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    // const placeDataId = ref(props.test);
    const close = () => {
      emit("closePopup");
    };
    return {
      close,
    };
  },
};
</script>

<style scoped>
.popup_cont {
  width: 100%;
  height: 100%;
  background-color: #000000b8;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5000;
}
.popup_contents_cont {
  background-color: #fff;
  height: 60%;
  width: 60%;
  bottom: 30%;
  position: absolute;
  border: none;
  border-radius: 20px;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2% 5%;
}
.popup_contents_cont::-webkit-scrollbar {
  display: none;
}
.close_btn {
  max-width: 20px;
  position: absolute;
  width: 2.5%;
  height: 2.5%;
  /* background-color: black; */
  top: 1%;
  right: 1%;
  background-image: url(../assets/css/icon/close.png);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  cursor: pointer;
}
</style>
