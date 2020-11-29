import React, { useState } from 'react'
import { Grid, Label } from 'semantic-ui-react'
import AvailabilityColumn from './AvailabilityColumn'

const GridRow = ({ product ,manufacturers ,style }) => {
  const [availbility,setAvailability] = useState('')

  return (
    <Grid.Row columns='5'
      style={
        /*Set background color based on availability data*/
        { height: style.height,
          backgroundColor:
        availbility.includes('LESSTHAN')?
          'lightyellow':
          availbility.includes('OUTOFSTOCK') || availbility.includes('ERROR')?
            'mistyrose':
            ''
        }
      }
    >
      <Grid.Column width='4'>{product.name}</Grid.Column>
      <Grid.Column width='3'>{product.manufacturer}</Grid.Column>
      <Grid.Column width='3'>{
      /**Displaying colored labels insted of text */
        product.color && product.color.map((color) => {
          return (
            <Label size='mini' circular key={color} style={{ backgroundColor: color, border:color==='white'?'0.1em solid black':'' }}></Label>)})
      }</Grid.Column>
      <Grid.Column width='2'>{product.price}</Grid.Column>
      <AvailabilityColumn product={product} manufacturers = {manufacturers} setAvailability={setAvailability} availability={availbility}/>


    </Grid.Row>
  )
}



export default GridRow