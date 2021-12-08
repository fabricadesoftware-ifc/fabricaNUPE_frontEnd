<template>
  <div class="small">
    <hero-bar>Alunos em Processo de Atendimento:</hero-bar>
    <bar-chart :chart-data="datacollection"></bar-chart>
    <hr />
    <hero-bar>Alunos Atendidos:</hero-bar>
    <bar-chart :chart-data="datacollection"></bar-chart>
    <hr />
    <hero-bar>Alunos Não Atendidos:</hero-bar>
    <bar-chart :chart-data="datacollection"></bar-chart>
    <button @click="fillData()">Randomize</button>
  </div>
</template>

<script>
import LineChart from "./LineChart.js";
import BarChart from "./BarChart.js";
import PieChart from "./PieChart.js";

export default {
  components: {
    LineChart,
    BarChart,
    PieChart,
  },
  data() {
    return {
      datacollection: {},
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: ["2020", "2021"],
        datasets: [
          {
            label: "Info",
            backgroundColor: "#00ffff ",
            data: [this.getRandomInt(), this.getRandomInt()],
          },
          // {
          //   label: "Agro",
          //   backgroundColor: "#f87979",
          //   data: [this.getRandomInt(), this.getRandomInt()],
          // },
        ],
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
  },
};
</script>

<style>
.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>
