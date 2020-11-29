import React from 'react'
import { Grid, Loader, Segment } from 'semantic-ui-react'



const AvailabilityColumn = ({ product,manufacturers }) => {

  /**
   * Function to get the availabilty status for each product item
   * @param {String} id productID
   * @param {String} productManufacturer Manufacturer
   */
  const checkAvailability = () => {
    const manufacturer =  manufacturers[product.manufacturer]

    if( manufacturer && manufacturer.data.length > 0){ //If manufacturer information exixts
      const record = manufacturer.data.find( item => {
        if(item.id === product.id.toUpperCase()){
          return true
        }
      })

      if(record){
        const availability = record.DATAPAYLOAD.match(/<INSTOCKVALUE>(.*?)<\/INSTOCKVALUE>/g).map(val => val.replace(/<\/?INSTOCKVALUE>/g,''))
        return <span style={{ color: availability[0].includes('LESSTHAN')?'orange':availability[0].includes('OUTOFSTOCK')?'red':'black' }}> {availability}</span>
      }
    }
  }

  return (
    <Grid.Column>
      {!manufacturers || !manufacturers[product.manufacturer] ? // if the manufacturer data is not loaded
        <Segment compact basic size='mini'>
          <Loader active size='mini' ></Loader>
        </Segment>:
        manufacturers && manufacturers[product.manufacturer] && manufacturers[product.manufacturer].error ? //If the request has failed
          <span style={{ color:'red' }}>Error Fetching</span>:
          checkAvailability()
      }
    </Grid.Column>
  )
}

export default AvailabilityColumn