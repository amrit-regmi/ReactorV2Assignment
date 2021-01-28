import React, { useReducer, createContext } from 'react'
import errors from './Reducers/errorReducer'
import manufacturers from './Reducers/manufacturerReducer'
import products from './Reducers/productsReducer'

export const StoreContext = createContext()

const initialState = {
  products:{
    gloves:{},
    beanies:{},
    facemasks:{},
  },
  manufacturers : {},
  errors:[]
}

const combineReducers = (...reducers) =>
  (state = initialState, action) => {
    for(let i=0;i<reducers.length;i++)
      state = reducers[i](state, action)
    return state
  }

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer( combineReducers (   errors,products,manufacturers   ), initialState)
  const store = React.useMemo(() => [state, dispatch], [state])
  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  )
}
