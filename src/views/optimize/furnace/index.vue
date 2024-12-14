<script lang="ts" setup>
import { reactive, ref, watch } from "vue"
import { createTableDataApi, deleteTableDataApi, updateTableDataApi, getTableDataApi } from "@/api/fuel"
import { type CreateOrUpdateTableRequestData, type GetTableData } from "@/api/fuel/types/fuel"
import { type FormInstance, type FormRules, ElMessage, ElMessageBox } from "element-plus"
import { Refresh, CirclePlus, Delete, Download, RefreshRight, HelpFilled, Setting } from "@element-plus/icons-vue"
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
  type: ""
}
const dialogVisible = ref<boolean>(false)
const formRef = ref<FormInstance | null>(null)
const formData = ref<CreateOrUpdateTableRequestData>(cloneDeep(DEFAULT_FORM_DATA))
const formRules: FormRules<CreateOrUpdateTableRequestData> = {
  name: [{ required: true, trigger: "blur", message: "请输入用户名" }],
  type: [{ required: true, trigger: "blur", message: "请输入密码" }]
}
const handleCreateOrUpdate = () => {
  formRef.value?.validate((valid: boolean, fields) => {
    if (!valid) return console.error("表单校验不通过", fields)
    loading.value = true
    const api = formData.value.id === undefined ? createTableDataApi : updateTableDataApi
    api(formData.value)
      .then(() => {
        ElMessage.success("操作成功")
        dialogVisible.value = false
        getTableData()
      })
      .finally(() => {
        loading.value = false
      })
  })
}
const resetForm = () => {
  formRef.value?.clearValidate()
  formData.value = cloneDeep(DEFAULT_FORM_DATA)
}
//#endregion

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
      tableData.value = data.list
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
// 基本参数类型定义
interface BasicParams {
  coke: number | null
  ore: number | null
  coal: number | null
  productSpeed: number | null
}

// 铁水成分类型定义
interface IronComposition {
  K: number | null
  Na: number | null
  Pb: number | null
  Zn: number | null
  P: number | null
  Ti: number | null
  Mn: number | null
}

interface SlagComposition {
  Si: number | null
  Al: number | null
  Ca: number | null
}

// 响应式变量
const basicParamsDialogVisible = ref(false)
const ironCompositionDialogVisible = ref(false)
const slagCompositionDialogVisible = ref(false)

// 基本参数
const basicParams = reactive<BasicParams>({
  coke: null,
  ore: null,
  coal: null,
  productSpeed: null
})

// 铁水成分
const ironComposition = reactive<IronComposition>({
  K: null,
  Na: null,
  Pb: null,
  Zn: null,
  P: null,
  Ti: null,
  Mn: null
})

const slagComposition = reactive<SlagComposition>({
  Si: null,
  Al: null,
  Ca: null
})

// 保存基本参数
const saveBasicParams = () => {
  // 在这里可以添加参数验证逻辑
  basicParamsDialogVisible.value = false
  ElMessage.success("参数设置成功")
}

// 保存铁水成分
const saveIronComposition = () => {
  // 在这里可以添加参数验证逻辑
  ironCompositionDialogVisible.value = false
  ElMessage.success("铁水成分保存成功")
}
// / 处理优化配比
const handleRatio = () => {
  // TODO: 实现优化配比逻辑
  ElMessage.success("正在优化配比")
}

