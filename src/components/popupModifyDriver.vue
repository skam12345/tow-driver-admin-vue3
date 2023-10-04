<template>
  <div class="popup_cont">
    <div class="popup_contents_cont">
      <div class="close_btn" @click="close()"></div>
      <div class="popup_contents">
        <div class="popup_contents_top">견인 기사 수정</div>
        <div class="popup_contents_body">
          <div class="popup_contents_body_input_cont">
            <!-- <div class="popup_contents_body_input_pw">
              <label
                for="number"
                style="position: inherit; margin-bottom: 2%; display: flex"
                >견인 기사 번호</label
              >
              <input
                type="text"
                id="number"
                v-model="dmaMemNo"
                placeholder="견인 기사 번호"
                disabled
              />
            </div> -->
            <div class="popup_contents_body_input_pw">
              <label
                for="id"
                style="position: inherit; margin-bottom: 2%; display: flex"
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
            <div class="popup_contents_body_input_pw">
              <label
                for="number"
                style="position: inherit; margin-bottom: 2%; display: flex"
              >
                <div>업체명</div>
                <div style="color: red">&nbsp;&nbsp;(필수)</div>
              </label>
              <input
                type="text"
                id="number"
                v-model="tciCompanyName"
                placeholder="업체 번호"
                maxlength="4"
                disabled
              />
            </div>
          </div>
          <div class="popup_contents_body_input_cont">
            <div class="popup_contents_body_input_pw">
              <label
                for="status"
                style="position: inherit; margin-bottom: 2%; display: flex"
              >
                <div>기사 상태</div>
                <div style="color: red">&nbsp;&nbsp;(필수)</div>
              </label>
              <select
                name=""
                id="status"
                v-model="dmaMemStatus"
                style="width: 95%"
                @change="changeMemStatus()"
              >
                <option disabled value="">기사 상태 선택</option>
                <option value="">전체</option>
                <option value="DMS001">신청</option>
                <option value="DMS002">승인</option>
                <option value="DMS003">거절</option>
                <option value="DMS004">퇴사</option>
              </select>
            </div>
            <div class="popup_contents_body_input_pw">
              <label
                for="number"
                style="position: inherit; margin-bottom: 2%; display: flex"
              >
                <div>이름</div>
                <div style="color: red">&nbsp;&nbsp;(필수)</div>
              </label>
              <input
                type="text"
                id="number"
                v-model="dmaMemName"
                placeholder="이름"
              />
            </div>
          </div>
          <div class="popup_contents_body_input_cont">
            <div class="popup_contents_body_input_pw">
              <label
                for="number"
                style="position: inherit; margin-bottom: 2%; display: flex"
              >
                <div>차량 번호</div>
                <div style="color: red">&nbsp;&nbsp;(필수)</div>
              </label>
              <input
                type="text"
                id="number"
                v-model="dmaCarNo"
                placeholder="견인 기사 번호"
              />
            </div>

            <div class="popup_contents_body_input_pw">
              <label
                for="id"
                style="position: inherit; margin-bottom: 2%; display: flex"
              >
                <div>연락처(- 없이 입력)</div>
                <div style="color: red">&nbsp;&nbsp;(필수)</div>
              </label>
              <input
                type="text"
                id="id"
                v-model="dmaMemPhone"
                placeholder="연락처"
              />
            </div>
          </div>
        </div>
        <div class="popup_contents_bottom">
          <div class="btn_cont">
            <div @click="close()" class="bottom_btns_cancle">취소</div>
            <div @click="modify()" class="bottom_btns_add">수정</div>
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
    const tciCompanyName = ref(props.data.tciCompanyName);
    const dmaApprovalDate = ref(props.data.dmaApprovalDate);
    const dmaAgreeService = ref(true);
    const dmaAgreePrivacy = ref(true);
    const dmaAgreeAlarm = ref(true);
    const todayilsi = ref();
    console.log(props.data);
    //
    const validation = () => {
      let strSpace = /\s/; // 공백체크
      if (
        strSpace.exec(dmaMemId.value) ||
        strSpace.exec(dmaMemName.value) ||
        strSpace.exec(dmaMemPhone.value) ||
        strSpace.exec(tciCompanyNo.value) ||
        strSpace.exec(dmaMemStatus.value) ||
        strSpace.exec(dmaCarNo.value)
      ) {
        alert(
          "해당 항목에는 공백을 사용할수 없습니다.\n\n공백은 자동적으로 제거 됩니다."
        );
        dmaMemId.value = dmaMemId.value.replaceAll(" ", ""); // 공백제거
        dmaMemName.value = dmaMemName.value.replaceAll(" ", ""); // 공백제거
        dmaMemPhone.value = dmaMemPhone.value.replaceAll(" ", ""); // 공백제거
        tciCompanyNo.value = tciCompanyNo.value.replaceAll(" ", ""); // 공백제거
        dmaCarNo.value = dmaCarNo.value.replaceAll(" ", ""); // 공백제거
        return false;
      }
      if (dmaMemId.value.length < 8) {
        alert("ID는 8글자 이상으로 해주세요.");
        return false;
      }
      if (dmaMemId.value.length < 1) {
        alert("ID를 입력 해 주세요.");
        return false;
      }
      // var pattern1 = /[0-9]/; // 숫자
      var pattern2 = /[a-zA-Z]/; // 문자
      var pattern3 = /[~!@#$%^&*()_+|<>?:{}-]/; // 특수문자

      if (dmaMemName.value.length < 1) {
        alert("이름을 입력 해 주세요");
        return false;
      }
      if (dmaMemPhone.value.length < 1) {
        alert("전화번호를 입력 해 주세요.");
        return false;
      }
      if (
        pattern2.test(dmaMemPhone.value) ||
        pattern3.test(dmaMemPhone.value)
      ) {
        alert("전화번호는 숫자만 입력 해 주세요.");
        return false;
      }
      if (pattern3.test(dmaMemPhone.value)) {
        alert("전화번호에는 특수문자를 빼 주세요.");
        dmaMemPhone.value = dmaMemPhone.value.replaceAll(/-/g, "");
        return false;
      }
      if (
        pattern2.test(tciCompanyNo.value) ||
        pattern3.test(tciCompanyNo.value)
      ) {
        alert("업체코드는 숫자만 입력 해 주세요.");
        return false;
      }
      if (tciCompanyNo.value.length < 1) {
        alert("업체코드을 입력 해 주세요.");
        return false;
      }
      if (dmaCarNo.value.length < 1) {
        alert("차량번호를 입력 해 주세요.");
        return false;
      }
      return true;
    };
    // 팝업 닫기
    const close = () => {
      emit("closePopup");
    };
    // 견인 기사 정보 수정
    const modify = () => {
      console.log(dmaApprovalDate.value);
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
              dmaApprovalDate: dmaApprovalDate.value,
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
    const changeMemStatus = () => {
      if (dmaMemStatus.value === "DMS002") {
        dmaApprovalDate.value = todayilsi.value;
      }
    };
    const set_today = () => {
      const d = new Date();
      console.log(d);
      const year = d.getFullYear(); // 년
      const month = ("0" + (d.getMonth() + 1)).slice(-2); // 월
      const day = ("0" + d.getDate()).slice(-2);
      const hours = ("0" + d.getHours()).slice(-2);
      const minutes = ("0" + d.getMinutes()).slice(-2);
      const seconds = ("0" + d.getSeconds()).slice(-2);
      todayilsi.value =
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds;
    };
    set_today();
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
      tciCompanyName,
      close,
      modify,
      pwdReset,
      validation,
      changeMemStatus,
      set_today,
      todayilsi,
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
  min-height: 50px;
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
  min-height: 50px;
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
  min-width: 20px;
  min-height: 20px;
  max-width: 20px;
  position: absolute;
  width: 2.5%;
  height: 2.5%;
  /* background-color: black; */
  top: 1.5%;
  right: 1.5%;
  background-image: url(../assets/css/icon/close.png);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  cursor: pointer;
}
</style>
