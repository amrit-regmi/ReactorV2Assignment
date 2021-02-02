import { ProductType, Store } from '../../types'

export const SET_PRODUCT_ERROR = 'SET_PRODUCT_ERROR'
export const SET_MANUFACTURER_ERROR = 'SET_MANUFACTURER_ERROR'
export const CLEAR_ERROR ='CLEAR_ERROR'
export const CLEAR_ALL_ERROR ='CLEAR_ALL_ERROR'


export type ErrorAction =
  | {
      type: 'SET_PRODUCT_ERROR',
      payload: {
        id: ProductType,
        message: string ,
      }
    }
  | {
      type: 'SET_MANUFACTURER_ERROR',
      payload: {
        id: string,
        message: string ,
      }
    }
  | {
      type:  'CLEAR_ERROR',
      payload: string
    }
  | {
      type: 'CLEAR_ALL_ERROR'
    }

const errorReducer = (state:Store , action : ErrorAction ) : Store => {
  switch(action.type){
  case SET_PRODUCT_ERROR:
    return { ...state,
      products:{ ...state.products,[action.payload.id]:{ status : 'error' } },
      errors: [...state.errors,{ ...action.payload,type:'products' }]
    }

  case SET_MANUFACTURER_ERROR:
    return { ...state,
      manufacturers:{ ...state.manufacturers,[action.payload.id]:{ ...state.manufacturers[action.payload.id],status : 'error' } },
      errors: [...state.errors,{ ...action.payload,type:'manufacturers' }]
    }

  case CLEAR_ERROR:
    return { ...state, errors :state.errors.filter( error => error.id !== action.payload) }

  case CLEAR_ALL_ERROR:
    return { ...state, errors:[] }

  default:
    return state
  }


}

export default errorReducer