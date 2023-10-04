<template>
  <div>
    <div id="wrapper">
      <leftMenu :data="where"></leftMenu>
      <div id="container">
        <section class="sales">
          <div class="breadcrumb">
            <router-link to="/Home">HOME</router-link>
            <p>관리자 관리</p>
          </div>
          <div class="contents">
            <h2 class="title title_sale">관리자 관리</h2>
            <div class="contents_area">
              <form autocomplete="off">
                <div class="contents_area-search">
                  <div class="select MT20">
                    <div class="input_box MR30">
                      <label for="adminId">관리자 ID</label>
                      <input
                        type="text"
                        id="adminId"
                        placeholder="관리자 ID 입력"
                        v-model="aiaAdminId"
                        v-on:keydown.enter.prevent="getSearch"
                      />
                    </div>
                    <div class="input_box MR30">
                      <label for="adminNm">관리자명</label>
                      <input
                        type="text"
                        id="adminNm"
                        placeholder="관리자명 입력"
                        v-model="aiaAdminName"
                        v-on:keydown.enter.prevent="getSearch"
                      />
                    </div>
                    <div class="input_box MR30">
                      <label for="phoneNo">연락처</label>
                      <input
                        type="text"
                        id="phoneNo"
                        placeholder="연락처"
                        v-model="aiaTelNo"
                        v-on:keydown.enter.prevent="getSearch"
                      />
                    </div>
                    <div class="select_box MR30">
                      <label for="approve">관리자 구분</label>
                      <select
                        name=""
                        id="approve"
                        v-model="aiaAdminType"
                        @change="getSearch()"
                      >
                        <option disabled value="">관리자 구분</option>
                        <option value="">전체</option>
                        <option value="AAT001">전체관리자</option>
                        <option value="AAT002">단속정보등록자</option>
                        <option value="AAT003">견인보관소</option>
                      </select>
                    </div>
                    <div class="select_box MR30">
                      <label for="purchase">관리자 상태</label>
                      <select
                        name=""
                        id="purchase"
                        v-model="aiaAdminStatus"
                        @change="getSearch()"
                      >
                        <option disabled value="">관리자 상태</option>
                        <option value="">전체</option>
                        <option value="AAS001">정상</option>
                        <option value="AAS002">퇴사</option>
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
                      <!-- <div
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
                      </div> -->
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
                    ><span>(</span>{{ adminData.length }}<span>건)</span></span
                  >
                </p>
                <p class="btnRight">
                  <button
                    type="button"
                    class="btn_add btn_red"
                    @click="openPopUp('add')"
                  >
                    관리자 등록
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
                    <!-- <col width="" /> -->
                  </colgroup>
                  <thead>
                    <tr>
                      <th rowspan="2">NO</th>
                      <th rowspan="2">ID</th>
                      <th rowspan="2">관리자명</th>
                      <th rowspan="2">연락처</th>
                      <th rowspan="2">관리자구분</th>
                      <th rowspan="2">담당지역</th>
                      <th rowspan="2">관리자상태</th>
                      <th rowspan="2">등록일시</th>
                      <!-- <th rowspan="2">수정</th> -->
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(info, index) in adminData"
                      v-show="setPaginate(index)"
                      :key="index"
                    >
                      <td class="right">{{ info.page }}</td>
                      <td
                        @click="openPopUp('modify', info)"
                        style="color: blue; cursor: pointer"
                      >
                        {{ info.aiaAdminId }}
                      </td>
                      <td>{{ info.aiaAdminName }}</td>
                      <td>{{ info.aiaTelNo }}</td>
                      <td v-if="info.aiaAdminType === 'AAT001'">전체 관리자</td>
                      <td v-else-if="info.aiaAdminType === 'AAT002'">
                        단속 정보 등록자
                      </td>
                      <td v-else>견인보관소</td>
                      <td v-if="info.aiaAdminType === 'AAT001'">-</td>
                      <td v-else>
                        {{ info.aciSidoName }} {{ info.aciSigunguName }}
                      </td>
                      <td v-if="info.aiaAdminStatus === 'AAS001'">정상</td>
                      <td v-else>퇴사</td>
                      <td>{{ info.aiaRegDate }}</td>
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
    <popupRegistAdmin v-if="popupRegistAdmin" @closePopup="closePopup()" />
    <popupModifyAdmin
      v-if="popupModifyAdmin"
      @closePopup="closePopup()"
      :data="selectedData"
    />
    <popupDetailAdmin
      v-if="popupDetailAdmin"
      @closePopup="closePopup()"
      :data="selectedData"
    />
  </div>
