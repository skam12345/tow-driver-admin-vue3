<template>
  <div>
    <div id="wrapper">
      <leftMenu :data="where"></leftMenu>
      <div id="container">
        <section class="sales">
          <div class="breadcrumb">
            <router-link to="/Home">HOME</router-link>
            <p>자동 배정 관리</p>
          </div>
          <div class="contents">
            <h2 class="title title_sale">자동 배정 관리</h2>
            <div class="contents_area">
              <form autocomplete="off">
                <div class="contents_area-search">
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
                          :disabled="si.selectedData"
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
                          style="width: 150px"
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
                        <label for="purchase">자동배정 여부</label>
                        <select
                          name=""
                          id="purchase"
                          v-model="autoAllot"
                          style="width: 150px"
                        >
                          <option disabled value="">선택</option>
                          <option value="TAT001">자동 배정</option>
                          <option value="TAT002">수동 배정</option>
                        </select>
                      </div>
                    </div>
                    <div style="display: flex">
                      <button
                        v-if="!isModity"
                        type="button"
                        class="btn_blue btn_add ML10 MR20"
                        @click="addAutoAllot()"
                      >
                        추가
                      </button>
                      <button
                        v-else
                        type="button"
                        class="btn_yellow btn_add ML10 MR20"
                        @click="modifyAutoAllot()"
                      >
                        수정
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <div class="contents_area-table">
                <table>
                  <colgroup>
                    <col width="4%" />
                    <col width="%" />
                    <col width="" />
                    <col width="" />
                    <col width="8%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th rowspan="2">NO</th>
                      <th rowspan="2">지역명</th>
                      <th rowspan="2">배정 구분</th>
                      <th rowspan="2">접수 일시</th>
                      <th rowspan="2">수정</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(info, index) in autoAllotData"
                      v-show="setPaginate(index)"
                      :key="index"
                    >
                      <td class="right">{{ info.page }}</td>
                      <td>{{ info.aciSidoName }} {{ info.aciSigunguName }}</td>
                      <td v-if="info.tsaAutoType === 'TAT001'">자동 배정</td>
                      <td v-else>수동 배정</td>
                      <td>{{ info.tsaRegDate }}</td>
                      <td
                        @click="changeModify(info)"
                        style="color: blue; cursor: pointer"
                      >
                        수정하기
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
  </div>
</template>
<script>
import { computed, ref } from "vue";
import axios from "@/axios";
import leftMenu from "../../components/leftMenu.vue";

export default {
  components: {
    leftMenu,
  },
  setup() {
    const where = ref("setting");
    const autoAllotData = ref([]);
    const autoAllot = ref("");
    const aiaRegionCode = ref();
    const isModity = ref(false);
    const tsaSeqNo = ref();
    // pagenations
    const paginate = ref(20);
    const pageCount = ref(10);
    const paginate_total = ref(0);
    const current = ref(1);
    // 지역 조회
    const si = ref({
      datas: [],
      selected: true,
      selectedData: "서울특별시",
    });
    const gu = ref({
      datas: [],
      selected: false,
      selectedData: "",
    });
    const getLocationSi = () => {
      try {
        axios
          .post("https://bie.autogram.co.kr/api/v1/admin_code/getSido", {})
          .then((res) => {
            // console.log(res);
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
            // console.log(res.data);
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
      console.log(gu.value.selectedData);
      try {
        aiaRegionCode.value = gu.value.selectedData.aciRegionCode;
        if (gu.value.selectedData !== "") {
          gu.value.selected = true;
        } else {
          gu.value.selected = false;
        }
      } catch (err) {
        alert(err);
      }
    };
    const getList = () => {
      try {
        axios
          .post("https://bie.autogram.co.kr/api/v1/tow_setting/get", {})
          .then((res) => {
            console.log("getList");
            console.log(res);
            autoAllotData.value = res.data;
            // 검색 결과 인덱스 반대로 변경
            for (let i = 0; i < autoAllotData.value.length; i++) {
              autoAllotData.value[i].page = autoAllotData.value.length - i;
            }
            autoAllotData.value = res.data;
            // 페이지네이션 페이지 계산
            paginate_total.value = Math.ceil(
              autoAllotData.value.length / paginate.value
            );
          });
      } catch (err) {
        alert(err);
      }
    };
    const addAutoAllot = () => {
      if (!autoAllot.value || !gu.value.selectedData) {
        alert("지역선택(구)와 자동배정 여부를 선택 해 주세요.");
        return;
      }
      try {
        axios
          .post("https://bie.autogram.co.kr/api/v1/tow_setting/add", {
            aciRegionCode: gu.value.selectedData,
            tsaAutoType: autoAllot.value,
          })
          .then((res) => {
            console.log(res);
            if (res.data.result === "SUCCESS") {
              autoAllotData.value = res.data;
              alert("자동 배정 여부를 등록 했습니다.");
              getList();
            } else {
              console.log("err");
            }
          })
          .catch((err) => {
            console.log(err);
            alert(`${err.response.data.message}`);
          });
      } catch (err) {
        console.log("err");
      }
    };
    const changeModify = (data) => {
      isModity.value = true;
      gu.value.selectedData = data.aciRegionCode;
      autoAllot.value = data.tsaAutoType;
      tsaSeqNo.value = data.tsaSeqNo;
    };
    const modifyAutoAllot = () => {
      try {
        axios
          .post("https://bie.autogram.co.kr/api/v1/tow_setting/modify", {
            tsaSeqNo: tsaSeqNo.value,
            tsaAutoType: autoAllot.value,
          })
          .then((res) => {
            console.log(res);
            if (res.data.result === "SUCCESS") {
              autoAllotData.value = res.data;
              // 검색 결과 인덱스 반대로 변경
              // for (let i = 0; i < autoAllotData.value.length; i++) {
              //   autoAllotData.value[i].page = autoAllotData.value.length - i;
              // }
              // autoAllotData.value = res.data;
              // // 페이지네이션 페이지 계산
              // paginate_total.value = Math.ceil(
              //   autoAllotData.value.length / paginate.value
              // );
              alert("자동 배정 여부를 수정 했습니다.");
              gu.value.selectedData = "";
              autoAllot.value = "";
              getList();
              isModity.value = false;
            } else {
              alert("에러가 발생 했습니다.");
            }
          });
      } catch (err) {
        alert(err);
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

    getList();
    getLocationSi();
    selectSi();

    return {
      where,
      paginate,
      paginate_total,
      current,
      pageCount, // 페이지 버튼 최대 개수
      autoAllotData,
      getList,
      updateCurrent,
      setPaginate,
      paginate_total_unit,
      maxPage,
      startPage,
      endPage,
      // 지역별, 업체별 검색 조건
      si,
      gu,
      getLocationSi,
      selectSi,
      selectGu,
      autoAllot,
      aiaRegionCode,
      modifyAutoAllot,
      addAutoAllot,
      isModity,
      changeModify,
      tsaSeqNo,
    };
  },
};
</script>
<style>
.test {
  text-align: right;
}
.btn_add {
  background-image: url("../../assets/images/icon_plus.png");
  background-repeat: no-repeat;
  background-position: 20px 11px;
  background-size: auto;
  padding-left: 14px;
}
</style>
