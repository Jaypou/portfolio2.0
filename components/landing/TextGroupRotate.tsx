import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import CustomThreeText from "../shared/CustomThreeText";

interface TextGroupRotateProps {
  item: { name: string; href: string };
  position: [number, number, number];
  scrambled?: boolean;
  fontSize: number;
}

export default function TextGroupRotate({
  item,
  position,
  scrambled,
  fontSize,
}: TextGroupRotateProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (groupRef.current) {
      const targetRotationX = hovered ? 0.0 : 0.1;
      const targetRotationY = hovered ? 0.0 : 0.5;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotationX,
        0.1
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotationY,
        0.1
      );
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <CustomThreeText
        text={item.name}
        fontSize={fontSize}
        color={hovered ? "#ff0000" : "#ffffff"}
        triggerOnHover={false}
        duration={0.2}
        href={item.href}
        anchorX="left"
        scrambled={scrambled}
        font="/assets/fonts/Rock_Salt/RockSalt-Regular.ttf"
      />
    </group>
  );
}
