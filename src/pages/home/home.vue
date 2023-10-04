<template>
  <div>
    <div id="wrapper">
      <leftMenu :data="where"></leftMenu>
      <div id="container">
        <section class="main">
          <div class="breadcrumb">
            <router-link to="/Home">HOME</router-link>
          </div>
          <div class="contents">
            <!-- <h2 class="title">HOME</h2> -->
            <div class="title_cont">
              <h2 class="title" style="display: flex">
                <div class="title_text">HOME</div>
                <div
                  class="MR30 home_chart_select_box_cont"
                  style="margin-left: 2%"
                >
                  <select
                    name=""
                    id="purchase"
                    style="width: 160px"
                    v-model="gu.selectedData"
                    @change="selectGu()"
                  >
                    <option
                      v-for="(info, index) in gu.datas"
                      :key="index"
                      :value="info.aciRegionCode"
                    >
                      {{ info.aciSigunguName }}
                    </option>
                  </select>
                </div>
              </h2>
            </div>
            <div class="contents_area">
              <div class="first" style="margin-bottom: 50px">
                <div>
                  <p class="contents_area-title" style="width: 100%">
                    당일 주차 단속 배정 현황 {{ todayText }} , (전체:
                    {{ allotTodayDataTotal }}건)
                  </p>
                  <div class="contents_area_article_dounut">
                    <DoughnutChart
                      v-if="allotTodayData.loaded"
                      :data="allotTodayData"
                      ref="test"
                    ></DoughnutChart>
                  </div>
                </div>
                <div>
                  <p class="contents_area-title" style="width: 100%">
                    당월 배정 완료 현황 {{ monthText }}
                  </p>
                  <div class="contents_area_article">
                    <BarChart
                      v-if="allotMonthCompleteData.loaded"
                      :data="allotMonthCompleteData"
                    ></BarChart>
                  </div>
                </div>
              </div>
              <div class="second">
                <div>
                  <p class="contents_area-title" style="width: 100%">
                    당월 완료 수수료 현황 {{ monthText }}
                  </p>
                  <div class="contents_area_article">
                    <BarChart
                      v-if="saleMonthCompleteData.loaded"
                      :data="saleMonthCompleteData"
                    ></BarChart>
                  </div>
                </div>
                <div>
                  <p class="contents_area-title">공지사항</p>
                  <div class="contents_area_article_dounut notice">
                    <a v-for="(info, index) in noticeData" :key="index">
                      <router-link to="/notice" style="width: 100%">
                        <p class="text-overflow-ellipsis">
                          {{ info.ndaTitle }}
                        </p>
                      </router-link>
                    </a>
                  </div>
                  <router-link to="/notice"
                    ><button type="button" class="btn_more">
                      더보기
                    </button></router-link
                  >
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "@/axios";
import { ref } from "vue";
import BarChart from "./Bar.vue";
import DoughnutChart from "./Doughnut.vue";
import leftMenu from "../../components/leftMenu.vue";

