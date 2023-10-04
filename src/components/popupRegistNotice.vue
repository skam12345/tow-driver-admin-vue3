<template>
  <div class="popup_cont">
    <div class="popup_contents_cont">
      <div class="close_btn" @click="close()"></div>
      <div class="popup_contents">
        <div class="popup_contents_top">공지사항 등록</div>
        <div class="popup_contents_body">
          <div>
            <form autocomplete="off" onSubmit="return false;">
              <div class="contents input MT40">
                <div class="input_box" style="margin-bottom: 4%; width: 97.5%">
                  <label for="title" style="display: flex">
                    <div>제목</div>
                    <div style="color: red">&nbsp;&nbsp;(필수)</div>
                  </label>
                  <input
                    type="text"
                    id="title"
                    placeholder="제목 입력"
                    v-model="ndaTitle"
                  />
                </div>
                <div
                  class="popup_contents_body_input_cont"
                  style="margin-bottom: 4%"
                >
                  <div class="popup_contents_body_input_pw">
                    <label
                      for="name"
                      style="
                        position: inherit;
                        margin-bottom: 2%;
                        display: flex;
                      "
                      >등록자</label
                    >
                    <input
                      type="text"
                      id="name"
                      v-model="aiaAdminId"
                      disabled
                    />
                  </div>
                  <div class="popup_contents_body_input_pw">
                    <label
                      for="name"
                      style="
                        position: inherit;
                        margin-bottom: 2%;
                        display: flex;
                      "
                    >
                      <div>공지 순번</div>
                      <div style="color: red">&nbsp;&nbsp;(필수)</div>
                    </label>
                    <input
                      type="text"
                      id="name"
                      v-model="ndaSortNo"
                      maxlength="3"
                    />
                  </div>
                </div>
                <div class="popup_contents_body_input_cont MB40">
                  <div class="popup_contents_body_input_pw">
                    <label
                      for="isYn"
                      style="
                        position: inherit;
                        margin-bottom: 2%;
                        display: flex;
                      "
                    >
                      <div>노출 여부</div>
                      <div style="color: red">&nbsp;&nbsp;(필수)</div>
                    </label>
                    <select
                      name=""
                      id="isYn"
                      v-model="ndaIsYn"
                      style="width: 95%"
                    >
                      <option disabled value="">노출 여부 선택</option>
                      <option value="Y">노출</option>
                      <option value="N">숨김</option>
                    </select>
                  </div>
                  <div class="popup_contents_body_input_pw">
                    <label
                      for="noticeType"
                      style="
                        position: inherit;
                        margin-bottom: 2%;
                        display: flex;
                      "
                    >
                      <div>공지 구분</div>
                      <div style="color: red">&nbsp;&nbsp;(필수)</div>
                    </label>
                    <select
                      name=""
                      id="noticeType"
                      v-model="ndaNoticeType"
                      style="width: 95%"
                    >
                      <option disabled value="">공지 구분 선택</option>
                      <option value="NNT001">일반 공지</option>
                      <option value="NNT002">긴급 공지</option>
                    </select>
                  </div>
                </div>
                <div class="textarea clear MB40" style="width: 97.5%">
                  <label for="content" style="margin-bottom: 2%; display: flex">
                    <div>내용 입력</div>
                    <div style="color: red">&nbsp;&nbsp;(필수)</div>
                  </label>
                  <textarea
                    name=""
                    id="content"
                    placeholder="내용 입력"
                    style="width: 100%"
                    v-model="ndaContents"
                  ></textarea>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="popup_contents_bottom">
          <div class="btn_cont">
            <div class="bottom_btns_cancle" @click="close()">취소</div>
            <div class="bottom_btns_add" @click="addNotice()">등록</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "@/axios";

import { useRouter } from "vue-router";

