import { useContext } from 'react'
import {  SET_MANUFACTURER_ERROR, SET_PRODUCT_ERROR } from './Reducers/errorReducer'
import { SET_MANUFACTURER_DATA, SET_MANUFACTURER_FETCHING } from './Reducers/manufacturerReducer'
import { SET_PRODUCT, SET_PRODUCT_FETCHING } from './Reducers/productsReducer'
import { getAvailablilityByManufacturer, getProductsByType } from './services'
import { StoreContext, ProviderValue } from './StoreProvider'
import { ProductType } from './types'

export const useStore = ():ProviderValue => useContext(StoreContext)

/**
*Function to check if the data needs to be refetched,
* @param {Int} fetchedTime data retrevied time
* @return {Int} remaining time unitl data is stale if data is not stale
* @return {bool} if data is stale
*/
export  const getDataFetchTimer = (fetchedTime:number | null, cacheDuration:number = 300000):number => {
  if(!fetchedTime){
    return 0
  }

  const currentTime = Date.now()
  const computedTime = fetchedTime.valueOf() + cacheDuration
  if(computedTime <=  currentTime){ //Cache is expired
    return 0
  }
  return (computedTime-currentTime)//Time until cache expires
}


/**Hook to fetch product and manufacturer data */
export const useDataFetcher = ():{ fetchProducts:Function, fetchManufacturer:Function } => {
  const[,dispatch] = useStore()

  /**Function to get products
   * @param {String} productCategory product category
  */
  const fetchProducts = async (productCategory:ProductType):Promise<void> => {
    try {
      dispatch({
        type: SET_PRODUCT_FETCHING,
        payload: productCategory
      })

      const productResult = await getProductsByType( productCategory)
      dispatch({
        type: SET_PRODUCT,
        payload:{
          [productCategory]: {
            data: productResult,
            lastRetrieved:Date.now() ,
            status: 'fetched'
          }
        }
      })
    }

    catch (e){
      dispatch({
        type: SET_PRODUCT_ERROR,
        payload: {
          id: productCategory,
          message:`Failed to load data for ${productCategory } ` ,
        }
      })
    }
  }

  /**Function to get product availablity
   * @param {String} manufacturer product manufacturer name
  */
  const fetchManufacturer = async (manufacturer:string):Promise<void> => {
    try{

      dispatch({
        type: SET_MANUFACTURER_FETCHING,
        payload: manufacturer
      })

      const availabilityData =   await  getAvailablilityByManufacturer(manufacturer)

      /**Check If the received data is invalid*/
      if(availabilityData.code !== 200 || !Array.isArray(availabilityData.response)){
        dispatch ({
          type:SET_MANUFACTURER_ERROR,
          payload: {
            id: manufacturer,
            message: `Failed to load availability data for Manufacturer ${manufacturer} `,
          }
        })
      }
      else{
        /**Data is valid */
        dispatch ({
          type:SET_MANUFACTURER_DATA,
          payload:{
            [manufacturer]:{
              data: availabilityData.response,
              lastRetrieved: Date.now(),
              status:'fetched'
            }
          }
        })
      }}
    catch (e) {
      dispatch ({
        type:SET_MANUFACTURER_ERROR,
        payload: {
          id: manufacturer,
          message: `Failed to load availability data for Manufacturer ${manufacturer} `,
        }
      })

    }
  }

  return  { fetchProducts, fetchManufacturer }
}