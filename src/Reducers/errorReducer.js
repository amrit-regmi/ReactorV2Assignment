export const SET_PRODUCT_ERROR = 'SET_PRODUCT_ERROR'
export const SET_MANUFACTURER_ERROR = 'SET_MANUFACTURER_ERROR'
export const CLEAR_ERROR ='CLEAR_ERROR'
export const CLEAR_ALL_ERROR ='CLEAR_ALL_ERROR'

const errorReducer = (state , action ) => {
  switch(action.type){
  case SET_PRODUCT_ERROR:
    return { ...state,
      products:{ ...state.products,[action.payload.id]:{ status : 'error' } },
      errors: [...state.errors,{ ...action.payload,type:'product' }]
    }

  case SET_MANUFACTURER_ERROR:
    return { ...state,
      manufacturers:{ ...state.manufacturers,[action.payload.id]:{ status : 'error' } },
      errors: [...state.errors,{ ...action.payload,type:'manufacturer' }]
    }

  case CLEAR_ERROR:
    return { ...state, errors :state.errors.filter( error => error.id !== action.payload) }

  case CLEAR_ALL_ERROR:
    return { ...state, errros:[] }

  default:
    return state
  }


}

export default errorReducer