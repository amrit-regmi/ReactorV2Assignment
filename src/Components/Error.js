import React, { useState } from 'react'
import { Message,Header, Button, Label ,Icon } from 'semantic-ui-react'

const ErrorMessage = ({ error }) => {
  const[visible,setVisible] = useState(true)
  const onDismiss = () => {
    setVisible(false)
  }

  return (
    visible &&
    <Message negative onDismiss= {() => onDismiss()}>
      <Header as='h5'>
        {error.message}  <Label as={Button} color='red' size='mini' onClick ={
          () => {
            error.retry()
            onDismiss()
          }
        }> <Icon name='refresh' /> Refetch </Label>
      </Header>
    </Message>

  )
}

export default ErrorMessage