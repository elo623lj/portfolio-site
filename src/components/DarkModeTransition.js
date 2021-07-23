import * as THREE from 'three'
import React, { useRef, useEffect } from 'react'
import store from '@/store'
import { useThree, useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import TransitionShader from '@/shaders/TransitionShader'

const TransitionShaderPass = ({ isOn }) => {

  const shaderRef = useRef()
  const { size } = useThree()

  useEffect(() => {
    shaderRef.current.material.uniforms.progress.value = isOn ? 1 : 0
    store.dispatch({ type: 'DARK_MODE_TRANSITION_START' })
  }, [])

  useFrame((state, delta) => {

    shaderRef.current.material.uniforms.progress.value += delta * (isOn ? -1 : 1)

    if ( 
      (isOn && shaderRef.current.material.uniforms.progress.value < 0)
      ||
      (!isOn && shaderRef.current.material.uniforms.progress.value > 1)
    )
      store.dispatch({ type: 'DARK_MODE_TRANSITION_FINISH' })
  })

  const noise = useTexture("/rusty.jpg")
  const resolution = new THREE.Vector2(size.width, size.height)

  return (
    <shaderPass 
      ref={shaderRef}
      attachArray="passes" 
      args={[TransitionShader]} 
      material-uniforms-resolution-value={resolution}  
      material-uniforms-noise-value={noise}  
    />
  )
}

export default function DarkModeTransition(props) {

  const { isOn, isEnded, isLoading } = props

  return (!isEnded && !isLoading) ? <TransitionShaderPass isOn={isOn} /> : null

}
