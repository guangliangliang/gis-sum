<template>
  <div class="dashboard">
    <div class="left-column">
      <ChartWrapper title="柱状图">
        <BaseChart class="chart" :chartOption="barChartOption" />
      </ChartWrapper>
      <ChartWrapper title="折线图">
        <BaseChart class="chart" :chartOption="lineChartOption" />
      </ChartWrapper>
      <ChartWrapper title="折线图">
        <BaseChart class="chart" :chartOption="lineChartOption" />
      </ChartWrapper>
    </div>
    <div class="center-column">
      <div class="center-top">
        <span @click="toggleMapMode">切换 2D/3D</span>
        <ChartWrapper :title="'运城市大数据可视化平台'">
          <template #title>
            <h1 class="big-title">运城市大数据可视化平台</h1>
          </template>
          <BaseChart class="map-chart" :chartOption="mapChartOption" />
        </ChartWrapper>
      </div>
      <div class="center-bottom">
        <ChartWrapper title="雷达图">
          <BaseChart class="chart" :chartOption="radarChartOption" />
        </ChartWrapper>
      </div>
    </div>
    <div class="right-column">
      <ChartWrapper title="散点图">
        <BaseChart class="chart" :chartOption="scatterChartOption" />
      </ChartWrapper>
      <ChartWrapper title="饼图">
        <BaseChart class="chart" :chartOption="pieChartOption" />
      </ChartWrapper>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import {
  BarChart,
  LineChart,
  ScatterChart,
  PieChart,
  RadarChart,
  MapChart,
} from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GeoComponent,
  VisualMapComponent,
} from "echarts/components";
import VChart from "vue-echarts";
import "echarts-gl";
import axios from "axios";
import { chartData, mapData } from "./data.js";
import * as echarts from "echarts";
import areaJson from "@/assets/json/yunArea.json";
import ChartWrapper from "@/components/ChartWrapper.vue";

console.log(areaJson, "areaJsonareaJson");
use([
  CanvasRenderer,
  BarChart,
  LineChart,
  ScatterChart,
  PieChart,
  RadarChart,
  MapChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GeoComponent,
  VisualMapComponent,
]);

const barChartOption = ref({
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  grid:{
    left: "10%",
    right: "10%",
    bottom: "10%",
    top: "10%",
    containLabel: true,
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: chartData.barChart.data,
      type: "bar",
    },
  ],
});

const lineChartOption = ref({
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  grid:{
    left: "10%",
    right: "10%",
    bottom: "10%",
    top: "10%",
    containLabel: true,
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: chartData.lineChart.data,
      type: "line",
    },
  ],
});

const scatterChartOption = ref({
  xAxis: {},
  yAxis: {},
  series: [
    {
      symbolSize: 20,
      data: chartData.scatterChart.data,
      type: "scatter",
    },
  ],
});

const pieChartOption = ref({
  tooltip: {
    trigger: "item",
  },
  legend: {
    orient: "vertical",
    left: "left",
  },
  series: [
    {
      name: "Access From",
      type: "pie",
      radius: "50%",
      data: chartData.pieChart.data,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
});

const radarChartOption = ref({
  radar: {
    indicator: chartData.radarChart.indicator,
  },
  series: [
    {
      name: "预算 vs 开销",
      type: "radar",
      data: chartData.radarChart.data,
    },
  ],
});

const mapChartOption = ref();

const is3D = ref(false);

onMounted(async () => {
  try {
    echarts.registerMap("运城", areaJson);
    toggleMapMode();
  } catch (error) {
    console.error("Failed to fetch map data:", error);
  }
});

function toggleMapMode() {
  if (is3D.value) {
    mapChartOption.value = {
      tooltip: {
        trigger: "item",
        formatter: "{b}",
      },
      visualMap: {
        min: 0,
        max: 1000,
        left: "left",
        top: "bottom",
        text: ["高", "低"],
        calculable: true,
      },
      series: [
        {
          name: "运城市",
          type: "map",
          mapType: "运城",
          roam: true,
          label: {
            show: true,
          },
          data: mapData,
        },
      ],
    };
  } else {
    mapChartOption.value = {
      visualMap: {
        min: 0,
        max: 1000,
        calculable: true,
        text: ["高", "低"],
        inRange: {
          color: ["#2884db", "#244779"],
        },
      },
      series: [
        {
          tooltip: {
            trigger: "item",
          },
          zlevel: 1,
          name: "运城市",
          type: "map3D",
          map: "运城",
          boxDepth: 120, //地图倾斜度
          regionHeight: 3, //地图厚度
          label: {
            show: true, //是否显示市
            textStyle: {
              color: "#fff", //文字颜色
              fontSize: 12, //文字大小
              fontFamily: "微软雅黑",
              backgroundColor: "rgba(0,0,0,0)", //透明度0清空文字背景
            },
          },
          itemStyle: {
            opacity: 0.9, // 透明度
            borderWidth: 0.6, //分界线宽度
            borderColor: "#207fce", //分界线颜色
          },
          groundplane: {
            show: false,
          },
          data: mapData,
          realisticMaterial: {
            detailTexture: "#fff", // 纹理贴图
            textureTiling: 1, // 纹理平铺，1是拉伸，数字表示纹理平铺次数
            roughness: 0, // 材质粗糙度，0完全光滑，1完全粗糙
            metalness: 0, // 0材质是非金属 ，1金属
            roughnessAdjust: 0,
          },
          viewControl: {
            projection: "perspective",
            distance: 120,
            center: [-5, -22, 0],
          },
        },
      ],
      animation: false,
    };
  }
  is3D.value = !is3D.value;
}
</script>

<style scoped lang="less">
.dashboard {
  display: flex;
  height: 100%;
  width: 100%;
  overflow: hidden;

  .left-column,
  .right-column,
  .center-column {
    display: flex;
    flex-direction: column;
  }

  .left-column {
    flex: 0.25;
  }

  .center-column {
    flex: 0.5;

    .center-top,
    .center-bottom {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
    }

    .center-top {
      position: relative;

      > span {
        position: absolute;
        right: 20px;
        top: 20px;
        z-index: 2;
        cursor: pointer;
        color: white;
      }
    }
  }

  .right-column {
    flex: 0.25;
  }

  .big-title {
    color: #bde4ff;
    text-align: center;
    font-size: 40px;
    letter-spacing: 1.5px;
  }

  .chart {
    width: 100%;
    height: 100%;
    padding: 5px;
  }

  .map-chart {
    width: 100%;
    height: 100%;
  }
}
</style>
