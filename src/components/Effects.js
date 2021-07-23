import React, { useRef, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader'

export default function Effects({ children }) {

  const composerRef = useRef()
  const { scene, gl, size, camera } = useThree()
  
  useEffect(() => {
    composerRef.current.setSize(size.width, size.height)
  }, [size])

  useFrame(() => {
    if (composerRef.current) composerRef.current.render()
  }, 1)

  return (
    <effectComposer ref={composerRef} args={[gl]}>
      <renderPass attachArray="passes" scene={scene} camera={camera} />
      {children}
      <shaderPass attachArray="passes" args={[GammaCorrectionShader]} /> 
    </effectComposer>
  )
}
