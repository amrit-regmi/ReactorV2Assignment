import React, { useState } from 'react'
import DataTable from './Components/DataTable/DataTable'
import ItemsPage from './Components/ItemsPage'
import LandingPage from './Components/LandingPage'
import MenuBar from './Components/MenuBar'


const App = () => {
  const [activePage,setActivePage] = useState('landingPage')
  return (
    activePage === 'landingPage' ?
      <LandingPage setActivePage={setActivePage}> </LandingPage>
      :
      <>
        <MenuBar  activePage= {activePage} setActivePage={setActivePage}></MenuBar>
        <ItemsPage  item= {activePage} />
      </>
  )

}

export default App
