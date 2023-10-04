<template>
  <div class="popup_cont">
    <div class="popup_contents_cont">
      <div class="close_btn" @click="close()"></div>
      <div class="popup_contents">
        <div class="popup_contents_top">견인 기사 상세</div>
        <div class="popup_contents_body">
          <div class="popup_contents_body_input_cont">
            <div class="popup_contents_body_input_pw">
              <label for="number" style="position: inherit; margin-bottom: 2%"
                >견인 기사 번호</label
              >
              <input
                type="text"
                id="number"
                v-model="dmaMemNo"
                placeholder="견인 기사 번호"
                disabled
              />
            </div>
            <div class="popup_contents_body_input_pw">
              <label for="id" style="position: inherit; margin-bottom: 2%"
                >견인 기사 ID</label
              >
              <input
                type="text"
                id="id"
                v-model="dmaMemId"
                placeholder="견인 기사 ID"
                disabled
              />
            </div>
          </div>
          <div class="popup_contents_body_input_cont">
            <div class="popup_contents_body_input_pw">
              <label for="number" style="position: inherit; margin-bottom: 2%"
                >업체 번호</label
              >
              <input
                type="text"
                id="number"
                v-model="tciCompanyNo"
                placeholder="업체 번호"
                maxlength="4"
                disabled
              />
            </div>
            <div class="popup_contents_body_input_pw">
              <label for="status" style="position: inherit; margin-bottom: 2%"
                >기사 상태</label
              >
              <select
                name=""
                id="status"
                v-model="dmaMemStatus"
                style="width: 95%"
                disabled
              >
                <option disabled value="">기사 상태 선택</option>
                <option value="">전체</option>
                <option value="DMS001">신청</option>
                <option value="DMS002">승인</option>
                <option value="DMS003">거절</option>
                <option value="DMS004">퇴사</option>
              </select>
            </div>
          </div>
          <div class="popup_contents_body_input_cont">
            <div class="popup_contents_body_input_pw">
              <label for="number" style="position: inherit; margin-bottom: 2%"
                >이름</label
              >
              <input
                type="text"
                id="number"
                v-model="dmaMemName"
                placeholder="이름"
                disabled
              />
            </div>
            <div class="popup_contents_body_input_pw">
              <label for="id" style="position: inherit; margin-bottom: 2%"
                >연락처</label
              >
              <input
                type="text"
                id="id"
                v-model="dmaMemPhone"
                placeholder="연락처"
                disabled
              />
            </div>
          </div>
          <div class="popup_contents_body_input_cont">
            <div class="popup_contents_body_input_pw">
              <label for="number" style="position: inherit; margin-bottom: 2%"
                >차량 번호</label
              >
              <input
                type="text"
                id="number"
                v-model="dmaCarNo"
                placeholder="견인 기사 번호"
                disabled
              />
            </div>
            <div class="popup_contents_body_btn">
              <!-- <div @click="pwdReset()" class="pwd_re_btn">비밀번호 초기화</div> -->
            </div>
          </div>
        </div>
        <div class="popup_contents_bottom">
          <div class="btn_cont">
            <div></div>
            <div @click="close()" class="bottom_btns_cancle">닫기</div>
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

    const dmaMemNo = ref(props.data.dmaMemNo);
    const dmaMemId = ref(props.data.dmaMemId);
    const dmaMemPwdRe = ref("");
    const dmaMemStatus = ref(props.data.dmaMemStatus);
    const dmaMemName = ref(props.data.dmaMemName);
    const dmaMemPhone = ref(props.data.dmaMemPhone);
    const dmaCarNo = ref(props.data.dmaCarNo);
    const tciCompanyNo = ref(props.data.tciCompanyNo);
    const dmaAgreeService = ref(true);
    const dmaAgreePrivacy = ref(true);
    const dmaAgreeAlarm = ref(true);

    // 팝업 닫기
    const close = () => {
      emit("closePopup");
    };
    // 견인 기사 정보 수정
    const modify = () => {
      try {
        const modified = confirm("정보를 수정 하시겠습니까?");
        if (modified) {
          axios
            .post("https://bie.autogram.co.kr/api/v1/driver/modify", {
              dmaMemId: dmaMemId.value,
              dmaMemNo: dmaMemNo.value,
              dmaMemStatus: dmaMemStatus.value,
              dmaMemName: dmaMemName.value,
              dmaMemPhone: dmaMemPhone.value,
              dmaCarNo: dmaCarNo.value,
              tciCompanyNo: tciCompanyNo.value,
            })
            .then((res) => {
              console.log(res);
              if (res.data.result === "SUCCESS") {
                alert("견인 기사 정보를 수정 했습니다.");
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
    // 비밀번호 초기화
    const pwdReset = () => {
      try {
        const modified = confirm("비밀번호를 초기화 하시겠습니까?");
        if (modified) {
          axios
            .post("https://bie.autogram.co.kr/api/v1/driver/modify", {
              dmaMemNo: dmaMemNo.value,
              dmaMemPwdRe: dmaMemPwdRe.value,
            })
            .then((res) => {
              console.log(res);
            });
        }
      } catch (err) {
        alert(err);
      }
    };
    return {
      dmaMemNo,
      dmaMemId,
      dmaMemPwdRe,
      dmaMemName,
      dmaMemPhone,
      dmaCarNo,
      dmaMemStatus,
      tciCompanyNo,
      dmaAgreeService,
      dmaAgreePrivacy,
      dmaAgreeAlarm,
      close,
      modify,
      pwdReset,
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
  height: 40%;
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
  height: 10%;
  font-size: 20px;
  border-bottom: 1px solid grey;
}
.popup_contents_body {
  width: 100%;
  height: 75%;
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
.popup_contents_body_btn {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 1%;
}
.popup_contents_body_input_pw input {
  width: 95%;
}
.btn_cont {
  display: flex;
  height: 60%;
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
.pwd_re_btn {
  width: 95%;
  height: 50%;
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
