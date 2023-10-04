<template>
  <div>
    <div id="wrapper">
      <leftMenu :data="where"></leftMenu>
      <div id="container">
        <section class="sales">
          <div class="breadcrumb">
            <router-link to="/Home">HOME</router-link>
            <p>견인 차량 관리</p>
          </div>
          <div class="contents">
            <h2 class="title title_sale">견인 차량 관리</h2>
            <div class="contents_area">
              <form autocomplete="off">
                <div class="contents_area-search">
                  <div class="select MT20">
                    <div class="input_box MR30">
                      <label for="vdaSeqNo">주차 위반 단속 번호</label>
                      <input
                        type="text"
                        id="vdaSeqNo"
                        placeholder="주차 위반 단속 번호"
                        v-model="vdaSeqNo"
                        v-on:keydown.enter.prevent="getSearch"
                      />
                    </div>
                    <div class="select_box MR30">
                      <label for="tadTowStatus">견인 처리 상태</label>
                      <select
                        name=""
                        id="tadTowStatus"
                        v-model="tadTowStatus"
                        @change="getSearch()"
                        style="width: 180px"
                      >
                        <option disabled value="">견인 처리 상태</option>
                        <option value="">전체</option>
                        <option value="TTA001">견인 배정</option>
                        <option value="TTA002">견인중</option>
                        <option value="TTA003">차주 인계</option>
                        <option value="TTA004">견인 완료</option>
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
                          <option disabled value="">전체</option>
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
                    ><span>(</span>{{ allotData.length }}<span>건)</span></span
                  >
                </p>
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
                    <!-- <col width="" /> -->
                  </colgroup>
                  <thead>
                    <tr>
                      <th rowspan="2">NO</th>
                      <th rowspan="2">단속 차량 번호</th>
                      <th rowspan="2">견인 위치</th>
                      <th rowspan="2">기사명</th>
                      <th rowspan="2">기사 전화 번호</th>
                      <th rowspan="2">회사명</th>
                      <th rowspan="2">안내장출력여부</th>
                      <th rowspan="2">견인처리상태</th>
                      <th rowspan="2">견인일시</th>
                      <th rowspan="2">견인종료일시</th>
                      <!-- <th rowspan="2">수정</th> -->
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(info, index) in allotData"
                      v-show="setPaginate(index)"
                      :key="index"
                    >
                      <td>{{ info.page }}</td>
                      <td
                        @click="openPopUp('modify', info)"
                        style="color: blue; cursor: pointer"
                      >
                        {{ info.vdaCarNo }}
                      </td>
                      <td>{{ info.vdaViolationLocation }}</td>
                      <td>
                        {{ info.dmaMemName }}
                      </td>
                      <td>{{ info.dmaMemPhone }}</td>
                      <td>{{ info.tciCompanyName }}</td>
                      <td>{{ info.tadPrintYn }}</td>
                      <td v-if="info.tadTowStatus === 'TTA001'">견인배정</td>
                      <td v-else-if="info.tadTowStatus === 'TTA002'">견인중</td>
                      <td v-else-if="info.tadTowStatus === 'TTA003'">
                        차주인계
                      </td>
                      <td v-else>견인완료</td>
                      <td>{{ info.tadTowDate }}</td>
                      <td v-if="info.tadEndDate">{{ info.tadEndDate }}</td>
                      <td v-else>-</td>
                      <!-- <td
                        @click="openPopUp('modify', info)"
                        style="color: blue; cursor: pointer"
                      >
                        수정
                      </td> -->
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
    <popupRegistAllot v-if="popupRegistAllot" @closePopup="closePopup()" />
    <popupModifyAllot
      v-if="popupModifyAllot"
      @closePopup="closePopup()"
      :data="selectedData"
    />
    <popupDetailAllot
      v-if="popupDetailAllot"
      @closePopup="closePopup()"
      :data="selectedData"
    />
  </div>
</template>
<script>
import * as Xlsx from "xlsx";
import { computed, ref } from "vue";
import axios from "@/axios";
import popupRegistAllot from "../../components/popupRegistAllot.vue";
import popupModifyAllot from "../../components/popupModifyAllot.vue";
import popupDetailAllot from "../../components/popupDetailAllot.vue";
import leftMenu from "../../components/leftMenu.vue";

