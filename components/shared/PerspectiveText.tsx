"use client";

import { Canvas, useFrame } from "@react-three/fiber"; // Core Three.js bindings for React (Canvas sets up a 3D scene, useFrame is for animations)
import { OrbitControls } from "@react-three/drei"; // UI helpers from Drei for 3D text, camera controls, and centering objects
import { Suspense, useRef, useState } from "react"; // React utilities (Suspense handles async components, useRef and useState for state management)
import * as THREE from "three"; // Main Three.js library for math utilities, vectors, etc.
import ScramThreeText from "./CustomThreeText";

function Scene() {
  const groupRef = useRef<THREE.Group>(null); // Reference to a group object for easy access to transformations
  const [hovered, setHovered] = useState(false); // State to track whether the text is hovered

  // Animation loop, runs every frame
  useFrame(() => {
    if (groupRef.current) {
      // Define rotation targets depending on hover state
      const targetRotationX = hovered ? 0 : -0.2;
      const targetRotationY = hovered ? 0 : 0.5;

      // Smooth rotation animation using linear interpolation (lerp)
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotationX,
        0.1 // The speed of transition
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotationY,
        0.1
      );
    }
  });

  return (
    <>
      <ambientLight intensity={1} />
      {/* Ambient light to softly illuminate the scene */}
      <>
        {/* Centers the following content in the scene */}
        <group
          ref={groupRef} // Apply rotation animations to this group
          onPointerEnter={() => setHovered(true)} // Set hover state to true when pointer enters
          onPointerLeave={() => setHovered(false)} // Set hover state to false when pointer leaves
        >
          <ScramThreeText
            text="Hello World"
            triggerOnHover={false}
            duration={0.12}
            href="/about"
          />
        </group>
      </>
      <OrbitControls
        enableZoom={true} // Allow camera zoom
        minPolarAngle={Math.PI / 2.5} // Minimum angle for camera movement (limits vertical rotation)
        maxPolarAngle={Math.PI / 2.1} // Maximum angle for camera movement
        enableRotate={false} // Disables manual rotation to keep focus on animations
      />
    </>
  );
}

export default function PerspectiveText() {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{
          position: [0, 0, 10], // Initial camera position
          fov: 75, // Field of view in degrees
          near: 0.1, // Nearest distance for objects to be rendered
          far: 1000, // Farthest distance for objects to be rendered
        }}
        // style={{ width: "100%", height: "100%" }} // Full size of the container
      >
        <Suspense fallback={null}>
          <Scene /> {/* Loads the 3D scene */}
        </Suspense>
      </Canvas>
    </div>
  );
}
