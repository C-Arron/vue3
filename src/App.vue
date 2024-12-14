<script lang="ts" setup>
import { useTheme } from "@/hooks/useTheme"
import { ElNotification } from "element-plus"
// 将 Element Plus 的语言设置为中文
import zhCn from "element-plus/es/locale/lang/zh-cn"

const { initTheme } = useTheme()

/** 初始化主题 */
initTheme()

// 获取当前时间
const currentHour = new Date().getHours()

// 根据时间确定问候语和图标
let greeting, icon
if (currentHour >= 5 && currentHour < 12) {
  greeting = "早上好"
  icon = "🌅"
} else if (currentHour >= 12 && currentHour < 18) {
  greeting = "下午好"
  icon = "☀️"
} else {
  greeting = "晚上好"
  icon = "🌙"
}

// 获取当前星期几
const days = ["日", "一", "二", "三", "四", "五", "六"]
const dayOfWeek = days[new Date().getDay()]

ElNotification({
  title: `${icon} ${greeting}！`,
  type: "success",
  dangerouslyUseHTMLString: true,
  message: `
    <div style="font-size: 14px; line-height: 1.5;">
      <p>今天是星期${dayOfWeek}，祝您工作顺利，心情愉悦！</p>
    </div>
  `,
  duration: 6000,
  position: "top-right",
  showClose: true
})
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>
