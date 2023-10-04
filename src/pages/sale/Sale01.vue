<template>
  <div>
    <div id="wrapper">
      <leftMenu :data="where"></leftMenu>
      <div id="container">
        <section class="sales">
          <div class="breadcrumb">
            <router-link to="/Home">HOME</router-link>
            <p>견인 수수료 정산</p>
          </div>
          <div class="contents">
            <h2 class="title title_sale">견인 수수료 정산</h2>
            <div class="contents_area">
              <form autocomplete="off">
                <div class="contents_area-search">
                  <div class="select MT20">
                    <div class="MR30" style="display: flex; position: relative">
                      <label for="purchase">조회 조건</label>
                      <select name="" id="purchase" v-model="dateType">
                        <option disabled value="">전체</option>
                        <option value="">전체</option>
                        <option value="tsd_billing_date">청구 일시</option>
                        <option value="tsd_deposit_date">입금 일시</option>
                      </select>
                    </div>
                    <div class="input_box date">
                      <label for="start">조회 일자</label>
                      <input type="date" id="start" v-model="dateStart" />
                      <div class="hyphen">-</div>
                      <input type="date" id="end" v-model="dateEnd" />
                      <div class="btn_group ML10 MR30">
                        <button type="button" @click="set_yes">전일</button>
                        <button type="button" @click="set_today">당일</button>
                        <button type="button" @click="set_weak">일주일</button>
                        <button type="button" @click="set_month">한달</button>
                      </div>
                    </div>
                    <div class="MR30" style="display: flex; position: relative">
                      <label for="purchase">청구 상태</label>
                      <select
                        name=""
                        id="purchase"
                        v-model="tsdBillingStatus"
                        @change="getSearch()"
                      >
                        <option disabled value="">전체</option>
                        <option value="">전체</option>
                        <option value="TBS001">청구중</option>
                        <option value="TBS002">청구완료</option>
                        <option value="TBS003">승인거절</option>
                        <option value="TBS004">환불처리</option>
                      </select>
                    </div>
                  </div>
                  <div
                    class="select MT30"
                    style="justify-content: space-between"
                  >
                    <div style="display: flex; width: 80%">
                      <div
                        class="MR30"
                        style="display: flex; position: relative"
                      >
                        <label for="si">지역 선택 (시)</label>
                        <select
                          name=""
                          id="si"
                          v-model="si.selectedData"
                          @change="selectSi()"
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
                      <div
                        class="MR30"
                        style="display: flex; position: relative"
                      >
                        <label for="gu">지역 선택 (구)</label>
                        <select
                          name=""
                          id="gu"
                          v-model="gu.selectedData"
                          :disabled="!si.selected"
                          @change="selectGu()"
                        >
                          <option value="">전체</option>
                          <option
                            v-for="(info, index) in gu.datas"
                            :key="index"
                            :value="info"
                          >
                            {{ info.aciSigunguName }}
                          </option>
                        </select>
                      </div>
                      <div
                        class="MR30"
                        style="display: flex; position: relative"
                      >
                        <label for="company">견인 업체 선택</label>
                        <select
                          name=""
                          id="company"
                          v-model="companys.selectedData"
                          :disabled="!gu.selected"
                          @change="selectCompany()"
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
                    </div>
                    <div style="display: flex">
                      <button
                        type="button"
                        class="btn_blue btn_search ML10 MR20"
                        @click="getSearch"
                      >
                        조회
                      </button>
                      <button
                        type="button"
                        class="btn_yellow btn_excel MR20"
                        @click="makeExcelFile5"
                      >
                        엑셀 다운로드
                      </button>
                      <button
                        v-if="isCompanySeached"
                        type="button"
                        class="btn_red"
                        style="width: 160px; padding: 0"
                        @click="completeSaleAll()"
                      >
                        업체별 전체 정산 완료
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <div class="contents_area-table">
                <p class="contents_area-title">
                  검색결과
                  <span class="fs14" style="color: black"
                    ><span>(</span>{{ saleData.length }}<span>건)</span></span
                  >
                </p>
                <!-- <p class="btnRight">
                  <button
                    type="button"
                    class="btn_add btn_red"
                    @click="openPopUp('add')"
                  >
                    수수료 등록
                  </button>
                </p> -->
                <table>
                  <colgroup>
                    <col width="4%" />
                    <col width="%" />
                    <col width="" />
                    <col width="" />
                    <col width="" />
                    <col width="" />
                    <col width="" />
                    <col width="" />
                    <col width="" />
                    <col width="" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th rowspan="2">NO</th>
                      <th rowspan="2">업체명</th>
                      <th rowspan="2">청구상태</th>
                      <th rowspan="2">수수료</th>
                      <th rowspan="2">수수료청구일시</th>
                      <th rowspan="2">입금액</th>
                      <th rowspan="2">입금일시</th>
                      <th rowspan="2">정산 완료</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(info, index) in saleData"
                      v-show="setPaginate(index)"
                      :key="index"
                    >
                      <td>{{ info.page }}</td>
                      <td
                        @click="openPopUp('detail', info)"
                        style="color: blue; cursor: pointer"
                      >
                        {{ info.tciCompanyName }}
                      </td>
                      <td v-if="info.tsdBillingStatus === 'TBS001'">청구중</td>
                      <td v-else-if="info.tsdBillingStatus === 'TBS002'">
                        청구완료
                      </td>
                      <td v-else-if="info.tsdBillingStatus === 'TBS003'">
                        승인거절
                      </td>
                      <td v-else>환불처리</td>
                      <td style="text-align: right">
                        {{ info.tsdServiceFeeComma }}
                      </td>
                      <td>{{ info.tsdBillingDate }}</td>
                      <td style="text-align: right">
                        {{ info.tsdDepositFeeComma }}
                      </td>
                      <td v-if="info.tsdDepositDate">
                        {{ info.tsdDepositDate }}
                      </td>
                      <td v-else>-</td>
                      <td
                        v-if="info.tsdBillingStatus === 'TBS001'"
                        @click="completeSale(info)"
                        style="color: blue; cursor: pointer"
                      >
                        정산 완료
                      </td>
                      <td v-else>-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="pagination">
              <ul style="width: 100%">
                <li class="page first" :class="{ disable: current == 1 }">
                  <a
                    v-if="!(current == 1)"
                    href="javascript:void(0)"
                    @click="updateCurrent(1)"
                    >first page</a
                  >
                  <a v-else>first page</a>
                </li>
                <li class="page prev" :class="{ disable: current == 1 }">
                  <a
                    v-if="!(current == 1)"
                    href="javascript:void(0)"
                    @click="updateCurrent(current - 1)"
                    >prev page</a
                  >
                  <a v-else>prev page</a>
                </li>

                <div
                  v-for="page_index in paginate_total_unit"
                  :key="page_index"
                >
                  <li
                    class="num"
                    @click.prevent="updateCurrent(page_index)"
                    :class="{ 'num is-current': page_index == current }"
                    :key="page_index"
                  >
                    <a href="">{{ page_index }}</a>
                  </li>
                </div>

                <li
                  class="page next"
                  :class="{ disable: current == paginate_total }"
                >
                  <a
                    v-if="!(current == paginate_total)"
                    href="javascript:void(0)"
                    @click="updateCurrent(current + 1)"
                    >next page</a
                  >
                  <a v-else>next page</a>
                </li>
                <li
                  class="page last"
                  :class="{ disable: current == paginate_total }"
                >
                  <a
                    v-if="!(current == paginate_total)"
                    href="javascript:void(0)"
                    @click="updateCurrent(paginate_total)"
                    >last page</a
                  >
                  <a v-else>last page</a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
    <popupDetailSale
      v-if="popupDetailSale"
      @closePopup="closePopup()"
      :data="selectedData"
    />
  </div>
