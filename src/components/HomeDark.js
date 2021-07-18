import React, { Suspense, useState, useEffect, useRef } from 'react'
import * as THREE from "three"
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Loader, useTexture, useGLTF, Shadow } from "@react-three/drei"
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette } from '@react-three/postprocessing'

import Smile from '@/components/Smile'
import Rainbow from '@/components/Rainbow'

export default function HomeDark() {

  return (
    <scene>
      <perspectiveCamera
        ref={camera}
        fov={120}
        position={[0, 0, 30]}
        // aspect={size.width / size.height}
        // radius={(size.width + size.height) / 4}
        // onUpdate={self => self.updateProjectionMatrix()}
      />
      <Suspense fallback={null}>
        <Rainbow count={1000} mouse={mouse}/>
        <Smile/>
      </Suspense>
      <EffectComposer>
        <Bloom intensity={1.7} luminanceThreshold={0.1}  luminanceSmoothing={0.025} />
        <Noise opacity={0.08} />
        <Vignette eskil={false} offset={0.4} darkness={0.7} />
      </EffectComposer>
    </scene> 
  )
}
