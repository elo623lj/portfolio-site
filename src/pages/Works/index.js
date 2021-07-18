import React, { Suspense, useState, useEffect, useRef } from 'react'
import * as THREE from "three"
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Loader, useTexture, useGLTF, Shadow } from "@react-three/drei"
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette } from '@react-three/postprocessing'

import {
  CanvasContainer,
} from './styles'

import Dark from './Dark'
import Light from './Light'

const torus = new THREE.TorusBufferGeometry(4, 1.2, 128, 128)

export default function Works() {

  useEffect(() => {


  }, []); 


  return (
    <>
      {/* <CanvasContainer>
        <Dark/>
      </CanvasContainer> */}

      <CanvasContainer>
        <Light/>
      </CanvasContainer>
    </>
  )
}
