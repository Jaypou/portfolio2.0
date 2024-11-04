"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Points,
  PointMaterial,
  Billboard,
  Text,
  Html,
} from "@react-three/drei";
import * as THREE from "three";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

interface SkillIconProps {
  icon: string;
  label: string;
  orbitRadius: number;
  orbitSpeed: number;
  startAngle: number;
}

const GalaxyParticles = ({ count = 4000 }) => {
  const points = useRef<THREE.Points>(null);
  const radius = 10;
  const branches = 3;
  const spin = 1;
  const randomness = 0.2;
  const randomnessPower = 3;
  const insideColor = "#ff6030";
  const outsideColor = "#1b3984";

  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const colorInside = new THREE.Color(insideColor);
    const colorOutside = new THREE.Color(outsideColor);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = Math.random() * 10;
      const spinAngle = radius * spin;
      const branchAngle = ((i % branches) / branches) * Math.PI * 2;

      const randomX =
        Math.pow(Math.random(), randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        randomness *
        radius;
      const randomY =
        Math.pow(Math.random(), randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        randomness *
        radius;
      const randomZ =
        Math.pow(Math.random(), randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        randomness *
        radius;

      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      const mixedColor = colorInside.clone();
      mixedColor.lerp(colorOutside, radius / 10);

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    return { positions, colors };
  }, [
    count,
    branches,
    spin,
    randomness,
    randomnessPower,
    insideColor,
    outsideColor,
  ]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <Points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.positions.length / 3}
          array={positions.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={positions.colors.length / 3}
          array={positions.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial
        size={0.1}
        vertexColors
        transparent
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const CenterIcon = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Slow rotation for the center icon
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
        <Html
          transform
          occlude="blending"
          style={{
            width: "450px",
            height: "450px",
            background: "rgba(0, 0, 0, 0.8)",
            borderRadius: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }}
          distanceFactor={3}
          position={[0, 0, 0]}
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
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.5;
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
    orbitRadius: 5,
    orbitSpeed: 0.3,
    startAngle: 0,
  },
  {
    icon: "logos:nodejs",
    label: "Node.js",
    orbitRadius: 5,
    orbitSpeed: 0.4,
    startAngle: Math.PI * 0.4,
  },
  {
    icon: "logos:typescript-icon",
    label: "TypeScript",
    orbitRadius: 5,
    orbitSpeed: 0.5,
    startAngle: Math.PI * 0.8,
  },
  {
    icon: "logos:python",
    label: "Python",
    orbitRadius: 5,
    orbitSpeed: 0.2,
    startAngle: Math.PI * 1.2,
  },
  {
    icon: "logos:javascript",
    label: "JavaScript",
    orbitRadius: 5,
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
      className="relative h-[600px] w-full"
    >
      <Canvas
        camera={{ position: [0, 3, 15], fov: 80 }}
        // style={{
        //   background: "rgb(17, 24, 39)",
        // }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <GalaxyParticles />
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
