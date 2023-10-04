<template>
  <div class="popup_cont">
    <div class="popup_contents_cont">
      <div class="close_btn" @click="close()"></div>
      <div class="popup_contents">
        <div class="popup_contents_top">견인 업체 수정</div>
        <div class="popup_contents_body">
          <div class="popup_contents_body_input_cont">
            <div class="popup_contents_body_input_pw">
              <label
                for="companyName"
                style="position: inherit; margin-bottom: 2%; display: flex"
              >
                <div>업체명</div>
                <div style="color: red">&nbsp;&nbsp;(필수)</div>
              </label>
              <input
                type="text"
                id="companyName"
                v-model="tciCompanyName"
                placeholder="업체명 입력"
                maxlength="10"
              />
            </div>
            <div class="popup_contents_body_input_pw">
              <label
                for="businessNo"
                style="position: inherit; margin-bottom: 2%; display: flex"
              >
                <div>사업자 번호</div>
                <div style="color: red">&nbsp;&nbsp;(필수)</div>
              </label>
              <input
                type="text"
                id="businessNo"
                v-model="tciBusinessNo"
                placeholder="사업자 번호 입력"
                maxlength="20"
              />
            </div>
          </div>
          <div class="popup_contents_body_input_cont">
            <div class="popup_contents_body_input_pw" @click="getAddress()">
              <label
                for="address"
                style="position: inherit; margin-bottom: 2%; display: flex"
              >
                <div>주소</div>
                <div style="color: red">&nbsp;&nbsp;(필수)</div>
              </label>
              <input
                type="text"
                id="address"
                v-model="tciAddress"
                placeholder="주소 입력"
                maxlength="20"
              />
            </div>
            <div class="popup_contents_body_input_pw">
              <label
                for="addressDetail"
                style="position: inherit; margin-bottom: 2%; display: flex"
              >
                <div>상세 주소</div>
                <div style="color: red">&nbsp;&nbsp;(필수)</div>
              </label>
              <input
                type="text"
                id="addressDetail"
                v-model="tciAddressDetail"
                placeholder="상세 주소 입력"
                maxlength="25"
              />
            </div>
          </div>
          <div class="popup_contents_body_input_cont">
            <div class="popup_contents_body_input_pw">
              <label
                for="telNo"
                style="position: inherit; margin-bottom: 2%; display: flex"
              >
                <div>대표 번호</div>
                <div style="color: red">&nbsp;&nbsp;(필수)</div>
              </label>
              <input
                type="text"
                id="telNo"
                v-model="tciTelNo"
                placeholder="대표 번호 입력"
                maxlength="15"
              />
            </div>
            <div class="popup_contents_body_input_pw">
              <label
                for="faxNo"
                style="position: inherit; margin-bottom: 2%; display: flex"
                >팩스 번호</label
              >
              <input
                type="text"
                id="faxNo"
                v-model="tciFaxNo"
                placeholder="팩스 번호 입력"
                maxlength="15"
              />
            </div>
          </div>
          <div class="popup_contents_body_input_cont">
            <div class="popup_contents_body_input_pw">
              <label
                for="ceoName"
                style="position: inherit; margin-bottom: 2%; display: flex"
              >
                <div>대표자명</div>
                <div style="color: red">&nbsp;&nbsp;(필수)</div>
              </label>
              <input
                type="text"
                id="ceoName"
                v-model="tciCeoName"
                placeholder="대표자명 입력"
                maxlength="15"
              />
            </div>
            <div class="popup_contents_body_input_pw">
              <label
                for="managerName"
                style="position: inherit; margin-bottom: 2%; display: flex"
              >
                <div>담당자명</div>
                <div style="color: red">&nbsp;&nbsp;(필수)</div>
              </label>
              <input
                type="text"
                id="managerName"
                v-model="tciManagerName"
                placeholder="담당자명 입력"
                maxlength="15"
              />
            </div>
          </div>
          <div class="popup_contents_body_input_cont">
            <div class="popup_contents_body_input_pw">
              <label
                for="managerTel"
                style="position: inherit; margin-bottom: 2%; display: flex"
              >
                <div>담당자 연락처</div>
                <div style="color: red">&nbsp;&nbsp;(필수)</div>
              </label>
              <input
                type="text"
                id="managerTel"
                v-model="tciManagerTel"
                placeholder="담당자 연락처 입력"
                maxlength="15"
              />
            </div>
            <div class="popup_contents_body_input_pw">
              <label
                for="managerEmail"
                style="position: inherit; margin-bottom: 2%; display: flex"
              >
                <div>담당자 email</div>
                <div style="color: red">&nbsp;&nbsp;(필수)</div>
              </label>
              <input
                type="text"
                id="managerEmail"
                v-model="tciManagerEmail"
                placeholder="담당자 email 입력"
                maxlength="25"
              />
            </div>
          </div>
          <div class="popup_contents_body_input_cont">
            <div class="popup_contents_body_input_pw">
              <label
                for="bankName"
                style="position: inherit; margin-bottom: 2%; display: flex"
              >
                <div>회사 거래 은행명</div>
                <div style="color: red">&nbsp;&nbsp;(필수)</div>
              </label>
              <input
                type="text"
                id="bankName"
                v-model="tciBankName"
                placeholder="회사 거래 은행명 입력"
                maxlength="15"
              />
            </div>
            <div class="popup_contents_body_input_pw">
              <label
                for="bankAccount"
                style="position: inherit; margin-bottom: 2%; display: flex"
              >
                <div>거래 은행 계좌 번호</div>
                <div style="color: red">&nbsp;&nbsp;(필수)</div>
              </label>
              <input
                type="text"
                id="bankAccount"
                v-model="tciBankAccount"
                placeholder="거래은행 계좌번호 입력"
                maxlength="15"
              />
            </div>
          </div>
          <div class="popup_contents_body_input_cont">
            <div class="popup_contents_body_input_pw">
              <label
                for="billingType"
                style="position: inherit; margin-bottom: 2%; display: flex"
              >
                <div>청구 구분</div>
                <div style="color: red">&nbsp;&nbsp;(필수)</div>
              </label>
              <select
                name=""
                id="billingType"
                v-model="tciBillingType"
                style="width: 95%"
              >
                <option disabled value="">청구 구분 선택</option>
                <option value="TBT001">건별청구</option>
                <option value="TBT002">월별청구</option>
              </select>
            </div>
            <div class="popup_contents_body_select_sigu_cont">
              <div class="popup_contents_body_select_sigu">
                <label
                  for="si01"
                  style="position: inherit; margin-bottom: 2%; display: flex"
                >
                  <div>견인 지역 선택 01 (시)</div>
                  <div style="color: red">&nbsp;&nbsp;(필수)</div>
                </label>
                <select
                  name=""
                  id="si01"
                  v-model="si01.selectedData"
                  @change="selectSi('1')"
                >
                  <option disabled value="">전체</option>
                  <option value="">전체</option>
                  <option
                    v-for="(info, index) in si01.datas"
                    :key="index"
                    :value="info.aciSidoName"
                  >
                    {{ info.aciSidoName }}
                  </option>
                </select>
              </div>
              <div class="popup_contents_body_select_sigu">
                <label
                  for="gu01"
                  style="position: inherit; margin-bottom: 2%; display: flex"
                >
                  <div>견인 지역 선택 01 (구)</div>
                  <div style="color: red">&nbsp;&nbsp;(필수)</div>
                </label>
                <select
                  name=""
                  id="gu01"
                  v-model="gu01.selectedData"
                  :disabled="!si01.selected"
                  @change="selectGu('1')"
                >
                  <option disabled value="">전체</option>
                  <option value="">전체</option>
                  <option
                    v-for="(info, index) in gu01.datas"
                    :key="index"
                    :value="info.aciRegionCode"
                  >
                    {{ info.aciSigunguName }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="popup_contents_body_input_cont">
            <div class="popup_contents_body_input_pw">
              <label
                for="serviceFee"
                style="position: inherit; margin-bottom: 2%; display: flex"
              >
                <div>견인 건당 수수료</div>
                <div style="color: red">&nbsp;&nbsp;(필수)</div>
              </label>
              <input
                type="number"
                id="serviceFee"
                v-model="tciServiceFee"
                placeholder="숫자만 입력 ex) 3000"
                maxlength="15"
              />
            </div>
            <div class="popup_contents_body_select_sigu_cont">
              <div class="popup_contents_body_select_sigu">
                <label
                  for="si02"
                  style="position: inherit; margin-bottom: 2%; display: flex"
                  >견인 지역 선택 02 (시)</label
                >
                <select
                  name=""
                  id="si02"
                  v-model="si02.selectedData"
                  @change="selectSi('2')"
                >
                  <option disabled value="">전체</option>
                  <option value="">전체</option>
                  <option
                    v-for="(info, index) in si02.datas"
                    :key="index"
                    :value="info.aciSidoName"
                  >
                    {{ info.aciSidoName }}
                  </option>
                </select>
              </div>
              <div class="popup_contents_body_select_sigu">
                <label
                  for="gu02"
                  style="position: inherit; margin-bottom: 2%; display: flex"
                  >견인 지역 선택 02 (구)</label
                >
                <select
                  name=""
                  id="gu02"
                  v-model="gu02.selectedData"
                  :disabled="!si02.selected"
                  @change="selectGu('2')"
                >
                  <option disabled value="">전체</option>
                  <option value="">전체</option>
                  <option
                    v-for="(info, index) in gu02.datas"
                    :key="index"
                    :value="info.aciRegionCode"
                  >
                    {{ info.aciSigunguName }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="popup_contents_body_input_cont">
            <div class="popup_contents_body_input_pw">
              <label
                for="billingDate"
                style="position: inherit; margin-bottom: 2%; display: flex"
              >
                <div>월별 청구일자 (날짜만)</div>
                <div style="color: red">&nbsp;&nbsp;(필수)</div>
              </label>
              <input
                type="number"
                id="billingDate"
                v-model="tciBillingDate"
                placeholder="1~31"
                maxlength="2"
              />
            </div>
            <div class="popup_contents_body_select_sigu_cont">
              <div class="popup_contents_body_select_sigu">
                <label
                  for="si03"
                  style="position: inherit; margin-bottom: 2%; display: flex"
                  >견인 지역 선택 03 (시)</label
                >
                <select
                  name=""
                  id="si03"
                  v-model="si03.selectedData"
                  @change="selectSi('3')"
                >
                  <option disabled value="">전체</option>
                  <option value="">전체</option>
                  <option
                    v-for="(info, index) in si03.datas"
                    :key="index"
                    :value="info.aciSidoName"
                  >
                    {{ info.aciSidoName }}
                  </option>
                </select>
              </div>
              <div class="popup_contents_body_select_sigu">
                <label
                  for="gu03"
                  style="position: inherit; margin-bottom: 2%; display: flex"
                  >견인 지역 선택 03 (구)</label
                >
                <select
                  name=""
                  id="gu03"
                  v-model="gu03.selectedData"
                  :disabled="!si03.selected"
                  @change="selectGu('3')"
                >
                  <option disabled value="">전체</option>
                  <option value="">전체</option>
                  <option
                    v-for="(info, index) in gu03.datas"
                    :key="index"
                    :value="info.aciRegionCode"
                  >
                    {{ info.aciSigunguName }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="popup_contents_bottom">
          <div class="btn_cont">
            <div class="bottom_btns_cancle" @click="close()">취소</div>
            <div class="bottom_btns_add" @click="modifyCompany()">수정</div>
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

    const tciCompanyNo = ref(props.data.tciCompanyNo);
    const tciCompanyName = ref(props.data.tciCompanyName);
    const tciBusinessNo = ref(props.data.tciBusinessNo);
    const tciAddress = ref(props.data.tciAddress);
    const tciAddressDetail = ref(props.data.tciAddressDetail);
    const tciTelNo = ref(props.data.tciTelNo);
    const tciFaxNo = ref(props.data.tciFaxNo);
    const tciCeoName = ref(props.data.tciCeoName);
    const tciManagerName = ref(props.data.tciManagerName);
    const tciManagerTel = ref(props.data.tciManagerTel);
    const tciManagerEmail = ref(props.data.tciManagerEmail);
    const tciBankName = ref(props.data.tciBankName);
    const tciBankAccount = ref(props.data.tciBankAccount);
    const tciContractFile01 = ref(props.data.tciContractFile01);
    const tciContractFile02 = ref(props.data.tciContractFile02);
    const tciContractFile03 = ref(props.data.tciContractFile03);
    const tciBankToken = ref(props.data.tciBankToken);
    const tciServiceFee = ref(props.data.tciServiceFee);
    const tciBillingType = ref(props.data.tciBillingType);
    const tciBillingDate = ref(props.data.tciBillingDate);
    const aciRegionCode01 = ref(props.data.aciRegionCode01);
    const aciRegionCode02 = ref(props.data.aciRegionCode02);
    const aciRegionCode03 = ref(props.data.aciRegionCode03);
    const aciSigunguName01 = ref("");
    const aciSigunguName02 = ref("");
    const aciSigunguName03 = ref("");
    console.log(tciBillingType.value);
    // 지역 조회
    const si01 = ref({
      datas: [],
      selected: false,
      selectedData: "",
    });
    const gu01 = ref({
      datas: [],
      selected: false,
      selectedData: "",
    });
    const si02 = ref({
      datas: [],
      selected: false,
      selectedData: "",
    });
    const gu02 = ref({
      datas: [],
      selected: false,
      selectedData: "",
    });
    const si03 = ref({
      datas: [],
      selected: false,
      selectedData: "",
    });
    const gu03 = ref({
      datas: [],
      selected: false,
      selectedData: "",
    });
    // 다음 주소 찾기
    const extraAddress = ref("");
    const address = ref("");
    const userSelectedType = ref("");
    const postcode = ref("");
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
          console.log(data);
          postcode.value = data.zonecode;
          tciAddress.value = data.address;
        },
      }).open();
    };
    const getLocationSi = async () => {
      try {
        await axios
          .post("https://bie.autogram.co.kr/api/v1/admin_code/getSido", {})
          .then((res) => {
            console.log(res);
            si01.value.datas = res.data;
            si02.value.datas = res.data;
            si03.value.datas = res.data;
          });
        console.log(aciRegionCode01.value);
        if (aciRegionCode01.value) {
          await axios
            .post("https://bie.autogram.co.kr/api/v1/admin_code/getRegion", {
              aciRegionCode: aciRegionCode01.value,
            })
            .then((res) => {
              console.log(res);
              si01.value.selectedData = res.data[0].aciSidoName;
              si01.value.selected = true;
              selectSi("1");
              gu01.value.selectedData = res.data[0].aciRegionCode;
            });
        }
        if (aciRegionCode02.value) {
          await axios
            .post("https://bie.autogram.co.kr/api/v1/admin_code/getRegion", {
              aciRegionCode: aciRegionCode02.value,
            })
            .then((res) => {
              console.log(res);
              si02.value.selectedData = res.data[0].aciSidoName;
              si02.value.selected = true;
              selectSi("2");
              gu02.value.selectedData = res.data[0].aciRegionCode;
            });
        }
        if (aciRegionCode03.value) {
          console.log("3");
          await axios
            .post("https://bie.autogram.co.kr/api/v1/admin_code/getRegion", {
              aciRegionCode: aciRegionCode03.value,
            })
            .then((res) => {
              console.log(res);
              si03.value.selectedData = res.data[0].aciSidoName;
              si03.value.selected = true;
              selectSi("3");
              gu03.value.selectedData = res.data[0].aciRegionCode;
            });
        }
      } catch (err) {
        alert(err);
      }
    };
    const selectSi = (num) => {
      console.log("시 선택 후");
      if (num === "1") {
        try {
          axios
            .post("https://bie.autogram.co.kr/api/v1/admin_code/getSigungu", {
              aciSidoName: si01.value.selectedData,
            })
            .then((res) => {
              gu01.value.datas = res.data;
            });
          if (si01.value.selectedData !== "") {
            si01.value.selected = true;
          } else {
            si01.value.selected = false;
            gu01.value.selected = false;
          }
        } catch (err) {
          alert(err);
        }
      } else if (num === "2") {
        try {
          axios
            .post("https://bie.autogram.co.kr/api/v1/admin_code/getSigungu", {
              aciSidoName: si02.value.selectedData,
            })
            .then((res) => {
              gu02.value.datas = res.data;
            });
          if (si02.value.selectedData !== "") {
            si02.value.selected = true;
          } else {
            si02.value.selected = false;
            gu02.value.selected = false;
          }
        } catch (err) {
          alert(err);
        }
      } else if (num === "3") {
        try {
          axios
            .post("https://bie.autogram.co.kr/api/v1/admin_code/getSigungu", {
              aciSidoName: si03.value.selectedData,
            })
            .then((res) => {
              gu03.value.datas = res.data;
            });
          if (si03.value.selectedData !== "") {
            si03.value.selected = true;
          } else {
            si03.value.selected = false;
            gu03.value.selected = false;
          }
        } catch (err) {
          alert(err);
        }
      }
    };
    const selectGu = (num) => {
      if (num === "1") {
        try {
          if (gu01.value.selectedData !== "") {
            gu01.value.selected = true;
            aciRegionCode01.value = gu01.value.selectedData;
            console.log(aciRegionCode01.value);
          } else {
            gu01.value.selected = false;
          }
        } catch (err) {
          alert(err);
        }
      } else if (num === "2") {
        try {
          if (gu02.value.selectedData !== "") {
            gu02.value.selected = true;
            aciRegionCode02.value = gu02.value.selectedData;
            console.log(aciRegionCode02.value);
          } else {
            gu02.value.selected = false;
          }
        } catch (err) {
          alert(err);
        }
      } else if (num === "3") {
        try {
          if (gu03.value.selectedData !== "") {
            gu03.value.selected = true;
            aciRegionCode03.value = gu03.value.selectedData;
            console.log(aciRegionCode03.value);
          } else {
            gu03.value.selected = false;
          }
        } catch (err) {
          alert(err);
        }
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
      let strSpace = /\s/; // 공백체크
      if (
        strSpace.exec(tciCompanyName.value) ||
        strSpace.exec(tciBusinessNo.value) ||
        strSpace.exec(tciAddress.value) ||
        strSpace.exec(tciAddressDetail.value) ||
        strSpace.exec(tciTelNo.value) ||
        strSpace.exec(tciCeoName.value) ||
        strSpace.exec(tciManagerName.value) ||
        strSpace.exec(tciManagerTel.value) ||
        strSpace.exec(tciManagerEmail.value) ||
        strSpace.exec(tciBankName.value) ||
        strSpace.exec(tciBankAccount.value) ||
        strSpace.exec(tciBillingType.value) ||
        strSpace.exec(aciRegionCode01.value)
      ) {
        alert(
          "해당 항목에는 공백을 사용할수 없습니다.\n\n공백은 자동적으로 제거 됩니다."
        );
        tciCompanyName.value = tciCompanyName.value.replaceAll(" ", ""); // 공백제거
        tciBusinessNo.value = tciBusinessNo.value.replaceAll(" ", ""); // 공백제거
        tciAddress.value = tciAddress.value.replaceAll(" ", ""); // 공백제거
        tciAddressDetail.value = tciAddressDetail.value.replaceAll(" ", ""); // 공백제거
        tciTelNo.value = tciTelNo.value.replaceAll(" ", ""); // 공백제거
        tciCeoName.value = tciCeoName.value.replaceAll(" ", ""); // 공백제거
        tciManagerName.value = tciManagerName.value.replaceAll(" ", ""); // 공백제거
        tciManagerTel.value = tciManagerTel.value.replaceAll(" ", ""); // 공백제거
        tciManagerEmail.value = tciManagerEmail.value.replaceAll(" ", ""); // 공백제거
        tciBankName.value = tciBankName.value.replaceAll(" ", ""); // 공백제거
        tciBankAccount.value = tciBankAccount.value.replaceAll(" ", ""); // 공백제거
        aciRegionCode01.value = aciRegionCode01.value.replaceAll(" ", ""); // 공백제거
        return false;
      } else if (
        !tciCompanyName.value ||
        !tciBusinessNo.value ||
        !tciAddress.value ||
        !tciAddressDetail.value ||
        !tciTelNo.value ||
        !tciCeoName.value ||
        !tciManagerName.value ||
        !tciManagerTel.value ||
        !tciManagerEmail.value ||
        !tciBankName.value ||
        !tciBankAccount.value ||
        !tciServiceFee.value ||
        !tciBillingDate.value ||
        !aciRegionCode01.value
      ) {
        alert("필수 항목을 모두 입력 해 주세요.");
        return false;
      }

      var pattern3 = /[~!@#$%^&*()_+|<>?:{}-]/; // 특수문자
      if (pattern3.test(tciServiceFee.value)) {
        alert("수수료에는 특수문자를 빼 주세요.");
        tciServiceFee.value = tciServiceFee.value.replaceAll(/-/g, "");
        return false;
      }
      return true;
    };

    const close = () => {
      emit("closePopup");
    };

    const modifyCompany = () => {
      const modify = confirm("견인 업체 정보를 수정 하시겠습니까?");
      if (!modify) return;
      const val = validateJoin();
      if (!val) return;
      try {
        axios
          .post("https://bie.autogram.co.kr/api/v1/company/modify", {
            tciCompanyNo: tciCompanyNo.value,
            tciCompanyName: tciCompanyName.value,
            tciBusinessNo: tciBusinessNo.value,
            tciAddress: tciAddress.value,
            tciAddressDetail: tciAddressDetail.value,
            tciTelNo: tciTelNo.value,
            tciFaxNo: tciFaxNo.value,
            tciCeoName: tciCeoName.value,
            tciManagerName: tciManagerName.value,
            tciManagerTel: tciManagerTel.value,
            tciManagerEmail: tciManagerEmail.value,
            tciBankName: tciBankName.value,
            tciBankAccount: tciBankAccount.value,
            tciContractFile01: tciContractFile01.value,
            tciContractFile02: tciContractFile02.value,
            tciContractFile03: tciContractFile03.value,
            tciBankToken: tciBankToken.value,
            tciServiceFee: tciServiceFee.value,
            tciBillingType: tciBillingType.value,
            tciBillingDate: tciBillingDate.value,
            aciRegionCode01: aciRegionCode01.value,
            aciRegionCode02: aciRegionCode02.value,
            aciRegionCode03: aciRegionCode03.value,
          })
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
    getLocationSi();
    // getLocationSiName();
    return {
      tciCompanyNo,
      tciCompanyName,
      tciBusinessNo,
      tciAddress,
      tciAddressDetail,
      tciTelNo,
      tciFaxNo,
      tciCeoName,
      tciManagerName,
      tciManagerTel,
      tciManagerEmail,
      tciBankName,
      tciBankAccount,
      tciContractFile01,
      tciContractFile02,
      tciContractFile03,
      tciBankToken,
      tciServiceFee,
      tciBillingType,
      tciBillingDate,
      aciRegionCode01,
      aciRegionCode02,
      aciRegionCode03,
      aciSigunguName01,
      aciSigunguName02,
      aciSigunguName03,
      close,
      // idDupicateCheck,
      // validateIdDup,
      si01,
      gu01,
      si02,
      gu02,
      si03,
      gu03,
      validateJoin,
      modifyCompany,
      checkHangle,
      getLocationSi,
      selectSi,
      selectGu,
      getAddress,
      postcode,
      extraAddress,
      address,
      userSelectedType,
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
.btn_cont {
  display: flex;
  height: 60%;
  width: 85%;
  align-items: center;
  justify-content: space-between;
}
.close_btn {
  min-width: 20px;
  min-height: 20px;
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
