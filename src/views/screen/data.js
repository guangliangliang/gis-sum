import areaJson from "@/assets/json/yunArea.json";
console.log(areaJson, "areaJsonareaJson");

function getRandomNumber() {
  return Math.floor(Math.random() * 1000) + 1;
}

export const mapData = areaJson.features.map((item) => {
  const { name } = item.properties;
  return {
    name,
    value: getRandomNumber(),
  };
});

export const chartData = {
  barChart: {
    title: "柱状图 - 安全事件数量",
    data: [120, 200, 150, 80, 70, 110, 130],
  },
  lineChart: {
    title: "折线图 - 安全事件趋势",
    data: [120, 200, 150, 80, 70, 110, 130],
  },
  scatterChart: {
    title: "散点图 - 安全事件分布",
    data: [
      [10, 20],
      [20, 30],
      [30, 40],
      [40, 50],
      [50, 60],
    ],
  },
  pieChart: {
    title: "饼图 - 安全事件类型",
    data: [
      { value: 335, name: "直接访问" },
      { value: 310, name: "邮件营销" },
      { value: 234, name: "联盟广告" },
      { value: 135, name: "视频广告" },
      { value: 1548, name: "搜索引擎" },
    ],
  },
  radarChart: {
    title: "雷达图 - 安全事件评分",
    indicator: [
      { name: "安全性", max: 100 },
      { name: "响应速度", max: 100 },
      { name: "资源利用率", max: 100 },
      { name: "用户满意度", max: 100 },
      { name: "维护成本", max: 100 },
    ],
    data: [
      {
        value: [80, 90, 70, 85, 60],
        name: "当前状态",
      },
    ],
  },
};

export const mapDataUrl =
  "https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=140800_full";
