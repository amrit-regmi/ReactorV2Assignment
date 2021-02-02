import React, { useState } from 'react'
import ItemsPage from './Components/ItemsPage'
import LandingPage from './Components/LandingPage'
import MenuBar from './Components/MenuBar'
import { StoreProvider } from './Store/StoreProvider'
import { ProductType } from './types'

const App = () => {
  const [activePage,setActivePage] = useState<string>('landingPage')
  return (<>
    <StoreProvider>
      {
        activePage === 'landingPage' ?
          <LandingPage setActivePage={setActivePage}> </LandingPage>
          :
          <>
            <MenuBar  activePage= {activePage as ProductType} setActivePage={ setActivePage }></MenuBar>
            <ItemsPage  productCategory= {activePage as ProductType} />
          </>}
    </StoreProvider>

  </>
  )

}

export default App
