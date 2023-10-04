<template>
  <div>
    <div id="wrapper">
      <div id="container">
        <section class="sales">
          <div class="breadcrumb">
            <router-link to="/Home">HOME</router-link>
            <p>견인 기사 관리</p>
          </div>
          <div class="contents">
            <h2 class="title title_sale">견인 기사 관리</h2>
            <div class="contents_area">
              <form autocomplete="off">
                <div class="contents_area-search">
                  <div class="select MT20">
                    <div class="input_box MR30">
                      <label for="number">견인 기사 번호</label>
                      <input
                        type="text"
                        id="number"
                        placeholder="견인 기사 번호 입력"
                        v-model="dmaMemId"
                        v-on:keydown.enter.prevent="get_search"
                      />
                    </div>
                    <div class="input_box MR30">
                      <label for="number">ID</label>
                      <input
                        type="text"
                        id="number"
                        placeholder="견인 기사 ID 입력"
                        v-model="dmaMemId"
                        v-on:keydown.enter.prevent="get_search"
                      />
                    </div>
                    <div class="input_box MR30">
                      <label for="number">업체 번호</label>
                      <input
                        type="text"
                        id="number"
                        placeholder="업체 번호 입력"
                        v-model="sea_id"
                        v-on:keydown.enter.prevent="get_search"
                      />
                    </div>
                    <div class="select_box MR30">
                      <label for="approve">기사 상태</label>
                      <select name="" id="approve" v-model="dmaMemStatus">
                        <option disabled value="">기사 상태 선택</option>
                        <option value="">전체</option>
                        <option value="COYP001">대기중</option>
                        <option value="COYP002">견인중</option>
                      </select>
                    </div>
                    <div class="select_box MR30">
                      <label for="purchase">비밀번호 재설정 여부</label>
                      <select name="" id="purchase" v-model="dmaPwdRequest">
                        <option disabled value="">재설정 여부</option>
                        <option value="">전체</option>
                        <option value="Y">Y</option>
                        <option value="N">N</option>
                      </select>
                    </div>
                  </div>
                  <div
                    class="select MT30"
                    style="justify-content: space-between"
                  >
                    <div style="display: flex; width: 80%">
                      <div class="input_box MR30">
                        <label for="number">차량번호</label>
                        <input
                          type="text"
                          id="number"
                          placeholder="차량번호 입력"
                          v-model="dmaCarNo"
                          v-on:keydown.enter.prevent="get_search"
                        />
                      </div>
                      <div class="input_box MR30">
                        <label for="number">이름</label>
                        <input
                          type="text"
                          id="number"
                          placeholder="견인 기사 이름 입력"
                          v-model="dmaMemName"
                          v-on:keydown.enter.prevent="get_search"
                        />
                      </div>
                      <div class="input_box MR30">
                        <label for="number">연락처</label>
                        <input
                          type="text"
                          id="number"
                          placeholder="연락처 입력"
                          v-model="dmaMemPhone"
                          v-on:keydown.enter.prevent="get_search"
                        />
                      </div>
                    </div>
                    <div style="display: flex">
                      <button
                        type="button"
                        class="btn_blue btn_search ML10 MR20"
                        @click="get_search"
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
                    ><span>(</span>{{ payData.length }}<span>건)</span></span
                  >
                </p>
                <p class="btnRight">
                  <button
                    type="button"
                    class="btn_add btn_red"
                    @click="openPopUp('add')"
                  >
                    견인기사등록
                  </button>
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
                      <th rowspan="2">기사 번호</th>
                      <th rowspan="2">ID</th>
                      <!-- <th rowspan="2">충전 이용시간</th> -->
                      <th rowspan="2">업체 번호</th>
                      <!-- <th rowspan="2">커넥터</th> -->
                      <!-- <th rowspan="2">할인 요금</th> -->
                      <th rowspan="2">기사 상태</th>
                      <th rowspan="2">이름</th>
                      <th rowspan="2">연락처</th>
                      <th rowspan="2">차량 번호</th>
                      <th rowspan="2">가입 일시</th>
                      <th rowspan="2">승인 일시</th>
                      <th rowspan="2">비밀번호 재설정 여부</th>
                      <th rowspan="2">충전 일시</th>
                      <th rowspan="2">수정</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(info, index) in payData"
                      v-show="setPaginate(index)"
                      :key="index"
                    >
                      <td class="right">{{ info.page }}</td>
                      <td>{{ info.pyudCarNo }}</td>
                      <td>{{ info.usdCarType }}</td>
                      <!-- <td>{{ info.pyudChargeTime }}</td> -->
                      <td v-if="info.pyudChargeType">
                        {{
                          info.pyudChargeType === "COYP001" ? "급속" : "완속"
                        }}
                      </td>
                      <td v-else>-</td>
                      <!-- <td v-if="info.cinCodeName">{{ info.cinCodeName }}</td>
                      <td v-else>-</td> -->
                      <!-- <td>{{ info.pyudDcFee }}</td> -->
                      <td>{{ info.pyudId }}</td>
                      <td>{{ info.pyudIsUse }}</td>
                      <td v-if="info.pdaName">{{ info.pdaName }}</td>
                      <td v-else>-</td>
                      <td v-if="info.chnNo">{{ info.chnNo }}</td>
                      <td v-else>-</td>
                      <td>{{ info.pyudPayDate }}</td>
                      <td style="text-align: right">{{ info.pyudPayFee }}</td>
                      <td>{{ info.pyudPayType }}</td>
                      <td v-if="info.pyudUseDate">
                        {{ info.pyudUseDate }}
                      </td>
                      <td v-else>-</td>
                      <td
                        @click="openPopUp('modify')"
                        style="color: blue; cursor: pointer"
                      >
                        수정
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
    <popupRegistDriver v-if="popupRegistDriver" @closePopup="closePopup()" />
    <popupModifyDriver v-if="popupModifyDriver" @closePopup="closePopup()" />
  </div>
