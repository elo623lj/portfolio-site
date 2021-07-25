import React, { useState, useEffect, useRef } from 'react'
import store from '@/store'
import { useSelector } from 'react-redux'

import {
  CanvasContainer,
  Info,
  InfoTitle,
  InfoType,
  InfoContent,
  BottomRow
} from './styles'

import Dark from './Dark'
import Light from './Light'

export default function Works() {

  let timeoutRef = useRef(null)
  useEffect(() => {
    setTimeout(
      () => {
        setIsTextRevealed(true)
      }
    , 500)
  }, [])

  const darkMode = useSelector(state => state.darkMode)

  // set info 
  const currentIndex = useSelector(state => state.works.currentIndex)
  const [info, setInfo] = useState(null)
  useEffect(() => {
    if (timeoutRef.current != null) 
      clearTimeout(timeoutRef.current)

    const direction = store.getState().works.direction
    if (direction != null) {
      setIsTextRevealed(false)
      timeoutRef.current = setTimeout(
        () => {
          setInfo(store.getState().works.data[currentIndex])
          setIsTextRevealed(true)
        }
      , 800)
    }
    else setInfo(store.getState().works.data[currentIndex])
  }, [currentIndex])

  // text reveal
  const [isTextRevealed, setIsTextRevealed] = useState(false)
  const textClassName = `reveal-text ${ (isTextRevealed && darkMode.isEnded) ? 'revealed' : ''}`

  const browseWork = (direction) => {
    store.dispatch({ type: 'BROWSE_WORK', direction: direction })
  }

  return (
    <>

      { (darkMode.isOn || !darkMode.isEnded) &&
        <div 
          className="canvas-wrapper"
          style={{ 
            opacity: !darkMode.isOn && !darkMode.isTransitioning ? 0 : 1
          }}
        >
          <Dark/>
        </div>
      }

      { (!darkMode.isOn || !darkMode.isEnded) &&
        <div 
          className="canvas-wrapper"
          style={{ 
            opacity: darkMode.isOn && !darkMode.isTransitioning ? 0 : 1,
          }}
        >
          <Light/>
        </div>
      }

      <Info style={{ color: darkMode.isOn ? (info.color?? '#898989') : 'black' }} >
        {info && <>
          <InfoTitle className={textClassName}>
            {info?.title?? ''}
          </InfoTitle>
          <br/>
          <InfoType className={textClassName}>
            <i>({info?.type?? ''})</i> /{info?.tags?? ''}/
          </InfoType>
          <br/>
          <InfoContent className={textClassName}>
            {info?.about?? ''}
          </InfoContent>
        </>}

        <BottomRow>
          <div className='button' onClick={() => browseWork(-1)}>
            <span>{'< prev'}</span>
          </div>
          <div className='button' onClick={() => browseWork(1)}>
            <span>{'next >'}</span>
          </div>
        </BottomRow>
      </Info>

    </>
  )
}
