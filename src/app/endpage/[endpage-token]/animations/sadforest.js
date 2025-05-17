import { useGLTF } from "@react-three/drei";

export function SadForest(props) {
  const { nodes, materials } = useGLTF("/skybox.glb");
  return (
    <group {...props} dispose={null}>
      <group scale={0.01}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere_Material_0.geometry}
          material={materials.Material}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={5500000}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/skybox.glb");