</template>
<script>
import * as Xlsx from "xlsx";
import { computed, ref } from "vue";
import axios from "@/axios";
import popupRegistDriver from "../../components/popupRegistDriver.vue";
import popupModifyDriver from "../../components/popupModifyDriver.vue";

export default {
  components: {
    popupRegistDriver,
    popupModifyDriver,
  },
  setup() {
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

    const payData = ref([]);

    // 견인 프로젝트 변수들
    const dmaMemNo = ref("");
    const dmaMemId = ref("");
    const tciCompanyNo = ref("");
    const dmaMemStatus = ref("");
    const dmaMemName = ref("");
    const dmaMemPhone = ref("");
    const dmaCarNo = ref("");
    const dmaPwdRequest = ref("");
    // pagenations
    const paginate = ref(20);
    const pageCount = ref(10);
    const paginate_total = ref(0);
    const current = ref(1);
    // 팝업 제어
    const popupRegistDriver = ref(false);
    const popupModifyDriver = ref(false);

    const getList = () => {
      try {
        axios
          .post("/admin/payment", {
            headers: {
              auth_key: "c83b4631-ff58-43b9-8646-024b12193202",
            },
          })
          .then((res) => {
            // console.log(res);
            payData.value = res.data;
            // 검색 결과 인덱스 반대로 변경
            for (let i = 0; i < payData.value.length; i++) {
              payData.value[i].page = payData.value.length - i;
            }
            get_payresult.value = res.data;
            // 페이지네이션 페이지 계산
            paginate_total.value = Math.ceil(
              get_payresult.value.length / paginate.value
            );

            // 금액에 콤마 찍기
            for (let i = 0; i < payData.value.length; i++) {
              payData.value[i].pyudPayFee = payData.value[i].pyudPayFee
                .toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
            }
          });
      } catch (err) {
        alert(err);
      }
    };

    const get_search = () => {
      current.value = 1;
      get_payresult.value = "";
      try {
        axios
          .post("/admin/payment", {
            pyudChargeType: sea_pat.value,
            pyudConnName: sea_wtt.value,
            pyudIsUse: sea_wut.value,
            pyudCarNo: sea_carnum.value,
            chnNo: sea_charger.value,
            pdaName: sea_place_name.value,
            pyudId: sea_id.value,
          })
          .then((res) => {
            console.log(res);
            payData.value = res.data;
            // 검색 결과 인덱스 반대로 변경
            for (let i = 0; i < payData.value.length; i++) {
              payData.value[i].page = payData.value.length - i;
            }
            // 페이지네이션 페이지 계산
            get_payresult.value = res.data;
            paginate_total.value = Math.ceil(
              get_payresult.value.length / paginate.value
            );
            // 금액에 콤마 찍기
            for (let i = 0; i < payData.value.length; i++) {
              payData.value[i].pyudPayFee = payData.value[i].pyudPayFee
                .toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
            }
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
    const get_select = () => {
      axios
        .post("/admin/getCodeSubList", {
          code_type: "WTT",
        })
        .then((res) => {
          get_wtt.value = res.data;
        });
      axios
        .post("/admin/getCodeSubList", {
          code_type: "PAT",
        })
        .then((res) => {
          get_pat.value = res.data;
        });
      axios
        .post("/admin/getCodeSubList", {
          code_type: "WUT",
        })
        .then((res) => {
          get_wut.value = res.data;
        });
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
      Xlsx.utils.book_append_sheet(workBook, workSheet, "매출");
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
    const openPopUp = (data) => {
      console.log(data);
      if (data === "add") {
        popupRegistDriver.value = true;
      } else if (data === "modify") {
        popupModifyDriver.value = true;
      }
    };
    const closePopup = () => {
      popupRegistDriver.value = false;
      popupModifyDriver.value = false;
    };
    getList();

    return {
      // 견인
      dmaMemNo,
      dmaMemId,
      dmaMemStatus,
      dmaMemName,
      dmaMemPhone,
      dmaCarNo,
      dmaPwdRequest,
      tciCompanyNo,
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
      payData,
      popupRegistDriver, // 등록 팝업
      popupModifyDriver, // 수정 팝업
      get_search,
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
      get_select,
      return_one,
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
