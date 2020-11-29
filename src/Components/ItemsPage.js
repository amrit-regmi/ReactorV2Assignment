import React, { useEffect, useState } from 'react'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'
import { getAvailablilityByManufacturer, getProductsByType } from '../services'
import DataTable from './DataTable/DataTable'
import ErrorMessage from './Error'

const ItemsPage = ({ item }) => {
  const [products,setProducts]= useState({})
  const [manufacturers,setManufacturers] =useState({})
  const [data, setData] = useState([])
  const [errors,setErrors] = useState([])
  const [loading,setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const cacheDuration = 300000 // 5 min cache

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
      if(availabilityData.code !== 200 || !Array.isArray(availabilityData.response)){
        requestData = { error:'Error Fetching',data:[] }
        setErrors(errors => {return [...errors,{ message:`Failed to load availability data for Manufacturer ${manufacturer} ` , retry: () => getAvailability(manufacturer) }]})
      }else{
        requestData = { error: false, data:availabilityData.response , lastRetrieved: Date.now() }

      }}
    catch (e) {
      requestData = { error:e.message, data:[] ,  lastRetrieved: Date.now() }
      setErrors(errors => {return [...errors,{ message:`Failed to load availability data for ${manufacturer} ` , retry: () => getAvailability(manufacturer) }]})

    }
    finally
    {
      setManufacturers((manufacturers) => {return { ...manufacturers, [manufacturer]:requestData }})
      setRefreshing(false)
    }
  }

  useEffect(() => {
    setLoading(true)
    let timeout
    const requestProducts = async () => {
      const dataStale = products[item] ? isStale (products[item].lastRetrieved): true //If data is set and notStale, store value when it needs to be refetched

      /**Refetch request only after cache has expired */
      if(dataStale === true){
        setRefreshing(true)
        await fetchProducts(item)
        timeout = setTimeout( requestProducts, cacheDuration )

      }else{
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


  useEffect(  () => {
    /*If data is not set */
    if(!data.length){
      return null
    }

    setLoading(false)
    let timeOuts = []
    const manufacturerList = new Set()


    data.forEach(product => {
      manufacturerList.add(product.manufacturer)
    })

    const requestAvailability =  () => {

      manufacturerList.forEach(async(manufacturer) => {

        const dataStale = manufacturers[manufacturer]? isStale (manufacturers[manufacturer].lastRetrieved) || manufacturers[manufacturer].error !== false : true

        const timeOutDuration = dataStale === true? 0 : dataStale

        timeOuts.push(setTimeout (() => getAvailability(manufacturer),timeOutDuration)) //If the data isstale or errror fetch immediately else wait until cache expires
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
