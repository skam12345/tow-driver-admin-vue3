<template>
  <div class="popup_cont">
    <div class="popup_contents_cont">
      <div class="close_btn" @click="close()"></div>
      <div class="popup_contents">
        <div class="popup_contents_top">관리자 등록</div>
        <div class="popup_contents_body">
          <div class="popup_contents_body_input_cont">
            <div class="popup_contents_body_input_id">
              <label
                for="adminId"
                style="position: inherit; margin-bottom: 2%; display: flex"
              >
                <div>ID (8글자 이상)</div>
                <div style="color: red">&nbsp;&nbsp;(필수)</div>
              </label>
              <input
                type="text"
                id="adminId"
                v-model="aiaAdminId"
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
                v-model="aiaAdminPwd"
                placeholder="영문, 숫자 포함 8글자 입력"
                maxlength="15"
              />
            </div>
            <div class="popup_contents_body_input_pw">
              <label
                for="pwdCheck"
                style="position: inherit; margin-bottom: 2%; display: flex"
              >
                <div>비밀번호 재입력</div>
                <div style="color: red">&nbsp;&nbsp;(필수)</div>
              </label>
              <input
                type="password"
                id="pwdCheck"
                v-model="aiaAdminPwdCheck"
                placeholder="비밀번호 재입력"
                maxlength="15"
              />
            </div>
          </div>
          <div class="popup_contents_body_input_cont">
            <div class="popup_contents_body_input_pw">
              <label
                for="adminName"
                style="position: inherit; margin-bottom: 2%; display: flex"
              >
                <div>이름</div>
                <div style="color: red">&nbsp;&nbsp;(필수)</div>
              </label>
              <input
                type="text"
                id="adminName"
                v-model="aiaAdminName"
                placeholder="관리자 이름 입력"
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
                v-model="aiaTelNo"
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
                <div>지역 선택 (시)</div>
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
                <div>지역 선택 (구)</div>
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
            <div class="popup_contents_body_input_pw"></div>
            <div class="popup_contents_body_input_pw">
              <label
                for="status"
                style="position: inherit; margin-bottom: 2%; display: flex"
              >
                <div>관리자 구분</div>
                <div style="color: red">&nbsp;&nbsp;(필수)</div>
              </label>
              <select
                name=""
                id="status"
                v-model="aiaAdminType"
                style="width: 95%"
              >
                <option disabled value="">관리자 구분</option>
                <option value="AAT001">전체관리자</option>
                <option value="AAT002">단속정보등록자</option>
                <option value="AAT003">견인보관소</option>
              </select>
            </div>
          </div>
        </div>
        <div class="popup_contents_bottom">
          <div class="btn_cont">
            <div class="bottom_btns_cancle" @click="close()">취소</div>
            <div class="bottom_btns_add" @click="registAdmin()">등록</div>
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

    const aiaAdminId = ref("");
    const aiaAdminPwd = ref("");
    const aiaAdminPwdCheck = ref("");
    const aiaAdminName = ref("");
    const aiaTelNo = ref("");
    const aiaAdminType = ref("");
    const aiaRegionCode = ref("");
    const dmaAgreeService = ref("Y");
    const dmaAgreePrivacy = ref("Y");
    const dmaAgreeAlarm = ref("Y");
    const idDupicate = ref(false);
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
    const getLocationSi = async () => {
      try {
        await axios
          .post("https://bie.autogram.co.kr/api/v1/admin_code/getSido", {})
          .then((res) => {
            si.value.datas = res.data;
          });
      } catch (err) {
        alert(err);
      } finally {
        selectGu();
      }
    };
    const selectSi = async () => {
      try {
        await axios
          .post("https://bie.autogram.co.kr/api/v1/admin_code/getSigungu", {
            aciSidoName: si.value.selectedData,
          })
          .then((res) => {
            console.log(res.data);
            gu.value.datas = res.data;
          });
        if (si.value.selectedData !== "") {
          si.value.selected = true;
        } else {
          si.value.selected = false;
          gu.value.selected = false;
        }
      } catch (err) {
        alert(err);
      }
    };
    const selectGu = async () => {
      try {
        if (gu.value.selectedData !== "") {
          gu.value.selected = true;
          aiaRegionCode.value = gu.value.selectedData;
        } else {
          gu.value.selected = false;
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
            .post("https://bie.autogram.co.kr/api/v1/admin/get", {
              aiaAdminId: aiaAdminId.value,
            })
            .then((res) => {
              if (!checkHangle(aiaAdminId.value)) {
                idDupicate.value = false;
                const notPhoneticSymbolExp = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
                alert("ID에 한글은 사용 할 수 없습니다.");
                // 한글이 빠른 시간에 여러개 들어오는 경우도 있으니,한글이 없을 때까지 삭제하고, 검사
                aiaAdminId.value = aiaAdminId.value.slice(0, -1);
                let condition = notPhoneticSymbolExp.test(aiaAdminId.value);
                while (condition) {
                  aiaAdminId.value = aiaAdminId.value.slice(0, -1);
                  condition = notPhoneticSymbolExp.test(aiaAdminId.value);
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
      if (aiaAdminId.value.length < 8) {
        alert("ID는 8글자 이상으로 해주세요.");
        return false;
      }
      return true;
    };
    const validateJoin = () => {
      let strSpace = /\s/; // 공백체크
      if (
        strSpace.exec(aiaAdminId.value) ||
        strSpace.exec(aiaAdminPwd.value) ||
        strSpace.exec(aiaAdminPwdCheck.value) ||
        strSpace.exec(aiaAdminName.value) ||
        strSpace.exec(aiaTelNo.value) ||
        strSpace.exec(aiaRegionCode.value) ||
        strSpace.exec(aiaAdminType.value)
      ) {
        alert(
          "해당 항목에는 공백을 사용할수 없습니다.\n\n공백은 자동적으로 제거 됩니다."
        );
        aiaAdminId.value = aiaAdminId.value.replaceAll(" ", ""); // 공백제거
        aiaAdminPwd.value = aiaAdminPwd.value.replaceAll(" ", ""); // 공백제거
        aiaAdminPwdCheck.value = aiaAdminPwdCheck.value.replaceAll(" ", ""); // 공백제거
        aiaAdminName.value = aiaAdminName.value.replaceAll(" ", ""); // 공백제거
        aiaTelNo.value = aiaTelNo.value.replaceAll(" ", ""); // 공백제거
        aiaRegionCode.value = aiaRegionCode.value.replaceAll(" ", ""); // 공백제거
        aiaAdminType.value = aiaAdminType.value.replaceAll(" ", ""); // 공백제거
        return false;
      }
      if (!checkHangle(aiaAdminId.value)) {
        const notPhoneticSymbolExp = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
        alert("ID에 한글은 사용 할 수 없습니다.");
        // 한글이 빠른 시간에 여러개 들어오는 경우도 있으니,한글이 없을 때까지 삭제하고, 검사
        aiaAdminId.value = aiaAdminId.value.slice(0, -1);
        let condition = notPhoneticSymbolExp.test(aiaAdminId.value);
        while (condition) {
          aiaAdminId.value = aiaAdminId.value.slice(0, -1);
          condition = notPhoneticSymbolExp.test(aiaAdminId.value);
        }
        return false;
      }
      if (!checkHangle(aiaAdminPwd.value)) {
        const notPhoneticSymbolExp = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
        alert("ID에 한글은 사용 할 수 없습니다.");
        // 한글이 빠른 시간에 여러개 들어오는 경우도 있으니,한글이 없을 때까지 삭제하고, 검사
        aiaAdminPwd.value = aiaAdminPwd.value.slice(0, -1);
        let condition = notPhoneticSymbolExp.test(aiaAdminPwd.value);
        while (condition) {
          aiaAdminPwd.value = aiaAdminPwd.value.slice(0, -1);
          condition = notPhoneticSymbolExp.test(aiaAdminPwd.value);
        }
        return false;
      }
      if (!checkHangle(aiaAdminPwdCheck.value)) {
        const notPhoneticSymbolExp = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
        alert("ID에 한글은 사용 할 수 없습니다.");
        // 한글이 빠른 시간에 여러개 들어오는 경우도 있으니,한글이 없을 때까지 삭제하고, 검사
        aiaAdminPwdCheck.value = aiaAdminPwdCheck.value.slice(0, -1);
        let condition = notPhoneticSymbolExp.test(aiaAdminPwdCheck.value);
        while (condition) {
          aiaAdminPwdCheck.value = aiaAdminPwdCheck.value.slice(0, -1);
          condition = notPhoneticSymbolExp.test(aiaAdminPwdCheck.value);
        }
        return false;
      }
      if (aiaAdminId.value.length < 8) {
        alert("ID는 8글자 이상으로 해주세요.");
        return false;
      }
      if (aiaAdminId.value.length < 1) {
        alert("ID를 입력 해 주세요.");
        return false;
      }
      if (aiaAdminPwd.value.length < 1) {
        alert("비밀번호를 입력 해 주세요.");
        return false;
      }
      if (aiaAdminPwdCheck.value.length < 1) {
        alert("비밀번호 확인을 입력 해 주세요.");
        return false;
      }
      if (aiaAdminPwd.value !== aiaAdminPwdCheck.value) {
        alert("비밀 번호가 일치하지 않습니다. 다시 입력 해 주세요");
        return false;
      }

      var pattern1 = /[0-9]/; // 숫자
      var pattern2 = /[a-zA-Z]/; // 문자
      var pattern3 = /[~!@#$%^&*()_+|<>?:{}-]/; // 특수문자
      if (
        !pattern1.test(aiaAdminPwd.value) ||
        !pattern2.test(aiaAdminPwd.value) ||
        aiaAdminPwd.value.length < 8
      ) {
        alert("비밀번호는 8자리 이상 문자, 숫자로 구성해 주세요.");
        return false;
      }
      if (aiaAdminName.value.length < 1) {
        alert("이름을 입력 해 주세요");
        return false;
      }
      if (aiaTelNo.value.length < 1) {
        alert("전화번호를 입력 해 주세요.");
        return false;
      }
      if (pattern2.test(aiaTelNo.value) || pattern3.test(aiaTelNo.value)) {
        alert("전화번호는 숫자만 입력 해 주세요.");
        return false;
      }
      if (pattern3.test(aiaTelNo.value)) {
        alert("전화번호에는 특수문자를 빼 주세요.");
        aiaTelNo.value = aiaTelNo.value.replaceAll(/-/g, "");
        return false;
      }
      if (
        pattern2.test(aiaRegionCode.value) ||
        pattern3.test(aiaRegionCode.value)
      ) {
        alert("행정동 코드는 숫자만 입력 해 주세요.");
        return false;
      }
      if (aiaRegionCode.value.length < 1) {
        alert("행정동 코드를 입력 해 주세요.");
        return false;
      }
      if (aiaAdminType.value.length < 1) {
        alert("관리자 구분을 선택 해 주세요.");
        return false;
      }
      return true;
    };
    const close = () => {
      emit("closePopup");
    };

    const registAdmin = () => {
      const regist = confirm("관리자를 등록 하시겠습니까?");
      if (!regist) return;
      try {
        const val = validateJoin();
        if (val) {
          axios
            .post("https://bie.autogram.co.kr/api/v1/admin/add", {
              aiaAdminId: aiaAdminId.value,
              aiaAdminPwd: aiaAdminPwd.value,
              aiaAdminName: aiaAdminName.value,
              aiaTelNo: aiaTelNo.value,
              aiaRegionCode: aiaRegionCode.value,
              aiaAdminType: aiaAdminType.value,
            })
            .then((res) => {
              if (res.data.result === "SUCCESS") {
                alert("관리자 등록을 완료 했습니다.");
                router.go(router.currentRoute);
              }
            });
        } else {
          console.log("오류가 발생했습니다..");
        }
      } catch (err) {
        alert(err);
      }
    };
    getLocationSi();
    return {
      aiaAdminId,
      aiaAdminPwd,
      aiaAdminPwdCheck,
      aiaAdminName,
      aiaTelNo,
      aiaAdminType,
      aiaRegionCode,
      dmaAgreeService,
      dmaAgreePrivacy,
      dmaAgreeAlarm,
      idDupicate,
      close,
      idDupicateCheck,
      validateIdDup,
      validateJoin,
      registAdmin,
      checkHangle,
      si,
      gu,
      getLocationSi,
      selectSi,
      selectGu,
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
</style>
