import React, { Suspense, useState, useEffect, useRef } from 'react'
import * as THREE from "three"
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Reflector, Text, useTexture, useGLTF, OrbitControls } from '@react-three/drei'
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import Effects from '@/components/Effects'

const torus = new THREE.TorusBufferGeometry(4, 2, 128, 128)
import Preview from '@/components/Preview'

const Main = () => {

  const material = new THREE.MeshBasicMaterial({ color: '#5fffd6' })

  const Ring = ({ level }) => (
    <mesh 
      material={material}
      scale={0.1} 
      position={[0, level * 1, 0]}
      rotation={[Math.PI * 0.5, 0, 0]}
    >
      <torusBufferGeometry args={[10 - level * 1, 0.3, 128, 128]}/>
    </mesh>
  )

  return (
    <group position={[0, 0.4, 0]}>
      {Array.from( Array(3).keys() ).map(i => 
        <Ring level={i}/>
      )}
    </group>
  )
}

function Ground() {
  return (
    <Reflector 
      resolution={512} 
      args={[10, 10]} 
      mirror={0.4} 
      mixBlur={8} 
      mixStrength={1} 
      position={[0, 0, 5]}
      rotation={[-Math.PI / 2, 0, Math.PI / 2]} 
      blur={[400, 100]}
    >
      {(Material, props) => <Material color="#a0a0a0" metalness={0.4} roughness={0.05} {...props} />}
    </Reflector>
  )
}

function Intro({ start, set }) {
  const [vec] = useState(() => new THREE.Vector3())

  return useFrame((state) => {
      // state.camera.position.lerp(vec.set(state.mouse.x * 5, 3 + state.mouse.y * 2, 14), 0.05)
      state.camera.lookAt(0, 0, 0)
  })
}

export default function HomeDark() {

  return (
    <Canvas 
      concurrent 
      gl={{ alpha: false }} 
      pixelRatio={[1, 1.5]} 
      camera={{ position: [0, 3, 20], fov: 15 }}
    >
      <color attach="background" args={['black']} />
      {/* <fog attach="fog" args={['black', 15, 20]} /> */}
      {/* <ambientLight intensity={2}/> */}
      <Suspense fallback={null}>
        <group position={[0, -1, 0]}>
          {/* <Preview/> */}
          <Main/>
          <Ground />
        </group>
        <ambientLight intensity={0.5} />
        {/* <spotLight position={[0, 10, 0]} intensity={0.3} /> */}
        <directionalLight position={[-20, 0, -10]} intensity={0.7} />
        <Intro/>
      </Suspense>
      <EffectComposer>
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={800} />
        <Noise opacity={0.02} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
      {/* <Effects/> */}
      <OrbitControls/>
    </Canvas>
  )
}
