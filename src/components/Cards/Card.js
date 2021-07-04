import React, { useState, useEffect, useRef, useMemo} from 'react'
import * as THREE from "three"
import { ShaderMaterial, Color } from "three"
import { useThree, useFrame } from '@react-three/fiber'
import { useTexture } from "@react-three/drei"
// import { a } from "@react-spring/three"
import { vertexShader, fragmentShader } from './shader'

const torus = new THREE.TorusBufferGeometry(4, 1.2, 128, 128)

import {
  TitleContainer,
  TitleTop,
  TitleBottom,
} from './styles'

export default function Card(props) {

  const meshRef = useRef()
  const materialRef = useRef()
  const { mouse } = useThree()

  const [rEuler, rQuaternion] = useMemo(() => [new THREE.Euler(), new THREE.Quaternion()], [])
  useFrame((state, delta) => {
    materialRef.current.uniforms.time.value += delta * 1
    rEuler.set((-mouse.y * Math.PI) / 10, (mouse.x * Math.PI) / 6, 0)
    meshRef.current.quaternion.slerp(rQuaternion.setFromEuler(rEuler), 0.1)
  })

  const texture = useTexture("/1.jpg")
  const material = useMemo(
    () => ({
      uniforms: {
        tex: { value: texture },
        time: { value: 0 },
      },
      fragmentShader,
      vertexShader
    }),
    []
  )

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={1}
      // onClick={(event) => setActive(!active)}
      // onPointerOver={(event) => setHover(true)}
      // onPointerOut={(event) => setHover(false)}
    >
      <planeGeometry args={[2.56, 1.44, 32, 32]} />
      {/* <meshStandardMaterial color={'orange'} /> */}
      <shaderMaterial ref={materialRef} attach="material" {...material} transparent/>
    </mesh>
  );
}
