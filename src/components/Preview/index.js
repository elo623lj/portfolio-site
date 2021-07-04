import React, { useState, useEffect, useRef, useMemo, useLayoutEffect } from 'react'
import * as THREE from "three"
import { useFrame, useThree } from '@react-three/fiber'
import { useTexture } from "@react-three/drei"
import PreviewShader from '@/shaders/PreviewShader'

export default function Preview() {

  const ref = useRef()
  const materialRef = useRef()
  const { mouse } = useThree()

  const [rEuler, rQuaternion] = useMemo(() => [new THREE.Euler(), new THREE.Quaternion()], [])
  useFrame((state, delta) => {
    rEuler.set((-mouse.y * Math.PI) / 10, (mouse.x * Math.PI) / 6, 0)
    ref.current.quaternion.slerp(rQuaternion.setFromEuler(rEuler), 0.1)
    
    materialRef.current.uniforms.time.value += delta 
  })

  const texture = useTexture("/1.jpg") //1.jpg
  const noise = useTexture("/noise.png")
  const color = 0x0099ff
  const width =  256 * 0.2
  const height = 144 * 0.2


  return (
    <group ref={ref}>
      {/* <mesh layers={0}>
        <planeGeometry args={[width, height, 1, 1]} />
        <meshBasicMaterial map={texture} color={0x0099ff}/>
      </mesh> */}
      <mesh layers={0}>
        <planeGeometry args={[width, height, 1, 1]} />
        <shaderMaterial 
          ref={materialRef} 
          args={[PreviewShader]} 
          uniforms-tex-value={texture} 
          uniforms-noise-value={noise} 
          attach="material" 
          transparent
        />
      </mesh>
    </group>
  );
}
