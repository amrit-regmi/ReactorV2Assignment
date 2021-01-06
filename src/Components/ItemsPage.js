import React, { useEffect, useReducer, useState } from 'react'
import ManufacturerReducer, { SET_MANUFACTURER_DATA, SET_MANUFACTURER_DATA_ERROR ,SET_MANUFACTURER_FETCHING } from '../Reducers/ManufacturerReducer'
import ProductReducer, { SET_PRODUCT , SET_PRODUCT_FETCHING, SET_PRODUCT_ERROR } from '../Reducers/ProductsReducer'
import { getAvailablilityByManufacturer, getProductsByType } from '../services'
import DataTable from './DataTable'
import ErrorMessage from './Error'
import StatusLoader from './StatusLoader'

const ItemsPage = ({ item }) => {
  const initialState = { beanies: {}, gloves: {} , facemasks: {} }
  const [productsState,productsDipatch] = useReducer(ProductReducer,initialState)
  const [manufacturersState,manufacturersDispatch] = useReducer(ManufacturerReducer,{})
  const [errors,setErrors] = useState([]) // Errors, stores error and its respective refetch function
  const cacheDuration = 120000 // 5 min ApiCache

  /**
 *Function to check if the data needs to be refetched,
 * @param {Int} fetchedTime data retrevied time
 * @return {Int} remaining time unitl data is stale if data is not stale
 * @return {bool} if data is stale
 */
  const isStale = (fetchedTime) => {
    if(!fetchedTime){
      return 0
    }
    const currentTime = Date.now()
    if(parseInt(fetchedTime) + parseInt(cacheDuration) <=  currentTime){
      return 0
    }
    return (parseInt(fetchedTime)+parseInt(cacheDuration)-currentTime)
  }


  /**Function to get products */
  const fetchProducts = async productType => {
    try {
      productsDipatch({
        type: SET_PRODUCT_FETCHING,
        payload: item
      })

      const productResult = await getProductsByType( productType)
      productsDipatch({
        type: SET_PRODUCT,
        payload:{
          [item]: {
            data: productResult,
            lastRetrieved:Date.now() ,
            status: 'fetched'
          }
        }
      })
    }

    catch (e){
      productsDipatch({
        type: SET_PRODUCT_ERROR,
        payload:item
      })

      setErrors(errors => {
        return [...errors,{
          message:`Failed to load data for ${item } ` ,  retry: () => fetchProducts(productType)
        }]
      })
    }
  }

  /**Function to get product availability  */
  const getAvailability = async (manufacturer) => {
    try{

      manufacturersDispatch({
        type: SET_MANUFACTURER_FETCHING,
        payload: manufacturer
      })

      const availabilityData =   await  getAvailablilityByManufacturer(manufacturer)

      /**Check If the received data is invalid*/
      if(availabilityData.code !== 200 || !Array.isArray(availabilityData.response)){
        manufacturersDispatch ({
          type:SET_MANUFACTURER_DATA_ERROR,
          payload : manufacturer
        })
        setErrors(errors => {return [...errors,{ message:`Failed to load availability data for Manufacturer ${manufacturer} ` , retry: () => getAvailability(manufacturer) }]})
      }
      else{
      /**Data is valid */
        manufacturersDispatch ({
          type:SET_MANUFACTURER_DATA,
          payload:{
            [manufacturer]:{
              data: availabilityData.response,
              lastRetrieved: Date.now()
            }
          }
        })

      }}
    catch (e) {
      setErrors(errors => {return [...errors,{ message:`Failed to load availability data for ${manufacturer} ` , retry: () => getAvailability(manufacturer) }]})
      manufacturersDispatch ({
        type:SET_MANUFACTURER_DATA_ERROR,
        payload : manufacturer
      })

    }
  }

  /**Side Effect on Item change  */
  useEffect(() => {
    let timeOuts = [] /** cache timeouts for each request is stored in array so each can be cleared when components unmounts */
    const productCacheExpired =  isStale (productsState[item].lastRetrieved)//If product cache has not expired , store value when it needs to be refetched
    timeOuts.push( setTimeout(() => fetchProducts(item), productCacheExpired ))


    if (productsState[item].data) {
    /**For each product listed on page get manufacturer and add to Set */
      const manufacturerList = new Set()
      productsState[item].data.map( product => {
        manufacturerList.add(product.manufacturer)
      })

      /**For each manufacturer on set check if the data has expired , fetch accordingly */
      manufacturerList.forEach( manufacturer =>  {
        const manufacturerCacheExpired = isStale ( manufacturersState[manufacturer] && manufacturersState[manufacturer].lastRetrieved)
        //If the cache has expired or errror fetch immediately (timeoutDuration will be 0) else will wait until cache expires ( timeoutDuration will be time until cache expires )
        timeOuts.push(setTimeout (() => getAvailability(manufacturer),manufacturerCacheExpired))
      })
    }

    //on component unmount
    return () => {
      setErrors([])//Clear all errors
      // Clear all timouts
      timeOuts.forEach( id => {
        clearTimeout(id)
      })
    }

  },[item,productsState[item].data])

  return (
    <>
      {/**If errors  */
        errors.length ? errors.map((error,index) => {
          return <ErrorMessage key ={index} error={error}></ErrorMessage>
        }):''
      }
      <StatusLoader productStatus={productsState[item].status} manufacturersState={manufacturersState}></StatusLoader>
      {productsState[item].data &&
        <DataTable pageData ={productsState[item].data} manufacturersData={manufacturersState} />
      }

    </>
  )

}

export default ItemsPage
