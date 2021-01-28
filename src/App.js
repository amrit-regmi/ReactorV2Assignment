import React, { useState } from 'react'
import ItemsPage from './Components/ItemsPage'
import LandingPage from './Components/LandingPage'
import MenuBar from './Components/MenuBar'
import { StoreProvider } from './StoreProvider'

const App = () => {
  const [activePage,setActivePage] = useState('landingPage')
  return (<>
    <StoreProvider>
      {
        activePage === 'landingPage' ?
          <LandingPage setActivePage={setActivePage}> </LandingPage>
          :
          <>
            <MenuBar  activePage= {activePage} setActivePage={setActivePage}></MenuBar>
            <ItemsPage  productCategory= {activePage} />
          </>}
    </StoreProvider>

  </>
  )

}

export default App
