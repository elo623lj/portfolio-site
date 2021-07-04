import React, { useState, useEffect, useRef, useMemo} from 'react'
import * as THREE from "three"
import { ShaderMaterial, Color } from "three"
import { Canvas, useFrame } from '@react-three/fiber'
import { useTexture } from "@react-three/drei"
import { vertexShader, fragmentShader } from './shader'

const torus = new THREE.TorusBufferGeometry(4, 1.2, 128, 128)

import {
  TitleContainer,
  TitleTop,
  TitleBottom,
} from './styles'

export default function Title(props) {

  const meshRef = useRef()
  const materialRef = useRef()

  useFrame((state, delta) => {
    materialRef.current.uniforms.time.value += delta * 1
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
