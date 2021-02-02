import React, { FC, useState } from 'react'
import ItemsPage from './Components/ItemsPage'
import LandingPage from './Components/LandingPage'
import MenuBar from './Components/MenuBar'
import { StoreProvider } from './Store/StoreProvider'

const App : FC = () => {
  const [activePage,setActivePage] = useState<any>('landingPage')
  return (
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
  )

}

export default App
