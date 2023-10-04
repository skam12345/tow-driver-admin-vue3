<template>
  <div class="popup_cont">
    <div class="popup_contents_cont">
      <div class="close_btn" @click="close()"></div>
      <div class="popup_contents">
        <div class="popup_contents_top">단속 대상 차량 상세 보기</div>
        <div class="popup_contents_body">
          <div class="popup_contents_body_input_cont">
            <div class="popup_contents_body_input_pw">
              <label for="SeqNo" style="position: inherit; margin-bottom: 2%"
                >주차 위반 단속 번호</label
              >
              <input
                type="text"
                id="SeqNo"
                v-model="vdaSeqNo"
                placeholder="주차위반단속순번키"
                disabled
              />
            </div>
            <div class="popup_contents_body_input_pw">
              <label for="CarNo" style="position: inherit; margin-bottom: 2%"
                >단속 차량 번호 (필수)</label
              >
              <input
                type="text"
                id="CarNo"
                v-model="vdaCarNo"
                placeholder="단속차량번호"
                maxlength="11"
                disabled
              />
            </div>
          </div>
          <div class="popup_contents_body_input_cont">
            <div class="popup_contents_body_input_pw">
              <label
                for="ViolationArea"
                style="position: inherit; margin-bottom: 2%"
                >단속차량위치</label
              >
              <input
                type="text"
                id="ViolationArea"
                v-model="vdaViolationArea"
                placeholder="단속차량위치"
                maxlength="20"
                disabled
              />
            </div>
            <div class="popup_contents_body_input_pw">
              <label
                for="ViolationLocation"
                style="position: inherit; margin-bottom: 2%"
                >단속차량장소</label
              >
              <input
                type="text"
                id="ViolationLocation"
                v-model="vdaViolationLocation"
                placeholder="상세 주소 입력"
                maxlength="25"
                disabled
              />
            </div>
          </div>
          <div class="popup_contents_body_input_cont">
            <div class="popup_contents_body_input_pw">
              <label
                for="ViolationDate"
                style="position: inherit; margin-bottom: 2%"
                >위반일자</label
              >
              <input
                type="text"
                id="ViolationDate"
                v-model="vdaViolationDate"
                placeholder="위반일자"
                maxlength="15"
                disabled
              />
            </div>
            <div class="popup_contents_body_input_pw">
              <label
                for="ViolationTime"
                style="position: inherit; margin-bottom: 2%"
                >위반시간</label
              >
              <input
                type="text"
                id="ViolationTime"
                v-model="vdaViolationTime"
                placeholder="위반시간"
                maxlength="15"
                disabled
              />
            </div>
          </div>
          <div class="popup_contents_body_input_cont">
            <div class="popup_contents_body_input_pw">
              <label
                for="ViolationDetail"
                style="position: inherit; margin-bottom: 2%"
                >위반 내용 (필수)</label
              >
              <input
                type="text"
                id="ViolationDetail"
                v-model="vdaViolationDetail"
                placeholder="위반내용"
                maxlength="15"
                disabled
              />
            </div>
            <div class="popup_contents_body_input_pw">
              <label
                for="ViolationNo"
                style="position: inherit; margin-bottom: 2%"
                >비고</label
              >
              <input
                type="text"
                id="ViolationNo"
                v-model="vdaViolationNo"
                placeholder="비고"
                maxlength="15"
                disabled
              />
            </div>
          </div>
          <div class="popup_contents_body_input_cont">
            <div class="popup_contents_body_input_pw">
              <label
                for="ViolationTeam"
                style="position: inherit; margin-bottom: 2%"
                >단속조</label
              >
              <input
                type="text"
                id="ViolationTeam"
                v-model="vdaViolationTeam"
                placeholder="단속조"
                maxlength="15"
                disabled
              />
            </div>
            <div class="popup_contents_body_input_pw">
              <label
                for="managerEmail"
                style="position: inherit; margin-bottom: 2%"
                >단속원 (필수)</label
              >
              <input
                type="text"
                id="managerEmail"
                v-model="vdaViolationOfficer"
                placeholder="단속원"
                maxlength="10"
                disabled
              />
            </div>
          </div>
          <div class="popup_contents_body_input_cont">
            <div class="popup_contents_body_input_pw">
              <label
                for="ViolationStatus"
                style="position: inherit; margin-bottom: 2%"
                >단속 차량 상태 (필수)</label
              >
              <select
                name=""
                id="ViolationStatus"
                v-model="vdaViolationStatus"
                style="width: 95%"
                disabled
              >
                <option disabled value="">단속차량상태</option>
                <option value="VVS001">견인 접수</option>
                <option value="VVS002">견인 배정</option>
                <option value="VVS003">처리 완료</option>
                <option value="VVS004">차주 이동</option>
              </select>
            </div>
            <div class="popup_contents_body_input_pw">
              <label
                for="RegionCode"
                style="position: inherit; margin-bottom: 2%"
                >지역 코드 (필수)</label
              >
              <input
                type="text"
                id="RegionCode"
                v-model="aciRegionCode"
                placeholder="지역코드"
                maxlength="15"
                disabled
              />
            </div>
          </div>
          <div class="popup_contents_body_input_cont">
            <div class="popup_contents_body_input_pw">
              <label for="RegDate" style="position: inherit; margin-bottom: 2%"
                >접수일시</label
              >
              <input
                type="text"
                id="RegDate"
                v-model="vdaRegDate"
                placeholder="접수일시"
                maxlength="15"
                disabled
              />
            </div>
            <div class="popup_contents_body_input_pw">
              <label
                for="AllotDate"
                style="position: inherit; margin-bottom: 2%"
                >견인배정일시</label
              >
              <input
                type="text"
                id="AllotDate"
                v-model="vdaAllotDate"
                placeholder="견인배정일시"
                disabled
              />
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
    console.log(props.data);
    const router = useRouter();
    const vdaSeqNo = ref(props.data.vdaSeqNo);
    const vdaCarNo = ref(props.data.vdaCarNo);
    const vdaLatitude = ref(props.data.vdaLatitude);
    const vdaLongitude = ref(props.data.vdaLongitude);
    const vdaViolationArea = ref(props.data.vdaViolationArea);
    const vdaViolationLocation = ref(props.data.vdaViolationLocation);
    const vdaViolationDate = ref(props.data.vdaViolationDate);
    const vdaViolationTime = ref(props.data.vdaViolationTime);
    const vdaViolationDetail = ref(props.data.vdaViolationDetail);
    const vdaViolationTeam = ref(props.data.vdaViolationTeam);
    const vdaViolationOfficer = ref(props.data.vdaViolationOfficer);
    const vdaViolationNo = ref(props.data.vdaViolationNo);
    const aiaAdminId = ref(props.data.aiaAdminId);
    const vdaViolationStatus = ref(props.data.vdaViolationStatus);
    const vdaRegDate = ref(props.data.vdaRegDate);
    const vdaAllotDate = ref(props.data.vdaAllotDate);
    const aciRegionCode = ref(props.data.aciRegionCode);
    // const idDupicate = ref(false);

    const checkHangle = (text) => {
      // 한글 테스트 정규식
      const notPhoneticSymbolExp = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
      if (!notPhoneticSymbolExp.test(text)) {
        return true;
      } else {
        return false;
      }
    };
    const validateJoin = () => {
      let strSpace = /\s/; // 공백체크
      if (
        strSpace.exec(vdaSeqNo.value) ||
        strSpace.exec(vdaCarNo.value) ||
        strSpace.exec(vdaViolationDetail.value) ||
        strSpace.exec(vdaViolationOfficer.value) ||
        strSpace.exec(vdaViolationStatus.value) ||
        strSpace.exec(aciRegionCode.value)
      ) {
        alert(
          "해당 항목에는 공백을 사용할수 없습니다.\n\n공백은 자동적으로 제거 됩니다."
        );
        vdaSeqNo.value = vdaSeqNo.value.replaceAll(" ", ""); // 공백제거
        vdaCarNo.value = vdaCarNo.value.replaceAll(" ", ""); // 공백제거
        vdaViolationDetail.value = vdaViolationDetail.value.replaceAll(" ", ""); // 공백제거
        vdaViolationOfficer.value = vdaViolationOfficer.value.replaceAll(
          " ",
          ""
        ); // 공백제거
        vdaViolationStatus.value = vdaViolationStatus.value.replaceAll(" ", ""); // 공백제거
        aciRegionCode.value = aciRegionCode.value.replaceAll(" ", ""); // 공백제거
        return false;
      } else if (
        vdaSeqNo.value.length < 1 ||
        vdaCarNo.value.length < 1 ||
        vdaViolationDetail.value.length < 1 ||
        vdaViolationOfficer.value.length < 1 ||
        vdaViolationStatus.value.length < 1 ||
        aciRegionCode.value.length < 1
      ) {
        alert("필수 항목을 모두 입력 해 주세요.");
        return false;
      } else {
        return true;
      }
    };

    const close = () => {
      emit("closePopup");
    };

    const modifyViolation = () => {
      const modify = confirm("단속 대상 차량 정보를 수정 하시겠습니까?");
      if (!modify) return;
      try {
        const val = validateJoin();
        if (val) {
          axios
            .post("https://bie.autogram.co.kr/api/v1/violation/modify", {})
            .then((res) => {
              console.log(res);
              if (res.data.result === "SUCCESS") {
                alert("단속 대상 차량 정보 수정을 완료 했습니다.");
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
    return {
      // --
      vdaSeqNo,
      vdaCarNo,
      vdaLatitude,
      vdaLongitude,
      vdaViolationArea,
      vdaViolationLocation,
      vdaViolationDate,
      vdaViolationTime,
      vdaViolationDetail,
      vdaViolationTeam,
      vdaViolationOfficer,
      vdaViolationNo,
      aiaAdminId,
      vdaViolationStatus,
      vdaRegDate,
      vdaAllotDate,
      aciRegionCode,
      close,
      // idDupicateCheck,
      // validateIdDup,
      validateJoin,
      modifyViolation,
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
  height: 60%;
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
  height: 100%;
}
.popup_contents_top {
  width: 100%;
  height: 5%;
  font-size: 20px;
  border-bottom: 1px solid grey;
}
.popup_contents_body {
  width: 100%;
  height: 85%;
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
