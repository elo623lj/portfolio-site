import * as THREE from "three"
import { useState, useEffect, useRef, useMemo, Suspense } from "react"
import store from '@/store'
import { useSelector } from 'react-redux'
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { softShadows, useTexture } from "@react-three/drei"
import { ResizeObserver } from '@juggle/resize-observer'
import WorkLightShader from '@/shaders/WorkLightShader' 

import Effects from "@/components/Effects"
import DarkModeTransition from "@/components/DarkModeTransition"

softShadows({
  frustum: 3.75,
  size: 0.002,
  near: 9.5,
  samples: 20,
  rings: 11, 
})

const DEFAULT_CAMERA_POS = [10, 2, 30]

const Show = ({ currentIndex }) => {

  const [direction, setDirection] = useState(null)

  const planeRef = useRef()
  const materialRef = useRef()

  const { camera, mouse } = useThree()
  const vec = new THREE.Vector3()
  const [rEuler, rQuaternion] = useMemo(() => [new THREE.Euler(), new THREE.Quaternion()], [])

  useFrame(() => {
    camera.position.lerp(vec.set(
      DEFAULT_CAMERA_POS[0] + mouse.x * 0.8, 
      DEFAULT_CAMERA_POS[1] + mouse.y * 0.4, 
      camera.position.z
    ), 0.05)

    rEuler.set(0, (mouse.x * Math.PI) / 6, 0)
    planeRef.current.quaternion.slerp(rQuaternion.setFromEuler(rEuler), 0.1)

    if (direction != null) {
      materialRef.current.uniforms.progress.value += 0.05 * direction
      if (
        (materialRef.current.uniforms.progress.value >= 1 && direction == 1)
        ||
        (materialRef.current.uniforms.progress.value <= 0 && direction == -1)
      ) {
        materialRef.current.uniforms.progress.value = direction == 1 ? 1 : 0
        setDirection(null)
        store.dispatch({ type: 'BROWSE_WORK_TRANSITION_FINISH'})
      }
    }
  })


  useEffect(() => {
    const image = store.getState().works.data[currentIndex].image
    const direction = store.getState().works.direction
    const texture = new THREE.TextureLoader().load(`/works/${image}`)
    setDirection(direction)

    if (direction == null) {
      materialRef.current.uniforms.progress.value = 0.0
      materialRef.current.uniforms.tex.value = texture
    }
    else if (direction == 1) {
      if (materialRef.current.uniforms.progress.value == 1) {
        materialRef.current.uniforms.tex.value = materialRef.current.uniforms.tex2.value
        materialRef.current.uniforms.progress.value = 0
      }
      materialRef.current.uniforms.tex2.value = texture
    }
    else if (direction == -1) {
      if (materialRef.current.uniforms.progress.value == 0) {
        materialRef.current.uniforms.tex2.value = materialRef.current.uniforms.tex.value
        materialRef.current.uniforms.progress.value = 1
      }
      materialRef.current.uniforms.tex.value = texture
    }  
  }, [currentIndex])

  const displacement = useTexture(require('@/assets/images/displacement.jpg').default)

  return (
    <group ref={planeRef} position={[0, 3, 0]}>
      <mesh castShadow>
        <boxGeometry attach="geometry" args={[10, 6, 0.1]} />
        <meshStandardMaterial transparent opacity={0}/>
      </mesh>
      <mesh>
        <planeBufferGeometry attach="geometry" args={[10, 6, 1, 1]} /> 
        <shaderMaterial 
          ref={materialRef} 
          args={[WorkLightShader]} 
          uniforms-disp-value={displacement}
          attach="material" 
        />
      </mesh>
    </group>
  )
}

const Ground = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <shadowMaterial attach="material" transparent opacity={0.4} />
    </mesh>
  )
}

export default function WorksLight(props) {

  const darkMode = useSelector(state => state.darkMode)
  const currentIndex = useSelector(state => state.works.currentIndex)

  return (
    <Canvas
      shadows
      gl={{ antialias: true }}
      camera={{ position: DEFAULT_CAMERA_POS, fov: 35 }}
      resize={{ polyfill: ResizeObserver }}
    >
      <Suspense fallback={null}>
        <color attach="background" args={['white']} />
        <ambientLight intensity={0.4} />
        <pointLight position={[-10, 0, 20]} intensity={1} />
        <directionalLight
          castShadow
          position={[-4, 12, 4]}
          intensity={2}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
        />
        <group rotation={[0, Math.PI * -0.05, 0]} position={[8, -3, 5]}>
          <Ground/>
          <Show currentIndex={currentIndex} />
        </group>
        <Effects>
          <DarkModeTransition {...darkMode} />
        </Effects>
      </Suspense>
    </Canvas>
  )
}
