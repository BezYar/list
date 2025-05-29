export interface GetItemsParams {
  offset?: number
  limit?: number
  search?: string
}

export interface ListDataItem {
  id: number
  selected?: boolean
}

export interface ListData {
  total: number
  items: ListDataItem[]
}