</template>
<script>
import * as Xlsx from "xlsx";
import { computed, ref } from "vue";
import axios from "@/axios";
import popupRegistAdmin from "../../components/popupRegistAdmin.vue";
import popupModifyAdmin from "../../components/popupModifyAdmin.vue";
import popupDetailAdmin from "../../components/popupDetailAdmin.vue";

import leftMenu from "../../components/leftMenu.vue";

export default {
  components: {
    popupRegistAdmin,
    popupModifyAdmin,
    popupDetailAdmin,
    leftMenu,
  },
  setup() {
    const where = ref("admin");
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
    const adminData = ref([]);
    // 견인 프로젝트 변수들
    const aiaAdminId = ref("");
    const aiaAdminName = ref("");
    const aiaAdminStatus = ref("");
    const aiaAdminType = ref("");
    const aiaRegDate = ref("");
    const aiaRegionCode = ref("");
    const aiaTelNo = ref("");
    const selectedData = ref();
    // pagenations
    const paginate = ref(20);
    const pageCount = ref(10);
    const paginate_total = ref(0);
    const current = ref(1);
    // 팝업 제어
    const popupRegistAdmin = ref(false);
    const popupModifyAdmin = ref(false);
    const popupDetailAdmin = ref(false);
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
        aiaRegionCode.value = gu.value.selectedData.aciRegionCode;
        getSearch();
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
          .post("https://bie.autogram.co.kr/api/v1/admin/get", {})
          .then((res) => {
            console.log(res);
            adminData.value = res.data;
            // 검색 결과 인덱스 반대로 변경
            for (let i = 0; i < adminData.value.length; i++) {
              adminData.value[i].page = adminData.value.length - i;
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
      current.value = 1;
      get_payresult.value = "";
      try {
        axios
          .post("https://bie.autogram.co.kr/api/v1/admin/get", {
            aiaAdminId: aiaAdminId.value,
            aiaAdminName: aiaAdminName.value,
            aiaTelNo: aiaTelNo.value,
            aiaAdminType: aiaAdminType.value,
            aiaAdminStatus: aiaAdminStatus.value,
            aiaRegionCode: aiaRegionCode.value,
          })
          .then((res) => {
            if (res.data.length < 1) {
              alert("검색 결과가 0건 입니다.");
            }
            adminData.value = res.data;
            // 검색 결과 인덱스 반대로 변경
            for (let i = 0; i < adminData.value.length; i++) {
              adminData.value[i].page = adminData.value.length - i;
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
    const return_date = (date) => {
      let today = new Date(date);
      today.setHours(today.getHours() + 9);
      return today.toISOString().replace("T", " ").substring(0, 19);
    };
    const makeExcelFile5 = () => {
      const workBook = Xlsx.utils.book_new();
      const workSheet = Xlsx.utils.json_to_sheet(get_payresult.value);
      Xlsx.utils.book_append_sheet(workBook, workSheet, "관리자");
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
        popupRegistAdmin.value = true;
      } else if (opt === "modify") {
        popupModifyAdmin.value = true;
        selectedData.value = data;
      } else if (opt === "detail") {
        popupDetailAdmin.value = true;
        selectedData.value = data;
      }
    };
    const closePopup = () => {
      popupRegistAdmin.value = false;
      popupModifyAdmin.value = false;
      popupDetailAdmin.value = false;
    };
    getList();
    getLocationSi();

    return {
      where,
      // 견인
      aiaAdminId,
      aiaAdminName,
      aiaAdminStatus,
      aiaAdminType,
      aiaRegDate,
      aiaRegionCode,
      aiaTelNo,
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
      adminData,
      popupRegistAdmin, // 등록 팝업
      popupModifyAdmin, // 수정 팝업
      popupDetailAdmin, // 상세 팝업
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
      // 지역별, 업체별 검색 조건
      si,
      gu,
      companys,
      getLocationSi,
      selectSi,
      selectGu,
      selectCompany,
    };
  },
};
</script>
<style>
.test {
  text-align: right;
}
</style>
