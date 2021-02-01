import { ErrorAction } from "./Reducers/errorReducer"
import { ManufacturerAction } from "./Reducers/manufacturerReducer"
import { ProductAction } from "./Reducers/productsReducer"

export enum ProductType  {
  Beanies = 'beanies',
  Gloves = 'gloves',
  Facemasks = 'facemasks'
}

export type  DataFetchStatus  = 'error' | 'loading' | 'fetched' | null

export type  DispatchActions = ErrorAction & ManufacturerAction & ProductAction

export type Store = {
  products: {
    [productType in ProductType] : {
      data: any
      status: DataFetchStatus
      lastRetrieved: Date | null
    }
  }
  manufacturers: {
    [manufacturerName:string]: {
      data: any
      status: DataFetchStatus
      lastRetrieved: Date | null 
    }
  }
  errors: {
    id:string
    message:string
    type: string
  }[]
}
