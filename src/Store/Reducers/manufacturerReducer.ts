import { Store } from '../../types'

/* eslint-disable no-case-declarations */
export const SET_MANUFACTURER_DATA = 'SET_MANUFACTURER_DATA'
export const SET_MANUFACTURER_FETCHING ='SET_MANUFACTURER_FETCHING'


export type ManufacturerAction =
  | {
      type: 'SET_MANUFACTURER_DATA',
      payload:{
        [manufacturer:string]:{
          data: any,
          lastRetrieved: number,
          status: 'fetched'
        }
      }
    }
  | {
      type: 'SET_MANUFACTURER_FETCHING',
      payload: string
    }

const manufacturerReducer = (state:Store , action : ManufacturerAction ) : Store => {
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