import React, { FC } from 'react'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'
import { useStore } from '../helpers'
import { ProductType } from '../types'

const StatusLoader: FC <{productCategory: ProductType}> = ({ productCategory }) => {

  const [state,] = useStore()

  const product = state.products[productCategory]

  /**Main Loader on first load of category */
  if(product.status === 'loading' && !product.data) {
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

  /**If the product data is being refetched */
  if (product.data && product.status === 'loading' ) {
    return (
      <Segment basic>
        <Dimmer active inverted>
          <Loader size='tiny'inverted> Refreshing Product . . .</Loader>
        </Dimmer>
      </Segment>
    )
  }


  /**If the manufacturer data is being loaded first time */
  if(Object.keys(state.manufacturers).some(manufacturer => state.manufacturers[manufacturer] && state.manufacturers[manufacturer].status === 'loading' && !state.manufacturers[manufacturer].data )){
    return (
      <Segment basic>
        <Dimmer active inverted>
          <Loader size='tiny'inverted> Loading availability data . . .</Loader>
        </Dimmer>
      </Segment>
    )

  }

  if(Object.keys(state.manufacturers).some(manufacturer => state.manufacturers[manufacturer].status=== 'loading' && state.manufacturers[manufacturer].data)){
    return (
      <Segment basic>
        <Dimmer active inverted>
          <Loader size='tiny'inverted> Updating availability data . . .</Loader>
        </Dimmer>
      </Segment>
    )

  }

  return null

}

export default StatusLoader
