import React, { useState, useEffect, useRef, useMemo, useLayoutEffect } from 'react'
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

export default function Smile() {

  const meshRef = useRef()
  const materialRef = useRef()

  useFrame((state, delta) => {
    // materialRef.current.uniforms.time.value += delta * 1
  })

  const geometry = new THREE.SphereGeometry(1, 16, 16)
  // const material = new THREE.MeshPhysicalMaterial(
  //   {
  //     metalness: 0.8,
  //     tranparent: true,
  //     roughness: 0.6,
  //     transmission: 1,
  //   }
  // )
  // const material = new THREE.MeshPhongMaterial({
  //   color: 0xffffff,
  //   opacity: 0.5,
  //   transparent: true,
  // });

  const texture = useTexture("/text.png")
  const material = useMemo(
    () => ({
      uniforms: {
        tex: { value: null },
        time: { value: 0 },
      },
      fragmentShader,
      vertexShader
    }),
    []
  )

  useLayoutEffect(() => {
    materialRef.current.uniforms.tex.value = texture
  }, [])
  

  return (
    <>
      <mesh 
        layers={0}
        position={[0, 0, 0]}
        // geometry={geometry}
        // material={material}
      >
        <planeGeometry args={[20, 20, 32, 32]} />
        <shaderMaterial ref={materialRef} args={[material]} attach="material"  transparent/>
      </mesh>
    </>
  );
}
