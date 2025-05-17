
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from "@react-three/fiber";

export function Sky({isRotating}) {
  const { nodes, materials } = useGLTF('/sky.glb')
  const skyRef = useRef();
  useFrame((_, delta) => {
    if (isRotating) {
        console.log("rotation", skyRef)
        skyRef.current.rotation.y += 0.25 * delta; // Adjust the rotation speed as needed
    }
    });

  return (
    <group dispose={null} ref={skyRef}>
      <group scale={0.01}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere__0.geometry}
          material={materials['Scene_-_Root']}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={50000}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/sky.glb')