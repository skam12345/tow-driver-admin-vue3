<template>
  <div class="popup_cont">
    <div class="popup_contents_cont">
      <div class="close_btn" @click="close()"></div>
      <div class="popup_contents">
        <div class="popup_contents_top">견인 기사 등록</div>
        <div class="popup_contents_body">
          <div class="popup_contents_body_input_cont">
            <div class="popup_contents_body_input_id">
              <label
                for="driverId"
                style="position: inherit; margin-bottom: 2%; display: flex"
              >
                <div>ID (8글자 이상)</div>
                <div style="color: red">&nbsp;&nbsp;(필수)</div>
              </label>
              <input
                type="text"
                id="driverId"
                v-model="dmaMemId"
                placeholder="아이디 입력"
              />
            </div>
            <div class="popup_contents_body_input_id_check">
              <div
                class="btn_blue ML10 MR20 popup_contents_body_input_id_check_btn"
                @click="idDupicateCheck()"
              >
                중복확인
              </div>
            </div>
          </div>
          <div class="popup_contents_body_input_cont">
            <div class="popup_contents_body_input_pw">
              <label
                for="pwd"
                style="position: inherit; margin-bottom: 2%; display: flex"
              >
                <div>비밀번호 (8글자 이상)</div>
                <div style="color: red">&nbsp;&nbsp;(필수)</div>
              </label>
              <input
                type="password"
                id="pwd"
                v-model="dmaMemPwd"
                placeholder="비밀번호 입력"
                maxlength="15"
              />
            </div>
            <div class="popup_contents_body_input_pw">
              <label
                for="pwdCheck"
                style="position: inherit; margin-bottom: 2%; display: flex"
              >
                <div>비밀번호 확인</div>
                <div style="color: red">&nbsp;&nbsp;(필수)</div>
              </label>
              <input
                type="password"
                id="pwdCheck"
                v-model="dmaMemPwdCheck"
                placeholder="비밀번호 재입력"
                maxlength="15"
              />
            </div>
          </div>
          <div class="popup_contents_body_input_cont">
            <div class="popup_contents_body_input_pw">
              <label
                for="driverName"
                style="position: inherit; margin-bottom: 2%; display: flex"
              >
                <div>이름</div>
                <div style="color: red">&nbsp;&nbsp;(필수)</div>
              </label>
              <input
                type="text"
                id="driverName"
                v-model="dmaMemName"
                placeholder="기사 이름 입력"
              />
            </div>
            <div class="popup_contents_body_input_pw">
              <label
                for="phoneNo"
                style="position: inherit; margin-bottom: 2%; display: flex"
              >
                <div>연락처(- 없이 입력)</div>
                <div style="color: red">&nbsp;&nbsp;(필수)</div>
              </label>
              <input
                type="text"
                id="phoneNo"
                v-model="dmaMemPhone"
                placeholder="010xxxxxxxx"
                maxlength="11"
              />
            </div>
          </div>
          <div class="popup_contents_body_input_cont">
            <div class="popup_contents_body_input_pw">
              <label
                for="si"
                style="position: inherit; margin-bottom: 2%; display: flex"
              >
                <div>견인 지역 선택 (시)</div>
                <div style="color: red">&nbsp;&nbsp;(필수)</div>
              </label>
              <select
                name=""
                id="si"
                v-model="si.selectedData"
                @change="selectSi()"
                style="width: 95%"
              >
                <option disabled value="">전체</option>
                <option value="">전체</option>
                <option
                  v-for="(info, index) in si.datas"
                  :key="index"
                  :value="info.aciSidoName"
                >
                  {{ info.aciSidoName }}
                </option>
              </select>
            </div>
            <div class="popup_contents_body_input_pw">
              <label
                for="gu"
                style="position: inherit; margin-bottom: 2%; display: flex"
              >
                <div>견인 지역 선택 (구)</div>
                <div style="color: red">&nbsp;&nbsp;(필수)</div>
              </label>
              <select
                name=""
                id="gu"
                v-model="gu.selectedData"
                :disabled="!si.selected"
                @change="selectGu()"
                style="width: 95%"
              >
                <option disabled value="">전체</option>
                <option value="">전체</option>
                <option
                  v-for="(info, index) in gu.datas"
                  :key="index"
                  :value="info.aciRegionCode"
                >
                  {{ info.aciSigunguName }}
                </option>
              </select>
            </div>
          </div>
          <div class="popup_contents_body_input_cont">
            <div class="popup_contents_body_input_pw">
              <label
                for="company"
                style="position: inherit; margin-bottom: 2%; display: flex"
              >
                <div>업체 선택</div>
                <div style="color: red">&nbsp;&nbsp;(필수)</div>
              </label>
              <select
                name=""
                id="company"
                v-model="companys.selectedData"
                :disabled="!gu.selected"
                @change="selectCompany()"
                style="width: 95%"
              >
                <option disabled value="">전체</option>
                <option value="">전체</option>
                <option
                  v-for="(info, index) in companys.datas"
                  :key="index"
                  :value="info.tciCompanyNo"
                >
                  {{ info.tciCompanyName }}
                </option>
              </select>
            </div>
            <div class="popup_contents_body_input_pw">
              <label
                for="carNo"
                style="position: inherit; margin-bottom: 2%; display: flex"
              >
                <div>차량 번호</div>
                <div style="color: red">&nbsp;&nbsp;(필수)</div>
              </label>
              <input
                type="text"
                id="carNo"
                v-model="dmaCarNo"
                placeholder="차량번호 입력"
              />
            </div>
          </div>
        </div>
        <div class="popup_contents_bottom">
          <div class="btn_cont">
            <div class="bottom_btns_cancle" @click="close()">취소</div>
            <div class="bottom_btns_add" @click="registDriver()">등록</div>
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
    test: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const router = useRouter();

    const dmaMemId = ref("");
    const dmaMemPwd = ref("");
    const dmaMemPwdCheck = ref("");
    const dmaMemName = ref("");
    const dmaMemPhone = ref("");
    const dmaCarNo = ref("");
    const tciCompanyNo = ref("");
    const dmaAgreeService = ref("Y");
    const dmaAgreePrivacy = ref("Y");
    const dmaAgreeAlarm = ref("Y");
    const idDupicate = ref(false);

    // 지역 조회

    const si = ref({
      datas: [],
      selected: false,
      selectedData: "",
    });
    const gu = ref({
      datas: [],
      selected: false,
      selectedData: "",
    });
    const companys = ref({
      datas: [],
      selected: false,
      selectedData: "",
    });
    const getLocationSi = () => {
      try {
        axios
          .post("https://bie.autogram.co.kr/api/v1/admin_code/getSido", {})
          .then((res) => {
            console.log(res);
            si.value.datas = res.data;
          });
      } catch (err) {
        alert(err);
      }
    };
    const selectSi = () => {
      console.log("시 선택 후");
      gu.value.selectedData = "";
      try {
        axios
          .post("https://bie.autogram.co.kr/api/v1/admin_code/getSigungu", {
            aciSidoName: si.value.selectedData,
          })
          .then((res) => {
            gu.value.datas = res.data;
          });
        if (si.value.selectedData !== "") {
          si.value.selected = true;
        } else {
          si.value.selected = false;
          gu.value.selected = false;
          companys.value.selected = false;
        }
      } catch (err) {
        alert(err);
      }
    };
    const selectGu = () => {
      console.log("구 선택 할떄");
      console.log(gu.value.selectedData);
      try {
        axios
          .post("https://bie.autogram.co.kr/api/v1/company/get", {
            aciRegionCode: gu.value.selectedData.aciRegionCode,
          })
          .then((res) => {
            companys.value.datas = res.data;
            console.log(companys.value.datas);
          });
        if (gu.value.selectedData !== "") {
          gu.value.selected = true;
        } else {
          gu.value.selected = false;
        }
      } catch (err) {
        alert(err);
      }
    };
    const selectCompany = () => {
      try {
        if (companys.value.selectedData !== "") {
          companys.value.selected = true;
          tciCompanyNo.value = companys.value.selectedData;
        } else {
          companys.value.selected = false;
        }
      } catch (err) {
        alert(err);
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
    const idDupicateCheck = () => {
      try {
        const val = validateIdDup();
        if (val) {
          axios
            .post("https://bie.autogram.co.kr/api/v1/driver/get", {
              dmaMemId: dmaMemId.value,
            })
            .then((res) => {
              if (!checkHangle(dmaMemId.value)) {
                idDupicate.value = false;
                const notPhoneticSymbolExp = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
                alert("ID에 한글은 사용 할 수 없습니다.");
                // 한글이 빠른 시간에 여러개 들어오는 경우도 있으니,한글이 없을 때까지 삭제하고, 검사
                dmaMemId.value = dmaMemId.value.slice(0, -1);
                let condition = notPhoneticSymbolExp.test(dmaMemId.value);
                while (condition) {
                  dmaMemId.value = dmaMemId.value.slice(0, -1);
                  condition = notPhoneticSymbolExp.test(dmaMemId.value);
                }
                return false;
              }
              if (res.data.length < 1) {
                idDupicate.value = true;
                alert("사용 가능한 아이디 입니다.");
              } else {
                alert("중복 된 아이디 입니다.");
              }
            });
        }
      } catch (err) {
        alert(err);
      }
    };
    const validateIdDup = () => {
      if (dmaMemId.value.length < 8) {
        alert("ID는 8글자 이상으로 해주세요.");
        return false;
      }
      return true;
    };
    const validateJoin = () => {
      let strSpace = /\s/; // 공백체크
      if (
        strSpace.exec(dmaMemId.value) ||
        strSpace.exec(dmaMemPwd.value) ||
        strSpace.exec(dmaMemPwdCheck.value) ||
        strSpace.exec(dmaMemName.value) ||
        strSpace.exec(dmaMemPhone.value) ||
        strSpace.exec(tciCompanyNo.value) ||
        strSpace.exec(dmaCarNo.value)
      ) {
        alert(
          "해당 항목에는 공백을 사용할수 없습니다.\n\n공백은 자동적으로 제거 됩니다."
        );
        dmaMemId.value = dmaMemId.value.replaceAll(" ", ""); // 공백제거
        dmaMemPwd.value = dmaMemPwd.value.replaceAll(" ", ""); // 공백제거
        dmaMemPwdCheck.value = dmaMemPwdCheck.value.replaceAll(" ", ""); // 공백제거
        dmaMemName.value = dmaMemName.value.replaceAll(" ", ""); // 공백제거
        dmaMemPhone.value = dmaMemPhone.value.replaceAll(" ", ""); // 공백제거
        tciCompanyNo.value = tciCompanyNo.value.replaceAll(" ", ""); // 공백제거
        dmaCarNo.value = dmaCarNo.value.replaceAll(" ", ""); // 공백제거
        return false;
      }
      if (!checkHangle(dmaMemId.value)) {
        const notPhoneticSymbolExp = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
        alert("ID에 한글은 사용 할 수 없습니다.");
        // 한글이 빠른 시간에 여러개 들어오는 경우도 있으니,한글이 없을 때까지 삭제하고, 검사
        dmaMemId.value = dmaMemId.value.slice(0, -1);
        let condition = notPhoneticSymbolExp.test(dmaMemId.value);
        while (condition) {
          dmaMemId.value = dmaMemId.value.slice(0, -1);
          condition = notPhoneticSymbolExp.test(dmaMemId.value);
        }
        return false;
      }
      if (!checkHangle(dmaMemPwd.value)) {
        const notPhoneticSymbolExp = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
        alert("ID에 한글은 사용 할 수 없습니다.");
        // 한글이 빠른 시간에 여러개 들어오는 경우도 있으니,한글이 없을 때까지 삭제하고, 검사
        dmaMemPwd.value = dmaMemPwd.value.slice(0, -1);
        let condition = notPhoneticSymbolExp.test(dmaMemPwd.value);
        while (condition) {
          dmaMemPwd.value = dmaMemPwd.value.slice(0, -1);
          condition = notPhoneticSymbolExp.test(dmaMemPwd.value);
        }
        return false;
      }
      if (!checkHangle(dmaMemPwdCheck.value)) {
        const notPhoneticSymbolExp = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
        alert("ID에 한글은 사용 할 수 없습니다.");
        // 한글이 빠른 시간에 여러개 들어오는 경우도 있으니,한글이 없을 때까지 삭제하고, 검사
        dmaMemPwdCheck.value = dmaMemPwdCheck.value.slice(0, -1);
        let condition = notPhoneticSymbolExp.test(dmaMemPwdCheck.value);
        while (condition) {
          dmaMemPwdCheck.value = dmaMemPwdCheck.value.slice(0, -1);
          condition = notPhoneticSymbolExp.test(dmaMemPwdCheck.value);
        }
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
      if (dmaMemPwd.value.length < 1) {
        alert("비밀번호를 입력 해 주세요.");
        return false;
      }
      if (dmaMemPwdCheck.value.length < 1) {
        alert("비밀번호 확인을 입력 해 주세요.");
        return false;
      }
      if (dmaMemPwd.value !== dmaMemPwdCheck.value) {
        alert("비밀 번호가 일치하지 않습니다. 다시 입력 해 주세요");
        return false;
      }

      var pattern1 = /[0-9]/; // 숫자
      var pattern2 = /[a-zA-Z]/; // 문자
      var pattern3 = /[~!@#$%^&*()_+|<>?:{}-]/; // 특수문자
      if (
        !pattern1.test(dmaMemPwd.value) ||
        !pattern2.test(dmaMemPwd.value) ||
        dmaMemPwd.value.length < 8
      ) {
        alert("비밀번호는 8자리 이상 문자, 숫자로 구성해 주세요.");
        return false;
      }
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
    const close = () => {
      emit("closePopup");
    };

    const registDriver = () => {
      const val = validateJoin();
      if (!val) return;
      try {
        axios
          .post("https://bie.autogram.co.kr/api/v1/driver/add", {
            dmaMemId: dmaMemId.value,
            dmaMemPwd: dmaMemPwd.value,
            dmaMemPwdCheck: dmaMemPwdCheck.value,
            dmaMemName: dmaMemName.value,
            dmaMemPhone: dmaMemPhone.value,
            tciCompanyNo: tciCompanyNo.value,
            dmaCarNo: dmaCarNo.value,
            dmaAgreeService: dmaAgreeService.value,
            dmaAgreePrivacy: dmaAgreePrivacy.value,
            dmaAgreeAlarm: dmaAgreeAlarm.value,
          })
          .then((res) => {
            if (res.data.result === "SUCCESS") {
              alert("견인 기사 등록을 완료 했습니다.");
              router.go(router.currentRoute);
            }
          });
      } catch (err) {
        alert(err);
      }
    };

    getLocationSi();
    return {
      dmaMemId,
      dmaMemPwd,
      dmaMemPwdCheck,
      dmaMemName,
      dmaMemPhone,
      dmaCarNo,
      tciCompanyNo,
      dmaAgreeService,
      dmaAgreePrivacy,
      dmaAgreeAlarm,
      idDupicate,
      close,
      idDupicateCheck,
      validateIdDup,
      validateJoin,
      registDriver,
      checkHangle,
      // 지역 선택 함수, 변수
      getLocationSi,
      selectSi,
      selectGu,
      selectCompany,
      si,
      gu,
      companys,
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
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
.popup_contents_body_input_id input {
  width: 95%;
}
.popup_contents_body_input_id_check {
  width: 100%;
  height: 90%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
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
  height: 60%;
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

.popup_contents_body_select_sigu_cont {
  width: 100%;
  height: 100%;
  display: flex;
  /* flex-direction: column; */
  align-items: flex-start;
  justify-content: flex-start;
}
.popup_contents_body_select_sigu {
  display: flex;
  flex-direction: column;
  width: 47.5%;
  height: 100%;
}
</style>
