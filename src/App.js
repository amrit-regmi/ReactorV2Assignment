import React, { useState } from 'react'
import DataTable from './Components/DataTable'
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
        <DataTable  activePage= {activePage} />
      </>
  )

}

export default App
