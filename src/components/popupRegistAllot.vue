<template>
  <div class="popup_cont">
    <div class="popup_contents_cont">
      <div class="close_btn" @click="close()"></div>
      <div class="popup_contents">
        <div class="popup_contents_top">차량 배정 등록</div>
        <div class="popup_contents_body" style="margin-top: 3%">
          <div class="popup_contents_body_input_cont">
            <div class="popup_contents_body_input_pw">
              <label
                for="vSeqNo"
                style="position: inherit; margin-bottom: 2%; display: flex"
              >
                <div>단속 번호</div>
                <div style="color: red">&nbsp;&nbsp;(필수)</div></label
              >
              <input
                type="text"
                id="vSeqNo"
                v-model="vdaSeqNo"
                placeholder="단속 번호"
                maxlength="3"
              />
            </div>
            <div class="popup_contents_body_input_pw">
              <label
                for="memNo"
                style="position: inherit; margin-bottom: 2%; display: flex"
              >
                <div>기사 번호</div>
                <div style="color: red">&nbsp;&nbsp;(필수)</div>
              </label>
              <input
                type="text"
                id="memNo"
                v-model="dmaMemNo"
                placeholder="기사 번호"
                maxlength="10"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="popup_contents_bottom">
        <div class="btn_cont">
          <div class="bottom_btns_add" @click="registAllot()">등록</div>
          <div class="bottom_btns_cancle" @click="close()">취소</div>
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
    console.log(props.data);
    const dmaMemNo = ref("");
    const vdaSeqNo = ref("");

    const close = () => {
      emit("closePopup");
    };

    const validation = () => {
      let strSpace = /\s/; // 공백체크
      if (strSpace.exec(dmaMemNo.value) || strSpace.exec(vdaSeqNo.value)) {
        alert(
          "해당 항목에는 공백을 사용할수 없습니다.\n\n공백은 자동적으로 제거 됩니다."
        );
        dmaMemNo.value = dmaMemNo.value.replaceAll(" ", ""); // 공백제거
        vdaSeqNo.value = vdaSeqNo.value.replaceAll(" ", "");
        return false;
      }
      if (dmaMemNo.value.length < 1 || vdaSeqNo.value.length < 1) {
        alert("필수 항목을 모두 입력 해 주세요.");
        return false;
      }
      return true;
    };
    const registAllot = () => {
      const modify = confirm("차량 배정 정보를 등록 하시겠습니까?");
      if (!modify) return;
      try {
        axios
          .post("https://bie.autogram.co.kr/api/v1/tow_allot/add", {
            vdaSeqNo: vdaSeqNo.value,
            dmaMemNo: dmaMemNo.value,
          })
          .then((res) => {
            if (res.data.result === "SUCCESS") {
              alert("차량 배정 정보를 등록했습니다.");
              router.go(router.currentRoute);
            }
          });
      } catch (err) {
        alert(err);
      }
    };
    return {
      dmaMemNo,
      vdaSeqNo,
      close,
      // idDupicateCheck,
      // validateIdDup,
      // validateJoin,
      registAllot,
      validation,
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
  height: 50%;
  width: 50%;
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
  height: 80%;
}
.popup_contents_top {
  width: 100%;
  height: 10%;
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
  height: 10%;
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
  flex-direction: column;
  align-items: flex-start;
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
  height: 100%;
  width: 85%;
  align-items: center;
  justify-content: space-between;
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