export default {
  components: {
    BarChart,
    DoughnutChart,
    leftMenu,
  },
  setup() {
    const where = ref("home");
    const noticeData = ref([]);

    const todayText = ref("");
    const todayStart = ref("");
    const todayEnd = ref("");
    const yesterdayText = ref("");
    const yesterdayStart = ref("");
    const yesterdayEnd = ref("");
    const monthText = ref("");
    const monthStart = ref("");
    const monthEnd = ref("");
    const saleTodaySumTotal = ref(0);
    const saleTodaySumDeposit = ref(0);
    const allotTodayTotal = ref(0);
    const allotTodayComplete = ref(0);
    const waitAllotData = ref([]);
    const beforeAllotData = ref([]);
    const allotedData = ref([]);
    const completedAllotData = ref([]);
    const allotTodayDataTotal = ref(0);
    const allotMonthCompleteDataset = ref([]);
    const saleMonthCompleteDataset = ref([]);
    // 당일 배정 현황
    const allotTodayData = ref({
      loaded: false,
      labels: ["미배정", "배정완료", "견인완료", "수락 대기"],
      datasets: [
        {
          backgroundColor: ["#00D8FF", "#E46651", "#41B883", "#faa352"],
          data: [],
        },
      ],
    });

    // 당월 배정 완료 현황
    const allotMonthCompleteData = ref({
      loaded: false,
      labels: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "11",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
      ],
      datasets: [
        {
          label: "당월 배정 완료 현황",
          backgroundColor: "#f87979",
          data: [],
        },
      ],
    });
    // 당월 수수료 입금 완료 현황
    const saleMonthCompleteData = ref({
      loaded: false,
      labels: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "11",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
      ],
      datasets: [
        {
          label: "당월 완료 수수료 현황",
          backgroundColor: "#f87979",
          data: [],
        },
      ],
    });

    const si = ref({
      datas: [],
      selected: false,
      selectedData: "서울특별시",
    });
    const gu = ref({
      datas: [],
      selected: false,
      selectedData: "1144000000",
    });
    const selectSi = () => {
      try {
        axios
          .post("https://bie.autogram.co.kr/api/v1/admin_code/getSigungu", {
            aciSidoName: si.value.selectedData,
          })
          .then((res) => {
            // console.log(res);
            gu.value.datas = res.data;
            // 최초 선택 할 지자체 / 지금은 마포구로 해놓음
            gu.value.selectedData = "1144000000";
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
      console.log("selectGu");
      try {
        if (gu.value.selectedData !== "") {
          gu.value.selected = true;
          allotTodayData.value.loaded = false;
          allotMonthCompleteData.value.loaded = false;
          saleMonthCompleteData.value.loaded = false;
          refreshChartData();
          getChartData();
        } else {
          gu.value.selected = false;
        }
      } catch (err) {
        alert(err);
      }
    };
    const getYesterday = () => {
      const d = new Date();
      const year = d.getFullYear(); // 년
      const month = d.getMonth() + 1; // 월
      const startDay = d.getDate() - 1;
      const endDay = d.getDate();
      yesterdayText.value =
        "(" + year + "년 " + month + "월 " + startDay + "일)";
      yesterdayStart.value = year + "-" + month + "-" + startDay;
      yesterdayEnd.value = year + "-" + month + "-" + endDay;
    };
    const getToday = () => {
      const d = new Date();
      const year = d.getFullYear(); // 년
      const month = d.getMonth() + 1; // 월
      const startDay = d.getDate();
      const endDay = d.getDate() + 1;
      todayText.value = "(" + year + "년 " + month + "월 " + startDay + "일)";
      todayStart.value = year + "-" + month + "-" + startDay;
      todayEnd.value = year + "-" + month + "-" + endDay;
    };
    const getMonth = () => {
      const d = new Date();
      const year = d.getFullYear(); // 년
      const month = d.getMonth() + 1; // 월
      monthText.value = "(" + year + "년 " + month + "월 )";
      monthStart.value = year + "-" + month + "-" + "01";
      const lastDate = new Date(year, month, 0);
      monthEnd.value = year + "-" + month + "-" + lastDate.getDate();
    };
    // 차트 데이터 초기화
    const refreshChartData = async () => {
      allotTodayData.value.datasets[0].data = [];
      allotMonthCompleteData.value.datasets[0].data = [];
      saleMonthCompleteData.value.datasets[0].data = [];
      allotTodayDataTotal.value = 0;
      beforeAllotData.value = [];
      allotedData.value = [];
      completedAllotData.value = [];
      waitAllotData.value = [];
    };
    // 차트 데이터들 가져오기
    const getChartData = async () => {
      // 당월 차트 기본 데이터 설정
      makeAllotMonthCompleteDataset();
      makeSaleMonthCompleteDataset();
      try {
        // 당일 단속 건수 전체
        await axios
          .post("https://bie.autogram.co.kr/api/v1/violation/get", {
            startDate: todayStart.value,
            endDate: todayStart.value,
            aciRegionCode: gu.value.selectedData,
          })
          .then((res) => {
            if (res.data.length > 0) {
              console.log(res.data);
              for (var i = 0; i < res.data.length; i++) {
                if (res.data[i].vdaViolationStatus === "VVS001") {
                  beforeAllotData.value.push(res.data[i]);
                } else if (res.data[i].vdaViolationStatus === "VVS002") {
                  allotedData.value.push(res.data[i]);
                } else if (res.data[i].vdaViolationStatus === "VVS005") {
                  waitAllotData.value.push(res.data[i]);
                } else {
                  completedAllotData.value.push(res.data[i]);
                }
              }
              allotTodayData.value.datasets[0].data.push(
                beforeAllotData.value.length
              );
              allotTodayData.value.datasets[0].data.push(
                allotedData.value.length
              );
              allotTodayData.value.datasets[0].data.push(
                completedAllotData.value.length
              );
              allotTodayData.value.datasets[0].data.push(
                waitAllotData.value.length
              );
              allotTodayDataTotal.value =
                beforeAllotData.value.length +
                allotedData.value.length +
                completedAllotData.value.length +
                waitAllotData.value.length;
              allotTodayData.value.loaded = true;
            } else {
              allotTodayData.value.loaded = false;
              allotTodayData.value.datasets[0].data = ["x"];
              allotTodayData.value.loaded = true;
            }
            console.log(allotTodayData.value);
          });

        // 당월 완료 배정 데이터
        // console.log(gu.value.selectedData);
        console.log(monthStart.value);
        console.log(monthEnd.value);
        console.log(gu.value.selectedData);
        await axios
          .post("https://bie.autogram.co.kr/api/v1/tow_allot/getChart", {
            startDate: monthStart.value,
            endDate: monthEnd.value,
            aciRegionCode: gu.value.selectedData,
          })
          .then((res) => {
            console.log(res.data);
            if (res.data.length > 0) {
              for (var i = 0; i < res.data.length; i++) {
                let dateText = res.data[i].date.substr(8, 2);
                if (dateText.substr(0, 1) === "0") {
                  dateText = dateText.substr(1, 1);
                }
                let dateNum = Number(dateText);
                allotMonthCompleteData.value.datasets[0].data.splice(
                  dateNum - 1,
                  1,
                  String(res.data[i].count)
                );
              }
            } else {
              allotMonthCompleteData.value.loaded = false;
              allotMonthCompleteData.value.datasets[0].data = ["0"];
              allotMonthCompleteData.value.loaded = true;
            }
            // console.log("allotMonthCompleteData.value");
            // console.log(allotMonthCompleteData.value);
            allotMonthCompleteData.value.loaded = true;
          });

        // // 당월 입금 완료 수수료
        await axios
          .post("https://bie.autogram.co.kr/api/v1/tow_settlement/getChart", {
            startDate: monthStart.value,
            endDate: monthEnd.value,
            aciRegionCode: gu.value.selectedData,
          })
          .then((res) => {
            // console.log(res.data);
            if (res.data.length > 0) {
              for (var i = 0; i < res.data.length; i++) {
                let dateText = res.data[i].date.substr(8, 2);
                if (dateText.substr(0, 1) === "0") {
                  dateText = dateText.substr(1, 1);
                }
                let dateNum = Number(dateText);
                saleMonthCompleteData.value.datasets[0].data.splice(
                  dateNum - 1,
                  1,
                  String(res.data[i].amount)
                );
              }
            } else {
              saleMonthCompleteData.value.loaded = false;
              saleMonthCompleteData.value.datasets[0].data = ["0"];
              saleMonthCompleteData;
            }
            saleMonthCompleteData.value.loaded = true;
          });
      } catch (err) {
        // console.log("차트 데이터 가져오는 부분 에러");
        alert(err);
      }
    };
    const getNotice = () => {
      try {
        axios
          .post("https://bie.autogram.co.kr/api/v1/notice/get", {
            size: 6,
          })
          .then((res) => {
            console.log(res);
            if (res.data.length > 6) {
              noticeData.value = res.data.slice(0, 6);
            } else {
              noticeData.value = res.data;
            }
          });
      } catch (err) {
        alert(err);
      }
    };
    const makeAllotMonthCompleteDataset = () => {
      for (let i = 0; i < allotMonthCompleteData.value.labels.length; i++) {
        allotMonthCompleteData.value.datasets[0].data.push("0");
      }
    };
    const makeSaleMonthCompleteDataset = () => {
      for (let i = 0; i < saleMonthCompleteData.value.labels.length; i++) {
        saleMonthCompleteData.value.datasets[0].data.push("0");
      }
    };

    getToday();
    getYesterday();
    getMonth();
    getNotice();
    getChartData();
    selectSi();
    return {
      where,
      noticeData,
      todayText,
      todayStart,
      todayEnd,
      yesterdayText,
      yesterdayStart,
      yesterdayEnd,
      monthText,
      monthStart,
      monthEnd,
      allotTodayData,
      allotTodayDataTotal,
      saleMonthCompleteData,
      saleMonthCompleteDataset,
      allotMonthCompleteData,
      allotMonthCompleteDataset,
      makeAllotMonthCompleteDataset,
      makeSaleMonthCompleteDataset,
      // chartOptions,
      getMonth,
      getToday,
      getYesterday,
      getNotice,
      getChartData,
      // get_one,
      // get_real,
      saleTodaySumTotal,
      saleTodaySumDeposit,
      allotTodayTotal,
      allotTodayComplete,
      // 지역 선택
      selectSi,
      selectGu,
      si,
      gu,
      waitAllotData,
      beforeAllotData,
      allotedData,
      completedAllotData,
      refreshChartData,
    };
  },
};
</script>
<style scoped>
.home_chart_select_box_cont {
  display: flex;
  align-items: center;
  justify-content: center;
}
.title_text {
  margin: 0 20px;
  /* padding: 15px 0 15px 0px; */
  font-size: 21px;
  color: #151515;
  /* position: relative; */
  display: flex;
  align-items: center;
}
.allot_today_data_sum_text {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 25px;
}
.text-overflow-ellipsis {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
/* .title_text::before {
  content: "";
  position: absolute;
  top: 50%;
  -webkit-transform: translate(0, -50%);
  transform: translate(0, -50%);
  left: 0;
  width: 30px;
  height: 30px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% auto;
} */
</style>