// 处理成分计算
const handleCalculate = () => {
  // TODO: 实现成分计算逻辑
  ElMessage.success("正在计算成分")
}
/** 监听分页参数的变化 */
watch([() => paginationData.currentPage, () => paginationData.pageSize], getTableData, { immediate: true })
</script>
<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item>
          <el-button type="primary" :icon="Setting" @click="basicParamsDialogVisible = true">基本参数设定</el-button>
          <el-button type="primary" :icon="Setting" @click="ironCompositionDialogVisible = true"
            >铁水成分设定</el-button
          >
          <el-button type="primary" :icon="Setting" @click="slagCompositionDialogVisible = true"
            >炉渣成分设定</el-button
          >
          <el-button type="primary" :icon="Refresh" @click="handleRatio">优化配比</el-button>
          <el-button type="primary" :icon="Refresh" @click="handleCalculate">成分计算</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 基本参数设定对话框 -->
    <el-dialog v-model="basicParamsDialogVisible" title="高炉基本参数设定" class="blast-furnace-dialog" width="580px">
      <el-form :model="basicParams" label-width="120px" class="blast-furnace-form">
        <el-form-item label="焦批(t/ch)">
          <el-input v-model="basicParams.coke" placeholder="请输入焦批" clearable />
        </el-form-item>

        <el-form-item label="矿批(t/ch)">
          <el-input v-model="basicParams.ore" placeholder="请输入矿批" clearable />
        </el-form-item>

        <el-form-item label="喷煤量(t/h)">
          <el-input v-model="basicParams.coal" placeholder="请输入喷煤量" clearable />
        </el-form-item>
        <el-form-item label="料速(ch/h)">
          <el-input v-model="basicParams.productSpeed" placeholder="请输入料速" clearable />
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="basicParamsDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveBasicParams"> 确 定 </el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 铁水成分设定对话框 -->
    <el-dialog v-model="ironCompositionDialogVisible" title="铁水成分设定" width="600px">
      <el-form :model="ironComposition" label-width="120px">
        <el-form-item label="K上限">
          <el-input v-model="ironComposition.K" placeholder="请输入K上限" />
        </el-form-item>
        <el-form-item label="K下限">
          <el-input v-model="ironComposition.K" placeholder="请输入K下限" />
        </el-form-item>
        <el-form-item label="Na含量">
          <el-input v-model="ironComposition.Na" placeholder="请输入Na含量" />
        </el-form-item>
        <el-form-item label="Pb含量">
          <el-input v-model="ironComposition.Pb" placeholder="请输入Pb含量" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="ironCompositionDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveIronComposition">确定</el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="basicParamsDialogVisible" title="高炉基本参数设定" class="blast-furnace-dialog" width="580px">
      <el-form :model="basicParams" label-width="120px" class="blast-furnace-form">
        <el-form-item label="焦批(t/ch)">
          <el-input v-model="basicParams.coke" placeholder="请输入焦批" clearable />
        </el-form-item>

        <el-form-item label="矿批(t/ch)">
          <el-input v-model="basicParams.ore" placeholder="请输入矿批" clearable />
        </el-form-item>

        <el-form-item label="喷煤量(t/h)">
          <el-input v-model="basicParams.coal" placeholder="请输入喷煤量" clearable />
        </el-form-item>
        <el-form-item label="料速(ch/h)">
          <el-input v-model="basicParams.productSpeed" placeholder="请输入料速" clearable />
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="basicParamsDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveBasicParams"> 确 定 </el-button>
        </div>
      </template>
    </el-dialog>

    <el-card v-loading="loading" shadow="never">
      <div class="toolbar-wrapper">
        <div>
          <el-button type="primary" :icon="CirclePlus" @click="dialogVisible = true">添加原料</el-button>
          <el-button type="danger" :icon="Delete" @click="handleBatchDelete">批量删除</el-button>
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
        <el-table :data="tableData" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column prop="upperLimit" label="配比上限" width="100" align="center">
            <template #default="scope">
              <el-input v-model="scope.row.upperLimit" type="number" step="0.1" min="0" />
            </template>
          </el-table-column>
          <el-table-column prop="lowerLimit" label="配比下限" width="100" align="center">
            <template #default="scope">
              <el-input v-model="scope.row.lowerLimit" type="number" step="0.1" min="0" />
            </template>
          </el-table-column>
          <el-table-column prop="calculatedRatio" label="计算配比" width="100" align="center">
            <template #default="scope">
              <el-input v-model="scope.row.calculatedRatio" type="number" step="0.1" min="0" />
            </template>
          </el-table-column>

          <el-table-column prop="name" label="原料名称" width="150" align="center" />
          <el-table-column prop="type" label="类别" width="100" align="center" />
          <el-table-column prop="value1" label="价格" width="100" align="center" />
          <el-table-column prop="value2" label="TFe" width="100" align="center" />
          <el-table-column prop="value3" label="FeO" width="100" align="center" />
          <el-table-column prop="value4" label="SiO2" width="100" align="center" />
          <el-table-column prop="value5" label="CaO" width="100" align="center" />
          <el-table-column prop="value6" label="MgO" width="100" align="center" />
          <el-table-column prop="value7" label="Al2O3" width="100" align="center" />

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
    <el-dialog
      v-model="dialogVisible"
      :title="formData.id === undefined ? '新增用户' : '修改用户'"
      @closed="resetForm"
      width="30%"
    >
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="100px" label-position="left">
        <el-form-item prop="username" label="用户名">
          <el-input v-model="formData.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="password" label="密码" v-if="formData.id === undefined">
          <el-input v-model="formData.type" placeholder="请输入" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleCreateOrUpdate" :loading="loading">确认</el-button>
      </template>
    </el-dialog>
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
