import React, {  } from 'react'
import {   Grid } from 'semantic-ui-react'
import GridRow from './GridRow'
import { FixedSizeList as List } from 'react-window'

const DataTable = ( { pageData, manufacturersData  }) => {

  return(
    <>
      { pageData && pageData.length  &&
        <>
          {/*Table Header Grid*/}
          <Grid celled textAlign='center'>
            <Grid.Row style={{ background:'aliceblue', color:'#000000de' ,borderBottom:'1px solid #2224261a' , fontWeight:'bold' ,paddingRight: '10px' }} columns='5'>
              <Grid.Column width='4'>Name</Grid.Column>
              <Grid.Column width='3'>Manufacturer</Grid.Column>
              <Grid.Column width='3'>Available Colours</Grid.Column>
              <Grid.Column width='2'>Price</Grid.Column>
              <Grid.Column width='2'>Availability</Grid.Column>
            </Grid.Row>
          </Grid>

          {/** Data Grid Wrapper*/}
          <Grid columns='5' celled style={{ margin:'0' }}>

            {/**Windowing for smooth page laoding */}
            < List
              height={window.innerHeight-150}
              itemCount={pageData.length}
              itemSize={40}
              width={window.innerWidth}
              itemData= {pageData}
            >
              {
                ({ index, style ,data }) =>
                  /** Component to display Individual Product Row*/
                  <Grid celled textAlign='center' style={{ ...style, margin:0 , backgroundColor: index % 2? 'whitesmoke':'' }}>
                    <GridRow product={data[index]} manufacturers={manufacturersData} style={style}/>
                  </Grid>
              }

            </ List>
          </Grid>
        </>
      }
    </>)
}

export default DataTable