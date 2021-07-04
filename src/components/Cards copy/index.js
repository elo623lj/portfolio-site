import React, { useState, useEffect, useRef } from 'react'
import { useDrag } from 'react-use-gesture'
import { useSpring, animated } from 'react-spring'

import {
  CardsWrapper,
  CardContainer,
  CardInner,
  CardOverlay
} from './styles'

const DATA = [
  {img: 'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg'}, 
  {img: 'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg'}, 
  {img: 'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg'}, 
  {img: 'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg'}, 
  {img: 'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg'}, 
]

const COUNT = DATA.length
const WIDTH = 600
const HEIGHT = 280
// const OFFSET_X = 5
// const OFFSET_Y = 5
const OFFSET_DEGREE = 0

const Card = ({ data, index, topIndex, updateTopIndex }) => {

  const order = ( index - topIndex + COUNT ) % COUNT
  const [isAnimating, setIsAnimating] = useState(false)

  const OFFSET_X = (Math.random() * 2 - 1) * 50 + (Math.round(Math.random()) * 2 - 1) * 30
  const OFFSET_Y = order * 50 +  (Math.random() * 2 - 1) * 20 

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
          transform: `translateX(${OFFSET_X}px) translateY(${OFFSET_Y}px) rotate(${order * OFFSET_DEGREE}deg)`,
          filter: order == 0 ? '' : 'grayscale(100%)',
          transition: `transform 0.5s ease-in-out ${order * 0.05}s`
        }}
      >
        {/* {`${index} ${order}`} */}
        <img style={{ width:'100%', height:'100%', pointerEvents:'none', userSelect:'none' }} src={data.img}/>
        {/* <CardOverlay style={{ opacity: order == 0 || isAnimating ? 0.3 : 1 }}/> */}
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
      {DATA.map( (data, index) => <Card key={index} data={data} index={index} topIndex={topIndex} updateTopIndex={updateTopIndex} />)}
    </CardsWrapper>
  );
}
