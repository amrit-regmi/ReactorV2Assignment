import React from 'react'
import { Menu, MenuItem } from 'semantic-ui-react'
import { ProductType } from '../types'

type MenuBarProps = {
  setActivePage: Function,
  activePage:ProductType
}

const MenuBar: React.FC<MenuBarProps> = ({ setActivePage, activePage }) => {
  return(
    <Menu color='blue' inverted>
      <MenuItem active={activePage === 'gloves'} onClick={() => setActivePage('gloves')}>Gloves</MenuItem>
      <MenuItem active={activePage === 'facemasks'} onClick={() => setActivePage('facemasks')}>Facemasks</MenuItem>
      <MenuItem active={activePage === 'beanies'} onClick={() => setActivePage('beanies')}>Beanies</MenuItem>
    </Menu>
  )
}

export default MenuBar