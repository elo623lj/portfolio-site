import React, { Suspense, useState, useEffect, useRef } from 'react'
import * as THREE from "three"
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { softShadows, OrbitControls, ContactShadows } from "@react-three/drei"
import { EffectComposer, SSAO } from '@react-three/postprocessing'

// softShadows()


export default function HomeLight() {

  useEffect(() => {


  }, []); 

  return (
    <Canvas 
      shadows 
      dpr={[1, 2]} 
      camera={{ position: [5, 0, 10], fov: 35 }}
    >
      <ambientLight intensity={0.2} />
      {/* <directionalLight position={[0, 0, 20]} intensity={2} />
      <directionalLight 
        // castShadow 
        position={[2, 40, -5]} 
        intensity={0.01}  
      /> */}
      {/* <pointLight position={[0, 0, 5]} distance={5} intensity={5}  /> */}
      <spotLight 
        // castShadow  
        position={[-10, 20, 20]} 
        angle={0.1} 
        intensity={2} 
        shadow-mapSize-width={2048} 
        shadow-mapSize-height={2048} 
        shadow-bias={-0.00001} 
      />

      <Suspense fallback={null}>
        <mesh receiveShadow castShadow position={[0, 0.8, 0]}>
          <boxGeometry args={[3, 1.6, 0.05]}/>
          <meshStandardMaterial roughness={0.5} color="white"/>
        </mesh>
        <mesh receiveShadow castShadow position={[0, 0.8, 0.05]}>
          <boxGeometry args={[1.2, 0.6, 0.05]}/>
          <meshStandardMaterial roughness={0.5} color="red"/>
        </mesh>
        {/* <mesh receiveShadow renderOrder={1000} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[10, 10]} />
          <shadowMaterial transparent opacity={0.6} />
        </mesh> */}
        <ContactShadows opacity={1} width={1} height={1} blur={1} far={10} resolution={256} />
      </Suspense>
      <EffectComposer multisampling={0}>
        <SSAO samples={21} radius={10} intensity={50} luminanceInfluence={0.6} />
      </EffectComposer>
      <OrbitControls/>
    </Canvas>
  )
}
