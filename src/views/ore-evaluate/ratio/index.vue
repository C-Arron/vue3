<script lang="ts" setup>
import { reactive, ref, watch, onMounted } from "vue"
import { createTableDataApi, deleteTableDataApi, updateTableDataApi, getTableDataApi } from "@/api/fuel"
import { type CreateOrUpdateTableRequestData, type GetTableData } from "@/api/fuel/types/fuel"
import { type FormInstance, type FormRules, ElMessage, ElMessageBox } from "element-plus"
import { Search, Refresh, CirclePlus, Delete, Download, RefreshRight, HelpFilled } from "@element-plus/icons-vue"
import { usePagination } from "@/hooks/usePagination"
import { cloneDeep } from "lodash-es"

defineOptions({
  // 命名当前组件
  name: "ElementPlus"
})

const loading = ref<boolean>(false)
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

//#region 增
const DEFAULT_FORM_DATA: CreateOrUpdateTableRequestData = {
  id: undefined,
  name: "",
  type: "",
  value1: 0,
  value2: 0,
  value3: 0,
  value4: 0,
  value5: 0,
  value6: 0,
  value7: 0
}
const dialogVisible = ref<boolean>(false)
const formData = ref<CreateOrUpdateTableRequestData>(cloneDeep(DEFAULT_FORM_DATA))

//#region 删
const handleDelete = (row: GetTableData) => {
  ElMessageBox.confirm(`正在删除用户：${row.name}，确认删除？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    deleteTableDataApi(row.id).then(() => {
      ElMessage.success("删除成功")
      getTableData()
    })
  })
}
//#endregion

//#region 改
const handleUpdate = (row: GetTableData) => {
  dialogVisible.value = true
  formData.value = cloneDeep(row)
}
//#endregion

//#region 查
const tableData = ref<GetTableData[]>([])
const searchFormRef = ref<FormInstance | null>(null)
const searchData = reactive({
  name: "",
  type: ""
  // 添加其他需要搜索的字段
})
const getTableData = () => {
  loading.value = true
  getTableDataApi({
    currentPage: paginationData.currentPage,
    size: paginationData.pageSize,
    name: searchData.name || undefined,
    type: searchData.type || undefined
  })
    .then(({ data }) => {
      paginationData.total = data.total
      // 在这里为每条数据添加新字段
      tableData.value = data.list.map((item) => ({
        ...item,
        upperLimit: null,
        lowerLimit: null,
        calculatedRatio: null
      }))
    })
    .catch(() => {
      tableData.value = []
    })
    .finally(() => {
      loading.value = false
    })
}
const handleSearch = () => {
  paginationData.currentPage === 1 ? getTableData() : (paginationData.currentPage = 1)
}
const resetSearch = () => {
  searchFormRef.value?.resetFields()
  handleSearch()
}
//#endregion

/** 监听分页参数的变化 */
watch([() => paginationData.currentPage, () => paginationData.pageSize], getTableData, { immediate: true })
</script>

<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item prop="name" label="原料名称">
          <el-input v-model="searchData.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="type" label="类别">
          <el-input v-model="searchData.type" placeholder="请输入" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
          <el-button :icon="Refresh" @click="resetSearch">重置</el-button>
        </el-form-item>
        <!-- 添加其他需要搜索的字段 -->
      </el-form>
    </el-card>
    <el-card v-loading="loading" shadow="never">
      <div class="toolbar-wrapper">
        <div>
          <el-button type="primary" :icon="CirclePlus" @click="dialogVisible = true">新增用户</el-button>
          <el-button type="danger" :icon="Delete">批量删除</el-button>
        </div>
        <div>
          <el-tooltip content="下载">
            <el-button type="primary" :icon="Download" circle />
          </el-tooltip>
          <el-tooltip content="刷新当前页">
            <el-button type="primary" :icon="RefreshRight" circle @click="getTableData" />
          </el-tooltip>
        </div>
      </div>
      <div class="table-wrapper">
        <el-table :data="tableData">
          <el-table-column prop="upperLimit" label="配比上限" width="150" align="center">
            <template #default="scope">
              <el-input-number v-model="scope.row.upperLimit" :precision="2" :step="0.1" :min="0" />
            </template>
          </el-table-column>

          <el-table-column prop="lowerLimit" label="配比下限" width="150" align="center">
            <template #default="scope">
              <el-input-number v-model="scope.row.lowerLimit" :precision="2" :step="0.1" :min="0" />
            </template>
          </el-table-column>

          <el-table-column prop="calculatedRatio" label="计算配比" width="150" align="center">
            <template #default="scope">
              <el-input-number v-model="scope.row.calculatedRatio" :precision="2" :step="0.1" :min="0" />
            </template>
          </el-table-column>
          <!-- 原有的列 -->
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column prop="name" label="原料名称" width="150" align="center" />
          <el-table-column prop="type" label="类别" width="150" align="center" />
          <el-table-column prop="value1" label="价格" width="150" align="center" />
          <el-table-column prop="value2" label="TFe" width="150" align="center" />
          <el-table-column prop="value3" label="FeO" width="150" align="center" />
          <el-table-column prop="value4" label="SiO2" width="150" align="center" />
          <el-table-column prop="value5" label="CaO" width="150" align="center" />
          <el-table-column prop="value6" label="MgO" width="150" align="center" />
          <el-table-column prop="value7" label="Al2O3" width="150" align="center" />

          <el-table-column fixed="right" label="操作" width="160" align="center">
            <template #default="scope">
              <el-button type="primary" text bg size="small" @click="handleUpdate(scope.row)">修改</el-button>
              <el-button type="danger" text bg size="small" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pager-wrapper">
        <el-pagination
          background
          :layout="paginationData.layout"
          :page-sizes="paginationData.pageSizes"
          :total="paginationData.total"
          :page-size="paginationData.pageSize"
          :currentPage="paginationData.currentPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
    <!-- 性价比评价 -->
  </div>
</template>

<style lang="scss" scoped>
.search-wrapper {
  margin-bottom: 20px;
  :deep(.el-card__body) {
    padding-bottom: 2px;
  }
}

.toolbar-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.table-wrapper {
  margin-bottom: 20px;
}

.pager-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>
