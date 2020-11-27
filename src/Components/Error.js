import React, { useState } from 'react'
import { Message } from 'semantic-ui-react'

const ErrorMessage = ({ error }) => {
  const[visible,setVisible] = useState(true)
  const onDismiss = () => {
    setVisible(false)
  }

  return (
    visible &&
    <Message negative onDismiss= {() => onDismiss()}>
      <Message.Header>
        {error.message}
      </Message.Header>
    </Message>

  )
}

export default ErrorMessage