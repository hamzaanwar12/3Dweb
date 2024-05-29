import React from "react";
import { useRef } from "react";
import { angleToRadians } from "../utils/angle.js";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect } from "react";
import gsap from "gsap";

export default function Three() {
  const orbitConrolsRef = useRef(null);
  const ballRef = useRef(null);
  useFrame((state) => {
    if (orbitConrolsRef.current) {
      // console.log(state.mouse)
      const { x, y } = state.mouse;
      orbitConrolsRef.current.setAzimuthalAngle(-x * angleToRadians(35));
      orbitConrolsRef.current.setPolarAngle((y + 1) * angleToRadians(60));
      orbitConrolsRef.current.update();
    }
  });

  useEffect(() => {
    if (ballRef.current) {
      const timeline = gsap.timeline({ paused: true });

      timeline.to(ballRef.current.position, 
      {
          delay:0.4,
          x: 1,
          duration: 1.2,
          ease: "power2.out",
      });
      timeline.to(ballRef.current.position, 
      {
          y: 1,
          duration: 1.1,
          ease: "bounce.out",
      },"<")
      timeline.play()
    }
  }, []);
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 1, 7]} />
      <ambientLight args={["#ffffff", 1.3]} />
      {/* <spotLight args={["#ffffff", 10, 7, angleToRadians(30), 0.3]} position={[-3, 3, 0]} castShadow={true} /> */}
      <spotLight
        args={["#ffffff", 20]}
        position={[-4, 6, 0]}
        castShadow={true}
      />

      <OrbitControls
        ref={orbitConrolsRef}
        minPolarAngle={angleToRadians(30)}
        maxPolarAngle={angleToRadians(80)}
      />
      <mesh position={[-2, 2.5, 0]} castShadow={true} ref={ballRef} metall>
        <sphereGeometry args={[1, 36, 32]} />
        <meshStandardMaterial color={"cyan"} roughness={0.7} metalness={0.8} />
      </mesh>
      <mesh
        receiveShadow={true}
        rotation={[-angleToRadians(90), angleToRadians(0), angleToRadians(40)]}
      >
        <planeGeometry args={[15, 15]} rotation={[]} />
        <meshStandardMaterial color="grey" />
      </mesh>
      <Environment background>
        <mesh>
          <sphereGeometry args={[50, 100, 100]} />
          <meshBasicMaterial color="grey" side={THREE.BackSide} />
        </mesh>
      </Environment>
    </>
  );
}
