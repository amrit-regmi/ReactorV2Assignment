import { ErrorAction } from "./Store/Reducers/errorReducer"
import { ManufacturerAction } from "./Store/Reducers/manufacturerReducer"
import { ProductAction } from "./Store/Reducers/productsReducer"

export type ProductType = 'beanies' | 'gloves' | 'facemasks'

export type  DataFetchStatus  = 'error' | 'loading' | 'fetched' | null

export type  DispatchActions = ErrorAction | ManufacturerAction | ProductAction

export type DataType = 'products' | 'manufacturers'

export type Store = {
  products: {
    [productType in ProductType] : {
      data: any
      status: DataFetchStatus
      lastRetrieved: number | null
    }
  }
  manufacturers: {
    [manufacturerName:string]: {
      data: any
      status: DataFetchStatus
      lastRetrieved: number | null 
    }
  }
  errors: {
    id:string
    message:string
    type: DataType
  }[]
}
