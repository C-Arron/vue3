export interface CreateOrUpdateTableRequestData {
  id?: string
  name: string
  type: string
  value1: number | string
  value2: number | string
  value3: number | string
  value4: number | string
  value5: number | string
  value6: number | string
  value7: number | string
}

export interface GetTableRequestData {
  /** 当前页码 */
  currentPage: number
  /** 查询条数 */
  size: number
  /** 查询参数：用户名 */
  name?: string
  /** 查询参数：手机号 */
  type?: string
}

export type GetTableData = {
  id: string
  name: string
  type: string
  value1: number // 价格
  value2: number // TFe
  value3: number // FeO
  value4: number // SiO2
  value5: number // CaO
  value6: number // MgO
  value7: number // Al2O3
}

export type GetTableResponseData = ApiResponseData<{
  list: GetTableData[]
  total: number
}>
