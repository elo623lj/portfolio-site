import React, { useEffect, useRef, useMemo, Suspense } from 'react'
import * as THREE from "three"
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Reflector, useTexture } from '@react-three/drei'
import GlitchShader from '@/shaders/GlitchShader' 

const DEFAULT_CAMERA_POS = [10, 2, 30]

const Show = () => {

  const planeRef = useRef()
  const { camera, mouse } = useThree()
  const vec = new THREE.Vector3()
  const [rEuler, rQuaternion] = useMemo(() => [new THREE.Euler(), new THREE.Quaternion()], [])

  const materialRef = useRef()
  const texture = useTexture("/1.jpg") 
  const noise = useTexture("/noise.png")

  useFrame((state, delta) => {
    camera.position.lerp(vec.set(
      DEFAULT_CAMERA_POS[0] + mouse.x * 0.8, 
      DEFAULT_CAMERA_POS[1] + mouse.y * 0.4, 
      camera.position.z
    ), 0.05)

    rEuler.set(0, (mouse.x * Math.PI) / 6, 0)
    planeRef.current.quaternion.slerp(rQuaternion.setFromEuler(rEuler), 0.1)

    materialRef.current.uniforms.time.value += delta 
  })

  return (
    <group ref={planeRef} position={[0, 3, 0]}>
      <mesh>
        <boxGeometry attach="geometry" args={[10, 6, 0.1]} />
        <shaderMaterial 
          ref={materialRef} 
          args={[GlitchShader]} 
          uniforms-tex-value={texture} 
          uniforms-noise-value={noise} 
          attach="material" 
          transparent
        />
      </mesh>
    </group>
  )
}


const Ground = () => {
  const [floor, normal] = useTexture(['/SurfaceImperfections003_1K_var1.jpg', '/SurfaceImperfections003_1K_Normal.jpg'])
  return (
    <Reflector 
      resolution={512} 
      rotation={[-Math.PI / 2, 0, 0]}
      args={[100, 100]} 
      mirror={0.4} 
      mixBlur={8} 
      mixStrength={1} 
      position={[0, -0.8, 0]}
      rotation={[-Math.PI / 2, 0, Math.PI / 2]} 
      blur={[400, 100]}
    >
      {(Material, props) => <Material color="#a0a0a0" metalness={0.4} roughnessMap={floor} normalMap={normal} normalScale={[1, 1]} {...props} />}
    </Reflector>
  )
}

export default function WorksDark(props) {

  return (
    <Canvas
      shadows
      gl={{ antialias: true }}
      camera={{ position: DEFAULT_CAMERA_POS, fov: 35 }}
    >
      <color attach="background" args={['black']} />
      <Suspense fallback={null}>
        <group rotation={[0, Math.PI * -0.05, 0]} position={[8, -3, 5]}>
          <Ground/>
          <Show/>
        </group>
         <ambientLight intensity={0.5} />
        {/* <spotLight position={[0, 10, 0]} intensity={0.3} /> */}
        <directionalLight position={[-20, 0, -10]} intensity={0.7} />
      </Suspense>
      {/* <OrbitControls/> */}
    </Canvas>
  )
}
