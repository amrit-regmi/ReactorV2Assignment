/* eslint-disable no-case-declarations */
export const SET_PRODUCT = 'SET_PRODUCT'
export const SET_PRODUCT_FETCHING ='SET_PRODUCT_FETCHING'
export const SET_PRODUCT_ERROR = 'SET_PRODUCT_ERROR'

const productReducer = (state , action ) => {
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
