import React from 'react'
import { Menu, MenuItem } from 'semantic-ui-react'
const MenuBar = ({ setActivePage, activePage }) => {
  return(
    <Menu color='blue' inverted>
      <MenuItem active={activePage === 'Jackets'} onClick={() => setActivePage('Jackets')}>Jackets</MenuItem>
      <MenuItem active={activePage === 'Shirts'} onClick={() => setActivePage('Shirts')}>Shirts</MenuItem>
      <MenuItem active={activePage === 'Accessories'} onClick={() => setActivePage('Accessories')}>Accessories</MenuItem>
    </Menu>
  )
}

export default MenuBar