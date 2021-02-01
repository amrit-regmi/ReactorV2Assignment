export enum ProductType  {
  Beanies = 'beanies',
  Gloves = 'gloves',
  Facemasks = 'facemasks'
}

export type  DataFetchStatus  = 'error' | 'loading' | 'fetched'

export type Store = {
  products: {
    [productType in ProductType] : {
      data: any
      status: DataFetchStatus
      lastRetrieved: Date
    }
  }
  manufacturers: {
    [manufacturerName:string]: {
      data: any
      status: DataFetchStatus
      lastRetrieved: Date    
    }
  }
  errors: {
    id:string
    message:string
    type: string
  }[]
}
