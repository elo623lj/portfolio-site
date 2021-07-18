import React, { Suspense, useState, useEffect, useMemo, useRef } from 'react'
import * as THREE from "three"
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { softShadows, OrbitControls } from "@react-three/drei"
import { EffectComposer, SSAO, BrightnessContrast } from "@react-three/postprocessing"


softShadows({
  frustum: 3.75,
  size: 0.005,
  near: 9.5,
  samples: 30,
  rings: 11, 
})

const SIZE = 1.3
const HEIGHT = 2.5
const SPEED = 0.05
const START_DURATION = 2.5
const END_DURATION = 1
const STOP_DURATION = 2
const DURATION = START_DURATION + END_DURATION + STOP_DURATION
const X_COUNT = 20
const Y_COUNT = 15
const Background = () => {
  
  const sqauresRef = useRef()

  // init
  const squares = useMemo(() => {
    const temp = []
    let xPos = 0
    let rand = Math.random()
    for (let x = 0; x < X_COUNT; x ++) {
      const width = x % 3 == 0 ? 4 : x % 3 == 2 ? 3 : 2
      const height = x % 3 == 2 ? 8 : 6
      let yPos = x % 3 == 0 ? 2 * SIZE : 0
      for (let y = 0; y < Y_COUNT; y ++) {
        const isTall = y % 2 != 0
        const height_ = isTall ? height : 2
        temp.push({ 
          isTall: isTall,
          x: xPos,
          y: yPos,
          width: width,
          height: height_,
          // rand: Math.random() * 0.8,
          ... isTall && {
            rand: Math.random() * 0.8
          }
        })
        yPos += height_ * SIZE
      }
      xPos += width * SIZE
    }
    return temp
  }, [])

  // update
  let progress = 0
  let direction = 1
  let isReset = false

  useFrame((state) => {
    const t = state.clock.getElapsedTime() % DURATION
    if (t < START_DURATION) {
      direction = 1
      progress = t / START_DURATION
    }
    else if (t - START_DURATION < END_DURATION) {
      direction = -1
      progress = 1 - (t - START_DURATION) / END_DURATION
    }
    else {
      progress = 0
      isReset = true
    }

    for (const square of sqauresRef.current.children) {
      if (square.isTall) {

        const isAnimating = (direction == 1 && progress > square.rand) || (direction == -1 && progress < square.rand) 
        if (isAnimating) {
          for (let i = 0; i < 2; i ++ ) {
            for (let j = 0; j < 2; j ++ ) {
              const index = j == 0 ? 8 : 11 
              const position = square.children[i].geometry.attributes.position.array

              // if (square.isMouseOver) {
              //   square.extraHeight += SPEED
              //   square.extraHeight = Math.min(square.extraHeight, HEIGHT)
              // }
              // else if (square.extraHeight > 0) {
              //   square.extraHeight -= SPEED
              //   square.extraHeight = Math.max(square.extraHeight, 0)
              // }

              position[index] += direction * SPEED
              position[index] = Math.max(Math.min(position[index], HEIGHT), 0)

            }
            square.children[i].geometry.attributes.position.needsUpdate = true
          }
        }
      }
    }
  })

  const onPointerOver = (e) => {
    // console.log(e)
    // e.object.material.color = new THREE.Color('red')
  }

  const onPointerOut = (e) => {
    // console.log(e)
    // e.object.material.color = new THREE.Color('white')
  }

  return (
    <group ref={sqauresRef} position={[-38, -39, 0]} onPointerOver={onPointerOver} onPointerOut={onPointerOut}>
      {squares.map((square, index) => (
        <group 
          key={index} 
          position={[square.x + square.width * SIZE * 0.5, square.y + square.height * SIZE * 0.5, 0]} 
          scale={[square.width, square.height, 1]} 
          isTall={square.isTall}
          {...square.isTall && { 
            rand: square.rand
          }}
        >
          <mesh receiveShadow position={[0, 0, 0.01]}>
            <planeBufferGeometry args={[SIZE, SIZE, 1, square.isTall? 2 : 1]}/>
            <meshStandardMaterial color='white' flatShading />
          </mesh>
          <mesh castShadow>
            <planeBufferGeometry args={[SIZE, SIZE, 1, square.isTall? 2 : 1]}/>
            <meshStandardMaterial side={THREE.DoubleSide} transparent opacity={0} flatShading  />
          </mesh>
        </group>
      ))}
    </group>
  )
}


const Main = () => {

  const geometry = new THREE.TorusBufferGeometry(5, 1, 32, 32)

  const material = new THREE.MeshPhysicalMaterial({
    roughness: 1,
    clearcoat: 1,
    clearcoatRoughness: 0,
    transmission: 1,
    ior: 1.25,
    envMapIntensity: 25,
    color: '#ffffff',
    transparent: true
  })

  return (
    <>
      <mesh material={material} geometry={geometry} rotation={[0, 0, 0]} position={[0, 0, 10]} castShadow>
      </mesh>
    </>
  )
}

export default function HomeLight() {

  useEffect(() => {


  }, []); 



  return (
    <Canvas 
      orthographic 
      shadows 
      camera={{ position: [0, 0, 60], fov: 60, zoom: 24 }}
      gl={{ alpha: false, stencil: false, depth: false, antialias: false }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.2} />
        <directionalLight
          castShadow
          position={[0, 0, 40]}
          intensity={1}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={37}
          shadow-camera-far={80}
          shadow-camera-left={-35}
          shadow-camera-right={35}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
        />
        <group rotation={[0, 0, -Math.PI * 3 / 4]}>
          <Background/>
          {/* <Main/> */}
        </group>
      </Suspense>
      <EffectComposer multisampling={0}>
        <SSAO samples={25} radius={5} intensity={50} luminanceInfluence={0.6} />
        <BrightnessContrast brightness={0.2} />
      </EffectComposer>
      {/* <OrbitControls /> */}
    </Canvas>
  )
}
