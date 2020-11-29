import React, { useEffect, useState } from 'react'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'
import { getAvailablilityByManufacturer, getProductsByType } from '../services'
import DataTable from './DataTable'
import ErrorMessage from './Error'

const ItemsPage = ({ item }) => {
  const [products,setProducts]= useState({}) // Stores all products data
  const [manufacturers,setManufacturers] =useState({}) // Stores all manufacturers data and will be shared for each item
  const [data, setData] = useState([]) // Stores data for current page
  const [errors,setErrors] = useState([]) // Errors, stores error and its respective refetch function
  const [loading,setLoading] = useState(false) //Stores product items loading state
  const [refreshing, setRefreshing] = useState(false) //Stores refreshing state when the request is sent on background
  const cacheDuration = 300000 // 5 min ApiCache

  /**
 *Function to check if the data needs to be refetched,
 * @param {Int} fetchedTime data retrevied time
 * @return {Int} remaining time unitl data is stale if data is not stale
 * @return {bool} if data is stale
 */
  const isStale = (fetchedTime) => {
    const currentTime = Date.now()
    if(parseInt(fetchedTime) + parseInt(cacheDuration) <=  currentTime){
      return true
    }
    return (parseInt(fetchedTime)+parseInt(cacheDuration)-currentTime)
  }

  /**Function to set products state */
  const fetchProducts = async productType => {
    try {
      setRefreshing(true)
      const productResult = await getProductsByType( productType)

      setData(productResult)
      setProducts( { ...products , [item]: { data: productResult , lastRetrieved: Date.now() } })

      setLoading(false)
      setRefreshing(false)

    }
    catch (e){
      setRefreshing(false)
      setErrors(errors => {
        return [...errors,{
          message:`Failed to load data for ${item } ` ,  retry: () => fetchProducts(productType)
        }]
      })
    }
  }

  /**Function to get product availability  */
  const getAvailability = async (manufacturer) => {

    let requestData
    try{
      setRefreshing(true)
      const availabilityData =   await  getAvailablilityByManufacturer(manufacturer)

      /**Check If the received data is invalid*/
      if(availabilityData.code !== 200 || !Array.isArray(availabilityData.response)){
        requestData = { error:'Error Fetching',data:[] }
        setErrors(errors => {return [...errors,{ message:`Failed to load availability data for Manufacturer ${manufacturer} ` , retry: () => getAvailability(manufacturer) }]})
      }
      else{
        /**Data is valid */
        requestData = { error: false, data:availabilityData.response , lastRetrieved: Date.now() }

      }}
    catch (e) {
      requestData = { error:e.message, data:[] ,  lastRetrieved: Date.now() }
      setErrors(errors => {return [...errors,{ message:`Failed to load availability data for ${manufacturer} ` , retry: () => getAvailability(manufacturer) }]})

    }
    finally
    {
      /**Add the manufacturer data to manufacturers state */
      setManufacturers((manufacturers) => {return { ...manufacturers, [manufacturer]:requestData }})
      setRefreshing(false)
    }
  }

  /**Fires when the page data changes  */
  useEffect(() => {
    setLoading(true)
    let timeout
    const requestProducts = async () => {
      const dataStale = products[item] ? isStale (products[item].lastRetrieved): true //If data is set and notStale, store value when it needs to be refetched
      if(dataStale === true){
        /*Refetch immediately and time another refetch for cache duration  */
        setRefreshing(true)
        await fetchProducts(item)
        timeout = setTimeout( requestProducts, cacheDuration )

      }else{
        /*Render page from cached data and refetch request only after cache has expired */
        setData(products[item].data)
        timeout = setTimeout( requestProducts, dataStale )
        setLoading(false)
      }
    }

    requestProducts()


    return () => {

      setErrors([]) //Clear all errors
      setRefreshing(false) //Clear refreshing
      clearTimeout( timeout) // Clear timeout on unmount
    }

  },[item])


  /**Fires when the products data changes  ie. when the new request is made for product type*/
  useEffect(  () => {
    /*If page data is not set */
    if(!data.length){
      return null
    }

    setLoading(false)
    let timeOuts = []
    const manufacturerList = new Set()

    /**For each product listed on page get manufacturer and add to list */
    data.forEach(product => {
      manufacturerList.add(product.manufacturer)
    })

    const requestAvailability =  () => {
      /**For each manufacturer check if the data has expired , fetch accordingly */
      manufacturerList.forEach(async(manufacturer) => {
        const dataStale = manufacturers[manufacturer]? isStale (manufacturers[manufacturer].lastRetrieved) || manufacturers[manufacturer].error !== false : true
        const timeOutDuration = dataStale === true? 0 : dataStale

        /**
         *If the data isstale or errror fetch immediately timeoutDuration will be 0
         *else wait until cache expires timeoutDuration will be timeuntil cache expires
         *store the timeoutId for each request in array so each can be cleared when components unmounts
         */
        timeOuts.push(setTimeout (() => getAvailability(manufacturer),timeOutDuration))
        setRefreshing(false)
      })
    }

    requestAvailability()

    return () => {
      setRefreshing(false)
      setErrors([])//Clear all errors
      // Clear all timouts on unmount
      timeOuts.forEach( id => {
        clearTimeout(id)
      })
    }
  },[products])

  /**Page Loading Indicator **/
  if(loading){
    return  (
      <Segment
        textAlign='center'
        style={{ minHeight: 300, padding: '1em 0em' }}
        vertical>
        <Dimmer active inverted>
          <Loader size='big'inverted>Loading {item}</Loader>
        </Dimmer>
      </Segment>

    )
  }

  return (
    <>
      {/**If errors  */
        errors.length ? errors.map((error,index) => {
          return <ErrorMessage key ={index} error={error}></ErrorMessage>
        }):''
      }

      {/**Data is reloading on background */
        refreshing &&
        <Segment basic>
          <Dimmer active inverted>
            <Loader size='tiny'inverted> Updating . . .</Loader>
          </Dimmer>
        </Segment>
      }

      <DataTable pageData ={data} manufacturersData={manufacturers} />
    </>
  )

}

export default ItemsPage
