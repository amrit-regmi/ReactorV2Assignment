import React, {  useEffect,FC } from 'react'
import { useStore, getDataFetchTimer, useDataFetcher } from '../Services/helpers'
import  { CLEAR_ALL_ERROR } from '../Store/Reducers/errorReducer'
import { ProductType } from '../types'
import DataTable from './DataTable'
import ErrorNotification from './ErrorNotification'
import StatusLoader from './StatusLoader'

const ItemsPage : FC <{productCategory: ProductType}> = ({ productCategory }) => {
  const [state,dispatch] = useStore()
  const { fetchManufacturer,fetchProducts } = useDataFetcher()

  /**Side Effect on Item change  */
  useEffect( () => {
    const timeOuts: number[] = [] /** cache timeouts for each request is stored in array so each can be cleared when components unmounts */
    const dataFetchTimer: number =  getDataFetchTimer (state.products[productCategory].lastRetrieved)// Time remaining before data is fetched
    timeOuts.push( window.setTimeout( () => fetchProducts(productCategory), dataFetchTimer))

    if (state.products[productCategory].data) {
    /**For each product listed on page get manufacturer and add to Set */
      const manufacturerList: Set<string> = new Set()
      state.products[productCategory].data.map( (product: { manufacturer: string }) => {
        manufacturerList.add(product.manufacturer)
      })

      /**For each manufacturer on set check if the data has expired , fetch accordingly */
      manufacturerList.forEach( manufacturer =>  {
        const manufacturerCacheTimer = getDataFetchTimer ( state.manufacturers[manufacturer] && state.manufacturers[manufacturer].lastRetrieved)
        //If the cache has expired or errror fetch immediately (timeoutDuration will be 0) else will wait until cache expires ( timeoutDuration will be time until cache expires )
        timeOuts.push( window.setTimeout (() => fetchManufacturer(manufacturer),manufacturerCacheTimer))
      })
    }

    //on component unmount
    return () => {
      dispatch ({
        type:CLEAR_ALL_ERROR,
      })
      // Clear all timouts
      timeOuts.forEach( id => {
        clearTimeout(id)
      })
    }

  },[productCategory,state.products[productCategory].data])

  return (
    <>
      <ErrorNotification/>
      <StatusLoader  productCategory = {productCategory} />
      <DataTable   productCategory = {productCategory} />
    </>
  )

}

export default ItemsPage
