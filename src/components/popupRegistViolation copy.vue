<template>
  <div class="popup_cont">
    <div class="popup_contents_cont">
      <div class="close_btn" @click="close()"></div>
      <div class="popup_contents">
        <div class="popup_contents_top">
          단속 대상 차량 등록
          <span v-if="imgSelected" class="changeFileNotice"
            >단속 대상 차량의 사진을 다시 선택 하시려면 사진을 클릭 해
            주세요.</span
          >
        </div>
        <div class="popup_contents_body">
          <div
            v-if="imgSelected"
            class="popup_contents_body_photo_cont dropzone_cont"
            @click="$refs.imgFileInput.click()"
          >
            <div
              v-for="(info, index) in imgPreviews"
              :key="index"
              class="preview_img_cont"
            >
              <img :src="info" alt="" class="preview_img" />
            </div>
            <input
              ref="imgFileInput"
              id="dropzoneFile"
              type="file"
              accept="image/jpeg"
              multiple
              style="width: 100%; height: 100%; display: none"
              @click="chageFile($event)"
              @change="selectFile($event, 'change')"
            />
          </div>
          <div v-else class="popup_contents_body_photo_cont">
            <DropZone
              @drop.prevent="selectFile($event)"
              @change="selectFile($event)"
            />
          </div>
          <div class="popup_contents_body_input_cont">
            <div class="popup_contents_body_input_pw">
              <label
                for="adminId"
                style="
                  position: inherit;
                  margin-bottom: 2%;
                  display: flex;
                  align-items: center;
                  justify-content: flex-start;
                  width: 100%;
                  padding-left: 5%;
                "
                >관리자 ID</label
              >
              <input
                type="text"
                id="adminId"
                v-model="aiaAdminId"
                placeholder="관리자 ID"
                disabled
              />
            </div>
            <div class="popup_contents_body_input_pw">
              <label
                for="CarNo"
                style="
                  position: inherit;
                  margin-bottom: 2%;
                  display: flex;
                  align-items: center;
                  justify-content: flex-start;
                  width: 100%;
                  padding-left: 5%;
                "
              >
                <div>단속 차량 번호</div>
                <div style="color: red">&nbsp;&nbsp;(필수)</div>
              </label>
              <input
                type="text"
                id="CarNo"
                v-model="vdaCarNo"
                placeholder="11가1111"
                maxlength="11"
              />
            </div>
          </div>
          <div class="popup_contents_body_input_cont">
            <div class="popup_contents_body_input_pw">
              <label
                for="ViolationArea"
                style="
                  position: inherit;
                  margin-bottom: 2%;
                  display: flex;
                  align-items: center;
                  justify-content: flex-start;
                  width: 100%;
                  padding-left: 5%;
                "
                >단속차량위치</label
              >
              <input
                type="text"
                id="ViolationArea"
                v-model="vdaViolationArea"
                placeholder="단속차량위치"
                maxlength="20"
              />
            </div>
            <div class="popup_contents_body_input_pw" @click="getAddress()">
              <label
                for="ViolationLocation"
                style="
                  position: inherit;
                  margin-bottom: 2%;
                  display: flex;
                  align-items: center;
                  justify-content: flex-start;
                  width: 100%;
                  padding-left: 5%;
                "
              >
                <div>단속 차량 장소 (주소)</div>
                <div style="color: red">&nbsp;&nbsp;(필수)</div>
              </label>
              <input
                type="text"
                id="ViolationLocation"
                v-model="vdaViolationLocation"
                placeholder="예시) 서울시 마포구 동교로 111"
                maxlength="25"
              />
            </div>
          </div>
          <div class="popup_contents_body_input_cont">
            <div class="popup_contents_body_input_pw">
              <label
                for="ViolationDate"
                style="
                  position: inherit;
                  margin-bottom: 2%;
                  display: flex;
                  align-items: center;
                  justify-content: flex-start;
                  width: 100%;
                  padding-left: 5%;
                "
              >
                <div>위반 일자</div>
                <div style="color: red">&nbsp;&nbsp;(필수)</div>
              </label>
              <input
                type="text"
                id="ViolationDate"
                v-model="vdaViolationDate"
                placeholder="2023-01-01"
                maxlength="15"
              />
            </div>
            <div class="popup_contents_body_input_pw">
              <label
                for="ViolationTime"
                style="
                  position: inherit;
                  margin-bottom: 2%;
                  display: flex;
                  align-items: center;
                  justify-content: flex-start;
                  width: 100%;
                  padding-left: 5%;
                "
              >
                <div>위반 시간</div>
                <div style="color: red">&nbsp;&nbsp;(필수)</div>
              </label>
              <input
                type="text"
                id="ViolationTime"
                v-model="vdaViolationTime"
                placeholder="12:00:00"
                maxlength="15"
              />
            </div>
          </div>
          <div class="popup_contents_body_input_cont">
            <div class="popup_contents_body_input_pw">
              <label
                for="ViolationDetail"
                style="
                  position: inherit;
                  margin-bottom: 2%;
                  display: flex;
                  align-items: center;
                  justify-content: flex-start;
                  width: 100%;
                  padding-left: 5%;
                "
              >
                <div>위반 내용</div>
                <div style="color: red">&nbsp;&nbsp;(필수)</div>
              </label>
              <input
                type="text"
                id="ViolationDetail"
                v-model="vdaViolationDetail"
                placeholder="위반내용"
                maxlength="15"
              />
            </div>
            <div class="popup_contents_body_input_pw">
              <label
                for="ViolationNo"
                style="
                  position: inherit;
                  margin-bottom: 2%;
                  display: flex;
                  align-items: center;
                  justify-content: flex-start;
                  width: 100%;
                  padding-left: 5%;
                "
                >비고</label
              >
              <input
                type="text"
                id="ViolationNo"
                v-model="vdaViolationNo"
                placeholder="비고"
                maxlength="15"
              />
            </div>
          </div>
          <div class="popup_contents_body_input_cont">
            <div class="popup_contents_body_input_pw">
              <label
                for="ViolationTeam"
                style="
                  position: inherit;
                  margin-bottom: 2%;
                  display: flex;
                  align-items: center;
                  justify-content: flex-start;
                  width: 100%;
                  padding-left: 5%;
                "
                >단속조</label
              >
              <input
                type="text"
                id="ViolationTeam"
                v-model="vdaViolationTeam"
                placeholder="단속조"
                maxlength="15"
              />
            </div>
            <div class="popup_contents_body_input_pw">
              <label
                for="managerEmail"
                style="
                  position: inherit;
                  margin-bottom: 2%;
                  display: flex;
                  align-items: center;
                  justify-content: flex-start;
                  width: 100%;
                  padding-left: 5%;
                "
              >
                <div>단속원</div>
                <div style="color: red">&nbsp;&nbsp;(필수)</div>
              </label>
              <input
                type="text"
                id="managerEmail"
                v-model="vdaViolationOfficer"
                placeholder="단속원"
                maxlength="10"
              />
            </div>
          </div>
          <div
            v-if="!isAdmin"
            class="popup_contents_body_input_cont"
            style="display: none"
          >
            <div class="popup_contents_body_input_pw">
              <label
                for="ViolationStatus"
                style="
                  position: inherit;
                  margin-bottom: 2%;
                  display: flex;
                  align-items: center;
                  justify-content: flex-start;
                  width: 100%;
                  padding-left: 5%;
                "
              >
                <div>단속 차량 상태</div>
                <div style="color: red">&nbsp;&nbsp;(필수)</div>
              </label>
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
                style="
                  position: inherit;
                  margin-bottom: 2%;
                  display: flex;
                  align-items: center;
                  justify-content: flex-start;
                  width: 100%;
                  padding-left: 5%;
                "
              >
                <div>지역 코드</div>
                <div style="color: red">&nbsp;&nbsp;(필수)</div>
              </label>
              <input
                type="text"
                id="RegionCode"
                v-model="aciRegionCode"
                placeholder="지역코드"
                maxlength="15"
                :disabled="!isAdmin"
              />
            </div>
          </div>
          <div v-else class="popup_contents_body_input_cont">
            <div class="popup_contents_body_input_pw">
              <label
                for="si"
                style="
                  position: inherit;
                  margin-bottom: 2%;
                  display: flex;
                  align-items: center;
                  justify-content: flex-start;
                  width: 100%;
                  padding-left: 5%;
                "
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
                style="
                  position: inherit;
                  margin-bottom: 2%;
                  display: flex;
                  align-items: center;
                  justify-content: flex-start;
                  width: 100%;
                  padding-left: 5%;
                "
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
                for="RegDate"
                style="
                  position: inherit;
                  margin-bottom: 2%;
                  display: flex;
                  align-items: center;
                  justify-content: flex-start;
                  width: 100%;
                  padding-left: 5%;
                "
              >
                <div>단속 차량 위도</div>
                <div style="color: red">&nbsp;&nbsp;(필수)</div>
              </label>
              <input
                type="text"
                id="RegDate"
                v-model="vdaLatitude"
                placeholder="단속 차량 위도"
                maxlength="15"
                :disabled="latAndLongFromImgFile"
              />
            </div>
            <div class="popup_contents_body_input_pw">
              <label
                for="AllotDate"
                style="
                  position: inherit;
                  margin-bottom: 2%;
                  display: flex;
                  align-items: center;
                  justify-content: flex-start;
                  width: 100%;
                  padding-left: 5%;
                "
              >
                <div>단속 차량 경도</div>
                <div style="color: red">&nbsp;&nbsp;(필수)</div>
              </label>
              <input
                type="text"
                id="AllotDate"
                v-model="vdaLongitude"
                placeholder="단속 차량 경도"
                :disabled="latAndLongFromImgFile"
              />
            </div>
          </div>
        </div>
        <div class="popup_contents_bottom">
          <div class="btn_cont">
            <div class="bottom_btns_cancle" @click="close()">취소</div>
            <div class="bottom_btns_add" @click="resistViolation()">등록</div>
            <!-- <div class="bottom_btns_add" @click="readObjectFromS3()">
              테스트
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <KakaoMap
      ref="kakaoMap"
      :geocoords="geocoords"
      :vdaViolationLocation="vdaViolationLocation"
      style="display: none"
      @getAddressFromMap="(val) => (vdaViolationLocation = val[0])"
      @getCoordLatFromMap="(val) => (vdaLatitude = val[0])"
      @getCoordLongFromMap="(val) => (vdaLongitude = val[0])"
      @getAddressFromMapStatus="(val) => (latAndLongFromImgFile = val)"
    />
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import axios from "@/axios";
import { useRouter } from "vue-router";
import DropZone from "@/components/dropzone.vue";
import KakaoMap from "@/components/KakaoMap.vue";
import AWS from "aws-sdk";

