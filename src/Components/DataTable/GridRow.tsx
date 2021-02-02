import React, { FC, useEffect, useState } from 'react'
import { Grid, Label } from 'semantic-ui-react'
import { useStore } from '../../Services/helpers'
import AvailabilityColumn from './AvailabilityColumn'

const GridRow: FC <{product: any}> = ({ product }) => {
  const [{ manufacturers },] = useStore()

  const [availability,setAvailability] = useState<string>('')
  const manufacturer =  manufacturers[product.manufacturer]
  useEffect(() => {
    if(manufacturer && manufacturers[product.manufacturer].status === 'error' ){ //If manufacturer information exists and error is set
      setAvailability('ERROR')
      return
    }

    if( manufacturer && manufacturer.data){ //If manufacturer information exists then serach record
      const record = manufacturer.data.find( (item: { id: any }):boolean => {
        if(item.id === product.id.toUpperCase()){
          return true
        }
        return false
      })

      if(record){ // If record found return record with apprporiate formatting
        let availability = record.DATAPAYLOAD.match(/<INSTOCKVALUE>(.*?)<\/INSTOCKVALUE>/g).map((val: string) => val.replace(/<\/?INSTOCKVALUE>/g,''))
        setAvailability(availability[0])
      }
    }



  },[])

  /**Component for Individual Product */
  return (
    <Grid.Row columns='5'
      style={
        /*Set background color based on availability data*/
        { height: '40px',
          backgroundColor:
          availability.includes('LESSTHAN')?
            'lightyellow':
            availability.includes('OUTOFSTOCK') || availability.includes('ERROR')?
              'mistyrose':
              ''
        }
      }
    >
      <Grid.Column width='4'>{ product.name }</Grid.Column>
      <Grid.Column width='3'>{ product.manufacturer }</Grid.Column>
      <Grid.Column width='3'>{
      /**Displaying colored labels insted of text */
        product.color && product.color.map((color: string | number | null | undefined) => {
          return (
            <Label size='mini' circular key={color} style={{ backgroundColor: color, border:color==='white'?'0.1em solid black':'' }}></Label>)})
      }</Grid.Column>
      <Grid.Column width='2'>{product.price}</Grid.Column>

      <AvailabilityColumn manufacturer = {manufacturer} availability={availability}/>


    </Grid.Row>
  )
}



export default GridRow