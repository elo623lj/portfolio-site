import * as THREE from 'three'
import { useState, useRef, Suspense, useMemo } from 'react'
import { Canvas, useThree, useFrame, useLoader } from '@react-three/fiber'
import { CameraShake, OrbitControls, useTexture } from '@react-three/drei'
import { KernelSize } from 'postprocessing'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'

export default function Heptagon({ color, ...props }) {
    const ref = useRef()
    // const [r] = useState(() => Math.random() * 10000)
    useFrame(() => {
        // ref.current.position.y = -1.75 + Math.sin(_.clock.elapsedTime + r) / 10
    })
    const { paths: [path] } = useLoader(SVGLoader, '/triangle.svg')
    const geom = useMemo(() => 
        SVGLoader.pointsToStroke(path.subPaths[0].getPoints(), path.userData.style), []
    )
    return (
      <group ref={ref} {...props} position={[0, 0, 6]}>
        <mesh geometry={geom} scale={0.01} rotation={[Math.PI * 0.4, 0,  0]}>
          <meshBasicMaterial color={'black'} toneMapped={false} />
        </mesh>
        {/* <mesh>
          <boxGeometry args={[1,1,1]}/>
          <meshBasicMaterial color='black'/>
        </mesh> */}
      </group>
    )
  }