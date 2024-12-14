<template>
  <div class="dashboard">
    <div class="chart-container" ref="chart1" />
    <div class="chart-container" ref="chart2" />
    <div class="chart-container" ref="chart3" />
    <div class="chart-container" ref="chart4" />
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from "vue"
import * as echarts from "echarts"

const chart1 = ref(null)
const chart2 = ref(null)
const chart3 = ref(null)
const chart4 = ref(null)

const chartInstances = []

const initChart = (el, options) => {
  const chart = echarts.init(el)
  chart.setOption(options)
  return chart
}

onMounted(() => {
  // 初始化四个图表
  chartInstances.push(initChart(chart1.value, getOptions1()))
  chartInstances.push(initChart(chart2.value, getOptions2()))
  chartInstances.push(initChart(chart3.value, getOptions3()))
  chartInstances.push(initChart(chart4.value, getOptions4()))

  // 添加窗口大小变化的监听器
  window.addEventListener("resize", handleResize)
})

onUnmounted(() => {
  // 在组件卸载时移除事件监听器并销毁图表实例
  window.removeEventListener("resize", handleResize)
  chartInstances.forEach((chart) => chart.dispose())
})

const handleResize = () => {
  chartInstances.forEach((chart) => chart.resize())
}

// 定义每个图表的配置项
const getOptions1 = () => ({
  title: {
    text: "45港进口铁矿石库存",
    left: "center"
  },
  tooltip: {
    trigger: "axis",
    formatter: "{b}<br/>库存: {c} 万吨"
  },
  xAxis: {
    type: "category",
    data: [
      "2023-07-28",
      "2023-09-08",
      "2023-10-27",
      "2023-12-08",
      "2024-01-19",
      "2024-03-08",
      "2024-04-19",
      "2024-06-07",
      "2024-07-19"
    ],
    axisLabel: {
      rotate: 45,
      interval: 0
    }
  },
  yAxis: {
    type: "value",
    name: "万吨",
    min: 10000,
    max: 16000
  },
  series: [
    {
      name: "铁矿石库存",
      type: "line",
      data: [12400, 11800, 10900, 11600, 13200, 14400, 14700, 14950, 15100],
      smooth: true,
      lineStyle: {
        color: "#ff0000"
      },
      itemStyle: {
        color: "#ff0000"
      }
    }
  ]
})

const getOptions2 = () => ({
  // 原料消耗比对图
  title: {
    text: "高炉原料消耗比"
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow"
    }
  },
  legend: {
    data: ["铁矿石", "焦炭", "煤粉"]
  },
  xAxis: {
    type: "category",
    data: ["1号高炉", "2号高炉", "3号高炉"]
  },
  yAxis: {
    type: "value",
    name: "消耗量(kg/t铁)"
  },
  series: [
    {
      name: "铁矿石",
      type: "bar",
      data: [1550, 1580, 1530]
    },
    {
      name: "焦炭",
      type: "bar",
      data: [450, 460, 440]
    },
    {
      name: "煤粉",
      type: "bar",
      data: [180, 175, 185]
    }
  ]
})

const getOptions3 = () => ({
  // 铁水质量指标分布图
  title: {
    text: "铁水质量指标分布",
    left: "center"
  },
  tooltip: {
    trigger: "item"
  },
  legend: {
    orient: "vertical",
    left: "left"
  },
  series: [
    {
      name: "铁水成分",
      type: "pie",
      radius: "50%",
      data: [
        { value: 94.5, name: "铁(Fe)" },
        { value: 4.5, name: "碳(C)" },
        { value: 0.5, name: "硅(Si)" },
        { value: 0.3, name: "锰(Mn)" },
        { value: 0.2, name: "其他元素" }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)"
        }
      }
    }
  ]
})

const getOptions4 = () => ({
  title: {
    text: "全样本独立焦化厂日均产量",
    left: "center"
  },
  tooltip: {
    trigger: "axis",
    formatter: function (params) {
      return params[0].name + "<br/>" + "日均产量: " + params[0].value + " 万吨"
    }
  },
  xAxis: {
    type: "category",
    data: [
      "2023-07-28",
      "2023-09-08",
      "2023-10-20",
      "2023-12-01",
      "2024-01-12",
      "2024-02-23",
      "2024-04-05",
      "2024-05-17",
      "2024-06-28"
    ],
    axisLabel: {
      rotate: 45,
      interval: 0
    }
  },
  yAxis: {
    type: "value",
    name: "万吨",
    min: 57,
    max: 73
  },
  series: [
    {
      name: "日均产量",
      type: "line",
      data: [67.5, 71.5, 69.13, 67, 68.5, 64, 59, 66.5, 68.8],
      smooth: true,
      lineStyle: {
        color: "#ff0000"
      },
      itemStyle: {
        color: "#ff0000"
      },
      markPoint: {
        data: [
          { type: "max", name: "最大值" },
          { type: "min", name: "最小值" }
        ]
      }
    }
  ]
})
</script>
<style scoped>
.dashboard {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  padding: 20px;
}

.chart-container {
  height: 300px;
  background-color: #f0f0f0;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .dashboard {
    grid-template-columns: 1fr;
  }
}
</style>