export default {
  components: { DropZone, KakaoMap },
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  // setup(props, { emit }) {
  setup() {
    const router = useRouter();
    // 관리자 권한 및 지역코드 확인
    const adminType = ref(localStorage.getItem("aiaAdminType"));
    const isAdmin = ref(true);
    // 카카오 맵 ref
    const kakaoMap = ref(null);
    // 사용되는 변수들
    const vdaSeqNo = ref();
    const vdaCarNo = ref();
    const vdaLatitude = ref();
    const vdaLongitude = ref();
    const vdaViolationArea = ref();
    const vdaViolationLocation = ref();
    const vdaViolationDate = ref();
    const vdaViolationTime = ref();
    const vdaViolationDetail = ref();
    const vdaViolationTeam = ref();
    const vdaViolationOfficer = ref();
    const vdaViolationNo = ref();
    const aiaAdminId = ref(localStorage.getItem("adminId"));
    const vdaViolationStatus = ref("VVS001");
    const vdaRegDate = ref("");
    const vdaAllotDate = ref();
    const aciRegionCode = ref();
    const vdaImg01Path = ref();
    const vdaImg02Path = ref();
    const vdaImg03Path = ref();
    const vdaImg04Path = ref();
    // 지역선택
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

    // 다음 주소 찾기
    const extraAddress = ref("");
    const address = ref("");
    const userSelectedType = ref("");
    const postcode = ref("");
    // 카카오맵으로 보낼 데이터들 (좌표, 주소)
    const geocoords = ref({
      lat: "",
      long: "",
      address: "",
    });

    // 이미지
    const imgSelected = ref(false);
    const imgFiles = ref([]);
    const imgPreviews = ref([]);
    const latAndLongFromImgFile = ref(false);
    const imagePathFromS3 = ref([]);

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
      console.log("시 선택 후");
      console.log(si.value);
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
        }
      } catch (err) {
        alert(err);
      }
    };
    const selectGu = () => {
      console.log("구 선택 할떄");
      console.log(gu.value.selectedData);
      aciRegionCode.value = gu.value.selectedData;
    };
    onMounted(() => {
      setTimeout(() => {
        loadScript();
      }, 1000);
    });

    const loadScript = () => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "https://dapi.kakao.com/v2/maps/sdk.js?appkey=3bba48b78174efe9b9fbbfec581109d4&libraries=services,clusterer";
      document.head.appendChild(script);
    };
    const checkAdminType = () => {
      console.log(adminType.value);
      if (adminType.value === "AAT002") {
        aciRegionCode.value = localStorage.getItem("aiaRegionCode");
        isAdmin.value = false;
        console.log(aciRegionCode.value);
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
    const validateJoin = () => {
      console.log("val");
      let strSpace = /\s/; // 공백체크
      if (
        strSpace.exec(vdaCarNo.value) ||
        strSpace.exec(vdaViolationDate.value) ||
        strSpace.exec(vdaViolationTime.value) ||
        strSpace.exec(vdaViolationDetail.value) ||
        strSpace.exec(vdaViolationOfficer.value) ||
        strSpace.exec(vdaViolationStatus.value) ||
        strSpace.exec(aciRegionCode.value) ||
        strSpace.exec(vdaLatitude.value) ||
        strSpace.exec(vdaLongitude.value)
      ) {
        alert(
          "해당 항목에는 공백을 사용할수 없습니다.\n\n공백은 자동적으로 제거 됩니다."
        );
        vdaCarNo.value = vdaCarNo.value.replaceAll(" ", ""); // 공백제거
        vdaViolationDate.value = vdaViolationDate.value.replaceAll(" ", ""); // 공백제거
        vdaViolationTime.value = vdaViolationTime.value.replaceAll(" ", ""); // 공백제거
        vdaViolationDetail.value = vdaViolationDetail.value.replaceAll(" ", ""); // 공백제거
        vdaViolationOfficer.value = vdaViolationOfficer.value.replaceAll(
          " ",
          ""
        ); // 공백제거
        vdaViolationStatus.value = vdaViolationStatus.value.replaceAll(" ", ""); // 공백제거
        aciRegionCode.value = aciRegionCode.value.replaceAll(" ", ""); // 공백제거
        vdaLatitude.value = vdaLatitude.value.replaceAll(" ", ""); // 공백제거
        vdaLongitude.value = vdaLongitude.value.replaceAll(" ", ""); // 공백제거
        return false;
      } else if (
        vdaCarNo.value.length < 1 ||
        vdaViolationLocation.value.length < 1 ||
        vdaViolationDate.value.length < 1 ||
        vdaViolationTime.value.length < 1 ||
        vdaViolationDetail.value.length < 1 ||
        vdaViolationOfficer.value.length < 1 ||
        vdaViolationStatus.value.length < 1 ||
        aciRegionCode.value.length < 1 ||
        vdaLatitude.value.length < 1 ||
        vdaLongitude.value.length < 1
      ) {
        alert("필수 항목을 모두 입력 해 주세요.");
        return false;
      } else {
        return true;
      }
    };

    const close = () => {
      // emit("closePopup");
      router.go(router.currentRoute);
    };
    const getAddress = () => {
      new window.daum.Postcode({
        oncomplete: (data) => {
          if (extraAddress.value !== "") {
            extraAddress.value = "";
          }
          if (data.userSelectedType === "R") {
            // 사용자가 도로명 주소를 선택했을 경우
            address.value = data.roadAddress;
          } else {
            // 사용자가 지번 주소를 선택했을 경우(J)
            address.value = data.jibunAddress;
          }
          // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
          if (data.userSelectedType === "R") {
            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
              extraAddress.value += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if (data.buildingName !== "" && data.apartment === "Y") {
              extraAddress.value +=
                extraAddress.value !== ""
                  ? `, ${data.buildingName}`
                  : data.buildingName;
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if (extraAddress.value !== "") {
              extraAddress.value = `(${extraAddress.value})`;
            }
          } else {
            extraAddress.value = "";
          }
          postcode.value = data.zonecode;
          vdaViolationLocation.value = data.address;
          geocoords.value.address = data.address;
          if (latAndLongFromImgFile.value === false) {
            kakaoMap.value.addressFuntions();
          }
        },
      }).open();
    };
    const chageFile = async (e) => {
      console.log(e);
      let val = confirm("사진을 바꾸시겠습니까?");
      if (!val) {
        // Input 이벤트 중단시키고 리턴
        e.preventDefault();
        return;
      }
    };
    const selectFile = async (e, change) => {
      // 드래그 앤 드롭 했을때
      if (e.dataTransfer) {
        // 사진을 4장이상 드롭 했을때 데이터 초기화
        if (e.dataTransfer.files.length > 4) {
          alert("사진은 최대 4장까지 선택 가능합니다.");
          imgFiles.value = [];
          imgSelected.value = false;
          imgPreviews.value = [];
          return;
        }
        // 파일선택 값 바꿔주고 파일들 배열형태로 저장
        imgSelected.value = true;
        imgFiles.value = e.dataTransfer.files;
        // 반복문으로 미리보기 이미지 url 생성
        for (let i = 0; i < imgFiles.value.length; i++) {
          console.log(imgFiles.value[i]);
          imgPreviews.value.push(URL.createObjectURL(imgFiles.value[i]));
        }
        console.log(imgPreviews.value);
        getDataFromImageFile(imgFiles.value[0].name);
      } else {
        // input 클릭 이벤트로 이미지 선택
        // 수정일때와 첫 등록일때가 다르기 때문에 change로 구분
        if (e.target.files.length > 4 && change === "change") {
          // 사진 교체일 경우 + 4장이상일때 기존에 가지고 있던 데이터 보존 하고 리턴
          console.log("사진 교체 일때");
          console.log(imgFiles.value);
          console.log(imgPreviews.value);
          alert("사진은 최대 4장까지 선택 가능합니다.");
          console.log(imgFiles.value);
          console.log(imgPreviews.value);
          return;
        } else if (e.target.files.length < 5 && change === "change") {
          // 사진 교체일 경울 + 사진이 4장 이하일때 기존에 가지고 있던 데이터 초기화 하고 리턴
          console.log("4장 아니고 수정일 때");
          imgFiles.value = [];
          imgSelected.value = false;
          imgPreviews.value = [];
        } else if (e.target.files.length > 4) {
          // 사진 교체가 아닐 때 + 사진 4장 이상일때 기존에 있던 데이터 초기화하고 리턴
          console.log("사진 교체 아닐때");
          alert("사진은 최대 4장까지 선택 가능합니다.");
          imgFiles.value = [];
          imgSelected.value = false;
          imgPreviews.value = [];
          return;
        }
        // 데이터 선택값 바꿔주고 파일들 저장
        imgSelected.value = true;
        imgFiles.value = e.target.files;
        console.log(imgFiles.value);
        console.log(imgPreviews.value);
        // 미리보기 이미지 url 생성해서 push
        for (let i = 0; i < imgFiles.value.length; i++) {
          imgPreviews.value.push(URL.createObjectURL(imgFiles.value[i]));
        }
        getDataFromImageFile(imgFiles.value[0].name);
      }
    };
    const getDataFromImageFile = (data) => {
      let text = data;
      let date;
      let time;
      // 사진 문자열 공백으로 잘라서 배열에 넣기, 공백도 배열에 포함 되기 때문에 공백은 배열에 안 넣는다
      let textSplitBlank = text.split(" ");
      let textArray = [];
      for (let i = 0; i < textSplitBlank.length; i++) {
        if (textSplitBlank[i].length > 0) {
          textArray.push(textSplitBlank[i]);
        }
      }
      // 정해진 양식에 맞을 경우만 작동 (일시차번   좌표   인덱스)일 경우만
      if (textArray.length === 3) {
        let dateTimeAndCarNo = textArray[0];
        // YYYY-MM-DD
        date = dateTimeAndCarNo.substring(0, 8);
        vdaViolationDate.value =
          date.slice(0, 4) + "-" + date.slice(4, 6) + "-" + date.slice(6, 8);
        // HH:MM:SS
        time = dateTimeAndCarNo.substring(8, 14);
        vdaViolationTime.value =
          time.slice(0, 2) + ":" + time.slice(2, 4) + ":" + time.slice(4, 6);
        // 나머지 차 번호
        vdaCarNo.value = dateTimeAndCarNo.substring(14);
        // 좌표
        console.log(textArray);
        let latAndLong = textArray[1];
        console.log();
        let lat = latAndLong.split("-")[0].replace("_", "");
        vdaLatitude.value = lat.slice(0, 2) + "." + lat.slice(2);
        let long = latAndLong.split("-")[1].replace("_", "");
        vdaLongitude.value = long.slice(0, 3) + "." + long.slice(3);
        geocoords.value.lat = vdaLatitude.value;
        geocoords.value.long = vdaLongitude.value;
        kakaoMap.value.geocoderFuntions();
        latAndLongFromImgFile.value = true;
      } else {
        alert("이미지 파일명이 정해진 양식과 다릅니다. 직접 입력 해 주세요.");
        latAndLongFromImgFile.value = false;
      }
    };

    const uploadImg = async () => {
      // s3 인증
      AWS.config.region = process.env.VUE_APP_BUCKET_REGION;
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: process.env.VUE_APP_IDENTITYPOOLID,
      });
      // s3 setting
      let bucketName = process.env.VUE_APP_BUCKET_NAME;
      // s3에 업로드 할 경로
      let imagePathForS3 = `/public/violation/${aciRegionCode.value}/${
        vdaViolationDate.value
      }/${vdaViolationTime.value + aciRegionCode.value + vdaCarNo.value}`;
      // 서버로 보낼 이미지 경로
      let imagePathForDB = `public/violation/${aciRegionCode.value}/${
        vdaViolationDate.value
      }/${vdaViolationTime.value + aciRegionCode.value + vdaCarNo.value}`;
      // s3세팅
      const s3 = new AWS.S3({
        apiVersion: "2012-10-17",
        params: {
          Bucket: bucketName + imagePathForS3,
        },
      });
      // 이미지 파일 업로드 반복문
      for (let i = 0; i < imgFiles.value.length; i++) {
        // s3 upload
        await s3
          .upload(
            {
              ACL: "public-read",
              Body: imgFiles.value[i],
              Key: `${[i]}`,
              ContentType: "image/jpeg",
            },
            (error) => {
              if (error) {
                console.log(error);
                alert(
                  "사진 업로드 중 오류가 발생했습니다. 사진 파일을 다시 확인 해 주세요."
                );
              }
            }
          )
          .promise()
          .then((data) => {
            console.log(data);
          });
        // 서버로 보낼 값 세팅
        switch (i) {
          case 0:
            vdaImg01Path.value = `${imagePathForDB}/${i}`;
            console.log(vdaImg01Path.value);
            break;
          case 1:
            vdaImg02Path.value = `${imagePathForDB}/${i}`;
            console.log(vdaImg02Path.value);
            break;
          case 2:
            vdaImg03Path.value = `${imagePathForDB}/${i}`;
            console.log(vdaImg03Path.value);
            break;
          case 3:
            vdaImg04Path.value = `${imagePathForDB}/${i}`;
            console.log(vdaImg04Path.value);
            break;
        }
      }
    };

    const resistViolation = async () => {
      const modify = confirm("단속 대상 차량 정보를 등록 하시겠습니까?");
      if (!modify) return;
      console.log(vdaCarNo.value);
      console.log(vdaLatitude.value);
      console.log(vdaLongitude.value);
      console.log(vdaViolationLocation.value);
      console.log(vdaViolationDate.value);
      console.log(vdaViolationTime.value);
      console.log(vdaViolationDetail.value);
      console.log(vdaViolationOfficer.value);
      console.log(aiaAdminId.value);
      console.log(vdaViolationStatus.value);
      console.log(aciRegionCode.value);
      try {
        const val = validateJoin();
        if (val) {
          await uploadImg();
          await axios
            .post("https://bie.autogram.co.kr/api/v1/violation/add", {
              vdaCarNo: vdaCarNo.value,
              vdaLatitude: vdaLatitude.value,
              vdaLongitude: vdaLongitude.value,
              vdaViolationArea: vdaViolationArea.value,
              vdaViolationLocation: vdaViolationLocation.value,
              vdaViolationDate: vdaViolationDate.value,
              vdaViolationTime: vdaViolationTime.value,
              vdaViolationDetail: vdaViolationDetail.value,
              vdaViolationTeam: vdaViolationTeam.value,
              vdaViolationOfficer: vdaViolationOfficer.value,
              vdaViolationNo: vdaViolationNo.value,
              aiaAdminId: aiaAdminId.value,
              vdaViolationStatus: vdaViolationStatus.value,
              aciRegionCode: aciRegionCode.value,
              vdaImg01Path: vdaImg01Path.value,
              vdaImg02Path: vdaImg02Path.value,
              vdaImg03Path: vdaImg03Path.value,
              vdaImg04Path: vdaImg04Path.value,
            })
            .then((res) => {
              console.log(res);
              if (res.data.result === "SUCCESS") {
                alert("단속 대상 차량 정보 등록을 완료 했습니다.");
                // 등록할때 쓰인 값들 초기화
                vdaCarNo.value = "";
                vdaLatitude.value = "";
                vdaLongitude.value = "";
                vdaViolationArea.value = "";
                vdaViolationLocation.value = "";
                vdaViolationDate.value = "";
                vdaViolationTime.value = "";
                vdaViolationDetail.value = "";
                vdaViolationTeam.value = "";
                vdaViolationOfficer.value = "";
                vdaViolationNo.value = "";
                vdaRegDate.value = "";
                vdaAllotDate.value = "";
                aciRegionCode.value = "";
                vdaImg01Path.value = "";
                vdaImg02Path.value = "";
                vdaImg03Path.value = "";
                vdaImg04Path.value = "";
                si.value.selectedData = "";
                gu.value.selectedData = "";
                extraAddress.value = "";
                address.value = "";
                userSelectedType.value = "";
                postcode.value = "";
                geocoords.value.lat = "";
                geocoords.value.long = "";
                geocoords.value.address = "";
                imgSelected.value = false;
                imgFiles.value = [];
                imgPreviews.value = [];
                latAndLongFromImgFile.value = false;
                imagePathFromS3.value = [];
                // 창 닫고 부모페이지로 이동
                // router.go(router.currentRoute);
              } else {
                console.log(res);
                alert("오류가 발생했습니다");
              }
            });
        } else {
          console.log("오류가 발생했습니다");
        }
      } catch (err) {
        alert("오류가 발생했습니다");
      }
    };
    const readObjectFromS3 = async () => {
      // s3 인증 과정
      AWS.config.region = process.env.VUE_APP_BUCKET_REGION;
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: process.env.VUE_APP_IDENTITYPOOLID,
      });
      // s3 setting
      let bucketName = process.env.VUE_APP_BUCKET_NAME;
      const s3 = new AWS.S3({
        apiVersion: "2012-10-17",
        params: {
          Bucket: bucketName,
        },
      });
      const params = {
        Bucket: bucketName,
        // 가져올 파일 경로
        Prefix: "public/violation",
        //인코딩 타입
        EncodingType: "url",
      };
      await s3.listObjectsV2(params, (err, data) => {
        console.log(err);
        console.log(data);
      });
    };
    checkAdminType();
    getLocationSi();
    return {
      isAdmin,
      adminType,
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
      vdaImg01Path,
      vdaImg02Path,
      vdaImg03Path,
      vdaImg04Path,
      checkAdminType,
      close,
      validateJoin,
      resistViolation,
      checkHangle,
      getAddress,
      postcode,
      extraAddress,
      address,
      userSelectedType,
      loadScript,
      selectFile,
      chageFile,
      uploadImg,
      imgSelected,
      imgFiles,
      imgPreviews,
      latAndLongFromImgFile,
      getDataFromImageFile,
      geocoords,
      kakaoMap,
      si,
      gu,
      getLocationSi,
      selectSi,
      selectGu,
      imagePathFromS3,
      readObjectFromS3,
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
  height: 80%;
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
  display: flex;
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
  height: 12.5%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.popup_contents_body_photo_cont {
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  overflow: scroll;
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
  align-items: center;
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
.form-box {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.form-box input {
  width: 400px;
  height: 50px;
  border: 1px solid;
  border-radius: 3px;
}
.form-box div {
  margin-left: 50px;
  width: 150px;
  height: 50px;
  background-color: #5366cf;
  font-size: 15px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.post-box {
  z-index: 2;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
.preview_img_cont {
  width: auto;
  height: 100%;
}
.preview_img {
  width: auto;
  height: 100%;
  object-fit: cover;
  padding: 2%;
}
.changeFileNotice {
  margin-left: 5%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  font-size: 16px;
  color: red;
  padding-top: 0.4%;
}
.dropzone_cont {
  border: 2px dashed #41b883;
  background-color: #fff;
}
</style>
