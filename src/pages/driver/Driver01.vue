<template>
  <div>
    <div id="wrapper">
      <leftMenu :data="where"></leftMenu>
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
                    <!-- <div class="input_box MR30">
                      <label for="number">견인 기사 번호</label>
                      <input
                        type="text"
                        id="number"
                        placeholder="견인 기사 번호 입력"
                        v-model="dmaMemNo"
                        v-on:keydown.enter.prevent="getSearch"
                      />
                    </div> -->
                    <div class="input_box MR30">
                      <label for="id">ID</label>
                      <input
                        type="text"
                        id="id"
                        placeholder="견인 기사 ID 입력"
                        v-model="dmaMemId"
                        v-on:keydown.enter.prevent="getSearch"
                      />
                    </div>
                    <div class="input_box MR30">
                      <label for="company">업체명</label>
                      <input
                        type="text"
                        id="company"
                        placeholder="업체명 입력"
                        v-model="tciCompanyName"
                        v-on:keydown.enter.prevent="getSearch"
                      />
                    </div>
                    <div class="select_box MR30">
                      <label for="status">기사 상태</label>
                      <select
                        name=""
                        id="status"
                        v-model="dmaMemStatus"
                        @change="getSearch()"
                      >
                        <option disabled value="">기사 상태 선택</option>
                        <option value="">전체</option>
                        <option value="DMS001">신청</option>
                        <option value="DMS002">승인</option>
                        <option value="DMS003">거절</option>
                        <option value="DMS004">퇴사</option>
                      </select>
                    </div>
                    <div class="select_box MR30">
                      <label for="purchase">비밀번호 재설정 여부</label>
                      <select
                        name=""
                        id="purchase"
                        v-model="dmaPwdRequest"
                        @change="getSearch()"
                      >
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
                        <label for="car">차량번호</label>
                        <input
                          type="text"
                          id="car"
                          placeholder="차량번호 입력"
                          v-model="dmaCarNo"
                          v-on:keydown.enter.prevent="getSearch"
                        />
                      </div>
                      <div class="input_box MR30">
                        <label for="name">이름</label>
                        <input
                          type="text"
                          id="name"
                          placeholder="견인 기사 이름 입력"
                          v-model="dmaMemName"
                          v-on:keydown.enter.prevent="getSearch"
                        />
                      </div>
                      <div class="input_box MR30">
                        <label for="phone">연락처</label>
                        <input
                          type="text"
                          id="phone"
                          placeholder="연락처 입력"
                          v-model="dmaMemPhone"
                          v-on:keydown.enter.prevent="getSearch"
                        />
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
                    ><span>(</span>{{ driverData.length }}<span>건)</span></span
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
                  </colgroup>
                  <thead>
                    <tr>
                      <th rowspan="2">NO</th>
                      <th rowspan="2">ID</th>
                      <th rowspan="2">업체명</th>
                      <th rowspan="2">기사 상태</th>
                      <th rowspan="2">이름</th>
                      <th rowspan="2">연락처</th>
                      <th rowspan="2">차량 번호</th>
                      <th rowspan="2">가입 일시</th>
                      <th rowspan="2">승인 일시</th>
                      <th rowspan="2">비밀번호 재설정 여부</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(info, index) in driverData"
                      v-show="setPaginate(index)"
                      :key="index"
                    >
                      <td>{{ info.page }}</td>
                      <td
                        @click="openPopUp('modify', info)"
                        style="color: blue; cursor: pointer"
                      >
                        {{ info.dmaMemId }}
                      </td>
                      <td>{{ info.tciCompanyName }}</td>
                      <td v-if="info.dmaMemStatus === 'DMS001'">신청</td>
                      <td v-else-if="info.dmaMemStatus === 'DMS002'">승인</td>
                      <td v-else-if="info.dmaMemStatus === 'DMS003'">거절</td>
                      <td v-else-if="info.dmaMemStatus === 'DMS004'">퇴사</td>
                      <td>{{ info.dmaMemName }}</td>
                      <td>{{ info.dmaMemPhone }}</td>
                      <td v-if="info.dmaCarNo">{{ info.dmaCarNo }}</td>
                      <td v-else>-</td>
                      <td>{{ info.dmaRegDate }}</td>
                      <td v-if="info.dmaApprovalDate">
                        {{ info.dmaApprovalDate }}
                      </td>
                      <td v-else>-</td>
                      <td>{{ info.dmaPwdRequest }}</td>
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
    <popupRegistDriver v-if="popupRegistDriver" @closePopup="closePopup()" />
    <popupModifyDriver
      v-if="popupModifyDriver"
      :data="selectedData"
      @closePopup="closePopup()"
    />
    <popupDetailDriver
      v-if="popupDetailDriver"
      :data="selectedData"
      @closePopup="closePopup()"
    />
  </div>
</template>
<script>
import * as Xlsx from "xlsx";
import { computed, ref } from "vue";
import axios from "@/axios";
import popupRegistDriver from "../../components/popupRegistDriver.vue";
import popupModifyDriver from "../../components/popupModifyDriver.vue";
import popupDetailDriver from "../../components/popupDetailDriver.vue";
import leftMenu from "../../components/leftMenu.vue";