export default {
  components: {
    popupRegistAllot,
    popupModifyAllot,
    popupDetailAllot,
    leftMenu,
  },
  setup() {
    const where = ref("allot");
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
    const getAllotResult = ref("");

    const allotData = ref([]);
    const selectedData = ref();

    // 견인 프로젝트 변수들
    const dmaMemNo = ref("");
    const tadSeqNo = ref("");
    const tadTowDate = ref("");
    const tadTowStatus = ref("");
    const tsiSeqNo = ref("");
    const vdaSeqNo = ref("");
    const tadPrintYn = ref("");
    // pagenations
    const paginate = ref(20);
    const pageCount = ref(10);
    const paginate_total = ref(0);
    const current = ref(1);
    // 팝업 제어
    const popupRegistAllot = ref(false);
    const popupModifyAllot = ref(false);
    const popupDetailAllot = ref(false);
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
      try {
        axios
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
          companys.value.selected = false;
        }
      } catch (err) {
        alert(err);
      }
    };
    const selectGu = () => {
      console.log(gu.value.selectedData);
      try {
        axios
          .post("https://bie.autogram.co.kr/api/v1/company/get", {
            aciRegionCode: gu.value.selectedData.aciRegionCode,
          })
          .then((res) => {
            companys.value.datas = res.data;
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
    const getList = () => {
      try {
        axios
          .post("https://bie.autogram.co.kr/api/v1/tow_allot/get", {})
          .then((res) => {
            console.log(res);
            allotData.value = res.data;
            // 검색 결과 인덱스 반대로 변경
            for (let i = 0; i < allotData.value.length; i++) {
              allotData.value[i].page = allotData.value.length - i;
            }
            getAllotResult.value = res.data;
            // 페이지네이션 페이지 계산
            paginate_total.value = Math.ceil(
              getAllotResult.value.length / paginate.value
            );
          });
      } catch (err) {
        alert(err);
      }
    };

    const getSearch = () => {
      current.value = 1;
      getAllotResult.value = "";
      console.log(companys.value.selectedData);
      try {
        axios
          .post("https://bie.autogram.co.kr/api/v1/tow_allot/get", {
            dmaMemNo: dmaMemNo.value,
            tadSeqNo: tadSeqNo.value,
            tadTowStatus: tadTowStatus.value,
            tsiSeqNo: tsiSeqNo.value,
            vdaSeqNo: vdaSeqNo.value,

            // 지역정보, 업체 번호 추가 해야 함
            aciSidoName: si.value.selectedData,
            aciSigunguName: gu.value.selectedData.aciSigunguName,
            tciCompanyNo: companys.value.selectedData,
          })
          .then((res) => {
            if (res.data.length < 1) {
              alert("검색 결과가 0건 입니다.");
            }
            console.log(res);
            allotData.value = res.data;
            // 검색 결과 인덱스 반대로 변경
            for (let i = 0; i < allotData.value.length; i++) {
              allotData.value[i].page = allotData.value.length - i;
            }
            // 페이지네이션 페이지 계산
            getAllotResult.value = res.data;
            paginate_total.value = Math.ceil(
              getAllotResult.value.length / paginate.value
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
      const workSheet = Xlsx.utils.json_to_sheet(getAllotResult.value);
      Xlsx.utils.book_append_sheet(workBook, workSheet, "차량 배정 관리");
      Xlsx.writeFile(workBook, "output.xlsx");
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
        popupRegistAllot.value = true;
      } else if (opt === "modify") {
        popupModifyAllot.value = true;
        selectedData.value = data;
      } else if (opt === "detail") {
        popupDetailAllot.value = true;
        selectedData.value = data;
      }
    };
    const closePopup = () => {
      popupRegistAllot.value = false;
      popupModifyAllot.value = false;
      popupDetailAllot.value = false;
    };
    getList();
    getLocationSi();

    return {
      where,
      // 견인
      dmaMemNo,
      tadPrintYn,
      tadSeqNo,
      tadTowDate,
      tadTowStatus,
      tsiSeqNo,
      vdaSeqNo,
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
      getAllotResult,
      paginate,
      paginate_total,
      current,
      pageCount, // 페이지 버튼 최대 개수
      allotData,
      selectedData,
      popupRegistAllot, // 등록 팝업
      popupModifyAllot, // 수정 팝업
      popupDetailAllot,
      // 지역별, 업체별 검색 조건
      si,
      gu,
      companys,
      selectSi,
      selectGu,
      selectCompany,
      getLocationSi,
      getSearch,
      getList,
      makeExcelFile5,
      return_date,
      set_year,
      set_month,
      set_weak,
      set_today,
      set_yes,
      return_one,
      updateCurrent,
      setPaginate,
      paginate_total_unit,
      maxPage,
      startPage,
      endPage,
      closePopup,
      openPopUp,
    };
  },
};
</script>
<style>
.test {
  text-align: right;
}
</style>
