import React, { FC } from 'react'
import { Grid, Loader, Segment } from 'semantic-ui-react'

const AvailabilityColumn: FC <{manufacturer: any, availability:string}>= ({ manufacturer,availability }) => {

  if(manufacturer && manufacturer.status === 'loading'){
    return(
      <Grid.Column width='2'>
        <Segment basic size='mini'>
          <Loader active size='mini' ></Loader>
        </Segment>
      </Grid.Column>
    )
  }

  return (
    <Grid.Column width='2'>
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
        <span style={{ color:'orange' }}>Less than {availability.match(/\d+/)}</span>
      }
      {
        availability && availability.includes('INSTOCK') &&
        'In Stock'
      }
    </Grid.Column>
  )
}

export default AvailabilityColumn