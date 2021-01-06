import React, {  } from 'react'
import { Button, Header, Segment } from 'semantic-ui-react'

const LandingPage = ({ setActivePage }) => {


  return (

    <Segment style={{ textAlign:'center' }}>
      <Header as ='h2'>Select Product Category </Header>
      <Button primary onClick= { () => setActivePage('gloves')}>Gloves</Button>
      <Button primary onClick= { () => setActivePage('facemasks')}>Facemasks</Button>
      <Button primary onClick= { () => setActivePage('beanies')}>Beanies</Button>
    </Segment>

  )

}

export default LandingPage