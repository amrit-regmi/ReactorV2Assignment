import { ProductType, Store } from "../types"

/* eslint-disable no-case-declarations */
export const SET_PRODUCT = 'SET_PRODUCT'
export const SET_PRODUCT_FETCHING ='SET_PRODUCT_FETCHING'
export const SET_PRODUCT_ERROR = 'SET_PRODUCT_ERROR'

export type ProductAction = 
  | {
      type: 'SET_PRODUCT',
      payload:{
        [productType in ProductType]:{
          data: any,
          lastRetrieved: Date,
          status:'fetched'
        }
      }
    }
  | {
      type: 'SET_PRODUCT_FETCHING',
      payload: ProductType
    }

const productReducer = (state:Store , action : ProductAction ) : Store=> {
  switch(action.type){
  case SET_PRODUCT:
    return { ...state,products: { ...state.products,...action.payload } }

  case SET_PRODUCT_FETCHING:
    return { ... state, products: { ...state.products,[action.payload]:{ ...state.products[action.payload],status:'loading' } } }

  default:
    return state
  }
}

export default productReducer
