import React from 'react'
import { Grid, Loader, Segment } from 'semantic-ui-react'



const AvailabilityColumn = ({ manufacturer,availability }) => {

  return (
    <Grid.Column width='2'>
      {manufacturer && manufacturer.status &&// if the manufacturer data is not loading or refetching
        <Segment basic size='mini'>
          <Loader active size='mini' ></Loader>
        </Segment>
      }
      {manufacturer && !manufacturer.status && <>
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
      </>
      }

    </Grid.Column>

  )


}

export default AvailabilityColumn