import * as THREE from 'three'
import React, { useRef, useEffect } from 'react'
import store from '@/store'
import { useSelector } from 'react-redux'
import { extend, useThree, useFrame } from '@react-three/fiber'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader'
import { useTexture } from '@react-three/drei'
import TransitionShader from '@/shaders/TransitionShader'

export default function Transitions({ isTransitioning }) {

  const composerRef = useRef()
  const shaderRef = useRef()
  const { scene, gl, size, camera } = useThree()
  
  useEffect(() => {
    composerRef.current.setSize(size.width, size.height)
  }, [size])

  useFrame((state, delta) => {
    composerRef.current.render()
    if (isTransitioning) {
      if (shaderRef.current.material.uniforms.progress.value >= 1)
        store.dispatch({ type: 'DARK_MODE_TRANSITION_FINISH' })
      if (shaderRef.current) 
        shaderRef.current.material.uniforms.progress.value += delta 
    }
  }, 1)

  const noise = useTexture("/rusty.jpg")
  const resolution = new THREE.Vector2(size.width, size.height)

  return (
    <effectComposer ref={composerRef} args={[gl]}>
      <renderPass attachArray="passes" scene={scene} camera={camera} />
      {isTransitioning &&
        <shaderPass 
          ref={shaderRef}
          attachArray="passes" 
          args={[TransitionShader]} 
          material-uniforms-resolution-value={resolution}  
          material-uniforms-noise-value={noise}  
        />
      }
        <shaderPass attachArray="passes" args={[GammaCorrectionShader]} /> 
    </effectComposer>
  )
}
