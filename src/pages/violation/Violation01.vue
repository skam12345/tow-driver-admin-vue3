<template>
  <div>
    <div id="wrapper">
      <leftMenu :data="where"></leftMenu>
      <div id="container">
        <section class="sales">
          <div class="breadcrumb">
            <router-link to="/Home">HOME</router-link>
            <p>단속 대상 차량 관리</p>
          </div>
          <div class="contents">
            <h2 class="title title_sale">단속 대상 차량 관리</h2>
            <div class="contents_area">
              <form autocomplete="off">
                <div class="contents_area-search">
                  <div class="select MT20">
                    <div class="input_box MR30">
                      <label for="vdaCarNo">단속 차량 번호</label>
                      <input
                        type="text"
                        id="vdaCarNo"
                        placeholder="12가1234"
                        v-model="vdaCarNo"
                        v-on:keydown.enter.prevent="getSearch"
                      />
                    </div>
                    <div class="input_box MR30">
                      <label for="vdaViolationArea">단속 차량 위치</label>
                      <input
                        type="text"
                        id="vdaViolationArea"
                        placeholder="단속 차량 위치 입력"
                        v-model="vdaViolationArea"
                        v-on:keydown.enter.prevent="getSearch"
                      />
                    </div>
                    <div class="input_box MR30">
                      <label for="vdaViolationLocation">단속 차량 장소</label>
                      <input
                        type="text"
                        id="vdaViolationLocation"
                        placeholder="단속 차량 장소 입력"
                        v-model="vdaViolationLocation"
                        v-on:keydown.enter.prevent="getSearch"
                      />
                    </div>
                    <div class="select_box MR30">
                      <label for="status">단속 차량 상태</label>
                      <select
                        name=""
                        id="status"
                        v-model="vdaViolationStatus"
                        @change="getSearch()"
                      >
                        <option disabled value="">단속 차량 상태</option>
                        <option value="">전체</option>
                        <option value="VVS001">견인 접수</option>
                        <option value="VVS002">견인 배정</option>
                        <option value="VVS003">처리 완료</option>
                        <option value="VVS004">차주 이동</option>
                      </select>
                    </div>
                  </div>
                  <div
                    class="select MT30"
                    style="justify-content: space-between"
                  >
                    <div style="display: flex; width: 80%">
                      <!-- <div class="select_box MR30">
                        <label for="status">단속 차량 상태</label>
                        <select
                          name=""
                          id="status"
                          v-model="vdaViolationStatus"
                          @change="getSearch()"
                        >
                          <option disabled value="">단속 차량 상태</option>
                          <option value="">전체</option>
                          <option value="VVS001">견인 접수</option>
                          <option value="VVS002">견인 배정</option>
                          <option value="VVS003">처리 완료</option>
                          <option value="VVS004">차주 이동</option>
                        </select>
                      </div> -->
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
                            :value="info.aciSigunguName"
                          >
                            {{ info.aciSigunguName }}
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
                    ><span>(</span>{{ violationData.length
                    }}<span>건)</span></span
                  >
                </p>
                <p class="btnRight">
                  <button
                    type="button"
                    class="btn_add btn_red"
                    @click="openPopUp('add')"
                  >
                    단속 대상 차량 등록
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
                  </colgroup>
                  <thead>
                    <tr>
                      <th rowspan="2">NO</th>
                      <th rowspan="2">단속차량번호</th>
                      <th rowspan="2">단속차량상태</th>
                      <th rowspan="2">단속차량장소</th>
                      <th rowspan="2">위반일시</th>
                      <th rowspan="2">위반내용</th>
                      <th rowspan="2">단속조</th>
                      <th rowspan="2">단속원</th>
                      <th rowspan="2">접수일시</th>
                      <th rowspan="2">견인배정일시</th>
                      <th rowspan="2">배정견인기사</th>
                      <th rowspan="2">배정</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(info, index) in violationData"
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
                      <td v-if="info.vdaViolationStatus === 'VVS001'">
                        견인접수
                      </td>
                      <td v-else-if="info.vdaViolationStatus === 'VVS002'">
                        견인배정
                      </td>
                      <td v-else-if="info.vdaViolationStatus === 'VVS003'">
                        처리완료
                      </td>
                      <td v-else-if="info.vdaViolationStatus === 'VVS004'">
                        차주이동
                      </td>
                      <td v-else>수락 대기</td>
                      <td>{{ info.vdaViolationLocation }}</td>
                      <td>
                        {{ info.vdaViolationDate }} {{ info.vdaViolationTime }}
                      </td>
                      <td>{{ info.vdaViolationDetail }}</td>
                      <td v-if="info.vdaViolationTeam">
                        {{ info.vdaViolationTeam }}
                      </td>
                      <td v-else>-</td>
                      <td v-if="info.vdaViolationOfficer">
                        {{ info.vdaViolationOfficer }}
                      </td>
                      <td v-else>-</td>
                      <td>{{ info.vdaRegDate }}</td>
                      <td v-if="info.vdaAllotDate">{{ info.vdaAllotDate }}</td>
                      <td v-else>-</td>
                      <td v-if="info.dmaMemName">{{ info.dmaMemName }}</td>
                      <td v-else>-</td>

                      <td
                        v-if="
                          info.vdaViolationStatus === 'VVS001' &&
                          adminType !== 'AAT002'
                        "
                        @click="openPopUp('violate', info)"
                        style="color: blue; cursor: pointer"
                      >
                        배정 하기
                      </td>
                      <td
                        v-else-if="
                          info.vdaViolationStatus === 'VVS002' &&
                          adminType !== 'AAT002'
                        "
                        @click="cencleVioltion(info, 'VVS002')"
                        style="color: red; cursor: pointer"
                      >
                        배정 취소
                      </td>
                      <td
                        v-else-if="
                          info.vdaViolationStatus === 'VVS005' &&
                          adminType !== 'AAT002'
                        "
                        @click="cencleVioltion(info, 'VVS005')"
                        style="color: red; cursor: pointer"
                      >
                        배정 취소
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
    <popupRegistViolation
      v-if="popupRegistViolation"
      @closePopup="closePopup()"
    />
    <popupModifyViolation
      v-if="popupModifyViolation"
      @closePopup="closePopup()"
      :data="modifyData"
    />
    <popupAllotViolation
      v-if="popupAllotViolation"
      @closePopup="closePopup()"
      :data="violateData"
    />
    <popupDetailViolation
      v-if="popupDetailViolation"
      @closePopup="closePopup()"
      :data="modifyData"
    />
    <KakaoMap2 />
  </div>
