/* eslint-disable no-case-declarations */
import React, { useReducer } from 'react'

export const SET_MANUFACTURER_DATA = 'SET_MANUFACTURER_DATA'
export const SET_MANUFACTURER_DATA_ERROR = 'SET_MANUFACTURER_DATA_ERROR'
export const SET_MANUFACTURER_FETCHING ='SET_MANUFACTURER_FETCHING'

const ManufacturerReducer = (state , action ) => {
  switch(action.type){
  case SET_MANUFACTURER_DATA:
    return { ...state, ...action.payload }

  case SET_MANUFACTURER_FETCHING:
    const status = state[action.payload] && state[action.payload].data?'refreshing':'loading'
    return { ... state, [action.payload]:{ ...state[action.payload],status }  }

  case SET_MANUFACTURER_DATA_ERROR:
    return { ...state,
      [action.payload]: {
        error: 'Failed to load manufacutrer data'
      }
    }
  case 'default':
    return state
  }
}

export default ManufacturerReducer
