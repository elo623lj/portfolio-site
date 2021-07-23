import React from 'react'
import { useSelector } from 'react-redux'

import {
  CanvasContainer,
  Title,
} from './styles'

import Dark from './Dark'
import Light from './Light'

export default function Home() {

  const isDark = useSelector(state => state.darkMode.isOn)

  return (
    <>
      {/* <CanvasContainer>
        <Dark/>
      </CanvasContainer> */}

      <CanvasContainer>
        <Light/>
      </CanvasContainer>

      <Title
        style={{ color: isDark ? 'red' : 'black' }}
      >
        <h1>Hi, I’m Liam,</h1>
        <h2>
          <i>(frontend developer) </i>
          | /creative developer/
        </h2>
      </Title>

    </>
  )
}
