import React, { Fragment } from 'react'
import { Button, Header, Icon, Label, Message } from 'semantic-ui-react'
import { useDataFetcher,useStore } from '../helpers'
import { CLEAR_ERROR } from '../Reducers/errorReducer'
import { DataType, ProductType } from '../types'

const ErrorNotification = () => {
  const [state,dispatch] = useStore()
  const{ fetchManufacturer,fetchProducts } = useDataFetcher()
  if(!state.errors.length){
    return null
  }

  /**Function to refetch data while error
   * @param {String} type manufacturer/product
   * @param {String} id manufacturer/product name
   */
  const retryFetch = (type: DataType,id: string) => {

    if(type === 'manufacturers'){
      fetchManufacturer(id)
    }

    if( type === 'products'){
      const productType  =  id as ProductType
      fetchProducts(productType)
    }

    dispatch ({
      type: CLEAR_ERROR,
      payload: id
    })
  }

  return (
    <>
      {
        state.errors.map((error) => <Fragment key={error.id}>
          <Message
            negative
            onDismiss= {() => dispatch({
              type: CLEAR_ERROR,
              payload: error.id
            })}
          >
            <Header as='h5'>
              {error.message}
              <Label as={Button} color='red' size='mini' onClick ={
                () =>  retryFetch(error.type, error.id)
              }> <Icon name='refresh' /> Refetch </Label>
            </Header>
          </Message>
        </Fragment>)
      }
    </>
  )
}

export default ErrorNotification