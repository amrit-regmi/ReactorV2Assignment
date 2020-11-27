import React, {  } from 'react'
import { Button, Header, Segment } from 'semantic-ui-react'

const LandingPage = ({ setActivePage }) => {


  return (

    <Segment style={{ textAlign:'center' }}>
      <Header as ='h2'>Select Product Category </Header>
      <Button primary onClick= { () => setActivePage('Jackets')}>Jackets</Button>
      <Button primary onClick= { () => setActivePage('Shirts')}>Shirts</Button>
      <Button primary onClick= { () => setActivePage('Accessories')}>Accessories</Button>
    </Segment>

  )

}

export default LandingPage