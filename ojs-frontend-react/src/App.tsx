import "./App.css";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";

/* Constructors for shapes being used in scene  */
/* Creates cube shape using boxGeometry */
const Cube = ({
  position,
  size,
  color,
}: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
}) => {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

/* Creates cone shape using coneGeometry */
const Cone = ({
  position,
  size,
  color,
}: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
}) => {
  return (
    <mesh position={position}>
      <coneGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

/**
 * Creates sphere shape using sphereGeometry.
 * Also detects pointer coming in contact with sphere mesh.
 * Changes color of shape when pointer enters mesh.
 */
const Sphere = ({
  position,
  size,
}: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
}) => {
  const sphereRef = useRef<THREE.Mesh>(null);

  const [isHovered, setIsHovered] = useState(false);

  useFrame((state, delta) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += delta * 0.2;
    }
  });

  /* stopPropagation ensures mouse enters the mesh and event is only contained to the mesh */
  return (
    <mesh
      position={position}
      ref={sphereRef}
      onPointerEnter={(event) => (event.stopPropagation(), setIsHovered(true))}
      onPointerLeave={() => setIsHovered(false)}
    >
      <sphereGeometry args={size} />
      <meshStandardMaterial color={isHovered ? "red" : "pink"} wireframe />
    </mesh>
  );
};

/* Creates ring shape using torusGeometry */
const Torus = ({
  position,
  size,
  color,
}: {
  position: [number, number, number];
  size: [number, number, number, number];
  color: string;
}) => {
  return (
    <mesh position={position}>
      <torusGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default function App() {
  return (
    <Canvas>
      {/* ambientLight is where lighting shines on all objects in scene equally. */}
      <ambientLight intensity={1} />

      {/* Room Walls and Floor */}
      <group>
        <Cube position={[0, 0, 5]} size={[20, 5, 0.5]} color={"green"} />
        <Cube position={[10.5, 0, -5]} size={[1, 5, -20]} color={"green"} />
        <Cube position={[-10.5, 0, -5]} size={[1, 5, -20]} color={"green"} />
        <Cube position={[0, 0, -15]} size={[20, 5, 0.5]} color={"green"} />
        <Cube position={[0, -2.5, -5]} size={[20, 0, 20]} color={"lightblue"} />
      </group>

      {/**
       * Shapes Within Room:
       *
       * Cube base with different shape on top
       */}
      <Cube position={[0, -2, -5]} size={[2, 2, 2]} color={"gray"} />
      <Sphere position={[0, 0, -5]} size={[1, 30, 30]} color={"pink"} />

      <Cube position={[9, -2, -14]} size={[2, 2, 2]} color={"gray"} />
      <Cone position={[9, 0, -14]} size={[1, 2, 4]} color={"orange"} />

      <Cube position={[-9, -2, -14]} size={[2, 2, 2]} color={"gray"} />
      <Torus
        position={[-9, 0, -14]}
        size={[0.9, 0.1, 30, 30]}
        color={"purple"}
      />
    </Canvas>
  );
}
