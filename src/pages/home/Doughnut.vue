<template>
  <div v-if="noData" class="no_data_text">
    당일 배정 현황 데이터가 없습니다.
  </div>
  <Doughnut v-else :options="chartOptions" :data="chartData" />
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "vue-chartjs";

ChartJS.register(Tooltip, Legend, ArcElement);

import { ref } from "vue";

export default {
  name: "DoughnutChart",
  components: {
    Doughnut,
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  setup(props) {
    const chartOptions = ref({
      responsive: true,
      maintainAspectRatio: false,
    });
    const chartData = ref(props.data);
    // console.log(chartData.value);
    const chartId = ref("id");
    const noData = ref(false);
    const dataCheck = () => {
      console.log(chartData.value);
      // console.log(chartData.value.datasets[0].data[0]);
      if (chartData.value.datasets[0].data[0] === "x") {
        noData.value = true;
      } else {
        noData.value = false;
      }
      // console.log(noData.value);
    };
    dataCheck();
    return {
      chartData,
      chartOptions,
      chartId,
      noData,
      dataCheck,
    };
  },
};
</script>
<style scoped>
.no_data_text {
  display: flex;
  font-size: 25px;
  font-weight: bold;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
