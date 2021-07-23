import React, { useState, useEffect } from 'react'
import store from '@/store'
import { useSelector } from 'react-redux'
import { useProgress } from "@react-three/drei"

import {
  CanvasContainer,
  Info,
  InfoTitle,
  InfoType,
  InfoContent
} from './styles'

import Dark from './Dark'
import Light from './Light'


export default function Works() {

  const darkMode = useSelector(state => state.darkMode)
  const { progress } = useProgress()

  useEffect(() => {
    if (darkMode.isLoading && progress == 100) {
      setTimeout(
        () => store.dispatch({ type: 'DARK_MODE_LOADING_FINISH' })
      , 1000)
    }
  }, [darkMode.isLoading, progress])

  const [mousePos, setMousePos] = useState(null)
  
  return (
    <>

      { (darkMode.isOn || !darkMode.isEnded) &&
        <CanvasContainer
          style={{ 
            opacity: !darkMode.isOn && !darkMode.isTransitioning ? 0 : 1
          }}
        >
          <Dark mousePos={mousePos} setMousePos={setMousePos} />
        </CanvasContainer>
      }

      { (!darkMode.isOn || !darkMode.isEnded) &&
        <CanvasContainer
          style={{ 
            opacity: darkMode.isOn && !darkMode.isTransitioning ? 0 : 1,
            // zIndex: !darkMode.isOn && !darkMode.isTransitioning ? -1 : 0,
          }}
        >
          <Light mousePos={mousePos} setMousePos={setMousePos} />
        </CanvasContainer>
      }

      <Info 
        style={{ color: darkMode.isOn ? 'red' : 'black' }}
      >
        <div/>
        <InfoTitle>Synthwave </InfoTitle>
        <InfoType>(sketch)</InfoType>
        <InfoContent>#React.js #Three.js</InfoContent>
        <div/>
      </Info>
    </>
  )
}
