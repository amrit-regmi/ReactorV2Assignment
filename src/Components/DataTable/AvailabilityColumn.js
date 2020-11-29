import React, { useEffect } from 'react'
import { Grid, Loader, Segment } from 'semantic-ui-react'



const AvailabilityColumn = ({ product,manufacturers, setAvailability ,availability }) => {
  useEffect (() => {
    const manufacturer =  manufacturers[product.manufacturer]

    if(manufacturers && manufacturers[product.manufacturer] && manufacturers[product.manufacturer].error ){ //If manufacturer information exists and error is set
      setAvailability('ERROR')
      return
    }

    if( manufacturer && manufacturer.data.length > 0){ //If manufacturer information exists then serach record
      const record = manufacturer.data.find( item => {
        if(item.id === product.id.toUpperCase()){
          return true
        }
      })

      if(record){ // If record found return record with apprporiate formatting
        let availability = record.DATAPAYLOAD.match(/<INSTOCKVALUE>(.*?)<\/INSTOCKVALUE>/g).map(val => val.replace(/<\/?INSTOCKVALUE>/g,''))
        setAvailability(availability[0])
      }
    }

  },[manufacturers])

  return (
    <Grid.Column width='2'>
      {!availability &&// if the manufacturer data is not loaded display loader
        <Segment basic size='mini'>
          <Loader active size='mini' ></Loader>
        </Segment>
      }
      {
        availability==='ERROR' &&
        <span style={{ color:'red' }}>Error Fetching</span>
      }
      {
        availability && availability.includes('OUTOFSTOCK' )&&
        <span style={{ color:'red' }}>Out of Stock</span>
      }

      {
        availability && availability.includes('LESSTHAN') &&
        <span style={{ color:'orange' }}>Less than {availability.match(/\d+/)[0]}</span>
      }
      {
        availability && availability.includes('INSTOCK') &&
        'In Stock'
      }

    </Grid.Column>

  )


}

export default AvailabilityColumn