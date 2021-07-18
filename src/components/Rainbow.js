import * as THREE from 'three'
import React, { useRef, useMemo, useLayoutEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import DistortionMaterial from '@/shaders/TestMaterial'

export default function Rainbow({ mouse }) {
  const count = 300
  const mesh = useRef()
  const light = useRef()
  const { size, viewport } = useThree()

  const circle = new THREE.CircleGeometry(100, 32)
  // const points = useMemo(() => {
  //   const temp = []
  //   const positions = circle.attributes.position.array
  //   const z = 200 * Math.random() 
  //   for (let i = 1; i <= 32; i++) {
  //     for (let j = 0; j < 3; j++) {
  //       temp.push({ 
  //         x: positions[i * 3],
  //         y: positions[i * 3 + 1],
  //         z: z + j * 200,
  //         t: 0,
  //       })
  //     }
  //   }
  //   return temp
  // }, [])

  const dummy = useMemo(() => new THREE.Object3D(), [])

  const points = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      temp.push({ 
        x: -300 + Math.random() * 600,
        y: -300 + Math.random() * 600,
        z: Math.random() * 600,
        length: 1 + Math.random(),
        t: 0,
      })
    }
    return temp
  }, [count])

  const geometry = new THREE.CylinderGeometry(1.5, 1.5, 200, 10)
  geometry.computeBoundingBox()

  const material1 = new DistortionMaterial()
  material1.bbMin = geometry.boundingBox.min
  material1.bbMax = geometry.boundingBox.max

  useFrame((state) => {
    points.forEach((point, i) => {
      let { x, y, z, t, length } = point

      t = point.t += 2

      dummy.position.set(
        x,
        y,
        -600 + (z + t) % 600,
        // z
      )

      // dummy.scale.x = 0.7
      // dummy.scale.y = length
      dummy.rotation.x = - Math.PI / 2
      dummy.updateMatrix()

      mesh.current.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  useLayoutEffect(() => {
    mesh.current.material.bbMin = geometry.boundingBox.min
    mesh.current.material.bbMax = geometry.boundingBox.max
  }, [])

  return (
    <>
      <pointLight ref={light} distance={40} intensity={8} color="lightblue" />
      <instancedMesh ref={mesh} geometry={geometry} material={material1} args={[null, null, count]}/>
    </>
  )
}
