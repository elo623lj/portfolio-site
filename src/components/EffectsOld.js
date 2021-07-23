import * as THREE from 'three'
import React, { useRef, useMemo, useEffect } from 'react'
import { extend, useThree, useFrame } from '@react-three/fiber'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass'
import { HorizontalBlurShader } from 'three/examples/jsm/shaders/HorizontalBlurShader.js'
import { VerticalBlurShader } from 'three/examples/jsm/shaders/VerticalBlurShader.js'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader'
import MixLayerShader from '@/shaders/MixLayerShader'
import VolumetricLightShader from '@/shaders/VolumetricLightShader'
import AdditiveBlendingShader from '@/shaders/AdditiveBlendingShader'
import BadTVShader from '@/shaders/BadTVShader'

extend({ EffectComposer, ShaderPass, RenderPass, UnrealBloomPass, FilmPass })

export default function Effects() {

  const baseComposer = useRef()
  const previewComposer = useRef()
  const previewOcclusionComposer = useRef()
  const finalComposer = useRef()

  const baseRenderTarget = useMemo(() => new THREE.WebGLRenderTarget(), [])
  const previewRenderTarget = useMemo(() => new THREE.WebGLRenderTarget(), [])
  const previewOcclusionRenderTarget = useMemo(() => new THREE.WebGLRenderTarget(), [])

  const { scene, gl, size, camera } = useThree()
  const aspect = useMemo(() => new THREE.Vector2(512, 512), [])
//   const baseRenderTarget = useMemo(() => new THREE.WebGLRenderTarget(), [])
//   const previewOcclusionRenderTarget = useMemo(() => new THREE.WebGLRenderTarget(), [])

  useEffect(() => {
    baseComposer.current.setSize(size.width, size.height)
    // previewOcclusionComposer.current.setSize(size.width, size.height)
    // previewComposer.current.setSize(size.width, size.height)
  }, [size])

  const filmPassRef = useRef()
  const badTVPassRef = useRef()

  useFrame((state, delta) => {
    // filmPassRef.current.uniforms.time.value += delta;
    // badTVPassRef.current.uniforms.time.value += 0.01;

    // camera.layers.set(1)
    // previewOcclusionComposer.current.render()

    // camera.layers.set(2)
    // previewComposer.current.render()

    // camera.layers.set(0)
    // baseComposer.current.render()

    // finalComposer.current.render()

    baseComposer.current.render()

  }, 1)

  const test = new THREE.ShaderMaterial(MixLayerShader, "baseTexture")
  test.uniforms.layer2.value = baseRenderTarget.texture
  test.uniforms.layer1.value = previewRenderTarget.texture

  return (
    <>
        <effectComposer ref={baseComposer} args={[gl, baseRenderTarget]}>
            <renderPass attachArray="passes" scene={scene} camera={camera} />
            <unrealBloomPass attachArray="passes" args={[aspect, 0.6, 0.5, 0.8]} /> {/* strength radius threshold */}
        </effectComposer>

        {/* <effectComposer ref={previewOcclusionComposer} args={[gl, previewOcclusionRenderTarget]} >
            <renderPass attachArray="passes" scene={scene} camera={camera} />
            <shaderPass attachArray="passes" args={[HorizontalBlurShader]} />
            <shaderPass attachArray="passes" args={[VerticalBlurShader]} />
            <shaderPass attachArray="passes" args={[VolumetricLightShader]} />
        </effectComposer>

        <effectComposer ref={previewComposer} args={[gl, previewRenderTarget]} >
            <renderPass attachArray="passes" scene={scene} camera={camera} />
            <shaderPass ref={badTVPassRef} attachArray="passes" args={[BadTVShader]} />
            <filmPass ref={filmPassRef} attachArray="passes" args={[0.3, 0.1, 648, false]}/>  noise intensity, scanline intensity, scanline count, grayscale 
            <shaderPass attachArray="passes" args={[AdditiveBlendingShader]} uniforms-tAdd-value={previewOcclusionRenderTarget.texture} />
            <shaderPass attachArray="passes" args={[FXAAShader]} uniforms-resolution-value={[1 / size.width, 1 / size.height]} renderToScreen />
        </effectComposer>

        <effectComposer ref={finalComposer} args={[gl]} >
            <renderPass attachArray="passes" scene={scene} camera={camera} />
            <shaderPass attachArray="passes" args={[test]}/>
        </effectComposer> */}
   </>
  )
}
