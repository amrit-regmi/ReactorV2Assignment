import React, {  } from 'react'
import {  Grid  } from 'semantic-ui-react'
import GridRow from './GridRow'
import { FixedSizeList as List } from 'react-window'

const DataTable = ( { pageData, manufacturersData  }) => {

  const DataGridRows = ({ index, style ,data }) => {
    return  (
      <Grid celled textAlign='center' style={{ ...style, margin:0 , backgroundColor: index % 2? 'whitesmoke':'' }}>
        <GridRow product={data[index]} manufacturers={manufacturersData} />
      </Grid>)
  }

  return(

    pageData.length > 0 &&
    <>
      <Grid celled textAlign='center'>
        <Grid.Row style={{ background:'aliceblue', color:'#000000de' ,borderBottom:'1px solid #2224261a' , fontWeight:'bold' ,paddingRight: '10px' }} columns='5'>
          <Grid.Column >Name</Grid.Column>
          <Grid.Column>Manufacturer</Grid.Column>
          <Grid.Column>Available Colours</Grid.Column>
          <Grid.Column>Price</Grid.Column>
          <Grid.Column>Availability</Grid.Column>
        </Grid.Row>
      </Grid>


      <Grid columns='5' celled style={{ margin:'0' }}>
        < List
          height={window.innerHeight-150}
          itemCount={pageData.length}
          itemSize={55}
          width={window.innerWidth}
          itemData= {pageData}
        >
          { DataGridRows }

        </ List>
      </Grid>
    </>




  )
}

export default DataTable