<template>
  <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

import { ref } from "vue";

export default {
  name: "BarChart",
  components: {
    Bar,
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
    });
    const chartId = ref("id");
    const chartData = ref(props.data);
    return {
      chartData,
      chartOptions,
      chartId,
    };
  },
};
</script>
