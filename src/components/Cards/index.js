import React, { useState, useEffect, useRef } from 'react'
import { useDrag } from 'react-use-gesture'
import { useSpring, animated } from 'react-spring'

import {
  CardsWrapper,
  CardContainer,
  CardInner,
} from './styles'

const DATA = [
  {}, {}, {}, {}, {}
]

const COUNT = DATA.length
const WIDTH = 600
const HEIGHT = 300
const OFFSET_X = 35
const OFFSET_Y = 45
const OFFSET_DEGREE = 5

const Card = ({ index, topIndex, updateTopIndex }) => {

  const order = ( index - topIndex + COUNT ) % COUNT
  const [isAnimating, setIsAnimating] = useState(false)

  const hasResetRef = useRef(true)

  const [{ x, y }, setSpring] = useSpring(() => {
    return {
      to: { x: 0, y: 0 },
      onRest: () => {
        setIsAnimating(false)
        if (!hasResetRef.current) {
          setSpring({ x: 0, y: 500, immediate: true })
          setSpring({ x: 0, y: 0})
          hasResetRef.current = true
        }
      }
    };
  });

  const bind = useDrag( ({ down, movement: [mx, my], velocity }) => {
    if (order == 0) {
      setIsAnimating(true)
      const isGone = velocity > 0.2 || Math.abs(mx) > 500
      if (!down && isGone) {
        updateTopIndex()
        hasResetRef.current = false
      }
      setSpring({ 
        x: down ? mx : isGone ? ( mx > 0 ? window.innerWidth : -window.innerWidth) : 0, 
        y: down || isGone ? my : 0 
      })
    }
  })

  return (
    <CardContainer 
      as={animated.div}
      {...bind()}
      style={{
        touchAction: 'none',
        x, 
        y,
        width: WIDTH,
        height: HEIGHT,
        zIndex: isAnimating ? COUNT : COUNT - order
      }}
    >
      <CardInner
        style={{
          transform: `translateX(${order * OFFSET_X}px) translateY(${order * OFFSET_Y}px) rotate(${order * OFFSET_DEGREE}deg)`,
          transition: `transform 0.5s ease-in-out ${order * 0.05}s`
        }}
      >
        {`${index} ${order}`}
      </CardInner>
    </CardContainer>
  )
}

export default function Cards() {

  const [topIndex, setTopIndex] = useState(0)

  const updateTopIndex = () => {
    setTopIndex( (topIndex + 1) % COUNT )
  }

  return (
    <CardsWrapper
      style={{
        width: WIDTH,
        height: HEIGHT,
      }}
    >
      {DATA.map( (x, index) => <Card key={index} index={index} topIndex={topIndex} updateTopIndex={updateTopIndex} />)}
    </CardsWrapper>
  );
}
