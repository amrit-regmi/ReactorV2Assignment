import React, { useEffect, useRef, useState } from 'react'
import {  Dimmer, Loader, Segment, Table } from 'semantic-ui-react'
import { getProductsByType,getAvailablilityByManufacturer } from '../services'
import ErrorMessage from './Error'

const DataTable = ( { activePage }) => {

  const [manufacturers,setManufacturers] = useState({})
  const [products,setProducts]= useState({})
  const [loading, setLoading] = useState(false)
  const [errors,setErrors] = useState([])
  const apiCache = 300000

  const activePageRef = useRef (activePage)
  activePageRef.current = activePage

  const data = products[activePage] && products[activePage].data

  const getAvailability = async manufacturer => await  getAvailablilityByManufacturer(manufacturer)
  const getProducts = async productType => await  getProductsByType(productType)

  /**
 *Function to check if the data needs to be refetched,
 * @param {Int} fetchedTime data retrevied time
 * @return {Int} remaining time unitl data is stale if data is not stale
 * @return {bool} if data is stale
 */
  const isStale = (fetchedTime) => {
    const currentTime = Date.now()
    if(parseInt(fetchedTime) + parseInt(apiCache) <=  currentTime){
      return true
    }
    return (parseInt(fetchedTime)+parseInt(apiCache)-currentTime)
  }


  /** Effect Hook when page changes */
  useEffect(() => {

    let ignore = false
    let timeoutId

    const requestProducts = async() => {
      setErrors([])
      const dataStale = data? isStale (products[activePage].lastRetrieved): true //If data is set and notStale, store value when it needs to be refetched

      try {
        setLoading(true)
        const productResult = await getProducts( activePageRef.current)
        if (!ignore) setProducts( { ...products , [activePage]: { data: productResult , lastRetrieved: Date.now() } })
      }
      catch (e){
        if (!ignore) setErrors(errors => {
          return [...errors,{
            message:`Failed to load data for ${activePageRef.current } ` ,
          }]
        })
      }finally
      {
        setLoading(false)
      }
      /**Refetch request after cache has expired */
      timeoutId = setTimeout(requestProducts, (dataStale !==true? dataStale : apiCache))
    }

    requestProducts()

    return () => {
      ignore = true
      clearTimeout( timeoutId)
    }

  },[activePage])

  /* Effect hook after the products is loaded , fetches the manufacturer data and sets availability*/
  useEffect(  () => {
    /*If data is not set */
    if(!data){
      return null
    }

    let ignore = false
    const manufacturerList = new Set()
    data.forEach(product => {
      manufacturerList.add(product.manufacturer)
    })

    const requestAvailability = async () => {
      setErrors([])

      manufacturerList.forEach(async(manufacturer) => {
        let data
        try{
          const availabilityData =   await  getAvailability(manufacturer)
          if(availabilityData.code !== 200 || !Array.isArray(availabilityData.response)){
            data = { error:'Error Fetching',data:[] }
            if (!ignore) setErrors(errors => {return [...errors,{ message:`Failed to load availability data for Manufacturer ${manufacturer} ` }]})
          }else{
            data = { error: false, data:availabilityData.response }
          }}
        catch (e) {
          data = { error:e.message, data:[] }
          if (!ignore) setErrors(errors => {return [...errors,{ message:`Failed to load availability data for ${manufacturer} ` }]})

        }
        finally
        {
          if (!ignore) setManufacturers((manufacturers) => {return { ...manufacturers, [manufacturer]: data }})
        }

      })

    }

    requestAvailability()


    return () => {
      ignore = true
    }


  },[products])


  /**
   * Function to get the availabilty status for each product item
   * @param {String} id productID
   * @param {String} productManufacturer Manufacturer
   */
  const checkAvailability = (id,productManufacturer) => {
    const manufacturer =  manufacturers[productManufacturer]

    if( manufacturer && manufacturer.data.length > 0){ //If manufacturer information exixts
      const record = manufacturer.data.find(product => {
        if(product.id === id.toUpperCase()){
          return true
        }
      })

      if(record){
        const availability = record.DATAPAYLOAD.match(/<INSTOCKVALUE>(.*?)<\/INSTOCKVALUE>/g).map(val => val.replace(/<\/?INSTOCKVALUE>/g,''))
        return <span style={{ color: availability[0].includes('LESSTHAN')?'orange':availability[0].includes('OUTOFSTOCK')?'red':'black' }}> {availability}</span>
      }
    }
  }

  /**Inital Loader */
  if(!data){
    return  (
      <Segment
        textAlign='center'
        style={{ minHeight: 300, padding: '1em 0em' }}
        vertical>
        <Dimmer active inverted>
          <Loader size='big'inverted>Loading {activePage}</Loader>
        </Dimmer>
      </Segment>

    )
  }


  return (
    <>{/**If errors  */
      errors.length ? errors.map((error,index) => {
        return <ErrorMessage key ={index} error={error}></ErrorMessage>
      }):''
    }

    {/**Data is reloading on background */
      loading &&
      <Segment basic>
        <Dimmer active inverted>
          <Loader size='tiny'inverted>Refreshing Data</Loader>
        </Dimmer>
      </Segment>
    }
    {data &&
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Manufacturer</Table.HeaderCell>
            <Table.HeaderCell>Available Colours</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Availability</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{data.map(product =>
          <Table.Row key={product.id}>
            <Table.Cell>{product.name}</Table.Cell>
            <Table.Cell>{product.manufacturer}</Table.Cell>
            <Table.Cell>{
              product.color && product.color.reduce((p,c) => p +' / '+ c)
            }</Table.Cell>
            <Table.Cell>{product.price}</Table.Cell>
            <Table.Cell>
              {!manufacturers || !manufacturers[product.manufacturer] ? // if the manufacturer data is not loaded
                <Segment compact basic size='mini'><Loader active size='mini' ></Loader></Segment>:
                manufacturers && manufacturers[product.manufacturer] && manufacturers[product.manufacturer].error ? //If the request has failed
                  <span style={{ color:'red' }}>Error Fetching</span>:
                  checkAvailability(product.id, product.manufacturer)
              }
            </Table.Cell>
          </Table.Row>)}
        </Table.Body>
      </Table>
    }
    </>

  )

}

export default DataTable