</template>
<script>
import { useRouter } from "vue-router";
import * as Xlsx from "xlsx";
import { computed, ref } from "vue";
import axios from "@/axios";
import popupRegistViolation from "../../components/popupRegistViolation.vue";
import popupModifyViolation from "../../components/popupModifyViolation.vue";
import popupAllotViolation from "../../components/popupAllotViolation.vue";
import popupDetailViolation from "../../components/popupDetailViolation.vue";
import leftMenu from "../../components/leftMenu.vue";

import KakaoMap2 from "@/components/KakaoMap2.vue";

export default {
  components: {
    popupRegistViolation,
    popupModifyViolation,
    popupAllotViolation,
    popupDetailViolation,
    leftMenu,
    KakaoMap2,
  },
  setup() {
    const router = useRouter();
    const where = ref("violation");
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

    // 지역정보 받아오기
    const locationSi = ref([]);
    const locationGu = ref([]);
    // 서버에서 받아온 데이터
    const violationData = ref([]);
    // 수정, 배정 시 선택한 데이터
    const modifyData = ref();
    const violateData = ref();

    // 견인 프로젝트 변수들
    const vdaSeqNo = ref("");
    const vdaCarNo = ref("");
    const vdaLatitude = ref("");
    const vdaLongitude = ref("");
    const vdaViolationArea = ref("");
    const vdaViolationLocation = ref("");
    const vdaViolationDate = ref("");
    const vdaViolationTime = ref("");
    const vdaViolationDetail = ref("");
    const vdaViolationTeam = ref("");
    const vdaViolationOfficer = ref("");
    const vdaViolationNo = ref("");
    const aiaAdminId = ref("");
    const vdaViolationStatus = ref("");
    const vdaRegDate = ref("");
    const vdaAllotDate = ref("");
    const aciRegionCode = ref("");
    // pagenations
    const paginate = ref(20);
    const pageCount = ref(10);
    const paginate_total = ref(0);
    const current = ref(1);
    // 팝업 제어
    const popupRegistViolation = ref(false);
    const popupModifyViolation = ref(false);
    const popupAllotViolation = ref(false);
    const popupDetailViolation = ref(false);
    const adminType = ref(localStorage.getItem("aiaAdminType"));

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
            console.log(res);
            gu.value.datas = res.data;
            gu.value.selectedData = "";
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
      try {
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
    const getList = () => {
      try {
        axios
          .post("https://bie.autogram.co.kr/api/v1/violation/get", {})
          .then((res) => {
            if (res.status === 200) {
              console.log(res);
              violationData.value = res.data;
              // 검색 결과에 순번 적용
              for (let i = 0; i < violationData.value.length; i++) {
                violationData.value[i].page = violationData.value.length - i;
              }
              violationData.value = res.data;
              // 페이지네이션 페이지 계산
              paginate_total.value = Math.ceil(
                violationData.value.length / paginate.value
              );
            } else {
              alert("오류가 발생했습니다.");
            }
          });
      } catch (err) {
        alert(err);
      }
    };

    const getSearch = () => {
      current.value = 1;
      violationData.value = "";
      try {
        axios
          .post("https://bie.autogram.co.kr/api/v1/violation/get", {
            vdaCarNo: vdaCarNo.value,
            vdaViolationArea: vdaViolationArea.value,
            vdaViolationLocation: vdaViolationLocation.value,
            vdaViolationDetail: vdaViolationDetail.value,
            vdaViolationOfficer: vdaViolationOfficer.value,
            vdaViolationStatus: vdaViolationStatus.value,
            aciRegionCode: aciRegionCode.value,
            aciSidoName: si.value.selectedData,
            aciSigunguName: gu.value.selectedData,
          })
          .then((res) => {
            if (res.data.length < 1) {
              alert("검색 결과가 0건 입니다.");
            }
            violationData.value = res.data;
            // 검색 결과 인덱스 반대로 변경
            for (let i = 0; i < violationData.value.length; i++) {
              violationData.value[i].page = violationData.value.length - i;
            }
            // 페이지네이션 페이지 계산
            violationData.value = res.data;
            paginate_total.value = Math.ceil(
              violationData.value.length / paginate.value
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
    const makeExcelFile5 = () => {
      const workBook = Xlsx.utils.book_new();
      const workSheet = Xlsx.utils.json_to_sheet(violationData.value);
      Xlsx.utils.book_append_sheet(workBook, workSheet, "단속 대상 차량");
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
      // console.log(opt);
      if (opt === "add") {
        popupRegistViolation.value = true;
      } else if (opt === "modify") {
        popupModifyViolation.value = true;
        modifyData.value = data;
      } else if (opt === "violate") {
        popupAllotViolation.value = true;
        violateData.value = data;
      } else if (opt === "detail") {
        popupDetailViolation.value = true;
        violateData.value = data;
      }
    };
    const closePopup = () => {
      popupRegistViolation.value = false;
      popupModifyViolation.value = false;
      popupAllotViolation.value = false;
      popupDetailViolation.value = false;
    };
    const cencleVioltion = (data, vdaViolationStatus) => {
      console.log(data);
      console.log(data.vdaSeqNo);
      let tadSeqNo;
      const confirmCencleViolation = confirm(
        `${data.vdaCarNo}차량의 배정을 취소 하시 겠습니까?`
      );
      if (!confirmCencleViolation) {
        return;
      }
      try {
        axios
            .post("https://bie.autogram.co.kr/api/v1/violation/get", {
              vdaSeqNo: data.vdaSeqNo,
            })
            .then((res) => {
              console.log('===========');
              console.log(res);
              vdaViolationStatus = res.data[0].vdaViolationStatus;
              tadSeqNo = res.data[0].tadSeqNo;

              // 견인 기사가 수락 한 후 배정 취소
              if (vdaViolationStatus === "VVS002") {
                console.log("================");
                console.log(data.tadSeqNo);
                axios
                    .post("https://bie.autogram.co.kr/api/v1/violation/cancelAllot", {
                      vdaSeqNo: data.vdaSeqNo,
                      tadSeqNo: tadSeqNo,
                      vdaViolationStatus: "VVS001",
                      vdaAllotDate: "",
                    })
                    .then((res) => {
                      console.log(res);
                      alert("견인 배정을 취소 했습니다.");
                      router.go(router.currentRoute);
                    });
              } else if (vdaViolationStatus === "VVS005") {
                // 수락 대기중 배정 취소
                console.log("pushCancel");
                axios
                    .post("https://bie.autogram.co.kr/api/v1/violation/pushCancel", {
                      vdaSeqNo: data.vdaSeqNo,
                      dmaMemNo: data.dmaMemNo,
                    })
                    .then((res) => {
                      if (res.data.result === "SUCCESS") {
                        console.log(res);
                        alert("견인 배정을 취소 했습니다.");
                        router.go(router.currentRoute);
                      } else {
                        console.log(res);
                        alert("단속 대상 차량 정보를 수정 중 오류가 발생했습니다");
                      }
                    });
              }
            });

      } catch (err) {
        console.log(err);
      }
    };
    getList();
    getLocationSi();

    return {
      where,
      // 견인
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
      modifyData,
      violateData,
      // 지역
      locationSi,
      locationGu,
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
      violationData,
      paginate,
      paginate_total,
      current,
      pageCount, // 페이지 버튼 최대 개수
      popupRegistViolation, // 등록 팝업
      popupModifyViolation, // 수정 팝업
      popupAllotViolation, // 배정 팝업
      popupDetailViolation, // 상세보기
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
      getLocationSi,
      selectSi,
      selectGu,
      si,
      gu,
      companys,
      cencleVioltion, // 배정 취소
      adminType,
    };
  },
};
</script>
<style>
.test {
  text-align: right;
}
</style>
