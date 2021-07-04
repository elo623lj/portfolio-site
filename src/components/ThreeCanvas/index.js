import React, { Suspense, useState, useEffect, useRef } from 'react'
import * as THREE from "three"
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Loader, useTexture, useGLTF, Shadow } from "@react-three/drei"

import Cards from '@/components/Cards'
import Title from '@/components/Title'
import Smile from '@/components/Smile'
import Preview from '@/components/Preview'
import Particles from '@/components/Particles'
import Effects from '@/components/Effects'

const torus = new THREE.TorusBufferGeometry(4, 1.2, 128, 128)

export default function ThreeCanvas() {

  useEffect(() => {


  }, []); 


  const mouse = useRef([0, 0])
  const effectsRef = useRef()

  return (
    <Canvas
      linear
      // dpr={[1, 2]}
      camera={{ fov: 100, position: [0, 0, 30] }}
      onCreated={({ gl }) => {
        // gl.toneMapping = THREE.Uncharted2ToneMapping
        gl.setClearColor(new THREE.Color('#020207')) 
      }}
    >
      {/* <spotLight position={[0, 30, 40]} /> */}
      {/* <spotLight position={[-50, 30, 40]} /> */}
      <Suspense fallback={null}>
        {/* <Title position={[-1.2, 0, -5]}/> */}
        {/* <Cards/> */}
        {/* <mesh
          layers={0}
          scale={5}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={0xffff00} />
        </mesh>
        <mesh
          layers={1} 
          scale={5}
          position={[10, 0, 0]} 
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={0xff00ff} />
        </mesh> */}
        {/* <Smile/> */}
        <Preview/>
        <Particles count={10000} mouse={mouse} />
        <Effects/>
        {/* <Environment files="photo_studio_01_1k.hdr" /> */}
      </Suspense>
    </Canvas> 
  )
}
