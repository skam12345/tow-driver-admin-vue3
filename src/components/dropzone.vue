<template>
  <div
    @dragenter.prevent="toggleActive"
    @dragleave.prevent="toggleActive"
    @dragover.prevent
    @drop.prevent="toggleActive"
    :class="{ 'active-dropzone': active }"
    class="dropzone"
    @change="drop"
  >
    <span style="font-size: 20px"
      >단속 대상 차량의 사진을 드래그 해서 올려 주세요</span
    >
    <span style="font-size: 20px">OR</span>
    <label
      for="dropzoneFile"
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        height: 25%;
        width: 25%;
        font-size: 18px;
        background-color: #41b883;
        transition: 0.3s ease all;
        color: #fff;
        position: relative;
        top: 0;
      "
      :class="{ 'active-dropzone-label': active }"
      >사진 선택 하기</label
    >
    <input
      ref="imgFileInput"
      id="dropzoneFile"
      type="file"
      accept="image/jpeg"
      multiple
      style="width: 100%; height: 100%; display: none"
      @change="changeFile"
    />
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const active = ref(false);
    const toggleActive = () => {
      active.value = !active.value;
    };
    return {
      active,
      toggleActive,
    };
  },
};
</script>

<style scoped>
.dropzone {
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 16px;
  border: 2px dashed #41b883;
  background-color: #fff;
  transition: 0.3s ease all;
}
.active-dropzone {
  color: #fff;
  border-color: #fff;
  background-color: #41b883;
}
.active-dropzone-label {
  background-color: #fff !important;
  color: #41b883 !important;
}
</style>