</template>
<script>
import * as Xlsx from "xlsx";
import { computed, ref } from "vue";
import axios from "@/axios";
// import popupRegistDriver from "../../components/popupRegistDriver.vue";
// import popupModifyDriver from "../../components/popupModifyDriver.vue";
import popupDetailSale from "../../components/popupDetailSale.vue";
import leftMenu from "../../components/leftMenu.vue";

import { useRouter } from "vue-router";

export default {
  components: {
    // popupRegistDriver,
    // popupModifyDriver,
    popupDetailSale,
    leftMenu,
  },
  setup() {
    const where = ref("sale");
    const router = useRouter();
    const get_wtt = ref("");
    const get_pat = ref("");
    const get_wut = ref("");
    const sea_wtt = ref("");
    const sea_pat = ref("");
    const sea_wut = ref("");
    const sea_carnum = ref("");
    const sea_place_name = ref("");
    const sea_charger = ref("");
    const sea_id = ref("");
    const get_paysum = ref("");

    const geSaleResult = ref("");
    // 서버에서 받아온 데이터
    const saleData = ref([]);
    // 상세보기 선택 한 데이터
    const selectedData = ref();

    // pagenations
    const paginate = ref(20);
    const pageCount = ref(10);
    const paginate_total = ref(0);
    const current = ref(1);
    // 팝업 제어
    // const popupRegistDriver = ref(false);
    // const popupModifyDriver = ref(false);
    const popupDetailSale = ref(false);
    // 검색 조건
    const dateType = ref("");
    const dateStart = ref("");
    const dateEnd = ref("");
    const tsdBillingStatus = ref("");

    // // 업체별 조회 후
    // const companySeachData = ref();
    const isCompanySeached = ref(false);
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
            getSearch();
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
          getSearch();
        } else {
          companys.value.selected = false;
        }
      } catch (err) {
        alert(err);
      }
    };
    const completeSale = (data) => {
      console.log(data);
      let yyyymmddhhmmss;
      const d = new Date();
      const year = d.getFullYear(); // 년
      const month = d.getMonth() + 1; // 월
      const day = d.getDate();
      const hour = d.getHours();
      const minutes = d.getMinutes();
      const seconds = d.getSeconds();
      yyyymmddhhmmss =
        year +
        "-" +
        month.toString().padStart(2, "0") +
        "-" +
        day.toString().padStart(2, "0") +
        " " +
        hour.toString().padStart(2, "0") +
        ":" +
        minutes.toString().padStart(2, "0") +
        ":" +
        seconds.toString().padStart(2, "0");
      const check = confirm("해당 청구 내역을 완료 처리 하시겠습니까?");
      if (!check) {
        return;
      }
      try {
        axios
          .post("https://bie.autogram.co.kr/api/v1/tow_settlement/modify", {
            tsdSeqNo: data.tsdSeqNo,
            tsdBillingStatus: "TBS002",
            tsdServiceFee: data.tsdServiceFee,
            tsdDepositDate: yyyymmddhhmmss,
          })
          .then((res) => {
            console.log(res);
            if (res.data.result === "SUCCESS") {
              alert("정산처리를 완료 했습니다.");
              router.go(router.currentRoute);
            } else {
              alert("오류가 발생했습니다.");
            }
          });
      } catch (err) {
        alert(err);
      }
    };
    const completeSaleAll = (data) => {
      console.log(data);
      const check = confirm("모든 청구 내역을 완료 처리 하시겠습니까?");
      if (!check) {
        return;
      }
      try {
        axios
          .post(
            "https://bie.autogram.co.kr/api/v1/tow_settlement/depositProcessing",
            {
              tciCompanyNo: companys.value.selectedData,
              startDate: dateStart.value,
              endDate: dateEnd.value,
            }
          )
          .then((res) => {
            console.log(res);
            alert("모든 청구 내역을 완료 처리 했습니다.");
            router.go(router.currentRoute);
          });
      } catch (err) {
        alert(err);
      }
    };
    const getList = () => {
      try {
        axios
          .post("https://bie.autogram.co.kr/api/v1/tow_settlement/get", {})
          .then((res) => {
            console.log(res);
            saleData.value = res.data;
            // 검색 결과 인덱스 반대로 변경
            for (let i = 0; i < saleData.value.length; i++) {
              saleData.value[i].page = saleData.value.length - i;
            }
            geSaleResult.value = res.data;
            // 페이지네이션 페이지 계산
            paginate_total.value = Math.ceil(
              geSaleResult.value.length / paginate.value
            );
            // 금액에 콤마
            for (let i = 0; i < saleData.value.length; i++) {
              saleData.value[i].tsdServiceFeeComma = saleData.value[
                i
              ].tsdServiceFee
                .toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
              saleData.value[i].tsdDepositFeeComma = saleData.value[
                i
              ].tsdDepositFee
                .toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
            }
          });
      } catch (err) {
        alert(err);
      }
    };

    const getSearch = () => {
      current.value = 1;
      geSaleResult.value = "";
      try {
        axios
          .post("https://bie.autogram.co.kr/api/v1/tow_settlement/get", {
            dateType: dateType.value,
            startDate: dateStart.value,
            endDate: dateEnd.value,
            tsdBillingStatus: tsdBillingStatus.value,
            aciSidoName: si.value.selectedData,
            aciSigunguName: gu.value.selectedData.aciSigunguName,
            tciCompanyNo: companys.value.selectedData,
          })
          .then((res) => {
            if (res.data.length < 1) {
              alert("검색 결과가 0건 입니다.");
            }
            console.log(res);
            saleData.value = res.data;
            // 검색 결과 인덱스 반대로 변경
            for (let i = 0; i < saleData.value.length; i++) {
              saleData.value[i].page = saleData.value.length - i;
            }
            // 페이지네이션 페이지 계산
            geSaleResult.value = res.data;
            paginate_total.value = Math.ceil(
              geSaleResult.value.length / paginate.value
            );
            // 금액에 콤마
            for (let i = 0; i < saleData.value.length; i++) {
              saleData.value[i].tsdServiceFeeComma = saleData.value[
                i
              ].tsdServiceFee
                .toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
              saleData.value[i].tsdDepositFeeComma = saleData.value[
                i
              ].tsdDepositFee
                .toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
            }
            // 업체로 조회 했는지
            if (
              companys.value.selectedData.length > 0 &&
              companys.value.selectedData !== null &&
              companys.value.selectedData !== undefined &&
              companys.value.selectedData !== "" &&
              saleData.value.length > 0
            ) {
              isCompanySeached.value = true;
            } else {
              isCompanySeached.value = false;
            }
          });
      } catch (err) {
        console.log(err);
      }
    };
    const setPaginate = (i) => {
      if (current.value == 1) {
        return i < paginate.value;
      } else {
        return (
          i >= paginate.value * (current.value - 1) &&
          i < current.value * paginate.value
        );
      }
    };
    const updateCurrent = (i) => {
      current.value = i;
    };
    const set_yes = () => {
      const d = new Date();
      const b = new Date();
      const year = d.getFullYear(); // 년
      const month = d.getMonth() + 1; // 월
      const day = d.getDate();
      let pastDate = b.getDate() - 1;
      //let pastDate = b.getDate();
      b.setDate(pastDate);
      const b_year = b.getFullYear(); // 년
      const b_month = b.getMonth() + 1; // 월
      const b_day = b.getDate();
      dateStart.value =
        b_year +
        "-" +
        b_month.toString().padStart(2, "0") +
        "-" +
        b_day.toString().padStart(2, "0");
      dateEnd.value =
        year +
        "-" +
        month.toString().padStart(2, "0") +
        "-" +
        day.toString().padStart(2, "0");
    };
    const set_today = () => {
      const d = new Date();
      const year = d.getFullYear(); // 년
      const month = d.getMonth() + 1; // 월
      const day = d.getDate();
      dateStart.value =
        year +
        "-" +
        month.toString().padStart(2, "0") +
        "-" +
        day.toString().padStart(2, "0");
      dateEnd.value =
        year +
        "-" +
        month.toString().padStart(2, "0") +
        "-" +
        day.toString().padStart(2, "0");
    };
    const set_weak = () => {
      const d = new Date();
      const b = new Date();
      const year = d.getFullYear(); // 년
      const month = d.getMonth() + 1; // 월
      const day = d.getDate();
      let pastDate = b.getDate() - 7;
      b.setDate(pastDate);
      const b_year = b.getFullYear(); // 년
      const b_month = b.getMonth() + 1; // 월
      const b_day = b.getDate();
      dateStart.value =
        b_year +
        "-" +
        b_month.toString().padStart(2, "0") +
        "-" +
        b_day.toString().padStart(2, "0");
      dateEnd.value =
        year +
        "-" +
        month.toString().padStart(2, "0") +
        "-" +
        day.toString().padStart(2, "0");
    };
    const set_month = () => {
      const d = new Date();
      const b = new Date();
      // const b = moment();
      // const b = new Date(2022, 11, 15, 12, 12, 12);
      const year = d.getFullYear(); // 년
      const month = d.getMonth() + 1; // 월
      const day = d.getDate();
      // let pastDate = b.getMonth() - 1 < 1 ? b.getMonth() : b.getMonth() - 1;
      // let pastDate = b.subtract(1, "months");
      // console.log(pastDate);
      // console.log(b);
      // b.setDate(pastDate);
      const b_year = b.getFullYear(); // 년
      const b_month = b.getMonth(); // 월
      const b_day = b.getDate();
      // console.log(b);
      // console.log(b_day.toString());
      // console.log(b_day.toString());
      // console.log(b_day.toString().padStart(2, "0"));
      dateStart.value =
        b_year +
        "-" +
        b_month.toString().padStart(2, "0") +
        "-" +
        b_day.toString().padStart(2, "0");
      dateEnd.value =
        year +
        "-" +
        month.toString().padStart(2, "0") +
        "-" +
        day.toString().padStart(2, "0");
    };
    const set_year = () => {
      const d = new Date();
      const year = d.getFullYear(); // 년
      const month = d.getMonth() + 1; // 월
      const day = d.getDate();
      dateStart.value =
        year +
        "-" +
        month.toString().padStart(2, "0") +
        "-" +
        day.toString().padStart(2, "0");
      dateEnd.value =
        year +
        "-" +
        (month - 1).toString().padStart(2, "0") +
        "-" +
        day.toString().padStart(2, "0");
    };
    const return_date = (date) => {
      let today = new Date(date);
      today.setHours(today.getHours() + 9);
      return today.toISOString().replace("T", " ").substring(0, 19);
    };
    const makeExcelFile5 = () => {
      const workBook = Xlsx.utils.book_new();
      const workSheet = Xlsx.utils.json_to_sheet(geSaleResult.value);
      Xlsx.utils.book_append_sheet(workBook, workSheet, "견인 수수료 정산");
      Xlsx.writeFile(workBook, "견인 수수료 정산.xlsx");
    };
    // computed
    const maxPage = computed(() => {
      // 총 페이지 수(and 최대 페이지 번호)
      return paginate_total.value;
    });
    const startPage = computed(() => {
      // 페이지 시작 번호
      return (
        Math.trunc((current.value - 1) / pageCount.value) * pageCount.value + 1
      );
    });
    const endPage = computed(() => {
      // 페이지 끝 번호
      let end = startPage.value + pageCount.value - 1;
      return end < maxPage.value ? end : maxPage.value;
    });
    const paginate_total_unit = computed(() => {
      let units = [];
      for (let num = startPage.value; num <= endPage.value; num++) {
        units.push(num);
      }
      return units;
    });
    // popup functions
    const openPopUp = (opt, data) => {
      if (opt === "detail") {
        popupDetailSale.value = true;
        selectedData.value = data;
      }
    };
    const closePopup = () => {
      // popupRegistDriver.value = false;
      // popupModifyDriver.value = false;
      popupDetailSale.value = false;
    };
    getList();
    getLocationSi();

    return {
      where,
      // 견인
      tsdBillingStatus,
      dateType,
      dateStart,
      dateEnd,
      // 예전꺼
      get_wtt,
      get_pat,
      get_wut,
      sea_wtt,
      sea_pat,
      sea_wut,
      sea_carnum,
      sea_place_name,
      sea_charger,
      sea_id,
      get_paysum,
      geSaleResult,
      paginate,
      paginate_total,
      current,
      pageCount, // 페이지 버튼 최대 개수
      saleData,
      popupDetailSale,
      isCompanySeached, // 업체로 조회 했는지 여부
      getSearch,
      getList,
      makeExcelFile5,
      return_date,
      set_year,
      set_month,
      set_weak,
      set_today,
      set_yes,
      updateCurrent,
      setPaginate,
      paginate_total_unit,
      maxPage,
      startPage,
      endPage,
      closePopup,
      openPopUp,

      completeSale, // 정산 완료 처리
      completeSaleAll, // 업체별 전체 정산 완료 처리
      selectedData, // 선택 한 데이터
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
<style>
.test {
  text-align: right;
}
</style>
