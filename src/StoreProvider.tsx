import React, { useReducer, createContext, FC, Dispatch, useMemo, useContext } from 'react'
import errors from './Reducers/errorReducer'
import manufacturers from './Reducers/manufacturerReducer'
import products from './Reducers/productsReducer'
import { DispatchActions, Store } from './types'

const initialState = {
  products:{
    gloves:{
      data: [],
      status: null,
      lastRetrieved:  null
    },
    beanies:{
      data: [],
      status: null,
      lastRetrieved:  null
    },
    facemasks:{
      data: [],
      status: null,
      lastRetrieved:  null
    },
  },
  manufacturers : {},
  errors:[]
}

export const StoreContext = createContext<[Store, Dispatch<DispatchActions>]>([
  initialState,
  () => initialState
])

const combineReducers = (...reducers:Function[]) =>
  (state:any = initialState, action:any) => {
    for(let i=0;i<reducers.length;i++)
      state = reducers[i](state, action)
    return state
  }

export type ProviderValue = [Store, Dispatch<DispatchActions>]

export const StoreProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer ( combineReducers (   errors,products,manufacturers   ), initialState)
  const memoisedStore = useMemo<ProviderValue>(() => [state, dispatch], [state])
  return (
    <StoreContext.Provider value ={memoisedStore}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => useContext(StoreContext)
