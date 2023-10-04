<template>
  <div class="popup_cont">
    <div class="popup_contents_cont">
      <div class="close_btn" @click="close()"></div>
      <div class="popup_contents">
        <div class="popup_contents_top">수수료 정산 상세</div>
        <div class="popup_contents_body" style="margin-top: 3%">
          <div class="popup_contents_body_input_cont">
            <div class="popup_contents_body_input_pw">
              <label for="vSeqNo" style="position: inherit; margin-bottom: 2%"
                >업체명</label
              >
              <input
                type="text"
                id="vSeqNo"
                v-model="tciCompanyName"
                maxlength="20"
                disabled
              />
            </div>
            <div class="popup_contents_body_input_pw">
              <label for="vSeqNo" style="position: inherit; margin-bottom: 2%"
                >청구 상태</label
              >
              <input
                type="text"
                id="vSeqNo"
                v-model="tsdDBillingStatusText"
                placeholder="단속 번호"
                maxlength="20"
                disabled
              />
            </div>
          </div>
          <div class="popup_contents_body_input_cont">
            <div class="popup_contents_body_input_pw">
              <label for="tSeqNo" style="position: inherit; margin-bottom: 2%"
                >수수료</label
              >
              <input
                type="text"
                id="tSeqNo"
                v-model="tsdServiceFee"
                placeholder="보관소 번호"
                maxlength="20"
                disabled
              />
            </div>
            <div class="popup_contents_body_input_pw">
              <label for="memNo" style="position: inherit; margin-bottom: 2%"
                >입금액</label
              >
              <input
                type="text"
                id="memNo"
                v-model="tsdDepositFee"
                placeholder="기사 번호"
                maxlength="25"
                disabled
              />
            </div>
          </div>
          <div class="popup_contents_body_input_cont">
            <div class="popup_contents_body_input_pw">
              <label for="printYn" style="position: inherit; margin-bottom: 2%"
                >수수료 청구 일시</label
              >
              <input
                type="text"
                id="printYn"
                v-model="tsdBillingDate"
                maxlength="15"
                disabled
              />
            </div>
            <div class="popup_contents_body_input_pw">
              <label
                for="DepositDate"
                style="position: inherit; margin-bottom: 2%"
                >수수료 입금 일시</label
              >
              <input
                type="text"
                id="DepositDate"
                v-model="tsdDepositDate"
                disabled
              />
            </div>
          </div>
        </div>
      </div>
      <div class="popup_contents_bottom">
        <div class="btn_cont">
          <div class="bottom_btns_cancle" @click="close()">닫기</div>
          <div
            v-if="tsdBillingStatus === 'TBS001'"
            class="bottom_btns_sale_complete"
            @click="completeSale()"
          >
            정산 완료
          </div>
          <div v-else></div>
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
    const tsdSeqNo = ref(props.data.tsdSeqNo);
    const tadSeqNo = ref(props.data.tadSeqNo);
    const tsdBillingStatus = ref(props.data.tsdBillingStatus);
    const tsdBillingDate = ref(props.data.tsdBillingDate);
    const tsdDepositDate = ref(props.data.tsdDepositDate);
    const tsdServiceFee = ref(props.data.tsdServiceFee);
    const tsdDepositFee = ref(props.data.tsdDepositFee);
    const tciCompanyName = ref(props.data.tciCompanyName);
    const tsdDBillingStatusText = ref("");

    const getTsdBillingStatusText = () => {
      if (tsdBillingStatus.value === "TBS001") {
        tsdDBillingStatusText.value = "청구중";
      } else if (tsdBillingStatus.value === "TBS002") {
        tsdDBillingStatusText.value = "청구완료";
      } else if (tsdBillingStatus.value === "TBS003") {
        tsdDBillingStatusText.value = "승인거절";
      } else {
        tsdDBillingStatusText.value = "환불처리";
      }
    };
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

    const completeSale = () => {
      const check = confirm("해당 청구 내역을 완료 처리 하시겠습니까?");
      if (!check) {
        return;
      }
      try {
        axios
          .post("https://bie.autogram.co.kr/api/v1/tow_settlement/modify", {
            tsdSeqNo: tsdSeqNo.value,
            tsdBillingStatus: "TBS002",
          })
          .then((res) => {
            // locationSi.value = res.data;
            console.log(res);
            alert("해당 청구 내역을 완료 처리했습니다.");
            router.go(router.currentRoute);
          });
      } catch (err) {
        alert(err);
      }
    };
    getTsdBillingStatusText();
    return {
      tsdSeqNo,
      tsdBillingStatus,
      tsdBillingDate,
      tsdDepositDate,
      tsdServiceFee,
      tsdDepositFee,
      tsdDBillingStatusText,
      tciCompanyName,
      tadSeqNo,
      close,
      completeSale,
      checkHangle,
      getTsdBillingStatusText,
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
  height: 45%;
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
