import React from 'react'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'

const StatusLoader = ({ productStatus ,manufacturersState }) => {


  if(productStatus === 'loading') {
    return (
      <Segment
        textAlign='center'
        style={{ minHeight: 300, padding: '1em 0em' }}
        vertical>
        <Dimmer active inverted>
          <Loader size='big'inverted>Loading </Loader>
        </Dimmer>
      </Segment>
    )
  }

  if (productStatus === 'refreshing' || Object.keys(manufacturersState).some(manufacturer => manufacturersState[manufacturer].status )) {
    return (
      <Segment basic>
        <Dimmer active inverted>
          <Loader size='tiny'inverted> Updating . . .</Loader>
        </Dimmer>
      </Segment>
    )
  }

  return null

}

export default StatusLoader
