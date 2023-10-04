<template>
  <div>
    <div id="wrapper">
      <leftMenu :data="where"></leftMenu>
      <div id="container">
        <section class="sales">
          <div class="breadcrumb">
            <router-link to="/Home">HOME</router-link>
            <p>견인 업체 관리</p>
          </div>
          <div class="contents">
            <h2 class="title title_sale">견인 업체 관리</h2>
            <div class="contents_area">
              <form autocomplete="off">
                <div class="contents_area-search">
                  <div class="select MT20">
                    <!-- <div class="input_box MR30">
                      <label for="tciCompanyNo">견인 업체 번호</label>
                      <input
                        type="text"
                        id="tciCompanyNo"
                        placeholder="견인 업체 번호 입력"
                        v-model="tciCompanyNo"
                        v-on:keydown.enter.prevent="getSearch"
                      />
                    </div> -->
                    <div class="input_box MR30">
                      <label for="tciBusinessNo">사업자 번호</label>
                      <input
                        type="text"
                        id="tciBusinessNo"
                        placeholder="사업자 번호 입력"
                        v-model="tciBusinessNo"
                        v-on:keydown.enter.prevent="getSearch"
                      />
                    </div>
                    <div class="input_box MR30">
                      <label for="tciCeoName">대표자명</label>
                      <input
                        type="text"
                        id="tciCeoName"
                        placeholder="대표자명 입력"
                        v-model="tciCeoName"
                        v-on:keydown.enter.prevent="getSearch"
                      />
                    </div>
                    <div class="input_box MR30">
                      <label for="tciManagerName">담당자명</label>
                      <input
                        type="text"
                        id="tciManagerName"
                        placeholder="담당자명 입력"
                        v-model="tciManagerName"
                        v-on:keydown.enter.prevent="getSearch"
                      />
                    </div>
                    <div class="input_box MR30">
                      <label for="tciManagerTel">담당자 연락처</label>
                      <input
                        type="text"
                        id="tciManagerTel"
                        placeholder="담당자 연락처 입력"
                        v-model="tciManagerTel"
                        v-on:keydown.enter.prevent="getSearch"
                      />
                    </div>
                  </div>
                  <div
                    class="select MT30"
                    style="justify-content: space-between"
                  >
                    <div style="display: flex; width: 80%">
                      <div class="input_box MR30">
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
                        class="btn_yellow btn_excel"
                        @click="makeExcelFile5"
                      >
                        엑셀 다운로드
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <div class="contents_area-table">
                <p class="contents_area-title">
                  검색결과
                  <span class="fs14" style="color: black"
                    ><span>(</span>{{ companyData.length
                    }}<span>건)</span></span
                  >
                </p>
                <p class="btnRight">
                  <button
                    type="button"
                    class="btn_add btn_red"
                    @click="openPopUp('add')"
                  >
                    견인업체등록
                  </button>
                </p>
                <table>
                  <colgroup>
                    <col width="4%" />
                    <col width="%" />
                    <!-- <col width="" /> -->
                    <col width="" />
                    <col width="" />
                    <col width="" />
                    <col width="" />
                    <col width="" />
                    <col width="" />
                    <col width="" />
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
                      <!-- <th rowspan="2">업체 번호</th> -->
                      <th rowspan="2">업체명</th>
                      <th rowspan="2">지역1</th>
                      <th rowspan="2">지역2</th>
                      <th rowspan="2">지역3</th>
                      <th rowspan="2">대표 전화 번호</th>
                      <th rowspan="2">회사 주소</th>
                      <th rowspan="2">회사 상세 주소</th>
                      <th rowspan="2">대표자명</th>
                      <th rowspan="2">담당자명</th>
                      <th rowspan="2">담당자 연락처</th>
                      <th rowspan="2">등록 일시</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(info, index) in companyData"
                      v-show="setPaginate(index)"
                      :key="index"
                    >
                      <td>{{ info.page }}</td>
                      <td
                        @click="openPopUp('modify', info)"
                        style="color: blue; cursor: pointer"
                      >
                        {{ info.tciCompanyName }}
                      </td>
                      <td>
                        {{ info.aciSigunguName01 }}
                      </td>
                      <td v-if="info.aciSigunguName02">
                        {{ info.aciSigunguName02 }}
                      </td>
                      <td v-else>-</td>
                      <td v-if="info.aciSigunguName03">
                        {{ info.aciSigunguName03 }}
                      </td>
                      <td v-else>-</td>
                      <td>{{ info.tciTelNo }}</td>
                      <td>{{ info.tciAddress }}</td>
                      <td>{{ info.tciAddressDetail }}</td>
                      <td>{{ info.tciCeoName }}</td>
                      <td>{{ info.tciManagerName }}</td>
                      <td>{{ info.tciManagerTel }}</td>
                      <td>
                        {{ info.tciRegDate }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="pagination">
              <!-- seleted : li.is-current -->
              <!-- disable : li.disable -->
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
    <popupRegistCompany v-if="popupRegistCompany" @closePopup="closePopup()" />
    <popupModifyCompany
      v-if="popupModifyCompany"
      @closePopup="closePopup()"
      :data="selectedData"
    />
    <popupDetailCompany
      v-if="popupDetailCompany"
      @closePopup="closePopup()"
      :data="selectedData"
    />
  </div>
</template>
<script>
import * as Xlsx from "xlsx";
import { computed, ref } from "vue";
import axios from "@/axios";
import popupRegistCompany from "../../components/popupRegistCompany.vue";
import popupModifyCompany from "../../components/popupModifyCompany.vue";
import popupDetailCompany from "../../components/popupDetailCompany.vue";
import leftMenu from "../../components/leftMenu.vue";

export default {
  components: {
    popupRegistCompany,
    popupModifyCompany,
    popupDetailCompany,
    leftMenu,
  },
  setup() {
    const where = ref("company");
    const get_wtt = ref("");
    const get_pat = ref("");
    const get_wut = ref("");
    const sea_date_start = ref("");
    const sea_date_end = ref("");
    const sea_wtt = ref("");
    const sea_pat = ref("");
    const sea_wut = ref("");
    const sea_carnum = ref("");
    const sea_place_name = ref("");
    const sea_charger = ref("");
    const sea_id = ref("");
    const get_paysum = ref("");
    const get_payresult = ref("");

    // 서버에서 받아온 리스트
    const companyData = ref([]);
    // 견인 프로젝트 변수들
    const tciCompanyNo = ref("");
    const tciCompanyName = ref("");
    const tciBusinessNo = ref("");
    const tciTelNo = ref("");
    const tciCeoName = ref("");
    const tciManagerName = ref("");
    const aciRegionCode01 = ref("");
    const aciRegionCode02 = ref("");
    const aciRegionCode03 = ref("");
    const aciSigunguName01 = ref("");
    const aciSigunguName02 = ref("");
    const aciSigunguName03 = ref("");
    const tciAddress = ref("");
    const tciFaxNo = ref("");
    const tciAddressDetail = ref("");
    const tciManagerTel = ref("");
    const tciManagerEmail = ref("");
    const tciBankName = ref("");
    const tciBankAccount = ref("");
    const tciRegDate = ref("");
    const tciServiceFee = ref("");
    const tciBillingType = ref("");
    const tciBillingDate = ref("");
    const selectedData = ref();
    // 지역별 업체 조회
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
    // pagenations
    const paginate = ref(20);
    const pageCount = ref(10);
    const paginate_total = ref(0);
    const current = ref(1);
    // 팝업 제어
    const popupRegistCompany = ref(false);
    const popupModifyCompany = ref(false);
    const popupDetailCompany = ref(false);

    const getLocationSi = () => {
      try {
        axios
          .post("https://bie.autogram.co.kr/api/v1/admin_code/getSido", {})
          .then((res) => {
            for (var i = 0; i < res.data.length; i++) {
              si.value.datas.push(res.data[i]);
            }
            // console.log(si.value);
          });
      } catch (err) {
        alert(err);
      }
    };
    const selectSi = () => {
      console.log("시 선택");
      gu.value.selectedData = "";
      getSidoCompany();
    };
    const getSidoCompany = () => {
      try {
        console.log();
        axios
          .post("https://bie.autogram.co.kr/api/v1/company/getSidoCompany", {
            aciSidoName: si.value.selectedData,
          })
          .then((res) => {
            if (res.data.length < 1) {
              alert("검색 결과가 0건 입니다.");
              companyData.value = [];
              si.value.selected = false;
            } else {
              axios
                .post(
                  "https://bie.autogram.co.kr/api/v1/admin_code/getSigungu",
                  {
                    aciSidoName: si.value.selectedData,
                  }
                )
                .then((res) => {
                  console.log(res);
                  gu.value.datas = res.data;
                });
              if (si.value.selectedData !== "") {
                si.value.selected = true;
              } else {
                si.value.selected = false;
                gu.value.selected = false;
                companys.value.selected = false;
              }
              companyData.value = res.data;
              // 검색 결과 인덱스 반대로 변경
              for (let i = 0; i < companyData.value.length; i++) {
                companyData.value[i].page = companyData.value.length - i;
              }
              // 페이지네이션 페이지 계산
              get_payresult.value = res.data;
              paginate_total.value = Math.ceil(
                get_payresult.value.length / paginate.value
              );
            }
          });
      } catch (err) {
        console.log(err);
      }
    };
    const selectGu = () => {
      companys.value.selectedData = "";
      tciCompanyNo.value = "";
      try {
        axios
          .post("https://bie.autogram.co.kr/api/v1/company/get", {
            aciRegionCode: gu.value.selectedData,
          })
          .then((res) => {
            companys.value.datas = res.data;
            console.log(companys.value.datas);
          });
        if (gu.value.selectedData !== "") {
          gu.value.selected = true;
          getSearch();
        } else {
          gu.value.selected = false;
          getSearch();
        }
      } catch (err) {
        alert(err);
      }
    };
    const selectCompany = () => {
      try {
        if (companys.value.selectedData !== "") {
          tciCompanyNo.value = companys.value.selectedData;
          companys.value.selected = true;
        } else {
          companys.value.selected = false;
        }
      } catch (err) {
        alert(err);
      }
    };
    const getList = () => {
      try {
        axios
          .post("https://bie.autogram.co.kr/api/v1/company/get", {})
          .then((res) => {
            companyData.value = res.data;
            // 검색 결과 인덱스 반대로 변경
            for (let i = 0; i < companyData.value.length; i++) {
              companyData.value[i].page = companyData.value.length - i;
            }
            get_payresult.value = res.data;
            // 페이지네이션 페이지 계산
            paginate_total.value = Math.ceil(
              get_payresult.value.length / paginate.value
            );
          });
      } catch (err) {
        alert(err);
      }
    };

    const getSearch = () => {
      console.log(si.value.selectedData);
      current.value = 1;
      get_payresult.value = "";
      try {
        axios
          .post("https://bie.autogram.co.kr/api/v1/company/get", {
            tciCompanyNo: tciCompanyNo.value,
            tciCompanyName: tciCompanyName.value,
            tciBusinessNo: tciBusinessNo.value,
            tciCeoName: tciCeoName.value,
            tciManagerName: tciManagerName.value,
            tciManagerTel: tciManagerTel.value,
            aciRegionCode: gu.value.selectedData,
          })
          .then((res) => {
            if (res.data.length < 1) {
              alert("검색 결과가 0건 입니다.");
            }
            console.log(res);
            companyData.value = res.data;
            // 검색 결과 인덱스 반대로 변경
            for (let i = 0; i < companyData.value.length; i++) {
              companyData.value[i].page = companyData.value.length - i;
            }
            // 페이지네이션 페이지 계산
            get_payresult.value = res.data;
            paginate_total.value = Math.ceil(
              get_payresult.value.length / paginate.value
            );
          });
      } catch (err) {
        console.log(err);
      }
    };
    let return_one = (on_num) => {
      if (on_num != undefined) {
        const parts = on_num.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
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
      sea_date_start.value =
        b_year +
        "-" +
        b_month.toString().padStart(2, "0") +
        "-" +
        b_day.toString().padStart(2, "0");
      sea_date_end.value =
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
      sea_date_start.value =
        year +
        "-" +
        month.toString().padStart(2, "0") +
        "-" +
        day.toString().padStart(2, "0");
      sea_date_end.value =
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
      sea_date_start.value =
        b_year +
        "-" +
        b_month.toString().padStart(2, "0") +
        "-" +
        b_day.toString().padStart(2, "0");
      sea_date_end.value =
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
      sea_date_start.value =
        b_year +
        "-" +
        b_month.toString().padStart(2, "0") +
        "-" +
        b_day.toString().padStart(2, "0");
      sea_date_end.value =
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
      sea_date_start.value =
        year +
        "-" +
        month.toString().padStart(2, "0") +
        "-" +
        day.toString().padStart(2, "0");
      sea_date_end.value =
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
      const workSheet = Xlsx.utils.json_to_sheet(get_payresult.value);
      Xlsx.utils.book_append_sheet(workBook, workSheet, "견인 업체 관리");
      Xlsx.writeFile(workBook, "견인 업체 관리.xlsx");
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
      if (opt === "add") {
        popupRegistCompany.value = true;
      } else if (opt === "modify") {
        popupModifyCompany.value = true;
        selectedData.value = data;
      } else if (opt === "detail") {
        popupDetailCompany.value = true;
        selectedData.value = data;
      }
    };
    const closePopup = () => {
      popupRegistCompany.value = false;
      popupModifyCompany.value = false;
      popupDetailCompany.value = false;
    };
    getList();
    getLocationSi();

    return {
      where,
      // 견인
      tciCompanyNo,
      tciCompanyName,
      tciBusinessNo,
      tciTelNo,
      tciCeoName,
      tciManagerName,
      tciManagerTel,
      aciRegionCode01,
      aciRegionCode02,
      aciRegionCode03,
      aciSigunguName01,
      aciSigunguName02,
      aciSigunguName03,
      tciAddress,
      tciFaxNo,
      tciAddressDetail,
      tciManagerEmail,
      tciBankName,
      tciBankAccount,
      tciRegDate,
      tciServiceFee,
      tciBillingType,
      tciBillingDate,
      selectedData,
      // 예전꺼
      get_wtt,
      get_pat,
      get_wut,
      sea_date_start,
      sea_date_end,
      sea_wtt,
      sea_pat,
      sea_wut,
      sea_carnum,
      sea_place_name,
      sea_charger,
      sea_id,
      get_paysum,
      get_payresult,
      paginate,
      paginate_total,
      current,
      pageCount, // 페이지 버튼 최대 개수
      companyData,
      popupRegistCompany, // 등록 팝업
      popupModifyCompany, // 수정 팝업
      popupDetailCompany, // 상세 팝업
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
      return_one,
      paginate_total_unit,
      maxPage,
      startPage,
      endPage,
      closePopup,
      openPopUp,
      // 지역별, 업체별 검색 조건 s
      si,
      gu,
      companys,
      getLocationSi,
      selectSi,
      selectGu,
      selectCompany,
      getSidoCompany,
      // 지역별, 업체별 검색 조건 e
    };
  },
};
</script>
<style>
.test {
  text-align: right;
}
</style>
