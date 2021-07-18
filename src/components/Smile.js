import React, { useState, useEffect, useRef, useMemo, useLayoutEffect } from 'react'
import * as THREE from "three"
import { ShaderMaterial, Color } from "three"
import { Canvas, useFrame } from '@react-three/fiber'
import { useTexture } from "@react-three/drei"
import GlitchShader from '@/shaders/GlitchShader'

const torus = new THREE.TorusBufferGeometry(4, 1.2, 128, 128)

export default function Smile(props) {

  const meshRef = useRef()
  const materialRef = useRef()

  useFrame((state, delta) => {
    materialRef.current.uniforms.time.value += delta 
  })

  const texture = useTexture("/smile.png")
  const noise = useTexture("/noise.png")
  
  return (
    <mesh {...props}>
      <planeGeometry args={[20, 20, 32, 32]} />
      <shaderMaterial 
        ref={materialRef} 
        args={[GlitchShader]} 
        uniforms-tex-value={texture} 
        uniforms-noise-value={noise} 
        attach="material" 
        transparent
      />
    </mesh>
  );
}
