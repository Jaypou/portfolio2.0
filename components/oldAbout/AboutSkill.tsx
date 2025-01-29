"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Points,
  PointMaterial,
  Billboard,
  Text,
  Html,
  OrbitControls,
} from "@react-three/drei";
import * as THREE from "three";
import { Icon } from "@iconify/react";
import { animate, motion } from "framer-motion";
import { label } from "framer-motion/client";

interface SkillIconProps {
  icon: string;
  label: string;
  orbitRadius: number;
  orbitSpeed: number;
  startAngle: number;
}

const CenterIcon = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <Billboard>
        <Html
          center
          transform
          occlude="blending"
          style={{
            width: "400px",
            height: "400px",
            background: "rgba(0, 0, 0, 0.8)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
          distanceFactor={3}
        >
          <div className="flex h-full w-full flex-col items-center justify-center">
            <Icon icon="mdi:code" className="h-40 w-40 text-white" />
            <span className="mt-6 text-4xl font-semibold text-white">Code</span>
          </div>
        </Html>
      </Billboard>
    </group>
  );
};

const SkillIcon: React.FC<SkillIconProps> = ({
  icon,
  label,
  orbitRadius,
  orbitSpeed,
  startAngle,
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();

      // Orbital motion
      const angle = startAngle + time * orbitSpeed;
      groupRef.current.position.x = Math.cos(angle) * orbitRadius;
      groupRef.current.position.z = Math.sin(angle) * orbitRadius;
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.5; // Reduced vertical oscillation
    }
  });

  return (
    <group ref={groupRef}>
      <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
        <Html
          transform
          occlude="blending"
          style={{
            width: "400px",
            height: "400px",
            background: "rgba(0, 0, 0, 0.8)",
            borderRadius: "40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }}
          distanceFactor={3}
        >
          <div className="flex h-full w-full flex-col items-center justify-center">
            <Icon icon={icon} className="h-32 w-32 text-white" />
            <span className="mt-6 text-3xl font-semibold text-white">
              {label}
            </span>
          </div>
        </Html>
      </Billboard>
    </group>
  );
};

const skills = [
  {
    icon: "logos:react",
    label: "React",
    orbitRadius: 6,
    orbitSpeed: 0.3,
    startAngle: 0,
  },
  {
    icon: "logos:nodejs",
    label: "Node.js",
    orbitRadius: 6,
    orbitSpeed: 0.4,
    startAngle: Math.PI * 0.4,
  },
  {
    icon: "logos:typescript-icon",
    label: "TypeScript",
    orbitRadius: 6,
    orbitSpeed: 0.5,
    startAngle: Math.PI * 0.8,
  },
  {
    icon: "logos:python",
    label: "Python",
    orbitRadius: 6,
    orbitSpeed: 0.2,
    startAngle: Math.PI * 1.2,
  },
  {
    icon: "logos:javascript",
    label: "JavaScript",
    orbitRadius: 6,
    orbitSpeed: 0.35,
    startAngle: Math.PI * 1.6,
  },
];

export default function AboutSkill() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative mx-auto h-[600px] w-full max-w-[1200px]"
    >
      <Canvas
        camera={{
          position: [0, 0, 15],
          fov: 75,
          near: 0.1,
          far: 1000,
        }}
      >
        <OrbitControls enableZoom={true} enablePan={true} />

        <CenterIcon />
        {skills.map((skill, index) => (
          <SkillIcon
            key={index}
            icon={skill.icon}
            label={skill.label}
            orbitRadius={skill.orbitRadius}
            orbitSpeed={skill.orbitSpeed}
            startAngle={skill.startAngle}
          />
        ))}
      </Canvas>
    </motion.div>
  );
}
