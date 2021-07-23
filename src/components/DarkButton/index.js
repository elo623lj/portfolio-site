import React from 'react'
import store from '@/store'
import { useSelector } from 'react-redux'

import {
  DarkButtonWrapper,
} from './styles'

export default function DarkButton() {

  const darkMode = useSelector(state => state.darkMode)

  const onClick = () => {
    if (darkMode.isEnded)
      store.dispatch({ type: 'CHANGE_DARK_MODE' })
  }
 
  return (
    <DarkButtonWrapper onClick={onClick}>
      <svg viewBox="0 0 24 24">
        <path fill={darkMode.isOn ? "white" : "black"} d="M12,18V6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,15.31L23.31,12L20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31Z" />
      </svg>
    </DarkButtonWrapper>
  )
}
