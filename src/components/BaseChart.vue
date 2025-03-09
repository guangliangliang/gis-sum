<!-- src/components/BaseEcharts.vue -->
<template>
    <v-chart class="chart" :option="chartOption" />
  </template>
  
  <script>
  import VChart from 'vue-echarts';
  import { use } from "echarts/core";
  import { CanvasRenderer } from 'echarts/renderers';
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
  import "echarts-gl";
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
  
  export default {
    name: 'BaseEchart',
    components: {
      VChart
    },
    props: {
      chartOption: {
        type: Object,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  .chart {
    height: 400px;
  }
  </style>