export default {
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  setup(props, { emit }) {
    const router = useRouter();
    const aiaAdminId = ref(localStorage.getItem("adminId"));
    const ndaTitle = ref(""); // 공지 제목
    const ndaContents = ref(""); // 공지 내용
    const ndaIsYn = ref(""); // 노출 여부
    const ndaNoticeType = ref(""); // 공지 구분
    const ndaSortNo = ref(1); // 공지 순번

    const close = () => {
      emit("closePopup");
    };

    const validate = () => {
      let strSpace = /\s/; // 공백체크
      if (
        strSpace.exec(aiaAdminId.value) ||
        strSpace.exec(ndaIsYn.value) ||
        strSpace.exec(ndaNoticeType.value) ||
        strSpace.exec(ndaSortNo.value)
      ) {
        alert(
          "해당 항목에는 공백을 사용할수 없습니다.\n\n공백은 자동적으로 제거 됩니다."
        );
        aiaAdminId.value = aiaAdminId.value.replaceAll(" ", ""); // 공백제거
        ndaIsYn.value = ndaIsYn.value.replaceAll(" ", ""); // 공백제거
        ndaNoticeType.value = ndaNoticeType.value.replaceAll(" ", ""); // 공백제거
        ndaSortNo.value = ndaSortNo.value.replaceAll(" ", ""); // 공백제거

        return false;
      }
      if (
        aiaAdminId.value.length < 1 ||
        ndaIsYn.value.length < 1 ||
        ndaNoticeType.value.length < 1 ||
        ndaSortNo.value.length < 1 ||
        ndaTitle.value.length < 1 ||
        ndaContents.value.length < 1
      ) {
        alert("필수 항목을 모두 입력 해 주세요.");
        return false;
      }
      return true;
    };

    const addNotice = () => {
      const modify = confirm("공지사항을 등록 하시겠습니까?");
      if (!modify) return;
      try {
        const val = validate();
        if (val) {
          axios
            .post("https://bie.autogram.co.kr/api/v1/notice/add", {
              aiaAdminId: aiaAdminId.value,
              ndaTitle: ndaTitle.value,
              ndaContents: ndaContents.value,
              ndaIsYn: ndaIsYn.value,
              ndaNoticeType: ndaNoticeType.value,
              ndaSortNo: ndaSortNo.value,
            })
            .then((res) => {
              console.log(res);
              if (res.data.result === "SUCCESS") {
                alert("공지사항을 등록 했습니다.");
                router.go(router.currentRoute);
              } else {
                alert("오류가 발생 했습니다. 관리자에게 문의 해 주세요.");
              }
            });
        }
      } catch (err) {
        alert(err);
      }
    };
    return {
      aiaAdminId,
      ndaContents,
      ndaIsYn,
      ndaNoticeType,
      ndaTitle,
      ndaSortNo,
      close,
      addNotice,
      validate,
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
  height: 70%;
  width: 40%;
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
  padding: 2% 2%;
}
.popup_contents_cont::-webkit-scrollbar {
  display: none;
}
.popup_contents {
  width: 100%;
  height: 100%;
}
.popup_contents_top {
  width: 100%;
  height: 8%;
  font-size: 20px;
  border-bottom: 1px solid grey;
}
.popup_contents_body {
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
}
.popup_contents_bottom {
  width: 100%;
  height: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.popup_contents_body_input_cont {
  width: 100%;
  height: 25%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.popup_contents_body_input_id {
  width: 70%;
  height: 90%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.popup_contents_body_input_id input {
  width: 90%;
}
.popup_contents_body_input_id_check {
  width: 30%;
  height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
}
.popup_contents_body_input_id_check_btn {
  display: flex;
  align-items: center;
  justify-content: center;
}
.popup_contents_body_input_pw {
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
.popup_contents_body_input_pw input {
  width: 95%;
}
.btn_cont {
  display: flex;
  height: 50%;
  width: 85%;
  align-items: center;
  justify-content: space-between;
}
.bottom_btns_add {
  width: 45%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background-color: #2d5188;
  color: #fff;
  border: 1px solid #2d5188;
  transition: 0.2s;
}
.bottom_btns_cancle {
  width: 45%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #b8b8b8e1;
  transition: 0.2s;
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
