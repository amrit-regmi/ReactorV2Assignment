/* eslint-disable no-case-declarations */
export const SET_PRODUCT = 'SET_PRODUCT'
export const SET_PRODUCT_FETCHING ='SET_PRODUCT_FETCHING'
export const SET_PRODUCT_ERROR = 'SET_PRODUCT_ERROR'

const ProductReducer = (state , action ) => {
  switch(action.type){
  case SET_PRODUCT:
    return { ...state,...action.payload }

  case SET_PRODUCT_FETCHING:
    const status = state[action.payload] && state[action.payload].data ?'refreshing':'loading'
    return { ... state, [action.payload]:{ ...state[action.payload],status }  }

  case SET_PRODUCT_ERROR:
    return { ... state, [action.payload]:{ error: 'Failed to load product data' }  }

  case 'default':
    return state
  }
}

export default ProductReducer
