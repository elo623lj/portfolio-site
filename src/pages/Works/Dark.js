import React, { Suspense, useState, useEffect, useRef } from 'react'
import * as THREE from "three"
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Reflector, Text, useTexture, useGLTF, OrbitControls } from '@react-three/drei'

import HomeDark from '@/components//HomeDark'
import Cards from '@/components/Cards'
import Title from '@/components/Title'
import Smile from '@/components/Smile'
import Preview from '@/components/Preview'
import Rainbow from '@/components/Rainbow'
import Particles from '@/components/Particles'
import Effects from '@/components/Effects'

const torus = new THREE.TorusBufferGeometry(4, 1.2, 128, 128)

function VideoText({ clicked, ...props }) {
  const [video] = useState(() => Object.assign(document.createElement('video'), { src: '/drei.mp4', crossOrigin: 'Anonymous', loop: true }))
  useEffect(() => void (clicked && video.play()), [video, clicked])
  return (
    <Text font="/Inter-Bold.woff" fontSize={3} letterSpacing={-0.06} {...props}>
      drei
      <meshBasicMaterial toneMapped={false}>
        <videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding} />
      </meshBasicMaterial>
    </Text>
  )
}

const Wall = () => {
  const [floor, normal] = useTexture(['/SurfaceImperfections003_1K_var1.jpg', '/SurfaceImperfections003_1K_Normal.jpg'])
  return (
    <Reflector 
      resolution={512} 
      args={[10, 10]} 
      mirror={0.4} 
      mixBlur={8} 
      mixStrength={1} 
      position={[0, 5, 0]}
      rotation={[0, 0, Math.PI / 2]} 
      blur={[400, 100]}
    >
      {(Material, props) => <Material color="red" metalness={0.4} roughnessMap={floor} normalMap={normal} normalScale={[1, 1]} {...props} />}
    </Reflector>
  )
}

function Ground() {
  const [floor, normal] = useTexture(['/SurfaceImperfections003_1K_var1.jpg', '/SurfaceImperfections003_1K_Normal.jpg'])
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
      {(Material, props) => <Material color="#a0a0a0" metalness={0.4} roughnessMap={floor} normalMap={normal} normalScale={[1, 1]} {...props} />}
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

export default function Works() {

  return (
    <Canvas 
      concurrent 
      gl={{ alpha: false }} 
      pixelRatio={[1, 1.5]} 
      camera={{ position: [0, 3, 20], fov: 15 }}
    >
      <color attach="background" args={['black']} />
      <fog attach="fog" args={['black', 15, 20]} />
      <Suspense fallback={null}>
        <group position={[0, -1, 0]}>
          {/* <Smile/> */}
          <Preview/>
          <Wall/>
          <Ground />
        </group>
        <ambientLight intensity={0.5} />
        <spotLight position={[0, 10, 0]} intensity={0.3} />
        <directionalLight position={[-20, 0, -10]} intensity={0.7} />
        <Intro/>
      </Suspense>
      <OrbitControls/>
    </Canvas>
  )
}
