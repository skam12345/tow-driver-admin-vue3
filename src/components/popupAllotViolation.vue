<template>
  <div class="popup_cont">
    <div class="popup_contents_cont">
      <div class="close_btn" @click="close()"></div>
      <div class="popup_contents">
        <div class="popup_contents_top">단속 대상 차량 배정</div>
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
          <div class="popup_contents_body_select_cont">
            <div class="popup_contents_body_select_label">
              견인 기사 목록 (가까운 거리 순서)
            </div>
            <div class="popup_contents_body_select_drivers_cont">
              <!-- 아이콘 형태 -->
              <!-- <div class="popup_contents_body_select_drivers">
                <div
                  v-for="(info, index) in towDrivers"
                  :key="index"
                  class="popup_contents_body_select_drivers_card"
                >
                  <div style="font-size: 14px" @click="selectDrivers(info)">
                    {{ index + 1 }} : {{ info.dmaCarNo }} ,
                    {{ info.dmaMemName }}
                  </div>
                </div>
              </div> -->
              <!-- 지도 형태 -->
              <Map :drivers="towDrivers" :violationData="violationData" />
            </div>
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
import Map from "./KakaoMap.vue";

export default {
  components: {
    Map,
  },
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

    const violationData = ref(props.data);
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

    const towDrivers = ref([]);

    const close = () => {
      emit("closePopup");
    };
    const getWaitingList = async () => {
      console.log();
      try {
        await axios
          .post("https://bie.autogram.co.kr/api/v1/driver/getWaitingList", {
            vdaLongitude: vdaLongitude.value,
            vdaLatitude: vdaLatitude.value,
            aciRegionCode: aciRegionCode.value,
          })
          .then((res) => {
            console.log(res);
            for (var i = 0; i < res.data.length; i++) {
              towDrivers.value.push(res.data[i]);
              towDrivers.value.vdaSeqNo = vdaSeqNo.value;
            }
          });
      } catch (err) {
        alert(err);
      }
    };
    const selectDrivers = async (data) => {
      console.log(data);
      const modify = confirm("해당 기사를 배정 하시겠습니까?");
      if (!modify) return;
      try {
        await axios
          .post("https://bie.autogram.co.kr/api/v1/tow_allot/add", {
            vdaSeqNo: vdaSeqNo.value,
            dmaMemNo: data.dmaCarNo,
          })
          .then((res) => {
            console.log(res);
          });
        await axios
          .post("https://bie.autogram.co.kr/api/v1/violation/modify", {
            vdaSeqNo: vdaSeqNo.value,
            vdaViolationStatus: "VVS002",
          })
          .then((res) => {
            console.log(res);
            if (res.data.result !== "SUCCESS") {
              alert("오류가 발생 했습니다.");
              return;
            }
          });
      } catch (err) {
        alert(err);
      } finally {
        alert("배정을 완료 했습니다.");
        router.go(router.currentRoute);
      }
    };
    getWaitingList();
    return {
      // --
      violationData,
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
      towDrivers,
      close,
      getWaitingList,
      selectDrivers,
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
  height: 95%;
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
  height: 15%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.popup_contents_body_select_cont {
  width: 97.5%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.popup_contents_body_select_label {
  width: 100%;
  height: 5%;
}
.popup_contents_body_select_drivers_cont {
  width: 100%;
  height: 95%;
  padding: 1%;
  border: 1px solid grey;
  border-radius: 5px;
}
.popup_contents_body_select_drivers {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
}
.popup_contents_body_select_drivers_card {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 50px;
  border: 1px solid gray;
  border-radius: 5px;
  margin-bottom: 5px;
  cursor: pointer;
}
.popup_contents_body_select_drivers_card:hover {
  background-color: rgb(193, 193, 193);
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
