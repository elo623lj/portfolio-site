import React from 'react'
import { useSelector } from 'react-redux'
import { useSpring, animated } from 'react-spring'

import {
  Title,
  Heptagon
} from './styles'

import Dark from './Dark'
import Light from './Light'
import About from '@/components/About'

const POS_LEFT = 22
const trans = (x) => `translateX(${x}px)`

export default function Home() {

  const isDark = useSelector(state => state.darkMode.isOn)
  const [spring, setSpring] = useSpring(() => ({ x: 0, config: { } }))

  const onMouseMove = (e) => {
    setSpring({ x: e.clientX / window.innerWidth * 380 })
  }

  return (
    <div onMouseMove={onMouseMove}>
      {/* <CanvasContainer>
        <Dark/>
      </CanvasContainer> */}

      <div className="canvas-wrapper home">
        <Light/>
      </div>

      {/* <About/> */}

      <Title
        style={{ color: isDark ? 'red' : 'black' }}
      >
        <Heptagon 
          as={animated.img}
          style={{ transform: spring.x.interpolate(trans) }}
          src={require('@/assets/images/heptagon-back.png').default}
        />
        <h1>Hi, I’m Liam</h1>
        <h2>frontend / creative developer</h2>
        <Heptagon 
          as={animated.img}
          style={{ transform: spring.x.interpolate(trans) }}
          src={require('@/assets/images/heptagon-front.png').default}
        />
      </Title>


    </div>
  )
}
