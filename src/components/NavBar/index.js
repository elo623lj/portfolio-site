import React from 'react'
import { Link } from 'react-router-dom'

import {
  NavBarContainer,
} from './styles'


export default function NavBar() {

  const NavButton = ({ target }) => {

    const onClick = () => {
      console.log(target)
    }

    return (
      <Link to={`/${target}`} onClick={onClick}>{target == '' ? 'home' : target}</Link>
    )
  }
 
  return (
    <NavBarContainer>
      <NavButton target=''/>
      <NavButton target='works'/>
      <NavButton target='about'/>
    </NavBarContainer>
  )
}
