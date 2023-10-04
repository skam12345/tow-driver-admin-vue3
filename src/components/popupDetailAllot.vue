<template>
  <div class="popup_cont">
    <div class="popup_contents_cont">
      <div class="close_btn" @click="close()"></div>
      <div class="popup_contents">
        <div class="popup_contents_top">차량 배정 수정</div>
        <div class="popup_contents_body" style="margin-top: 3%">
          <div class="popup_contents_body_input_cont">
            <div class="popup_contents_body_input_pw">
              <label for="seqNo" style="position: inherit; margin-bottom: 2%"
                >배정 번호</label
              >
              <input
                type="text"
                id="seqNo"
                v-model="tadSeqNo"
                placeholder="배정 번호"
                maxlength="10"
                disabled
              />
            </div>
            <div class="popup_contents_body_input_pw">
              <label for="vSeqNo" style="position: inherit; margin-bottom: 2%"
                >단속 번호</label
              >
              <input
                type="text"
                id="vSeqNo"
                v-model="vdaSeqNo"
                placeholder="단속 번호"
                maxlength="20"
                disabled
              />
            </div>
          </div>
          <div class="popup_contents_body_input_cont">
            <div class="popup_contents_body_input_pw">
              <label for="tSeqNo" style="position: inherit; margin-bottom: 2%"
                >보관소 번호</label
              >
              <input
                type="text"
                id="tSeqNo"
                v-model="tsiSeqNo"
                placeholder="보관소 번호"
                maxlength="20"
                disabled
              />
            </div>
            <div class="popup_contents_body_input_pw">
              <label for="memNo" style="position: inherit; margin-bottom: 2%"
                >기사 번호</label
              >
              <input
                type="text"
                id="memNo"
                v-model="dmaMemNo"
                placeholder="기사 번호"
                maxlength="25"
                disabled
              />
            </div>
          </div>
          <div class="popup_contents_body_input_cont">
            <div class="popup_contents_body_input_pw">
              <label for="printYn" style="position: inherit; margin-bottom: 2%"
                >안내장 출력 여부</label
              >
              <input
                type="text"
                id="printYn"
                v-model="tadPrintYn"
                placeholder="안내장 출력 여부"
                maxlength="15"
                disabled
              />
            </div>
            <div class="popup_contents_body_input_pw">
              <label
                for="towStatus"
                style="position: inherit; margin-bottom: 2%"
                >견인 처리 상태</label
              >
              <select
                name=""
                id="status"
                v-model="tadTowStatus"
                style="width: 95%"
                disabled
              >
                <option disabled value="">견인 처리 상태</option>
                <option value="TTA001">견인배정</option>
                <option value="TTA002">견인중</option>
                <option value="TTA003">차주인계</option>
                <option value="TTA004">견인완료</option>
              </select>
            </div>
          </div>
          <div class="popup_contents_body_input_cont">
            <div class="popup_contents_body_input_pw">
              <label for="towDate" style="position: inherit; margin-bottom: 2%"
                >견인 일시</label
              >
              <input
                type="text"
                id="towDate"
                v-model="tadTowDate"
                placeholder="견인 일시"
                maxlength="15"
                disabled
              />
            </div>
            <div class="popup_contents_body_input_pw"></div>
          </div>
        </div>
      </div>
      <div class="popup_contents_bottom">
        <div class="btn_cont">
          <div></div>
          <div class="bottom_btns_cancle" @click="close()">닫기</div>
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
    const dmaMemNo = ref(props.data.dmaMemNo);
    const tadPrintYn = ref(props.data.tadPrintYn);
    const tadSeqNo = ref(props.data.tadSeqNo);
    const tadTowDate = ref(props.data.tadTowDate);
    const tadTowStatus = ref(props.data.tadTowStatus);
    const tsiSeqNo = ref(props.data.tsiSeqNo);
    const vdaSeqNo = ref(props.data.vdaSeqNo);

    const checkHangle = (text) => {
      // 한글 테스트 정규식
      const notPhoneticSymbolExp = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
      if (!notPhoneticSymbolExp.test(text)) {
        return true;
      } else {
        return false;
      }
    };
    const close = () => {
      emit("closePopup");
    };

    const registDriver = () => {
      const modify = confirm("견인 업체 정보를 수정 하시겠습니까?");
      if (!modify) return;
      try {
        axios
          .post("https://bie.autogram.co.kr/api/v1/company/modify", {})
          .then((res) => {
            console.log(res);
            if (res.data.result === "SUCCESS") {
              alert("견인 업체 수정을 완료 했습니다.");
              router.go(router.currentRoute);
            }
          });
      } catch (err) {
        alert(err);
      }
    };
    return {
      dmaMemNo,
      tadPrintYn,
      tadSeqNo,
      tadTowDate,
      tadTowStatus,
      tsiSeqNo,
      vdaSeqNo,
      close,
      // idDupicateCheck,
      // validateIdDup,
      // validateJoin,
      registDriver,
      checkHangle,
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