export default {
  components: {
    popupRegistDriver,
    popupModifyDriver,
    popupDetailDriver,
    leftMenu,
  },
  setup() {
    const where = ref("driver");
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

    // 견인 프로젝트 변수들
    const dmaMemNo = ref("");
    const dmaMemId = ref("");
    const tciCompanyNo = ref("");
    const tciCompanyName = ref("");
    const dmaMemStatus = ref("");
    const dmaMemName = ref("");
    const dmaMemPhone = ref("");
    const dmaCarNo = ref("");
    const dmaPwdRequest = ref("");
    // responses
    const driverData = ref([]);
    const getDriverResult = ref("");
    // 수정할때 팝업으로 보내는 데이터
    const selectedData = ref();
    // pagenations
    const paginate = ref(20);
    const pageCount = ref(10);
    const paginate_total = ref(0);
    const current = ref(1);
    // 팝업 제어
    const popupRegistDriver = ref(false);
    const popupModifyDriver = ref(false);
    const popupDetailDriver = ref(false);

    const getList = () => {
      try {
        axios
          .post("https://bie.autogram.co.kr/api/v1/driver/get", {})
          .then((res) => {
            console.log(res.data);
            driverData.value = res.data.reverse();
            // 검색 결과 인덱스 반대로 변경
            for (let i = 0; i < driverData.value.length; i++) {
              driverData.value[i].page = driverData.value.length - i;
            }
            getDriverResult.value = res.data;
            // 페이지네이션 페이지 계산
            paginate_total.value = Math.ceil(
              getDriverResult.value.length / paginate.value
            );
          });
      } catch (err) {
        alert(err);
      }
    };

    const getSearch = async () => {
      current.value = 1;
      getDriverResult.value = "";

      try {
        // 업체 명으로 업체 번호 찾기
        if (tciCompanyName.value.length > 0) {
          await axios
            .post("https://bie.autogram.co.kr/api/v1/company/get", {
              tciCompanyName: tciCompanyName.value,
            })
            .then((res) => {
              console.log(res.data[0]);
              tciCompanyNo.value = res.data[0].tciCompanyNo;
            });
        } else {
          tciCompanyNo.value = "";
        }
        // 기사 정보 조회
        await axios
          .post("https://bie.autogram.co.kr/api/v1/driver/get", {
            dmaMemNo: dmaMemNo.value,
            dmaMemId: dmaMemId.value,
            dmaMemStatus: dmaMemStatus.value,
            dmaMemName: dmaMemName.value,
            dmaMemPhone: dmaMemPhone.value,
            dmaCarNo: dmaCarNo.value,
            dmaPwdRequest: dmaPwdRequest.value,
            tciCompanyNo: tciCompanyNo.value,
          })
          .then((res) => {
            console.log(res.data);
            driverData.value = res.data.reverse();
            // 검색 결과 인덱스 반대로 변경
            for (let i = 0; i < driverData.value.length; i++) {
              driverData.value[i].page = driverData.value.length - i;
            }
            // 페이지네이션 페이지 계산
            getDriverResult.value = res.data;
            paginate_total.value = Math.ceil(
              getDriverResult.value.length / paginate.value
            );
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
      const year = d.getFullYear(); // 년
      const month = d.getMonth() + 1; // 월
      const day = d.getDate();
      const b_year = b.getFullYear(); // 년
      const b_month = b.getMonth(); // 월
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
    const makeExcelFile5 = () => {
      const workBook = Xlsx.utils.book_new();
      const workSheet = Xlsx.utils.json_to_sheet(getDriverResult.value);
      Xlsx.utils.book_append_sheet(workBook, workSheet, "견인 기사 관리");
      Xlsx.writeFile(workBook, "견인 기사 관리.xlsx");
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
        popupRegistDriver.value = true;
      } else if (opt === "modify") {
        popupModifyDriver.value = true;
        selectedData.value = data;
      } else if (opt === "detail") {
        popupDetailDriver.value = true;
        selectedData.value = data;
      }
    };
    const closePopup = () => {
      popupRegistDriver.value = false;
      popupModifyDriver.value = false;
      popupDetailDriver.value = false;
    };
    getList();

    return {
      where,
      // 견인
      dmaMemNo,
      dmaMemId,
      dmaMemStatus,
      dmaMemName,
      dmaMemPhone,
      dmaCarNo,
      dmaPwdRequest,
      tciCompanyNo,
      tciCompanyName,
      selectedData,
      driverData,
      getDriverResult,
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
      paginate,
      paginate_total,
      current,
      pageCount, // 페이지 버튼 최대 개수
      popupRegistDriver, // 등록 팝업
      popupModifyDriver, // 수정 팝업
      popupDetailDriver,
      getSearch,
      getList,
      makeExcelFile5,
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
    };
  },
};
</script>
<style>
.test {
  text-align: right;
}
</style>
