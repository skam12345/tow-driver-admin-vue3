<template>
  <div class="popup_cont">
    <div class="popup_contents_cont">
      <div class="close_btn" @click="close()"></div>
      <div class="popup_contents">
        <div class="popup_contents_top">관리자 수정</div>
        <div class="popup_contents_body">
          <div class="popup_contents_body_input_cont">
            <div class="popup_contents_body_input_id">
              <label
                for="driverId"
                style="position: inherit; margin-bottom: 2%; display: flex"
                >ID (8글자 이상)</label
              >
              <input
                type="text"
                id="driverId"
                v-model="aiaAdminId"
                placeholder="아이디 입력"
                disabled
              />
            </div>
            <div class="popup_contents_body_input_id_check">
              <label
                for="status"
                style="position: inherit; margin-bottom: 2%; display: flex"
                ><div>관리자 상태</div>
                <div style="color: red">&nbsp;&nbsp;(필수)</div></label
              >
              <select
                name=""
                id="status"
                v-model="aiaAdminStatus"
                style="width: 95%"
              >
                <option disabled value="">관리자 상태</option>
                <option value="AAS001">정상</option>
                <option value="AAS002">퇴사</option>
              </select>
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
                :disabled="isAAS001"
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
                <option disabled value="">기사 상태 선택</option>
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
            <div class="bottom_btns_add" @click="modifyAdmin()">수정</div>
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

    const aiaAdminId = ref(props.data.aiaAdminId);
    const aiaAdminPwd = ref("");
    const aiaAdminPwdCheck = ref("");
    const aiaAdminName = ref(props.data.aiaAdminName);
    const aiaTelNo = ref(props.data.aiaTelNo);
    const aiaAdminType = ref(props.data.aiaAdminType);
    const aiaAdminStatus = ref(props.data.aiaAdminStatus);
    const aiaRegionCode = ref(props.data.aiaRegionCode);
    const idDupicate = ref(false);
    const isAAS001 = ref();
    console.log(props.data);
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
        console.log(aiaAdminStatus.value);
        if (aiaAdminStatus.value === "AAS001") {
          isAAS001.value = true;
          return;
        }
        await axios
          .post("https://bie.autogram.co.kr/api/v1/admin_code/getSido", {})
          .then((res) => {
            si.value.datas = res.data;
          });
        await axios
          .post("https://bie.autogram.co.kr/api/v1/admin_code/getRegion", {
            aciRegionCode: aiaRegionCode.value,
          })
          .then((res) => {
            console.log(res.data);
            si.value.selectedData = res.data[0].aciSidoName;
            selectSi();
            gu.value.selectedData = res.data[0].aciRegionCode;
            si.value.selected = true;
            gu.value.selected = true;
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
        console.log(gu.value.selectedData);
        aiaRegionCode.value = gu.value.selectedData;
        // getSearch();
        if (gu.value.selectedData !== "") {
          gu.value.selected = true;
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
        strSpace.exec(aiaAdminName.value) ||
        strSpace.exec(aiaTelNo.value) ||
        strSpace.exec(aiaRegionCode.value) ||
        strSpace.exec(aiaAdminType.value)
      ) {
        alert(
          "해당 항목에는 공백을 사용할수 없습니다.\n\n공백은 자동적으로 제거 됩니다."
        );
        aiaAdminId.value = aiaAdminId.value.replaceAll(" ", ""); // 공백제거
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

      // var pattern1 = /[0-9]/; // 숫자
      var pattern2 = /[a-zA-Z]/; // 문자
      var pattern3 = /[~!@#$%^&*()_+|<>?:{}-]/; // 특수문자
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

    const modifyAdmin = () => {
      const regist = confirm("관리자 정보를 수정 하시겠습니까?");
      if (!regist) return;
      try {
        const val = validateJoin();
        if (val) {
          axios
            .post("https://bie.autogram.co.kr/api/v1/admin/modify", {
              aiaAdminId: aiaAdminId.value,
              aiaAdminName: aiaAdminName.value,
              aiaTelNo: aiaTelNo.value,
              aiaRegionCode: aiaRegionCode.value,
              aiaAdminType: aiaAdminType.value,
            })
            .then((res) => {
              if (res.data.result === "SUCCESS") {
                alert("관리자 정보를 수정 했습니다.");
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
      aiaAdminStatus,
      aiaRegionCode,
      idDupicate,
      close,
      validateIdDup,
      validateJoin,
      modifyAdmin,
      checkHangle,
      si,
      gu,
      getLocationSi,
      selectSi,
      selectGu,
      isAAS001,
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
  flex-direction: column;
  align-items: flex-start;
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
