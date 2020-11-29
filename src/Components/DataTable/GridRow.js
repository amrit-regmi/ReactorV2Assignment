import React from 'react'
import { Grid, Label } from 'semantic-ui-react'
import AvailabilityColumn from './AvailabilityColumn'

const GridRow = ({ product ,manufacturers }) => {
  return (
    <Grid.Row columns='5' >
      <Grid.Column>{product.name}</Grid.Column>
      <Grid.Column>{product.manufacturer}</Grid.Column>
      <Grid.Column>{
        product.color && product.color.map((color) => {
          return (
            <Label size='mini' circular key={color} style={{ backgroundColor: color, border:color==='white'?'0.1em solid black':'' }}></Label>)})
      }</Grid.Column>
      <Grid.Column>{product.price}</Grid.Column>
      <AvailabilityColumn product={product} manufacturers = {manufacturers}/>


    </Grid.Row>
  )
}



export default GridRow