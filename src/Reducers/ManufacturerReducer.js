/* eslint-disable no-case-declarations */
export const SET_MANUFACTURER_DATA = 'SET_MANUFACTURER_DATA'
export const SET_MANUFACTURER_DATA_ERROR = 'SET_MANUFACTURER_DATA_ERROR'
export const SET_MANUFACTURER_FETCHING ='SET_MANUFACTURER_FETCHING'

const manufacturerReducer = (state , action ) => {
  switch(action.type){
  case SET_MANUFACTURER_DATA:
    return { ...state, manufacturers: { ...state.manufacturers,...action.payload } }

  case SET_MANUFACTURER_FETCHING:
    return { ... state, manufacturers : { ...state.manufacturers,[action.payload]:{ ...state.manufacturers[action.payload],status :'loading' } }  }

  default:
    return state
  }
}
export default manufacturerReducer